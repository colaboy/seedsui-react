---
nav:
  title: Started
  path: /guide
---

## 国际化

locale 的数据来源于 window.localeData，格式为{'key': 'value'}
所以在使用 locale 时必须先确保 window.localeData 是有数据的

# 函数组件引用国际化

```javascript
import React from 'react'
import { locale } from 'seedsui-react'

locale('半径1000米', 'key', [1000]) // => 半径1000米
```
