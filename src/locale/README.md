# 准备
+ 使用国际化前先执行locale.ready加载国际化文件后方可使用国际化功能

# 函数组件引用国际化
```javascript
import React, {useContext} from 'react'
import Context from 'seedsui-react/lib/Context/instance.js'

function ClassN () {
  // 将国际化引用放到主体第一行
  let {locale} = useContext(Context)
  if (!locale) locale = function (remark) {return remark || ''}

  // 使用国际化
  {locale('筛选')}
}
```

# Class组件引用国际化
> constructor(props)中不能使用此方法, 直接用下一节Js引用国际化的方法
```javascript
import Context from 'seedsui-react/lib/Context/instance.js'
class ClassN {
  // 赋值国际化到context对象中
  static contextType = Context
  ComponentDidMount () {
    // 使用国际化
    let {locale} = this.context
    if (!locale) locale = function (remark) {return remark || ''}
    {locale('筛选')}
  }
}
```

# Js引用国际化
> Js引用方法也可以用在Class组件和函数组件中
```javascript
import locale from 'utils/locale'

// 使用国际化
locale('筛选')
```

# 使用变量
```javascript
// 国际化中的json: {'key': '半径{0}米'}
locale('半径1000米', 'key', [1000]) // => 半径1000米
```


# 国际化文件中没有此字段怎么办？
> 没有的话, 先将此字段记录下来, 统一汇总后发给董阳, 等翻译完成后, 再替换
* 没有国际化的调用
```javascript
locale('我擦') // => 我擦
```
* 翻译完成后替换
```
全局搜索“locale('我擦')”改为“locale('我擦', 'key')”
```