import React from 'react'

// 内库使用-start
import LocaleUtil from './../../../utils/LocaleUtil'
import Result from './../../Result'
import Button from './../../Button'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil, Result, Button } from 'seedsui-react'
测试使用-end */

const ResultMessage = ({ type, onRetry }) => {
  return (
    <Result
      className="list-result-message"
      image={`${
        type === 'error'
          ? '//res.waiqin365.com/d/waiqin365_h5/components/error.png'
          : '//res.waiqin365.com/d/waiqin365_h5/components/empty.png'
      }`}
      title={`${
        type === 'error'
          ? LocaleUtil.locale('获取数据失败，请稍后再试！')
          : LocaleUtil.locale('暂无数据')
      }`}
    >
      {type === 'error' && (
        <Button className="list-result-message-button" onClick={onRetry}>
          {LocaleUtil.locale('重试')}
        </Button>
      )}
    </Result>
  )
}

export default ResultMessage
