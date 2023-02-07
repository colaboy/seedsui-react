# 准备

SeedsUI 不同于其它 UI 库，为了解决样式的可控性，它的样式是 copy 到项目中的，避免了样式难改的问题，copy 样式、安装 ui 库即可使用

## 安装

```bash
$ npm install --save seedsui-react
# or
$ yarn add seedsui-react
```

## 引入组件

直接引入组件即可

```js
import { Button } from 'seedsui-react'
```

## 引入样式

- copy`seedsui-react/lib/assets`到自己的工程

```bash
├─assets
│ ├─seedsui（不允许修改, 更新 seedsui 时只需要更新此文件夹即可）
│ └─style（允许定制：包含皮肤`variables.less`、文字图标`iconfont`等）
```

- 引入样式

```less
// 全局样式
import './library/assets/style/index.less'
```

## 源码下载

```bash
git clone https://github.com/colaboy/seedsui-react.git
```

## 启动项目

```bash
npm run start
```
