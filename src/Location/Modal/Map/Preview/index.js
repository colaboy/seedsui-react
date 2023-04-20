import React from 'react'
import Choose from './../Choose'

// 查看
function Preview({ ...props }) {
  return <Choose {...props} readOnly={true} />
}
export default Preview
