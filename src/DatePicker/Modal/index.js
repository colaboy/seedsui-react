import React, { forwardRef, useState, useRef, useImperativeHandle, useEffect } from 'react'
import validateMaxMin from '../utils/validateMaxMin'
import Main from './../Main'

// 内库使用
import ModalPicker from './../../Modal/Picker'

// Modal
const Modal = forwardRef(
  (
    {
      // 无用的属性
      getComboDOM,

      // Modal fixed properties
      visible,
      onVisibleChange,

      // Modal: display properties
      portal,
      animation = 'slideUp',
      maskProps,
      captionProps,
      submitProps,
      cancelProps,
      maskClosable = true,
      titleFormatter,
      onError,

      // Main
      MainComponent,
      MainProps,

      // Main: common
      value,
      type,
      min,
      max,
      allowClear,
      onBeforeChange,
      onChange,

      // Main: Picker Control properties
      defaultPickerValue,

      // 纯渲染时不渲染Main
      children,
      ...props
    },
    ref
  ) => {
    // 当前标题，如日期
    let [currentTitle, setCurrentTitle] = useState('')

    // 当前选中项
    let [currentValue, setCurrentValue] = useState([])

    // 节点
    const modalRef = useRef(null)
    const mainRef = useRef(null)
    useImperativeHandle(ref, () => {
      const { rootDOM: mainDOM, getRootDOM: getMainDOM, ...otherMainRef } = mainRef?.current || {}
      return {
        rootDOM: modalRef?.current?.rootDOM,
        getRootDOM: () => modalRef?.current?.rootDOM,

        mainDOM: mainDOM,
        getMainDOM: getMainDOM,
        ...otherMainRef
      }
    })

    useEffect(() => {
      if (visible === null) return
      if (onVisibleChange) onVisibleChange(visible)

      // 显示弹窗，更新标题和显示值
      if (visible) {
        updateTitle()
        setCurrentValue(value || defaultPickerValue)
      }
      // eslint-disable-next-line
    }, [visible])

    // 没有传入标题时, 需要动态更新标题（如果日期）
    function updateTitle() {
      if (captionProps?.caption === undefined && mainRef?.current?.getTitle) {
        // Main渲染完成后取标题, 否则将会取到上次的值
        setTimeout(() => {
          // if (typeof titleFormatter === 'function') {
          //   currentTitle = titleFormatter(currentValue)
          // }

          currentTitle = mainRef?.current?.getTitle?.()
          setCurrentTitle(currentTitle)
        }, 100)
      }
    }

    // 事件
    async function handleSubmitClick(e) {
      if (submitProps?.onClick) submitProps.onClick(e)
      // 更新选中的值
      if (mainRef?.current?.getValue) {
        currentValue = mainRef.current.getValue()
      }

      // 校验
      if (min || max) {
        let newValue = validateMaxMin(currentValue, {
          type: type,
          min: min,
          max: max,
          onError: onError
        })

        if (!newValue) return
        currentValue = newValue
      }

      // 修改提示
      if (typeof onBeforeChange === 'function') {
        let goOn = await onBeforeChange(currentValue)
        if (goOn === false) return
        // 修改值
        if (typeof goOn === 'object') {
          currentValue = goOn
        }
      }
      if (onChange) {
        let goOn = await onChange(currentValue)
        if (goOn === false) return
      }
      if (onVisibleChange) onVisibleChange(false)
    }

    // Main Render
    let MainNode = Main
    if (MainComponent) {
      MainNode = MainComponent
    }

    return (
      <ModalPicker
        ref={modalRef}
        // Modal fixed properties
        visible={visible}
        onVisibleChange={onVisibleChange}
        // Modal: display properties
        animation={animation}
        maskProps={maskProps}
        captionProps={{ caption: currentTitle, ...captionProps }}
        submitProps={{
          ...submitProps,
          onClick: handleSubmitClick
        }}
        cancelProps={cancelProps}
        maskClosable={maskClosable}
        {...props}
        className={`slots${props.className ? ' ' + props.className : ''}`}
        portal={portal || document.getElementById('root') || document.body}
      >
        {/* 纯渲染 */}
        {children}
        {/* 主体 */}
        {!children && (
          <MainNode
            ref={mainRef}
            {...(MainProps || {})}
            visible={visible}
            value={currentValue}
            type={type}
            min={min}
            max={max}
            allowClear={allowClear}
            onChange={(newValue) => {
              // 无标题时更新标题
              updateTitle()

              // 修改值
              setCurrentValue(newValue)
            }}
          />
        )}
      </ModalPicker>
    )
  }
)

export default Modal
