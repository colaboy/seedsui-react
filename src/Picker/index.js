import Combo from './Combo'
import Modal from './Modal'
import Main from './Main'

// export default {
//   Combo: Combo,
//   Modal: Modal,
//   Main: Main
// }

// 即将废弃, 用于过渡
import Deprecated from './Deprecated/Picker'
Deprecated.Combo = Combo
Deprecated.Modal = Modal
Deprecated.Main = Main

export default Deprecated
