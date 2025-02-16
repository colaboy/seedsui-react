---
category: Utils
group: 平台工具
title: locale
---

# locale

locale 的数据来源于 window.localeData，格式为{'key': 'value'}, 所以在使用 locale 时必须先确保 window.localeData 是有数据的

## SeedsUI 内部国际化数据

- seedsui-react/assets/seedsui/locale/locales/en_US.js
- seedsui-react/assets/seedsui/locale/locales/zh_CN.js
- seedsui-react/assets/seedsui/locale/locales/zh_HK.js

## 函数国际化

在使用国际化前修改 window.localeData 对象, locale 函数将从此对象上读取 key

```javascript
import React from 'react'
import { locale } from 'seedsui-react'

// 其中key的值为: 半径{0}米
locale('半径1000米', 'key', [1000]) // => 半径1000米
```
