import React, { forwardRef, useState, useRef, useImperativeHandle, useEffect } from 'react'
import { createPortal } from 'react-dom'
import locale from './../../locale'
import { formatValue, getDynamicProps } from './../utils'
import Head from './Head'
import Main from './../Main'

// Modal
const Modal = forwardRef(
  (
    {
      // 显示文本格式化和value格式化
      valueFormatter,

      // Combo
      getComboDOM,

      // Modal fixed properties
      visible,
      onVisibleChange,

      // Modal
      ModalComponent,
      ModalProps,

      // Modal: display properties
      portal,
      animation = 'slideUp',
      maskProps,
      captionProps,
      submitProps,
      cancelProps,
      maskClosable,

      // Main
      MainComponent,
      MainProps,

      // Main: common
      value,
      list, // [{id: '', name: ''}]
      multiple,
      onSelect,
      onBeforeChange,
      onChange,

      // Main: render
      checkedType,
      checkedPosition,
      checkable,
      headerRender,
      footerRender,
      listRender,
      listHeaderRender,
      listFooterRender,
      listExtraHeaderRender,
      listExtraFooterRender,
      itemRender,
      itemContentRender,
      itemProps,
      checkboxProps,

      // Main: Picker Control properties
      defaultPickerValue,
      slotProps,

      // Main: Actionsheet Control properties
      groupProps,
      optionProps,

      // Main: Tree Component properties
      checkStrictly, // 严格模式: 级联 true: 不级联, false: 级联, children: 只级联子级
      enableHalfChecked, // 是否启用半选功能
      preserveValue, // 保留不在树结构中的value
      onlyLeafCheck, // 仅允许点击末级节点
      selectable, // 点击选中, 根据checkable判断是否启用selectable, 没有checkbox时则启用
      defaultExpandAll, // 默认展开

      // 纯渲染时不渲染Main
      children,
      ...props
    },
    ref
  ) => {
    // value格式化
    if (typeof valueFormatter !== 'function') {
      // eslint-disable-next-line
      valueFormatter = formatValue
    }
    // 当前选中项
    let [currentValue, setCurrentValue] = useState([])

    // 节点
    const modalRef = useRef(null)
    const mainRef = useRef(null)
    useImperativeHandle(ref, () => {
      return {
        rootDOM: modalRef?.current,
        getRootDOM: () => modalRef.current,

        mainDOM: mainRef?.current?.rootDOM,
        getMainDOM: () => mainRef?.current?.rootDOM,
        search: mainRef?.current?.search,
        instance: mainRef?.current?.instance,
        getInstance: () => mainRef?.current?.getInstance
      }
    })

    useEffect(() => {
      if (onVisibleChange) onVisibleChange(visible)

      // 取消弹窗时, currentValue已变, 而value未变, 如果value和currentValue不一致, 则使用value
      if (visible) {
        setCurrentValue(valueFormatter(value))
      }
      // eslint-disable-next-line
    }, [visible])

    // useEffect(() => {
    //   setCurrentValue(valueFormatter(value))
    //   // eslint-disable-next-line
    // }, [value])

    // 获取确定按钮的数量
    function getCaption() {
      let value = currentValue
      // 获取数量
      if (typeof submitProps?.caption === 'function') {
        return submitProps?.caption({
          multiple,
          value
        })
      }
      // 多选带选中数量
      if (multiple) {
        return locale('确定') + (value?.length ? `(${value.length})` : '')
      }
      return locale('确定')
    }

    // 事件
    async function handleSubmitClick(e) {
      if (submitProps?.onClick) submitProps.onClick(e)
      // 更新选中的值
      if (mainRef?.current?.getValue) {
        currentValue = mainRef.current.getValue()
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
      if (onChange) onChange(currentValue)
      if (onVisibleChange) onVisibleChange(false)
    }

    function handleCancelClick(e) {
      if (cancelProps?.onClick) cancelProps.onClick(e)
      if (onVisibleChange) onVisibleChange(false)
    }
    function handleMaskClick(e) {
      e.stopPropagation()
      if (!e.target.classList.contains('mask')) return
      if (maskProps?.onClick) maskProps.onClick()
      if (maskClosable && onVisibleChange) onVisibleChange(false)
    }

    // Main Render
    let MainNode = Main
    if (MainComponent) {
      MainNode = MainComponent
    }

    return createPortal(
      <div
        {...maskProps}
        className={`mask picker-mask${maskProps?.className ? ' ' + maskProps.className : ''}${
          visible ? ' active' : ''
        }`}
        onClick={handleMaskClick}
        ref={modalRef}
      >
        <div
          data-animation={animation}
          {...props}
          className={`popup-animation picker${props.className ? ' ' + props.className : ''}${
            visible ? ' active' : ''
          }`}
        >
          {/* 头 */}
          <Head
            captionProps={captionProps}
            cancelProps={cancelProps}
            submitProps={{
              // 必选单选不显示确定按钮
              visible: multiple !== undefined,
              // 多选确定带选中数量
              ...submitProps,
              caption: getCaption()
            }}
            onSubmitClick={handleSubmitClick}
            onCancelClick={handleCancelClick}
          />
          {/* 纯渲染 */}
          {children}
          {/* 主体 */}
          {!children && (
            <MainNode
              ref={mainRef}
              {...getDynamicProps({
                BaseProps: MainProps,

                // Main
                // MainComponent,
                // MainProps,

                // Main: common
                value,
                list, // [{id: '', name: ''}]
                multiple,
                onSelect,
                // onBeforeChange,
                // onChange,

                // Main: render
                checkedType,
                checkedPosition,
                checkable,
                headerRender,
                footerRender,
                listRender,
                listHeaderRender,
                listFooterRender,
                listExtraHeaderRender,
                listExtraFooterRender,
                itemRender,
                itemContentRender,
                itemProps,
                checkboxProps,

                // Main: Picker Control properties
                defaultPickerValue,
                slotProps,

                // Main: Actionsheet Control properties
                groupProps,
                optionProps,

                // Main: Tree Component properties
                checkStrictly, // 严格模式: 级联 true: 不级联, false: 级联, children: 只级联子级
                enableHalfChecked, // 是否启用半选功能
                preserveValue, // 保留不在树结构中的value
                onlyLeafCheck, // 仅允许点击末级节点
                selectable, // 点击选中, 根据checkable判断是否启用selectable, 没有checkbox时则启用
                defaultExpandAll // 默认展开
              })}
              // cover properties
              visible={visible}
              value={currentValue}
              list={list}
              onChange={(newValue) => {
                currentValue = valueFormatter(newValue)
                setCurrentValue(currentValue)

                // multiple未传则为必选单选
                if (multiple === undefined) {
                  handleSubmitClick()
                }
              }}
            />
          )}
        </div>
      </div>,
      portal || document.getElementById('root') || document.body
    )
  }
)

export default Modal
