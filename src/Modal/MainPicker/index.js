import React, { forwardRef, useState, useRef, useImperativeHandle, useEffect } from 'react'
import ModalPicker from './../Picker'

// MainPicker
const MainPicker = forwardRef(
  (
    {
      // 无用的属性
      getComboDOM,

      // Modal fixed properties
      portal,
      animation = 'slideUp',
      maskProps,
      captionProps,
      submitProps,
      cancelProps,
      maskClosable = true,
      visible,
      onVisibleChange,

      // Modal current properties
      changeClosable,
      onBeforeChange,

      // Main
      MainComponent,
      MainProps,

      // Main properties
      value,
      allowClear,
      onChange,

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
      if (visible) {
        setCurrentValue(value)
      }
      // eslint-disable-next-line
    }, [value])

    // 没有传入标题时, 需要动态更新标题（如果日期）
    function updateTitle() {
      if (captionProps?.caption === undefined && mainRef?.current?.getTitle) {
        // Main渲染完成后取标题, 否则将会取到上次的值
        setTimeout(() => {
          currentTitle = mainRef?.current?.getTitle?.()
          setCurrentTitle(currentTitle)
        }, 100)
      }
    }

    // 事件
    async function handleChange(newValue) {
      currentValue = newValue

      // 更新选中的值
      if (mainRef?.current?.getValue) {
        currentValue = mainRef.current.getValue()
      }

      // 修改前校验
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

      onVisibleChange && onVisibleChange(false)
    }

    function handleSubmitClick(e) {
      if (submitProps?.onClick) submitProps.onClick(e)
      handleChange(currentValue)
    }

    return (
      <ModalPicker
        ref={modalRef}
        // Modal fixed properties
        visible={visible}
        onVisibleChange={(visible) => {
          // 显示弹窗，更新标题和显示值
          if (visible) {
            updateTitle()
            setCurrentValue(value)
          }

          onVisibleChange && onVisibleChange(visible)
        }}
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
        portal={portal || document.getElementById('root') || document.body}
      >
        {/* 纯渲染 */}
        {children}
        {/* 主体 */}
        {!children && MainComponent ? (
          <MainComponent
            ref={mainRef}
            {...(MainProps || {})}
            visible={visible}
            value={currentValue}
            allowClear={allowClear}
            onChange={(newValue, newArguments) => {
              // 无标题时更新标题
              updateTitle()

              // 修改值
              setCurrentValue(newValue)

              // 修改即关闭
              if (changeClosable) {
                handleChange(newValue)
              }

              MainProps?.onChange && MainProps.onChange(newValue, newArguments)
            }}
          />
        ) : null}
      </ModalPicker>
    )
  }
)

export default MainPicker
