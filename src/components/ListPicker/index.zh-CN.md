# ListPicker 列表

## ListPicker.Combo

<code src="./demos/Combo/index.jsx"></code>

### ListPicker.Combo 属性

| 属性                | 说明                                                              | 类型                                           | 默认值            |
| ------------------- | ----------------------------------------------------------------- | ---------------------------------------------- | ----------------- |
| allowClear          | 是否允许清空                                                      | boolean \| string                              | 'exclusion-ricon' |
| async               | 是否异步加载数据                                                  | boolean                                        | true              |
| autoSize            | 文本内容自适应展示                                                | boolean                                        |
| cancelProps         | 同 Modal 的 cancelProps                                           |
| checkStrictly       | 没用                                                              |
| children            | 自定义展示主体                                                    |
| disabled            |
| enableHalfChecked   | 没用                                                              |
| maskClosable        | 是否点击阴影可关闭                                                | boolean                                        | true              |
| maskProps           | 阴影部分属性                                                      |
| modal               | 弹窗类型: page 页面; 其它弹窗(默认)                               |                                                |                   |
| ModalComponent      | 自定义 Modal 组件                                                 |                                                |                   |
| MainProps           | 自定义 Main 组件对应的属性[ListPicker.Main](#listpickermain-属性) |                                                |                   |
| ModalProps          | 参考[ListPicker.Modal 属性](#listpickermodal-属性)                |                                                |                   |
| pageProps           | 同'library/components/Layout'                                     |
| portal              | Modal 根节点                                                      |
| preserveValue       | 保留不在树结构中的 value                                          |
| readOnly            |
| render              | 功能类似于 children                                               | (value, {displayValue}) => JSX.Element \| null |
| ricon               | 右侧图标                                                          | ReactNode                                      |
| selectable          | 没用                                                              |
| showCheckedStrategy | 没用                                                              |
| submitProps         | 参考'library/deprecated/Modal'.Picker.submitProps                 |
| TreeProps           | 没用                                                              |
| zIndex              | 弹窗层级排序                                                      |
| onBeforeOpen        | 弹框打开前事件                                                    | () => Promise<boolean>                         |
| onVisibleChange     | Modal 显隐事件                                                    |

## ListPicker.Modal

<code src="./demos/Modal/index.jsx"></code>

### ListPicker.Modal 属性

| 属性                | 说明                                                                                      | 类型                                                       | 默认值 |
| ------------------- | ----------------------------------------------------------------------------------------- | ---------------------------------------------------------- | ------ |
| async               | 异步加载数据(页面显示时加载)                                                              | boolean                                                    | true   |
| cancelProps         | caption: 取消按钮标题 默认 picker-icon-close; disabled: 取消按钮是否禁用; className: 类名 | `{caption: string, disabled: boolean, className: string} ` | {}     |
| captionProps        | caption: 选择控件标题; className: 类名                                                    | `{caption: string, className: string} `                    | {}     |
| checkStrictly       | 没用                                                                                      |                                                            |
| children            | 自定义展示主体                                                                            |
| enableHalfChecked   | 没用                                                                                      |
| enableIndexbar      | 启用 indexbar 时渲染, 外层包裹 indexbar                                                   | boolean                                                    |
| getComboDOM         | 没用                                                                                      |
| maskClosable        | 是否点击阴影可关闭                                                                        | boolean                                                    | true   |
| maskProps = {}      | 阴影部分属性                                                                              |
| modal               | 弹窗类型: page 页面; 其它弹窗(默认)                                                       |
| MainComponent       | 自定义 Main 组件                                                                          |
| MainProps           | 自定义 Main 组件对应的属性[ListPicker.Main](#listpickermain-属性)                         |
| pageProps = {}      | 同'library/components/Layout'                                                             |
| portal              | Modal 根节点                                                                              |                                                            |
| preserveValue       | 保留不在树结构中的 value                                                                  |
| selectable          | 没用                                                                                      |
| showCheckedStrategy | 没用                                                                                      |
| submitProps = {}    | 参考'library/deprecated/Modal'.Picker.submitProps                                         |
| TreeProps           | 没用                                                                                      |
| visible             |                                                                                           | boolean                                                    | false  |
| zIndex              | 弹窗层级排序                                                                              |
| onVisibleChange     | Modal 显隐事件                                                                            |

## ListPicker.Main

<code src="./demos/Main/index.jsx"></code>

### ListPicker.Main 属性

| 属性           | 说明                                    | 类型                             | 默认值 |
| -------------- | --------------------------------------- | -------------------------------- | ------ |
| cache          | 缓存                                    | {name, value}                    |        |
| enableIndexbar | 启用 indexbar 时渲染, 外层包裹 indexbar | boolean                          |
| messageProps   | 消息提示的样式                          | 同'library/components/Exception' |
| onScroll       | 列表主体滚动事件                        |
| onSubmit       | 点击 Footer 提交按钮事件                |

### 公共属性

| 属性                  | 说明                                                                                                                      | 类型                                                                                                                                                       | 默认值                       |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| checkable             | 是否可选中                                                                                                                | boolean \| 'checkbox' \| 'tick' \| 'corner'                                                                                                                | true                         |
| checkboxProps         | 当 listRender 不为 function 且 itemRender 为 function; 组件并未关心内容                                                   | unknown                                                                                                                                                    |
| disabledIds           | 不能用的选项条目                                                                                                          | string[]                                                                                                                                                   |
| enableTopRefresh      | 是否允许下拉刷新, 未赋值时将跟随 pagination                                                                               | boolean\|void                                                                                                                                              |
| fieldNames            | 数据取值映射                                                                                                              | {id: string, name: string}                                                                                                                                 | {id: 'id', name: 'name'}     |
| footerBar             | 底部操作区；页面模式且未设置底部操作区，则默认显示确定按钮；若设置了底部确定按钮，则隐藏头部确定；[footerBar](#footerbar) |
| footerRender          | 自定义渲染 Footer                                                                                                         | ({footerBar, multiple, checkable, value, disabledIds, result: 查询结果(any), list, onChange})=> JSX.Element \| null                                        |
| head                  | 请求头                                                                                                                    |
| headerRender          | 自定义渲染 Header                                                                                                         | ({multiple, checkable, value, disabledIds, result, list, onBeforeChange, onChange}) => JSX.Element \| null                                                 |
| itemContentRender     | 自定义渲染列表条目                                                                                                        | (item, index, { checked, multiple, checkable, value, disabledIds, onChange }) => JSX.Element \| null                                                       |
| itemProps             | 自定义列表条目属性                                                                                                        | {index, checked, disabled, contentDOM, checkable, onClick}                                                                                                 |
| itemRender            | 和 itemContentRender 异曲同工                                                                                             | (item, index, {itemProps, checkboxProps, multiple, checkable, value, disabledIds, onChange}) => JSX.Element \| null                                        |
| list                  | 非接口查询数据，业务传入的数据                                                                                            |
| listExtraHeaderRender | 列表上方扩展展示                                                                                                          | ({ multiple, checkable, value, disabledIds, result, list, onChange }) => JSX.Element \| null                                                               |
| listExtraFooterRender | 列表下方扩展展示                                                                                                          | 同 listExtraHeaderRender                                                                                                                                   |
| listFilter            | 自定义数据过滤方法                                                                                                        | ({list, params}) => any[]                                                                                                                                  |
| listFooterRender      | 列表下方扩展，列表主体和 Footer 间的内容                                                                                  | ({multiple, checkable, value, disabledIds, result, list, onBeforeChange, onChange}) => JSX.Element \| null                                                 |
| listHeaderRender      | 列表上方扩展，Toolbar 和列表主体间的内容                                                                                  | 同 listFooterRender                                                                                                                                        |
| listRender            | 渲染列表                                                                                                                  | ({fieldNames, multiple, checkable, itemRender, itemProps, itemContentRender, result, list, value, disabledIds, onSelect, onChange}) => JSX.Element \| null |
| multiple              | 是否多选                                                                                                                  | boolean                                                                                                                                                    |
| pagination            | 是否分页 未设置 enableTopRefresh, 分页为 true，则 enableTopRefresh 为 true                                                | boolean                                                                                                                                                    |
| paramNames            | 自定义参数的命名                                                                                                          | {page, rows, total, totalPage}                                                                                                                             | {page: 'page', rows: 'rows'} |
| params                | 数据查询参数                                                                                                              |
| toolbar               | 工具                                                                                                                      |
| toolbarProps          | 工具栏自定义参数                                                                                                          | {portal, toolbar, controlled: boolean, onChange}                                                                                                           |
| url                   | 数据查询接口地址                                                                                                          | string                                                                                                                                                     |                              |
| value                 | 值                                                                                                                        | {id, name}[]                                                                                                                                               |
| onBeforeChange        | 变更前执行，看是否能继续 change                                                                                           | (value) => Promise<boolean>                                                                                                                                |
| onChange              | 数据变更事件                                                                                                              | (list) => void                                                                                                                                             |
| onParams              | 数据查询前的参数处理函数                                                                                                  | (query, action: 'topRefresh' \| 'bottomRefresh' \| 'search' \| 'load') => newQuery                                                                         |
| onLoadAfter           | 数据加载成功后事件                                                                                                        | (list) => void                                                                                                                                             |
| onLoadSuccess         | 离线数据的数据解析，即对业务传入的 list 进行解析                                                                          | (list) => newList                                                                                                                                          |
| onSelect              | 列表条目选中事件, 自定义判断是否能选中当前条目                                                                            | (item, { event }) => boolean                                                                                                                               |
| onToolbarChange       | toolbar 变更事件                                                                                                          |
| onToolbarParams       | 查询数据处理入参事件                                                                                                      |

#### footerBar

| 属性              | 说明                          | 类型                                                                                                                          | 默认值 |
| ----------------- | ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ------ |
| portal            | 面板中 footer 的根节点        | Element \| DocumentFragment                                                                                                   |
| renderExtra       | 额外的渲染内容                | ({multiple: boolean, list: 同 list, value: 同 value, selectAllVisible: 有数据&多选&selectAll 为 true}) => JSX.Element \| null |
| selectAll         | 是否允许选择全部              | boolean                                                                                                                       |
| SelectedComponent | 自定义已选项展示组件          | ({ portal, value: 同 value, getListNode: listRender 或默认列表渲染, onBeforeChange, onChange }) => JSX.Element \| null        |
| submit            | 确定按钮文本                  | ({multiple, value}) => JSX.Element \| null                                                                                    |
| viewSelect        | 和 SelectedComponent 异曲同工 |
