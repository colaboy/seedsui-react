import React, { forwardRef, useEffect, useState } from 'react'
import { getMinTypes, matchType, testCity, testDistrict } from './../DistrictMain/utils'

// 测试使用
// import BaseModal from 'seedsui-react/lib/Select/Modal'
// 内库使用
import BaseModal from './../../Select/Modal'

import DistrictMain from './../DistrictMain'

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

      // Main: DistrictMain Control properties
      loadList,
      loadData,
      isCountry,
      isProvince,
      isCity,
      isDistrict,
      isStreet,
      onBeforeSelect,
      editableOptions,
      ...props
    },
    ref
  ) => {
    // 是否显示右上角确认按钮
    let [submitVisible, setSubmitVisible] = useState(null)

    // 显示时更新
    useEffect(() => {
      if (visible) {
        updateSubmitVisible(value)
      }
      // eslint-disable-next-line
    }, [visible])

    // 根据min判断是否显示确定按钮
    function updateSubmitVisible(tabs) {
      // 如果即没点击, 又没有传入初始值，则默认不显示提交按钮
      if (!Array.isArray(tabs) || !tabs.length) {
        setSubmitVisible(false)
        return
      }

      submitVisible = null

      // 选中的末级
      let lastTab = tabs[tabs.length - 1]

      // 获取末级类型
      let lastTabType = matchType(lastTab, {
        isCountry,
        isProvince,
        isCity,
        isDistrict,
        isStreet
      })
      // 没有类型则可能是街道，如果上级是区或者市，则必定是街道
      if (!lastTabType && tabs.length > 2) {
        let prevTab = tabs[tabs.length - 2]
        if (testDistrict(prevTab, isDistrict)) {
          lastTabType = 'street'
        } else if (testCity(prevTab, isCity)) {
          lastTabType = 'street'
        }
      }

      // 最小支持的类型集合
      if (getMinTypes(min).includes(lastTabType)) {
        submitVisible = true
      } else {
        submitVisible = false
      }

      setSubmitVisible(submitVisible)
    }

    // 点击选项前判断是否指定类型: 省, 市, 区
    function handleBeforeSelect(tabs) {
      if (min) {
        updateSubmitVisible(tabs)
      }

      // 点击选项
      if (onBeforeSelect) return onBeforeSelect(tabs)
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
    props.MainProps.onBeforeSelect = handleBeforeSelect
    props.MainProps.loadList = loadList
    props.MainProps.loadData = loadData
    props.MainProps.editableOptions = editableOptions

    return (
      <BaseModal
        ref={ref}
        visible={visible}
        value={value}
        submitProps={submitProps}
        {...props}
        className={`cascader${props.className ? ' ' + props.className : ''}`}
        MainComponent={DistrictMain}
      />
    )
  }
)

export default DistrictModal
