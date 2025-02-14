import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import _ from 'lodash'
import { updateValueType, compareType } from './../DistrictMain/utils'
import DistrictMain from './../DistrictMain'

// 内库使用-start
import ModalPicker from './../../Modal/ModalPicker'
// 内库使用-end

/* 测试使用-start
import { Modal } from 'seedsui-react'
const ModalPicker = Modal.ModalPicker
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

      // Main
      startType,
      type = 'street', // 'country', 'province', 'city', 'district', 'street'
      loadCountries,
      loadCountryRegions,
      loadStreets,
      editableOptions,
      ...props
    },
    ref
  ) => {
    // min需要根据list计算value的type, getList后才能计算value的type
    const listRef = useRef(null)

    // 是否显示右上角确认按钮
    let [okVisible, setOkVisible] = useState(null)

    // Expose api
    const modalRef = useRef(null)
    useImperativeHandle(ref, () => {
      return {
        ...modalRef.current
      }
    })

    useEffect(() => {
      if (!visible || !min || _.isEmpty(value)) {
        return
      }
      if (!modalRef.current?.getList) return

      // 查询列表后再Ok按钮显示状态
      queryList()

      // eslint-disable-next-line
    }, [visible])

    // 查询列表后再Ok按钮显示状态
    async function queryList() {
      listRef.current = await modalRef.current?.getList(value)
      updateOkVisible(value, listRef.current)
    }

    // 根据min判断是否显示确定按钮
    function updateOkVisible(tabs, list) {
      if (!min || !Array.isArray(tabs) || !tabs.length) return

      let newOkVisible = null

      // 获取末级类型
      updateValueType(tabs, list, {
        type,
        isCountry,
        isProvince,
        isMunicipality,
        isPrefecture,
        isCity,
        isDistrict,
        isStreet
      })

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

    // 下钻根据min更新Ok按钮显示状态
    function handleDrillDown(tabs, { list } = {}) {
      updateOkVisible(tabs, list)
    }

    // 扩展非标准属性
    if (!props.mainProps) {
      props.mainProps = {}
    }
    props.mainProps.startType = startType
    props.mainProps.type = type
    props.mainProps.loadCountries = loadCountries
    props.mainProps.loadCountryRegions = loadCountryRegions
    props.mainProps.loadStreets = loadStreets
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
        ref={modalRef}
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
