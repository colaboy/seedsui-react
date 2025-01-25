import React, { useRef, forwardRef, useImperativeHandle } from 'react'
import { updateValueType, testEditableOptions, defaultSetValueType } from './../DistrictMain/utils'
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
      setValueType = defaultSetValueType,
      modalProps,

      // Main
      type = '', // 'country', 'province', 'city', 'district', 'street' (只有中国时才生效, 因为只有中国有省市区)
      list,
      loadData,
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
        updateValueType: _updateValueType,
        ...comboRef.current
      }
    })

    // 更新value的type, 截取超出type部分
    function _updateValueType(newValue, newList) {
      let tabs = newValue || value
      let data = newList || list
      return updateValueType(tabs, data, {
        type,
        isCountry,
        isProvince,
        isMunicipality,
        isPrefecture,
        isCity,
        isDistrict,
        isStreet,
        setValueType
      })
    }

    // 清空操作，保留只读项，清空非只读项
    function getReadOnlyValue(value) {
      if (!Array.isArray(value)) {
        return value
      }

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

    // eslint-disable-next-line
    value = _updateValueType(value)
    console.log('val:', value)
    let readOnlyValue = getReadOnlyValue(value)

    return (
      <Combo
        ref={comboRef}
        modalProps={{
          list,
          type, // 'country', 'province', 'city', 'district', 'street' (只有中国时才生效, 因为只有中国有省市区)
          min,
          // 判断是否是国省市区
          isCountry,
          isProvince,
          isMunicipality,
          isPrefecture,
          isCity,
          isDistrict,
          isStreet,
          setValueType,
          loadData,
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
        clear={readOnlyValue?.length === value?.length ? null : undefined}
      />
    )
  }
)

export default DistrictCombo
