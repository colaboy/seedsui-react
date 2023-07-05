import React, { forwardRef } from 'react'
import Preview from './Preview'
import Choose from './Choose'

// 地图标注
const Main = forwardRef(
  (
    {
      ak,
      // 值: {latitude: '纬度', longitude: '经度', value: '地址'}
      value,
      onChange,

      type // preview、choose
    },
    ref
  ) => {
    if (type === 'preview') {
      return <Preview ak={ak} value={value} />
    }
    if (type === 'choose') {
      return <Choose ak={ak} value={value} onChange={onChange} />
    }
  }
)

export default Main
