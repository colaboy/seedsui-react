import React, { forwardRef } from 'react'
import { testEditableOptions } from './../DistrictMain/utils'
// 测试使用
// import BaseCombo from 'seedsui-react/lib/Select/Combo'
// 内库使用
import BaseCombo from './../../Select/Combo'

import DistrictModal from './../DistrictModal'

// 级联选择
const DistrictCombo = forwardRef(
  (
    {
      // Modal: Cascader.DistrictModal Control properties
      type = '', // 'country', 'province', 'city', 'district', 'street' (只有中国时才生效, 因为只有中国有省市区)
      min = '',

      // Main: DistrictMain Control properties
      isCountry,
      isProvince,
      isMunicipality,
      isCity,
      isDistrict,
      isStreet,
      loadList,
      loadData,
      optionProps,
      editableOptions,
      ModalProps,

      value,
      onChange,
      // Standard properties
      ...props
    },
    ref
  ) => {
    return (
      <BaseCombo
        ref={ref}
        ModalComponent={DistrictModal}
        ModalProps={{
          type, // 'country', 'province', 'city', 'district', 'street' (只有中国时才生效, 因为只有中国有省市区)
          min,
          // 判断是否是国省市区
          isCountry,
          isProvince,
          isMunicipality,
          isCity,
          isDistrict,
          isStreet,
          loadList,
          loadData,
          optionProps,
          editableOptions,
          ...ModalProps
        }}
        value={value}
        onChange={
          onChange
            ? (newValue, ...other) => {
                // 清空只能清空非只读项
                if (editableOptions && !newValue && Array.isArray(value) && value.length) {
                  let newVal = []
                  for (let [index, item] of value.entries()) {
                    let isEditable = testEditableOptions(item, index, {
                      tabs: value,
                      editableOptions,
                      // listData: listRef.current,
                      isCountry,
                      isProvince,
                      isMunicipality,
                      isCity,
                      isDistrict,
                      isStreet
                    })
                    if (isEditable === false) {
                      newVal.push(item)
                    }
                  }
                  // eslint-disable-next-line
                  if (newVal.length) newValue = newVal
                }
                onChange(newValue, ...other)
              }
            : null
        }
        {...props}
      />
    )
  }
)

export default DistrictCombo
