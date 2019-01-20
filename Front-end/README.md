# 前端学习资料汇总

## 前端数据层
* [复杂单页应用的数据层设计](https://github.com/xufei/blog/issues/42)


## 前端性能优化
* 清理HTML文档：HTML代码应该简洁而有效，有利于SEO。把CSS放在Header里，将JavaScript置于HTML底部。
* 优化CSS、JS语法性能。
* 减少外部HTTP请求：去掉冗余的css、js、图片等文件资源。合并http请求。
* 压缩CSS、JS、HTML和图片等资源文件。
* 使用预先获取：在网站 HTML 中的链接属性上增加 rel=”prefetch”（链接预先获取），rel=”dns-prefetch”（DNS预先获取），或者rel=”prerender”（预先渲染）标记。
* 按需加载，动态加载。
* 使用CDN（内容分发网络）和缓存提高访问速度。
* 压缩文件：在源服务器上使用文件压缩能使网站的内容轻量化，更易于管理。最常用的文件压缩方法之一是 Gzip。这是缩小文档、音频文件、PNG图像和等其他大文件的绝佳方法。
* 使用轻量级框架。


## 跨域以及解决办法
### 什么是同源？
符合”协议+域名+端口”三者相同，就是同源。
### 为什么有同源策略？
同源策略，其初衷是为了浏览器的安全性，通过以下三种非同源策略的限制，保证浏览器不易受到XSS、CSRF等攻击。
* Cookie、LocalStorage和IndexDB无法读取
* DOM和Js对象无法获得
* AJAX请求不能发送
### 跨域解决方案
* 通过jsonp跨域
* document.domain + iframe跨域
* location.hash + iframe
* window.name + iframe跨域
* postMessage跨域
* WebSocket协议跨域
* 跨域资源共享（CORS），在服务端设置header('Access-Control-Allow-Origin:*');
* 后台服务代理跨域，如：nginx代理跨域、nodejs中间件代理跨域等

## Web安全
### CSRF
#### 什么是CSRF？
CSRF，全称为Cross-Site Request Forgery，跨站请求伪造，是一种网络攻击方式，它可以在用户毫不知情的情况下，以用户的名义伪造请求发送给被攻击站点，从而在未授权的情况下进行权限保护内的操作。

具体来讲，可以这样理解CSRF。攻击者借用用户的名义，向某一服务器发送恶意请求，对服务器来讲，这一请求是完全合法的，但攻击者确完成了一个恶意操作，比如以用户的名义发送邮件，盗取账号，购买商品等等。

#### 防御CSRF攻击的方案
一般网站防御CSRF攻击的方案:
* 验证token值。
* 验证HTTP头的Referer。
* 在HTTP头中自定义属性并验证。
* 服务器端表单hash认证：在所有的表单里面随机生成一个hash，server在表单处理时去验证这个hash值是否正确，这样工作量比较大。

### XSS
#### 什么是XSS？
跨站脚本攻击(Cross Site Scripting)，缩写为XSS。恶意攻击者往Web页面里插入恶意javaScript代码，当用户浏览该页之时，嵌入其中Web里面的javaScript代码会被执行，从而达到恶意攻击用户的目的。

#### XSS攻击有什么危害？
* 盗取各类用户帐号
* 控制企业数据，包括读取、篡改、添加、删除企业敏感数据的能力
* 盗窃企业重要的具有商业价值的资料
* 非法转账
* 强制发送电子邮件
* 网站挂马
* 控制受害者机器向其它网站发起攻击

### XSS攻击的注入点
* HTML节点内容，如：
    ```
    <html>
    <div>
        <script>alert('XSS HTML节点注入攻击')</script>
    </div>
    </html>
    ```
* HTML属性，如：
    ```
    <img src="image/error" onerror="alert('XSS HTML属性注入攻击')" />
    ```
* JavaScript代码 （字符串提前关闭）
* 富文本：富文本其实就是一段HTML。既然它是一段HTML，那么就存在XSS攻击。而且富文本攻击的防御相对比较麻烦。

### 防御XSS攻击的方案
Chrome浏览器自带防御,可拦截反射性XSS（HTML内容和属性），js和富文本的无法拦截，所以我们必须得自己做一些防御手段。
* HTML节点内容的防御
将用户输入的内容进行转义：
    ```
    var escapeHtml = function(str) {
        str = str.replace(/</g,'&lt;');
        str = str.replace(/</g,'&gt;');
        return str;
    }
    ```
* HTML属性的防御
对空格，单引号，双引号进行转义:
    ```
    var escapeHtmlProperty = function (str) {
        if(!str) return '';
        str = str.replace(/"/g,'&quto;');
        str = str.replace(/'/g,'&#39;');
        str = str.replace(/ /g,'&#32;');
        return str;
    }
    ```
* JavaScript的防御
对引号进行转义:
    ```
    var escapeForJS = function(str){
        if(!str) return '';
        str = str.replace(/\\/g,'\\\\');
        str = str.replace(/"/g,'\\"');
        return str;
    }
    ```
* 富文本的防御 <br/>
富文本的情况非常的复杂，js可以藏在标签里，超链接url里，何种属性里。
所以我们不能过用上面的方法做简单的转义。因为情况实在太多了。
我们换个思路，提供黑名单和白名单的过滤办法：
<b>黑名单</b>:我们可以把\<script/> onerror 这种危险标签或者属性纳入黑名单，过滤掉它。但是我们想，这种方式你要考虑很多情况，你也有可能漏掉一些情况等。
<b>白名单</b>：这种方式只允许部分标签和属性。不在这个白名单中的，一律过滤掉它。但是这种方式编码有点麻烦，我们需要去解析html树状结构，然后进行过滤，把过滤后安全的html在输出。
* CSP(Content Security Policy) <br/>
内容安全策略（Content Security Policy，简称CSP）是一种以可信白名单作机制，来限制网站中是否可以包含某来源内容。默认配置下不允许执行内联代码（\<script>块内容，内联事件，内联样式），以及禁止执行eval() , newFunction() , setTimeout([string], ...) 和setInterval([string], ...) 。<br/>
1、只允许本站资源:
    ```
    Content-Security-Policy： default-src ‘self’
    ```
2、允许本站的资源以及任意位置的图片以及 https://demo.com 下的脚本。
    ```
    Content-Security-Policy： default-src ‘self’; img-src *; script-src https://demo.com
    ```