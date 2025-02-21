import React from 'react'

// 内库使用-start
import Skeleton from './../../Skeleton'
import Loading from './../../Loading'
// 内库使用-end

/* 测试使用-start
import { Skeleton, Loading } from 'seedsui-react'
测试使用-end */

// 暂无数据或者错误
const MainLoading = ({ type, loading }) => {
  if (loading === 'function') {
    return loading({ action: type })
  }
  if (type === 'load' || type === 'retry') {
    return <Skeleton.List animated={false} />
  }
  if (type === 'reload') {
    return <Loading />
  }
  return null
}

export default MainLoading
