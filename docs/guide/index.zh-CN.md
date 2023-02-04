# 准备

Library 为手机端公共组件库，原理是使用 svn 同步

## 使用 Library

### 安装 svn 命令行

- mac:`brew install svn`
- windows: [https://www.jianshu.com/p/a245f0bf064f](https://www.jianshu.com/p/a245f0bf064f)

### 下载/更新 Library

```bash
npm run update
```

## 修改 Library

### 源码下载

```bash
https://github.com/colaboy/seedsui-react.git
```

### 启动项目

```bash
npm run start
```

### 代理登录

```bash
http://localhost:8000/login
```

## 发布 Library

- http://172.31.3.113/project/iorder-saas/trunk/zkres/trunk/project/src/main/webapp/qince-h5/react

- 选择指定版本, 将 library 拷贝到指定版本下，提交即发布完成
