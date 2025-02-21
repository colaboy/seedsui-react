// 内库使用-start
import LocaleUtil from './../../../utils/LocaleUtil'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil } from 'seedsui-react'
测试使用-end */

function validateType(type) {
  return ['country', 'province', 'city', 'district', 'street'].includes(type)
    ? ''
    : LocaleUtil.locale(
        'type只支持: province, city, district, street',
        'SeedsUI_cascader_incorrect_parameter'
      )
}

export default validateType
