import React from 'react'

// 内库使用-start
import LocaleUtil from './../../../utils/LocaleUtil'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil } from 'seedsui-react'
测试使用-end */

const InfiniteScroll = ({ type }) => {
  function getStatusNode() {
    if (type === 'loading') {
      return LocaleUtil.locale('加载中...')
    }
    if (type === 'error') {
      return LocaleUtil.locale('获取数据失败，请稍后再试！')
    }
    if (type === 'noMore') {
      return LocaleUtil.locale('没有更多了')
    }
  }

  return <div className={`list-main-infinite-scroll`}>{getStatusNode()}</div>
}

export default InfiniteScroll
