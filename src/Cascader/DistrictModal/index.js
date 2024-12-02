import React, { forwardRef, useState, useEffect } from 'react'
import { updateValueType, compareType, defaultSetValueType } from './../DistrictMain/utils'
import DistrictMain from './../DistrictMain'

// 内库使用
import ModalPicker from './../../Modal/MainPicker'

// 测试使用
// import { Modal } from 'seedsui-react'
// const ModalPicker = Modal.MainPicker

// 级联选择
const DistrictModal = forwardRef(
  (
    {
      // Modal
      value,

      visible,
      submitProps,
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
    let [submitVisible, setSubmitVisible] = useState(null)

    useEffect(() => {
      if (!visible || _.isEmpty(list) || _.isEmpty(value)) {
        min && setSubmitVisible(false)
        return
      }

      updateSubmitVisible(value)

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
    function updateSubmitVisible(tabs) {
      if (!min) return

      let submitVisible = null

      // 获取末级类型
      _updateValueType()

      // 最小支持的类型集合
      let currentTypes = tabs[tabs.length - 1].type
      submitVisible = false
      for (let currentType of currentTypes) {
        if (compareType(currentType, min) >= 0) {
          submitVisible = true
          break
        }
      }

      setSubmitVisible(submitVisible)
    }

    // 点击选项前判断是否指定类型: 省, 市, 区
    function handleDrillDown(tabs) {
      updateSubmitVisible(tabs)
    }

    // 显示右上角的按钮
    // eslint-disable-next-line
    if (!submitProps) submitProps = {}
    if (submitVisible !== null) {
      // eslint-disable-next-line
      submitProps = {
        visible: submitVisible,
        ...submitProps
      }
    }

    // 扩展非标准属性
    if (!props.MainProps) {
      props.MainProps = {}
    }
    props.MainProps.type = type
    props.MainProps.list = list
    props.MainProps.loadData = loadData
    props.MainProps.editableOptions = editableOptions
    props.MainProps.isCountry = isCountry
    props.MainProps.isProvince = isProvince
    props.MainProps.isMunicipality = isMunicipality
    props.MainProps.isPrefecture = isPrefecture
    props.MainProps.isCity = isCity
    props.MainProps.isDistrict = isDistrict
    props.MainProps.isStreet = isStreet
    props.MainProps.onChange = handleDrillDown

    return (
      <ModalPicker
        ref={ref}
        visible={visible}
        value={value}
        {...props}
        changeClosable={(newValue, newArguments, { submit }) => {
          let lastTab =
            Array.isArray(newValue) && newValue.length ? newValue[newValue.length - 1] : null
          if (lastTab?.isLeaf) {
            submit(newValue)
          }
        }}
        submitProps={{
          visible: false,
          ...(submitProps || {})
        }}
        className={`cascader-modal${props.className ? ' ' + props.className : ''}`}
        MainComponent={DistrictMain}
      />
    )
  }
)

export default DistrictModal
