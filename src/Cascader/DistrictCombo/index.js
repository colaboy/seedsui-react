import React, { useRef, forwardRef, useImperativeHandle } from 'react'
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
      async,
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
    // 获取DistrictMain加载的list
    const listDataRef = useRef(null)

    // 暴露方法
    const comboRef = useRef(null)
    useImperativeHandle(ref, () => {
      return {
        clearValue: clearValue,
        ...comboRef.current
      }
    })

    // 清空操作，公能清空非只读项
    function clearValue(argValue) {
      let val = argValue
      if (val === undefined) {
        val = value
      }

      if (!Array.isArray(val)) {
        return argValue
      }

      // 清空只能清空非只读项
      let newValue = []
      for (let [index, item] of val.entries()) {
        let isEditable = testEditableOptions(item, index, {
          tabs: val,
          editableOptions,
          listData: listDataRef.current,
          isCountry,
          isProvince,
          isMunicipality,
          isCity,
          isDistrict,
          isStreet
        })
        if (isEditable === false) {
          newValue.push(item)
        }
      }
      return newValue
    }

    return (
      <BaseCombo
        ref={comboRef}
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
                // 清空操作，公能清空非只读项
                if (editableOptions && !newValue && Array.isArray(value) && value.length) {
                  let emptyValue = clearValue(value)
                  // 清空完成
                  if (emptyValue.length) {
                    // eslint-disable-next-line
                    newValue = emptyValue
                  }
                }
                onChange(newValue, ...other)
              }
            : null
        }
        {...props}
        clearProps={{
          ...(props?.clearProps || {}),
          className:
            (clearValue(value).length === value.length ? 'hide-important ' : '') +
            (props?.clearProps?.className || '')
        }}
        MainProps={{
          async: async,
          onListLoad: (listData) => {
            listDataRef.current = listData
          },
          ...(props.MainProps || {})
        }}
      />
    )
  }
)

export default DistrictCombo
