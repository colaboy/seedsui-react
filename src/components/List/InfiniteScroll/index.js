import React from 'react'

// 内库使用-start
import LocaleUtil from './../../../utils/LocaleUtil'
import Loading from './../../Loading'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil, Loading } from 'seedsui-react'
测试使用-end */

// type: loading | noMore | [error|自定义错误信息]
const InfiniteScroll = ({ type }) => {
  function getStatusNode() {
    if (!type || typeof type !== 'string') return null

    if (type === 'loading') {
      return (
        <div className={`list-infinitescroll-wrapper`}>
          <div className="list-infinitescroll-text">
            {LocaleUtil.locale('加载中', 'SeedsUI_refreshing')}
          </div>
          <div className="list-infinitescroll-icon">
            <Loading.BallWave />
          </div>
        </div>
      )
    }
    if (type === 'noMore') {
      return (
        <div className={`list-infinitescroll-wrapper`}>
          <div className="list-infinitescroll-text">
            {LocaleUtil.locale('没有更多了', 'SeedsUI_no_more_data')}
          </div>
        </div>
      )
    }
    return (
      <div className={`list-infinitescroll-wrapper`}>
        <div className="list-infinitescroll-text">
          {type === 'error'
            ? LocaleUtil.locale('获取数据失败，请稍后再试！', 'SeedsUI_query_data_error')
            : type}
        </div>
      </div>
    )
  }

  return <div className={`list-infinitescroll`}>{getStatusNode()}</div>
}

export default InfiniteScroll
