import validateImageSrc from './utils/validateImageSrc'
import validateListStatus from './utils/validateListStatus'
import Base from './Base'
import Image from './Image'

Image.validateImageSrc = validateImageSrc
Image.validateListStatus = validateListStatus
Image.Base = Base

export default Image
