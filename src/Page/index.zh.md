---
nav:
  title: Page
  path: /components
---

# Page 主体

用于开始一个即时操作。

## 何时使用

标记了一个或封装一组操作命令，响应用户点击行为，触发相应的业务逻辑。

## 示例

<code src="./demos/demo1.tsx"></code>

## Page

### 属性

| 属性     | 说明     | 类型      | 默认值  |
| -------- | -------- | --------- | ------- |
| disabled | 是否禁用 | `boolean` | `false` |

### CSS 修改

| variables.less | 说明     |
| -------------- | -------- |
| .setPage()     | 按钮样式 |

### Ref

| 属性       | 说明                 | 类型                   |
| ---------- | -------------------- | ---------------------- |
| rootDOM    | 原始 button 元素     | `HtmlDivElement`       |
| getRootDOM | 获取原始 button 元素 | () => `HtmlDivElement` |