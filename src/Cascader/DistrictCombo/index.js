import React, { useRef, useState, forwardRef, useImperativeHandle } from 'react'
import { testEditableOptions, matchType } from './../DistrictMain/utils'
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
      // Modal
      value,
      onChange,

      min = '',
      isCountry,
      isProvince,
      isMunicipality,
      isCity,
      isDistrict,
      isStreet,
      setValueType = matchType,
      ModalProps,

      // Main
      async,
      type = '', // 'country', 'province', 'city', 'district', 'street' (只有中国时才生效, 因为只有中国有省市区)
      list,
      loadList,
      loadData,
      editableOptions,
      ...props
    },
    ref
  ) => {
    // 获取DistrictMain加载的list
    let [asyncList, setAsyncList] = useState(null)

    // 暴露方法
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

      // 没有type, 则先获取type
      if (value.some((item) => !item.type)) {
        debugger
        setValueType(value, {
          list: list || asyncList,
          isCountry,
          isProvince,
          isMunicipality,
          isCity,
          isDistrict,
          isStreet
        })
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

    let readOnlyValue = getReadOnlyValue(value)

    return (
      <Combo
        ref={comboRef}
        ModalComponent={DistrictModal}
        ModalProps={{
          list,
          type, // 'country', 'province', 'city', 'district', 'street' (只有中国时才生效, 因为只有中国有省市区)
          min,
          // 判断是否是国省市区
          isCountry,
          isProvince,
          isMunicipality,
          isCity,
          isDistrict,
          isStreet,
          setValueType,
          loadList,
          loadData,
          editableOptions,
          ...ModalProps,
          // MainProps
          MainProps: {
            async: async,
            onListLoad: (listData) => {
              setAsyncList(listData)
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
        clearProps={{
          ...(props?.clearProps || {}),
          className:
            (readOnlyValue?.length === value.length ? 'hide-important ' : '') +
            (props?.clearProps?.className || '')
        }}
      />
    )
  }
)

export default DistrictCombo
