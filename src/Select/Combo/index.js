import React, {
  forwardRef,
  useRef,
  useImperativeHandle,
  Fragment,
  useState,
  useEffect
} from 'react'
import { getDisplayValue, getDynamicProps } from './../utils'

import Input from './../../Input'
import Modal from './../Modal'

// Combo
const Combo = forwardRef(
  (
    {
      // 显示文本格式化和value格式化
      displayValueFormatter,
      valueFormatter,

      // Combo
      autoSize,
      allowClear,
      readOnly,
      disabled,
      onClick,
      onBeforeOpen,
      onBeforeClose,
      comboRender,
      onVisibleChange,

      // Modal
      ModalComponent,
      ModalProps,

      // Modal: display properties
      portal,
      animation,
      maskProps,
      captionProps,
      submitProps,
      cancelProps,
      maskClosable = true,

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

      // Combo|Main: DatePicker Control properties
      titleFormatter,
      min,
      max,
      type, // year | quarter | month | date | time | datetime
      onError,
      ranges,
      modal, // 弹出方式dropdown
      separator,

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

      children,
      ...props
    },
    ref
  ) => {
    // 显示文本格式化
    if (typeof displayValueFormatter !== 'function') {
      // eslint-disable-next-line
      displayValueFormatter = getDisplayValue
    }
    let displayValue = displayValueFormatter({ type, value, ranges, separator })

    const comboRef = useRef(null)
    const modalRef = useRef(null)
    useImperativeHandle(ref, () => {
      return {
        // 显示文本
        displayValue: displayValue,
        getDisplayValue: (newValue) => {
          return displayValueFormatter({
            type: type,
            value: newValue || value,
            ranges,
            separator
          })
        },

        rootDOM: comboRef?.current?.getRootDOM ? comboRef.current.getRootDOM() : comboRef.current,
        getRootDOM: () => {
          // div
          let rootDOM = comboRef?.current
          // Input.Text
          if (comboRef?.current?.getRootDOM) {
            rootDOM = comboRef.current.getRootDOM()
          }
          return rootDOM
        },

        modalDOM: modalRef?.current?.rootDOM,
        getModalDOM: modalRef?.current?.getRootDOM,
        search: modalRef?.current?.search,
        instance: modalRef?.current?.instance,
        getInstance: modalRef?.current?.getInstance,

        close: () => {
          setVisible(false)
        },
        open: () => {
          setVisible(true)
        }
      }
    })

    // 控制Modal显隐
    const [visible, setVisible] = useState(null)

    // 点击文本框
    async function handleInputClick(e) {
      if (readOnly || disabled) return
      if (!visible && typeof onBeforeOpen === 'function') {
        let goOn = await onBeforeOpen()
        if (!goOn) return
      }
      if (visible && typeof onBeforeClose === 'function') {
        let goOn = await onBeforeClose()
        if (!goOn) return
      }
      if (typeof onClick === 'function') {
        onClick(e)
      }

      setVisible(!visible)
    }

    useEffect(() => {
      if (visible === null) return
      typeof ModalProps?.onVisibleChange === 'function' && ModalProps.onVisibleChange(visible)
      typeof onVisibleChange === 'function' && onVisibleChange(visible)

      // eslint-disable-next-line
    }, [visible])

    // Modal Render
    let ModalNode = Modal
    if (ModalComponent) {
      ModalNode = ModalComponent
    }

    // 允许清空
    if (allowClear) {
      if (readOnly || disabled) {
        // eslint-disable-next-line
        allowClear = false
      }
    }

    // 文本框
    let InputNode = Input.Text
    if (autoSize) {
      InputNode = Input.AutoFit
    }

    return (
      <Fragment>
        {/* Combo */}
        {typeof comboRender === 'function' && (
          <div {...props} onClick={handleInputClick} ref={comboRef}>
            {comboRender({
              value,
              displayValue
            })}
          </div>
        )}
        {children && (
          <div {...props} onClick={handleInputClick} ref={comboRef}>
            {children}
          </div>
        )}
        {!children && typeof comboRender !== 'function' && (
          <InputNode
            disabled={disabled}
            allowClear={allowClear}
            value={displayValue}
            readOnly
            onChange={onChange}
            onBeforeChange={onBeforeChange}
            {...props}
            onClick={handleInputClick}
            ref={comboRef}
          />
        )}
        {/* Modal */}
        <ModalNode
          ref={modalRef}
          getComboDOM={() => {
            return comboRef.current
          }}
          {...getDynamicProps({
            BaseProps: ModalProps,
            // Modal
            // ModalComponent,
            // ModalProps,

            // 显示文本格式化和value格式化
            valueFormatter,

            // Modal: display properties
            portal,
            animation,
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

            // Combo|Main: DatePicker Control properties
            titleFormatter,
            min,
            max,
            type, // year | quarter | month | date | time | datetime
            onError,
            ranges,
            modal, // 快捷选择弹出方式
            separator,

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
          onVisibleChange={setVisible}
          visible={ModalProps?.visible === undefined ? visible : ModalProps.visible}
        />
      </Fragment>
    )
  }
)

export default Combo
