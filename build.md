# 工程构建步骤

## 初始化

```bash
# 通过官方工具创建项目，选择你需要的模板
$ npx create-dumi
```

## 移动端组件研发

- 命令

```bash
npm i dumi-theme-mobile -D
```

- 配置见.dumirc.ts

## prettierrc 配置

- 修改.prettierrc.js

参考 .prettierrc.js

## 自定义首页

- .dumi 新增 pages/index/index.js
- 过滤生成路由的文件夹,

```bash
conventionRoutes: {
  // to avoid generate routes for .dumi/pages/index/components/xx
  exclude: [new RegExp('index/components/')],
},
```

## 启用 seedsui

参考 src/index.ts
