import Modal from './Modal'
import Alert from './Alert/index'
import Confirm from './Confirm/index'
import Combo from './Combo'
import Picker from './Picker'
import SubModal from './Modal'

import alert from './alert'
import confirm from './confirm'
import destroy from './destroy'

// Components
Modal.Alert = Alert
Modal.Confirm = Confirm
Modal.Combo = Combo
Modal.Picker = Picker
Modal.Modal = SubModal

// Js Api
Modal.alert = alert
Modal.confirm = confirm
Modal.destroy = destroy

export default Modal
