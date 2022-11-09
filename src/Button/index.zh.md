---
nav:
  title: Button
  path: /components
---

## Button

Demo:

```tsx
import React from 'react'
import { Button } from 'seedsui-react'

export default () => (
  <>
    <div>填充模式</div>
    <Button>(Default)</Button>
    <Button className="primary">primary</Button>
    <Button className="primary outline">primary outline</Button>

    <div>块级按钮</div>
    <Button className="primary flex">primary flex</Button>

    <div>按钮尺寸</div>
    <Button className="primary sm">primary xs</Button>
    <Button className="primary sm">primary sm</Button>
    <Button className="primary md">primary md</Button>
    <Button className="primary lg">primary lg</Button>
    <Button className="primary xl">primary xl</Button>

    <div>按钮颜色</div>
    <Button>(Default)</Button>
    <Button className="primary">primary</Button>
    <Button className="cancel">cancel</Button>
    <Button className="submit">submit</Button>
    <Button className="info">info</Button>
    <Button className="link">link</Button>
    <Button className="warn">warn</Button>
    <Button className="success">success</Button>
    <Button className="disabled">disabled</Button>
  </>
)
```

编写演示的更多技巧: https://d.umijs.org/guide/basic#write-component-demo
