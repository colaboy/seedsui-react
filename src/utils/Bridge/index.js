import Bridge from './Bridge.js'
import back from './utils/back'
import coordToFit from './utils/coordToFit'
import ready from './utils/ready'

Bridge._back = back
Bridge._coordToFit = coordToFit
Bridge._ready = ready
export default Bridge
