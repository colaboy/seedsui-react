import React from 'react'

// 内库使用-start
import LocaleUtil from './../../../../utils/LocaleUtil'
import Result from './../../../Result'
import Button from './../../../Button'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil, Result, Button } from 'seedsui-react'
测试使用-end */

// 暂无数据或者错误
const ResultMessage = ({ type, onRetry }) => {
  function getErrMsg() {
    if (type === 'noData') {
      return LocaleUtil.locale('暂无数据', 'SeedsUI_no_data')
    }
    if (type === 'error') {
      return LocaleUtil.locale('获取数据失败，请稍后再试！', 'SeedsUI_query_data_error')
    }

    // Custom error message
    return type
  }

  if (!type || typeof type !== 'string') return null

  return (
    <Result
      className="list-result-message"
      image={`${
        type === 'noData'
          ? '//res.waiqin365.com/d/waiqin365_h5/components/empty.png'
          : '//res.waiqin365.com/d/waiqin365_h5/components/error.png'
      }`}
      title={getErrMsg()}
    >
      {type !== 'noData' && (
        <Button className="list-result-message-button" onClick={onRetry}>
          {LocaleUtil.locale('重试', 'SeedsUI_retry')}
        </Button>
      )}
    </Result>
  )
}

export default ResultMessage
