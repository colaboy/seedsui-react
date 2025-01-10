import './assets/style/index.less'
// import BScroll from 'better-scroll'
import './deprecated/PrototypeArray.js'
import './deprecated/PrototypeMath.js'
import './deprecated/PrototypeObject.js'
import './deprecated/PrototypeString.js'
import './deprecated/PrototypeNumber.js'
import './deprecated/PrototypeDate.js'
// import './deprecated/PrototypePinyin.js' // 不常用

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

export { default as locale } from './utils/locale'
export { default as ActionSheet } from './components/ActionSheet'
export { default as Alert } from './deprecated/Alert' // (废弃, 使用Modal代替)
export { default as Modal } from './components/Modal'
export { default as Attach } from './deprecated/Attach'
export { default as Upload } from './components/Upload'
export { default as Badge } from './components/Badge'
export { default as BiClock } from './deprecated/BiClock' // 不常用
export { default as BiDoughnut } from './deprecated/BiDoughnut' // 不常用
export { default as BiGauge } from './deprecated/BiGauge' // 不常用
export { default as Button } from './components/Button'
export { default as Calendar } from './components/Calendar' // 不常用
export { default as Camera } from './deprecated/Camera' // 不常用
export { default as Card } from './components/Card'
export { default as Carrousel } from './deprecated/Carrousel'
export { default as Cascader } from './components/Cascader'
export { default as Chat } from './components/Chat'
export { default as Checkbox } from './components/Checkbox' // (废弃, 使用Select.Checkbox代替)
export { default as ConfigProvider } from './deprecated/ConfigProvider' // 不常用
export { default as Container } from './deprecated/Container'
export { default as ContainerPull } from './deprecated/ContainerPull'
export { default as Body } from './deprecated/Body'
export { default as Context } from './deprecated/Context' // 不常用
export { default as Counter } from './deprecated/Counter' // 不常用
export { default as DatePicker } from './components/DatePicker'
export { default as DateRangePopover } from './deprecated/DateRangePopover' // (废弃, 使用Tooltip代替)
export { default as DateType } from './deprecated/DateType' // (废弃, 使用DatePicker.Types代替)
export { default as Dialog } from './deprecated/Dialog' // (废弃, 使用Modal代替)
export { default as Dot } from './deprecated/Dot'
export { default as Dragrefresh } from './deprecated/Dragrefresh'
export { default as Dropdown } from './deprecated/Dropdown'
export { default as Ellipsis } from './deprecated/Ellipsis'
export { default as Emoji } from './deprecated/Emoji' // 不常用
export { default as FixTable } from './deprecated/FixTable' // 不常用
export { default as Footer } from './deprecated/Footer'
export { default as Group } from './deprecated/Group'
export { default as Handsign } from './deprecated/Handsign' // (废弃, 使用Signature代替)
export { default as Signature } from './components/Signature'
export { default as Skeleton } from './components/Skeleton'
export { default as Header } from './deprecated/Header'
export { default as HighlightKeyword } from './components/HighlightKeyword'
export { default as ImgMark } from './deprecated/ImgMark'
export { default as IndexBar } from './components/IndexBar'
export { default as Input } from './components/Input'
export { default as InputArea } from './deprecated/InputArea' // (废弃, 使用Input.Textarea代替)
export { default as InputCity } from './deprecated/InputCity'
export { default as InputDistrict } from './deprecated/InputDistrict' // (废弃, 使用Cascader.DistrictCombo代替)
export { default as InputDate } from './deprecated/InputDate' // (废弃, 使用DatePicker.Combo代替)
export { default as InputLocation } from './deprecated/InputLocation' // (废弃, 使用Location.Combo代替)
export { default as InputNumber } from './deprecated/InputNumber' // (废弃, 使用Input.Number代替)
export { default as InputPassword } from './deprecated/InputPassword' // (废弃, 使用Input.Password代替)
export { default as InputTel } from './deprecated/InputTel' // (废弃, 使用Input.Tel代替)
export { default as InputPicker } from './deprecated/InputPicker' // (废弃, Picker.Combo代替)
export { default as InputPre } from './deprecated/InputPre' // (废弃, 使用Input.AutoFit代替)
export { default as InputSelect } from './deprecated/InputSelect' // (废弃, 使用Select.Combo代替)
export { default as InputStar } from './deprecated/InputStar'
export { default as InputText } from './deprecated/InputText' // (废弃, 使用Input.Text代替)
export { default as Layout } from './components/Layout'
export { default as Jcrop } from './deprecated/Jcrop' // 不常用,裁切功能,使用了第三方插件的组件npm i jcrop
export { default as Legend } from './deprecated/Legend'
export { default as ListPull } from './deprecated/ListPull' // 不常用
export { default as Loading } from './components/Loading'
export { default as Location } from './components/Location'
export { default as LotteryWheel } from './deprecated/LotteryWheel' // 不常用
export { default as MapChoose } from './deprecated/MapChoose' // 不常用
export { default as MapView } from './deprecated/MapView' // 不常用
export { default as Mark } from './components/Mark'
export { default as Marquee } from './deprecated/Marquee'
export { default as MenuTiled } from './deprecated/MenuTiled'
export { default as MenuTree } from './deprecated/MenuTree'
export { default as VideoFull } from './deprecated/VideoFull' // 不常用
export { default as Videos } from './deprecated/Videos' // 不常用
export { default as Vott } from './components/Vott' // 不常用
export { default as Result } from './components/Result'
export { default as Notice } from './deprecated/Notice'
export { default as NumBox } from './deprecated/NumBox' // (废弃, 使用Input.NumberBox代替)
export { default as OnOff } from './deprecated/OnOff' // (废弃, 使用Switch代替)
export { default as Page } from './deprecated/Page' // (废弃, 使用Layout代替)
export { default as PagePull } from './deprecated/PagePull' // 不常用
export { default as PDFView } from './deprecated/PDFView' // 不常用
export { default as Peg } from './deprecated/Peg' // 不常用
export { default as Photos } from './deprecated/Photos' // 废弃，使用Image代替
export { default as Image } from './components/Image'
export { default as Picker } from './components/Picker'
export { default as PickerCity } from './deprecated/PickerCity'
export { default as PickerDistrict } from './deprecated/PickerDistrict'
export { default as PickerDate } from './deprecated/PickerDate'
export { default as Player } from './deprecated/Player' // 不常用
export { default as PlayerDialog } from './deprecated/Player/PlayerDialog' // 不常用
export { default as Popover } from './deprecated/Popover'
export { default as Preview } from './deprecated/Preview' // 不常用
export { default as Progress } from './deprecated/Progress'
export { default as QRCode } from './components/QRCode' // 不常用
export { default as Radio } from './components/Radio' // (废弃, 使用Select.Checkbox代替)
export { default as Select } from './components/Select'
export { default as SafeArea } from './components/SafeArea'
export { default as Selector } from './components/Selector'
export { default as Share } from './components/Share' // 不常用
export { default as PickerSelect } from './deprecated/PickerSelect' // (废弃, 使用Select.Modal代替)
export { default as Star } from './deprecated/Star'
export { default as Stencil } from './deprecated/Stencil' // 不常用
export { default as Sticker } from './deprecated/Sticker' // 不常用
export { default as Swiper } from './deprecated/Swiper' // 使用了第三方插件的组件
export { default as Switch } from './components/Switch'
export { default as Tabbar } from './deprecated/Tabbar' // (废弃, 使用Tabs代替)
export { default as Tabs } from './components/Tabs'
export { default as Ticket } from './deprecated/Ticket' // 不常用
export { default as Timeline } from './deprecated/Timeline' // 不常用
export { default as Timepart } from './deprecated/Timepart' // 不常用
export { default as Titlebar } from './deprecated/Titlebar'
export { default as Toast } from './components/Toast'
export { default as Tooltip } from './components/Tooltip'
export { default as Tree } from './deprecated/Tree' // (废弃, 使用TreePicker代替)
export { default as TreePicker } from './components/TreePicker'
export { default as Transfer } from './components/Transfer'

// utils
export { default as Ajax } from './deprecated/Ajax' // 不常用
export { default as Animate } from './deprecated/Animate' // 不常用
export { default as ApiAxios } from './deprecated/ApiAxios'
// export { default as ApiSuperagent } from './ApiSuperagent'; // 与Axios同类型,推荐使用Axios
export { default as BackboneRoute } from './deprecated/BackboneRoute' // 不常用
export { default as CanvasUtil } from './deprecated/CanvasUtil' // 不常用
export { default as DB } from './deprecated/DB'
export { default as Debugger } from './utils/Debugger'
export { default as Device } from './utils/Device'
export { default as Form } from './deprecated/Form' // 不常用
export { default as FullScreen } from './utils/FullScreen' // 不常用
export { default as GeoUtil } from './utils/GeoUtil' // 不常用
export { default as ImgLazy } from './deprecated/ImgLazy'
export { default as Row } from './components/Row'
export { default as Col } from './components/Col'

export { default as MapUtil } from './deprecated/MapUtil' // 不常用
export { default as Map } from './components/Map'
export { default as Clipboard } from './utils/Clipboard'
export { default as EditUtil } from './deprecated/EditUtil' // 不常用
export { default as EventUtil } from './utils/EventUtil' // 不常用
export { default as FastClick } from './deprecated/FastClick'
export { default as jsonp } from './deprecated/jsonp' // 不常用
export { default as MediaUtil } from './deprecated/MediaUtil' // 不常用
export { default as PubSub } from './deprecated/PubSub' // 不常用
// export { default as ValidateID } from './deprecated/ValidateID' // 不常用
// export { default as Validator } from './deprecated/Validator' // 不常用
export { default as ArrayUtil } from './utils/ArrayUtil'
export { default as MathUtil } from './utils/MathUtil'
export { default as DateUtil } from './utils/DateUtil'
export { default as useSyncCallback } from './deprecated/useSyncCallback'
export { default as ReduxRequestMiddleware } from './deprecated/ReduxRequestMiddleware'
export { default as Bridge } from './utils/Bridge'
