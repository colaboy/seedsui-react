import Combo from './Combo'
import Modal from './Modal'

// export default {
//   Combo: Combo,
//   Modal: Modal
// }

// 即将废弃, 用于过渡
import Deprecated from './Deprecated/Actionsheet'

Deprecated.Combo = Combo
Deprecated.Modal = Modal

export default Deprecated
