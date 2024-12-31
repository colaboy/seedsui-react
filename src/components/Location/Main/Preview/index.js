import React, { forwardRef } from 'react'
import Choose from './../Choose'

// 查看
const Preview = forwardRef(({ ...props }, ref) => {
  return <Choose {...props} readOnly={true} ref={ref} />
})
export default Preview
