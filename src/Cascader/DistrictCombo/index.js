import React, { forwardRef } from 'react'
import Combo from './../../Select/Combo'
import DistrictModal from './../DistrictModal'

// 级联选择
const DistrictCombo = forwardRef(
  (
    {
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
      // 确定按钮需要根据min来判断显隐
      submitProps,
      ModalProps,
      // 标准属性
      ...props
    },
    ref
  ) => {
    return (
      <Combo
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
          // 确定按钮需要根据min来判断显隐
          submitProps,
          ...ModalProps
        }}
        {...props}
      />
    )
  }
)

export default DistrictCombo
