// 主题 保存状态，状态变化之后触发所有观察者对象
class Subject {
  constructor() {
    this.state = 0
    this.observers = []
  }

  getState() {
    return this.state
  }

  setState(state) {
    this.state = state
    this.notifyAllObservers()
  }

  notifyAllObservers() {
    this.observers.forEach(observer => {
      observer.update()
    })
  }

  attach(observer) {
    this.observers.push(observer)
  }
}

// 观察者
class Observer {
  constructor(name, subject) {
    this.name = name
    this.subject = subject
    this.subject.attach(this)
  }
  update() {
    console.info(`${this.name} update, state: ${this.subject.getState()}`)
  }
}

// 测试
const subject = new Subject()
const observer1 = new Observer('observer1', subject)
const observer2 = new Observer('observer2', subject)

subject.setState(2)