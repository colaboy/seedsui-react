[TOC]

# 典型页面

典型页面不仅符合代码规范，也符合上百条的 ue 规范，一定要使用典型页面开发，即使不使用典型页面，也要使用其开发的风格开发

## 典型页面规则

### 请求

页面级请求：对整个页面进行保存、审批、删除、查询等操作

组件级请求：组件内部的保存、修改、查询。例如：客户组件查客户列表、增加客户、删除客户等

- 命名：请求只有 queryXX、deleteXX、saveXX、validateXX
- 文件夹位置：1.“页面级请求”放到单独文件夹 api；2.“组件级请求”放组件即可；
- 代码位置：1.“页面级请求”放第一级；2.“组件级请求”放组件；

### 数据要求

- 唯一性： 原数据不要重复，比如列表 list，页面需要对 list 进行分组展示，不要再定义一个变量 group 仅用于渲染，数据与 list 交织。正确的处理方法是将 list 传给 Group 组件, 在组件内部去分组渲染。

```
唯一性利于功能扩展，例如：在列表上做编辑功能时，只需要处理唯一的数据源即可。

如果用多份交织数据，则修改数据需要处理多份数据，随着业务的扩展最终的结果就是重构。
```

- 精简：不要定义无用的数据，数据尽量精简, 尽量复用

```
在复杂功能下，无用的数据就会导致后期维护的可读性带来障碍
```

- 命名规范：不要随意命名，一定要深思熟虑，具体规范参考`变量命名`

业务前端开发，页面渲染本身没什么难度，本质上就是在数据处理上见高低，后期维护也主要难在数据处理上，数据定义的越好，后期维护就越简单

### 数据格式

- 选择控件数据与组件对应，对象{id: '', name: '', ...}、{longitude: '', latitude: '', address:'', ...}、{src: '', thumb: '', ...}等

- 基本数据类型不做要求

### 变量命名

- 根据组件命名：
  Goods.Combo: 列表 goodsList, 值 goods;
  Customer.Combo: 列表 customerList, 值 customer;
  Order.Combo 自定义组件：列表 orderList, 值 order;
  总之，变量要和组件有所关联

- baseData: 不参与页面渲染，提交时或者其它请求时需要的参数

### 组件入参

- 跨组件严禁相互传组件 ref（不限于两表单之间频繁联动）：
  跨组件，一律通过 onXX 来调用外部的 ref，严禁把 ref 传入其它组件中

## web 端

- 表格列表页
  plugin/example/tablelist?menuId=6914481038969933719

- 表格编辑页
  plugin/example/tableedit?menuId=6914481038969933719

- 表格详情页
  plugin/example/tabledetail?menuId=6914481038969933719&id=8651980132904030320

## 手机端

library/components/example

# 开发规范

## 开发工具

- 使用`vscode`，禁止使用其它开发工具

## 格式化

- 使用`prettier`格式化代码，并开启 vscode 中保存格式化功能（防止忘记格式化）

## 提交校验

- 使用`husky,lint-staged`做提交校验

```bash
"devDependencies": {
  "husky": "x.x.x",
  "lint-staged": "x.x.x",
},
"husky": {
  "hooks": {
    "pre-commit": "lint-staged"
  }
},
"lint-staged": {
  "src/**/*.{js,jsx}": "eslint --max-warnings=0"
}
```

## 支持 ts

- 安装

```javascript
npm i --save-dev typescript @types/node @types/react @types/react-dom @types/jest
```

- 补充修改文件

```bash
补充 tsconfig.json
```

## 注释

### 方法注释

```javascript
/**
 * 功能，如：保存
 * @param {Object} params // 如果文档齐全，入参简单描述一下就行
 * @document http://172.31.3.113:8080/workspace/myWorkspace.do?projectId=150#4951 // 文档地址
 * @returns {Promise} 返回描述
 */
function fetchSave(params) {
  return new Promise()
}
```

### 注释上方空一行

```javascript
const a = 1

// 注释
const b = 2
```

## 模块目录

routes、页面路径必须一致，并使用下钻式的规范，如下：

```bash
路由：/salesManage/salesSwapOrder/edit?menuId=xx
页面：/SalesManage/SalesSwapOrder/Edit/index.js
```

## web 端联动标签刷新

使用 useResume

## 不使用使用 zustand

使用 useCache 代替

## 不使用使用子路由超过两层

返回不刷新使用 useCache 代替

## 返回不刷新标识

window.isReloadList

## React 使用 hook 模式

新页面一律使用 hook，老页面修改时如果工作量不大也要修改为 hook

## 严禁地址栏直接传递中文

无数次惨痛的教训告诉我们地址栏传递中文需要遵循如下规则： 1.尽量不要在地址栏传递中文 2.如一定要中文，请编码两次，是两次

## 不要重复造轮子

缺轮子找组长，不要自己造

## 不要使用 es 方式引入

```javascript
import Layout from 'seedsui-react/lib/Layout'
```

使用：

```javascript
import { Layout } from 'seedsui-react'
```

## 不要使用 redux

redux 非必要情况下，不要使用，业务逻辑层在 utils 文件夹处理

## 不要使用 withRouter

```javascript
import { withRouter } from 'react-router'
withRouter 在react-router
```

react-router v6 中废弃了，替代方案：

```javascript
import { useHistory } from 'react-router-dom'
const history = useHistory()
```

## 不要使用全局函数名做函数

```
call、apply、decodeURIComponent、encodeURIComponent、isNaN等
```

## 不要使用私有属性

百度地图的私有属性是经常变的，比如下面的代码 r.Cr，这里的 Cr 没过多久就去掉了，一定要用

```javascript
let local = new BMap.LocalSearch(self.mapUtil.map, {
  renderOptions: { map: map },
  onSearchComplete: function (r) {
    callback && callback(r?.Cr || [])
  }
})
```

## 不要使用 Decorator

[装饰器](https://github.com/tc39/proposal-decorators)还没有转正，[tc39](https://medium.com/@justjavac/tc39-ecmascript-proposals-future-of-javascript-386b12149880)提案中处于 stage2，它的路还很长，使用方法也一直在变(15 升 16 脚手架时吃过一次亏)

所以现阶段不要使用如下等装饰器

```javascript
@withRouter
@connent
```

## 不要改组件（需要授权）

- 手机端组件（library）需要修改找柱子
- WEB 端组件（componets、utils）需要修改找健健

## 不要使用 rest 风格路由/:id

- 使用传统的?id=，而不是/id 这种 rest 风格的传参（这种传参顺序还有子路由会产生极大的影响，并且也不方便阅读）

- 参数一定要有非常清晰地注释

```
{/* 宴席申请新增与编辑, 参数: ?planId=方案id&planType=方案类型id&activityId=编辑活动id*/}
<Route path={`/edit`} element={<Edit />} />
```

- 参数越少越好

## 国际化

中文使用`locale('中文')`包裹

## 缩进

缩进一律使用`空格:2`，禁止使用其它空格数缩进

## 页面书写顺序

### import 顺序

1. React 相关，例如`import React from 'react'`

2. 工具:

```bash
1.node_modules工具，例如`import { useUpdateEffect } from 'ahooks'`

2.公共工具, 例如`import Logger from 'utils/Logger'`

3.内部工具，例如`import Logger from './Logger'`
```

3. 组件:

```bash
1.node_modules组件，例如`import { Form } from 'antd'`

2.公共组件，例如`import Search from 'components/Search'`

3.内部组件，例如`import Search from './Search'`
```

4. 样式

- 示例

```bash
import React from 'react'

// 工具
import { useUpdateEffect } from 'ahooks'
import Logger from 'utils/Logger'

// 组件
import { Form } from 'antd'
import Search from './Search'

// 样式
import '/main.less'
```

### 实现体顺序

1. 声明和变量，例如：const state = useState(null)
2. 生命周期，例如：useEffect
3. 事件/普通方法

## 命名

- 页面命名：List（列表）、Record（明细）、Edit（编辑）、Detail（详情）
- class 全名：组件为全局样式、业务需要加上业务标识，例如：merp-或者 dms-等
- 事件方法：`onXX`，实现事件`handleXX`：例如`onChange`对应`handleChange`。如果包含名词，将名词放中间：例如`onVisibleChange`对应`handleVisibleChange`
- 查询参数`queryParams`
  提示: 用...QueryUtil.convertQueryParams(queryParams)可转 dayjs、Date、数组对象等为服务器所需要的字符串
- 头部 Header、底部 Footer、中间 Main、侧边过滤 Filter 或 Query
- 数据初始化方法：命名为`loadData`
- 请求放到 api 文件夹或者文件中，增改、删、查方法命分别对应：saveXX、deleteXX、queryXX
- 工具放到 utils 文件夹或者文件中
- ref：`xxRef`，例如`rootRef`，获取的实体 dom 元素`xxEl`，例如`rootEl`
- 启禁用属性：动词在前 enableXX、disableXX。
- 显隐属性：visible，如果 visible 不能表现，visible 在后面，xxVisible
- 服务器参数和本地数据互转方法命名：serverXX 和 localXX，例如：serverData、serverPhoto，localData、localPhoto
  提示: 由于与服务器相关，并且只有 query 和 save 时用到，这些方法也需要放置到 api 文件夹中
- 非公用组件不要使用 components 文件夹包裹
- tableId 用：${menuId}-模块名-功能名

命名的规则： 1.参考主流命名；2.意义贴切的英文

## 容错

- 数组
  <br/>

~直接使用，没有考虑是否真的是数组，导致白屏~

```javascript
arr.map
```

~改为~

```javascript
if (Array.isArray(arr) && arr.length) {
  arr.map
}
```

- 对象
  <br/>

~直接使用，没有考虑返回错误的情况~

```javascript
let xx = result.data.xx
```

~改为~

```javascript
let xx = result?.data?.xx || 默认值
```

- JSON 解析
  <br/>

~直接解析 json，一旦出错就白屏~

```javascript
json = JSON.parse(json)
// Do some thing...
```

~改为~

```javascript
if (typeof json === 'string') {
  try {
    json = JSON.parse(json)
  } catch (err) {
    console.error('页面:错误信息', err)
    json = {}
  }
}
// Do some thing...
```

- 本地能力
  <br/>

~调用本地能力，1 要考虑本平台，2 要考虑其它平台如何展示~

```javascript
wq.invoke('xxx')
```

改为

```javascript
if (Bridge.platform === 'wq') {
  wq.invoke('xxx')
} else {
  Bridge.showToast('请在外勤客户端中使用此功能')
}
```

- 获取 dom
  <br/>

~一旦 UI 库升级，DOM 结构发生变化，就需要一项一项的解决~

```javascript
function handleChange(e) {
  let id = e.target.parentNode.id
  // Do some thing...
}
;<InputText onChange={handleChange} />
```

改为

```javascript
function handleChange(e, value) {
  let id = inputRef?.current?.id || ''
  // Do some thing...
}
;<InputText ref={inputRef} onChange={handleChange} />
```

- 请求
  <br/>

~请求 catch 处理~

```javascript
ApiAxios.get('xx').then((result) => {
  // Do some thing...
})
```

改为

```javascript
ApiAxios.get('xx')
  .then((result) => {
    // Do some thing...
  })
  .catch(() => {
    // Do some thing...
  })
```

## 分支

- 分支以版本号命名，子分支以版本号-功能名-人名命名
- 非特殊情况不要在两个分支上改相同的代码（改问题在一个分支上改，通过合并的方式解决）

# 数据规范

- 保存时间一律使用`YYYY-MM-DD hh:mm:ss`的格式保存
- 页面跳转一律透传`menuId`
- 详情数据不要通过列表带入, 而是通过 id 获取
- web 端下页带入筛选条件，一律通过 top.window.唯一 key 透传
- 最后 7 天要传 6，dayjs().subtract(6, 'day')

# GIT

## 注意事项

为防止出现代码还原的情况

- 一个工程一个文件夹：不要一个分支一个文件夹
- 每天开发前 pull
- 每天下班前 push：勤提交，提交越频繁越好
- 每天下班前 merge：队长、组长每天至少合一次代码
- 提交、pull、merge 等每个<span style="color:red">异步任务完成后</span>再进行下一个操作
- 切分支前一定要提交，不要暂存 stash 后切分支

通常我们发现上个版本修复的问题下个版本又出现了：原因大多是因为没有多合代码

## 查看主分支创建者

```bash
git log --oneline master | cut -d " " -f 1 | tail -1 | xargs git log
```

## 修改提交用户名

```bash
// 查看当前用户名
git config user.name

// 修改当前用户名
git config --global user.name 'xx'

// 修改当前登录密码
git config --global user.password 'xx'

// 查看当前用户名
git config user.email

// 修改当前用户名
git config --global user.email 'xx@qince.com'
```

## 一律使用命令

因为工具有时候会自动补充-f，使用命令则不会

- 更新

```bash
git pull
```

- 待提交

```bash
git add .
```

- 提交

```bash
git commit -m ''
```

- 上传

```bash
git push
```

- 切分支

```bash
git checkout 分支名
```

- 删除本地分支（用于无法更新，或需要使用服务器代码时）

```bash
git branch 分支名 -D
```

## Git commit 规范

git commit 格式如下：

```
git commit -m '<type>(<scope>): subject'
```

示例:

```bash
git commit -m 'feat(core): new nx starter'
```

格式说明:

👉 type 主要有以下几种类型：

- feat: 一个新特性
- fix: 修复 bug
- docs: 文档修改
- style: 不影响代码含义的更改（空格、格式、缺少分号等）
- refactor: 代码重构
- perf: 优化性能
- test: 测试用例修改
- chore: 对构建过程或辅助工具和库的更改，例如文档生成

👉 scope：可以是影响范围的任何内容。

👉 subject：包含对更改的简洁描述，规则：

- 使用陈述语句
- 第一个字母不要大写
- 末尾没有点 (.)

## 注意事项

1.push 命令执行后，注意观察 vscode 下方同步数，同步完成后再切分支

2.启动中或代码未提交完成切换分支, 需要注意左侧的差异提示，若出现差异提示不要强行提交，切到原分支提交，删除目标分支，重新拉取

3. 严禁使用-f 或者其它暴力型命令更新和提交，使用上面提供的命令即可

## 合并分支

1.保持每日向上合并分支，防止在出错的情况下无法抢救

2.向下合并代码必须等分支上线后的一天才允许合并

3.并行开发，改完立刻合

## 危急处理

- 还原到某个提交记录

因情况极其特殊，需要还原到某个提交记录，网络上通用会告诉你如下方法：

```
git reset --hard 版本号

git push -f
```

如果使用这种命令，会产生一个问题：多人协作开发时，其它人 pull 不到还原的代码, push 仍然会带入原先的版本记录

~真正可靠的还原到某个提交记录~

- git reset --hard 指定版本号
- copy src 到本地
- git reset --hard 最新版本号
- 临时文件夹覆盖本地
- git add .
- git commit -m '还原<指定版本号>'
- git push

最后向上合并，注意合并前把向上分支做个备份，最后再覆盖合并后的向上分支

# 严禁的事情

- 无视资源大小，无视渲染性能

```bash
1.使用不压缩的图片, 图片一定要压缩: https://tinypng.com/

2.明明能用代码实现，却要用图片，例如简单的渐变，圆形动画等

3.无视明显的卡顿与请求浪费，例如：展开收缩每次都发请求，或重复请求
```

- 不要使用工具提交代码

```bash
使用工具有时会没有更新强制推
```

- 不要个人建模块目录、建分支、合分支

```bash
所有模块目录及分支必须经过组长通过后能新建，参考之前的经验做出的决定，各自建目录，多方不互通，有可能会出现重复开发、目录混乱的问题
```

- 规范

```bash
看规范文档，缺失的规范找组长补充，按规范文档开发，不能全凭“常识”
```

- 改老功能也要规范

```bash
老代码如果时间不允许就修改部分规范化，自己新加的代码也要按规范开发
```

- copy 的代码也要规范

```bash
复制的代码也属于修改的代码，不但要按规范开发，如果冗余还需要做删减，不能连不规范的行为也copy
```

- 无用的代码及时注释或者删除

```bash
如果自己不及时删除，或者仅注释view层使用处，其它地方不动，时间长了，回过来头来再想优化就困难了，给自己和别人制造了阅读障碍。

例如：在redux里定义了一个方法dispatchCount,count，pages里不用了，仅在pages里把dispatchCount注释了，其它地方不删除
```

- 复用

```bash
优先使用造好的轮子，如果没造：业务代码业务内复用，通用功能提升后复用（与上线讨论后提升，再通过培训或者IM扩散告知）
```

- 组件化颗粒化

```bash
一个页面大几百行代码，不封装组件，也不用mvc的框架模式，瀑布流式的开发，看着像jquery，导致阅读困难
```

```bash
页面目录
L List
L Tabs
L index.js
```

```js
return (
  <Page>
    {tabs && tabs.length > 0 && (
      <Header style={{ marginBottom: '10px', backgroundColor: '#fff' }}>
        <Tabs tabActiveIndex={tabActiveIndex} tabs={tabs} onChange={handleTabs} />
      </Header>
    )}
    <Container
      ref={containerRef}
      refreshing={refreshing}
      onTopRefresh={_initData}
      onScroll={handleScroll}
    >
      {tabs && <List list={list} scene={scene} />}
      {errMsg && <Notice caption={errMsg} />}
    </Container>
  </Page>
)
```

# 高质量的定义

- 命名：文件命名、变量命名、函数命名（1.参考主流命名；2.意义贴切的英文）
- 页面：10 秒内能够读懂并能解释清楚自己的页面功能划分
- 组件：组件的颗粒度足够小
- 逻辑：整理好逻辑后再写代码，使用 MVC 的模式开发
- 复用：业务代码业务内复用，通用功能提升后复用
- BUG：多加保护

# 低质量的示例

- 变量或方法冗余

```bash
let isShow = xx
let visible = isShow
setVisible(visible)
```

- url 冗余

```javascript
function handleClick(item) {
  history.push(`xx.html?=${getUrl(...item)}`)
}
```

- 重复请求
- 页面全是警告
- 明显的交互体验很差，例如：

```
页面白屏
按钮点击无反馈
正常的请求不转圈也无反馈
```

- 过度复用：详情、新增、编辑使用同一个页面
- 不管异常情况，只处理接口正确的情况，接口出错直接白屏
- 代码不跨平台，一旦离开特定环境就白屏（例如：fh 打开的页面不能单独在浏览器中打开，外勤中的功能挪到微信上就白屏）
- 一个页面代码超过 1k 行
- 复杂代码不加注释
- 代码打架，多个方法或者多个变量控制一件逻辑
- 页面卡顿，动不动触动重绘重排，写页面不考虑性能
- 命名随意，目录随意
- 页面的可读性差，还不如 jQuery
- 调试完成后不删除 console.loggit
