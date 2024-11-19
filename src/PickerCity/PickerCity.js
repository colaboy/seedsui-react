import React, { forwardRef, useRef, useImperativeHandle, useContext, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Instance from './instance.js'
import Context from '../Context/instance.js'

/**
 * @deprecated since version 5.2.8
 * use Cascader.DistrictCombo instead
 */
const PickerCity = forwardRef(
  (
    {
      portal,
      data,
      dataFormat = {
        // {idPropertyName: 'id', namePropertyName: 'name', childPropertyName: 'children'}
        idPropertyName: 'id',
        namePropertyName: 'name',
        childPropertyName: 'children'
      },
      split = '-',

      type = 'district', // district | city
      show = false,
      value, // '北京-东城区'
      selected, // [{id: '', name: ''}]

      maskAttribute = {},
      submitAttribute = {},
      cancelAttribute = {},

      onScrollEnd,
      ...others
    },
    ref
  ) => {
    const refEl = useRef(null)
    useImperativeHandle(ref, () => {
      return refEl.current
    })
    const instance = useRef(null)
    // context
    const context = useContext(Context) || {}
    const locale =
      context.locale ||
      function (remark) {
        return remark || ''
      }

    useEffect(() => {
      initInstance()
    }, []) // eslint-disable-line

    useEffect(() => {
      if (!instance.current) return
      if (show) {
        if (data) {
          instance.current.setData(data, {
            childPropertyName: dataFormat.childPropertyName,
            idPropertyName: dataFormat.idPropertyName,
            namePropertyName: dataFormat.namePropertyName
          })
        }
        setDefault()
        instance.current.show()
      } else {
        instance.current.hide()
      }
      // eslint-disable-next-line
    }, [show])

    // 更新句柄, 防止synchronization模式, 每次组件在render的时候都生成上次render的state、function、effects
    if (instance.current) {
      instance.current.params.onClickSubmit = clickSubmit
      instance.current.params.onClickCancel = clickCancel
      instance.current.params.onClickMask = clickMask
    }
    function clickSubmit(e) {
      // 获取选中项
      e.activeText = e.getActiveText(e.activeOptions)
      e.setActiveKeys(e.activeOptions)
      // Callback
      const value = e.activeText
      const options = e.activeOptions
      if (submitAttribute.onClick) submitAttribute.onClick(e, value, options)
    }
    function clickCancel(e) {
      if (cancelAttribute.onClick) cancelAttribute.onClick(e)
    }
    function clickMask(e) {
      if (maskAttribute.onClick) maskAttribute.onClick(e)
    }
    function scrollEnd(e) {
      // let activeOption = e.activeSlot.values[e.activeSlot.activeIndex]
      let activeOption = e.activeOptions[e.activeSlot.index]
      if (e.activeSlot.index === 0) {
        // 滚动省
        let city = e.replaceCity(activeOption[e.params.idPropertyName]) // 修改第二项
        e.replaceDistrict(city[0][e.params.idPropertyName]) // 修改第三项
      } else if (e.activeSlot.index === 1) {
        // 滚动市
        e.replaceDistrict(activeOption[e.params.idPropertyName]) // 修改第三项
      }
      // Callback
      if (onScrollEnd) onScrollEnd(e)
    }

    function setDefault() {
      if (selected && selected.length) {
        instance.current.setDefaultKeys(
          selected.map((item) => {
            return item.id
          })
        )
      } else {
        const defaultValues = getDefaultValues()
        instance.current.setDefaultValues(defaultValues)
      }
      instance.current.update()
    }
    function getDefaultValues() {
      // 默认值
      let defaultValue = value
      let defaultValues = []
      if (defaultValue) {
        defaultValues = defaultValue.split(split).map((item) => {
          return item.trim()
        })
      }
      return defaultValues
    }
    function getDefaultKeys() {
      if (selected && selected.length > 1) {
        return selected.map((item) => {
          return item.id
        })
      }
      return ['', '', '']
    }
    function initInstance() {
      let defaultValues = getDefaultValues()
      let defaultKeys = getDefaultKeys()
      // render数据
      instance.current = new Instance({
        data: data || window.districtData,
        idPropertyName: dataFormat.idPropertyName,
        namePropertyName: dataFormat.namePropertyName,
        childPropertyName: dataFormat.childPropertyName,

        mask: refEl.current,
        split: split,
        viewType: type,
        defaultProvinceKey: defaultKeys[0] || '',
        defaultCityKey: defaultKeys[1] || '',
        defaultDistrictKey: defaultKeys[2] || '',
        defaultProvince: defaultValues[0] || '',
        defaultCity: defaultValues[1] || '',
        defaultDistrict: defaultValues[2] || '',
        onClickMask: clickMask,
        onClickCancel: clickCancel,
        onClickSubmit: clickSubmit,
        onScrollEnd: scrollEnd,
        onHid: (e) => {}
      })
      if (show && instance.current) {
        setTimeout(function () {
          instance.current.show()
        }, 10)
      }
    }
    // 过滤已经回调的属性
    function filterProps(props) {
      if (!props) return {}
      const { caption, onClick, ...otherProps } = props
      return { ...otherProps }
    }
    // 剔除掉onClick事件, 因为在instance时已经回调了
    const otherMaskAttribute = filterProps(maskAttribute)
    const otherSubmitAttribute = filterProps(submitAttribute)
    const otherCancelAttribute = filterProps(cancelAttribute)
    return createPortal(
      <div
        ref={refEl}
        {...otherMaskAttribute}
        className={`mask picker-mask${
          otherMaskAttribute.className ? ' ' + otherMaskAttribute.className : ''
        }`}
      >
        <div {...others} className={`picker${others.className ? ' ' + others.className : ''}`}>
          <div className="picker-header">
            <a
              {...otherCancelAttribute}
              className={`picker-cancel${
                cancelAttribute.className ? ' ' + cancelAttribute.className : ''
              }`}
            >
              {cancelAttribute.caption || locale('取消', 'SeedsUI_cancel')}
            </a>
            <div className="picker-header-title"></div>
            <a
              {...otherSubmitAttribute}
              className={`picker-submit${
                submitAttribute.className ? ' ' + submitAttribute.className : ''
              }`}
            >
              {submitAttribute.caption || locale('完成', 'SeedsUI_finish')}
            </a>
          </div>
          <div className="picker-wrapper">
            <div className="picker-layer">
              <div className="picker-layer-frame"></div>
            </div>
            <div className="picker-slotbox"></div>
          </div>
        </div>
      </div>,
      portal || context.portal || document.getElementById('root') || document.body
    )
  }
)

export default React.memo(PickerCity, (prevProps, nextProps) => {
  if (nextProps.show === prevProps.show) return true
  return false
})
