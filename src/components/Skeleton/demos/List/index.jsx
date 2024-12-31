import React from 'react'

// 内库使用
import { Skeleton } from 'seedsui-react'

// 测试使用
// import Skeleton from 'library/components/Skeleton'

export default () => {
  return (
    <>
      <Skeleton.List animated={false} />
    </>
  )
}
