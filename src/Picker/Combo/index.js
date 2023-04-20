import React, {
  forwardRef,
  useRef,
  useImperativeHandle,
  Fragment,
  useState,
  useEffect
} from 'react'
import Input from './../../Input'
import Modal from './../Modal'
import Utils from './Utils'

const Combo = forwardRef(
  (
    {
      // 自定义Modal组件
      ModalComponent,
      ModalProps = {},

      // Modal提升属性
      portal,
      maskProps,
      captionProps,
      submitProps,
      cancelProps,
      slotProps,

      multiple,
      maskClosable = true,
      checkStrictly,
      onlyLeafCheck,
      checkable,
      selectable,
      value,
      list = [], // [{id: '', name: ''}]

      onVisibleChange,
      onBeforeChange,
      onChange,

      // Combo属性
      allowClear,
      readOnly,
      disabled,
      onClick,
      onBeforeOpen,
      onBeforeClose,
      comboRender,
      children,
      ...props
    },
    ref
  ) => {
    const rootRef = useRef(null)
    const modalRef = useRef(null)
    useImperativeHandle(ref, () => {
      return {
        rootDOM: rootRef?.current?.getRootDOM ? rootRef.current.getRootDOM() : rootRef.current,
        modalDOM: modalRef?.current?.modalDOM,
        instance: modalRef?.current?.instance,
        getRootDOM: () => {
          // div
          let rootDOM = rootRef?.current
          // Input.Text
          if (rootRef?.current?.getRootDOM) {
            rootDOM = rootRef.current.getRootDOM()
          }
          return rootDOM
        },
        getModalDOM: modalRef?.current?.getRootDOM,
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

    // 自定义弹窗, 默认使用Picker弹窗
    let ModalNode = Modal
    if (ModalComponent) {
      ModalNode = ModalComponent
    }

    // 伸缩属性(Modal提升属性)
    let PickerModalProps = ModalProps || {}
    // 伸缩属性-展示属性
    if (portal !== undefined) {
      PickerModalProps.portal = portal
    }
    if (maskProps !== undefined) {
      PickerModalProps.maskProps = maskProps
    }
    if (captionProps !== undefined) {
      PickerModalProps.captionProps = captionProps
    }
    if (submitProps !== undefined) {
      PickerModalProps.submitProps = submitProps
    }
    if (cancelProps !== undefined) {
      PickerModalProps.cancelProps = cancelProps
    }
    if (slotProps !== undefined) {
      PickerModalProps.slotProps = slotProps
    }
    // 伸缩属性-选择属性
    if (multiple !== undefined) {
      PickerModalProps.multiple = multiple
    }
    if (maskClosable !== undefined) {
      PickerModalProps.maskClosable = maskClosable
    }
    if (checkStrictly !== undefined) {
      PickerModalProps.checkStrictly = checkStrictly
    }
    if (onlyLeafCheck !== undefined) {
      PickerModalProps.onlyLeafCheck = onlyLeafCheck
    }
    if (checkable !== undefined) {
      PickerModalProps.checkable = checkable
    }
    if (selectable !== undefined) {
      PickerModalProps.selectable = selectable
    }
    // 伸缩属性-值属性
    if (ModalProps?.value === undefined && value !== undefined) {
      PickerModalProps.value = value
    }
    if (list !== undefined) {
      PickerModalProps.list = list
    }
    if (onBeforeChange !== undefined) {
      PickerModalProps.onBeforeChange = onBeforeChange
    }
    if (onChange !== undefined) {
      PickerModalProps.onChange = onChange
    }

    // 允许清空
    if (allowClear) {
      if (readOnly || disabled) {
        // eslint-disable-next-line
        allowClear = false
      } else {
        // eslint-disable-next-line
        allowClear = true
      }
    }
    return (
      <Fragment>
        {/* Combo */}
        {typeof comboRender === 'function' && (
          <div {...props} onClick={handleInputClick} ref={rootRef}>
            {comboRender(value, { displayValue: Utils.getDisplayValue({ value }) })}
          </div>
        )}
        {children && (
          <div {...props} onClick={handleInputClick} ref={rootRef}>
            {children}
          </div>
        )}
        {!children && typeof comboRender !== 'function' && (
          <Input.Text
            allowClear={allowClear}
            value={Utils.getDisplayValue({ value })}
            readOnly
            onChange={onChange}
            {...props}
            onClick={handleInputClick}
            ref={rootRef}
          />
        )}
        {/* Modal */}
        <ModalNode
          ref={modalRef}
          getComboDOM={() => {
            return rootRef.current
          }}
          {...PickerModalProps}
          onVisibleChange={setVisible}
          visible={ModalProps.visible === undefined ? visible : ModalProps.visible}
        />
      </Fragment>
    )
  }
)

export default Combo
