import React from 'react'

// 内库使用-start
import LocaleUtil from './../../../utils/LocaleUtil'
import Result from './../../Result'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil, Result } from 'seedsui-react'
测试使用-end */

const ResultMessage = ({ type }) => {
  return (
    <Result
      className="listpicker-main-error"
      image={`${
        type === 'noData'
          ? '//res.waiqin365.com/d/waiqin365_h5/components/empty.png'
          : '//res.waiqin365.com/d/waiqin365_h5/components/error.png'
      }`}
      title={`${
        type === 'noData'
          ? LocaleUtil.locale('暂无数据')
          : LocaleUtil.locale('获取数据失败，请稍后再试！')
      }`}
    />
  )
}

export default ResultMessage
