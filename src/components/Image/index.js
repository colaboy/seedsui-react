import validateImageSrc from './utils/validateImageSrc'
import validateListStatus from './utils/validateListStatus'
import Image from './Image'
import Mark from './Base/Mark'
import Preview from './Base/Preview'

Image.validateImageSrc = validateImageSrc
Image.validateListStatus = validateListStatus
Image.Mark = Mark
Image.Preview = Preview

export default Image
