# 简介
SeedsUI,专为移动设备设计的UI框架,组件全面可换肤,以后将会有react版和vue版、h5版

# 安装
```js
npm install seedsui-react --save
```

# 导入组件

## 动态导入

- 支持Less(如果工程已经支持了忽悠此条)：
```js
npm install less less-loader --save-dev
```
```js
修改 webpack.config.dev.js 和 webpack.config.prod.js 配置文件:<br>
搜索“/\.css”，修改规则为/\.css|.less$/,use -> {loader: require.resolve('less-loader')}

```

- 拷贝assets文件

- 入口文件, 参考assets/seedsui/src-index.js

## 全局配置国际化
```js
// 国际化
import locale from 'utils/locale';
import Context from 'seedsui-react/lib/Context';
ReactDOM.render(
  <Context locale={locale()}>
    <Routes />
  </Context>,
  document.getElementById('root')
);
```

#### 文件中使用国际化

```bash
参考assets/locale/README.md
```


#### 简单示例
```javascript
import InputDate from 'seedsui-react/lib/InputDate'
import DateType from 'seedsui-react/lib/DateType'
import zhCN from 'seedsui-react/lib/locale/zh_CN'
import enUS from 'seedsui-react/lib/locale/en_US'
import Context from 'seedsui-react/lib/Context'

const [locale, setLocale] = useState(zhCN)

function handleZh () {
  setLocale(zhCN)
}
function handleEn () {
  setLocale(enUS)
}

<input type="button" value="英文" onClick={handleEn}/>
<input type="button" value="中文" onClick={handleZh}/>
<Context
  portal={document.getElementById('demo')}
  locale={locale}
>
  <InputDate type="datetime"/>
  <DateType/>
</Context>
```

# 组件规范
> 为了使开发者不感觉到使用SeedsUI是在学习一种新的语言，所以SeedsUI整体API的设计尽量使用W3C和React的规范，使开发者感觉到仍然在使用React原生DOM在开发，从而能够节省更多的学习时间和使用体验：

- 所有事件名称均为on开头, 例如onChange
- 所有事件第一个参数都为e: 文本框为:(e, value); 选项类为(e, value, selected, index(列表时传))
- 所有选择类控件, selected入参或者出参, 格式均为[{id: '', name: ''}]
- 所有组件内dom属性后缀都使用Attribute, 例如maskAttribute
- 所有组件内组件属性后缀都使用Props, 例如pickerProps


# Component
- [Actionsheet](#actionsheet) 卡片弹框
- [Alert](#alert) 弹出框
- [Attach](#attach) 弹出框
- [Badge](#badge) 徽章
- [BiClock](#biclock) 时钟
- [BiDoughnut](#bidoughnut) 环形图
- [BiGauge](#bigauge) 导航
- [Bridge](#bridge) 桥接
- [Button](#button) 按钮
- [Calendar](#calendar) 日历
- [Camera](#camera) h5拍照与录相功能
- [Card](#card) 卡片
- [Carrousel](#carrousel) 轮播(Swiper的简化版)
- [Chat](#chat) 聊天
- [Checkbox](#checkbox) 复选框
- [ConfigProvider](#configprovider) 全局配置(已使用Context代替)
- [Container](#container) container主体
- [ContainerPull](#containerpull) 带下拉刷新功能的container主体
- [Context](#context) 全局配置
- [Counter](#counter) 计数器
- [DatePopover](#datepopover) 日期快捷选择弹窗
- [DateType](#datepopover) 日期类型选择
- [Dialog](#dialog) 自定义弹出框
- [Dot](#dot) 小点点
- [Dragrefresh](#dragrefresh) 下拉刷新(已使用ContainerPull代替)
- [Dropdown](#dropdown) 页签菜单
- [Emoji](#emoji) 表情
- [Footer](#footer) page底部
- [Group](#group) 分组
- [Handsign](#handsign) 手写签名
- [Header](#header) page头部
- [ImgMark](#imgmark) 图片标注(即将废弃,使用Vott组件代替)
- [ImgLazy](#imglazy) 懒人加载
- [IndexBar](#imguploader) 侧边索引栏
- [InputArea](#inputarea) 多行文本框
- [InputCity](#inputcity) 城市选择(即将废弃, 使用InputDistrict代替)
- [InputColor](#inputcolor) 颜色选择框
- [InputDate](#inputdate) 日期选择
- [InputDistrict](#inputdistrict) 区域选择
- [InputLocation](#inputlocation) 定位
- [InputNumber](#inputnumber) 数字输入框
- [InputPassword](#inputpassword) 密码框
- [InputPhone](#inputphone) 手机号码输入框
- [InputPicker](#inputpicker) 滚动选择框
- [InputPre](#inputpre) 自增高输入框
- [InputRange](#inputrange) 范围选择框
- [InputSafe](#inputsafe) 安全强度检验框
- [InputSelect](#inputselect) 选择框
- [InputStar](#inputstar) 评分框
- [InputText](#inputtext) 文本框
- [Jcrop](#jcrop) 图片裁切
- [Legend](#legend) 标题
- [ListPull](#listpull) 可推动列表
- [Loading](#loading) 加载中
- [LotteryWheel](#lotterywheel) 抽奖
- [MapChoose](#MapChoose) 地图选点
- [MapView](#MapView) 地图预览
- [Mark](#mark) 标记
- [Marquee](#marquee) 跑马灯
- [MenuTiled](#menutiled) 平铺弹出菜单
- [MenuTree](#menutree) 侧边树形菜单
- [Notice](#notice) 公告
- [NumBox](#numbox) 数字加减框
- [OnOff](#onoff) 开关
- [Page](#page) 页面
- [PagePull](#pagepull) 可推动页面
- [Peg](#peg) 小竖条
- [Photos](#photos) 照片列表
- [Picker](#picker) 滚动选择弹框
- [PickerCity](#pickercity) 城市选择弹框(即将废弃, 使用PickerDistrict代替)
- [PickerDate](#pickerdate) 日期选择弹框
- [PickerDistrict](#pickerdistrict) 区域选择弹框
- [Player](#player) 视频播放器
- [Popover](#popover) 箭头弹框
- [Progress](#progress) 进度条
- [PDFView](#pdfview) PDF文件预览
- [Radio](#radio) 单选框
- [PickerSelect](#pickerselect) 选择弹框
- [Star](#star) 星星
- [Stencil](#stencil) 加载模板
- [Sticker](#sticker) 标签贴
- [Swiper](#swiper) 轮播(Carrousel的增强版, 参考https://swiperjs.com/api)
- [Tabbar](#tabbar) 页签
- [Ticket](#ticket) 票券
- [Timeline](#timeline) 时间轴
- [Timepart](#timepart) 时间段
- [Titlebar](#titlebar) 标题栏
- [Toast](#toast) 提示弹框
- [Tree](#tree) 树结构
- [VideoFull](#videofull) 视频预览控件
- [Videos](#videos) 视频控件
- [Vott](#vott) 图片标注



# Utils
- [MapUtil](#maputil) 地图工具
- [GeoUtil](#geoutil) 地理工具


## Actionsheet
[卡片框](https://unpkg.com/seedsui-react/src/lib/Actionsheet/Actionsheet.js)
### 属性
```javascript
<Actionsheet
  portal={传送dom object, 默认document.getElementById('root')}
  show={*显隐 bool, 默认false}
  animation={动画 string, 默认'slideUp'}  // slideLeft | slideRight | slideUp | slideDown | zoom | fade | none
  duration={动画时长 number, 默认无}

  list={*按钮项 array, 如: [{name: string}]}

  maskAttribute={遮罩属性 object, 默认无} // mask actionsheet-mask
  groupAttribute={主体属性 object, 默认无} // actionsheet-group
  optionAttribute={选项属性 object, 默认无} // actionsheet-option

  cancelCaption={取消按钮文字 node, 默认'取消'}
  cancelAttribute={取消按钮属性 object, 默认无} // actionsheet-cancel, 有onClick属性才显示确定按钮

  onChange={点击项 func(e, value, selected, index)}
/>
```
### 示例
```javascript
import Actionsheet from 'seedsui-react/lib/Actionsheet';
const [show, setShow] = useState(false);
function handleChange (e, value, selected, index) {
  console.log(e, value, selected, index)
}
function onShow () {
  setShow(true);
}
function onHide () {
  setShow(false)
}

<input type="button" value="显示" onClick={onShow}/>
<Actionsheet
  show={show}
  list={[{name: '菜单1'}, {name: '菜单2'}]}
  onChange={handleChange}
  cancelAttribute={{
    onClick: onHide
  }}
  maskAttribute={{
    onClick: onHide
  }}
/>
```
[返回目录](#component)


## Alert
[对话框](https://unpkg.com/seedsui-react/src/lib/Alert/Alert.js)
### 建议
Alert组件更适用于复杂的定制弹框,一般弹框建议直接使用Api直接调用:
* alert框:Bridge.showAlert(msg)代替
* confirm框:Bridge.showConfirm(msg, {success: fn, fail: fn})代替

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
import Alert from 'seedsui-react/lib/Alert';

const [show, setShow] = useState(false)

function onClick () {
  setShow(!show);
}

<Alert
  show={show}
  style={{color: 'green'}}
  className="transition-duration-0"
  maskAttribute={{className: "transition-duration-0"}}
  portal={document.body}
  submitAttribute={{onClick: onClick, className: 'primary', disabled: false}}
  cancelAttribute={{onClick: onClick}}
  captionAttribute={{style: {padding: '30px 12px 5px 12px'}}}
  contentAttribute={{style: {padding: '15px 12px 20px 12px'}}}
>
  <div>hhh</div>
</Alert>
<input type="button" value="显隐" onClick={onClick}/>
```
[返回目录](#component)




















## Attach
[照片控件](https://unpkg.com/seedsui-react/src/lib/Attach/Attach.js)
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
import Attach from 'seedsui-react/lib/Attach';
const list = [{
  name: '1',
  src: 'https://image-test.waiqin365.com/6069734652819592543/blog/201912/8194157084989375804.png?x-oss-process=style/zk320'
},{
  name: '2',
  src: 'https://img.zcool.cn/community/01a9a65dfad975a8012165189a6476.jpg'
}];

function handleClick (e, src, selected, index) {
  console.log('点击')
  console.log(e, src, selected, index)
}
function handleChoose (e) {
  console.log('选择')
  console.log(e.target)
}
function handleDelete (e, src, selected, index) {
  console.log('删除')
  console.log(e, src, selected, index)
}

<Attach
  list={list}
  onChoose={handleChoose}
  onDelete={handleDelete}
  onClick={handleClick}
/>
```
[返回目录](#component)











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
[返回目录](#component)




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
import BiClock from 'seedsui-react/lib/BiClock';

<BiClock time="11:30"/>
```
[返回目录](#component)



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
[返回目录](#component)




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
import BiGauge from 'seedsui-react/lib/BiGauge';

<BiGauge rotate={15} className="success">
  15
</BiGauge>
```
[返回目录](#component)




## Bridge
[桥接](https://unpkg.com/seedsui-react/src/lib/Bridge/index.js)
, 现支持四个平台的桥接适配, 浏览器、订货、外勤JSBridge、外勤Cordova、微信客户端
### 对象
```javascript

```
### 示例
```javascript
import Bridge from 'seedsui-react/lib/Bridge';

Bridge.showToast('提交成功', {
  mask: true,
  success: () => {
    history.go(-1);
  }
});
```
[返回目录](#component)




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
import Button from 'seedsui-react/lib/Button';

<Button className="lg">提交</Button>
```
[返回目录](#component)













## Calendar
[日历](https://unpkg.com/seedsui-react/src/lib/Calendar/Calendar.js)
### 属性
```javascript
<Calendar
  type={日历类型 string, 默认'month'} // 'week' | 'month'
  activeTo={跳转到 string|date, 默认无} // 'today' | 'default' | 自定义日期
  defaultDate={默认选中日期 date, 默认new Date()}
  titleFormat={是否显示周数 string, 默认'YYYY年MM月DD日'} // 标题日期格式化 YYYY年MM月DD日 周E 第W周
  disableBeforeDate={禁用此前日期 date, 默认无}
  disableAfterDate={禁用此后日期 date, 默认无}
  verticalDrag={是否允许垂直拖动 bool, 默认true}
  prevHTML={左箭头html string, 默认'&lt'}
  nextHTML={右箭头html string, 默认'&gt'}
  onChange={选中日期发生变化 func(s, value)}
  onClick={点击 func(s, value)}
  onError={非法操作,如选择禁用日期 func(s, err)}
/>
```
### 示例
```javascript
import Calendar from 'seedsui-react/lib/Calendar';

const defaultDate = new Date();
defaultDate.nextMonth();
const [type, setType] = useState('week');
const [activeTo, setActiveTo] = useState('');

function onChangeCalendar (s, value) {
  // 记录滑动后切换的日期
  console.log(s)
  console.log('滑动选中:' + value)
}
function onClickCalendar (s, value) {
  // 记录点击的选中日期, 用于滑动不切换日期用
  console.log(s)
  console.log('点击选中:' + value)
}
function showMonth () {
  setType('month');
}
function showWeek () {
  setType('week');
}
function showToday () {
  setActiveTo('today');
}
function showReset () {
  setActiveTo('default');
}
function showCustom () {
  setActiveTo(new Date('1988,08,22'));
}

<Calendar
  defaultDate={defaultDate}
  type={type}
  activeTo={activeTo}
  titleFormat="YYYY年MM月DD日 周EE 第W周"
  onChange={onChangeCalendar}
  onClick={onClickCalendar}
  // disableBeforeDate={new Date()} // 禁用今天以前的日期
/>
<a style={{margin: '8px'}} className="button lg bg-1" onClick={showMonth}>月</a>
<a style={{margin: '8px'}} className="button lg bg-2" onClick={showWeek}>周</a>
<a style={{margin: '8px'}} className="button lg bg-3" onClick={showToday}>今天</a>
<a style={{margin: '8px'}} className="button lg bg-4" onClick={showReset}>默认日期</a>
<a style={{margin: '8px'}} className="button lg bg-4" onClick={showCustom}>1988-08-22</a>
```
[返回目录](#component)











## Camera
[h5拍照与录相功能](https://unpkg.com/seedsui-react/src/lib/Camera/Camera.js)
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
import Camera from 'seedsui-react/lib/Camera';
// h5录相完成后保存
function saveRecord (e) {
  var data = new FormData();
  data.append("file", e.target);
  // 保存, 仅为示例, 并非真实接口
  var req = new XMLHttpRequest();
  req.open("POST", "com.spinsoft.bip.frame.utils.image.saveMp4.biz.ext");
  req.send(data);
}

{/* 录相 */}
{showRecord && <Camera
  onHide={() => setShowRecord(false)}
  onRecord={saveRecord}
/>}
```
[返回目录](#component)














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
import Card from 'seedsui-react/lib/Card';

<Card>
卡片内容
</Card>
```
[返回目录](#component)



















## Carrousel
[轮播](https://unpkg.com/seedsui-react/src/lib/Carrousel/Carrousel.js)
### 属性
```javascript
<Carrousel
  style={容器style object, 默认无}
  className={容器className string, 默认无, 基础:list模式下为'carrousel-container'|page模式下为'carrousel-page'}
  
  slideAttribute={div左线条属性 object, 默认无, 基础{className: 'carrousel-slide'}}

  pagination={是否显示小点点 bool | node, 默认false} // 传node为自定义分页
  paginationAttribute={div小点点容器属性 object, 默认无, 基础{className: 'carrousel-pagination'}}

  stopPropagation={是否阻止点击事件的传播 bool, 默认false} // 当touch事件与FastClick插件冲突时可设为false
  loop={是否循环显示 bool, 默认false}
  activeIndex={默认选中第几块 number, 默认0}
  
  autoPlay={自动播放毫秒数 number, 默认0} // 设置大于0的数值才会触发自动播放
  slidesPerView={一屏显示几块 number, 默认1}
  defaultSrc={默认图片 string, 默认'//res.waiqin365.com/d/seedsui/carrousel/default.png'}
  list={轮播图 array, 默认无} // 格式: [{bg: 'xx', img: 'xx', iconAttribute: {}, caption: 'xx'}]
  speed={动画过渡的速度 number, 默认300}
  enableOnChange={手动调用slideTo方法是否触发onChange事件回调 bool, 默认true}
  onChange={轮播时事件回调 func(s)}
  onClick={点击块 func(s, item, index)}
  
  children={wrapper容器内子元素 node, 默认无}

  {...others}
>
<div>轮播页时, 用此div, 轮播图则使用list属性</div>
</Carrousel>
```
### 示例
```javascript
import Carrousel from 'seedsui-react/lib/Carrousel';

const imgList1 = [
  {
    bg: 'http://thumbs.dreamstime.com/b/%E5%A4%A9%E9%99%85%E6%B5%B7%E6%B5%B7%E6%B4%8B%E5%92%8C%E8%93%9D%E5%A4%A9%E8%83%8C%E6%99%AF%E5%AE%89%E9%9D%99-100160983.jpg'
  },
  {
    bg: 'http://photo.tuchong.com/24951/f/32312037.jpg'
  }
]
const imgList2 = [
  {
    bg: 'http://youimg1.c-ctrip.com/target/tg/616/052/178/ceeddf2de3a74df184bcacc9e6b3123c.jpg'
  },
  {
    bg: 'http://img1.cache.netease.com/catchpic/4/45/45F29E5ABA21EBBE1E8B50C2FA6D8EB4.jpg'
  }
]

const [list, setList] = useState(imgList1);
const [activeIndex, setActiveIndex] = useState(0);

function onCarrouselChange () {
  setActiveIndex(s.activeIndex)
}

<Button onClick={() => setActiveIndex(0)}>第1页</Button>
<Button onClick={() => setList(imgList2)}>换列表</Button>
// 轮播页
<Carrousel
  className="carrousel-page"
  style={{top: '84px'}}
  onChange={onCarrouselChange}
  activeIndex={activeIndex}
>
  <Page>第一页</Page>
  <Page>第二页</Page>
  <Page>第三页</Page>
  <Page>第四页</Page>
</Carrousel>
// 轮播图
<Carrousel
  list={list}
  style={{height: '300px'}}
  pagination
  loop
  activeIndex={activeIndex}
  onChange={onCarrouselChange}
/>
```
[返回目录](#component)












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
[返回目录](#component)




## Checkbox
[复选框](https://unpkg.com/seedsui-react/src/lib/Checkbox/Checkbox.js)
### 属性
```javascript
<Checkbox
  value={复选框value string, 默认无}
  checked={是否选中 bool, 默认false}

  disabled={是否禁用 bool, 默认false}

  inputAttribute={文本框属性 object, 默认无}

  caption={复选框标题 string, 默认无}
  captionAttribute={标题属性 object, 默认无}
  onClick={点击复选框 func(e, checked)}

  {...others}
/>
```
### 示例
```javascript
import Checkbox from 'seedsui-react/lib/Checkbox';

const [checked, setChecked] = useState(false);

function onClick (e, curentChecked) {
  setChecked(!curentChecked);
}

<Checkbox caption="全选" checked={checked} onClick={onClick}/>
```
[返回目录](#component)









## ConfigProvider
[全局配置](https://unpkg.com/seedsui-react/src/lib/ConfigProvider/ConfigProvider.js)
### 说明
此组件已废弃,此属性于react16.3发布新的context后已废弃, 建议使用[Context](#context)代替
### 过渡方案
搜索
```javascript
static contextTypes = {
```
改为
```javascript
import Context from 'seedsui-react/lib/Context/instance.js';
static contextType = Context;
```
搜索
```javascript
const {
  locale = {}
} = this.context;
或
const {locale} = this.context;
```
改为
```javascript
let {
  locale = {}
} = this.context;
if (!locale) locale = {}
```

### 属性
```javascript
<ConfigProvider
  locale={国际化配置文件 object, 默认无} // 此属性会覆盖language国际化文件中的字段
  portal={弹框传送dom object, 默认无}
  onChange={修改回调 func, 默认无}
  children={子元素 node, 默认无}
/>
```
[locale格式](https://unpkg.com/seedsui-react/src/lib/locale/zh_CN.js)

### 示例
```javascript
import InputDate from 'seedsui-react/lib/InputDate';
import zhCN from 'seedsui-react/lib/locale/zh_CN';
import enUS from 'seedsui-react/lib/locale/en_US';
import ConfigProvider from 'seedsui-react/lib/ConfigProvider';

state = {
  locale: zhCN
}

useZh = () => {
  this.setState({
    locale: zhCN
  });
}
useEn = () => {
  this.setState({
    locale: enUS
  });
}

<input type="button" value="英文" onClick={this.useEn}/>
<input type="button" value="中文" onClick={this.useZh}/>
<ConfigProvider portal={document.getElementById('demo')} locale={this.state.locale}>
  <InputDate type="datetime"/>
</ConfigProvider>

```

### 组件调用示例
```javascript
// 国际化
static contextTypes = {
  locale: PropTypes.object
}
render() {
  // 国际化
  const {
    locale = {}
  } = this.context;

  console.log(locale);
  return (
    <div></div>
  );
}

```

### 非组件中调用(不建议使用, 因为只能在全局只有一个ConfigProvider时才能这样用)
```javascript
import locale from 'seedsui-react/lib/locale';

locale('hint_only_mobile')
```

[返回目录](#component)











## Container
[主体内容](https://unpkg.com/seedsui-react/src/lib/Container/Container.js)
, 通常与Page、Header一起使用, 位于Header下面的位置
### 属性
```javascript
<Container
  lazyLoad={懒人加载 string, 默认无} // scroll 滚动加载 | queue 队列加载
  // 异步加载时需要使用:
  // ref="$container" 和 ref={(el) => {this.$container = el;}}, this.refs.$container === this.$container
  // this.refs.$container.state.lazyLoadInstance.load();或this.$container.state.lazyLoadInstance.load();
  
  {...others}
>
主体内容
</Container>
```
### 示例
```javascript
import Page from 'seedsui-react/lib/Page';
import Header from 'seedsui-react/lib/Header';
import Container from 'seedsui-react/lib/Container';

const [list, setList] = useState([
  'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588862343333&di=a85930ded8bf26f1e67da77638e01c95&imgtype=0&src=http%3A%2F%2Ffile04.16sucai.com%2Fd%2Ffile%2F2015%2F0429%2F56f0698d2becb7433ae694860d3d3df6.jpg',
  'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588862343333&di=7bcb2c84cae38d7ac9dfe23131d7a49d&imgtype=0&src=http%3A%2F%2Ffile02.16sucai.com%2Fd%2Ffile%2F2015%2F0331%2F84f37ac106d412a608360a65be2654bb.jpg',
])
function add () {
  setList([
    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588862343333&di=a85930ded8bf26f1e67da77638e01c95&imgtype=0&src=http%3A%2F%2Ffile04.16sucai.com%2Fd%2Ffile%2F2015%2F0429%2F56f0698d2becb7433ae694860d3d3df6.jpg',
    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588862343333&di=7bcb2c84cae38d7ac9dfe23131d7a49d&imgtype=0&src=http%3A%2F%2Ffile02.16sucai.com%2Fd%2Ffile%2F2015%2F0331%2F84f37ac106d412a608360a65be2654bb.jpg',
    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588862343332&di=41db6a0b3c569f25126006a1a45c16ff&imgtype=0&src=http%3A%2F%2Ffile06.16sucai.com%2F2016%2F0606%2Fe971b8bb661d8e43c03b73f34df0b365.jpg',
    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588862343332&di=f29b5bccb76c2b5d0318cb2cf92119a3&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180103%2F868eb21b0b8e45e6bec55218252badf9.jpeg',
    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588862343332&di=75d2580e1fc116046d9aafb4d5499a68&imgtype=0&src=http%3A%2F%2Fdesk.fd.zol-img.com.cn%2Fg5%2FM00%2F02%2F0C%2FChMkJ1bK2zKIZrPwAAI5J9v12CIAALJ6gJ3SWgAAjk_383.jpg',
    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588862343332&di=5b400b3c70d2003646916e4ba7bc4a5c&imgtype=0&src=http%3A%2F%2Ff.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2Ffc1f4134970a304eb048b46ad1c8a786c9175c33.jpg',
    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588862343331&di=4898a2f3c21a794219e2d7790a8ebd9f&imgtype=0&src=http%3A%2F%2Ffile04.16sucai.com%2Fd%2Ffile%2F2015%2F0417%2F309a1058647104845307bb338221485e.jpg'
  ])
}
  
<Page>
  <Header>
    头部
  </Header>
  <Container lazyLoad="queue">
    <input type="button" value="动态增加图片" onClick={add}/>
    {list.map((src, index) => {
      return <div key={index} style={{height: '800px', overflow: 'hidden'}}><img data-load-src={src} style={{width: '340px'}} data-error-src="//res.waiqin365.com/d/seedsui/carrousel/default.png" src="//res.waiqin365.com/d/seedsui/carrousel/default.png" alt=""/></div>
    })}
  </Container>
</Page>
```
[返回目录](#component)

















## ContainerPull
[下拉刷新](https://unpkg.com/seedsui-react/src/lib/ContainerPull/ContainerPull.js)
### 属性
```javascript
<ContainerPull
  onTopRefresh={头部刷新 func(s)}
  onBottomRefresh={底部刷新 func(s)}
  refreshing={是否正在刷新 bool, 默认false} // true|1:正在刷新; false|0:刷新完成; 其它:不执行刷新
  lazyLoad={懒人加载 string, 默认无} // scroll 滚动加载 | queue 队列加载
  {...others}
>
内容
</ContainerPull>
```
### 示例
```javascript
import ContainerPull from 'seedsui-react/lib/ContainerPull';
import BottomNoData from 'seedsui-react/lib/ContainerPull/BottomNoData';
import BottomRefreshing from 'seedsui-react/lib/ContainerPull/BottomRefreshing';
import Notice from 'seedsui-react/lib/Notice';

// 全局变量
let page = 1;
let rows = 5;
const data = [
	{
		id: '1',
		name: '数据'
	},
	{
		id: '1',
		name: '数据'
	},
	{
		id: '1',
		name: '数据'
	},
	{
		id: '1',
		name: '数据'
	},
	{
		id: '1',
		name: '数据'
	},
	{
		id: '1',
		name: '数据'
	},
	{
		id: '1',
		name: '数据'
	},
	{
		id: '1',
		name: '数据'
	}
]

// 非全局变量
const refEl = useRef(null);
let [refreshing, setRefreshing] = useState('');
let [list, setList] = useState([]);
// 用于判断是否没有数据了true:有数据 false:没有数据
let [hasMore, setHasMore] = useState(true);
// 错误信息
let [errMsg, setErrMsg] = useState('');

function onTopRefresh () {
  console.log('头部刷新');
  loadData(false);
}
function onBottomRefresh () {
  if (hasMore === true) {
    console.log('底部刷新');
    loadData(true);
  }
}
// 获取列表的基本方法
function getList (options = {}) {
  return new Promise((resolve) => {
    console.log(`第${options.page}页, 开始刷新`)
    setRefreshing(true);
    page = options.page;
    setTimeout(() => {
      console.log(`第${options.page}页, 刷新完成`)
      setRefreshing(false)
      let allList = list;
      // 设置数据
      const serList = data || [];
      allList = options.page === 1 ? serList : allList.concat(serList);
      list = allList;
      // 数据加载完成, 假设共5页, 或者用其它判断方法
      if (options.page >= 5 || allList.length === 0) {
        setHasMore(false);
        if (allList.length === 0) {
          setErrMsg('暂无数据');
        }
      } else {
        setHasMore(true);
        setErrMsg('');
      }
      setList(allList)
      resolve(true)
    }, 2000)
  })
}
function loadData (isNext) {
  // 分页
  if (isNext) {
    page++;
  } else {
    page = 1;
    if (refEl && refEl.current) refEl.current.scrollTop = 0;
  }
  // 获得数据
  getList({
    page: page,
    rows: rows
  });
}

useEffect(() => {
  loadData();
}, []); // eslint-disable-line

<ContainerPull ref={refEl} refreshing={refreshing} onTopRefresh={onTopRefresh} onBottomRefresh={onBottomRefresh}>
  {list.map((item, index) => {
    return <div className="flex flex-middle" style={{height: '44px'}} key={index}>{item.name}</div>
  })}
  {hasMore === true && <BottomRefreshing/>}
  {hasMore === false && <BottomNoData/>}
</ContainerPull>
{errMsg && <Notice caption={errMsg} style={{top: '44px'}}/>}
```
[返回目录](#component)













## Context
[全局配置](https://unpkg.com/seedsui-react/src/lib/Context/Context.js)
### 属性
```javascript
<Context
  locale={国际化配置文件 object, 默认无} // 此属性会覆盖language国际化文件中的字段
  portal={弹框传送dom object, 默认无}
  children={子元素 node, 默认无}
/>
```
[locale格式](https://unpkg.com/seedsui-react/src/lib/locale/zh_CN.js)

### 函数组件引用国际化
```javascript
import React, {useContext} from 'react';
import Context from 'seedsui-react/lib/Context/instance.js';

// 将国际化引用放到主体第一行
let {locale} = useContext(Context);
if (!locale) locale = function (key) {return key || ''}

// 使用国际化
{locale('filter') || '筛选'}
```

### Class组件引用国际化
```javascript
import Context from 'seedsui-react/lib/Context/instance.js';
// 赋值国际化到context对象中
static contextType = Context;

// 使用国际化
let {locale} = this.context;
if (!locale) locale = function (key) {return key || ''}
{locale('filter') || '筛选'}
```

### Js引用国际化
> Js引用方法也可以用在Class组件和函数组件中
```javascript
import locale from 'utils/locale';

// 使用国际化
locale('filter') || '筛选';

```

### 使用变量
```javascript
// 国际化中的json: {'radius_of_m': '半径{0}米'}
locale('radius_of_m', [1000]); // => 半径1000米
```

### 示例
```javascript
import InputDate from 'seedsui-react/lib/InputDate'
import zhCN from 'seedsui-react/lib/locale/zh_CN'
import enUS from 'seedsui-react/lib/locale/en_US'
import Context from 'seedsui-react/lib/Context'

const [locale, setLocale] = useState(zhCN)

function handleZh () {
  setLocale(zhCN)
  setLanguage('zh_CN')
}
function handleEn () {
  setLocale(enUS)
  setLanguage('en_US')
}

<input type="button" value="英文" onClick={handleEn}/>
<input type="button" value="中文" onClick={handleZh}/>
<Context
  portal={document.getElementById('demo')}
  language={language}
  locale={locale}
>
  <InputDate type="datetime"/>
</Context>

```
[返回目录](#component)












## Counter
[计数器](https://unpkg.com/seedsui-react/src/lib/Counter/Counter.js)
### 属性
```javascript
<Counter
  duration={动画时长 number, 默认5000}
  from={开始数字 number, 默认0}
  to={结束数字 number, 默认10}
  suffix={数字不变的后缀 string, 默认无} // 如设置为/10, 则显示为0/10
  autoPlay={是否自动播放 bool, 默认true}
  {...others}
/>
```
### ref方法
```javascript
play() // 播放
```
### 示例: 手动触发播放
```javascript
import Counter from 'seedsui-react/lib/Counter';

const refCounter = useRef(null);

function playCounter () {
  refCounter.current.instance.current.play()
}

<Counter to={500} autoPlay={false} ref={refCounter}/>
```
### 示例: 自动播放
```javascript
import Counter from 'seedsui-react/lib/Counter';

<Counter from={20} to={500}/>
```
[返回目录](#component)














## DatePopover
[日期快捷选择弹窗](https://unpkg.com/seedsui-react/src/lib/DatePopover/DatePopover.js)
### 属性
```javascript
<DatePopover
  // 显隐
  show={是否显示弹窗 bool, 默认false}
  // 位置
  top={头边距 number, 默认88}
  left={左边距 number, 默认10}

  startDate={开始日期 string, 默认无, 格式: YYYY-MM-DD}
  endDate={结束日期, 默认无, 格式: YYYY-MM-DD}

  ranges={范围 object, 默认
    {
      [locale('今天')]: [new Date().format('YYYY-MM-DD'), new Date().format('YYYY-MM-DD')],
      [locale('昨天')]: [
        new Date().prevDate().format('YYYY-MM-DD'),
        new Date().prevDate().format('YYYY-MM-DD')
      ],
      [locale('本月')]: [
        new Date().firstMonthDate().format('YYYY-MM-DD'),
        new Date().format('YYYY-MM-DD')
      ],
      [locale('上月')]: [
        new Date().prevMonth().firstMonthDate().format('YYYY-MM-DD'),
        new Date().prevMonth().lastMonthDate().format('YYYY-MM-DD')
      ],
      [locale('最近7天')]: [
        new Date().prevDate(7).format('YYYY-MM-DD'),
        new Date().format('YYYY-MM-DD')
      ],
      [locale('最近30天')]: [
        new Date().prevDate(30).format('YYYY-MM-DD'),
        new Date().format('YYYY-MM-DD')
      ],
      [locale('自定义日期')]: 90
    }
  }
  rangeErrMsg={自定义日期, 范围内错误提示 string, 默认无}

  onHide={隐藏事件 func, 默认无}
  onChange={提交回调 func(e, value, data), 默认无}
/>
```
### 示例
```javascript
import DatePopover from 'seedsui-react/lib/DatePopover'
import helper from 'seedsui-react/lib/DatePopover/helper'

// 日期快捷选择弹窗
const [dateDisplay, setDateDisplay] = useState(helper.getDateName('2020-01-01', '2020-01-08'))
const [startDate, setStartDate] = useState('2020-01-01')
const [endDate, setEndDate] = useState('2020-01-08')
const [datePopoverShow, setDatePopoverShow] = useState(false)
function handleDateChange(e, value, date) {
  console.log(e, value, date)
  setStartDate(date.startDate)
  setEndDate(date.endDate)
  setDateDisplay(value)
}



<div className="example-title">日期快捷选择弹窗</div>
<Button
  className="lg"
  style={{ margin: '0 12px' }}
  onClick={() => setDatePopoverShow(true)}
>
  {dateDisplay}
</Button>
<DatePopover
  startDate={startDate}
  endDate={endDate}
  onChange={handleDateChange}
  show={datePopoverShow}
  onHide={() => setDatePopoverShow(false)}
  top={50}
/>
```
[返回目录](#component)












## DateType
[日期类型选择](https://unpkg.com/seedsui-react/src/lib/DateType/DateType.js)
### 属性
```javascript
<DateType
  list={类型集合 array, 默认
    [
      {
        type: 'date',
        id: 'date',
        name: locale('日')
      },
      {
        type: 'month',
        id: 'month',
        name: locale('月')
      },
      {
        type: 'quarter',
        id: 'quarter',
        name: locale('季')
      },
      {
        type: 'year',
        id: 'year',
        name: locale('年')
      }
    ]
  }
  listVisible={列表是否显示}
  activeIndex={选中项 number, 默认0}
  value={值 string, 默认无}
  onChange={点击选项或者修改值 func(e, value, selected, index), 默认无}
/>
```
### 示例
```javascript
// 日期类型选择
const [dateTypeValue, setDateTypeValue] = useState('')
const [dateTypeIndex, setDateTypeIndex] = useState(0)
function handleDateType(e, value, selected, index) {
  setDateTypeValue(value)
  setDateTypeIndex(index)
}


<DateType
  listVisible={false}
  list={[{ type: 'month', id: 'month', name: '月' }]}
  value={dateTypeValue}
  activeIndex={dateTypeIndex}
  onChange={handleDateType}
/>
```
[返回目录](#component)












































## Dialog
[弹出框](https://unpkg.com/seedsui-react/src/lib/Dialog/Dialog.js)
### 属性
```javascript
<Dialog
  portal={传送dom object, 默认document.getElementById('root')}
  show={*显隐 bool, 默认false}

  animation={动画 string, 默认'fade'}  // slideLeft | slideRight | slideUp | slideDown | zoom | fade
  duration={动画时长 number, 默认无}

  maskAttribute={遮罩属性 object, 默认无} // className: mask dialog-mask
  
  children={内容 node, 默认无}
  {...others}
>
</Dialog>
```
### 示例
```javascript
import Dialog from 'seedsui-react/lib/Dialog';
state = {
  show: false
}
onClick = () => {
  this.setState((prevState) => {
    return {
      show: !prevState.show
    }
  })
}
<Dialog
  portal={document.body}
  show={this.state.show}
  animation="zoom"
  style={{width: '80%', height: '80%', backgroundColor: 'white', borderRadius: '10px', WebkitTransitionDuration: '200ms'}}
  className="transition-duration-0"
  maskAttribute={{onClick: this.onClick, className: 'transition-duration-0', style: {WebkitTransitionDuration: '200ms'}}}
>
  弹出框内容
</Dialog>
<input type="button" value="显隐" onClick={this.onClick}/>
```
[返回目录](#component)




## Dot
[小圆点](https://unpkg.com/seedsui-react/src/lib/Dot/Dot.js)
### 属性
```javascript
<Dot
  {...others}
/>
```
### 示例
```javascript
import Dot from 'seedsui-react/lib/Dot';

<Dot className="size8"/>
```
[返回目录](#component)




## Dragrefresh
[下拉刷新](https://unpkg.com/seedsui-react/src/lib/Dragrefresh/Dragrefresh.js)
### 说明
此组件已废弃,此属性于react16.3发布新的context后已废弃, 建议使用[ContainerPull](#containerpull)代替
### 属性
```javascript
<Dragrefresh
  style={容器style object, 默认无}
  className={容器className string, 默认无, 基础'dot'}

  threshold={头部下拉的触发位置 number, 默认50}
  end={头部下拉的结束位置 number, 默认200}
  endRefresh={滑动到底后刷新 bool, 默认false}
  moveTimeout={滑动超时,解决ios手指滑动到原生tabbar上,不触发onTouchEnd number, 默认0}
  onTopRefresh={头部刷新 func(s)}
  onTopComplete={头部刷新完成 func(s)}
  onBottomRefresh={底部刷新 func(s)}
  onBottomComplete={底部刷新完成 func(s)}

  hasMore={状态标识 number, 默认-2} // 1刷新完成 | 0没有更多数据 | -1网络错误 | 404找不到数据 | -2空闲但展现底部转圈

  showNotice={是否允许暂无数据 bool, 默认false}
  noticeProps={无数据时的Notice组件属性 object, 默认无}

  lazyLoad={是否启用懒人加载 bool, 默认false} // 每当didUpdate时会执行lazyLoadInstance.load();

  onScroll={滚动事件 func(e)}

  bottomLoadingCaption={底部加载中 string, 默认'正在加载...'}
  bottomNoDataCaption={底部加载完成 string, 默认'没有更多数据了'}
  bottomErrorCaption={底部加载错误 string, 默认'加载失败, 请稍后再试'}
  onClickBottomError={点击底部加载错误区域 func, 默认无}
>
内容
</Dragrefresh>
```
### 示例
```javascript
import Dragrefresh from 'seedsui-react/lib/Dragrefresh';

this.state = {
  hasMore: -2, // hasMore: 0.无更多数据 1.数据加载完成 404.一条数据都没有, -1. 加载错误, -2. 重置状态,为了后面可以更新DOM
  list: []
}
componentDidMount () {
  this.loadData();
}

// 下拉刷新配置
onTopRefresh = () => {
  console.log('头部刷新');
  this.loadData(false);
}
onBottomRefresh = () => {
  console.log('底部刷新');
  this.loadData(true);
}
loadData = () => {
  let list = this.state.list;
  let hasMore = -2; // hasMore: 0.无更多数据 1.数据加载完成 404.一条数据都没有, -1. 加载错误, -2. 重置状态,为了后面可以更新DOM
  this.setState({
    hasMore: -2 // 先重置状态, 后面再会触发react更新
  });
  setTimeout(() => {
    let serList = [];
    for (let i = 1; i <= 20; i++) {
      serList.push(i);
    }
    // 拼接数据
    list = list.concat(serList);
    hasMore = 1;
    // 如果数据大于100, 则完成加载
    if (list.length >= 100) {
      hasMore = 0;
    }
    // 更新DOM
    this.setState({
      list,
      hasMore
    });
  }, 1000);
}

<Dragrefresh
  moveTimeout={1000}
  endRefresh
  ref={(el) => {this.$elDrag = el;}}
  hasMore={this.state.hasMore}
  onTopRefresh={this.onTopRefresh}
  onBottomRefresh={this.onBottomRefresh}
  bottomErrorCaption="加载失败, 点击重新加载"
  onClickBottomError={this.onBottomRefresh}
  noticeProps={{onClick: this.onTopRefresh, caption: '暂无数据, 点击重新加载'}}
>
  {this.state.list.map((item, index) => {
    return <div className="flex flex-middle" style={{height: '44px'}} key={index}>{item}</div>
  })}
</Dragrefresh>
```
[返回目录](#component)














## Dropdown
[下拉菜单](https://unpkg.com/seedsui-react/src/lib/Dropdown/Dropdown.js)
### 属性
```javascript
<Dropdown
  top={头部距离 number, 默认0}
  portal={加载框传送至dom object, 默认无} // 不设置protal, 则不传送
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
import Dropdown from 'seedsui-react/lib/Dropdown';

const [root, setRoot] = useState([
  {
    "id": "",
    "name": "分类",
  },
  {
    "id": "",
    "name": "品牌",
  },
  {
    "id": "",
    "name": "筛选",
  }
]);
const [items, setItems] = useState([{
    "id": "",
    "name": "分类",
    "data": [{
      "id": "",
      "name": "全部",
      "children": []
    }, {
      "id": "7938034417512813758",
      "name": "饮料",
      "children": [{
        "id": "4622400720177680517",
        "name": "碳酸饮料"
      }, {
        "id": "5800049423243362222",
        "name": "茶饮料"
      }, {
        "id": "5789432343240798823",
        "name": "功能饮料"
      }, {
        "id": "6413548566139705252",
        "name": "饮用水"
      }, {
        "id": "6936207795217715766",
        "name": "中草药饮料"
      }, {
        "id": "8746408135758103957",
        "name": "蛋白质饮料"
      }, {
        "id": "7268945622944992066",
        "name": "果味饮料"
      }, {
        "id": "9138462844675316911",
        "name": "咖啡"
      }]
    }, {
      "id": "7746459719734369628",
      "name": "零食",
      "children": [{
        "id": "9134066222295231258",
        "name": "蜜饯果干"
      }, {
        "id": "5394487194098598325",
        "name": "坚果炒货"
      }, {
        "id": "9070533848545878912",
        "name": "早餐面包"
      }, {
        "id": "5240328190253910837",
        "name": "糖巧果冻"
      }]
    }]
  }, {
    "id": "",
    "name": "品牌",
    "data": [{
      "id": "",
      "name": "全部"
    }, {
      "id": "其他",
      "name": "其他"
    }, {
      "id": "美汁源",
      "name": "美汁源"
    }, {
      "id": "可口",
      "name": "可口"
    }, {
      "id": "宏宝莱",
      "name": "宏宝莱"
    }, {
      "id": "康师傅",
      "name": "康师傅"
    }, {
      "id": "百事",
      "name": "百事"
    }, {
      "id": "卫岗",
      "name": "卫岗"
    }, {
      "id": "蒙牛",
      "name": "蒙牛"
    }, {
      "id": "伊利",
      "name": "伊利"
    }, {
      "id": "三只松鼠",
      "name": "三只松鼠"
    }]
  }, {
    "id": "",
    "name": "筛选",
    "data": [{
      "id": "",
      "name": "全部"
    }, {
      "id": "new",
      "name": "新品"
    }, {
      "id": "importance",
      "name": "重点"
    }]
  }]);

function handleChange (e, value, tabs) {
    var newItems = Object.clone(items);
    tabs.forEach((item, index) => {
      newItems[index].id = item.id;
      newItems[index].name = item.name;
    });
    setItems(newItems)
  }

<Header>
  <Dropdown list={items} listRoot={root} onChange={handleChange}/>
</Header>
{/* 只要单个弹窗可如下:
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
  */}
```
[返回目录](#component)




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
import Emoji from 'seedsui-react/lib/Emoji';

const [show, setShow] = useState(false);
const [value, setValue] = useState('');

function onChange (e, value) {
  setValue(value);
}

{show && <Emoji
  autoFocus
  onChange={onChange}
  value={value}
  maskAttribute={{onClick: () => setShow(false)}}
/>}
<input type="button" value="显隐" onClick={() => setShow(true)}/>
```
[返回目录](#component)




## FixTable
[表情弹出输入框](https://unpkg.com/seedsui-react/src/lib/FixTable/FixTable.js)
### 属性
```javascript
<FixTable
  thead={头部dom node, 默认无}
  tbody={身体dom node, 默认无}
  theadFixed={固定头部 bool, 默认true}
  leftFixed={左列固定 array, 默认[]}
  rightFixed={右列固定 array, 默认[]}
  onBottomRefresh={底部刷新 func, 默认无}
  children={底部元素 node, 默认无}
  {...others}
/>
```
### 示例
```javascript
import FixTable from 'seedsui-react/lib/FixTable';

const thead = (<thead>
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
</thead>);

const tbody = (<tbody>
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
    <td><a>action</a></td>
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
    <td><a>action</a></td>
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
    <td><a>action</a></td>
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
    <td><a>action</a></td>
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
    <td><a>action</a></td>
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
    <td><a>action</a></td>
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
    <td><a>action</a></td>
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
    <td><a>action</a></td>
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
    <td><a>action</a></td>
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
    <td><a>action</a></td>
  </tr>
</tbody>);

<FixTable
  style={{height: '300px'}}
  thead={thead}
  tbody={tbody}
  theadFixed={true}
  leftFixed={[1]}
  rightFixed={[0, 1]}
  onBottomRefresh={() => console.log('到底了')}
/>
```
[返回目录](#component)


## Footer
[底部内容](https://unpkg.com/seedsui-react/src/lib/Footer/Footer.js)
, 通常与Page、Header、Container一起使用
### 属性
```javascript
<Footer
  style={容器style object, 默认无}
  className={容器className string, 默认无, 基础'container'}
  {...others}
>
底部内容
</Footer>
```
### 示例
```javascript
import Page from 'seedsui-react/lib/Page';
import Header from 'seedsui-react/lib/Header';
import Footer from 'seedsui-react/lib/Footer';
import Container from 'seedsui-react/lib/Container';

<Page>
  <Header>
    头部
  </Header>
  <Container>
    中部
  </Container>
  <Footer>
    底部
  </Footer>
</Page>
```
[返回目录](#component)







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
import Group from 'seedsui-react/lib/Group';

<Group>
分组
</Group>
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
[返回目录](#component)




## Header
[头部内容](https://unpkg.com/seedsui-react/src/lib/Header/Header.js)
, 通常与Page、Container一起使用
### 属性
```javascript
<Header
  style={容器style object, 默认无}
  className={容器className string, 默认无, 基础'container'}
  {...others}
>
头部内容
</Header>
```
### 示例
```javascript
import Page from 'seedsui-react/lib/Page';
import Header from 'seedsui-react/lib/Header';
import Footer from 'seedsui-react/lib/Footer';
import Container from 'seedsui-react/lib/Container';

<Page>
  <Header>
    头部
  </Header>
  <Container>
    中部
  </Container>
  <Footer>
    底部
  </Footer>
</Page>
```
[返回目录](#component)









## ImgMark(即将废弃,使用Vott组件代替)
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
[返回目录](#component)







## ImgLazy
[懒人加载](https://unpkg.com/seedsui-react/src/lib/ImgLazy/ImgLazy.js)
, 主要为了解决图片过多, 造成网络阻塞的问题, 一般采用的是滚动加载, 并在页面加载完成后, 执行滚动加载方法load()
### 对象实例
```javascript
var imglazy = new ImgLazy({
  overflowContainer: el, // 滚动区域, 滚动加载时需要用到, 默认document.body
  load: 'scroll', // scroll 滚动加载 | queue 队列加载 | all 全部加载
  threshold: 300, // 滚动加载时, 上下扩展px加载
  loadAttr: 'data-load-src', // 加载地址
  errorAttr: 'data-error-src', // 错误地址
  completeAttr: 'data-complete' // 完成加载, data-complete=0代表加载错误, =1代码加载正确
});
```
### 对象方法
```javascript
load(); // 加载图片, load为scroll时加载可见区域, queue时队列加载完所有图片, all时加载所有图片
```
### 示例
```javascript
import ImgLazy from 'seedsui-react/lib/ImgLazy';

// 懒人加载
this.setState({
  lazy: new ImgLazy({
    overflowContainer: this.$elDrag.$el
  })
});

// 在页面加载完成的时候
this.state.lazy.load();
```
[返回目录](#component)











## IndexBar
[索引栏](https://unpkg.com/seedsui-react/src/lib/IndexBar/IndexBar.js)
, IndexBar组件默认fixed定位, 并在父组件中寻找data-indexbar-name属性的元素, 与indexs对应, 滑动或点击切换时, 修改父组件的scrollTop, 以达到滚动的效果
### 属性
```javascript
<IndexBar
  overflowContainer={滚动区域 any, 默认document.body}
  parent={DOM注入容器 any, 默认document.body}
  className={索引栏className string, 默认无, 基础'indexbar'}
  style={索引栏style object, 默认无}
  // indexs与父组件中所有data-indexbar-name元素对应即可
  indexs={索引集合 array, 默认['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'G', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']}
/>
```
### 示例
```javascript
import Container from 'seedsui-react/lib/Container';
import IndexBar from 'seedsui-react/lib/IndexBar';
<Container>
  <ul>
    <li data-indexbar-name="A">A</li>
    <li>阿华</li>
    <li>阿敏</li>
    <li>阿全</li>
    <li>阿达</li>
    <li data-indexbar-name="B">B</li>
    <li>白起</li>
    <li>白旭</li>
    <li>冰冰</li>
    <li data-indexbar-name="C">C</li>
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
    <li data-indexbar-name="D">D</li>
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
    <li data-indexbar-name="F">F</li>
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
  <IndexBar style={{top: '44px'}}/>
</Container>
```
[返回目录](#component)






## IndexArea
[多行文本框](https://unpkg.com/seedsui-react/src/lib/IndexArea/IndexArea.js)
, 默认高度见seedsui-variable.less中@input-area-height, 其它属性用法与[InputText 文本框](#inputtext) 组件一致






## InputCity
[城市选择框](https://unpkg.com/seedsui-react/src/lib/InputCity/InputCity.js)
, 其它属性用法与[InputText 文本框](#inputtext) 组件一致, 基于[PickerCity 城市选择弹框](#pickercity)组件
### 属性
```javascript
<InputCity
  // Input
  onClick={点击文本框 func(e, value), 默认无}
  onChange={值改变 func(e, value, option), 默认无} // 如果设置了pickerProps: {submitAttribute: {onClick: func()}}, onChange则不再生效

  // Picker
  selected={选中项 array, 默认无} // 传入selected时, 选中项则不取value中的值 [{id: '', name: ''}]
  type={城市类型 string, 默认'district'} // 'district' | 'city'
  pickerProps={PickerCity组件弹框属性 object, 默认无} // className: picker

  {...others} // InputText组件
/>
```
### 示例
用法与[InputPicker](#inputpicker)相同

















## InputColor
[颜色选择框](https://unpkg.com/seedsui-react/src/lib/InputColor/InputColor.js)
, 其它属性用法与[InputText 文本框](#inputtext) 组件一致













## InputDate
[日期选择框](https://unpkg.com/seedsui-react/src/lib/InputDate/InputDate.js)
, 其它属性用法与[InputText 文本框](#inputtext) 组件一致, 基于[PickerDate 日期选择弹框](#pickerdate)组件
### 属性
```javascript
<InputDate
  // Input
  min={最小值 func(e, value), 默认无} // YYYY-MM-DD
  max={最大值 func(e, value), 默认无} // YYYY-MM-DD
  onClick={点击文本框 func(e, value), 默认无}
  onChange={值改变 func(e, value, option), 默认无} // 如果设置了pickerProps: {submitAttribute: {onClick: func()}}, onChange则不再生效
  fail={错误 func(e, {msg: '', select: '', min: '', value: ''}), 默认无}

  // Picker
  selected={选中项 array, 默认无} // 传入selected时, 选中项则不取value中的值 [{id: '', name: ''}]
  type={城市类型 string, 默认'district'} // 'date | month | time | datetime'
  pickerProps={PickerDate组件弹框属性 object, 默认无} // className: picker
  {...others} // InputText组件
/>
```
### 示例
用法与[InputPicker](#inputpicker)相同














## InputDistrict
[区域选择框](https://unpkg.com/seedsui-react/src/lib/InputDistrict/InputDistrict.js)
, 其它属性用法与[InputText 文本框](#inputtext) 组件一致, 基于[PickerDistrict 区域选择弹框](#pickerdistrict)组件
### 属性
```javascript
<InputDistrict
  // Input
  onClick={点击文本框 func(e, value), 默认无}
  onChange={值改变 func(e, value, option), 默认无} // 如果设置了pickerProps: {submitAttribute: {onClick: func()}}, onChange则不再生效

  // Picker
  selected={选中项 array, 默认无} // 传入selected时, 选中项则不取value中的值 [{id: '', name: '', parentid: ''}]
  type={城市类型 string, 默认''} // country | province | city | district | street (其中province、city、district、street,只有中国时才生效, 因为只有中国有省市区)
  pickerProps={PickerCity组件弹框属性 object, 默认无} // className: picker

  {...others} // InputText组件
/>
```
### 省市区街道示例
```javascript
import InputDistrict from 'seedsui-react/lib/InputDistrict';

// 获取街道
function getStreet (districtId) {
  return new Promise((resolve) => {
    Bridge.showLoading();
    setTimeout(() => {
      Bridge.hideLoading();
      resolve([
        {
          "parentid": districtId,
          "name": "街道1",
          "id": "1",
        },
        {
          "parentid": districtId,
          "name": "街道2",
          "id": "2",
        }
      ])
    }, 500);
  })
}

const [value, setValue] = useState('');

function onChange (e, value, selected) {
  console.log(e.target)
  console.log(value, selected)
  setValue(value);
}

<InputDistrict
  value={value}
  onChange={onChange}
  placeholder="请选择"
  className="border-b"
  pickerProps={{
    getStreets: getStreet
  }}
/>
```

### 国家地区选择示例
```javascript
import InputDistrict from 'seedsui-react/lib/InputDistrict';
import country from 'seedsui-react/lib/PickerDistrict/country.js';

const [value, setValue] = useState('');
const [selected, setSelected] = useState([
  {id: '86', name: '中国'} // 设置一个选中国家, 默认显示此国家下的省份, 否则将需要先选择国家
]);
// 获取省市区
function getData (id) {
  console.log('获取省市区')
  return new Promise((resolve) => {
    resolve([
      {
        "parentid": id,
        "name": "城市1",
        "id": "1",
      },
      {
        "parentid": id,
        "name": "城市2",
        "id": "2",
      }
    ])
  })
}
// 获取街道
function getStreet (districtId) {
  console.log('获取街道')
  return new Promise((resolve) => {
    resolve([
      {
        "parentid": districtId,
        "name": "街道1",
        "id": "11",
      },
      {
        "parentid": districtId,
        "name": "街道2",
        "id": "22",
      }
    ])
  })
}

// 修改地址
function onChange (e, value, selectedMap) {
  console.log(e.target)
  console.log(value, selectedMap)
  setValue(value);
  setSelected(selectedMap);
}

<InputDistrict
  value={value}
  onChange={onChange}
  placeholder="请选择"
  className="border-b"
  pickerProps={{
    countries: country,
    getStreets: getStreet,
    getData: getData,
    selected: selected
  }}
/>
```
[返回目录](#component)










## InputLocation
[定位框](https://unpkg.com/seedsui-react/src/lib/InputLocation/InputLocation.js)
, 其它属性用法与[InputText 文本框](#inputtext) 组件一致
### 属性
```javascript
<InputLocation
  cacheTime={经纬度缓存时效毫秒数 number, 默认10000}
  timeout={定位超时毫秒数 number, 默认无}
  ak={地图ak,地图预览和选择地点时需要传入, 如果地图已经加载, 则不需要传入ak}
  value={选中地址经纬度信息 string, 默认无, 出入参一致} // 用于只读时, 点击预览地图{latitude: '纬度', longitude: '经度', address:'地址', value: ''}
  loadingValue={定位中显示文字 string, 默认'定位中...', 基础className'input-text'}
  failedValue={定位错误显示文字 string, 默认'定位失败, 请检查定位权限是否开启', 基础className'input-text'}
  readOnly={文本是否只读 bool, 默认无} // 无: 点击整行定位; false: 允许手动修改位置信息; true: 只读,点击无效;
  type={定位方式 string, 默认'location'} // location: 点击定位当前位置, choose: 点击选择地点
  autoLocation={自动定位 bool, 默认无}
  onClick={点击 func(e, value), 默认无}
  onChange={值改变 func(e, value), 默认无}
  preview={是否预览 bool|func(e, value 或者 {errMsg: 'preview:fail'}), 默认true, 是否支持单击预览, readOnly为true时才生效}
  onPreviewHide={关闭预览回调 func(), 默认无}
  routePath={显隐路由路径 string, 默认'componentPage=1'}
  {...others}
/>
```
### 示例
```javascript
import InputLocation from 'seedsui-react/lib/InputLocation';

const [value, setValue] = useState('')
function handleChange (e, value) {
	console.log(value)
	setValue(value)
}
function handlePreview (e, err) {
  if (typeof err === 'object' && err.errMsg.indexOf('preview:fail') !== -1) {
    Bridge.showToast(err.errMsg.replace('preview:fail', ''), {mask: false})
  }
}
function handleHide (type) {
	console.log('关闭' + type)
}

<InputLocation
  clearReadOnly
  autoLocation
  pre
  value={value}
  placeholder="请点击获取位置信息"
  onChange={handleChange}
  onPreviewHide={handleHide}
  preview={handlePreview}
/>
```









## InputNumber
[数字输入框](https://unpkg.com/seedsui-react/src/lib/InputNumber/InputNumber.js)
, 其它属性用法与[InputText 文本框](#inputtext) 组件一致

## InputPassword
[密码输入框](https://unpkg.com/seedsui-react/src/lib/InputPassword/InputPassword.js)
, 其它属性用法与[InputText 文本框](#inputtext) 组件一致

## InputPhone
[手机输入框](https://unpkg.com/seedsui-react/src/lib/InputPhone/InputPhone.js)
, 其它属性用法与[InputText 文本框](#inputtext) 组件一致


## InputPicker
[选择框](https://unpkg.com/seedsui-react/src/lib/InputPicker/InputPicker.js)
, 其它属性用法与[InputText 文本框](#inputtext) 组件一致, 基于[Picker 滚动选择弹框](#picker)组件
### 属性
```javascript
<InputPicker
  // Input
  onClick={点击文本框 func(e, value), 默认无}
  onChange={值改变 func(e, value, option), 默认无} // 如果设置了pickerProps: {submitAttribute: {onClick: func()}}, onChange则不再生效

  // Picker
  list={选择列表 array, 默认无} // [{id: '', name: ''}]
  selected={选中项 array, 默认无} // 传入selected时, 选中项则不取value中的值 [{id: '', name: ''}]
  pickerProps={Picker组件弹框属性 object, 默认无} // className: picker

  {...others} // InputText组件
/>
```
### 示例
```javascript
import InputPicker from 'seedsui-react/lib/InputPicker';

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
];

const [value, setValue] = useState('');

function onChange (e, value, selected) {
  console.log(e.target)
  console.log(value, selected)
  setValue(value);
}

<InputPicker
  list={list}
  value={value}
  onChange={onChange}
  placeholder="请选择"
  className="border-b"
/>
```
[返回目录](#component)










## InputPre
[自增高输入框](https://unpkg.com/seedsui-react/src/lib/InputPre/InputPre.js)
, 其它属性用法与[InputText 文本框](#inputtext) 组件一致


## InputRange
范围选择框
### 属性
```javascript
<InputRange
  style={容器style object, 默认无}
  className={容器className string, 默认无}
  value={值 string | number, 默认'0'}
  min={最小值 string | number, 默认'0'}
  max={最小值 string | number, 默认'100'}
  step={步进值 string | number, 默认'1'}
  disabled={是否禁用 bool, 默认false}
  onChange={值改变 func(e, value), 默认无}
/>
```
### 示例
```javascript
import InputRange from 'seedsui-react/lib/InputRange';

onChangeRange = (e, value) => {
  console.log(e, value);
}

<InputRange onChange={this.onChangeRange}/>
```
[返回目录](#component)




## InputSafe
[安全强度检验框](https://unpkg.com/seedsui-react/src/lib/InputSafe/InputSafe.js)
, 展现三个状态: 弱、中、强
### 属性
```javascript
<InputSafe
  style={容器style object, 默认无}
  className={容器className string, 默认无}
  value={值 string | number, 默认''}
/>
```
### 示例
```javascript
import InputSafe from 'seedsui-react/lib/InputSafe';

<InputSafe value="Zk001"/>
```


## InputSelect
[选择框](https://unpkg.com/seedsui-react/src/lib/InputSelect/InputSelect.js)
, 其它属性用法与[InputText 文本框](#inputtext) 组件一致, 基于[PickerSelect 选择弹框](#pickerselect)组件
### 属性
```javascript
<InputSelect
  checkbox={checkbox模式渲染 bool, 默认无}
  checkboxGroupAttribute={checkbox模式div属性 object, 默认无}

  // Input
  onClick={点击文本框 func(e, value), 默认无}
  onChange={值改变 func(e, value, options), 默认无} // 如果设置了pickerProps: {submitAttribute: {onClick: func()}}, onChange则不再生效

  // Picker
  multiple={是否允许多选 bool, 默认false}
  list={选择列表 array, 默认无} // [{id: '', name: ''}]
  selected={选中项 array, 默认无} // 传入selected时, 选中项则不取value中的值 [{id: '', name: ''}]
  pickerProps={PickerSelect组件弹框属性 object, 默认无} // className: picker

  {...others} // InputText组件
/>
```
### 示例
用法与[InputPicker](#inputpicker)相同
[返回目录](#component)





## InputStar
[评分框](https://unpkg.com/seedsui-react/src/lib/InputStar/InputStar.js)
### 属性
```javascript
<InputStar
  min={最小值 number, 默认0}
  max={最大值 number, 默认5}
  value={值 number, 默认0}
  onChange={值改变 func(value), 默认无}
  fail={超出限制错误 func(e, {msg: '错误信息', select: '当前选中', min: '最小值', value: '矫正后的值'}), 默认无}
  {...others} // 容器属性
/>
```
### 示例
```javascript
import InputStar from '../lib/InputStar';

const [value, setValue] = useState(0);

function onChange (e, value) {
  setValue(value);
}
function onError (e, error) {
  console.log(error)
}

<InputStar
  min={3}
  value={value}
  onChange={onChange}
  onError={onError}
/>
```
[返回目录](#component)




## InputText
[文本框](https://unpkg.com/seedsui-react/src/lib/InputText/InputText.js)
, 很多组件继承自此组件, 拥有此组件的属性, 如: InputPhone、InputPre、InputArea等
### 属性
```javascript
<InputText
  type={类型 string, 默认'text'} // 与w3c的type一致: text | number | tel | password
  pre={是否启用自动扩充功能 bool, 默认无}
  readOnly={是否只读 bool, 默认无}
  disabled={是否禁用 bool, 默认无}
  
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

  // 左右图标
  licon={左图标 node, 默认无}
  liconAttribute={左图标属性 object, 默认无}
  ricon={右图标 node, 默认无}
  riconAttribute={右图标属性 object, 默认无}

  // 清除按钮
  clear={清除 bool | func(e, ''), 默认无}
  clearAttribute={清除图标属性 object, 默认无}

  // events
  onClick={点击容器 func(e), 默认无}
  onChange={值发生变化 func(e, value), 默认无}
  onBlur={失去焦点 func(e, value), 默认无}
  onFocus={获取焦点 func(e, value), 默认无}
  onCompositionStart={输入开始时 func(e, value), 默认无}
  onCompositionUpdate={输入进行中 func(e, value), 默认无}
  onCompositionEnd={输入完成时 func(e, value), 默认无}
  onInput={输入时 func(e, value), 默认无}

  // 右侧内容
  rcaption={右侧内容 node, 默认无}

  // 子内容
  children={子元素 node, 默认无}
  {...others}
/>
```
### 示例
```javascript
import InputText from 'seedsui-react/lib/InputText';

this.state = {
  value: '1'
}

onChange = (e, value) => {
  console.log(value)
  this.setState({
    value
  })
}

<InputText clear value={this.state.value} onChange={this.onChange}/>
```









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
import Legend from 'seedsui-react/lib/Legend';

<Legend>标题</Legend>
```
[返回目录](#component)









## Jcrop
[标题](https://unpkg.com/seedsui-react/src/lib/Jcrop/Jcrop.js)

> package.json需要安装Jcrop库

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
[返回目录](#component)







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
import ListPull from 'seedsui-react/lib/ListPull';

const listpull = [
  {
    container: <p style={{height: '50px'}}>内容1</p>,
    lButtons: [
      {caption: '未读', className: 'info', style: {padding: '0 12px'}}
    ],
    rButtons: [
      {caption: '收藏', className: 'warn', style: {padding: '0 12px'}},
      {caption: '删除', className: 'cancel', style: {padding: '0 12px'}}
    ],
  },
  {
    container: <p style={{height: '50px'}}>内容2</p>,
    lButtons: [
      {caption: '未读', className: 'info', style: {padding: '0 12px'}}
    ],
    rButtons: [
      {caption: '收藏', className: 'warn', style: {padding: '0 12px'}},
      {caption: '删除', className: 'cancel', style: {padding: '0 12px'}}
    ],
  },
  {
    container: <p style={{height: '50px'}}>内容3</p>,
    lButtons: [
      {caption: '未读', className: 'info', style: {padding: '0 12px'}}
    ],
    rButtons: [
      {caption: '收藏', className: 'warn', style: {padding: '0 12px'}},
      {caption: '删除', className: 'cancel', style: {padding: '0 12px'}}
    ],
  },
  {
    container: <p style={{height: '50px'}}>内容4</p>,
    lButtons: [
      {caption: '未读', className: 'info', style: {padding: '0 12px'}}
    ],
    rButtons: [
      {caption: '收藏', className: 'warn', style: {padding: '0 12px'}},
      {caption: '删除', className: 'cancel', style: {padding: '0 12px'}}
    ],
  }
]

const [list, setList] = useState(listpull);
  function onShowedLeft (s) {
    var target = s.target.previousElementSibling.children[0];
    if (target.innerHTML === '未读') {
      target.classList.add('disabled');
      target.innerHTML = '已读';
    } else {
      target.classList.remove('disabled');
      target.innerHTML = '未读';
    }
    s.hide();
  }
  
  function onClickListPull (s, item, index, option) {
    let newList = Object.clone(list)
    newList.splice(index, 1)
    console.log(newList)
    setList(newList)
    s.hide()
  }

<ListPull list={list} onClick={onClickListPull} onShowedLeft={onShowedLeft}/>
```
[返回目录](#component)







## Loading
[加载中](https://unpkg.com/seedsui-react/src/lib/Loading/Loading.js)
### 属性
```javascript
<Loading
  portal={加载框传送至dom object, 默认无} // 不设置protal, 则不传送
  type={加载框类型 string, 默认'floating'} // 'floating | filling | custom'

  maskAttribute={遮罩属性 object, 默认无}
  iconAttribute={加载图标属性 object, 默认无}
  captionAttribute={标题属性 object, 默认无}
  caption={标题内容 node, 默认'正在加载...'}

  children={子元素 node, 默认无}
/>
```
### 示例
```javascript
import Loading from 'seedsui-react/lib/Loading';

<Loading
  maskAttribute={{
    style: {
      top: '44px'
    }
  }}
/>
```
[返回目录](#component)
















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
import LotteryWheel from 'seedsui-react/lib/LotteryWheel';
import Device from '../lib/Device';


this.state = {
  data: [
    {bgFillStyle: '#ffcd76', text: '大奖', icon: '//res.waiqin365.com/d/dinghuo365/lotterywheel/gift.png'},
    {text: '100积分', icon: '//res.waiqin365.com/d/dinghuo365/lotterywheel/gold.png'},
    {bgFillStyle: '#ffcd76', text: '200积分', icon: '//res.waiqin365.com/d/dinghuo365/lotterywheel/gold.png'},
    {text: '300积分', icon: '//res.waiqin365.com/d/dinghuo365/lotterywheel/gold.png'},
    {bgFillStyle: '#ffcd76', text: '400积分', icon: '//res.waiqin365.com/d/dinghuo365/lotterywheel/gold.png'},
    {text: '500积分', icon: '//res.waiqin365.com/d/dinghuo365/lotterywheel/gold.png'},
    {bgFillStyle: '#ffcd76', text: '600积分', icon: '//res.waiqin365.com/d/dinghuo365/lotterywheel/gold.png'},
    {text: '700积分', icon: '//res.waiqin365.com/d/dinghuo365/lotterywheel/gold.png'}
  ]
}

playing = false
play = () => {
  if (this.playing) {
    console.log('playing...');
    return;
  }
  this.playing = true
  this.$lotterywheel.instance.reset();
  setTimeout(() => {
    this.$lotterywheel.instance.play(2, () => {
      console.log('转动完成')
    });
  }, 10);
  setTimeout(() => {
    this.playing = false
    this.setState({
      data: [
        {bgFillStyle: '#ffcd76', text: '200积分', icon: '//res.waiqin365.com/d/dinghuo365/lotterywheel/gold.png'},
        {text: '300积分', icon: '//res.waiqin365.com/d/dinghuo365/lotterywheel/gold.png'},
        {bgFillStyle: '#ffcd76', text: '大奖', icon: '//res.waiqin365.com/d/dinghuo365/lotterywheel/gift.png'},
        {text: '100积分', icon: '//res.waiqin365.com/d/dinghuo365/lotterywheel/gold.png'},
        {bgFillStyle: '#ffcd76', text: '400积分', icon: '//res.waiqin365.com/d/dinghuo365/lotterywheel/gold.png'},
        {text: '500积分', icon: '//res.waiqin365.com/d/dinghuo365/lotterywheel/gold.png'},
        {bgFillStyle: '#ffcd76', text: '600积分', icon: '//res.waiqin365.com/d/dinghuo365/lotterywheel/gold.png'},
        {text: '700积分', icon: '//res.waiqin365.com/d/dinghuo365/lotterywheel/gold.png'}
      ]
    })
  }, 5000);
}

const containerWidth = Device.screenWidth - 40;
const wrapperWidth = containerWidth * 0.85;

<div className="lotterywheel-container" style={{width: containerWidth + 'px', height: containerWidth + 'px', overflow: 'hidden'}}>
  <LotteryWheel
    ref={(el) => {this.$lotterywheel = el;}}
    width={wrapperWidth}
    height={wrapperWidth}
    iconWidth={containerWidth * 0.1}
    iconHeight={containerWidth * 0.1}
    data={this.state.data}
  />
  <img className="lotterywheel-border" src={'//res.waiqin365.com/d/dinghuo365/lotterywheel/border.png'} alt=""/>
  <img className="lotterywheel-pointer" src={'//res.waiqin365.com/d/dinghuo365/lotterywheel/pointer.png'} alt="" onClick={this.play}/>
</div>
```
[返回目录](#component)

















## MapChoose
[地图预览](https://unpkg.com/seedsui-react/src/lib/MapChoose/MapChoose.js)
### 属性
```javascript
<MapChoose
  ak={*百度地图key string, 默认无}
  show={*显隐 bool, 默认true} // 百度地图不能移除DOM, 再渲染
  portal={传送dom object, 默认document.getElementById('root')}
  caption={原生头部标题 string, 默认'暂无数据'}
  prevCaption={上一页原生头部标题 string, 默认'暂无数据'}
  onHide={点击隐藏按钮 func, 默认无}
  onChange={提交回调 func(e, value, data), 默认无}
  // 其它属性
  center={定位地址 string, 默认'江苏省,南京市'}
  // 以下形状或者标记一次只能绘制一个
  // 标记点
  address={初始化标记地址 string, 默认无} // 传入地址是为了初始化point时, 不用地址逆解析
  point={初始化标记点 array, 默认无} // [118.798128, 31.968592] => 南京南站, 老山
  // 子元素
  header={header容器内子元素 node, 默认无}
  children={子元素 node, 默认无}
/>
```
### 示例
```javascript
import MapChoose from 'seedsui-react/lib/MapChoose';
<MapChoose
  ak='3pTjiH1BXLjASHeBmWUuSF83'
  circle={{point: [118.798128, 31.968592], radius: 1000}}
/>
```
[返回目录](#component)
















## MapView
[地图预览](https://unpkg.com/seedsui-react/src/lib/MapView/MapView.js)
### 属性
```javascript
<MapView
  ak={*百度地图key string, 默认无}
  show={*显隐 bool, 默认true} // 百度地图不能移除DOM, 再渲染
  portal={传送dom object, 默认document.getElementById('root')}
  caption={原生头部标题 string, 默认无}
  prevCaption={上一页原生头部标题 string, 默认无}
  onHide={点击隐藏按钮 func, 默认无}
  // 其它属性
  center={定位地址 string, 默认'江苏省,南京市'}
  // 以下形状或者标记一次只能绘制一个
  // 标记点
  points={标记点 array, 默认无} // [[118.798128, 31.968592], [118.619429,32.113449]] => 南京南站, 老山
  // 圆形
  circle={圆形 object, 默认无} // {point: [118.798128, 31.968592], radius: 1000} => 南京南站
  // 多边形
  polygon={多边形 array, 默认无} // [[118.798128, 31.968592], [118.619429,32.113449], [118.694616,31.97165]]
  // 地区
  district={地区 object, 默认无} // {province: {id: "320000", name: "江苏"}, city: {id: "320100", name: "南京市"}, district: {id: "320105", name: "建邺区"}}
  // 子元素
  header={header容器内子元素 node, 默认无}
  children={子元素 node, 默认无}
/>
```
### 示例
```javascript
import MapView from 'seedsui-react/lib/MapView';
const [selected, setSelected] = useState(null);
const [mapData, setMapData] = useState(null);
function handleChange (e, value, selected) {
  setSelected(selected);
  setMapData({
    point: [selected.longitude, selected.latitude],
    address: selected.address,
    show: true
  });
}

{mapData && <MapView
  ak="百度地图key"
  show={mapShow}
  header={mapData.address ? <div className="mapview-bar border-b">{mapData.address}</div> : null}
  points={[mapData.point]}
  portal={context.portal || document.getElementById('root') || document.body}
  onHide={() => setMapShow(false)}
/>}
<InputLocation readOnly={true} value={selected.address} selected={selected} onChange={handleChange}/>
```

```javascript
import MapView from 'seedsui-react/lib/MapView';
<MapView
  ak='3pTjiH1BXLjASHeBmWUuSF83'
  circle={{point: [118.798128, 31.968592], radius: 1000}}
/>
```
[返回目录](#component)
















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
import Mark from 'seedsui-react/lib/Mark';

<Mark className="success">进行中</Mark>
```
[返回目录](#component)



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
import Marquee from 'seedsui-react/lib/Marquee';
const list = [
  {
    id: '1',
    name: '标题标题1'
  },
  {
    id: '2',
    name: '标题标题2'
  }
];
function handleClick (...params) {
  console.log(...params)
}
<Marquee
  list={list}
  onClick={handleClick}
  autoPlay={5000}
  step={48}
  optionAttribute={{
    style: {height: '38px', padding: '5px 0'},
    className: 'flex flex-center nowrap2'
  }}
/>
```
[返回目录](#component)








## MenuTiled
[平铺弹出菜单](https://unpkg.com/seedsui-react/src/lib/MenuTiled/MenuTiled.js)
, [MenuTiled下拉菜单](#menutiled)组件的子组件
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
import MenuTiled from 'seedsui-react/lib/MenuTiled';
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
  {id: '1', name: '测试数据1', parentid: '-1'},
  {id: 'a', name: '测试数据1-a', parentid: '1'},
  {id: 'b', name: '测试数据1-b', parentid: '1'},
  {id: 'I', name: '测试数据1-b-I', parentid: 'b'},
  {id: 'II', name: '测试数据1-b-II', parentid: 'b'}
];

const [selected, setSelected] = useState([{id: 'b', name: '测试数据1-b', parentid: '1'}])

function onClickMenu (e, value, selected, data) {
  console.log(e, value, selected, data);
}

<MenuTiled list={menus} selected={selected} onChange={onClickMenu}/>
```
[返回目录](#component)



## MenuTree
[侧边树形菜单](https://unpkg.com/seedsui-react/src/lib/MenuTree/MenuTree.js)
### 属性
```javascript
<MenuTree
  selected={选中项 array, 默认无} // 选中项: [{id: '', name: ''}]
  list={列表项 array, 默认无} // 数据: [{id: '', name: '', parentid: ''}]

  onChange={点击节点 func(s, value, selected), 默认无}
  onExtendActive={展开选中项时触发 func(s, value, selected), 默认无} // 如若有此属性, 展开选中项时也将移除同级所有的选中项与展开项

  onClick={点击节点 func(s, value, item, isActived, isExtend, childrenCount), 默认无}
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
[返回目录](#component)







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
import Notice from 'seedsui-react/lib/Notice';

<Notice iconClassName="icon-no-network" caption="网络状态不佳" sndcaption="请尝试开关飞行模式后再试"/>
```
[返回目录](#component)







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
  clickButtonFocus={点击加减按钮获取焦点 bool, 默认false}

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
import NumBox from 'seedsui-react/lib/NumBox';

const [value, setValue] = useState('');

function changeNum (e, val) {
  setValue(val);
}

<NumBox
  className="lg"
  digits={2}
  min={0}
  max={4}
  required
  value={value}
  onChange={changeNum}
/>
```
[返回目录](#component)





## OnOff
[开关](https://unpkg.com/seedsui-react/src/lib/OnOff/OnOff.js)
### 属性
```javascript
<OnOff
  readOnly={是否只读 bool, 默认无}
  disabled={是否禁用 bool, 默认无}
  checked={是否选中 bool, 默认无} // 选中时clasName将会增加'active'
  onAttribute={是属性 object, 默认无}
  offAttribute={否属性 object, 默认无} // {caption: '关'}
  onClick={点击容器 func(bool), 默认无}
/>
```
### 示例
```javascript
import OnOff from 'seedsui-react/lib/OnOff';


this.state = {
  checked: false
}

onClick = (e, checked) => {
  this.setState({
    checked: !checked
  })
}

<OnOff caption="全选" checked={this.state.checked} onClick={this.onClick} onAttribute={{caption: '开'}} offAttribute={{caption: '关'}}/>
```
[返回目录](#component)


## Page
[页面](https://unpkg.com/seedsui-react/src/lib/Page/Page.js)
, 通常与Container、Header一起使用
### 属性
```javascript
<Page
  style={容器style object, 默认无}
  className={容器className string, 默认无, 基础'page'}
  animation={动画 string, 默认无}  // slideLeft | slideRight | slideUp | slideDown | zoom | fade
  {...others}
>
页面
</Page>
```
### 示例
```javascript
import Page from 'seedsui-react/lib/Page';
import Header from 'seedsui-react/lib/Header';
import Container from 'seedsui-react/lib/Container';

<Page>
  <Header>
    头部
  </Header>
  <Container>
    中部
  </Container>
</Page>
```
[返回目录](#component)


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
import Page from 'seedsui-react/lib/Page';
import Header from 'seedsui-react/lib/Header';
import Container from 'seedsui-react/lib/Container';

<PagePull lSide={<p>左侧边栏</p>} rSide={<p>右侧边栏</p>}>
  <Header>
    头部
  </Header>
  <Container>
    中部
  </Container>
</PagePull>
```
[返回目录](#component)




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
import Peg from 'seedsui-react/lib/Peg';

<Peg/>
```
[返回目录](#component)








## Photos
[照片控件](https://unpkg.com/seedsui-react/src/lib/Photos/Photos.js)
### 属性
```javascript
<Photos
  {...others}
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
/>
```
### 示例
```javascript
import Photos from 'seedsui-react/lib/Photos';
const list = [{
  id: '1',
  thumb: 'https://image-test.waiqin365.com/6069734652819592543/blog/201912/8194157084989375804.png?x-oss-process=style/zk320',
  src: 'https://image-test.waiqin365.com/6069734652819592543/blog/201912/8194157084989375804.png?x-oss-process=style/zk320'
},{
  id: '2',
  thumb: 'https://img.zcool.cn/community/01a9a65dfad975a8012165189a6476.jpg',
  src: 'https://img.zcool.cn/community/01a9a65dfad975a8012165189a6476.jpg'
}];

function handleClick (...params) {
  console.log('点击')
  console.log(...params)
}
function handleChoose (...params) {
  console.log('选择')
  console.log(...params)
}
function handleDelete (...params) {
  console.log('删除')
  console.log(...params)
}

<Photos
  list={list}
  onChoose={handleChoose}
  onDelete={handleDelete}
  onClick={handleClick}
/>
```
[返回目录](#component)














## Picker
[滚动选择弹框](https://unpkg.com/seedsui-react/src/lib/Picker/Picker.js)
### 属性
```javascript
<Picker
  portal={传送dom object, 默认document.getElementById('root')}
  list={列表 array, 默认无} // 格式 [{id: '', name: ''}]
  show={*显隐 bool, 默认false}
  value={值 string, 默认无}
  selected={选中项 array, 默认无} // 传入selected时, 选中项则不取value中的值 [{id: '', name: ''}]
  maskAttribute={遮罩属性 object, 默认无}
  submitAttribute={确定按钮属性 object, 默认无}
  cancelAttribute={取消按钮属性 object, 默认无}
  slotAttribute={槽按钮属性 object, 默认无} // 现仅支持修改className
  {...others}
/>
```
### 示例
```javascript
import Picker from 'seedsui-react/lib/Picker';

const list = [{
	"id": "7004955043756964827",
	"name": "瓶"
}, {
	"id": "5796844733294559575",
	"name": "箱(=25.0000瓶)"
}];

const [list, setList] = useState(list);
const [show, setShow] = useState(false);
const [selected, setSelected] = useState();

function onClickSubmit (e, value, selected) {
  console.log(e, value, selected);
  setSelected(selected);
  hidePicker();
}
function hidePicker () {
  setShow(false);
}
function showPicker () {
  setShow(true);
}

<input type="button" value="显示" onClick={showPicker}/>

<Picker
  list={list}
  selected={selected}
  show={how}
  submitAttribute={{
    onClick: onClickSubmit
  }}
  cancelAttribute={{
    onClick: hidePicker
  }}
  maskAttribute={{
    onClick: hidePicker
  }}
/>
```
[返回目录](#component)









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
[返回目录](#component)












## PickerDate
[日期选择弹框](https://unpkg.com/seedsui-react/src/lib/PickerDate/PickerDate.js)
, 基于[Picker 滚动选择弹框](#picker)组件
### 属性
```javascript
<PickerDate
  portal={传送dom object, 默认document.getElementById('root')}
  data={数据源 array, 默认内置数据源}
  split={分隔符 string, 默认'-'}
  type={类型 string, 默认'district'} // date | month | time | datetime
  show={*显隐 bool, 默认false}
  value={值 string, 默认无} // '2018-02-26'
  selected={选中项 array, 默认无} // 传入selected时, 选中项则不取value中的值 [{id: '', name: ''}]
  maskAttribute={遮罩属性 object, 默认无}
  submitAttribute={确定按钮属性 object, 默认无}
  cancelAttribute={取消按钮属性 object, 默认无}

  fail={错误 func(e, {errMsg: ''}), 默认无}
/>
```
### 示例
用法与[Picker](#picker)相同
[返回目录](#component)





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
import Player from 'seedsui-react/lib/Player';

<Player
  src={`//res.waiqin365.com/d/waiqin365_h5/leaflet/voice/voice.mp4`}
  style={{width: '319px'}}>
  <img alt="" src="//res.waiqin365.com/d/waiqin365_h5/leaflet/voice/page2.png" style={{width: '319px'}}/>
</Player>
```
[返回目录](#component)













## PickerDistrict
[区域选择弹框](https://unpkg.com/seedsui-react/src/lib/PickerDistrict/PickerDistrict.js)
### 属性
```javascript
<PickerDistrict
  portal={传送dom object, 默认document.getElementById('root')}
  dataFormat={数据源格式化 object, 默认如注释}
  /*{
    parentPropertyName: 'pId', // 将pId改成parentid
    idPropertyName: 'id', // 将id改为id
    namePropertyName: 'name', // 将name改为name
    childPropertyName: 'child',  // 将child改为children
  }*/
  data={数据源 array, 默认内置数据源}
  getData={异步获取省市区信息 Promise, 默认读取data} // 如果需要接口获取省市区, 可以通过此属性获取, 返回一个Promise对象, resolve([id: "1", name: "街道"])时会渲染街道, resolve([])时会直接选中区, resolve('错误')则显示错误信息, 并不进行选择操作
  countries={国家数据 array, 默认无} // 有此数据时将变成支持选国家
  getCountries={异步获取国家信息 Promise, 默认读取data} // 如果需要接口获取国家, 可以通过此属性获取, 返回一个Promise对象, resolve([id: "1", name: "国家"])时会渲染国家, resolve([])时会显示为空, resolve('错误')则显示错误信息, 并不进行选择操作

  firstStageCitys={直辖市特别市没有省 Array<String>, 默认['北京', '天津', '上海', '重庆']} // 当type设置为city时, 将把一级城市做为市级选择返回
  split={分隔符 string, 默认'-'}
  type={类型 string, 默认''} // province | city | district | street
  show={*显隐 bool, 默认false}
  value={值 string, 默认无} // '北京-东城区'
  selected={选中项 array, 默认无} // 传入selected时, 选中项则不取value中的值 [{id: '', name: ''}]
  maskAttribute={遮罩属性 object, 默认无}
  submitAttribute={确定按钮属性 object, 默认无}
  cancelAttribute={取消按钮属性 object, 默认无}
  getStreets={获取街道信息 Promise, 默认无, 没有此属性则只能选到区} // 获取街道信息, 因为街道信息过大, 所以必须通过请求获取, 返回一个Promise对象, resolve([id: "", name: ""])时会渲染街道, resolve([])时会直接选中区, resolve('错误')则停留在选择页面不进行选择操作
/>
```
### 示例
用法与[Picker](#picker)相同
[返回目录](#component)












## Popover
[箭头弹框](https://unpkg.com/seedsui-react/src/lib/Popover/Popover.js)
### 属性
```javascript
<Popover
  portal={传送dom object, 默认document.getElementById('root')}
  show={*显隐 bool, 默认false}
  animation={动画 string, 默认'zoom'}  // slideLeft | slideRight | slideUp | slideDown | zoom | fade | none
  duration={动画时长 number, 默认无}
  maskAttribute={遮罩属性 object, 默认无} // className: mask popover-mask
  children={容器内容 node, 默认无}
  {...others} // 容器属性
>
内容内容
</Popover>
```
### 示例
```javascript
import Popover from 'seedsui-react/lib/Popover';

this.state = {
  show: false
}

// 更多操作
onClick = () => {
  this.setState((prevState) => {
    return {
      show: !prevState.show
    }
  })
}

<input type="button" value="显隐" onClick={this.onClick}/>
{/* 更多操作 */}
<Popover
  show={this.state.show}
  className={'top-left'}
  style={{top: 20, left: 20}}
  maskAttribute={{
    onClick: this.onClick
  }}
>
  操作操作<br/>
  操作操作<br/>
  操作操作<br/>
  操作操作<br/>
  操作操作
</Popover>

```
[返回目录](#component)










## Preview
[提示弹框](https://unpkg.com/seedsui-react/src/lib/Preview/Preview.js)
### 提示
Preview预览组件中的inctance.js, 也可以直接使用Api直接调用:
* Bridge.previewImage({urls: [src], layerHTML: `<div class="preview-layer" style="background-image:url(${layer})"></div>`})

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
[返回目录](#component)










## Progress
[进度条](https://unpkg.com/seedsui-react/src/lib/Progress/Progress.js)
### 属性
```javascript
<Progress
  barAttribute={进度条属性 object, 默认无}
  captionAttribute={进度条文字属性 object, 默认无}

  percentage={百分比 number, 默认无} // 百分比与max min value, 只要一种就行了
  max={最大值 number, 默认100}
  min={最小值 number, 默认0}
  value={值 number | string, 默认0}
  showPercentage={是否显示百分比文字 bool, 默认true} // 若为false则不显示文字

  children={子元素 node, 默认无}

  {...others}
/>
```
### 示例
```javascript
import Progress from 'seedsui-react/lib/Progress';

<Progress percentage={10}/>
```
[返回目录](#component)












## QRCode
[生成二维码](https://unpkg.com/seedsui-react/src/lib/QRCode/QRCode.js)
### 属性
```javascript
<QRCode
  text={生成码的字符 string, 默认无}
  style={容器style object, 默认无}

  children={子元素 node, 默认无}

  {...others}
/>
```
### 示例
```javascript
import QRCode from 'seedsui-react/lib/QRCode';

const Logo = {
  position: 'absolute',
  left: '50%',
  top: '50%',
  width: '50px',
  height: '50px',
  marginLeft: '-25px',
  marginTop: '-25px',
}

<QRCode text="https://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=%E5%9B%BE%E7%89%87&hs=2&pn=0&spn=0&di=7040&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&ie=utf-8&oe=utf-8&cl=2&lm=-1&cs=1035415831%2C1465727770&os=2036467054%2C2328224179&simid=4030878874%2C470441821&adpicid=0&lpn=0&ln=30&fr=ala&fm=&sme=&cg=&bdtype=0&oriquery=%E5%9B%BE%E7%89%87&objurl=http%3A%2F%2Fa3.att.hudong.com%2F68%2F61%2F300000839764127060614318218_950.jpg&fromurl=ippr_z2C%24qAzdH3FAzdH3F4_z%26e3B6zan0c_z%26e3Bv54AzdH3FkkfAzdH3Fp5rtv_z%26e3Bwfrx%3Ft1%3Dd8ln08c&gsm=1&islist=&querylist=">
  <img style={Logo} alt="" src="//res.waiqin365.com/d/dinghuo365/logo.png"/>
</QRCode>
```
[返回目录](#component)















## PDFView
[PDF文件预览](https://unpkg.com/seedsui-react/src/lib/PDFView/PDFView.js)
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
[返回目录](#component)











## Radio
[单选框](https://unpkg.com/seedsui-react/src/lib/Radio/Radio.js)
### 属性
属性与[Checkbox](#checkbox)相同
### 示例
用法与[Checkbox](#checkbox)相同
[返回目录](#component)
























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
此控件支持wechat微信、wework企业微信、dinghuo订货APP、wq外勤APP(JSBridge)、waiqin外勤APP(cordova), 其它平台不显示

### 示例
```javascript
import Share from 'seedsui-react/lib/Share';


<Share
  config={{
    title: '标题', // 分享标题
    desc: '副标题', // 分享描述
    link: 'https://www.waiqin365.com/', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl: 'https://www.waiqin365.com/p/v3/assets/LOGO2.png', // 分享图标
  }}
  className="button lg primary">
  分享
</Share>
```
[返回目录](#component)





















## PickerSelect
[选择弹框](https://unpkg.com/seedsui-react/src/lib/PickerSelect/PickerSelect.js)
### 属性
```javascript
<PickerSelect
  portal={传送dom object, 默认document.getElementById('root')}
  multiple={是否允许多选 bool, 默认false}
  list={列表 array, 默认无} // 格式 [{id: '', name: ''}]
  split={多选分割字符串 bool, 默认,}
  show={*显隐 bool, 默认false}
  value={值 string, 默认无}
  selected={选中项 array, 默认无} // 传入selected时, 选中项则不取value中的值 [{id: '', name: ''}]
  maskAttribute={遮罩属性 object, 默认无}
  submitAttribute={确定按钮属性 object, 默认无}
  cancelAttribute={取消按钮属性 object, 默认无}
  optionAttribute={选项属性 object, 默认无}
  {...others}
/>
```
### 示例
用法与[Picker](#picker)相同
[返回目录](#component)




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
import Star from 'seedsui-react/lib/Star';

<Star/>
```
[返回目录](#component)




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
import Stencil from 'seedsui-react/lib/Stencil';

<Stencil/>
```
[返回目录](#component)




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
import Sticker from 'seedsui-react/lib/Sticker';

<Sticker>NEW</Sticker>
```
[返回目录](#component)



















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
import Swiper from 'seedsui-react/lib/Swiper';
// 初始化轮播
function initHandler (s) {
  let defaultIndex = 1;
  s.slideTo(defaultIndex, 0);
}
// 点击事件: 防止与放大缩小的双击事件冲突
function clickHandler (s, e) {
  if (e.target.classList.contains('swiper-button-prev') || e.target.classList.contains('swiper-button-next')) {
    return;
  }
  if (clickSpace) {
    window.clearTimeout(clickSpace)
    clickSpace = null
  }
  clickSpace = setTimeout(() => {
    console.log('触发点击')
  }, 500)
}
function zoomHandler () {
  if (clickSpace) {
    window.clearTimeout(clickSpace)
    clickSpace = null
  }
}


<Swiper
  style={{
    width: '100%',
    height: '100%'
  }}
  params={{
    zoom: true,
    pagination: {
      el: '.swiper-pagination',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    on: {
      init: initHandler,
      tap: clickHandler,
      zoomChange: zoomHandler
    }
  }}
>
  <div className="swiper-slide">
    <div className="swiper-zoom-container">
      <img className="swiper-zoom-target" src="http://image-test.waiqin365.com/6692513571099135446/sku/201809/20180911195747712_05105130_CAMERA_21001006280.jpg"/>
    </div>
  </div>
  <div className="swiper-slide">
    <div className="swiper-zoom-container">
      <img className="swiper-zoom-target" src="http://image-test.waiqin365.com/6692513571099135446/sku/201809/20180911195747712_05105130_CAMERA_21001006280.jpg"/>
    </div>
  </div>
</Swiper>
```
[返回目录](#component)














## Tabbar
[页签](https://unpkg.com/seedsui-react/src/lib/Tabbar/Tabbar.js)
### 属性
```javascript
<Tabbar
  style={容器style object, 默认无}
  className={容器className string, 默认'tabbar-line tabbar-line-width70 border-b'} // tabbar-line | tabbar-rect | tabbar-lump | tabbar-dropdown | tabbar-footer
  contentAttribute={标题图标容器属性 object, 默认无} // className: 'tab-content'
  captionAttribute={标题属性 object, 默认无} // className: 'tab-caption'
  sndcaptionAttribute={副属性 object, 默认无} // className: 'tab-sndcaption'
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
  tiled={宽度等分 bool, 默认宽度弹性伸缩}
  disabled={是否禁用 bool, 默认无}
  exceptOnClickActive={排除点击选中的菜单 bool, 默认true}
  onChange={点击页签 func(e, value, selected, index), 默认无}
  activeIndex={选中项 number, 默认0}
/>
```
### 示例
```javascript
import Tabbar from 'seedsui-react/lib/Tabbar';

const tabbar = [
  {name: '月', dateType: '0'},
  {name: '季', dateType: '1'},
  {name: '年', dateType: '2'}
];
const [activeIndex, setActiveIndex] = useState(0);

function handleClick (e, value, selected, index) {
  console.log(e, value, selected, index)
  setActiveIndex(index);
}

<Tabbar list={tabbar} activeIndex={activeIndex} onChange={handleClick}/>
```
[返回目录](#component)




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
import Ticket from 'seedsui-react/lib/Ticket';

<Ticket onClick={this.onClick} style={{margin: '12px 14px'}} legend={
    <div className="text-center">
      <p style={{fontSize: '20px'}}>标题</p>
      <p style={{fontSize: '12px', marginTop: '4px'}}>满30元可用</p>
    </div>
  }
  containerStyle={{padding: '12px'}}>
  <div className="flex flex-top" style={{height: '60px'}}>
    <p className="list-caption nowrap2 flex-1" style={{height: '40px'}}>商品名称 规格</p>
  </div>
  <div className="flex">
    <p className="list-sndcaption font-size-sm flex-1">2017-07-07</p>
  </div>
</Ticket>
```
[返回目录](#component)




## Timeline
[时间轴](https://unpkg.com/seedsui-react/src/lib/Timeline/Timeline.js)
### 属性
```javascript
<Timeline
  list={列表 array, 默认无, 格式如下:}
  // [{content: node, icon: node(默认Dot), active: bool, children: node}]
  className={容器className string, 默认无, 基础'timeline'}
  style={容器style object, 默认无}

  lineAttribute={div左线条属性 object, 默认无, 基础{className: 'timeline-line'}}
  lineCross={线条是否通到底部 bool, 默认true}

  badgeAttribute={div左小球的容器 object, 默认无, 基础{className: 'timeline-badge'}}

  dotAttribute={Dot组件小球属性 object, 默认{className: ''}}
  
  {...others}
/>
```
### 示例
```javascript
import Timeline from 'seedsui-react/lib/Timeline';

const timeList = [
  {content: <p>内容</p>, active: true}
]
<Timeline list={timeList} style={{padding: '0 0 0 18px'}}/>
```
[返回目录](#component)




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
  fail={发生冲突错误 func({errMsg:''}), 默认无}
/>
```
### 示例
```javascript
import Timepart from 'seedsui-react/lib/Timepart';

<Timepart times={[{className: 'disabled', startTime: '09:00', endTime: '10:00'}]}/>
```
[返回目录](#component)




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
import Timepart from 'seedsui-react/lib/Timepart';

<Titlebar caption="SeedsUI" rButtons={[{ caption: 'try' , onClick: () => {console.log(1)}}]} />
```
[返回目录](#component)




## Toast
[提示弹框](https://unpkg.com/seedsui-react/src/lib/Toast/Toast.js)
### 建议
Toast组件更适用于复杂的定制弹框,一般弹框建议直接使用Api直接调用:
* Bridge.showToast(msg, {mask: false})代替

详见[Bridge 桥接库](#bridge) 桥接库
### 属性
```javascript
<Toast
  portal={传送dom object, 默认document.getElementById('root')}
  show={*显隐 bool, 默认false}

  duration={动画时长 number, 默认false}

  maskAttribute={遮罩属性 object, 默认无}

  caption={消息内容 node, 默认无}
  captionAttribute={消息内容属性 object, 默认无}

  icon={图标dom node, 默认无}
  {...others}
/>
```
### 示例
```javascript
import Toast from 'seedsui-react/lib/Toast';

this.state = {
  toastShow: false,
  toastMsg: '',
}

showMsg = (msg) => {
  if (this.timeout) window.clearTimeout(this.timeout);
  this.setState({
    toastShow: true,
    toastMsg: msg
  });
  this.timeout = setTimeout(() => {
    this.setState({
      toastShow: false
    });
  }, 2000);
}

<Toast caption={this.state.toastMsg} show={this.state.toastShow} className="middle" style={{borderRadius: '4px'}}/>
```
[返回目录](#component)











## Tree
[树结构](https://unpkg.com/seedsui-react/src/lib/Tree/Tree.js)
### 属性
```javascript
<Tree
  split={分隔符 string, 默认','}
  multiple={是否需要多选 bool, 默认false} // 只有设置checkbox为true才生效
  checkbox={是否支持选择 bool, 默认无}
  checkStrictly={是否启用严格模式 bool, 默认true} // 严格模式, 父子节点选中状态不再关联
  arrowAutoShow={箭头自动显示, 有下级时才显示箭头 bool, 默认false}
  extend={展开收缩 number, 默认0} // 1.全部展开 -1.全部收缩 0.不工作
  bar={选中项聚合展现栏 string | node, 默认无}

  treeAttribute={树属性 object, 默认无} // 基础className为tree
  buttonAddAttribute={添加按钮属性 object, 默认无} // {className: '', onClick: func()}
  buttonDelAttribute={删除按钮属性 object, 默认无} // {className: '', onClick: func()}
  
  selected={选中项 array, 默认无} // 选中项: [{id: '', id: ''}]
  list={列表项 array, 默认无} // 数据: [{id: '', name: '', parentid: ''}]
  selectedAutoClear={自动清理不存在的选中节点 bool, 默认false}

  getChildren={动态渲染子元素 Promise, 默认无} // 信息过大的情况, 先只渲染部门再渲染人员, 所以必须通过请求获取, 返回一个Promise对象, resolve([id: "", name: "", parentid: ""])时会渲染, resolve('错误')则停留在选择页面不进行渲染操作
  onChange={点击底层节点 func(s, value, selected), 默认无}
  onClick={点击节点 func(s, value, item, isActived, isExtend, childrenCount), 默认无}
  onClickLeaf={点击底层节点 func(s, value, item, isActived), 默认无}

  onData={数据加载时,可修改dom func(option), 默认无} // 通过修改option.html塞入按钮前
/>
```
### 示例
```javascript
import Tree from 'seedsui-react/lib/Tree';

const groupList = [
  {
    "id": "97666a35-778e-4d28-a973-df7144fe5887",
    "name": "开发二部一室",
    "parentid": "3fbb06c3-6ac5-4a19-9252-898818da5c30",
  },
  {
    "id": "93fe4fa2-e75e-4e98-833d-7cdecdf2e3f9",
    "name": "开发一部",
    "parentid": "96a2835b-a1b2-4556-bf68-cb0038042b57",
  },
  {
    "id": "afb6ae14-5d23-4117-b819-cc7e705e8ddb",
    "name": "开发一部一室",
    "parentid": "93fe4fa2-e75e-4e98-833d-7cdecdf2e3f9",
  },
  {
    "id": "3fbb06c3-6ac5-4a19-9252-898818da5c30",
    "name": "开发二部",
    "parentid": "96a2835b-a1b2-4556-bf68-cb0038042b57",
  },
  {
    "id": "bd8b7116-e5ae-4813-b2a7-a38f56ce10d1",
    "name": "开发二部二室",
    "parentid": "3fbb06c3-6ac5-4a19-9252-898818da5c30",
  },
  {
    "id": "7eb397f6-daed-41f9-8985-ac2c2129ef9b",
    "name": "开发一部二室",
    "parentid": "93fe4fa2-e75e-4e98-833d-7cdecdf2e3f9",
  },
  {
    "id": "87154769-0d80-4459-a0cb-df68b26e4011",
    "name": "开发二部三室",
    "parentid": "3fbb06c3-6ac5-4a19-9252-898818da5c30",
  },
  {
    "id": "380e2247-1179-40e2-91e1-8851dd5f24ef",
    "name": "开发三部",
    "parentid": "96a2835b-a1b2-4556-bf68-cb0038042b57",
  },
  {
    "id": "41eddac1-e560-47c9-8ea0-c39838e93bb5",
    "name": "开发一部三室",
    "parentid": "93fe4fa2-e75e-4e98-833d-7cdecdf2e3f9",
  },
  {
    "id": "56a81fea-03f4-41e1-a521-ea14513a65c6",
    "name": "业务产品部",
    "parentid": "-1",
  },
  {
    "id": "dbc1599b-41a1-49bb-8230-a230e0927016",
    "name": "UED部",
    "parentid": "96a2835b-a1b2-4556-bf68-cb0038042b57",
  },
  {
    "id": "abd197f0-1ce5-4e42-a6b0-063cf22633d2",
    "name": "测试部",
    "parentid": "96a2835b-a1b2-4556-bf68-cb0038042b57",
  },
  {
    "id": "0a9ba2be-94d8-4163-85d2-940ccbf5ede1",
    "name": "广州开发部",
    "parentid": "0b189355-76f5-430d-bcdc-ccce65880021",
  },
  {
    "id": "0a9ba2be-94d8-4163-468i-940ccbf5ede1",
    "name": "广州开发部一室",
    "parentid": "0a9ba2be-94d8-4163-85d2-940ccbf5ede1",
  },
  {
    "id": "0d736fce-5f4a-4603-acc2-1ed4d3f4a578",
    "name": "运营支撑部",
    "parentid": "96a2835b-a1b2-4556-bf68-cb0038042b57",
  },
  {
    "id": "c6e56510-c293-48bc-ac8e-bfa3a1926417",
    "name": "办公室",
    "parentid": "-1",
	},
	{
    "id": "483d-94d8-4163-85d2-940ccbf5ede1",
    "name": "办公室1",
    "parentid": "c6e56510-c293-48bc-ac8e-bfa3a1926417",
  },
  {
    "id": "693a-5f4a-4603-acc2-1ed4d3f4a578",
    "name": "办公室1-1",
    "parentid": "483d-94d8-4163-85d2-940ccbf5ede1",
  },
  {
    "id": "f83fe35c-a93e-4332-a3a4-8c16b7b9e4db",
    "name": "财务部",
    "parentid": "-1",
  },
  {
    "id": "e58f452e-a3d4-4eff-9f00-fbcf57342267",
    "name": "残酷吗？VC的筛选法则：看100个案子投1个",
    "parentid": "7576b7b4-1e15-4b09-8d4c-47ca7edb36fe",
  },
  {
    "id": "ed991ebb-872b-4943-838d-41e51d145cf4",
    "name": "测试二室",
    "parentid": "abd197f0-1ce5-4e42-a6b0-063cf22633d2",
  },
  {
    "id": "c74b5302-1293-4087-a684-04104e7da402",
    "name": "测试三室",
    "parentid": "abd197f0-1ce5-4e42-a6b0-063cf22633d2",
  },
  {
    "id": "8144c2fa-a39b-4959-8251-3327a683df4c",
    "name": "测试一室",
    "parentid": "abd197f0-1ce5-4e42-a6b0-063cf22633d2",
  },
  {
    "id": "2b33aea3-3745-4ed3-9457-5494aee5e344",
    "name": "工程及运维部",
    "parentid": "0b189355-76f5-430d-bcdc-ccce65880021",
  },
  {
    "id": "728fd935-fb28-4154-8e3f-74ca29a2460f",
    "name": "集成开发二部",
    "parentid": "0b189355-76f5-430d-bcdc-ccce65880021",
  },
  {
    "id": "a6781fb8-9968-4134-8fd0-564821ea7058",
    "name": "集成开发一部",
    "parentid": "0b189355-76f5-430d-bcdc-ccce65880021",
  },
  {
    "id": "13ed5bf3-1b91-4fca-9303-ee8071b32154",
    "name": "内勤组",
    "parentid": "b93d94c6-7e30-4caf-89eb-188bef40b3ba",
  },
  {
    "id": "47f9b708-ab98-4fb3-a643-217db2074c73",
    "name": "人力资源部",
    "parentid": "-1",
  },
  {
    "id": "a87d375e-61ba-470a-914c-30eb94e21adf",
    "name": "市场北京办",
    "parentid": "b93d94c6-7e30-4caf-89eb-188bef40b3ba",
  },
  {
    "id": "d0d02e37-114c-4446-b870-06e99f9e1394",
    "name": "市场广州办",
    "parentid": "b93d94c6-7e30-4caf-89eb-188bef40b3ba",
  },
  {
    "id": "90fea6c9-0f66-45b0-a3c1-bb209beac12e",
    "name": "市场南京办",
    "parentid": "b93d94c6-7e30-4caf-89eb-188bef40b3ba",
  },
  {
    "id": "0a39cee5-a280-45c7-a41e-1998855e3ef1",
    "name": "市场上海办",
    "parentid": "b93d94c6-7e30-4caf-89eb-188bef40b3ba",
  },
  {
    "id": "221b9674-ac71-45ba-81f1-4b4be1df4314",
    "name": "市场武汉办",
    "parentid": "b93d94c6-7e30-4caf-89eb-188bef40b3ba",
  },
  {
    "id": "ce1ebf90-9540-41d4-9b79-c30441913ad2",
    "name": "市场支持",
    "parentid": "96a2835b-a1b2-4556-bf68-cb0038042b57",
  },
  {
    "id": "7576b7b4-1e15-4b09-8d4c-47ca7edb36fe",
    "name": "微软宣布新一轮裁员或影响1000人",
    "parentid": "97666a35-778e-4d28-a973-df7144fe5887",
  },
  {
    "id": "3e12ef76-9235-48c5-bff8-27fbd56111cb",
    "name": "项目管理部",
    "parentid": "-1",
  },
  {
    "id": "b93d94c6-7e30-4caf-89eb-188bef40b3ba",
    "name": "销售二部",
    "parentid": "56a81fea-03f4-41e1-a521-ea14513a65c6",
  },
  {
    "id": "99bc0450-4e64-42e6-99cb-2c5686a4c0b3",
    "name": "系统集成部",
    "parentid": "56a81fea-03f4-41e1-a521-ea14513a65c6",
  },
  {
    "id": "96a2835b-a1b2-4556-bf68-cb0038042b57",
    "name": "移动平台产品线",
    "parentid": "56a81fea-03f4-41e1-a521-ea14513a65c6",
  },
  {
    "id": "0b189355-76f5-430d-bcdc-ccce65880021",
    "name": "应用交付产品线",
    "parentid": "56a81fea-03f4-41e1-a521-ea14513a65c6",
  },
  {
    "id": "d3a6be54-30f0-4e82-8083-a7ed8456d03d",
    "name": "运营体系",
    "parentid": "-1",
  },
  {
    "id": "6bb5a527-5800-4583-a749-bbb53e639d52",
    "name": "支撑二室",
    "parentid": "0d736fce-5f4a-4603-acc2-1ed4d3f4a578",
  },
  {
    "id": "abdab8ba-7a99-462e-b022-56c69b3ae4fd",
    "name": "支撑一室",
    "parentid": "0d736fce-5f4a-4603-acc2-1ed4d3f4a578",
  },
  {
    "id": "8ff29a2a-0960-4bd7-81be-0e4a649ba701",
    "name": "未分组部门",
    "parentid": "-1",
  }
];
var userList1 = [
  {
    isPeople: true,
    "id": "xiali",
    "name": "夏立",
    "parentid": "56a81fea-03f4-41e1-a521-ea14513a65c6",
  },
  {
    isPeople: true,
    "id": "liuyu",
    "name": "刘宇",
    "parentid": "56a81fea-03f4-41e1-a521-ea14513a65c6"
  }
];
var userList2 = [
  {
    isPeople: true,
    "id": "liguanghui",
    "name": "李广辉",
    "parentid": "96a2835b-a1b2-4556-bf68-cb0038042b57"
  },
  {
    isPeople: true,
    "id": "xuguolong",
    "name": "徐国龙",
    "parentid": "96a2835b-a1b2-4556-bf68-cb0038042b57"
  },
  {
    isPeople: true,
    "id": "zhujingjing",
    "name": "朱晶晶",
    "parentid": "96a2835b-a1b2-4556-bf68-cb0038042b57"
  }
];

// 异步加载的方法, 点击Title, 去请求数据, 将数据塞到指定节点下
function getChildren (id) {
  return new Promise((resolve) => {
    if (id === "56a81fea-03f4-41e1-a521-ea14513a65c6") { // 加载业务产品部
      console.log('加载业务产品部');
      setTimeout(() => {
        resolve(userList1)
      }, 2000)
    } else if (id === "96a2835b-a1b2-4556-bf68-cb0038042b57") { // 加载移动平台产品线
      console.log('加载移动平台产品线');
      setTimeout(() => {
        resolve(userList2)
      }, 2000)
    }
    
  })
}
const refElBar = useRef(null);
const [elBar, setElBar] = useState(null);

const [list, setList] = useState([])
  useEffect(() => {
    setElBar(refElBar.current)
    setTimeout(() => {
      setList(groupList)
    }, 1000)
  }, [])
const [selected, setSelected] = useState(
  [
    {
      "id": "13ed5bf3-1b91-4fca-9303-ee8071b32154",
      "name": "内勤组",
      "parentid": "b93d94c6-7e30-4caf-89eb-188bef40b3ba",
    },
    {
      "id": "47f9b708-ab98-4fb3-a643-217db2074c73",
      "name": "人力资源部",
      "parentid": "-1",
    }
  ]
)
const [extend, setExtend] = useState(0); // 1.全部展开 -1.全部收缩 0.不工作
// 获取选中
function onSubmit () {
  console.log(selected)
}
// 展开全部
function onExtend () {
  setExtend(1);
}
// 展开全部
function onCollapse () {
  setExtend(-1);
}

// 添加数据时, 可手动修改它的渲染样式
function onData (option) {
  if (option.isPeople) {
    var photo = "";
    if (option.avatarUrl) {
      photo = '<span class="tree-avatar" style="background-image:url(' + option.avatarUrl + ')"></span>';
    } else {
      // photo = '<span class="tree-avatar" style="background-color:' + option.name.substr(0, 1).toPinyin().substr(0, 1).toColor() + '">' + option.name.substr(option.name.length - 2, 2) + '</span>';
      photo = '<span class="tree-avatar">' + option.name.substr(option.name.length - 2, 2) + '</span>';
    }
    option.html = '<div class="tree-icon">' + photo + '</div>' +
      '<div class="tree-title">' + option.name + '</div>';
  }
}
// 查看选中信息
function onChange (e, value, options) {
  console.log(value, options)
  setSelected(options)
}



<div ref={refElBar} className="tree-bar"></div>
<Tree
  list={list}
  extend={extend}
  multiple
  checkbox
  getChildren={getChildren}
  onData={onData}
  onChange={onChange}
  selected={selected}
  bar={elBar}
/>
<input type="button" className="button lg" value="查看选中" onClick={onSubmit}/>
<input type="button" className="button lg" value="展开全部" onClick={onExtend}/>
<input type="button" className="button lg" value="收缩全部" onClick={onCollapse}/>
```
[返回目录](#component)





















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
import VideoFull from 'seedsui-react/lib/VideoFull';

const refVideoFull = useRef(null);
function playVideo () {
  if (refVideoFull.current && refVideoFull.current.instance && refVideoFull.current.instance.current) {
    refVideoFull.current.instance.current.play()
  }
}

<VideoFull
  poster={`//img.zcool.cn/community/01a9a65dfad975a8012165189a6476.jpg`}
  src={`//player.alicdn.com/video/aliyunmedia.mp4`}
  autoPlay
  bar={
    <Fragment>
      <div className="videofull-caption" onClick={playVideo}>视频标题</div>
      <div className="videofull-close"></div>
    </Fragment>
  }
/>
```
[返回目录](#component)



















## Videos
[视频控件](https://unpkg.com/seedsui-react/src/lib/Videos/Videos.js)
### 属性
```javascript
<Videos
  // onChoose={点击上传按钮 func, 默认无, 有此属性才会显示上传按钮} // 浏览器默认调用录相控件Camera
  onClick={点击一项 func(e, src, selected, index), 默认点击预览视频}
  preview={是否预览 bool, 默认true, 是否支持单击预览}
  onPreviewHide={关闭预览回调 func(), 默认无}
  routePath={显隐路由路径 string, 默认'componentPage=1'}
  videoFullProps={预览组件配置 object, 默认无}
  {...others} // 其它属性与Photos一致
/>
```
### 示例
```javascript
import Videos from 'seedsui-react/lib/Videos'

const list = [{
  id: '1',
  thumb: 'https://image-test.waiqin365.com/6069734652819592543/blog/201912/8194157084989375804.png?x-oss-process=style/zk320',
  src: 'https://player.alicdn.com/video/aliyunmedia.mp4'
},{
  id: '2',
  thumb: 'https://img.zcool.cn/community/01a9a65dfad975a8012165189a6476.jpg',
  src: 'https://www.w3school.com.cn/i/movie.ogg'
}]

function handleClick (...params) {
  console.log('点击')
  console.log(...params)
}
function handleChoose (...params) {
  console.log('选择')
  console.log(...params)
}
function handleDelete (...params) {
  console.log('删除')
  console.log(...params)
}

<Videos
  list={list}
  onChoose={handleChoose}
  onDelete={handleDelete}
  onClick={handleClick}
/>
```
[返回目录](#component)















## MapUtil
[地图工具](https://unpkg.com/seedsui-react/src/lib/MapUtil/BaiduMap.js)
### 引入库
```js
MapUtil.load({
  key: '百度key',
  library: ['draw'], // 鼠标绘制库, 没用到则不用传
  success: () => {
    initData();
  },
  fail: () => {
    changeState({
      errMsg: '地图库加载失败, 请稍后再试'
    });
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






## GeoUtil
[地理工具](https://unpkg.com/seedsui-react/src/lib/GeoUtil.js)

### 多边形转线


| 方法 | 返回值 | 说明 |
| --- | --- | --- |
| polygonToLines | <code>Line&lt;Array&gt;</code> | 多边形 

<br/>

| 参数 | 参数类型 | 说明 |
| --- | --- | --- |
| polygon | <code>Number</code> | 多边形 |
| isRegular | <code>Boolean</code> | 是否要求是一个标准的多边形, 如果传true, 则返回集合会加上首尾互连


### 示例
```javascript
var lines = GeoUtils.polygonToLines([[1,0], [2, 0], [3, 0]], true)
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
[返回目录](#component)
