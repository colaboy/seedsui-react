import Modal from './BaseModal'
import Combo from './Combo'
import ComboModal from './Modal'

import alert from './api/alert'
import confirm from './api/confirm'
import destroy from './api/destroy'
import getClassNameByAnimation from './api/getClassNameByAnimation'

// Components
Modal.Combo = Combo
Modal.Modal = ComboModal

// Js Api
Modal.alert = alert
Modal.confirm = confirm
Modal.destroy = destroy
Modal.getClassNameByAnimation = getClassNameByAnimation

export default Modal
