import React from 'react'
import Ocr from './../utils/Ocr'

function getUploadDOM({ isAI, isFake, ocrType, ext }) {
  let uploadButton = null
  if (isAI && ext?.realTimeRecognition === 0) {
    // AI非实时识别
    uploadButton = (
      <i
        className="image-upload-picture"
        style={{
          backgroundImage: `url(//res.waiqin365.com/d/waiqin365_h5/components/aipicdelay.png)`
        }}
      ></i>
    )
  } else if (isAI) {
    // AI实时识别(默认),  && ext?.realTimeRecognition === 1
    uploadButton = (
      <i
        className="image-upload-picture"
        style={{
          backgroundImage: `url(//res.waiqin365.com/d/waiqin365_h5/components/realaipic.png)`
        }}
      ></i>
    )
  } else if (isFake) {
    // 虚假照片
    uploadButton = (
      <i
        className="image-upload-picture"
        style={{
          backgroundImage: `url(//res.waiqin365.com/d/waiqin365_h5/components/fakepic.png)`
        }}
      ></i>
    )
  } else if (ocrType) {
    // OCR识别
    uploadButton = (
      <span className="image-upload-illustrator">
        <i className="icon icon-scan-card"></i>
        {/* 1.名片识别 6.营业执照识别 7.身份证识别 */}
        <span className="image-upload-illustrator-text">{Ocr.enums[ocrType]}</span>
      </span>
    )
  }
  return uploadButton
}

export default getUploadDOM
