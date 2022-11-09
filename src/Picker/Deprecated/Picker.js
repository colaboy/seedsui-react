import React, { forwardRef, useRef, useImperativeHandle, useEffect, useContext } from 'react'
import { createPortal } from 'react-dom'
import Instance from './instance.js'
import Context from '../../Context/instance.js'

const Picker = forwardRef(
  (
    {
      portal,
      list = [], // [{id: '', name: ''}]

      show = false,
      value,
      selected,

      maskAttribute = {},
      submitAttribute = {},
      cancelAttribute = {},
      slotAttribute = {},
      ...others
    },
    ref
  ) => {
    const rootRef = useRef(null)
    useImperativeHandle(ref, () => {
      return rootRef.current
    })
    const instance = useRef(null)
    useEffect(() => {
      initInstance()
    }, []) // eslint-disable-line

    useEffect(() => {
      if (instance.current) {
        if (show && list.length) {
          setDefault()
          instance.current.show()
        } else {
          instance.current.hide()
        }
      } else if (list && list.length > 0) {
        initInstance()
      }
    }, [show]) // eslint-disable-line

    // 更新句柄, 防止synchronization模式, 每次组件在render的时候都生成上次render的state、function、effects
    if (instance.current) {
      instance.current.params.onClickSubmit = clickSubmit
      instance.current.params.onClickCancel = clickCancel
      instance.current.params.onClickMask = clickMask
    }
    function clickSubmit(e) {
      const value = e.activeOptions[0].name
      const options = e.activeOptions
      if (submitAttribute.onClick) submitAttribute.onClick(e, value, options)
    }
    function clickCancel(e) {
      if (cancelAttribute.onClick) cancelAttribute.onClick(e)
    }
    function clickMask(e) {
      if (maskAttribute.onClick) maskAttribute.onClick(e)
    }

    function setDefault() {
      const defaultOpt = getDefaultOption()
      if (!defaultOpt) return
      instance.current.clearSlots()
      instance.current.addSlot(list, defaultOpt.id || '', slotAttribute.className || 'text-center') // 添加列,参数:数据,默认id,样式(lock样式为锁定列)
    }

    function getDefaultOption() {
      if (selected && selected.length) {
        return selected[0]
      }
      if (value) {
        for (let item of list) {
          if (item.name === value) return item
        }
      }
      if (list && list.length) {
        return list[0]
      }
      return null
    }

    function initInstance() {
      if (!list || !list.length || instance.current) {
        console.log('SeedsUI Picker: 参数list为空')
        return
      }
      // render数据
      instance.current = new Instance({
        mask: rootRef.current,
        onClickMask: clickMask,
        onClickCancel: clickCancel,
        onClickSubmit: clickSubmit,
        onHid: (e) => {}
      })
      // 默认项
      const defaultOpt = getDefaultOption()
      let id = ''
      if (defaultOpt && defaultOpt.id) id = defaultOpt.id
      instance.current.addSlot(list, id, slotAttribute.className || 'text-center')
      if (show && instance.current) {
        instance.current.show()
      }
      rootRef.current.instance = instance
    }

    // 过滤已经回调的属性
    function filterProps(props) {
      if (!props) return {}
      const { caption, onClick, ...otherProps } = props
      return { ...otherProps }
    }

    // context
    const context = useContext(Context) || {}
    const locale =
      context.locale ||
      function (remark) {
        return remark || ''
      }
    // 剔除掉onClick事件, 因为在instance时已经回调了
    const otherMaskAttribute = filterProps(maskAttribute)
    const otherSubmitAttribute = filterProps(submitAttribute)
    const otherCancelAttribute = filterProps(cancelAttribute)
    return createPortal(
      <div
        ref={rootRef}
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
              {cancelAttribute.caption || locale('取消', 'cancel')}
            </a>
            <div className="picker-header-title"></div>
            <a
              {...otherSubmitAttribute}
              className={`picker-submit${
                submitAttribute.className ? ' ' + submitAttribute.className : ''
              }`}
            >
              {submitAttribute.caption || locale('完成', 'finish')}
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

export default React.memo(Picker, (prevProps, nextProps) => {
  if (nextProps.show === prevProps.show) return true
  return false
})
