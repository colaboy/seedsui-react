import React, { useState, useEffect } from 'react'

// 内库使用-start
import AssetUtil from './../../../../../utils/AssetUtil'
// 内库使用-end

/* 测试使用-start
import { AssetUtil } from 'seedsui-react'
测试使用-end */

// 图片显示
const RemainCount = ({ count }) => {
  return <div className={`image-item-remain-count`}>+{count}</div>
}

export default RemainCount
