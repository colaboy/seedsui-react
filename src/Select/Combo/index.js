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

import ChildrenWrapper from './ChildrenWrapper'

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
      onSearch,

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
      checkStrictly, // 严格模式: 级联 true: 不级联, false: 级联, children: 子级不级联父级
      showCheckedStrategy, // 定义选中项回填的方式: leaf仅显示所有末级节点; parent仅显示父级节点
      enableHalfChecked, // 是否启用半选功能
      preserveValue, // 保留不在树结构中的value
      onlyLeafCheck, // 仅允许点击末级节点
      selectable, // 点击选中, 根据checkable判断是否启用selectable, 没有checkbox时则启用
      defaultExpandAll, // 默认展开
      TreeProps,

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
      const {
        rootDOM: modalDOM,
        getRootDOM: getModalDOM,
        ...otherModalRef
      } = modalRef?.current || {}
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

        modalDOM: modalDOM,
        getModalDOM: getModalDOM,
        ...otherModalRef,

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
        if (goOn !== undefined && !goOn) return
      }
      if (visible && typeof onBeforeClose === 'function') {
        let goOn = await onBeforeClose()
        if (goOn !== undefined && !goOn) return
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
          <ChildrenWrapper {...props} onClick={handleInputClick} ref={comboRef}>
            {comboRender({
              value,
              displayValue
            })}
          </ChildrenWrapper>
        )}
        {children && (
          <ChildrenWrapper {...props} onClick={handleInputClick} ref={comboRef}>
            {children}
          </ChildrenWrapper>
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
            allowClear,
            onSelect,
            onBeforeChange,
            onChange,
            onSearch,

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
            checkStrictly, // 严格模式: 级联 true: 不级联, false: 级联, children: 子级不级联父级
            showCheckedStrategy, // 定义选中项回填的方式: leaf仅显示所有末级节点; parent仅显示父级节点
            enableHalfChecked, // 是否启用半选功能
            preserveValue, // 保留不在树结构中的value
            onlyLeafCheck, // 仅允许点击末级节点
            selectable, // 点击选中, 根据checkable判断是否启用selectable, 没有checkbox时则启用
            defaultExpandAll, // 默认展开
            TreeProps
          })}
          onVisibleChange={(newVisible) => {
            setVisible(newVisible)
          }}
          visible={ModalProps?.visible === undefined ? visible : ModalProps.visible}
        />
      </Fragment>
    )
  }
)

export default Combo
