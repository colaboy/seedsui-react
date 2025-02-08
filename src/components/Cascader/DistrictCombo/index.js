import React, { useRef, forwardRef, useImperativeHandle } from 'react'
import { updateValueType, testEditableOptions } from './../DistrictMain/utils'
import DistrictModal from './../DistrictModal'

// 内库使用-start
import Combo from './../../Modal/Combo'
// 内库使用-end

/* 测试使用-start
import { Modal } from 'seedsui-react'
const Combo = Modal.Combo
测试使用-end */

// 级联选择
const DistrictCombo = forwardRef(
  (
    {
      // Modal
      value,
      onChange,

      min = '',
      isCountry,
      isProvince,
      isMunicipality,
      isPrefecture,
      isCity,
      isDistrict,
      isStreet,
      modalProps,

      // Main
      startType, // 开始于国家country, 省份province
      type = 'street', // 'country', 'province', 'city', 'district', 'street'
      list,
      getCountry,
      getProvinceCityDistrict,
      getStreet,
      editableOptions,
      ...props
    },
    ref
  ) => {
    // Expose api
    const comboRef = useRef(null)
    useImperativeHandle(ref, () => {
      return {
        getReadOnlyValue: getReadOnlyValue,
        ...comboRef.current
      }
    })

    // 清空操作，保留只读项，清空非只读项
    function getReadOnlyValue(value) {
      if (!Array.isArray(value)) {
        return value
      }

      // 更新value的type属性
      updateValueType(value, list, {
        type,
        isCountry,
        isProvince,
        isMunicipality,
        isPrefecture,
        isCity,
        isDistrict,
        isStreet
      })

      // 清空只能清空非只读项
      let newValue = []
      for (let item of value) {
        let isEditable = testEditableOptions(item, {
          editableOptions
        })
        if (isEditable === false) {
          newValue.push(item)
        }
      }

      return newValue
    }

    let readOnlyValue = getReadOnlyValue(value)

    return (
      <Combo
        ref={comboRef}
        modalProps={{
          list,
          startType,
          type, // 'country', 'province', 'city', 'district', 'street'
          min,
          // 判断是否是国省市区
          isCountry,
          isProvince,
          isMunicipality,
          isPrefecture,
          isCity,
          isDistrict,
          isStreet,
          getCountry,
          getProvinceCityDistrict,
          getStreet,
          editableOptions,
          ...modalProps,
          // Main Props
          mainProps: modalProps?.mainProps || {}
        }}
        value={value}
        onChange={
          onChange
            ? (newValue, ...other) => {
                // 清空操作，公能清空非只读项
                if (editableOptions && !newValue && Array.isArray(value) && value.length) {
                  // 清空完成
                  if (readOnlyValue?.length) {
                    // eslint-disable-next-line
                    newValue = readOnlyValue
                  }
                }
                onChange(newValue, ...other)
              }
            : null
        }
        {...props}
        modal={props?.modal || DistrictModal}
        clear={(clearParams) => {
          if (typeof props?.clear !== 'function') {
            return props?.clear
          }
          // 只读项一样长, 并不能清空
          if (readOnlyValue?.length === value?.length) {
            return props?.clear({ ...clearParams, clearable: false })
          } else {
            return props?.clear(clearParams)
          }
        }}
      />
    )
  }
)

export default DistrictCombo
