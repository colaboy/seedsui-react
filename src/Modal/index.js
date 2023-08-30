import Modal from './Modal'
import Dropdown from './Dropdown'
import Alert from './Alert/index'
import Confirm from './Confirm/index'

import alert from './alert'
import confirm from './confirm'
import destroy from './destroy'

// Components
Modal.Dropdown = Dropdown
Modal.Alert = Alert
Modal.Confirm = Confirm

// Js Api
Modal.alert = alert
Modal.confirm = confirm
Modal.destroy = destroy

export default Modal
