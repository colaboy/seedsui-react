---
category: Components
group: 反馈
title: IndexBar
---

# IndexBar

IndexBar 需要包裹滚动容器

## 何时使用

标记了一个或封装一组操作命令，响应用户点击行为，触发相应的业务逻辑。

## 示例

<code src="./demos/demo1.jsx"></code>

## Button

### 属性

| 属性     | 说明     | 类型      | 默认值  |
| -------- | -------- | --------- | ------- |
| disabled | 是否禁用 | `boolean` | `false` |

### Ref

| 属性       | 说明                 | 类型                   |
| ---------- | -------------------- | ---------------------- |
| rootDOM    | 原始 button 元素     | `HtmlDivElement`       |
| getRootDOM | 获取原始 button 元素 | () => `HtmlDivElement` |
