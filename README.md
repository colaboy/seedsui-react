[TOC]

# 简介

SeedsUI,专为移动设备设计的 UI 框架,组件全面可换肤,以后将会有 react 版和 vue 版、h5 版

# 安装

```js
npm install seedsui-react --save
```

# 废弃组件

- Header 换为 Layout.Header
- ContainerPull、Dragrefresh、Container、Body 换为 Layout.Main
- Footer 换为 Layout.Footer
- Actionsheet 换为 Actionsheet.Combo 和 Actionsheet.Modal
- Alert 换为 Modal
- InputText、InputPassword、InputArea、InputTel、InputNumber、InputPre、InputPre、InputStar、InputRange 换为 Input.xx
- InputLocation 换为 Location.Combo
- InputPicker 换为 Picker.Combo
- InputSelect 换为 Select.Combo
- InputDate 换为 DatePicker.Combo
- InputDistrict 换为 Cascader.DistrictCombo
- Popover 换为 Tooltip
- Bridge.showToast('') 换为 Toast.show({content: ''})
- Bridge.showLoading() 换为 Loading.show()
- Bridge.showAlert('') 换为 Modal.alert
- Bridge.showConfirm('') 换为 Modal.confirm
- MapView、MapChoose 换为 Location/Modal/Preview、Choose
- Tabbar 换为 Tabs
- Tree 换为 TreePicker

# 导入组件

## 引入 less

- 支持 Less(如果工程已经支持了忽悠此条)

- 拷贝 assets 文件夹

## 国际化

- 拷贝 assets/locale 文件夹

### Js 引用国际化

> Js 引用方法也可以用在 Class 组件和函数组件中

```javascript
import locale from 'utils/locale'

// 使用国际化
locale('中文', 'key', [变量])
```

# 组件规范

> 为了使开发者不感觉到使用 SeedsUI 是在学习一种新的语言，所以 SeedsUI 整体 API 的设计尽量使用 W3C 和 React 的规范，使开发者感觉到仍然在使用 React 原生 DOM 在开发，从而能够节省更多的学习时间和使用体验：

- 所有事件名称均为 on 开头, 例如 onChange
- 所有组件内属性后缀都使用 Props, 例如 maskProps, 组件属性开头大写，例如 ModalProps
- 组合控件分为 Combo 和 Dialog，例如 Picker.Combo、Picker.Modal
- 组件入参和出参一致：value 和 onChange(value)

# 组件

## Actionsheet.Combo 卡片弹框

[源码](https://unpkg.com/seedsui-react/src/lib/Actionsheet/Combo/index.js)

### 属性

参考[Picker.Combo](##Picker.Combo)

### 示例

参考[Picker.Combo](##Picker.Combo)

## Actionsheet.Modal 卡片弹框

[卡片框](https://unpkg.com/seedsui-react/src/lib/Actionsheet/Modal/index.js)

### 属性

```javascript
<Actionsheet.Modal
  // 标准属性见Picker.Modal标准属性
  // 定制属性
  maskProps={遮罩属性 object}
  groupProps={组属性 object}
  optionProps={项属性 object}
  cancelProps={取消属性 object}
  animation={动画 string, 默认'slideUp'} // slideLeft | slideRight | slideUp | slideDown | zoom | fade
/>
```

### 示例

见[Picker.Modal](##Picker.Modal)

[返回目录](#简介)

## Alert 弹出框

[对话框](https://unpkg.com/seedsui-react/src/lib/Alert/Alert.js)

### 建议

Alert 组件更适用于复杂的定制弹框,一般弹框建议直接使用 Api 直接调用:

- alert 框:Bridge.showAlert(msg)代替
- confirm 框:Bridge.showConfirm(msg, {success: fn, fail: fn})代替

详见[Bridge 桥接库](#bridge) 桥接库

### 属性

```javascript
<Alert
  portal={传送dom object, 默认document.getElementById('root')}
  show={*显隐 bool, 默认false}
  animation={动画 string, 默认'zoom'}  // slideLeft | slideRight | slideUp | slideDown | zoom | fade | none
  duration={动画时长 number, 默认无}

  maskAttribute={遮罩属性 object, 默认无}

  style={容器style object, 默认无}
  className={容器className string, 默认无}

  caption={标题文字 node, 默认无}
  captionAttribute={标题属性 object, 默认无}

  icon={图标dom node, 默认无}

  contentStyle={内容style object, 默认无}
  contentAttribute={内容属性 object, 默认无}



  submitCaption={确定按钮文字 node, 默认'确定'}
  submitAttribute={确定按钮属性 object, 默认无}

  cancelCaption={取消按钮文字 node, 默认'取消'}
  cancelAttribute={取消按钮属性 object, 默认无}

  children={内容 node, 默认无}
  {...others}
/>
```

### 示例

```javascript
import Alert from 'seedsui-react/lib/Alert'

const [show, setShow] = useState(false)

function handleClick () {
  setShow(!show)
}

<Alert
  show={show}
  className="transition-duration-0"
  maskAttribute={{ className: 'transition-duration-0' }}
  portal={document.body}
  submitAttribute={{ onClick: handleClick, disabled: false }}
  cancelAttribute={{ onClick: handleClick }}
  caption={'持卡人说明'}
>
  为了资金安全，只能绑定当前持卡人的银行卡，如需绑定其他持卡人的银行卡，请更换实名信息。
</Alert>
<input type="button" value="显隐" onClick={onClick}/>
```

[返回目录](#简介)

## Attach 附件

[附件控件](https://unpkg.com/seedsui-react/src/lib/Attach/Attach.js)

### 属性

```javascript
<Attach
  {...others}
  list={照片列表 array, 默认无} // [{thumb: '', src: '', children: node}]
  uploading={是否上传中 bool, 默认无}
  onChoose={点击上传按钮 func(e), 默认无, 有此属性才会显示上传按钮} // 浏览器会显示file框onChoose(e), 并监听file框change事件
  onDelete={点击删除选择 func(e, src, selected, index), 默认无, 有此属性才会显示删除按钮}
  onClick={点击一项 func(e, src, selected, index), 默认无}
/>
```

### 示例

```javascript
import Attach from 'seedsui-react/lib/Attach'
const list = [
  {
    name: '1',
    src: 'https://image-test.waiqin365.com/6069734652819592543/blog/201912/8194157084989375804.png?x-oss-process=style/zk320'
  },
  {
    name: '2',
    src: 'https://img.zcool.cn/community/01a9a65dfad975a8012165189a6476.jpg'
  }
]

function handleClick(e, src, selected, index) {
  console.log('点击')
  console.log(e, src, selected, index)
}
function handleChoose(e) {
  console.log('选择')
  console.log(e.target)
}
function handleDelete(e, src, selected, index) {
  console.log('删除')
  console.log(e, src, selected, index)
}

;<Attach list={list} onChoose={handleChoose} onDelete={handleDelete} onClick={handleClick} />
```

[返回目录](#简介)

## Badge

[徽章](https://unpkg.com/seedsui-react/src/lib/Badge/Badge.js)

### 属性

```javascript
<Badge
  children={内容 node, 默认无}
  limit={位数限制 number, 默认2, 如:1000,将显示99+}
  ellipsis={位数限制省略号 string, 默认'+'} // 有limit属性时ellipsis才生效
  {...others}
/>
```

### 示例

```javascript
import Badge from 'seedsui-react/lib/Badge';

<Badge>{cartCount}</Badge>}
```

[返回目录](#简介)

## BiClock

[时钟](https://unpkg.com/seedsui-react/src/lib/BiClock/BiClock.js)

### 属性

```javascript
<BiClock
  lineWidth={边框宽度px number, 默认2}
  size={宽高大小px number, 默认50}
  time={时间 string, 默认'00:00'} // 格式 hh:mm
  className={容器className string, 默认无, 基础'bi-clock'}
  style={容器style object, 默认无}

  duration={动画时长 number, 默认1000}
  delay={延时 number, 默认100}
/>
```

### 示例

```javascript
import BiClock from 'seedsui-react/lib/BiClock'
;<BiClock time="11:30" />
```

[返回目录](#简介)

## BiDoughnut

[环形图](https://unpkg.com/seedsui-react/src/lib/BiDoughnut/BiDoughnut.js)

### 属性

```javascript
<BiDoughnut
  borderWidth={边框宽度px number, 默认3}
  size={宽高大小px number, 默认50}
  duration={动画时长 number, 默认1000}
  rotate={旋转角度 number, 默认0, 最大360}
  delay={延时 number, 默认100}

  className={容器className string, 默认无, 基础'bi-doughtut'}
  style={容器style object, 默认无}

  captionAttribute={中间内容属性 object, 默认无}
  children={中间内容 node, 默认无}
>
标题内容
<BiDoughnut>
```

### 示例

```javascript
import BiDoughnut from 'seedsui-react/lib/BiDoughnut';

<BiDoughnut rotate={15} className="success">
  待审批
</BiDoughnut>
<BiDoughnut rotate={45} className="warn">
  准备中
</BiDoughnut>
<BiDoughnut rotate={315} className="submit">
  进行中
</BiDoughnut>
<BiDoughnut rotate={360} className="disabled">
  已结束
</BiDoughnut>
<BiDoughnut rotate={120} className="cancel">
  已取消
</BiDoughnut>
```

[返回目录](#简介)

## BiGauge

[仪表盘](https://unpkg.com/seedsui-react/src/lib/BiGauge/BiGauge.js)

### 属性

```javascript
<BiGauge
  duration={动画时长 number, 默认1000}
  rotate={旋转角度 number, 默认0, 最大270}
  delay={延时 number, 默认100}

  captionAttribute={标题属性 object, 默认无}
  children={标题内容 node, 默认无}
>
标题内容
<BiGauge>
```

### 示例

```javascript
import BiGauge from 'seedsui-react/lib/BiGauge'
;<BiGauge rotate={15} className="success">
  15
</BiGauge>
```

[返回目录](#简介)

## Bridge

[桥接](https://unpkg.com/seedsui-react/src/lib/Bridge/index.js)
, 现支持四个平台的桥接适配, 浏览器、订货、外勤 JSBridge、外勤 Cordova、微信客户端

### 对象

```javascript

```

### 示例

```javascript
import Bridge from 'seedsui-react/lib/Bridge'

Bridge.showToast('提交成功', {
  mask: true,
  success: () => {
    history.go(-1)
  }
})
```

[返回目录](#简介)

## Button

[按钮](https://unpkg.com/seedsui-react/src/lib/Button/Button.js)

### 属性

```javascript
<Button
  children={子元素 node, 默认无}
  {...others}
>
  按钮内容
</Button>
```

### 示例

```javascript
import Button from 'seedsui-react/lib/Button'
;<Button className="lg">提交</Button>
```

[返回目录](#简介)

## Calendar

[日历](https://unpkg.com/seedsui-react/src/lib/Calendar/Calendar.js)

### 属性

```javascript
<Calendar
  type={日历类型 string, 默认'month'} // 'week' | 'month'
  value={选中日期 date, 默认new Date()}
  titleFormat={是否显示周数 string, 默认'YYYY年MM月DD日'} // 标题日期格式化 YYYY年MM月DD日 周E 第W周
  min={禁用此前日期 date, 默认无}
  max={禁用此后日期 date, 默认无}
  verticalDrag={是否允许垂直拖动 bool, 默认true}
  prevHTML={左箭头html string, 默认'&lt'}
  nextHTML={右箭头html string, 默认'&gt'}
  onChange={选中日期发生变化 func(value)}
  onError={非法操作,如选择禁用日期 func({errMsg: '', min: '', value: value})}
/>
```

### 示例

```javascript
import Calendar from 'seedsui-react/lib/Calendar'
const calendarRef = useRef(null)
const [value, setValue] = useState(new Date())

function handleChange(newValue) {
  console.log('修改', newValue)
  setValue(newValue)
}
function handleError(err) {
  console.log(err.errMsg)
}
function showMonth() {
  calendarRef.current.showMonth()
  // let instance = calendarRef?.current?.getInstance()
  // instance.showMonth()
}
function showWeek() {
  calendarRef.current.showWeek()
  // let instance = calendarRef?.current?.getInstance()
  // instance.showWeek()
}
function showToday() {
  calendarRef.current.jumpTo('today')
  // let instance = calendarRef?.current?.getInstance()
  // instance.setToday()
}
function showReset() {
  calendarRef.current.jumpTo('default')
  // let instance = calendarRef?.current?.getInstance()
  // instance.setDefaultDate()
}
function showCustom() {
  calendarRef.current.jumpTo(new Date('1988,08,22'))
  // let instance = calendarRef?.current?.getInstance()
  // instance.setDate(new Date('1988,08,22'))
}
function handleNext() {
  let instance = calendarRef?.current?.getInstance()
  if (instance) {
    instance.slideXToNext()
  }
}
function handlePrev() {
  let instance = calendarRef?.current?.getInstance()
  if (instance) {
    instance.slideXToPrev()
  }
}

<Calendar
  type="week"
  ref={calendarRef}
  value={value}
  titleFormat="YYYY年MM月DD日 周EE 第W周"
  prevHTML="<" // 左箭头
  nextHTML=">" // 右箭头
  onChange={handleChange}
  onError={handleError}
  min={new Date()} // 禁用今天以前的日期
  max={new Date('2022,06,27')} // 禁用今天以前的日期
/>
<a style={{ margin: '8px' }} className="button lg bg-1" onClick={showMonth}>
  月
</a>
<a style={{ margin: '8px' }} className="button lg bg-2" onClick={showWeek}>
  周
</a>
<a style={{ margin: '8px' }} className="button lg bg-3" onClick={showToday}>
  今天
</a>
<a style={{ margin: '8px' }} className="button lg bg-4" onClick={showReset}>
  默认日期
</a>
<a style={{ margin: '8px' }} className="button lg bg-4" onClick={showCustom}>
  1988-08-22
</a>
<a style={{ margin: '8px' }} className="button lg bg-4" onClick={handlePrev}>
  上一页
</a>
<a style={{ margin: '8px' }} className="button lg bg-4" onClick={handleNext}>
  下一页
</a>
```

[返回目录](#简介)

## Camera H5 拍照与录相功能

[h5 拍照与录相功能](https://unpkg.com/seedsui-react/src/lib/Camera/Camera.js)

### 属性

```javascript
<Camera
  portal={传送dom object, 默认document.getElementById('root')}
  onHide={点击隐藏按钮 func, 默认无}
  onRecord={录相 func(e), 默认无} // 有onRecord
  maxDuration={最大录相时长 number, 默认10秒}
  children={子元素 node, 默认无}
  {...others}
/>
```

### 示例

```javascript
import Camera from 'seedsui-react/lib/Camera'
// h5录相完成后保存
function saveRecord(e) {
  var data = new FormData()
  data.append('file', e.target)
  // 保存, 仅为示例, 并非真实接口
  var req = new XMLHttpRequest()
  req.open('POST', 'com.spinsoft.bip.frame.utils.image.saveMp4.biz.ext')
  req.send(data)
}

{
  /* 录相 */
}
{
  showRecord && <Camera onHide={() => setShowRecord(false)} onRecord={saveRecord} />
}
```

[返回目录](#简介)

## Card

[卡片](https://unpkg.com/seedsui-react/src/lib/Card/Card.js)

### 属性

```javascript
<Card
  children={子元素 node, 默认无}
  {...others}
>
卡片内容
</Card>
```

### 示例

```javascript
import Card from 'seedsui-react/lib/Card'
;<Card>卡片内容</Card>
```

[返回目录](#简介)

## Chat

[聊天框](https://unpkg.com/seedsui-react/src/lib/Chat/Chat.js)

### 属性

```javascript
<Chat
  icon={头像 node, 默认无}

  caption={内容标题 node, 默认无}
  captionAttribute={内容标题属性 object, 默认无}

  contentAttribute={文本容器属性 object, 默认无} // 例如: contentAttribute={className: 'chat-content'}
  textAttribute={文本属性 object, 默认无}

  children={text容器内子元素 node, 默认无}

  {...others}
/>
```

### 示例

```javascript
import Chat from 'seedsui-react/lib/Chat';

<div className="chat-time" style={{margin: '10px'}}>
  <div className="chat-time-text">2016-05-12 16:25</div>
</div>
<Chat
  icon={<div className="chat-author">
    <div className="chat-author-avatar" style={{backgroundImage: 'url(//res.waiqin365.com/d/dinghuo365/customer.png)'}}></div>
    <div className="chat-author-name">作者</div>
  </div>}
>
你们的这个碗的价格实在太贵了，我上次买了一批货，很多顾客都抱怨，要求退货！！！
</Chat>
<Chat
  className="right"
  caption="苏州天天批发"
  icon={<div className="chat-author">
    <div className="chat-author-avatar" style={{backgroundImage: 'url(//res.waiqin365.com/d/dinghuo365/service.png)'}}></div>
    <div className="chat-author-name">作者</div>
  </div>}
>
您好，这个碗是我们公司的高端艺术碗，由于是意大利设计师进行设计，因此定价比较高。我们公司有7天无条件退货服务，请拨打400-3456-7890进行退货操作。谢谢！
</Chat>
```

[返回目录](#简介)

## Checkbox

[复选框](https://unpkg.com/seedsui-react/src/lib/Checkbox/Checkbox.js)

### 属性

```javascript
<Checkbox
  value={复选框value string, 默认无}
  checked={是否选中 bool, 默认false}

  disabled={是否禁用 bool, 默认false}

  inputProps={文本框属性 object, 默认无}

  captionProps={标题属性 object, 默认无}
  onChange={点击复选框 func(checked)}
  children={子元素}
  {...others}
/>
```

### 示例

```javascript
import Checkbox from 'seedsui-react/lib/Checkbox'

const [value, setValue] = useState(false)

function handleChange(newChecked) {
  setValue(newChecked)
}

;<Checkbox checked={value} onChange={handleChange}>
  开
</Checkbox>
```

[返回目录](#简介)

## Layout.Main

[源码](https://unpkg.com/seedsui-react/src/lib/Layout/Main/index.js)

### 属性

```javascript
<Layout.Main
  onTopRefresh={头部刷新 func()}
  onBottomRefresh={头部刷新 func()}
  {...others}
>
内容
</Layout.Main>
```

### 示例-动态加载

```javascript
import { Layout } from 'seedsui-react'
import Bottom from 'seedsui-react/lib/Layout/Main/Bottom'

// 全局变量
let page = 0
const data = [
  {
    id: '1',
    name: '数据'
  },
  {
    id: '2',
    name: '数据'
  },
  {
    id: '3',
    name: '数据'
  },
  {
    id: '4',
    name: '数据'
  },
  {
    id: '5',
    name: '数据'
  },
  {
    id: '6',
    name: '数据'
  },
  {
    id: '7',
    name: '数据'
  },
  {
    id: '8',
    name: '数据'
  },
  {
    id: '9',
    name: '数据'
  },
  {
    id: '10',
    name: '数据'
  },
  {
    id: '11',
    name: '数据'
  },
  {
    id: '12',
    name: '数据'
  },
  {
    id: '13',
    name: '数据'
  },
  {
    id: '14',
    name: '数据'
  },
  {
    id: '15',
    name: '数据'
  },
  {
    id: '16',
    name: '数据'
  },
  {
    id: '17',
    name: '数据'
  },
  {
    id: '18',
    name: '数据'
  },
  {
    id: '19',
    name: '数据'
  },
  {
    id: '20',
    name: '数据'
  }
]

const [bottomType, setBottomType] = useState('loading')
let [list, setList] = useState([])

function handleTopRefresh() {
  console.log('头部刷新')
  return getList(false)
}
function handleBottomRefresh() {
  console.log('底部刷新')
  return getList(true)
}

// 获取列表的基本方法
function getList(isNext) {
  return new Promise((resolve) => {
    if (page >= 3) {
      resolve(true)
      console.log(`第${page}页, 刷新完成`)
      setBottomType('noMore')
      return
    }

    // 分页
    if (isNext) {
      page++
    } else {
      page = 1
    }

    console.log(`第${page}页, 开始刷新`)

    setTimeout(() => {
      Bridge.hideLoading()
      // 设置数据
      const serList = data
      if (isNext) {
        list = list.concat(serList)
        setList(list)
      } else {
        setList(serList)
      }
      resolve(true)
    }, 2000)
  })
}

;<Layout.Main onBottomRefresh={handleBottomRefresh}>
  {list.map((item, index) => {
    return (
      <div className="flex flex-middle" style={{ height: '44px' }} key={index}>
        {item.name}
      </div>
    )
  })}
  <Bottom type={bottomType} />
</Layout.Main>
```

[返回目录](#简介)

## Counter

[千分位计数器](https://unpkg.com/seedsui-react/src/lib/Counter/Counter.js)

### 属性

```javascript
<Counter
  duration={动画时长 number, 默认5000}
  thousandth={千分位数值 number, 默认无}
  from={开始数字 number, 默认无}
  to={结束数字 number, 默认无}
  suffix={数字不变的后缀 string, 默认无} // 如设置为/10, 则显示为0/10
  autoPlay={是否自动播放 bool, 默认true}
  {...others}
/>
```

### ref 方法

```javascript
play() // 播放
```

### 示例: 手动触发播放

```javascript
import Counter from 'seedsui-react/lib/Counter'

const counterRef = useRef(null)

function playCounter() {
  counterRef.current.instance.current.play()
}

;<Counter from={0} to={500} autoPlay={false} ref={counterRef} />
```

### 示例: 自动播放

```javascript
import Counter from 'seedsui-react/lib/Counter'
;<Counter from={20} to={500} />
```

[返回目录](#简介)

## DatePicker.RangeCombo 日期快捷选择

[源码](https://unpkg.com/seedsui-react/src/lib/DatePicker/RangeCombo/index.js)

### 属性

```javascript
<DatePicker.RangeCombo
  // 自定义弹框属性
  caption={时间区间标题 string, 默认'自定义时间'}
  separator={时间区间分隔符 string, 默认'~'}
  min={最小值 Date, 默认无}
  max={最大值 Date, 默认无}
  type={日期类型 string, 默认'date'} // year | quarter | month | date | time | datetime
  format={显示的日期格式化 string, 默认'YYYY-MM-DD'}
  enableAlias={显示别名 boolean, 默认true}
  daysLimit={天数限制 number, 默认90}
  ranges={范围 object|number, 默认
    {
      [locale('今天', 'datepicker-tooltip_today')]: [new Date(), new Date()],
      [locale('昨天', 'datepicker-tooltip_yesterday')]: [
        new Date().prevDate(),
        new Date().prevDate()
      ],
      [locale('本月', 'datepicker-tooltip_this_month')]: [
        new Date().firstMonthDate(),
        new Date()
      ],
      [locale('上月', 'datepicker-tooltip_last_month')]: [
        new Date().prevMonth().firstMonthDate(),
        new Date().prevMonth().lastMonthDate()
      ],
      [locale('最近7天', 'datepicker-tooltip_last_days', ['7'])]: [
        new Date().prevDate(7),
        new Date()
      ],
      [locale('最近30天', 'datepicker-tooltip_last_days', ['30'])]: [
        new Date().prevDate(30),
        new Date()
      ],
      [locale('自定义时间', 'datepicker-tooltip_custom_date')]: {
        '弹框标题': [new Date().prevDate(30), new Date()]
      }
    }
  } // 如果范围为空, 则默认弹出自定义时间, 如果范围为数值, 则限定自定义时间的相差天数
  onError={错误 func({errMsg: '', min: '', value: ''}), 默认无}
  ModalProps={弹框组件属性 object}

  // 标准属性见Picker.Combo标准属性
  value={值 Array<Date>, 默认无}
  {...props}
/>
```

### 示例-日期选择

```javascript
import DatePicker from 'seedsui-react/lib/DatePicker'

const [value, setValue] = useState(null)

function handleChange(value) {
  console.log(value)
  setValue(value)
}

;<DatePicker.Combo
  className="border-b"
  maskClosable={false}
  type="date"
  // min={new Date()}
  // max={new Date()}
  onChange={setValue}
  onError={(err) => console.log(err)}
  value={value}
/>
```

### 示例-时间区间

```javascript
import DatePicker from 'seedsui-react/lib/DatePicker'
const datePickerRef = useRef(null)

const [value, setValue] = useState(null)
let [displayValue, setDisplayValue] = useState(null)
// 显示值
function updateDisplayValue(newValue, dateName) {
  if (dateName) {
    setDisplayValue(dateName)
    return
  }
  let instance = datePickerRef?.current?.getInstance()
  if (instance) {
    displayValue = instance.getDisplayValue(newValue)
    setDisplayValue(displayValue)
  }
}

;<DatePicker.RangeCombo
  ref={datePickerRef}
  className="border-b"
  maskClosable={false}
  type="date"
  // min={new Date()}
  // max={new Date()}
  onChange={(newValue, dateName) => {
    setValue(newValue)
    updateDisplayValue(newValue, dateName)
  }}
  onError={(err) => console.log(err)}
  value={value}
>
  {displayValue}
</DatePicker.RangeCombo>
```

[返回目录](#简介)

## DatePicker.Types

[日期类型选择](https://unpkg.com/seedsui-react/src/lib/DateType/DateType.js)

### 属性

```javascript
<DatePicker.Types
  list={类型集合 array, 默认如下}
  // [
  //   {
  //     type: 'date',
  //     id: 'date',
  //     name: locale('日', 'datetype_unit_date')
  //   },
  //   {
  //     type: 'month',
  //     id: 'month',
  //     name: locale('月', 'datetype_unit_month')
  //   },
  //   {
  //     type: 'quarter',
  //     id: 'quarter',
  //     name: locale('季', 'datetype_unit_quarter')
  //   },
  //   {
  //     type: 'year',
  //     id: 'year',
  //     name: locale('年', 'datetype_unit_year')
  //   }
  // ],
  value={值 object}
  // {
  //   type: 'date',
  //   id: 'date',
  //   name: '日',
  //   value: new Date()
  // }

  // 配置
  contentAttribute={右侧内容属性 object}
  TabsAttribute={Tabs属性 object}
  DatePickerComboAttribute={DatePicker.Combo属性 object}

  onError={校验出错 func({errMsg: '', min: '', value: value})}
  onChange={修改 func(value)}
/>
```

### 示例

```javascript
const [value, setValue] = useState(null)

function handleChange(value) {
  setValue(value)
}

;<DatePicker.Types
  value={value}
  onChange={handleChange}
  TabsAttribute={{ className: 'hide' }}
  contentAttribute={{ className: 'flex flex-right' }}
/>
```

[返回目录](#简介)

## Modal

[弹出框](https://unpkg.com/seedsui-react/src/lib/Modal/Modal.js)

### 属性

```javascript
<Modal
  portal={传送dom object, 默认document.getElementById('root')}
  animation={动画 string, 默认'fade'}  // slideLeft | slideRight | slideUp | slideDown | zoom | fade

  visible={*显隐 bool, 默认false}
  maskClosable={点击遮罩是否隐藏 bool, 默认true}
  onVisibleChange={显隐状态变化 func(visible)}

  maskProps={遮罩属性 object, 默认无} // className: mask dialog-mask
  captionProps={标题属性 object}
  submitProps={确定按钮属性 object}
  cancelProps={取消按钮属性 object}

  children={内容 node, 默认无}
  {...others}
>
</Modal>
```

### 示例

```javascript
import Modal from 'seedsui-react/lib/Modal'
const [visible, setVisible] = useState(false)

function handleClick () {
  // 编程式弹出Modal.confirm、Modal.alert
  Modal.confirm({
    content: '内容',
    submitProps: {
      onClick: () => {
        console.log('您点击了确定')
        // 返回false代表不关闭
        return false
      }
    }
  })
  // 组件形式弹出
  // setVisible(true)
}
<Modal
  visible={visible}
>
  弹出框内容
</Modal>
<input type="button" value="显隐" onClick={handleClick}/>
```

[返回目录](#简介)

## Dot

[小圆点](https://unpkg.com/seedsui-react/src/lib/Dot/Dot.js)

### 属性

```javascript
<Dot {...others} />
```

### 示例

```javascript
import Dot from 'seedsui-react/lib/Dot'
;<Dot className="size8" />
```

[返回目录](#简介)

## Dropdown

[下拉菜单](https://unpkg.com/seedsui-react/src/lib/Dropdown/Dropdown.js)

### 属性

```javascript
<Dropdown
  top={头部距离 number, 默认0}
  portal={加载框传送至dom object, 默认无} // 不设置portal, 则不传送
  disabled={是否禁用 bool, 默认false}
  onChange={选中菜单发生变化 func(e, value, [{id: '', caption: ''}])}
  listRoot={一级菜单 array, 默认无} // 一级标题, 有可能和数据的id相同但名称不同
  list={菜单 array, 默认无} // 格式:[{id: '', name: '分类', data: [{id: '1', name: '测试数据1', children:[]}]}]
  tabbarProps={Tabbar组件弹框属性 object, 默认无}
  dialogProps={Dialog组件弹框属性 object, 默认无}
  menutiledProps={MenuTiled组件弹框属性 object, 默认无}
/>
```

### 示例

```javascript
import Dropdown from 'seedsui-react/lib/Dropdown'

const [root, setRoot] = useState([
  {
    id: '',
    name: '分类'
  },
  {
    id: '',
    name: '品牌'
  },
  {
    id: '',
    name: '筛选'
  }
])
const [items, setItems] = useState([
  {
    id: '',
    name: '分类',
    data: [
      {
        id: '',
        name: '全部',
        children: []
      },
      {
        id: '7938034417512813758',
        name: '饮料',
        children: [
          {
            id: '4622400720177680517',
            name: '碳酸饮料'
          },
          {
            id: '5800049423243362222',
            name: '茶饮料'
          },
          {
            id: '5789432343240798823',
            name: '功能饮料'
          },
          {
            id: '6413548566139705252',
            name: '饮用水'
          },
          {
            id: '6936207795217715766',
            name: '中草药饮料'
          },
          {
            id: '8746408135758103957',
            name: '蛋白质饮料'
          },
          {
            id: '7268945622944992066',
            name: '果味饮料'
          },
          {
            id: '9138462844675316911',
            name: '咖啡'
          }
        ]
      },
      {
        id: '7746459719734369628',
        name: '零食',
        children: [
          {
            id: '9134066222295231258',
            name: '蜜饯果干'
          },
          {
            id: '5394487194098598325',
            name: '坚果炒货'
          },
          {
            id: '9070533848545878912',
            name: '早餐面包'
          },
          {
            id: '5240328190253910837',
            name: '糖巧果冻'
          }
        ]
      }
    ]
  },
  {
    id: '',
    name: '品牌',
    data: [
      {
        id: '',
        name: '全部'
      },
      {
        id: '其他',
        name: '其他'
      },
      {
        id: '美汁源',
        name: '美汁源'
      },
      {
        id: '可口',
        name: '可口'
      },
      {
        id: '宏宝莱',
        name: '宏宝莱'
      },
      {
        id: '康师傅',
        name: '康师傅'
      },
      {
        id: '百事',
        name: '百事'
      },
      {
        id: '卫岗',
        name: '卫岗'
      },
      {
        id: '蒙牛',
        name: '蒙牛'
      },
      {
        id: '伊利',
        name: '伊利'
      },
      {
        id: '三只松鼠',
        name: '三只松鼠'
      }
    ]
  },
  {
    id: '',
    name: '筛选',
    data: [
      {
        id: '',
        name: '全部'
      },
      {
        id: 'new',
        name: '新品'
      },
      {
        id: 'importance',
        name: '重点'
      }
    ]
  }
])

function handleChange(e, value, tabs) {
  var newItems = Object.clone(items)
  tabs.forEach((item, index) => {
    newItems[index].id = item.id
    newItems[index].name = item.name
  })
  setItems(newItems)
}

;<Header>
  <Dropdown list={items} listRoot={root} onChange={handleChange} />
</Header>
{
  /* 只要单个弹窗可如下:
const root = [{
  "id": "1",
  "name": "分类",
},
{
  "id": "2",
  "name": "品牌",
},
{
  "id": "3",
  "name": "筛选",
}]
const [selected, setSelected] = useState();
function onSelected (e, value, selected) {
  setSelected(selected)
}
<DropdownDialog
  dialogProps={{
    maskAttribute: {
      onClick: () => console.log(1),
      style: {top: '44px'}
    }
  }}
  show={true}

  list={root}
  selected={[{
    "id": "2",
    "name": "品牌",
  }]}
  onChange={(e, value, selected) => ()}
/>
  */
}
```

[返回目录](#简介)

## Ellipsis 文本省略

[源码](https://unpkg.com/seedsui-react/src/lib/Ellipsis/index.js)

### 属性

```javascript
<Ellipsis
  rows={行数 number, 默认3}
  // 展开和收缩
  toggleProps={
    visible: true, // 显示
    expandText: TOGGLE_EXPAND_TEXT, // 展开文本
    collapseText: TOGGLE_COLLAPSE_TEXT // 收缩文本
  }
  html={html文本 string}
  children={node文本 node}
  {...props}
/>
```

### 示例

```javascript
import Dropdown from 'seedsui-react/lib/Dropdown'
```

## Emoji

[表情弹出输入框](https://unpkg.com/seedsui-react/src/lib/Emoji/Emoji.js)

### 属性

```javascript
<Emoji
  portal={弹出框传送至dom object, 默认document.getElementById('root')}
  autoFocus={自动获取焦点 bool, 默认false}

  value={值 string, 默认''}
  placeholder={占位文字 string, 默认''}

  onClickMask={点击遮罩 func(e)}

  maskStyle={遮罩style object, 默认无}
  maskClassName={遮罩className string, 默认无, 基础'mask emoji-mask'}

  style={容器style object, 默认无}
  className={容器className string, 默认无, 基础'emoji'}

  icon={图标dom node, 默认无}

  onChange={值变化 func(e, value)}
  onSubmit={提交 func(e, value)}
/>
```

### 示例

```javascript
import Emoji from 'seedsui-react/lib/Emoji'

const [show, setShow] = useState(false)
const [value, setValue] = useState('')

function onChange(e, value) {
  setValue(value)
}

{
  show && (
    <Emoji
      autoFocus
      onChange={onChange}
      value={value}
      maskAttribute={{ onClick: () => setShow(false) }}
    />
  )
}
;<input type="button" value="显隐" onClick={() => setShow(true)} />
```

[返回目录](#简介)

## FixTable

[表情弹出输入框](https://unpkg.com/seedsui-react/src/lib/FixTable/FixTable.js)

### 属性

```javascript
<FixTable
  thead={头部dom node, 默认无}
  tbody={身体dom node, 默认无}
  frozenThead={固定头部 bool, 默认true}
  frozenLeft={左列固定 array, 默认[]}
  frozenRight={右列固定 array, 默认[]}
  onBottomRefresh={底部刷新 func, 默认无}
  children={底部元素 node, 默认无}
  {...others}
/>
```

### 示例

```javascript
import FixTable from 'seedsui-react/lib/FixTable'

const tableRef = useRef(null)
  const thead = (
    <thead>
      <tr>
        <th>Full Name</th>
        <th>Age</th>
        <th>Column 1</th>
        <th>Column 2</th>
        <th>Column 3</th>
        <th>Column 4</th>
        <th>Column 5</th>
        <th>Column 6</th>
        <th>Column 7</th>
        <th>Column 8</th>
        <th>Action</th>
      </tr>
    </thead>
  )

  const tbody = (
    <tbody>
      <tr>
        <td>Edrward 0</td>
        <td>32</td>
        <td>London Park no. 0</td>
        <td>London Park no. 0</td>
        <td>London Park no. 0</td>
        <td>London Park no. 0</td>
        <td>London Park no. 0</td>
        <td>London Park no. 0</td>
        <td>London Park no. 0</td>
        <td>London Park no. 0</td>
        <td>
          <a>action</a>
        </td>
      </tr>
      <tr>
        <td>Edrward 0</td>
        <td>32</td>
        <td>London Park no. 0</td>
        <td>London Park no. 0</td>
        <td>London Park no. 0</td>
        <td>London Park no. 0</td>
        <td>London Park no. 0</td>
        <td>London Park no. 0</td>
        <td>London Park no. 0</td>
        <td>London Park no. 0</td>
        <td>
          <a>action</a>
        </td>
      </tr>
      <tr>
        <td>Edrward 0</td>
        <td>32</td>
        <td>London Park no. 0</td>
        <td>London Park no. 0</td>
        <td>London Park no. 0</td>
        <td>London Park no. 0</td>
        <td>London Park no. 0</td>
        <td>London Park no. 0</td>
        <td>London Park no. 0</td>
        <td>London Park no. 0</td>
        <td>
          <a>action</a>
        </td>
      </tr>
      <tr>
        <td>Edrward 0</td>
        <td>32</td>
        <td>London Park no. 0</td>
        <td>London Park no. 0</td>
        <td>London Park no. 0</td>
        <td>London Park no. 0</td>
        <td>London Park no. 0</td>
        <td>London Park no. 0</td>
        <td>London Park no. 0</td>
        <td>London Park no. 0</td>
        <td>
          <a>action</a>
        </td>
      </tr>
      <tr>
        <td>Edrward 0</td>
        <td>32</td>
        <td>London Park no. 0</td>
        <td>London Park no. 0</td>
        <td>London Park no. 0</td>
        <td>London Park no. 0</td>
        <td>London Park no. 0</td>
        <td>London Park no. 0</td>
        <td>London Park no. 0</td>
        <td>London Park no. 0</td>
        <td>
          <a>action</a>
        </td>
      </tr>
      <tr>
        <td>Edrward 1</td>
        <td>32</td>
        <td>London Park no. 1</td>
        <td>London Park no. 1</td>
        <td>London Park no. 1</td>
        <td>London Park no. 1</td>
        <td>London Park no. 1</td>
        <td>London Park no. 1</td>
        <td>London Park no. 1</td>
        <td>London Park no. 1</td>
        <td>
          <a>action</a>
        </td>
      </tr>
      <tr>
        <td>Edrward 2</td>
        <td>32</td>
        <td>London Park no. 2</td>
        <td>London Park no. 2</td>
        <td>London Park no. 2</td>
        <td>London Park no. 2</td>
        <td>London Park no. 2</td>
        <td>London Park no. 2</td>
        <td>London Park no. 2</td>
        <td>London Park no. 2</td>
        <td>
          <a>action</a>
        </td>
      </tr>
      <tr>
        <td>Edrward 3</td>
        <td>32</td>
        <td>London Park no. 3</td>
        <td>London Park no. 3</td>
        <td>London Park no. 3</td>
        <td>London Park no. 3</td>
        <td>London Park no. 3</td>
        <td>London Park no. 3</td>
        <td>London Park no. 3</td>
        <td>London Park no. 3</td>
        <td>
          <a>action</a>
        </td>
      </tr>
      <tr>
        <td>Edrward 4</td>
        <td>32</td>
        <td>London Park no. 4</td>
        <td>London Park no. 4</td>
        <td>London Park no. 4</td>
        <td>London Park no. 4</td>
        <td>London Park no. 4</td>
        <td>London Park no. 4</td>
        <td>London Park no. 4</td>
        <td>London Park no. 4</td>
        <td>
          <a>action</a>
        </td>
      </tr>
      <tr>
        <td>Edrward 5</td>
        <td>32</td>
        <td>London Park no. 5</td>
        <td>London Park no. 5</td>
        <td>London Park no. 5</td>
        <td>London Park no. 5</td>
        <td>London Park no. 5</td>
        <td>London Park no. 5</td>
        <td>London Park no. 5</td>
        <td>London Park no. 5</td>
        <td>
          <a>action</a>
        </td>
      </tr>
      <tr>
        <td>Edrward 6</td>
        <td>32</td>
        <td>London Park no. 6</td>
        <td>London Park no. 6</td>
        <td>London Park no. 6</td>
        <td>London Park no. 6</td>
        <td>London Park no. 6</td>
        <td>London Park no. 6</td>
        <td>London Park no. 6</td>
        <td>London Park no. 6</td>
        <td>
          <a>action</a>
        </td>
      </tr>
      <tr>
        <td>Edrward 7</td>
        <td>32</td>
        <td>London Park no. 7</td>
        <td>London Park no. 7</td>
        <td>London Park no. 7</td>
        <td>London Park no. 7</td>
        <td>London Park no. 7</td>
        <td>London Park no. 7</td>
        <td>London Park no. 7</td>
        <td>London Park no. 7</td>
        <td>
          <a>action</a>
        </td>
      </tr>
      <tr>
        <td>Edrward 8</td>
        <td>32</td>
        <td>London Park no. 8</td>
        <td>London Park no. 8</td>
        <td>London Park no. 8</td>
        <td>London Park no. 8</td>
        <td>London Park no. 8</td>
        <td>London Park no. 8</td>
        <td>London Park no. 8</td>
        <td>London Park no. 8</td>
        <td>
          <a>action</a>
        </td>
      </tr>
      <tr>
        <td>Edrward 9</td>
        <td>32</td>
        <td>London Park no. 9</td>
        <td>London Park no. 9</td>
        <td>London Park no. 9</td>
        <td>London Park no. 9</td>
        <td>London Park no. 9</td>
        <td>London Park no. 9</td>
        <td>London Park no. 9</td>
        <td>London Park no. 9</td>
        <td>
          <a>action</a>
        </td>
      </tr>
    </tbody>
  )

  const tfoot = (
    <tfoot>
      <tr>
        <th>底部</th>
        <th>底部</th>
        <th>底部</th>
        <th>底部</th>
        <th>底部</th>
        <th>底部</th>
        <th>底部</th>
        <th>底部</th>
        <th>底部</th>
        <th>底部</th>
        <th>底部</th>
      </tr>
    </tfoot>
  )

  useEffect(() => {
    // 动态加载底部
    if (!tableRef.current) return
    let instance = tableRef.current.getInstance()
    if (!instance) return
    let tableRoot = instance.getContainer()
    let tbody = tableRoot.querySelector('tbody')
    let tr = document.createElement('tr')
    tr.innerHTML = `<th>底部</th>
        <th>底部</th>
        <th>底部</th>
        <th>底部</th>
        <th>底部</th>
        <th>底部</th>
        <th>底部</th>
        <th>底部</th>
        <th>底部</th>
        <th>底部</th>
        <th>底部</th>`
    setTimeout(() => {
      tbody.appendChild(tr)
      instance.updateContainerSize()
    }, 3000)
    console.log(tbody)
  }, [])

<FixTable
  ref={tableRef}
  style={{ height: '300px' }}
  thead={thead}
  tbody={tbody}
  tfoot={tfoot}
  frozenThead={true}
  frozenTfoot={true}
  frozenLeft={[1]}
  frozenRight={[0, 1]}
  onBottomRefresh={() => console.log('到底了')}
/>
```

[返回目录](#简介)

## Layout

[底部内容](https://unpkg.com/seedsui-react/src/lib/Layout/index.js)
, 包含 Header,Aside,Main,Footer

### 属性

```javascript
<Layout animation={(动画, 默认无)} {...props}>
  内容
</Layout>
```

### 示例

```javascript
import {Layout} from 'seedsui-react/lib'

const { Header, Footer, Aside, Main } = Layout
<div id="root" style={{ height: '300px', position: 'relative' }}>
  <Layout className="full">
    <Header style={{ height: '44px', backgroundColor: '#7dbcea' }}>Header</Header>
    <Layout>
      <Aside style={{ width: '80px', backgroundColor: '#3ba0e9' }}>Aside</Aside>
      <Main style={{ backgroundColor: 'rgba(16, 142, 233, 1)' }}>Main</Main>
    </Layout>
    <Footer style={{ height: '44px', backgroundColor: '#7dbcea' }}>Footer</Footer>
  </Layout>
</div>
```

[返回目录](#简介)

## Group

[分组](https://unpkg.com/seedsui-react/src/lib/Group/Group.js)

### 属性

```javascript
<Group
  className={卡片className string, 默认'border-tb', 基础'group'}
  {...others}
>
分组
</Group>
```

### 示例

```javascript
import Group from 'seedsui-react/lib/Group'
;<Group>分组</Group>
```

## Handsign

[签名](https://unpkg.com/seedsui-react/src/lib/Handsign/Handsign.js)

### 属性

```javascript
<Handsign
  strokeStyle={签名颜色 string, 默认'#000'}
  lineWidth={签名线粗px number, 默认3}
  quality={存储时的图片质量 number, 默认0.92}
  suffix={图片保存类型 string, 默认'image/png'}
  width={宽度px number, 默认300} // 不能通过style设置宽度,否则canvas会错位
  height={高度px number, 默认300} // 不能通过style设置高度,否则canvas会错位
  style={签名面板style object, 默认无}
  className={签名面板className string, 默认无}
/>
```

### 示例

```javascript
import Handsign from 'seedsui-react/lib/Handsign';

this.state = {
  lineWidth: 3
}

save = () => {
  if (this.$handsign.instance.blank()) {
    console.log('空白');
    return;
  }
  if (!this.$handsign.instance.isDrew) {
    console.log('没有画过');
    return;
  }
  const sign_pic = this.$handsign.instance.save();
  console.log(sign_pic);
}
strokeStrong = () => {
  this.setState({
    lineWidth: 10
  })
}
clear = () => {
  this.$handsign.instance.clear()
}
drawBg = () => {
  this.$handsign.instance.drawBackgroundColor('#ff8800')
}

<Handsign
  ref={(el) => {this.$handsign = el;}}
  width={300}
  strokeStyle="#c72a1d"
  lineWidth={this.state.lineWidth}
  height={300}
/>
<input type="button" value="绘制背景" onClick={this.drawBg}/>
<input type="button" value="变粗" onClick={this.strokeStrong}/>
<input type="button" value="保存" onClick={this.save}/>
<input type="button" value="清除" onClick={this.clear}/>
```

[返回目录](#简介)

## ImgMark(即将废弃,使用 Vott 组件代替)

[图片标注](https://unpkg.com/seedsui-react/src/lib/ImgMark/ImgMark.js)

### 属性

```javascript
<ImgMark
  // 数据源
  src={图片地址或者base64 string, 默认无}
  data={标注数据 array, 默认无}
  // [
  //   {
  //     x1: 442,
  //     x2: 492,
  //     y1: 79,
  //     y2: 265,
  //     strokeStyle: 'red' // 可选
  //   }
  // ]
  // canvas样式
  isDrawSrc={是否连同背景一起绘制到canvas上 bool, 默认true}
  watermark={预览水印 string, 默认无}
  strokeStyle={标注颜色 string, 默认'#00ff00'}
  lineWidth={标注线粗px number, 默认3}
  quality={存储时的图片质量 number, 默认0.92}
  width={宽度px number, 默认无} // 宽度会根据调度等比例缩放,它只会影响canvas外层容器,并不会影响canvas
  height={高度px number, 默认300} // 不能通过style设置高度,否则canvas会错位
  style={标注面板style object, 默认无}
  className={标注面板className string, 默认无}

  preview={是否预览 bool, 默认true}
/>
```

### 示例

```javascript
import ImgMark from 'seedsui-react/lib/ImgMark';

const result = {
	"skuList": [{
		"x1": 442,
		"x2": 492,
		"y1": 79,
		"y2": 265
	}, {
		"x1": 51,
		"x2": 103,
		"y1": 94,
		"y2": 263
	}, {
		"x1": 221,
		"x2": 269,
		"y1": 774,
		"y2": 948
	}, {
		"x1": 64,
		"x2": 110,
		"y1": 293,
		"y2": 473
	}, {
		"x1": 598,
		"x2": 643,
		"y1": 283,
		"y2": 468
	}, {
		"x1": 251,
		"x2": 297,
		"y1": 296,
		"y2": 472
	}, {
		"x1": 266,
		"x2": 312,
		"y1": 89,
		"y2": 265
	}, {
		"x1": 198,
		"x2": 242,
		"y1": 294,
		"y2": 474
	}, {
		"x1": 311,
		"x2": 355,
		"y1": 84,
		"y2": 265
	}, {
		"x1": 646,
		"x2": 688,
		"y1": 287,
		"y2": 466
	}, {
		"x1": 155,
		"x2": 196,
		"y1": 295,
		"y2": 473
	}, {
		"x1": 84,
		"x2": 129,
		"y1": 572,
		"y2": 720
	}, {
		"x1": 431,
		"x2": 475,
		"y1": 575,
		"y2": 721
	}, {
		"x1": 219,
		"x2": 262,
		"y1": 569,
		"y2": 720
	}, {
		"x1": 131,
		"x2": 174,
		"y1": 573,
		"y2": 721
	}, {
		"x1": 176,
		"x2": 218,
		"y1": 572,
		"y2": 720
	}, {
		"x1": 137,
		"x2": 180,
		"y1": 810,
		"y2": 947
	}, {
		"x1": 388,
		"x2": 430,
		"y1": 578,
		"y2": 719
	}, {
		"x1": 587,
		"x2": 627,
		"y1": 808,
		"y2": 948
	}, {
		"x1": 263,
		"x2": 303,
		"y1": 578,
		"y2": 717
	}, {
		"x1": 355,
		"x2": 401,
		"y1": 144,
		"y2": 261
	}, {
		"x1": 423,
		"x2": 466,
		"y1": 356,
		"y2": 473
	}, {
		"x1": 382,
		"x2": 422,
		"y1": 355,
		"y2": 471
	}, {
		"x1": 672,
		"x2": 712,
		"y1": 148,
		"y2": 254
	}, {
		"x1": 552,
		"x2": 596,
		"y1": 389,
		"y2": 466
	}, {
		"x1": 512,
		"x2": 550,
		"y1": 633,
		"y2": 721
	}, {
		"x1": 589,
		"x2": 627,
		"y1": 633,
		"y2": 719
	}, {
		"x1": 472,
		"x2": 507,
		"y1": 865,
		"y2": 956
	}, {
		"x1": 468,
		"x2": 510,
		"y1": 389,
		"y2": 467
	}, {
		"x1": 553,
		"x2": 587,
		"y1": 632,
		"y2": 720
	}, {
		"x1": 544,
		"x2": 585,
		"y1": 810,
		"y2": 949
	}, {
		"x1": 217,
		"x2": 266,
		"y1": 86,
		"y2": 271
	}, {
		"x1": 580,
		"x2": 625,
		"y1": 172,
		"y2": 255
	}, {
		"x1": 403,
		"x2": 440,
		"y1": 175,
		"y2": 259
	}, {
		"x1": 510,
		"x2": 551,
		"y1": 391,
		"y2": 465
	}, {
		"x1": 324,
		"x2": 380,
		"y1": 289,
		"y2": 471
	}, {
		"x1": 348,
		"x2": 388,
		"y1": 576,
		"y2": 721
	}, {
		"x1": 507,
		"x2": 543,
		"y1": 860,
		"y2": 950
	}, {
		"x1": 628,
		"x2": 666,
		"y1": 630,
		"y2": 720
	}, {
		"x1": 305,
		"x2": 346,
		"y1": 581,
		"y2": 720
	}, {
		"x1": 127,
		"x2": 195,
		"y1": 76,
		"y2": 263
	}, {
		"x1": 628,
		"x2": 669,
		"y1": 171,
		"y2": 255
	}, {
		"x1": 98,
		"x2": 135,
		"y1": 847,
		"y2": 946
	}, {
		"x1": 182,
		"x2": 217,
		"y1": 837,
		"y2": 943
	}, {
		"x1": 538,
		"x2": 578,
		"y1": 177,
		"y2": 258
	}, {
		"x1": 493,
		"x2": 536,
		"y1": 173,
		"y2": 259
	}, {
		"x1": 212,
		"x2": 255,
		"y1": 1112,
		"y2": 1205
	}, {
		"x1": 294,
		"x2": 351,
		"y1": 764,
		"y2": 939
	}]
};

const result1 = {
	"skuList": [{
		"x1": 442,
		"x2": 492,
		"y1": 79,
		"y2": 265
	}, {
		"x1": 51,
		"x2": 103,
		"y1": 94,
		"y2": 263
  }]
};

const result2 = {
	"skuList": [{
		"x1": 493,
		"x2": 536,
		"y1": 173,
		"y2": 259
	}, {
		"x1": 212,
		"x2": 255,
		"y1": 1112,
		"y2": 1205
	}, {
		"x1": 294,
		"x2": 351,
		"y1": 764,
		"y2": 939
	}]
};

this.state = {
  data: []
};

onChangeData = () => {
  this.setState({
    data: result.skuList
  })
}
onChangeData1 = () => {
  this.setState({
    data: result1.skuList
  })
}
onChangeData2 = () => {
  this.setState({
    data: result2.skuList
  })
}

<ImgMark
  watermark="//res.waiqin365.com/d/common_mobile/images/placeholder/watermark.png"
  height={300}
  src="http://image-test.waiqin365.com/6692513571099135446/sku/201809/20180911195747712_05105130_CAMERA_21001006280.jpg" // 示例中,图片跨域请用cross插件解决
  data={this.state.data}
/>
<input type="button" value="全部" onClick={this.onChangeData}/>
<input type="button" value="切换1" onClick={this.onChangeData1}/>
<input type="button" value="切换2" onClick={this.onChangeData2}/>
```

[返回目录](#简介)

## ImgLazy

[懒人加载](https://unpkg.com/seedsui-react/src/lib/ImgLazy/ImgLazy.js)
, 主要为了解决图片过多, 造成网络阻塞的问题, 一般采用的是滚动加载, 并在页面加载完成后, 执行滚动加载方法 load()

### 对象实例

```javascript
var imglazy = new ImgLazy({
  overflowContainer: el, // 滚动区域, 滚动加载时需要用到, 默认document.body
  load: 'scroll', // scroll 滚动加载 | queue 队列加载 | all 全部加载
  threshold: 300, // 滚动加载时, 上下扩展px加载
  loadAttr: 'data-load-src', // 加载地址
  errorAttr: 'data-error-src', // 错误地址
  completeAttr: 'data-complete' // 完成加载, data-complete=0代表加载错误, =1代码加载正确
})
```

### 对象方法

```javascript
load() // 加载图片, load为scroll时加载可见区域, queue时队列加载完所有图片, all时加载所有图片
```

### 示例

```javascript
import ImgLazy from 'seedsui-react/lib/ImgLazy'

// 懒人加载
this.setState({
  lazy: new ImgLazy({
    overflowContainer: this.$elDrag.$el
  })
})

// 在页面加载完成的时候
this.state.lazy.load()
```

[返回目录](#简介)

## IndexBar

[索引栏](https://unpkg.com/seedsui-react/src/lib/IndexBar/IndexBar.js)
, IndexBar 组件默认在 IndexBar 包裹的容器(会渲染成上相邻元素)内寻找 data-indexbar-anchor 属性的元素, 将值集合到 IndexBar 容器内, 滑动或点击切换时, 修改上相邻组件的 scrollTop, 以达到滚动的效果

### 属性

```javascript
<IndexBar
  container={滚动容器 node, 默认无}
  children={滚动容器 node, 默认无} // container存在时优先级高于children
/>
```

### 示例

```javascript
import { IndexBar } from 'seedsui-react/lib'
;<div className="position-relative" style={{ height: '500px', overflow: 'hidden' }}>
  <IndexBar>
    <div className="position-relative" style={{ height: '500px', overflow: 'auto' }}>
      <ul>
        <IndexBar.Anchor name={'A'}>
          <li>标题A</li>
        </IndexBar.Anchor>
        <li>阿华</li>
        <li>阿敏</li>
        <li>阿全</li>
        <li>阿达</li>

        <IndexBar.Anchor name={'B'}>
          <li>标题B</li>
        </IndexBar.Anchor>
        <li>白起</li>
        <li>白旭</li>
        <li>冰冰</li>
        <IndexBar.Anchor name={'C'}>
          <li>标题C</li>
        </IndexBar.Anchor>
        <li>曹操</li>
        <li>曹鸣</li>
        <li>曹捷</li>
        <li>陈真</li>
        <li>陈进</li>
        <li>陈明</li>
        <li>陈伟</li>
        <li>陈文</li>
        <li>陈晓</li>
        <li>陈娟</li>
        <li>成勇</li>
        <li>成婷</li>
        <li>成龙</li>
        <IndexBar.Anchor name={'D'}>
          <li>D</li>
        </IndexBar.Anchor>
        <li>大成子</li>
        <li>大舅子</li>
        <li>戴笠</li>
        <li>戴坤</li>
        <li>戴成虎</li>
        <li>邓小平</li>
        <li>邓稼先</li>
        <li>邓文迪</li>
        <li>邓等</li>
        <li>狄仁杰</li>
        <li>狄弟</li>
        <li>董文华</li>
        <li>董事</li>
        <IndexBar.Anchor name={'F'}>
          <li>F</li>
        </IndexBar.Anchor>
        <li>樊哙</li>
        <li>樊心</li>
        <li>冯晨晨</li>
        <li>冯敬尧</li>
        <li>冯成虎</li>
        <li>冯小平</li>
        <li>冯稼先</li>
        <li>冯文迪</li>
        <li>冯晨</li>
        <li>福尔杰</li>
        <li>福尔康</li>
        <li>福文华</li>
        <li>方文山</li>
      </ul>
    </div>
  </IndexBar>
</div>
```

[返回目录](#简介)

## DatePicker.Combo 日期选择框

[源码](https://unpkg.com/seedsui-react/src/lib/DatePicker/Combo.js)

### 属性

```javascript
<DatePicker.Combo
  // 定制属性
  min={最小值 Date}
  max={最小值 Date}
  type={日期类型 String} // year | quarter | month | date | time | datetime
  value={值 String}
  format={显示格式化 String}
  onError={校验出错 func({errMsg: '', min: '', value: value})}
  ModalProps={弹窗属性 String}
  // 其它标准属性：参考`Picker.Combo 滚动选择弹框`
>
```

### 示例

参考`Picker.Combo 滚动选择弹框`

## DatePicker.Modal 日期选择弹框

[源码](https://unpkg.com/seedsui-react/src/lib/DatePicker/Dialog/index.js)

### 属性

```javascript
<DatePicker.Modal
  portal={传送dom object, 默认document.getElementById('root')}
  data={数据源 array, 默认内置数据源}
  type={类型 string, 默认'date'}
  /*
    'year',
    'quarter',
    'month',
    'datetime',
    'date',
    'time'
  */
  visible={*显隐 bool, 默认false}
  min={最小值 Date, 默认无} // YYYY-MM-DD
  max={最大值 Date, 默认无} // YYYY-MM-DD
  value={值 Date, 默认无}
  onChange={事件 func(value)}

  maskAttribute={遮罩属性 object, 默认无}
  submitAttribute={确定按钮属性 object, 默认无}
  cancelAttribute={取消按钮属性 object, 默认无}

  onError={错误 func(e, {errMsg: ''}), 默认无}
/>
```

### 示例

用法与[DatePicker.Combo](#DatePicker.Combo)相同

## Cascader.Combo 级联选择框

[源码](https://unpkg.com/seedsui-react/src/lib/Cascader/Combo/index.js)
基于[Cascader.Modal 级联选择弹框](#Cascader.Modal 级联选择弹)组件

### 属性

```javascript
<Cascader.Combo
  // 标准属性见Picker.Modal标准属性
  value={值 array} // [{id: '', name: '北京'}, {id: '', name: '西城区'}]
  onChang={修改 func(value)}
  // 定制属性
  loadData={异步加载 func(value)}
  onBeforeSelectOption={选中项变化 func(value)}
  maskProps={遮罩属性 object}
  cancelProps={取消属性 object}
  submitProps={确定属性 object}
  optionProps={项属性 object}
/>
```

### 级联示例

```javascript
import Cascader from 'seedsui-react/lib/Cascader'
import chinaData from 'seedsui-react/lib/Cascader/DistrictCombo/China'

const [cascader, setCascader] = useState([
  {
    name: '北京',
    id: '110000'
  },
  {
    name: '东城区',
    id: '110101'
  }
])
function handleCascader(value) {
  console.log(value)
  setCascader(value)
}

// 加载街道
function loadData(tabs) {
  return new Promise(async (resolve) => {
    if (!Array.isArray(tabs) || !tabs.length) {
      resolve(null)
      return
    }
    let lastTab = tabs[tabs.length - 1]
    if (lastTab.isDistrict !== true) {
      resolve(null)
      return
    }
    Loading.show()
    let streets = await DistrictUtil.getStreet(lastTab.id)
    Loading.hide()
    if (typeof streets === 'string') {
      streetLoadErrMsg.current = streets
      Toast.show({ content: streets })
    } else {
      streetLoadErrMsg.current = null
    }
    resolve(streets)
  })
}
;<Cascader.Combo
  value={cascader}
  list={chinaData}
  loadList={DistrictUtil.getData}
  loadData={loadData}
  onChange={handleCascader}
/>
```

## Cascader.DistrictCombo 地区选择框

(仅支持中国)
[源码](https://unpkg.com/seedsui-react/src/lib/Cascader/DistrictCombo/index.js)
基于[Cascader.Combo 级联选择框](#Cascader.Combo 级联选择框)组件

### 属性

```javascript
<Cascader.DistrictCombo
  type={类型 string, 默认无} // province | city | district (province、city、district只有中国时才生效, 因为只有中国有省市区)
  /*
  一.默认通过isProvince等方法判断

  二.重要：再通过属性isProvince等判断(通常在列表初始化时给区加上属性isDistrict)

  三.类型本质上是阻止下钻，阻止的方法如下：
  1.匹配province所有省、city所有市, 如果相同则阻止下钻
  (省市对应数据来源window.__SeedsUI_Cascader_DistrictCombo_areaLevel__, 如果没有此变量, 再读取ChinaAreaLevel.js
  2.可能使用onBeforeSelectOption自行判断是否要阻止下钻
  */
  // 判断是否是省市区
  isProvince={省判断 func(lastTab), 默认无}
  isCity={市判断 func(lastTab), 默认无}
  isDistrict={区判断 func(lastTab), 默认无}
  list={数据 array, 默认读取China.js}
  /*
  省市区读取全局变量window.__SeedsUI_Cascader_DistrictCombo_list__, 如果没有此变量则读取China.js
  */
  loadList={异步加载列表 func() => Proimse}
  // 其它属性见Cascader.Combo标准属性
/>
```

### 级联示例

```javascript
import Cascader from 'seedsui-react/lib/Cascader'

const [cascader, setCascader] = useState(null)
function handleCascader(value) {
  console.log(value)
  setCascader(value)
}

;<Cascader.DistrictCombo value={cascader} type="city" onChange={handleCascader} />
```

## Location.Combo 定位框

[源码](https://unpkg.com/seedsui-react/src/lib/Location/Combo/index.js)

### 属性

```javascript
<Location.Combo
  cacheTime={经纬度缓存时效毫秒数 number, 默认10000}
  timeout={定位超时毫秒数 number, 默认无}
  ak={地图ak,地图预览和选择地点时需要传入, 如果地图已经加载, 则不需要传入ak}

  locationVisible={显示定位按钮 bool, 默认true}
  autoLocation={自动定位 bool, 默认false}
  chooseVisible={显示选择按钮 bool, 默认false}
  previewVisible={显示预览按钮 bool, 默认false}
  // 提示信息配置
  failText={失败提示 bool, 默认"定位失败, 请检查定位权限是否开启"}
  loadingText={定位中提示 bool, 默认"定位中..."}

  value={选中地址经纬度信息 string, 默认无, 出入参一致} // {latitude: '纬度', longitude: '经度', address:'地址', value: ''}
  readOnly={文本是否只读 bool, 默认false}

  onChange={值改变 func(value)}
  onError={错误 func({errMsg: ''})}
  {...props}
/>
```

### 示例: 定位

```javascript
import Location from 'seedsui-react/lib/Location'

const [value, setValue] = useState({
  longitude: '118.735424',
  latitude: '31.982709',
  value: '江苏省南京市建邺区创智路15号',
  point: ['118.735424', '31.982709'],
  address: '江苏省南京市建邺区创智路15号',
  province: '江苏省',
  city: '南京市',
  district: '建邺区',
  street: '创智路',
  fake: false
})

function handleChange(value) {
  setValue(value)
}

;<Location.Combo value={value} onChange={handleChange} />
```

### 示例: 地图选点

```javascript
import Location from 'seedsui-react/lib/Location'

const [value, setValue] = useState({
  longitude: '118.735424',
  latitude: '31.982709',
  value: '江苏省南京市建邺区创智路15号',
  point: ['118.735424', '31.982709'],
  address: '江苏省南京市建邺区创智路15号',
  province: '江苏省',
  city: '南京市',
  district: '建邺区',
  street: '创智路',
  fake: false
})

function handleChange(value) {
  setValue(value)
}

;<Location.Combo
  readOnly={false}
  previewVisible
  chooseVisible
  value={value}
  onChange={handleChange}
/>
```

## Select.Combo 选择组合框

[源码](https://unpkg.com/seedsui-react/src/lib/Select/Combo/index.js)

属性用法与[Picker.Combo 滚动选择框](#Picker.Combo滚动选择框) 组件一致

## Select.Modal 选择弹框

[源码](https://unpkg.com/seedsui-react/src/lib/Select/Modal/index.js)

属性用法与[Picker.Modal 滚动选择框](#Picker.Modal滚动选择框) 组件一致

## Select.Checkbox 单复选组框

[源码](https://unpkg.com/seedsui-react/src/lib/Select/Checkbox/index.js)

### 属性

```javascript
<Select.Checkbox
  multiple
  allowClear={单选是否允许取消选择 bool}
  disabled={禁用 bool}

  value={值 array} // [{id: '', name: ''}]
  list={列表 array} // [{id: '', name: ''}]

  onBeforeChange={修改前 func(value)}
  onChange={修改 func(value)}
  {...props}
/>
```

### 示例

```javascript
import Select from '../lib/Select'
const list = [
  {
    id: '1',
    name: '111'
  },
  {
    id: '2',
    name: '222'
  },
  {
    id: '3',
    name: '333'
  }
]

const [value, setValue] = useState([
  {
    id: '1',
    name: '111'
  }
])

function handleChange(newValue) {
  console.log(newValue)
  setValue(newValue)
}
;<Select.Checkbox
  // maskClosable={false}
  multiple={false}
  // allowClear
  list={list}
  value={value}
  onChange={handleChange}
  placeholder="请选择"
  className="border-b"
  // ModalProps={{
  //   cancelAttribute: {
  //     visible: false
  //   }
  // }}
/>
```

[返回目录](#简介)

## Input.Text 单行文本框

[单行文本框](https://unpkg.com/seedsui-react/src/lib/Input/Text/index.js)
, 很多组件继承自此组件, 拥有此组件的属性, 如: InputTel、InputPre、InputArea 等

### 属性

```javascript
<Input.Text
  type={类型 string, 默认'text'} // 与w3c的type一致: text | number | tel | password
  autoFit={是否启用自动扩充功能 bool, 默认无}
  readOnly={是否只读 bool, 默认无}
  disabled={是否禁用 bool, 默认无}

  // 文本框
  inputProps={文本框属性 object, 默认无} // className默认为'numbox-input'
  value={值 string | number, 默认无}
  defaultValue={值 string | number, 默认无}
  precision={文本框截取小数 string | number, 默认无}
  max={最大值 string | number, 默认无}
  min={最小值 string | number, 默认无}
  placeholder={占位符 string, 默认''}
  maxLength={输入长度 string, 默认'16'}
  readOnly={是否只读 bool, 默认无}
  required={是否必填 bool, 默认true} // 如果设置必填,则框内一定有值,默认为最小值或者0

  // 自动获取焦点
  autoFocus={渲染时自动获取焦点 bool, 默认false}
  autoSelect={渲染时自动选中 bool, 默认false}

  // 左右图标
  licon={左图标 node, 默认无}
  liconProps={左图标属性 object, 默认无}
  ricon={右图标 node, 默认无}
  riconProps={右图标属性 object, 默认无}

  // 清除按钮
  allowClear={清除 bool|string, 默认无} // 传'readOnly', 可以清空只读
  clearProps={清除图标属性 object, 默认无}

  // events
  onClick={点击容器 func(e), 默认无}
  onChange={值发生变化 func(value), 默认无}
  onBlur={失去焦点 func(value), 默认无}
  onFocus={获取焦点 func(value), 默认无}
  onCompositionStart={输入开始时 func(value), 默认无}
  onCompositionUpdate={输入进行中 func(value), 默认无}
  onCompositionEnd={输入完成时 func(value), 默认无}
  onInput={输入时 func(value), 默认无}

  // 右侧内容
  rcaption={右侧内容 node, 默认无}

  // 子内容
  children={子元素 node, 默认无}
  {...others}
/>
```

### 示例

```javascript
import Input from 'seedsui-react/lib/Input'

this.state = {
  value: '1'
}

onChange = (e, value) => {
  console.log(value)
  this.setState({
    value
  })
}
;<Input.Text allowClear value={this.state.value} onChange={this.onChange} />
```

## Input.Number 数字输入框

[源码](https://unpkg.com/seedsui-react/src/lib/Input/Number/index.js)

属性用法与[Input.Text 单行文本框](#Input.Text单行文本框) 组件一致

## Input.Password 密码输入框

[源码](https://unpkg.com/seedsui-react/src/lib/Input/Password/index.js)
属性用法与[Input.Text 单行文本框](#Input.Text单行文本框) 组件一致

## Input.Tel 号码输入框

[源码](https://unpkg.com/seedsui-react/src/lib/Input/Tel/index.js)
属性用法与[Input.Text 单行文本框](#Input.Text单行文本框) 组件一致

## Input.AutoFit 自增高输入框

[源码](https://unpkg.com/seedsui-react/src/lib/Input/AutoFit/index.js)

属性用法与[Input.Text 单行文本框](#Input.Text单行文本框) 组件一致

## Input.TextArea

[多行文本框](https://unpkg.com/seedsui-react/src/lib/Input/TextArea/index.js)
, 默认高度见 seedsui-variable.less 中@input-area-height, 其它属性用法与[Input.Text 单行文本框](#Input.Text单行文本框) 组件一致

## Input.Color

[颜色选择框](https://unpkg.com/seedsui-react/src/lib/Input/TextArea/index.js)
, 其它属性用法与[Input.Text 单行文本框](#Input.Text单行文本框) 组件一致

## Input.Range 范围选择框

### 属性

```javascript
<Input.Range
  value={值 number, 默认0}
  min={最小值 number, 默认0}
  max={最小值 number, 默认100}
  step={步进值 number, 默认1}
  disabled={是否禁用 bool, 默认false}
  onChange={值改变 func(value), 默认无}
/>
```

### 示例

```javascript
import Input from 'seedsui-react/lib/Input'

function handleChange(value) {
  console.log(value)
}
;<Input.Range onChange={handleChange} />
```

[返回目录](#简介)

## Input.PasswordStrong

[安全强度检验框](https://unpkg.com/seedsui-react/src/lib/Input/PasswordStrong/index.js)
, 展现三个状态: 弱、中、强

### 属性

```javascript
<Input.PasswordStrong
  value={值 string | number, 默认''}
  strong={自定义强度0到3 number, 默认无}
/>
```

### 示例

```javascript
import Input from 'seedsui-react/lib/Input'
;<Input.PasswordStrong value="Zk001" />
```

## Input.Star 评分框

[源码](https://unpkg.com/seedsui-react/src/lib/Input/Star/index.js)

### 属性

```javascript
<Input.Star
  min={最小值 number, 默认0}
  max={最大值 number, 默认5}
  value={值 number, 默认0}
  onChange={值改变 func(value), 默认无}
  onError={超出限制错误 func({errMsg: '错误信息', min: '最小值', value: '错误值'}), 默认无}
  {...props} // 容器属性
/>
```

### 示例

```javascript
import Input from '../lib/Input'

const [value, setValue] = useState(2)

function handleChange(value) {
  setValue(value)
}
function handleError(error) {
  console.log(error)
}

;<Input.Star value={value} min={3} onChange={handleChange} onError={handleError} />
```

[返回目录](#简介)

## Legend

[标题](https://unpkg.com/seedsui-react/src/lib/Legend/Legend.js)

### 属性

```javascript
<Legend
  className={容器className string, 默认无, 基础'legend'}
>
标题
</Legend>
```

### 示例

```javascript
import Legend from 'seedsui-react/lib/Legend'
;<Legend>标题</Legend>
```

[返回目录](#简介)

## Jcrop

[标题](https://unpkg.com/seedsui-react/src/lib/Jcrop/Jcrop.js)

> package.json 需要安装 Jcrop 库

### 属性

```javascript
<Jcrop
  src={图片地址 string, 默认无}
  rect={选区方形坐标 array, 默认无} // [10,10,100,100]
  scale={选区比例大小 array, 默认[.7,.5]} // [.7,.5]
  options={初始化选项 obj, 默认{multi: false}}
  onChange={选区变化事件 func({pos, src}), 默认无}
  className={容器className string, 默认无, 基础'legend'}
  {...others}
/>
```

### 示例

```javascript
import CanvasUtil from 'seedsui-react/lib/CanvasUtil'
import Jcrop from 'seedsui-react/lib/Jcrop'

const [src, setSrc] = useState('')
const [pos, setPos] = useState('')

const handleChange = (e) => {
  setPos(e.pos)
  setSrc(e.src)
}

const handleSubmit = () => {
  CanvasUtil.cropImg({
    src: src,
    ....pos,
    success: function (base64) {
      console.log(base64)
    }
  })
}

<Jcrop src={srcData} onChange={handleChange} style={{width: '300px'}}/>
```

[返回目录](#简介)

## ListPull

[推送列表](https://unpkg.com/seedsui-react/src/lib/ListPull/ListPull.js)

### 属性

```javascript
<ListPull
  list={列表 array, 默认无, 示例如下:}
  // [{
  //   container: node,
  //   lButtons: [{caption: '按钮文字', className: 'warn', style: object}], // className默认
  //   rButtons: 同lButtons
  // }]
  style={容器style object, 默认无}
  className={容器className string, 默认无, 基础'list-pull'}
  onClick={点击列表 func(s, item, index, option), 默认无}
  onShowedLeft={左侧显示 func(s), 默认无}
  onShowedRight={右侧显示 func(s), 默认无}
/>
```

### 示例

```javascript
import ListPull from 'seedsui-react/lib/ListPull'

const listpull = [
  {
    container: <p style={{ height: '50px' }}>内容1</p>,
    lButtons: [{ caption: '未读', className: 'info', style: { padding: '0 12px' } }],
    rButtons: [
      { caption: '收藏', className: 'warn', style: { padding: '0 12px' } },
      { caption: '删除', className: 'cancel', style: { padding: '0 12px' } }
    ]
  },
  {
    container: <p style={{ height: '50px' }}>内容2</p>,
    lButtons: [{ caption: '未读', className: 'info', style: { padding: '0 12px' } }],
    rButtons: [
      { caption: '收藏', className: 'warn', style: { padding: '0 12px' } },
      { caption: '删除', className: 'cancel', style: { padding: '0 12px' } }
    ]
  },
  {
    container: <p style={{ height: '50px' }}>内容3</p>,
    lButtons: [{ caption: '未读', className: 'info', style: { padding: '0 12px' } }],
    rButtons: [
      { caption: '收藏', className: 'warn', style: { padding: '0 12px' } },
      { caption: '删除', className: 'cancel', style: { padding: '0 12px' } }
    ]
  },
  {
    container: <p style={{ height: '50px' }}>内容4</p>,
    lButtons: [{ caption: '未读', className: 'info', style: { padding: '0 12px' } }],
    rButtons: [
      { caption: '收藏', className: 'warn', style: { padding: '0 12px' } },
      { caption: '删除', className: 'cancel', style: { padding: '0 12px' } }
    ]
  }
]

const [list, setList] = useState(listpull)

// 左滑修改文字和样式
function handleShowedLeft(s) {
  var target = s.target.closest('.list-pull-li').querySelector('.list-pull-button')
  if (target.innerHTML === '未读') {
    target.classList.add('disabled')
    target.innerHTML = '已读'
  } else {
    target.classList.remove('disabled')
    target.innerHTML = '未读'
  }
  s.hide()
}

// 点击
function handleClick(s, item, index, option) {
  console.log(s.target, s.event.target, item, index, option)
  if (item.className === 'cancel') {
    let newList = Object.clone(list)
    newList.splice(index, 1)
    console.log(newList)
    setList(newList)
  }
}

;<ListPull list={list} onClick={handleClick} onShowedLeft={handleShowedLeft} />
```

[返回目录](#简介)

## Loading

[加载中](https://unpkg.com/seedsui-react/src/lib/Loading/Loading.js)

### 建议

Loading 组件更适用于复杂的定制弹框,一般弹框建议直接使用 Api 直接调用:

- Loading.show()

### 属性

```javascript
<Loading
  portal={加载框传送至dom object, 默认无} // 不设置portal, 则不传送
  type={加载框类型 string, 默认'floating'} // 'floating | filling | custom'

  maskProps={遮罩属性 object, 默认无}
  icon={自定义图标 object, 默认无}
  iconProps={自定义图标属性 object, 默认无}
  captionProps={标题属性 object, 默认{caption: '正在加载...'}}

  children={子元素 node, 默认无}
/>
```

### 示例

```javascript
import Loading from 'seedsui-react/lib/Loading'
;<Loading
  maskProps={{
    style: {
      top: '44px'
    }
  }}
/>
```

[返回目录](#简介)

## LotteryWheel

[抽奖](https://unpkg.com/seedsui-react/src/lib/LotteryWheel/LotteryWheel.js)

### 属性

```javascript
<LotteryWheel
  // 数据源
  data={转盘数据 array, 默认无} // [{text: '', icon: '', font: '', fontTop...同数据默认值}]
  // 数据默认值
  fontFamily={文字名称 string, 默认'Arial'}
  fontSize={文字大小 number, 默认13}
  fontTop={文字头部距离 number, 默认28}
  fontFillStyle={文字填充样式 string, 默认'#ef694f'}

  bgFillStyle={背景填充样式 string, 默认'#ffdf7d'}
  bgStrokeStyle={背景边框样式 string, 默认'#fa8b6e'}
  bgLineWidth={背景边框宽度 number, 默认1}

  iconWidth={图标宽度 number, 默认42}
  iconHeight={图标高度 number, 默认42}
  iconTop={图标头部距离 number, 默认42}

  around={转动圈数 number, 默认6}
  // 不能使用style制定宽高,canvas用style的width|height会导致绘图位置不正确
  width={转盘宽度 number, 默认300}
  height={转盘高度 number, 默认300}
  style={转盘style object, 默认无}
  className={转盘className string, 默认无}
  // 间隔
  spacing={转盘绘制的间距 number, 默认10}
  // 保存
  suffix={图片保存类型 string, 默认'image/png'}
  quality={图片保存质量 number, 默认0.92}
/>
```

### 示例

```javascript
import LotteryWheel from 'seedsui-react/lib/LotteryWheel'
import Device from '../lib/Device'

this.state = {
  data: [
    {
      bgFillStyle: '#ffcd76',
      text: '大奖',
      icon: '//res.waiqin365.com/d/dinghuo365/lotterywheel/gift.png'
    },
    { text: '100积分', icon: '//res.waiqin365.com/d/dinghuo365/lotterywheel/gold.png' },
    {
      bgFillStyle: '#ffcd76',
      text: '200积分',
      icon: '//res.waiqin365.com/d/dinghuo365/lotterywheel/gold.png'
    },
    { text: '300积分', icon: '//res.waiqin365.com/d/dinghuo365/lotterywheel/gold.png' },
    {
      bgFillStyle: '#ffcd76',
      text: '400积分',
      icon: '//res.waiqin365.com/d/dinghuo365/lotterywheel/gold.png'
    },
    { text: '500积分', icon: '//res.waiqin365.com/d/dinghuo365/lotterywheel/gold.png' },
    {
      bgFillStyle: '#ffcd76',
      text: '600积分',
      icon: '//res.waiqin365.com/d/dinghuo365/lotterywheel/gold.png'
    },
    { text: '700积分', icon: '//res.waiqin365.com/d/dinghuo365/lotterywheel/gold.png' }
  ]
}

playing = false
play = () => {
  if (this.playing) {
    console.log('playing...')
    return
  }
  this.playing = true
  this.$lotterywheel.instance.reset()
  setTimeout(() => {
    this.$lotterywheel.instance.play(2, () => {
      console.log('转动完成')
    })
  }, 10)
  setTimeout(() => {
    this.playing = false
    this.setState({
      data: [
        {
          bgFillStyle: '#ffcd76',
          text: '200积分',
          icon: '//res.waiqin365.com/d/dinghuo365/lotterywheel/gold.png'
        },
        { text: '300积分', icon: '//res.waiqin365.com/d/dinghuo365/lotterywheel/gold.png' },
        {
          bgFillStyle: '#ffcd76',
          text: '大奖',
          icon: '//res.waiqin365.com/d/dinghuo365/lotterywheel/gift.png'
        },
        { text: '100积分', icon: '//res.waiqin365.com/d/dinghuo365/lotterywheel/gold.png' },
        {
          bgFillStyle: '#ffcd76',
          text: '400积分',
          icon: '//res.waiqin365.com/d/dinghuo365/lotterywheel/gold.png'
        },
        { text: '500积分', icon: '//res.waiqin365.com/d/dinghuo365/lotterywheel/gold.png' },
        {
          bgFillStyle: '#ffcd76',
          text: '600积分',
          icon: '//res.waiqin365.com/d/dinghuo365/lotterywheel/gold.png'
        },
        { text: '700积分', icon: '//res.waiqin365.com/d/dinghuo365/lotterywheel/gold.png' }
      ]
    })
  }, 5000)
}

const containerWidth = Device.screenWidth - 40
const wrapperWidth = containerWidth * 0.85

;<div
  className="lotterywheel-container"
  style={{ width: containerWidth + 'px', height: containerWidth + 'px', overflow: 'hidden' }}
>
  <LotteryWheel
    ref={(el) => {
      this.$lotterywheel = el
    }}
    width={wrapperWidth}
    height={wrapperWidth}
    iconWidth={containerWidth * 0.1}
    iconHeight={containerWidth * 0.1}
    data={this.state.data}
  />
  <img
    className="lotterywheel-border"
    src={'//res.waiqin365.com/d/dinghuo365/lotterywheel/border.png'}
    alt=""
  />
  <img
    className="lotterywheel-pointer"
    src={'//res.waiqin365.com/d/dinghuo365/lotterywheel/pointer.png'}
    alt=""
    onClick={this.play}
  />
</div>
```

[返回目录](#简介)

## Mark

[标记](https://unpkg.com/seedsui-react/src/lib/Mark/Mark.js)

### 属性

```javascript
<Mark
  className={标记className string, 默认无, 基础'card'} // 'info | success | cancel | warn | disable | primary | hint'
  {...others}
>
标记文字
</Mark>
```

### 示例

```javascript
import Mark from 'seedsui-react/lib/Mark'
;<Mark className="success">进行中</Mark>
```

[返回目录](#简介)

## Marquee

[跑马灯](https://unpkg.com/seedsui-react/src/lib/Marquee/Marquee.js)

### 属性

```javascript
<Marquee
  list={列表 array, 默认无} // [{id: 'xx', name: ''}]
  contentAttribute={单条属性 object, 默认无}
  step={一次移动数值 number, 默认50}
  duration={移动动画时长 number, 默认300}
  autoPlay={一次滚动停留时长 number, 默认2000} // 为0时不再滚动
  direction={移动方向 string, 默认'top'} // 'top | bottom | left | right'
  loop={是否循环 bool, 默认true}
  onClick={点击 func(e, value, selected, index), 默认无}
  {...others} // 容器属性
/>
```

### 示例

```javascript
import Marquee from 'seedsui-react/lib/Marquee'
const list = [
  {
    id: '1',
    name: '标题标题1'
  },
  {
    id: '2',
    name: '标题标题2'
  }
]
function handleClick(...params) {
  console.log(...params)
}
;<Marquee
  list={list}
  onClick={handleClick}
  autoPlay={5000}
  step={48}
  optionAttribute={{
    style: { height: '38px', padding: '5px 0' },
    className: 'flex flex-center nowrap2'
  }}
/>
```

[返回目录](#简介)

## MenuTiled

[平铺弹出菜单](https://unpkg.com/seedsui-react/src/lib/MenuTiled/MenuTiled.js)
, [MenuTiled 下拉菜单](#menutiled)组件的子组件

### 属性

```javascript
<MenuTiled
  multiple={是否多选 bool, 默认false} // 为true时, 将会处理id为空的项为根节点, 补充id='根节点id或者-1'、parentid='-2'、isroot='1', 同时onChange返回的options有变化
  list={列表 array, 默认无} // [{id: '1', name: '测试数据1', children:[]}]
  selected={选中集合 array, 默认无} // [{id: '1', name: '测试数据1'}]
  onChange={点击 func(e, value, selected, data), 默认无} // 回调里返回的data为格式化后的list
  {...others}
/>
```

### 示例

```javascript
import MenuTiled from 'seedsui-react/lib/MenuTiled'
// const menus = [
// 	{
// 		id: '1',
// 		name: '测试数据1',
// 		children: [
// 			{
//         id: 'a',
//         name: '测试数据1-a'
//       },
//       {
//         id: 'b',
//         name: '测试数据1-b',
//         children: [
//           {
//             id: 'I',
//             name: '测试数据1-b-I'
//           },
//           {
//             id: 'II',
//             name: '测试数据1-b-II'
//           }
//         ]
//       }
// 		]
// 	}
// ];
const menus = [
  { id: '1', name: '测试数据1', parentid: '-1' },
  { id: 'a', name: '测试数据1-a', parentid: '1' },
  { id: 'b', name: '测试数据1-b', parentid: '1' },
  { id: 'I', name: '测试数据1-b-I', parentid: 'b' },
  { id: 'II', name: '测试数据1-b-II', parentid: 'b' }
]

const [selected, setSelected] = useState([{ id: 'b', name: '测试数据1-b', parentid: '1' }])

function onClickMenu(e, value, selected, data) {
  console.log(e, value, selected, data)
}

;<MenuTiled list={menus} selected={selected} onChange={onClickMenu} />
```

[返回目录](#简介)

## MenuTree

[侧边树形菜单](https://unpkg.com/seedsui-react/src/lib/MenuTree/MenuTree.js)

### 属性

```javascript
<MenuTree
  selected={选中项 array, 默认无} // 选中项: [{id: '', name: ''}]
  list={列表项 array, 默认无} // 数据: [{id: '', name: '', parentid: ''}]

  onChange={点击节点 func(s, value, selected), 默认无}
  onExpandActive={展开选中项时触发 func(s, value, selected), 默认无} // 如若有此属性, 展开选中项时也将移除同级所有的选中项与展开项

  onClick={点击节点 func(s, value, item, isActived, isExpand, childrenCount), 默认无}
  onClickLeaf={点击底层节点 func(s, value, item, isActived), 默认无}
/>
```

### 示例

```javascript
import MenuTree from 'seedsui-react/lib/MenuTree';

const mockList = [
  {id: '2', name: '测试数据2', parentid: '-1'},
  {id: '1', name: '测试数据1', parentid: '-1'},
  {id: 'a', name: '测试数据1-a', parentid: '1'},
  {id: 'b', name: '测试数据1-b', parentid: '1'},
  {id: 'I', name: '测试数据1-b-I', parentid: 'b'},
  {id: 'II', name: '测试数据1-b-II', parentid: 'b'}
];

const [list, setList] = useState(mockList)
const [selected, setSelected] = useState([{id: 'I', name: '测试数据1-b-I', parentid: 'b'}])

function clearData () {
  setList([])
}
function addData () {
  setList(mockList)
}
function onChange (e, value, selected) {
  console.log(e.target)
  console.log(value, selected)
  setSelected(selected);
}

<MenuTree list={list} selected={selected} onChange={onChange}/>
<input type="button" value="置空" onClick={clearData}/>
<input type="button" value="显示" onClick={addData}/>
```

[返回目录](#简介)

## Notice

[公告](https://unpkg.com/seedsui-react/src/lib/Notice/Notice.js)

### 属性

```javascript
<Notice
  wrapperAttribute={画布容器属性 object, 默认无} // 例如: wrapperAttribute={className: 'notice-wrapper'}

  icon={图标dom node, 默认无}

  caption={标题 string, 默认'暂无数据'}
  captionAttribute={标题容器属性 object, 默认无} // 例如: captionAttribute={className: 'notice-caption'}
  sndcaption={副标题 string, 默认''}
  sndcaptionAttribute={副标题容器属性 object, 默认无} // 例如: sndcaptionAttribute={className: 'notice-sndcaption'}

  content={标题 string, 默认'暂无数据'}
  contentHTML={标题html string, 默认'暂无数据'}

  children={wrapper容器内子元素 node, 默认无}

  {...others}
>
其它内容
</Notice>
```

### 示例

```javascript
import Notice from 'seedsui-react/lib/Notice'
;<Notice
  iconClassName="icon-no-network"
  caption="网络状态不佳"
  sndcaption="请尝试开关飞行模式后再试"
/>
```

[返回目录](#简介)

## NumBox

[数字加减框](https://unpkg.com/seedsui-react/src/lib/NumBox/NumBox.js)

### 属性

```javascript
<NumBox
  readOnly={是否只读 bool, 默认无}
  disabled={是否禁用 bool, 默认无}

  // 加减号
  plusAttribute={加号属性 object, 默认无} // className默认为'numbox-button numbox-button-minus'
  minusAttribute={减号属性 object, 默认无} // className默认为'numbox-button numbox-button-plus'

  // 文本框
  inputAttribute={文本框属性 object, 默认无} // className默认为'numbox-input'
  value={值 string | number, 默认无}
  defaultValue={值 string | number, 默认无}
  digits={文本框截取小数 string | number, 默认无}
  max={最大值 string | number, 默认无}
  min={最小值 string | number, 默认无}
  placeholder={占位符 string, 默认''}
  maxLength={输入长度 string, 默认'16'}
  readOnly={是否只读 bool, 默认无}
  required={是否必填 bool, 默认true} // 如果设置必填,则框内一定有值,默认为最小值或者0

  // 自动获取焦点
  autoFocus={渲染时自动获取焦点 bool, 默认false}
  autoSelect={渲染时自动选中 bool, 默认false}
  stepFocus={点击加减按钮获取焦点 bool, 默认false}

  // 左右图标
  licon={左图标 node, 默认无}
  liconAttribute={左图标属性 object, 默认无}
  ricon={右图标 node, 默认无}
  riconAttribute={右图标属性 object, 默认无}

  // events
  onClick={点击容器 func(e), 默认无}
  onChange={值发生变化 func(e, value), 默认无}
  onBlur={失去焦点 func(e, value), 默认无}
  onFocus={获取焦点 func(e, value), 默认无}
  {...others}
/>
```

### 示例

```javascript
import NumBox from 'seedsui-react/lib/NumBox'

const [value, setValue] = useState('')

function changeNum(e, val) {
  setValue(val)
}

;<NumBox className="lg" digits={2} min={0} max={4} required value={value} onChange={changeNum} />
```

[返回目录](#简介)

## Switch

[开关](https://unpkg.com/seedsui-react/src/lib/Switch/index.js)

### 属性

```javascript
<Switch
  readOnly={是否只读 bool, 默认无}
  disabled={是否禁用 bool, 默认无}
  checked={是否选中 bool, 默认无} // 选中时clasName将会增加'active'
  checkedProps={是属性 object, 默认无}
  uncheckedProps={否属性 object, 默认无} // {caption: '关'}
  onChange={点击容器 func(bool), 默认无}
/>
```

### 示例

```javascript
import Switch from 'seedsui-react/lib/Switch'

const [checked, setChecked] = useState(false)

function handleChange(checked) {
  setChecked(checked)
}
;<Switch
  checked={checked}
  onChange={handleChange}
  checkedProps={{ caption: '开' }}
  uncheckedProps={{ caption: '关' }}
/>
```

[返回目录](#简介)

## Page

[页面](https://unpkg.com/seedsui-react/src/lib/Page/Page.js)
, 通常与 Container、Header 一起使用

### 属性

```javascript
<Page
  style={容器style object, 默认无}
  className={容器className string, 默认无, 基础'page'}
  animation={动画 string, 默认无}  // slideLeft | slideRight | slideUp | slideDown | zoom | fade
  titlebarVisible={是否显示标题 string|bool, 默认'auto'}
  /*
  'auto':
  1.url中包含showTitlebar=显示头
  2.全局配置显示头
  // 企业微信PC端默认显示
  if (Device.platform === 'wework' && Device.device === 'pc') {
    window.__SeedsUI_config__ = {
      Titlebar: {
        titlebarVisible: false
      }
    }
  }
  true: 显示
  false: 不显示
  */
  {...others}
>
页面
</Page>
```

### 示例

```javascript
import Page from 'seedsui-react/lib/Page'
import Header from 'seedsui-react/lib/Header'
import Body from 'seedsui-react/lib/Body'
;<Page>
  <Header>头部</Header>
  <Body>中部</Body>
</Page>
```

[返回目录](#简介)

## PagePull

[可推动页面](https://unpkg.com/seedsui-react/src/lib/PagePull/PagePull.js)
, 基于[Page 页面](#page)组件

### 属性

```javascript
<PagePull
    // Side 侧边栏
    drag={是否允许拖拽 bool, 默认true}
    transition={过渡动画 string, 默认'push'} // 'push | reveal'
    lSide={左侧边栏 node, 默认无}
    lSideAttribute={左栏属性 object, 默认无} // 其中显示事件为onShowed
    rSide={右侧边栏 node, 默认无}
    rSideAttribute={右栏属性 object, 默认无} // 其中显示事件为onShowed
    // Page
    children={页面内容 node, 默认无}
  {...others}
>
页面
</PagePull>
```

### 示例

```javascript
import Page from 'seedsui-react/lib/Page'
import Header from 'seedsui-react/lib/Header'
import Body from 'seedsui-react/lib/Body'
;<PagePull lSide={<p>左侧边栏</p>} rSide={<p>右侧边栏</p>}>
  <Header>头部</Header>
  <Body>中部</Body>
</PagePull>
```

[返回目录](#简介)

## Peg

[小竖条](https://unpkg.com/seedsui-react/src/lib/Peg/Peg.js)

### 属性

```javascript
<Peg
  className={图标className string, 默认无, 基础'peg'}
  {...others}
/>
```

### 示例

```javascript
import Peg from 'seedsui-react/lib/Peg'
;<Peg />
```

[返回目录](#简介)

## Photos

[照片控件](https://unpkg.com/seedsui-react/src/lib/Photos/Photos.js)

### 属性

```javascript
<Photos
  type={点击加号拍照还是录相 string, 默认无} // video.录相 | 其它.为拍照, Videos使用此方法
  isBrowser={是否使用浏览器的file框拍照 bool, 默认无}
  list={照片列表 array, 默认无} // [{thumb: '', src: '', children: node}]
  upload={上传按钮覆盖的dom node, 默认无}
  uploading={是否上传中 bool, 默认无}
  beforeChoose={选择照片前校验 func, 默认无, 返回false则不选择}
  onChoose={点击上传按钮 func, 默认无, 有此属性才会显示上传按钮} // 浏览器会显示file框onChoose(e), 并监听file框change事件
  onDelete={点击删除选择 func, 默认无, 有此属性才会显示删除按钮}
  onClick={点击一项 func(e, src, selected, index), 默认无}
  preview={是否预览 bool, 默认true, 是否支持单击预览}
  inputProps={文件选择控件属性 object, 默认{}}
  {...others}
/>
```

### 示例

```javascript
import Photos from 'seedsui-react/lib/Photos'
const list = [
  {
    id: '1',
    thumb:
      'https://image-test.waiqin365.com/6069734652819592543/blog/201912/8194157084989375804.png?x-oss-process=style/zk320',
    src: 'https://image-test.waiqin365.com/6069734652819592543/blog/201912/8194157084989375804.png?x-oss-process=style/zk320'
  },
  {
    id: '2',
    thumb: 'https://img.zcool.cn/community/01a9a65dfad975a8012165189a6476.jpg',
    src: 'https://img.zcool.cn/community/01a9a65dfad975a8012165189a6476.jpg'
  }
]

function handleClick(...params) {
  console.log('点击')
  console.log(...params)
}
function handleChoose(...params) {
  console.log('选择')
  console.log(...params)
}
function handleDelete(...params) {
  console.log('删除')
  console.log(...params)
}

;<Photos list={list} onChoose={handleChoose} onDelete={handleDelete} onClick={handleClick} />
```

[返回目录](#简介)

## Picker.Combo 滚动选择框

[源码](https://unpkg.com/seedsui-react/src/lib/Picker/Combo/index.js)

```javascript
<Picker.Combo
    // 自定义Dialog组件
    ModalComponent={组件 node}
    ModalProps={组件属性 object}

    // Dialog属性
    portal={传送 node}
    multiple={单多选 bool, 默认无} // Picker不支持此属性, Select等其它选择控件支持
    value={值 array} // [{id: '', name: ''}]
    list={列表 array} // [{id: '', name: ''}]

    maskClosable={点击遮罩是否隐藏 bool, 默认true}
    onBeforeChange={修改前 func(value)}
    onChange={修改 func(value)}

    // Combo属性
    allowClear={清空 bool}
    readOnly={只读 bool}
    disabled={禁用 bool}
    onBeforeOpen={打开前 func()}
    render={自定义渲染 func(value, {displayValue})}
    children={子节点 node}
    {...props}
/>
```

### 示例

```javascript
const list = [
  {
    id: '1',
    name: '111'
  },
  {
    id: '2',
    name: '222'
  },
  {
    id: '3',
    name: '333'
  }
]

const [value, setValue] = useState([
  {
    id: '1',
    name: '111'
  }
])

function handleChange(value) {
  console.log(value)
  setValue(value)
}

return (
  <Picker.Combo
    // maskClosable={false}
    allowClear
    list={list}
    value={value}
    onChange={handleChange}
    placeholder="请选择"
    className="border-b"
    // ModalProps={{
    //   cancelAttribute: {
    //     visible: false
    //   }
    // }}
  />
)
```

[返回目录](#简介)

## Picker.Modal 滚动选择弹框

```javascript
<Picker.Modal
  // 通用属性
  portal={传送 node}
  getComboDOM={获取关联的文本框 func() => node}
  multiple={单多选, 默认无}
  value={值 array} // [{id: '', name: ''}]
  list={列表 array} // [{id: '', name: ''}]

  onBeforeChange={修改前 func(value)}
  onChange={修改 func(value)}

  visible={是否显示 bool, 默认false}
  maskClosable={点击遮罩是否隐藏 bool, 默认true}
  onVisibleChange={显隐状态变化 func(visible)}

  // 定制属性
  maskProps={遮罩属性 object}
  groupProps={组属性 object}
  optionProps={项属性 object}
  cancelProps={取消属性 object}
  slotProps={列属性 object}
  {...props}
/>
```

### 示例

见[Picker.Combo](##Picker.Combo)

[返回目录](#简介)

## PickerCity

[城市选择弹框](https://unpkg.com/seedsui-react/src/lib/PickerCity/PickerCity.js)
, 基于[Picker 滚动选择弹框](#picker)组件

### 属性

```javascript
<PickerCity
  portal={传送dom object, 默认document.getElementById('root')}
  data={数据源 array, 默认内置数据源}
  dataFormat={数据源格式化 object, 默认如注释} // {idPropertyName: 'id', namePropertyName: 'name', childPropertyName: 'children'}
  split={分隔符 string, 默认'-'}
  type={类型 string, 默认'district'} // district | city
  show={*显隐 bool, 默认false}
  value={值 string, 默认无} // '北京-东城区'
  selected={选中项 array, 默认无} // 传入selected时, 选中项则不取value中的值 [{id: '', name: ''}]
  maskAttribute={遮罩属性 object, 默认无}
  submitAttribute={确定按钮属性 object, 默认无}
  cancelAttribute={取消按钮属性 object, 默认无}
/>
```

### 示例

用法与[Picker](#picker)相同
[返回目录](#简介)

## Player

[视频播放器](https://unpkg.com/seedsui-react/src/lib/Player/Player.js)

### 属性

```javascript
<Player
  portal={弹窗传送dom object, 默认document.getElementById('root')}
  src={视频播放地址 string, 默认无}
  maskAttribute={弹窗遮罩属性, 默认无} // className video-mask
  videoAttribute={video元素属性, 默认无}
  poster={封面图片地址 string, 默认无}
  children={视频容器内子元素 node, 默认无}
  {...others}  // 容器属性
/>
```

### 示例

```javascript
import Player from 'seedsui-react/lib/Player'
;<Player
  src={`//res.waiqin365.com/d/waiqin365_h5/leaflet/voice/voice.mp4`}
  style={{ width: '319px' }}
>
  <img
    alt=""
    src="//res.waiqin365.com/d/waiqin365_h5/leaflet/voice/page2.png"
    style={{ width: '319px' }}
  />
</Player>
```

[返回目录](#简介)

### 示例

用法与[Picker](#picker)相同
[返回目录](#简介)

## Tooltip

[箭头弹框](https://unpkg.com/seedsui-react/src/lib/Tooltip/Tooltip.js)

### 属性

```javascript
<Tooltip
  portal={传送dom object, 默认document.getElementById('root')}

  // 内容框
  content={内容 node}
  animation={动画 string, 默认'zoom'}  // slideUp | slideDown | slideUpLeft | zoom | fade | slideUpRight | slideDownLeft | slideDownRight | zoomLeft | zoomRight | none
  style={如果设置了left、top、right、bottom则不再自动计算弹窗位置 object, 默认无}

  // 遮罩
  maskProps={遮罩属性 object, 默认无} // className: mask popover-mask

  // 显隐
  visible={用于手动控制浮层显隐 bool, 默认false}
  maskClosable={点击遮罩是否隐藏 bool, 默认true}
  onVisibleChange={显隐变化 func(visible)}
  children={容器内容 node, 默认无}
  getChildrenDOM={赋予关联目标元素(用于手动控制浮层显隐时计算位置) func() => node}
  {...props} // 容器属性
>
点击目标
</Tooltip>
```

### 示例

```javascript
import Tooltip from 'seedsui-react/lib/Tooltip'
;<Tooltip content={<p>123412341234</p>}>
  <div style={{ margin: 100 }}>点击</div>
</Tooltip>
```

[返回目录](#简介)

## Preview

[提示弹框](https://unpkg.com/seedsui-react/src/lib/Preview/Preview.js)

### 提示

Preview 预览组件中的 inctance.js, 也可以直接使用 Api 直接调用:

- Bridge.previewImage({urls: [src], layerHTML: `<div class="preview-layer" style="background-image:url(${layer})"></div>`})

详见[Bridge 桥接库](#bridge) 桥接库

### 属性

```javascript
<Preview
  list={资源列表 array, 默认无} // [{thumb: '', src: '', type: 'video|image, 默认image', children: node}]
  current={当前显示的资源序号或者当前资源的src链接 string或number, 默认0}

  onHide={点击隐藏按钮 func, 默认无}
  onChange={选中发生变化 func(s), 默认无}

  children={子元素 node, 默认无}

  {...others}
/>
```

### 示例

```javascript
import Preview from 'seedsui-react/lib/Preview';

const [previewCurrent, setPreviewCurrent] = useState(null);

const list = [{
  id: '1',
  thumb: 'https://image-test.waiqin365.com/6069734652819592543/blog/201912/8194157084989375804.png?x-oss-process=style/zk320',
  src: 'https://player.alicdn.com/video/aliyunmedia.mp4'
},{
  id: '2',
  thumb: 'https://img.zcool.cn/community/01a9a65dfad975a8012165189a6476.jpg',
  src: 'https://www.w3school.com.cn/i/movie.ogg'
}];

<div>
<input type="button" value="预览" onClick={() => setPreviewCurrent(0)}>
{/* 预览 */}
{typeof previewCurrent === 'number' &&
  <Preview
    onHide={() => setPreviewCurrent(null)}
    list={list} // 需要预览的资源列表{url: '图片或视频的地址', type: 'video|image, 默认image', poster: '封面地址'}
    current={previewCurrent}
  />
}
</div>
```

[返回目录](#简介)

## Progress

[进度条](https://unpkg.com/seedsui-react/src/lib/Progress/Progress.js)

### 属性

```javascript
<Progress
  renderCounter={进度条内部 func(percent), 默认无}
  // 百分比(优先使用)
  percent={百分比 number, 默认无} // 百分比与max min value, 只要一种就行了
  // 计算百分比
  max={最大值 number, 默认100}
  min={最小值 number, 默认0}
  value={值 number, 默认0}

  children={子元素 node, 默认无}
  barProps={进度条属性 object, 默认无}
  {...others}
/>
```

### 示例

```javascript
import Progress from 'seedsui-react/lib/Progress'
;<Progress percent={10} />
```

[返回目录](#简介)

## QRCode

[生成二维码](https://unpkg.com/seedsui-react/src/lib/QRCode/QRCode.js)

### 属性

```javascript
<QRCode
  text={生成码的字符 string, 默认无}
  style={容器style object, 默认无}

  children={子元素 node, 默认无}

  {...props}
/>
```

### 示例

```javascript
import QRCode from 'seedsui-react/lib/QRCode'

const Logo = {
  position: 'absolute',
  left: '50%',
  top: '50%',
  width: '50px',
  height: '50px',
  marginLeft: '-25px',
  marginTop: '-25px'
}

;<QRCode text="https://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=%E5%9B%BE%E7%89%87&hs=2&pn=0&spn=0&di=7040&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&ie=utf-8&oe=utf-8&cl=2&lm=-1&cs=1035415831%2C1465727770&os=2036467054%2C2328224179&simid=4030878874%2C470441821&adpicid=0&lpn=0&ln=30&fr=ala&fm=&sme=&cg=&bdtype=0&oriquery=%E5%9B%BE%E7%89%87&objurl=http%3A%2F%2Fa3.att.hudong.com%2F68%2F61%2F300000839764127060614318218_950.jpg&fromurl=ippr_z2C%24qAzdH3FAzdH3F4_z%26e3B6zan0c_z%26e3Bv54AzdH3FkkfAzdH3Fp5rtv_z%26e3Bwfrx%3Ft1%3Dd8ln08c&gsm=1&islist=&querylist=">
  <img style={Logo} alt="" src="//res.waiqin365.com/d/dinghuo365/logo.png" />
</QRCode>
```

[返回目录](#简介)

## PDFView

[PDF 文件预览](https://unpkg.com/seedsui-react/src/lib/PDFView/PDFView.js)

### 属性

```javascript
<PDFView
  insertPageElements={页面中元素 array, 默认无} // 设置页面中元素, 必须设置total才能使用
  src={值 string, 默认''} // pdf地址或data:application/pdf;base64,开头的base64pdf流文件
  pictures={图片地址 array, 默认''}
  cMapUrl={设置cMapUrl解决中文不显示的问题 string, 默认无} // cMapUrl: '/demo/assets/cmaps/'

  params={设置实例化参数 object, 默认{}}
  zoom={是否允许双指放大缩小 bool, 默认true}
  // params: {
  //   errorHTML: '文件加载失败', // 加载错误时显示的信息
  //   loadHTML: '加载中', // 加载时显示的信息
  //   nodataHTML: '暂无数据', // 暂无数据
  //   pdfLib: '//res.waiqin365.com/d/seedsui/pdfview/pdf.js', // pdf.js库
  //   pdfWorkLib: '//res.waiqin365.com/d/seedsui/pdfview/pdf.worker.js', // pdf.work.js库
  //   onInit: function (s),
  //   onLoad: function (s),
  // }
  {...others}
/>
```

### 示例

```javascript
import PDFView from 'seedsui-react/lib/PDFView';

const pdfsrc = '/demo/assets/pdfview.pdf';
const refPDFView = useRef(null);
const [pageElements, setPageElements] = useState([
  {
    page: '1',
    element: <div style={{lineHeight: '16px', backgroundColor: 'red'}}>1</div>
  },{
    page: '2',
    element: <div style={{lineHeight: '16px', backgroundColor: 'red'}}>2</div>
  }
]);

function scrollToPage (page) { // eslint-disable-line
  if (isNaN(page)) return;
  if (refPDFView.current.scrollToPage) {
    refPDFView.current.scrollToPage(page)
  }
}

// 图片
<PDFView pictures={["/demo/assets/pdfview.png"]}/>
// PDF文件
<PDFView src={'/demo/assets/pdfview.pdf'} cMapUrl="/demo/assets/cmaps/" params={{rows: 3}}/>
// PDFbase64编码
<PDFView src={pdfsrc} cMapUrl="/demo/assets/cmaps/" params={{rows: 3}}/>
// PDF表单元素
<PDFView
  ref={refPDFView}
  zoom={false}
  src={pdfsrc}
  cMapUrl="/demo/assets/cmaps/"
  insertPageElements={pageElements}
  params={{rows: 3, onLoad: () => console.log('加载完成')}}
/>
```

[返回目录](#简介)

## Radio

[单选框](https://unpkg.com/seedsui-react/src/lib/Radio/Radio.js)

### 属性

属性与[Checkbox](#checkbox)相同

### 示例

用法与[Checkbox](#checkbox)相同
[返回目录](#简介)

## Share

[单选框](https://unpkg.com/seedsui-react/src/lib/Share/Share.js)

### 属性

```javascript
<Share
  children={内容 node, 默认无}
  type={单项显示 string, 默认无} // wework企业微信和wq外勤客户端JSBridge才生效
  shareTo={多项选择显示 string, 默认['wechat', 'wework', 'moments']} // wework企业微信和wq外勤客户端JSBridge, 并且没有设置type属性时才生效
  config={分享配置 string, 默认{
    title: '', // 分享标题
    desc: '', // 分享描述
    link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl: '', // 分享图标
  }}
  originConfig={组件移除时还原分享配置 string, 默认无} // 仅wechat微信中才生效
  {...others}
/>
```

### 说明

此控件支持 wechat 微信、wework 企业微信、dinghuo 订货 APP、wq 外勤 APP(JSBridge)、waiqin 外勤 APP(cordova), 其它平台不显示

### 示例

```javascript
import Share from 'seedsui-react/lib/Share'
;<Share
  config={{
    title: '标题', // 分享标题
    desc: '副标题', // 分享描述
    link: 'https://www.waiqin365.com/', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl: 'https://www.waiqin365.com/p/v3/assets/LOGO2.png' // 分享图标
  }}
  className="button lg primary"
>
  分享
</Share>
```

[返回目录](#简介)

## Star

[小竖条](https://unpkg.com/seedsui-react/src/lib/Star/Star.js)

### 属性

```javascript
<Star
  className={图标className string, 默认无, 基础'star'}
  {...others}
/>
```

### 示例

```javascript
import Star from 'seedsui-react/lib/Star'
;<Star />
```

[返回目录](#简介)

## Stencil

[加载模板](https://unpkg.com/seedsui-react/src/lib/Stencil/Stencil.js)

### 属性

```javascript
<Stencil
  className={图标className string, 默认'stencil-list', 基础'stencil'}
  {...others}
/>
```

### 示例

```javascript
import Stencil from 'seedsui-react/lib/Stencil'
;<Stencil />
```

[返回目录](#简介)

## Sticker

[标签贴](https://unpkg.com/seedsui-react/src/lib/Sticker/Sticker.js)

### 属性

```javascript
<Sticker
  type={类型 string, 默认无} // 默认className加上'sticker', type设置为line时,className加上'sticker-line'
  iconClassName={图标className string, 默认无, 基础'size12'}
  className={容器className string, 默认'top right', 基础'size12'} // 'top | bottom | right | left'
  style={容器style object, 默认无}
>
</Sticker>
```

### 示例

```javascript
import Sticker from 'seedsui-react/lib/Sticker'
;<Sticker>NEW</Sticker>
```

[返回目录](#简介)

## Swiper

[轮播](https://unpkg.com/seedsui-react/src/lib/Swiper/Swiper.js)

### 属性

```javascript
<Swiper
  params={实例化Swiper的参数 object, 默认无} // https://swiperjs.com/api
  // 画布容器
  wrapperAttribute={画布容器属性 object, 默认无} // 例如: wrapperAttribute={className: 'notice-wrapper'}
  // 分页
  paginationAttribute={分页容器属性 object, 默认无}
  // 翻页
  prevAttribute={上一页按钮属性 object, 默认无}
  nextAttribute={下一页按钮属性 object, 默认无}
  // 轮播页
  children={slide容器内元素 node, 默认无}
  // 容器子元素
  containerChildren={container容器内子元素 node, 默认无}

  {...others}
/>
```

### 示例

```javascript
import Swiper from 'seedsui-react/lib/Swiper'
// 初始化轮播
function handleInit(s) {
  let defaultIndex = 1
  s.slideTo(defaultIndex, 0)
}
// 点击事件: 防止与放大缩小的双击事件冲突
function handleClick(s, e) {
  if (
    e.target.classList.contains('swiper-button-prev') ||
    e.target.classList.contains('swiper-button-next')
  ) {
    return
  }
  if (clickSpace) {
    window.clearTimeout(clickSpace)
    clickSpace = null
  }
  clickSpace = setTimeout(() => {
    console.log('触发点击')
  }, 500)
}
function handleZoom() {
  if (clickSpace) {
    window.clearTimeout(clickSpace)
    clickSpace = null
  }
}

;<Swiper
  style={{
    width: '100%',
    height: '100%'
  }}
  params={{
    zoom: true,
    pagination: {
      el: '.swiper-pagination'
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    on: {
      init: handleInit,
      tap: handleClick,
      zoomChange: handleZoom
    }
  }}
>
  <div className="swiper-slide">
    <div className="swiper-zoom-container">
      <img
        className="swiper-zoom-target"
        src="http://image-test.waiqin365.com/6692513571099135446/sku/201809/20180911195747712_05105130_CAMERA_21001006280.jpg"
      />
    </div>
  </div>
  <div className="swiper-slide">
    <div className="swiper-zoom-container">
      <img
        className="swiper-zoom-target"
        src="http://image-test.waiqin365.com/6692513571099135446/sku/201809/20180911195747712_05105130_CAMERA_21001006280.jpg"
      />
    </div>
  </div>
</Swiper>
```

[返回目录](#简介)

## Tabs

[页签](https://unpkg.com/seedsui-react/src/lib/Tabs/Tabs.js)

### 属性

```javascript
<Tabs
  className={容器className string, 默认'tabs-line tabs-line-width70 border-b'} // tabs-line | tabs-rect | tabs-lump | tabs-dropdown | tabs-footer
  tiled={内部tab宽度平均分配 bool, 默认false}
  contentAttribute={标题图标容器属性 object, 默认无} // className: 'tab-content'
  captionAttribute={标题属性 object, 默认无} // className: 'tab-caption'
  sndcaptionAttribute={副属性 object, 默认无} // className: 'tab-sndcaption'
  value={选中项 object, 默认无, 格式如下:}
  // {
  //   id: '',
  //   name: '', // 与caption完全相同, 允许传入name或者caption
  // }
  list={列表 array, 默认无, 格式如下:}
  // [
  //   {
  //     icon: node,
  //     iconActive: node,
  //     ricon: node,
  //     riconActive: node,

  //     name: string, // 与caption完全相同, 允许传入name或者caption
  //     caption: string,
  //     sndcaption: string,
  //     active: bool,

  //     attribute: object // tab属性
  //     style: object
  //   }
  // ]

  disabled={是否禁用 bool, 默认无}
  onChange={点击页签 func(value)}
/>
```

### 示例

```javascript
import Tabs from 'seedsui-react/lib/Tabs'

const list = [
  { name: '中华人民共和国', dateType: '0' },
  { name: '季', dateType: '1' },
  { name: '年', dateType: '2' }
]
const [value, setValue] = useState({ name: '季', dateType: '0' })

function handleChange(value) {
  setValue(value)
}

;<Tabs style={{ height: 100 }} list={list} value={value} onChange={handleChange} />
```

[返回目录](#简介)

## Ticket

[票券]](https://unpkg.com/seedsui-react/src/lib/Ticket/Ticket.js)

### 属性

```javascript
<Ticket
  legend={左侧容器 node, 默认无}
  legendAttribute={左侧容器style object, 默认无}
  contentAttribute={内容className string, 默认无, 基础'ticket-container'}
  children
  {...others}
/>
```

### 示例

```javascript
import Ticket from 'seedsui-react/lib/Ticket'
;<Ticket
  onClick={this.onClick}
  style={{ margin: '12px 14px' }}
  legend={
    <div className="text-center">
      <p style={{ fontSize: '20px' }}>标题</p>
      <p style={{ fontSize: '12px', marginTop: '4px' }}>满30元可用</p>
    </div>
  }
  containerStyle={{ padding: '12px' }}
>
  <div className="flex flex-top" style={{ height: '60px' }}>
    <p className="list-caption nowrap2 flex-1" style={{ height: '40px' }}>
      商品名称 规格
    </p>
  </div>
  <div className="flex">
    <p className="list-sndcaption font-size-sm flex-1">2017-07-07</p>
  </div>
</Ticket>
```

[返回目录](#简介)

## Timeline

[时间轴](https://unpkg.com/seedsui-react/src/lib/Timeline/Timeline.js)

### 属性

```javascript
<Timeline
  list={列表 array, 默认无, 格式如下:}
  // [{content: node, icon: node(默认Dot), active: bool, children: node}]
  className={容器className string, 默认无, 基础'timeline'}
  style={容器style object, 默认无}

  caseAttribute={块属性 object, 默认无, 基础{className: 'timeline-case'}}

  lineAttribute={块左线条属性 object, 默认无, 基础{className: 'timeline-line'}}

  badgeAttribute={块左小球的容器 object, 默认无, 基础{className: 'timeline-badge'}}

  dotAttribute={块Dot组件小球属性 object, 默认{className: ''}}

  contentAttribute={块内容容器 object, 默认无, 基础{className: 'timeline-content'}}

  {...others}
/>
```

### 示例

```javascript
import Timeline from 'seedsui-react/lib/Timeline';

const timeList = [
  {content: <p>内容</p>, active: true}
]
<Timeline className={`timeline-line-cross`} list={timeList} style={{padding: '0 0 0 18px'}}/>
```

[返回目录](#简介)

## Timepart

[时间段](https://unpkg.com/seedsui-react/src/lib/Timepart/Timepart.js)

### 属性

```javascript
<Timepart
  multiple={是否允许多选 bool, 默认false}
  style={容器style object, 默认无}
  className={容器className string, 默认无, 基础'timepart'}

  startTime={开始时间 string, 默认'07:00'}
  endTime={结束时间 string, 默认'22:00'}
  times={设置时间段 array, 默认无}
  // [{className: string, startTime: 'hh:ss', endTime: 'hh:ss', data: string, cover: bool}], 其中cover指允许覆盖显示

  onChange={选中发生变化 func(times:array), 默认无}
  onError={发生冲突错误 func(e, {errMsg:''}), 默认无}
/>
```

### 示例

```javascript
import Timepart from 'seedsui-react/lib/Timepart'
;<Timepart times={[{ className: 'disabled', startTime: '09:00', endTime: '10:00' }]} />
```

[返回目录](#简介)

## Titlebar

[标题栏](https://unpkg.com/seedsui-react/src/lib/Titlebar/Titlebar.js)

### 属性

```javascript
<Titlebar
  className={容器className string, 默认无, 基础'titlebar'}

  showUrlTitle={标题是否显示url中的title bool, 默认true, 将会读取url中'titlebar'参数做为标准}
  caption={标题 node, 默认无}
  captionAttribute={标题属性 object, 默认无} // 只有caption为string类型或者显示地址栏标题时才有用

  lButtons={左按钮 array, 默认['$back']}
  // '$back' 等同于{iconAttribute: {className: 'shape-arrow-left', onClick: 默认的返回事件}}
  rButtons={右按钮 array, 默认无}
  // [{caption: string, className: string, style: object, icon: node, iconAttribute: object}]

  backButtonAttribute={返回按钮属性 object, 默认无} // 设置默认返回按钮的样式及属性
  // {caption: string, className: string, style: object, icon: node, iconAttribute: object}
  children={自定义内容 node, 默认无}
  {...others}
>
如果此处写了内容, 将代替caption
</Titlebar>
```

### 示例

```javascript
import Timepart from 'seedsui-react/lib/Timepart'
;<Titlebar
  caption="SeedsUI"
  rButtons={[
    {
      caption: 'try',
      onClick: () => {
        console.log(1)
      }
    }
  ]}
/>
```

[返回目录](#简介)

## Toast

[提示弹框](https://unpkg.com/seedsui-react/src/lib/Toast/Toast.js)

### 建议

Toast 组件更适用于复杂的定制弹框,一般弹框建议直接使用 Api 直接调用:

- Toast.show({content: ''})

### 属性

```javascript
<Toast
  portal={传送dom object, 默认document.getElementById('root')}
  position={垂直方向显示位置, 默认'middle'} // top|middle|bottom
  duration={提示持续时间, 若为 0 则不会自动关闭, 默认2000}
  maskClickable={是否允许背景点击, 默认true}
  // 显隐
  visible={*显隐 bool, 默认false}
  onVisibleChange={显隐状态变化 func(visible)}

  // 左右图标
  licon={左图标 node, 默认无}
  ricon={右图标 node, 默认无}
  maskProps={遮罩属性 object, 默认无} // className: mask dialog-mask

  children={内容 node}

  {...props}
/>
```

### 示例

```javascript
import Toast from 'seedsui-react/lib/Toast'
const [visible, setVisible] = useState(false)
function handleClick() {
  Toast.show({
    content: '1234'
  })
  // setVisible(true)
}

{
  /* <Toast visible={visible} onVisibleChange={setVisible}>
    弹出框内容弹出框内容弹出框内容弹出框内容弹出框内容弹出框内容弹出框内容弹出框内容弹出框内容弹出框内容弹出框内容弹出框内容弹出框内容弹出框内容弹出框内容弹出框内容弹出框内容弹出框内容弹出框内容弹出框内容弹出框内容弹出框内容弹出框内容弹出框内容弹出框内容弹出框内容弹出框内容弹出框内容弹出框内容弹出框内容
  </Toast> */
}
;<input type="button" value="显隐" onClick={handleClick} />
```

[返回目录](#简介)

## TreePicker.Tree

[树结构](https://unpkg.com/seedsui-react/src/lib/TreePicker/Tree/index.js)

TreePicker 基于 rc-tree 开发, [完整 api](https://ant.design/components/tree-cn)

### 属性

```javascript
<TreePicker.Tree
  multiple={是否需要多选 bool, 默认false}
  list={列表项 array, 默认无} // 数据: [{id: '', name: '', parentid: ''}]
  // value则会赋值CheckedKeys, 使用defaultValue则会赋值defaultCheckedKeys
  value={选中项 array, 默认无} // 选中项: [{id: '', name: '', parentid: ''}]
  defaultValue={选中项 array, 默认无} // 选中项: [{id: '', name: '', parentid: ''}]
  // 关键字
  keywordProps={{
    value: 默认搜索关键字
    visible: 是否显示搜索功能
    ...props // 其它文本框属性
  }}
  // 节流时长
  throttle={节流时长 默认500毫秒}
  onChange={选中项 func([{id: '', name: '', parentid: ''}]), 默认无}
/>
```

### 示例

```javascript
import TreePicker from 'seedsui-react/lib/TreePicker'

<TreePicker.Combo
        placeholder="Please select"
        value={value}
        list={treeData}
        multiple={true}
        TreeProps={{
          keywordProps: {
            visible: true
          },
          showIcon: false,
          checkStrictly: false,
          checkable: true,
          selectable: false
        }}
        onChange={setValue}
      />
      <TreePicker.Tree
        keywordProps={{
          visible: true
        }}
        value={value}
        multiple={true}
        list={treeData}
        showIcon={false}
        checkStrictly={false}
        checkable
        selectable={false}
        onChange={setValue}
      />
```

[返回目录](#简介)

## VideoFull

[提示弹框](https://unpkg.com/seedsui-react/src/lib/VideoFull/VideoFull.js)

### 属性

```javascript
<VideoFull
  portal={传送dom object, 默认document.getElementById('root')}
  scriptSDK={TCPlayer库地址 string, 默认'//g.alicdn.com/de/prismplayer/2.8.8/aliplayer-min.js'}
  cssSDK={TCPlayer库地址 string, 默认'//g.alicdn.com/de/prismplayer/2.8.8/skins/default/aliplayer-min.css'}

  poster={封面图片地址 string, 默认无}
  src={视频地址 string, 默认无}
  autoPlay={自动播放 boolean, 默认无, 仅pc端支持}
  pause={暂停 boolean, 默认无} // true暂停
  isLive={是否直播 boolean, 默认无}
  params={实例参数 object, 默认无}

  onError={错误回调 func(e, {errMsg})}
  onLoad={视频实例完成,视频准备完成 func(e, s)}

  bar={自定义控件 string | node, 默认无}
  children={内容 node, 默认无}
  {...others}
/>
```

### 示例

```javascript
import VideoFull from 'seedsui-react/lib/VideoFull'

const videoFullRef = useRef(null)
function handlePlay() {
  if (
    videoFullRef.current &&
    videoFullRef.current.instance &&
    videoFullRef.current.instance.current
  ) {
    videoFullRef.current.instance.current.play()
  }
}

;<VideoFull
  poster={`//img.zcool.cn/community/01a9a65dfad975a8012165189a6476.jpg`}
  src={`//player.alicdn.com/video/aliyunmedia.mp4`}
  autoPlay
  bar={
    <Fragment>
      <div className="videofull-caption" onClick={handlePlay}>
        视频标题
      </div>
      <div className="videofull-close"></div>
    </Fragment>
  }
/>
```

[返回目录](#简介)

## Videos

[视频控件](https://unpkg.com/seedsui-react/src/lib/Videos/Videos.js)

### 属性

```javascript
<Videos
  // onChoose={点击上传按钮 func, 默认无, 有此属性才会显示上传按钮} // 浏览器默认调用录相控件Camera
  onClick={点击一项 func(e, src, selected, index), 默认点击预览视频}
  preview={显示或隐藏预览 boolean|func, 默认true}
  /*
  func(e, src, options, index)
  e:{
    target: el
    visible: false|true
  }
  value: 同传入的value
  */
  routePath={显隐路由路径 string, 默认'componentPage=1'}
  videoFullProps={预览组件配置 object, 默认无}
  {...others} // 其它属性与Photos一致
/>
```

### 示例

```javascript
import Videos from 'seedsui-react/lib/Videos'

const list = [
  {
    id: '1',
    thumb:
      'https://image-test.waiqin365.com/6069734652819592543/blog/201912/8194157084989375804.png?x-oss-process=style/zk320',
    src: 'https://player.alicdn.com/video/aliyunmedia.mp4'
  },
  {
    id: '2',
    thumb: 'https://img.zcool.cn/community/01a9a65dfad975a8012165189a6476.jpg',
    src: 'https://www.w3school.com.cn/i/movie.ogg'
  }
]

function handleClick(...params) {
  console.log('点击')
  console.log(...params)
}
function handleChoose(...params) {
  console.log('选择')
  console.log(...params)
}
function handleDelete(...params) {
  console.log('删除')
  console.log(...params)
}

;<Videos list={list} onChoose={handleChoose} onDelete={handleDelete} onClick={handleClick} />
```

[返回目录](#简介)

## MapUtil 地图工具

[地图工具](https://unpkg.com/seedsui-react/src/lib/MapUtil/BaiduMap.js)

### 引入库

```js
MapUtil.load({
  key: '百度key',
  library: ['draw'], // 鼠标绘制库, 没用到则不用传
  success: () => {
    initData()
  },
  fail: () => {
    changeState({
      errMsg: '地图库加载失败, 请稍后再试'
    })
  }
})
```

### 示例

```javascript
import MapUtil from './../lib/MapUtil';
import GeoUtil from './../lib/GeoUtil.js';
var greinerHormann = require('polygon-clipping');


const MapContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

const ButtonDraw = styled.div`
  position: absolute;
  width: 92px;
  height: 32px;
  line-height: 32px;
  top: 20px;
  right: 20px;
  z-index: 1;
  border-radius: 2px;
  text-align: center;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 4px 0px;
  cursor: pointer;
  background: #fff;
`

const redMapStyle = {
  strokeColor: '#f53e2d',
  strokeWeight: 1,
  strokeOpacity: 0.8,
  strokeStyle: 'solid',
  fillColor: '#f53e2d',
  fillOpacity: 0.6
}

var redMap = {}
var blueMap = {}



componentDidMount () {
  Bridge.debug = true
  this.mapUtil = new MapUtil('map');
  this.initMap();
}

// 添加鼠标绘制工具监听事件，用于获取绘制结果
initMap = () => {
  console.log('创建地图')
  this.mapUtil = new MapUtil('Id-MapContainer', {
    // 缩放导航
    navigation: {
      position: 'bottom-right',
      type: 'zoom'
    },
    // 中心位置
    center: {
      center: '江苏南京市'
    }
  });
  this.mapUtil.showScale();
  this.mapUtil.showNavigation();
  // 启用多边形绘制功能
  if (!this.mapUtil.drawingManager) {
    this.mapUtil.createDrawingManager();
    this.mapUtil.drawingManager.removeEventListener('overlaycomplete', this.drawBlue, false)
    this.mapUtil.drawingManager.addEventListener('overlaycomplete', this.drawBlue, false)
  }
}
// 绘制总区域
drawRed = () => {
  this.mapUtil.drawBoundary({
    area: '江苏省南京市',
    styleOptions: redMapStyle,
    success: (res) => {
      redMap['red-nanjing'] = res.polygons;
      this.mapUtil.map.setViewport(res.polygonsPath);
    },
    fail: (msg) => {
      alert(msg)
    }
  });
  this.mapUtil.drawBoundary({
    area: '江苏省镇江市',
    styleOptions: redMapStyle,
    success: (res) => {
      redMap['red-zhengjiang'] = res.polygons;
      this.mapUtil.map.setViewport(res.polygonsPath);
    },
    fail: (msg) => {
      alert(msg)
    }
  });
}
// 手动绘制可选区域
drawBlue = (e) => {
  const polygon = e.overlay;
  var id = 'blue-' + new Date().getTime();
  const shape = this.mapUtil.drawPolygon({
    polygon: polygon,
    success: () => {
      // 判断多边形是否合法
      if (GeoUtil.isPolygon(
          polygon.getPath().map(point => {
            return [point.lat, point.lng]
          })
        )
      ) {
        this.mapUtil.map.removeOverlay(polygon);
        alert('不是一个标准的多边形');
        return;
      }
      this.mapUtil.map.removeOverlay(polygon);
      // 添加到map中
      console.log('添加到blueMap中');
      console.log(polygon);
      blueMap[id] = polygon;
      // 绘制的坐标点
      var source = polygon.so.map((point) => {return [point.lng, point.lat]});
      console.log('绘制的坐标点');
      console.log(source);
      let pointss = this.redMerge([source]);
      console.log('取与红色区域的交集');
      console.log(pointss);
      // 绘制交集
      for (let points of pointss) {
        var polygons = this.mapUtil.pointsToPolygons(points);
        polygons = polygons.map((polygon) => {
          return {
            polygon: polygon,
          }
        });
        console.log('多边形');
        console.log(polygons);
        this.mapUtil.drawPolygons(polygons);
      }

      // if (points && points.length && points[0] && points[0][0]) {
      //   console.log(arr[0][0])
      //   var polygon = this.mapUtil.pointsToPolygon(arr[0][0]);
      //   console.log(polygon)
      //   polygons.push(polygon);
      //   return polygons;
      // }
    },
    fail: (msg) => {
      alert(msg)
    }
  });
  blueMap[id] = shape
  this.addContextMenu(id, shape)
}
// 启用手动绘制
enableManualDraw = () => {
  this.mapUtil.enableManualDraw()
}
// 添加右键, id用于获取和删除覆盖物值班表和
addContextMenu(id, overlay){
  this.mapUtil.addContextMenu(overlay, {
      menus: [
      {
        text: '删除',
        handler: () => {
          if (confirm('您确定要删除吗')) {
            this.mapUtil.map.removeOverlay(overlay)
            if (blueMap.has(id)) blueMap.delete(id)
          }
        }
      }
    ]
  })
}
// 红色区域取交集
redMerge = (source) => {
  // 与灰色区域取差集
  var polygons = [];
  for (var redOverlays of Object.values(redMap)) {
    for (var redOverlay of redOverlays) {
      // 必须分开裁切, 一次性裁切会报错
      var clip = redOverlay.so.map((point) => {return [point.lng, point.lat]});
      var result = greinerHormann.intersection(source, [clip]);
      if (result && result.length) polygons.push(result[0]);
    }
  }
  return polygons;
}


<MapContainer id="map"></MapContainer>
<ButtonDraw onClick={this.enableManualDraw}>划分区域</ButtonDraw>
```

[返回目录](#utils)

## GeoUtil 地理工具

[地理工具](https://unpkg.com/seedsui-react/src/lib/GeoUtil.js)

### 多边形转线

| 方法           | 返回值                         | 说明   |
| -------------- | ------------------------------ | ------ |
| polygonToLines | <code>Line&lt;Array&gt;</code> | 多边形 |

<br/>

| 参数      | 参数类型             | 说明                                                              |
| --------- | -------------------- | ----------------------------------------------------------------- |
| polygon   | <code>Number</code>  | 多边形                                                            |
| isRegular | <code>Boolean</code> | 是否要求是一个标准的多边形, 如果传 true, 则返回集合会加上首尾互连 |

### 示例

```javascript
var lines = GeoUtils.polygonToLines(
  [
    [1, 0],
    [2, 0],
    [3, 0]
  ],
  true
)
console.log(lines)
```

[返回目录](#utils)

## Vott

[图片标注](https://unpkg.com/seedsui-react/src/lib/Vott/Vott.js)

### 属性

```javascript
<Vott
  src={图片地址或者base64 string, 默认无}
  data={标注数据 array, 默认无}
  params={设置实例化参数 object, 默认无}

  readOnly={是否只读 bool, 默认false}
  preview={是否预览 bool, 默认true, 是否支持单击预览, readOnly为true时才生效}
  onChange={修改标注 func(e, value, selected), 默认无}
  {...others}
/>
// data = {
//   polygon: [ // 逆时针
//     [x2, y1], // 右上
//     [x1, y1], // 左上
//     [x1, y2], // 左下
//     [x2, y2], // 右下
//   ],
//   style: '',
//   className: '',
//   id: '',
//   ...
// }
// params = {
//   shapeAttributes: {
//     style: 'stroke:blue;',
//     className: 'blue',
//     id: 'blue',
//     custom: '自定义blue'
//   }
// }
```

### 示例

```javascript
import Vott from 'seedsui-react/lib/Vott';

const result = {
	"skuList": [{
		"x1": 442,
		"x2": 492,
		"y1": 79,
		"y2": 265
	}, {
		"x1": 51,
		"x2": 103,
		"y1": 94,
		"y2": 263
	}, {
		"x1": 221,
		"x2": 269,
		"y1": 774,
		"y2": 948
	}, {
		"x1": 64,
		"x2": 110,
		"y1": 293,
		"y2": 473
	}, {
		"x1": 598,
		"x2": 643,
		"y1": 283,
		"y2": 468
	}, {
		"x1": 251,
		"x2": 297,
		"y1": 296,
		"y2": 472
	}, {
		"x1": 266,
		"x2": 312,
		"y1": 89,
		"y2": 265
	}, {
		"x1": 198,
		"x2": 242,
		"y1": 294,
		"y2": 474
	}, {
		"x1": 311,
		"x2": 355,
		"y1": 84,
		"y2": 265
	}, {
		"x1": 646,
		"x2": 688,
		"y1": 287,
		"y2": 466
	}, {
		"x1": 155,
		"x2": 196,
		"y1": 295,
		"y2": 473
	}, {
		"x1": 84,
		"x2": 129,
		"y1": 572,
		"y2": 720
	}, {
		"x1": 431,
		"x2": 475,
		"y1": 575,
		"y2": 721
	}, {
		"x1": 219,
		"x2": 262,
		"y1": 569,
		"y2": 720
	}, {
		"x1": 131,
		"x2": 174,
		"y1": 573,
		"y2": 721
	}, {
		"x1": 176,
		"x2": 218,
		"y1": 572,
		"y2": 720
	}, {
		"x1": 137,
		"x2": 180,
		"y1": 810,
		"y2": 947
	}, {
		"x1": 388,
		"x2": 430,
		"y1": 578,
		"y2": 719
	}, {
		"x1": 587,
		"x2": 627,
		"y1": 808,
		"y2": 948
	}, {
		"x1": 263,
		"x2": 303,
		"y1": 578,
		"y2": 717
	}, {
		"x1": 355,
		"x2": 401,
		"y1": 144,
		"y2": 261
	}, {
		"x1": 423,
		"x2": 466,
		"y1": 356,
		"y2": 473
	}, {
		"x1": 382,
		"x2": 422,
		"y1": 355,
		"y2": 471
	}, {
		"x1": 672,
		"x2": 712,
		"y1": 148,
		"y2": 254
	}, {
		"x1": 552,
		"x2": 596,
		"y1": 389,
		"y2": 466
	}, {
		"x1": 512,
		"x2": 550,
		"y1": 633,
		"y2": 721
	}, {
		"x1": 589,
		"x2": 627,
		"y1": 633,
		"y2": 719
	}, {
		"x1": 472,
		"x2": 507,
		"y1": 865,
		"y2": 956
	}, {
		"x1": 468,
		"x2": 510,
		"y1": 389,
		"y2": 467
	}, {
		"x1": 553,
		"x2": 587,
		"y1": 632,
		"y2": 720
	}, {
		"x1": 544,
		"x2": 585,
		"y1": 810,
		"y2": 949
	}, {
		"x1": 217,
		"x2": 266,
		"y1": 86,
		"y2": 271
	}, {
		"x1": 580,
		"x2": 625,
		"y1": 172,
		"y2": 255
	}, {
		"x1": 403,
		"x2": 440,
		"y1": 175,
		"y2": 259
	}, {
		"x1": 510,
		"x2": 551,
		"y1": 391,
		"y2": 465
	}, {
		"x1": 324,
		"x2": 380,
		"y1": 289,
		"y2": 471
	}, {
		"x1": 348,
		"x2": 388,
		"y1": 576,
		"y2": 721
	}, {
		"x1": 507,
		"x2": 543,
		"y1": 860,
		"y2": 950
	}, {
		"x1": 628,
		"x2": 666,
		"y1": 630,
		"y2": 720
	}, {
		"x1": 305,
		"x2": 346,
		"y1": 581,
		"y2": 720
	}, {
		"x1": 127,
		"x2": 195,
		"y1": 76,
		"y2": 263
	}, {
		"x1": 628,
		"x2": 669,
		"y1": 171,
		"y2": 255
	}, {
		"x1": 98,
		"x2": 135,
		"y1": 847,
		"y2": 946
	}, {
		"x1": 182,
		"x2": 217,
		"y1": 837,
		"y2": 943
	}, {
		"x1": 538,
		"x2": 578,
		"y1": 177,
		"y2": 258
	}, {
		"x1": 493,
		"x2": 536,
		"y1": 173,
		"y2": 259
	}, {
		"x1": 212,
		"x2": 255,
		"y1": 1112,
		"y2": 1205
	}, {
		"x1": 294,
		"x2": 351,
		"y1": 764,
		"y2": 939
	}]
};

const result1 = {
	"skuList": [{
		"x1": 442,
		"x2": 492,
		"y1": 79,
		"y2": 265
	}, {
		"x1": 51,
		"x2": 103,
		"y1": 94,
		"y2": 263
  }]
};

const result2 = {
	"skuList": [{
		"x1": 493,
		"x2": 536,
		"y1": 173,
		"y2": 259
	}, {
		"x1": 212,
		"x2": 255,
		"y1": 1112,
		"y2": 1205
	}, {
		"x1": 294,
		"x2": 351,
		"y1": 764,
		"y2": 939
	}]
};


const [data, setData] = useState([])
const [readOnly, setReadOnly] = useState(true)
const [params, setParams] = useState({})

function onChangeData () {
  setData(convertData(result.skuList))
}
function onChangeData1 () {
  setData(convertData(result1.skuList))
}
function onChangeData2 () {
  setData(convertData(result2.skuList))
}
function changeReadOnly () {
  setReadOnly(!readOnly)
}
function changeBlue () {
  setParams({
    shapeAttributes: {
      style: 'stroke:blue;',
      className: 'blue',
      id: 'blue',
      custom: '自定义blue'
    }
  });
}
function convertData (skuList) {
  return skuList.map((item) => {
    return {
      polygon: [
        [item.x2, item.y1],
        [item.x1, item.y1],
        [item.x1, item.y2],
        [item.x2, item.y2],
      ],
      style: 'stroke:red;',
      className: 'default',
      id: 'default',
      custom: '自定义属性'
    }
  })
}
function onChange(e, item, list) {
  console.log(e, item, list)
}

<Vott
  style={{height: '700px'}}
  data={data}
  readOnly={readOnly}
  src="http://image-test.waiqin365.com/6692513571099135446/sku/201809/20180911195747712_05105130_CAMERA_21001006280.jpg"
  params={params}
  onChange={onChange}
  preview
/>
<input type="button" value="只读" onClick={changeReadOnly}></input>
<input type="button" value="绘制蓝色" onClick={changeBlue}></input>
<input type="button" value="全部" onClick={onChangeData}/>
<input type="button" value="切换1" onClick={onChangeData1}/>
<input type="button" value="切换2" onClick={onChangeData2}/>
```

[返回目录](#简介)

## DB 前端数据库(支持 localStorage、sessionStorage、indexedDB、cookie)

[前端数据库](https://unpkg.com/seedsui-react/src/lib/DB/DB.js)

```
支持 localStorage、sessionStorage、indexedDB、cookie
```

### 方法(前缀一致, 后缀分别为: IndexDB、Store、Session、Cookie)

#### setIndexDB

#### getIndexDB

#### getAllIndexDB

#### removeIndexDB

#### clearIndexDB

### 示例

```javascript
import DB from 'seedsui-react/lib/DB'

console.log('当前浏览器是否支持indexdb?', DB?.indexedDB?.__proto__)

const handleAdd = async () => {
  let result = await DB.setCookie('000', { a: '00' })
  console.log('result', result)
  let result1 = await DB.setCookie('111', false, 10000)
  console.log('result1', result1)
  let result2 = await DB.setCookie('222', true)
  console.log('result2', result2)
  let result3 = await DB.setCookie('333', 333)
  console.log('result3', result3)
  let result4 = await DB.setCookie('444', 'asdfasdf')
  console.log('result4', result4)
}
const handleRemove = async () => {
  let result = await DB.removeCookie('222')
  console.log('result', result)
  let result2 = await DB.removeCookie('2222')
  console.log('result2', result2)
}
const handleClear = async () => {
  let result = await DB.clearCookie()
  console.log('result', result)
}
const handleGet = async () => {
  let result = await DB.getCookie('1111')
  console.log('result', result)
  let result0 = await DB.getCookie('000')
  console.log('result0', result0)
  let result1 = await DB.getCookie('111')
  console.log('result1', result1)
  let result2 = await DB.getCookie('222')
  console.log('result2', result2)
  let result3 = await DB.getCookie('333')
  console.log('result3', result3)
  let result4 = await DB.getCookie('444')
  console.log('result4', result4)
}
const handleAll = async () => {
  let result = await DB.getAllCookie()
  console.log('result', result)
}



<div onClick={handleAdd}>新增</div>
<div onClick={handleRemove}>删除</div>
<div onClick={handleClear}>删除所有</div>
<div onClick={handleGet}>获取</div>
<div onClick={handleAll}>获取所有</div>
```

[返回目录](#utils)
