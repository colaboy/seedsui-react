import './assets/index.less'

import DateUtil from './utils/DateUtil'
import LocaleUtil from './utils/LocaleUtil'
DateUtil.initialize()
// LocaleUtil.setLanguage('en_US')

// 记录版本号
const packageJson = require('./../package.json')
if (packageJson?.version) {
  window.seedsVersion = packageJson.version
}

// 记录平台: window.seedsPlatform
// 记录语言: window.seedsLocaleLanguage, window.seedsLocaleData

export { default as ActionSheet1 } from './components/ActionSheet1'
export { default as Modal } from './components/Modal'
export { default as Upload } from './components/Upload'
export { default as Badge } from './components/Badge'
export { default as Button } from './components/Button'
export { default as Calendar } from './components/Calendar'
export { default as Card } from './components/Card'
export { default as Cascader } from './components/Cascader'
export { default as Chat } from './components/Chat'
export { default as Checkbox } from './components/Checkbox'
export { default as DatePicker } from './components/DatePicker'
export { default as Divider } from './components/Divider'
export { default as Signature } from './components/Signature'
export { default as Skeleton } from './components/Skeleton'
export { default as HighlightKeyword } from './components/HighlightKeyword'
export { default as Icon } from './components/Icon'
export { default as IndexBar } from './components/IndexBar'
export { default as Input } from './components/Input'
export { default as Layout } from './components/Layout'
export { default as List } from './components/List'
export { default as Loading } from './components/Loading'
export { default as Location } from './components/Location'
export { default as Mark } from './components/Mark'
export { default as VideoPlayer } from './components/VideoPlayer' // 不常用
export { default as Vott } from './components/Vott' // 不常用
export { default as Result } from './components/Result'
export { default as Image } from './components/Image'
export { default as Picker } from './components/Picker'
export { default as QRCode } from './components/QRCode' // 不常用
export { default as Radio } from './components/Radio' // (废弃, 使用Select.Checkbox代替)
export { default as Select } from './components/Select'
export { default as SafeArea } from './components/SafeArea'
export { default as Selector } from './components/Selector'
export { default as Share } from './components/Share' // 不常用
export { default as Switch } from './components/Switch'
export { default as TabBar } from './components/TabBar'
export { default as Toast } from './components/Toast'
export { default as Tooltip } from './components/Tooltip'
export { default as TreePicker } from './components/TreePicker'
export { default as Transfer } from './components/Transfer'
export { default as Row } from './components/Row'
export { default as Map } from './components/Map'

// utils
// export { default as ApiSuperagent } from './ApiSuperagent'; // 与Axios同类型,推荐使用Axios
export { default as Debugger } from './utils/Debugger'
export { default as Device } from './utils/Device'
export { default as FullScreen } from './utils/FullScreen'
export { default as GeoUtil } from './utils/GeoUtil'
export { default as AssetUtil } from './utils/AssetUtil'
export { default as Bridge } from './utils/Bridge'
export { default as Clipboard } from './utils/Clipboard'
export { default as EventUtil } from './utils/EventUtil'
export { default as ArrayUtil } from './utils/ArrayUtil'
export { default as MathUtil } from './utils/MathUtil'
export { default as Request } from './utils/Request'
export { DateUtil, LocaleUtil }
