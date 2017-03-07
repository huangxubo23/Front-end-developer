## React学习笔记
React是一个用于组建用户界面的JavaScript库，让你以更简单的方式来创建交互式用户界面。

### JSX
JSX 是一个看起来很像 XML 的 JavaScript 语法扩展。 每一个XML标签都会被JSX转换工具转换成纯JavaScript代码，使用JSX，组件的结构和组件之间的关系看上去更加清晰。

JSX并不是React必须使用的，但React官方建议我们使用 JSX , 因为它能定义简洁且我们熟知的包含属性的树状结构语法。

#### 使用建议
* React 的 JSX 里约定分别使用首字母大、小写来区分本地组件的类和 HTML 标签。要渲染 HTML 标签，只需在 JSX 里使用小写字母开头的标签名。要渲染 React 组件，只需创建一个大写字母开头的本地变量。

### Component
React 允许将代码封装成组件（component），然后像插入普通 HTML 标签一样，在网页中插入这个组件。
~~~
var HelloMessage = React.createClass({
  render: function() {
    return <h1>Hello {this.props.name}</h1>;
  }
});
ReactDOM.render(
  <HelloMessage name="John" />,
  document.getElementById('example')
);
~~~

#### 组件的属性(props)
可以通过`this.props.xx`的形式获取组件对象的属性，对象的属性可以任意定义，但要避免与JavaScript关键字冲突。

`this.props.children` 会返回组件对象的所有属性。
~~~
var NotesList = React.createClass({
  render: function() {
    return (
      <ol>
      {
        React.Children.map(this.props.children, function (child) {
          return <li>{child}</li>;
        })
      }
      </ol>
    );
  }
});
ReactDOM.render(
  <NotesList>
    <span>hello</span>
    <span>world</span>
  </NotesList>,
  document.body
);
~~~

#### PropTypes
组件的属性可以接受任意值，字符串、对象、函数等等都可以。有时，我们需要一种机制，验证别人使用组件时，提供的参数是否符合要求。

组件类的`PropTypes`属性，就是用来验证组件实例的属性是否符合要求。
~~~
var MyTitle = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired,
  },
  render: function() {
     return <h1> {this.props.title} </h1>;
   }
});
~~~

#### getDefaultProps
`getDefaultProps` 方法可以用来设置组件属性的默认值。
~~~
var MyTitle = React.createClass({
  getDefaultProps : function () {
    return {
      title : 'Hello World'
    };
  },
  render: function() {
     return <h1> {this.props.title} </h1>;
   }
});
~~~

#### ref 属性(获取真实的DOM节点)
组件并不是真实的 DOM 节点，而是存在于内存之中的一种数据结构，叫做`虚拟 DOM （virtual DOM）`。只有当它插入文档（document）以后，才会变成真实的 DOM 。根据 React 的设计，所有的 DOM 变动，都先在虚拟 DOM 上发生，然后再将实际发生变动的部分，反映在真实 DOM上，这种算法叫做 `DOM diff`，它可以极大提高网页的性能表现。

但是，有时需要从组件获取真实 DOM 的节点，这时就要用到 `ref` 属性。
~~~
var MyComponent = React.createClass({
  handleClick: function() {
    this.refs.myTextInput.focus();
  },
  render: function() {
    return (
      <div>
        <input type="text" ref="myTextInput" />
        <input type="button" value="Focus the text input" onClick={this.handleClick} />
      </div>
    );
  }
});
~~~
需要注意的是，由于 `this.refs.[refName]` 属性获取的是真实 DOM ，所以必须等到虚拟 DOM 插入文档以后，才能使用这个属性，否则会报错。上面代码中，通过为组件指定 Click 事件的回调函数，确保了只有等到真实 DOM 发生 Click 事件之后，才会读取 `this.refs.[refName]` 属性。

##### ref属性不只是string
`ref`属性不仅接受string类型的参数，而且它还接受一个`function`作为callback。这一特性让开发者对ref的使用更加灵活。
~~~
 render: function() {
    return (
      <TextInput
        ref={function(input) {
          if (input != null) {
            input.focus();
          }
        }} />
    );
  },
~~~
在ES6中我们可以使用箭头函数来为组件的ref设置一个callback。
~~~
 render() {
    return <TextInput ref={(c) => this._input = c} />;
  },
  componentDidMount() {
    this._input.focus();
  },
~~~
注意：只有在组件的 `render` 方法被调用时，`ref` 才会被调用，组件才会返回 `ref`。如果在调用this.refs.xx时render方法还没被调用，那么你得到的是 `undefined`。

#### state
上文讲到了`props`，因为每个组件只会根据props 渲染了自己一次，props 是不可变的。为了实现交互，可以使用组件的 `state` 。`this.state` 是组件私有的，可以通过 `getInitialState()` 方法初始化，通过调用 `this.setState()` 来改变它。当 `state` 更新之后，组件就会重新渲染自己。

`render()` 方法依赖于 `this.props` 和 `this.state` ，框架会确保渲染出来的 UI 界面总是与输入（ this.props 和 this.state ）保持一致。
~~~
var FavoriteButton=React.createClass({
  getInitialState:function(){
    return {favorite:false};
  },
  handleClick:function(event){
    this.setState({favorite:!this.state.favorite});
  },
  render:function(){
    var text=this.state.favorite? 'favorite':'un favorite';
    return (
      <div type='button' onClick={this.handleClick}>
        You {text} this. Click to toggle.
      </div>
    );
  }
});
~~~
上面代码是一个 FavoriteButton 组件，它的 `getInitialState` 方法用于定义初始状态，也就是一个对象，这个对象可以通过 `this.state` 属性读取。当用户点击组件，导致状态变化，`this.setState` 方法就修改状态值，每次修改以后，自动调用 `this.render` 方法，再次渲染组件。

#### 使用建议
* 组件类的第一个字母必须大写。
* 组件类只能包含一个顶层标签。

### 推荐阅读
[React Native之React速学教程(上)](https://github.com/crazycodeboy/RNStudyNotes/blob/master/React%20Native%E4%B9%8BReact%E9%80%9F%E5%AD%A6%E6%95%99%E7%A8%8B/React%20Native%E4%B9%8BReact%E9%80%9F%E5%AD%A6%E6%95%99%E7%A8%8B%20(%E4%B8%8A).md)