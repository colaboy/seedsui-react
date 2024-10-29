import React, { forwardRef, useState, useRef, useImperativeHandle, useEffect } from 'react'
import validateRange from './validateRange'
import RangeMain from './../RangeMain'

// 内库使用
import ModalPicker from './../../Modal/Picker'

// Modal
const Modal = forwardRef(
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
      diff,
      defaultPickerValue,
      onError,
      onBeforeChange,

      // Main
      MainComponent,
      MainProps,

      // Main properties
      value,
      type,
      min,
      max,
      disabledStart,
      disabledEnd,
      allowClear,
      onChange,

      rangeId,
      ranges,
      titles,
      SelectorProps,
      DatePickerModalProps,

      // 纯渲染时不渲染Main
      children,
      ...props
    },
    ref
  ) => {
    // 当前标题，如日期
    let [currentTitle, setCurrentTitle] = useState('')

    // 当前选中项
    let [currentRangeId, setCurrentRangeId] = useState(rangeId)
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
        rangeId && setCurrentRangeId(rangeId)
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
      let newValue = validateRange(currentValue, {
        type: type,
        min: min,
        max: max,
        diff: diff,
        onError: onError
      })

      if (!newValue) return
      currentValue = newValue

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
        let goOn = await onChange(currentValue, {
          rangeId: currentRangeId,
          ranges
        })
        if (goOn === false) return
      }
      if (onVisibleChange) onVisibleChange(false)
    }

    // Main Render
    let MainNode = RangeMain
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
            disabledStart={disabledStart}
            disabledEnd={disabledEnd}
            allowClear={allowClear}
            onChange={(newValue, { rangeId: newRangeId }) => {
              // 无标题时更新标题
              updateTitle()
              // 修改值
              setCurrentRangeId(newRangeId)
              setCurrentValue(newValue)
            }}
            rangeId={currentRangeId}
            ranges={ranges}
            titles={titles}
            portal={modalRef?.current?.rootDOM}
            SelectorProps={SelectorProps}
            DatePickerModalProps={DatePickerModalProps}
          />
        )}
      </ModalPicker>
    )
  }
)

export default Modal
