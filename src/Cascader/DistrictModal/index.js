import React, { forwardRef, useState } from 'react'
import { getChildTypes, matchType } from './../DistrictMain/utils'
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
      // Modal fixed properties
      visible,

      // Modal: DistrictModal Control properties
      min = '',
      submitProps,

      // Main: common
      value,
      allowClear,

      // Main: DistrictMain Control properties
      loadList,
      loadData,
      isCountry,
      isProvince,
      isMunicipality,
      isCity,
      isDistrict,
      isStreet,
      onDrillDown,
      editableOptions,
      ...props
    },
    ref
  ) => {
    // 是否显示右上角确认按钮
    let [submitVisible, setSubmitVisible] = useState(null)

    // 显示时更新
    // useEffect(() => {
    //   if (visible) {
    //     updateSubmitVisible(value)
    //   }
    //   // eslint-disable-next-line
    // }, [visible])

    // 根据min判断是否显示确定按钮
    function updateSubmitVisible(tabs, { data }) {
      let submitVisible = null

      // 获取末级类型
      let currentType = matchType(tabs, {
        data,
        isCountry,
        isProvince,
        isMunicipality,
        isCity,
        isDistrict,
        isStreet
      })

      // 最小支持的类型集合
      if (
        Array.isArray(currentType) &&
        currentType.length &&
        getChildTypes(min).some((minType) => {
          return currentType?.includes(minType)
        })
      ) {
        submitVisible = true
      } else {
        submitVisible = false
      }

      setSubmitVisible(submitVisible)
    }

    // 点击选项前判断是否指定类型: 省, 市, 区
    function handleDrillDown(tabs, parameters) {
      if (min) {
        updateSubmitVisible(tabs, parameters)
      }

      // 点击选项
      if (onDrillDown) return onDrillDown(tabs, parameters)
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
    props.MainProps.onDrillDown = handleDrillDown
    props.MainProps.loadList = loadList
    props.MainProps.loadData = loadData
    props.MainProps.editableOptions = editableOptions

    return (
      <ModalPicker
        ref={ref}
        visible={visible}
        value={value}
        changeClosable
        submitProps={{
          visible: false,
          ...(submitProps || {})
        }}
        {...props}
        className={`cascader-modal${props.className ? ' ' + props.className : ''}`}
        MainComponent={DistrictMain}
      />
    )
  }
)

export default DistrictModal
