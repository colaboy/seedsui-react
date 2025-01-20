---
category: Utils
group: 平台工具
title: LocaleUtil
---

# LocaleUtil

## LocaleUtil.languageMap

支持的语言列表

## LocaleUtil.setLanguage

LocaleUtil.setLanguage(language)设置语言, 设置后, 两个变量将有值: window.seedsLocaleLanguage 标识语言, window.seedsLocaleData 记录国际化数据

## LocaleUtil.text

LocaleUtil.setLanguage 后, LocaleUtil.text 默认读取 window.seedsLocaleData 对象, 也可以增加 window.localeData 对象覆盖 window.seedsLocaleData 对象

```javascript
import React from 'react'
import { locale } from 'seedsui-react'

// 其中key的值为: 半径{0}米
LocaleUtil.text('半径1000米', 'key', [1000]) // => 半径1000米
```

`也可以通过直接修改window.localeData修改国际化数据`

## SeedsUI 内部国际化文件

- assets/seedsui/locales/en_US.js
- assets/seedsui/locales/zh_CN.js
- assets/seedsui/locales/zh_HK.js
- assets/seedsui/locales/vi_VN.js
