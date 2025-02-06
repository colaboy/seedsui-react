import Modal from './Modal'
import Combo from './Combo'
import ModalPicker from './ModalPicker'

import alert from './api/alert'
import confirm from './api/confirm'
import destroy from './api/destroy'
import getClassNameByAnimation from './api/getClassNameByAnimation'

// Components
Modal.Combo = Combo
Modal.ModalPicker = ModalPicker

// Js Api
Modal.alert = alert
Modal.confirm = confirm
Modal.destroy = destroy
Modal.getClassNameByAnimation = getClassNameByAnimation

export default Modal
