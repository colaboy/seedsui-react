import Upload from './Upload'

import supportTypes from './utils/supportTypes'
import validateListStatus from './utils/validateListStatus'
import Button from './UploadButton/Button'
import Base from './Base'

Upload.supportTypes = supportTypes
Upload.validateListStatus = validateListStatus
Upload.Button = Button
Upload.Base = Base
export default Upload
