import React from 'react'

// 内库使用-start
import LocaleUtil from './../../../utils/LocaleUtil'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil } from 'seedsui-react'
测试使用-end */

function getStatusDefault(status) {
  if (status === 'empty') {
    return {
      title: LocaleUtil.locale('暂无数据', 'SeedsUI_no_data'),
      image: <div className="result-image result-image-empty"></div>
    }
  }
  if (status === '500') {
    return {
      title: LocaleUtil.locale('获取数据失败，请稍后再试！', 'SeedsUI_query_data_error'),
      image: <div className="result-image result-image-500"></div>
    }
  }
  return null
}

export default getStatusDefault
