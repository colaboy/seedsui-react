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
      // Modal
      value,

      visible,
      submitProps,
      min = '',
      isCountry,
      isProvince,
      isMunicipality,
      isCity,
      isDistrict,
      isStreet,
      getType = matchType,

      // Main
      type = '', // 'country', 'province', 'city', 'district', 'street' (只有中国时才生效, 因为只有中国有省市区)
      async,
      list,
      loadList,
      loadData,
      editableOptions,
      ...props
    },
    ref
  ) => {
    // 是否显示右上角确认按钮
    let [submitVisible, setSubmitVisible] = useState(null)

    // 根据min判断是否显示确定按钮
    function updateSubmitVisible(tabs, { list }) {
      let submitVisible = null

      // 获取末级类型
      let currentType = getType(tabs, {
        data: list,
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
    function handleDrillDown(tabs, otherArguments) {
      if (min) {
        updateSubmitVisible(tabs, otherArguments)
      }
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
    props.MainProps.async = async
    props.MainProps.list = list
    props.MainProps.loadList = loadList
    props.MainProps.loadData = loadData
    props.MainProps.editableOptions = editableOptions
    props.MainProps.isCountry = isCountry
    props.MainProps.isProvince = isProvince
    props.MainProps.isMunicipality = isMunicipality
    props.MainProps.isCity = isCity
    props.MainProps.isDistrict = isDistrict
    props.MainProps.isStreet = isStreet
    props.MainProps.onChange = handleDrillDown

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
