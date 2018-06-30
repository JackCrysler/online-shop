# shop-mall

> A Vue.js project

    流程基本完整的电商类项目：单页面SPA，路由，插件（自定义+第三方），数据容器，按需加载等。

    项目中有部分模拟数据引用了网上数据，所以最好在连接外网的情况下查看。

    登录模块，可任意注册自己的账号，该账号做本地保存，只要不删除文件都会一直存在

## Build Setup

``` bash
# install dependencies
npm install | yarn install

# serve with hot reload at localhost:8080
npm run dev | npm start | cnpm start | yarn start

# build for production with minification
npm run build

```

build之后可进行真机测试：

    1. 需配置utils下的request.js的baseurl

    2. 通过node启动server目录下的server.js，手机访问路径为wifi下的电脑ip+端口号(3000)

例如：

    通过ipconfig查看wifi下的ip为192.168.191.1，那么手机链接电脑wifi并访问192.168.191.1:3000即可。

## Plugins Introduction

    j-toast（npm官网直接搜j-toast）：基于vue的信息提示插件，非常简单，具备核心功能，可在此基础之上进行扩展。

    * **效果图示**

    ![两步验证 here](https://raw.githubusercontent.com/JackCrysler/online-shop/master/src/assets/img/demo.png)
