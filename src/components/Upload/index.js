import Upload from './Upload'

import supportTypes from './utils/supportTypes'
import validateListStatus from './utils/validateListStatus'
import List from './Base/List'
import Button from './Base/Choose/Button'

Upload.supportTypes = supportTypes
Upload.validateListStatus = validateListStatus
Upload.List = List
Upload.Button = Button

export default Upload
