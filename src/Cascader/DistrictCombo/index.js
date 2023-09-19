import React, { forwardRef } from 'react'
// 测试使用
// import BaseCombo from 'seedsui-react/lib/Select/Combo'
// 内库使用
import BaseCombo from './../../Select/Combo'

import DistrictModal from './../DistrictModal'

// 级联选择
const DistrictCombo = forwardRef(
  (
    {
      // Main: Cascader.DistrictModal Control properties
      type = '', // 'country', 'province', 'city', 'district', 'street' (只有中国时才生效, 因为只有中国有省市区)
      min = '',
      // 判断是否是国省市区
      isCountry,
      isProvince,
      isCity,
      isDistrict,
      isStreet,
      value,
      list,
      loadList,
      loadData,
      onBeforeSelectOption,
      optionProps,
      ModalProps,
      // 标准属性
      ...props
    },
    ref
  ) => {
    return (
      <BaseCombo
        ref={ref}
        value={value}
        ModalComponent={DistrictModal}
        ModalProps={{
          type, // 'country', 'province', 'city', 'district', 'street' (只有中国时才生效, 因为只有中国有省市区)
          min,
          // 判断是否是国省市区
          isCountry,
          isProvince,
          isCity,
          isDistrict,
          isStreet,
          value,
          list,
          loadList,
          loadData,
          onBeforeSelectOption,
          optionProps,
          ...ModalProps
        }}
        {...props}
      />
    )
  }
)

export default DistrictCombo
