import React, { useRef, forwardRef, useImperativeHandle } from 'react'
import { testEditableOptions } from './../DistrictMain/utils'
import DistrictModal from './../DistrictModal'

// 内库使用
import Combo from './../../Modal/Combo'

// 测试使用
// import { Modal } from 'seedsui-react'
// const Combo = Modal.Combo

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
        getReadOnlyValue: getReadOnlyValue,
        ...comboRef.current
      }
    })

    // 清空操作，保留只读项，清空非只读项
    function getReadOnlyValue(argValue) {
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
      <Combo
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
          editableOptions,
          ...ModalProps,
          // MainProps
          MainProps: {
            async: async,
            onListLoad: (listData) => {
              listDataRef.current = listData
            },
            ...(ModalProps?.MainProps || {})
          }
        }}
        value={value}
        onChange={
          onChange
            ? (newValue, ...other) => {
                // 清空操作，公能清空非只读项
                if (editableOptions && !newValue && Array.isArray(value) && value.length) {
                  let readOnlyValue = getReadOnlyValue(value)
                  // 清空完成
                  if (Array.isArray(readOnlyValue) && readOnlyValue.length) {
                    // eslint-disable-next-line
                    newValue = readOnlyValue
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
            (Array.isArray(value) && getReadOnlyValue(value).length === value.length
              ? 'hide-important '
              : '') + (props?.clearProps?.className || '')
        }}
      />
    )
  }
)

export default DistrictCombo
