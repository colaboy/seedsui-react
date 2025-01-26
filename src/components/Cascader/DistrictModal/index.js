import React, { forwardRef, useState, useEffect } from 'react'
import _ from 'lodash'
import { updateValueType, compareType, defaultSetValueType } from './../DistrictMain/utils'
import DistrictMain from './../DistrictMain'

// 内库使用-start
import ModalPicker from './../../Modal/Modal'
// 内库使用-end

/* 测试使用-start
import { Modal } from 'seedsui-react'
const ModalPicker = Modal.Modal
测试使用-end */

// 级联选择
const DistrictModal = forwardRef(
  (
    {
      // Modal
      value,

      visible,
      min = '',
      isCountry,
      isProvince,
      isMunicipality,
      isPrefecture,
      isCity,
      isDistrict,
      isStreet,
      setValueType = defaultSetValueType,

      // Main
      type = '', // 'country', 'province', 'city', 'district', 'street' (只有中国时才生效, 因为只有中国有省市区)
      list,
      loadData,
      editableOptions,
      ...props
    },
    ref
  ) => {
    // 是否显示右上角确认按钮
    let [okVisible, setOkVisible] = useState(null)

    useEffect(() => {
      if (!visible || _.isEmpty(list) || _.isEmpty(value)) {
        min && setOkVisible(false)
        return
      }

      updateOkVisible(value)

      // eslint-disable-next-line
    }, [visible])

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

    // 根据min判断是否显示确定按钮
    function updateOkVisible(tabs) {
      if (!min || !Array.isArray(tabs) || !tabs.length) return

      let newOkVisible = null

      // 获取末级类型
      _updateValueType(tabs)

      newOkVisible = false

      // 比较类型, 判断是否显示确定按钮
      let currentTypes = tabs[tabs.length - 1]?.type
      if (currentTypes) {
        for (let currentType of currentTypes) {
          if (compareType(currentType, min) >= 0) {
            newOkVisible = true
            break
          }
        }
      }

      setOkVisible(newOkVisible)
    }

    // 点击选项前判断是否指定类型: 省, 市, 区
    function handleDrillDown(tabs) {
      updateOkVisible(tabs)
    }

    // 扩展非标准属性
    if (!props.mainProps) {
      props.mainProps = {}
    }
    props.mainProps.type = type
    props.mainProps.list = list
    props.mainProps.loadData = loadData
    props.mainProps.editableOptions = editableOptions
    props.mainProps.isCountry = isCountry
    props.mainProps.isProvince = isProvince
    props.mainProps.isMunicipality = isMunicipality
    props.mainProps.isPrefecture = isPrefecture
    props.mainProps.isCity = isCity
    props.mainProps.isDistrict = isDistrict
    props.mainProps.isStreet = isStreet
    props.mainProps.onChange = handleDrillDown

    return (
      <ModalPicker
        ref={ref}
        visible={visible}
        value={value}
        {...props}
        main={props?.main || DistrictMain}
        changeClosable={(newValue, newArguments, { triggerOk }) => {
          let lastTab =
            Array.isArray(newValue) && newValue.length ? newValue[newValue.length - 1] : null
          if (lastTab?.isLeaf) {
            triggerOk(newValue)
          }
        }}
        ok={okVisible ? '' : null}
        className={`cascader-modal${props.className ? ' ' + props.className : ''}`}
      />
    )
  }
)

export default DistrictModal
