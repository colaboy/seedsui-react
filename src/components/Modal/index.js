import Modal from './Modal'
import SelectCombo from './SelectCombo'
import SelectModal from './SelectModal'

import alert from './api/alert'
import confirm from './api/confirm'
import destroy from './api/destroy'
import getClassNameByAnimation from './api/getClassNameByAnimation'

// Select Combo
Modal.SelectCombo = SelectCombo
Modal.SelectModal = SelectModal

// Js Api
Modal.alert = alert
Modal.confirm = confirm
Modal.destroy = destroy
Modal.getClassNameByAnimation = getClassNameByAnimation

export default Modal
