# Layout

Used to start an immediate operation.

## When to Use

Marks or encapsulates a group of operation commands, responds to user click behavior, and triggers corresponding business logic.

## Demos

<code src="./demos/demo1.jsx"></code>

## Page

### Props

| Name     | Description                    | Type      | Default |
| -------- | ------------------------------ | --------- | ------- |
| disabled | Should the button be disabled. | `boolean` | `false` |

### CSS

| components.less | 说明     |
| --------------- | -------- |
| .setPage()      | 按钮样式 |

### Ref

| Name       | Description               | Type                   |
| ---------- | ------------------------- | ---------------------- |
| rootDOM    | Native button element     | `HtmlDivElement`       |
| getRootDOM | Get native button element | () => `HtmlDivElement` |

编写演示的更多技巧: https://d.umijs.org/guide/basic#write-component-demo
