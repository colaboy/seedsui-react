import validateImageSrc from './utils/validateImageSrc'
import validateListStatus from './utils/validateListStatus'
import Image from './Image'
import Base from './Base'
import Mark from './Base/Mark'
import Preview from './Base/Preview'

Image.validateImageSrc = validateImageSrc
Image.validateListStatus = validateListStatus
Image.Base = Base
Image.Mark = Mark
Image.Preview = Preview

export default Image
