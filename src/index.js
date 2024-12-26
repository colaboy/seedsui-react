import './assets/style/index.less'
// import BScroll from 'better-scroll'
import './PrototypeArray.js'
import './PrototypeMath.js'
import './PrototypeObject.js'
import './PrototypeString.js'
import './PrototypeNumber.js'
import './PrototypeDate.js'
// import './PrototypePinyin.js' // 不常用

// dayjs国际化, 常用插件: https://day.js.org/docs/en/plugin/plugin
import 'dayjs/locale/zh-cn'
import dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import quarterOfYear from 'dayjs/plugin/quarterOfYear'
import advancedFormat from 'dayjs/plugin/advancedFormat'

// Test locale: start
// import 'dayjs/locale/zh-cn'
// dayjs.locale('zh-cn')
// Test locale: end

// 引入插件
dayjs.extend(isoWeek) // 用于解决format时报错:isoWeek
dayjs.extend(weekOfYear) // 用于解决format时报错:week
dayjs.extend(quarterOfYear)
dayjs.extend(advancedFormat) // 支持高级format

// 记录版本号
const packageJson = require('./../package.json')
if (packageJson?.version) {
  window.seedsVersion = packageJson.version
}

export { default as locale } from './locale'
export { default as Actionsheet } from './components/Actionsheet'
export { default as Alert } from './Alert' // (废弃, 使用Modal代替)
export { default as Modal } from './Modal'
export { default as Attach } from './Attach'
export { default as Upload } from './Upload'
export { default as Badge } from './Badge'
export { default as BiClock } from './BiClock' // 不常用
export { default as BiDoughnut } from './BiDoughnut' // 不常用
export { default as BiGauge } from './BiGauge' // 不常用
export { default as Button } from './Button'
export { default as Calendar } from './components/Calendar' // 不常用
export { default as Camera } from './Camera' // 不常用
export { default as Card } from './Card'
export { default as Carrousel } from './Carrousel'
export { default as Cascader } from './Cascader'
export { default as Chat } from './Chat'
export { default as Checkbox } from './Checkbox' // (废弃, 使用Select.Checkbox代替)
export { default as ConfigProvider } from './ConfigProvider' // 不常用
export { default as Container } from './Container'
export { default as ContainerPull } from './ContainerPull'
export { default as Body } from './Body'
export { default as Context } from './Context' // 不常用
export { default as Counter } from './Counter' // 不常用
export { default as DatePicker } from './components/DatePicker'
export { default as DateRangePopover } from './DateRangePopover' // (废弃, 使用Tooltip代替)
export { default as DateType } from './DateType' // (废弃, 使用DatePicker.Types代替)
export { default as Dialog } from './Dialog' // (废弃, 使用Modal代替)
export { default as Dot } from './Dot'
export { default as Dragrefresh } from './Dragrefresh'
export { default as Dropdown } from './Dropdown'
export { default as Ellipsis } from './Ellipsis'
export { default as Emoji } from './Emoji' // 不常用
export { default as FixTable } from './FixTable' // 不常用
export { default as Footer } from './Footer'
export { default as Group } from './Group'
export { default as Handsign } from './Handsign' // (废弃, 使用Signature代替)
export { default as Signature } from './Signature'
export { default as Skeleton } from './Skeleton'
export { default as Header } from './Header'
export { default as HighlightKeyword } from './HighlightKeyword'
export { default as ImgMark } from './ImgMark'
export { default as IndexBar } from './IndexBar'
export { default as Input } from './Input'
export { default as InputArea } from './InputArea' // (废弃, 使用Input.Textarea代替)
export { default as InputCity } from './InputCity'
export { default as InputDistrict } from './InputDistrict' // (废弃, 使用Cascader.DistrictCombo代替)
export { default as InputDate } from './InputDate' // (废弃, 使用DatePicker.Combo代替)
export { default as InputLocation } from './InputLocation' // (废弃, 使用Location.Combo代替)
export { default as InputNumber } from './InputNumber' // (废弃, 使用Input.Number代替)
export { default as InputPassword } from './InputPassword' // (废弃, 使用Input.Password代替)
export { default as InputTel } from './InputTel' // (废弃, 使用Input.Tel代替)
export { default as InputPicker } from './InputPicker' // (废弃, Picker.Combo代替)
export { default as InputPre } from './InputPre' // (废弃, 使用Input.AutoFit代替)
export { default as InputSelect } from './InputSelect' // (废弃, 使用Select.Combo代替)
export { default as InputStar } from './InputStar'
export { default as InputText } from './InputText' // (废弃, 使用Input.Text代替)
export { default as Layout } from './Layout'
export { default as Jcrop } from './Jcrop' // 不常用,裁切功能,使用了第三方插件的组件npm i jcrop
export { default as Legend } from './Legend'
export { default as ListPull } from './ListPull' // 不常用
export { default as Loading } from './Loading'
export { default as Location } from './Location'
export { default as LotteryWheel } from './LotteryWheel' // 不常用
export { default as MapChoose } from './MapChoose' // 不常用
export { default as MapView } from './MapView' // 不常用
export { default as Mark } from './Mark'
export { default as Marquee } from './Marquee'
export { default as MenuTiled } from './MenuTiled'
export { default as MenuTree } from './MenuTree'
export { default as VideoFull } from './VideoFull' // 不常用
export { default as Videos } from './Videos' // 不常用
export { default as Vott } from './Vott' // 不常用
export { default as NoData } from './NoData'
export { default as Notice } from './Notice'
export { default as NumBox } from './NumBox' // (废弃, 使用Input.NumberBox代替)
export { default as OnOff } from './OnOff' // (废弃, 使用Switch代替)
export { default as Page } from './Page' // (废弃, 使用Layout代替)
export { default as PagePull } from './PagePull' // 不常用
export { default as PDFView } from './PDFView' // 不常用
export { default as Peg } from './Peg' // 不常用
export { default as Photos } from './Photos' // 废弃，使用Image代替
export { default as Image } from './Image'
export { default as Picker } from './Picker'
export { default as PickerCity } from './PickerCity'
export { default as PickerDistrict } from './PickerDistrict'
export { default as PickerDate } from './PickerDate'
export { default as Player } from './Player' // 不常用
export { default as PlayerDialog } from './Player/PlayerDialog' // 不常用
export { default as Popover } from './Popover'
export { default as Preview } from './Preview' // 不常用
export { default as Progress } from './Progress'
export { default as QRCode } from './QRCode' // 不常用
export { default as Radio } from './Radio' // (废弃, 使用Select.Checkbox代替)
export { default as Select } from './Select'
export { default as SafeArea } from './SafeArea'
export { default as Selector } from './Selector'
export { default as Share } from './Share' // 不常用
export { default as PickerSelect } from './PickerSelect' // (废弃, 使用Select.Modal代替)
export { default as Star } from './Star'
export { default as Stencil } from './Stencil' // 不常用
export { default as Sticker } from './Sticker' // 不常用
export { default as Swiper } from './Swiper' // 使用了第三方插件的组件
export { default as Switch } from './Switch'
export { default as Tabbar } from './Tabbar' // (废弃, 使用Tabs代替)
export { default as Tabs } from './Tabs'
export { default as Ticket } from './Ticket' // 不常用
export { default as Timeline } from './Timeline' // 不常用
export { default as Timepart } from './Timepart' // 不常用
export { default as Titlebar } from './Titlebar'
export { default as Toast } from './Toast'
export { default as Tooltip } from './Tooltip'
export { default as Tree } from './Tree' // (废弃, 使用TreePicker代替)
export { default as TreePicker } from './TreePicker'
export { default as Transfer } from './Transfer'

// utils
export { default as Ajax } from './Ajax' // 不常用
export { default as Animate } from './Animate' // 不常用
export { default as ApiAxios } from './ApiAxios'
// export { default as ApiSuperagent } from './ApiSuperagent'; // 与Axios同类型,推荐使用Axios
export { default as BackboneRoute } from './BackboneRoute' // 不常用
export { default as CanvasUtil } from './CanvasUtil' // 不常用
export { default as DB } from './DB'
export { default as Debugger } from './Debugger'
export { default as Device } from './Device'
export { default as Form } from './Form' // 不常用
export { default as FullScreen } from './FullScreen' // 不常用
export { default as GeoUtil } from './GeoUtil' // 不常用
export { default as ImgLazy } from './ImgLazy'
export { default as Row } from './Row'
export { default as Col } from './Col'

export { default as MapUtil } from './MapUtil' // 不常用
export { default as Map } from './Map'
export { default as Clipboard } from './Clipboard'
export { default as Observer } from './Observer'
export { default as EditUtil } from './EditUtil' // 不常用
export { default as EventUtil } from './EventUtil' // 不常用
export { default as FastClick } from './FastClick'
export { default as jsonp } from './jsonp' // 不常用
export { default as MediaUtil } from './MediaUtil' // 不常用
export { default as PubSub } from './PubSub' // 不常用
// export { default as ValidateID } from './ValidateID' // 不常用
// export { default as Validator } from './Validator' // 不常用
export { default as ArrayUtil } from './ArrayUtil'
export { default as MathUtil } from './MathUtil'
export { default as DateUtil } from './components/DateUtil'
export { default as useSyncCallback } from './useSyncCallback'
export { default as ReduxRequestMiddleware } from './ReduxRequestMiddleware'
export { default as Bridge } from './Bridge'
