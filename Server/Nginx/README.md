## Windows系统配置Nginx服务器

### Nginx简介与特点
Nginx（发音同engine x）是一个网页服务器，它能反向代理HTTP, HTTPS, SMTP, POP3, IMAP的协议链接，以及一个负载均衡器和一个HTTP缓存。

Nginx是一款轻量级的Web 服务器/反向代理服务器及电子邮件（IMAP/POP3）代理服务器，并在一个BSD-like 协议下发行。由俄罗斯的程序设计师Igor Sysoev所开发，供俄国大型的入口网站及搜索引擎Rambler（俄文：Рамблер）使用。其特点是占有内存少，并发能力强，事实上nginx的并发能力确实在同类型的网页服务器中表现较好。

### Windows安装Nginx
#### 第一步：下载Nginx并解压
首先到nginx官网下载相应的安装包。下载地址：http://nginx.org/en/download.html ，下载完成后先进行解压，将解压后的文件放到预备安装的Nginx的目录下。

#### 第二步：安装、启动Nginx
打开window的cmd窗口，进入到nginx解压目录，如`cd C:\nginx-1.11.8`，使用`start nginx.exe`进行nginx的安装。

注意:Nginx默认监听localhost的80端口，如果windows本地已经启动了IIS并默认使用了80端口，需要修改Nginx配置文件`./conf/nginx.conf`监听的端口如：`localhost:8090`。

Nginx启动成功后，在windows“任务管理器”中会看到2个“nginx.exe”进程（master process和worker process），这时候在浏览器输入`127.0.0.1:8090`或者`localhost:8090`，会出现“Welcome to nginx”的成功提示。

#### 第三步：配置网站项目
通过在nginx目录中的conf文件夹下的配置文件nginx.conf下配置网站项目。

### Windows下nginx常用的命令
```
nginx -s stop     //快速停止(关机)nginx
nginx -s quit	  //正常关机(退出)nginx
nginx -s reload	  //更改配置，使用新配置启动新工作进程，正常关闭旧工作进程
nginx -s reopen   //重新打开日志文件
```