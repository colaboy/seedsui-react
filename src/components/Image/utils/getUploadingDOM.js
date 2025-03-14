import React from 'react'

import Loading from 'library/components/Loading'
import locale from 'library/utils/locale'

function getUploadingDOM(ocrType) {
  // ocr识别时使用识别中
  if (ocrType) {
    return (
      <div className="photos-upload-loading">
        <Loading.Dash />
        <p className="photos-upload-loading-label">
          {locale('识别中', 'library.09c2678163a07d6396ee6859cc9a92c4')}...
        </p>
      </div>
    )
  }
  // 其它使用默认加载图
  return true
}

export default getUploadingDOM
