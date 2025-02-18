import React, {
  forwardRef,
  useRef,
  useImperativeHandle,
  Fragment,
  useState,
  useEffect
} from 'react'
import getDisplayValue from './getDisplayValue'

import Input from './../../Input'

import ComboWrapper from './ComboWrapper'
import Tags from './Tags'

// Combo
const Combo = forwardRef(
  (
    {
      // Modal
      value,
      onBeforeChange,
      onChange,
      modal: ModalNode,
      modalProps,

      // Combo
      displayValueFormatter,
      autoSize,
      allowClear,
      multiple,
      readOnly,
      disabled,
      onClick,
      onBeforeOpen,
      onBeforeClose,
      combo,
      onVisibleChange,

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
    let displayValue = displayValueFormatter(value)

    // Expose methods
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
          return displayValue
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
        if (goOn === false) return
      }
      if (visible && typeof onBeforeClose === 'function') {
        let goOn = await onBeforeClose()
        if (goOn === false) return
      }
      if (typeof onClick === 'function') {
        onClick(e)
      }

      setVisible(!visible)
    }

    useEffect(() => {
      if (visible === null) return
      typeof modalProps?.onVisibleChange === 'function' && modalProps.onVisibleChange(visible)
      typeof onVisibleChange === 'function' && onVisibleChange(visible)

      // eslint-disable-next-line
    }, [visible])

    // 文本框
    let InputNode = Input.Text
    if (autoSize) {
      InputNode = Input.AutoFit
    }

    function getComboNode() {
      if (combo || children) {
        return (
          <ComboWrapper {...props} onClick={handleInputClick} ref={comboRef}>
            {typeof combo === 'function'
              ? combo({
                  value,
                  displayValue
                })
              : combo || children}
          </ComboWrapper>
        )
      }

      if (multiple === 'tags') {
        return (
          <Tags
            leftIcon={props?.leftIcon}
            rightIcon={props?.rightIcon}
            className={props?.className}
            style={props?.style}
            placeholder={props?.placeholder}
            readOnly={readOnly}
            disabled={disabled}
            allowClear={allowClear}
            value={value}
            onAdd={() => setVisible(true)}
            onEdit={() => setVisible(true)}
            onDelete={async (current) => {
              let currentValue = value.filter((item) => item.id !== current.id)
              // 修改前校验
              if (typeof onBeforeChange === 'function') {
                let goOn = await onBeforeChange(currentValue)
                if (goOn === false) return

                // 修改值
                if (typeof goOn === 'object') {
                  currentValue = goOn
                }
              }
              onChange && onChange(currentValue)
            }}
          />
        )
      }

      return (
        <InputNode
          disabled={disabled}
          allowClear={allowClear}
          value={displayValue}
          readOnly
          {...props}
          clear={(clearParams) => {
            // 只读不显示清空按钮
            if (readOnly || disabled) {
              return null
            }

            // 自定义清空按钮
            if (typeof props?.clear === 'function') {
              return props?.clear({ ...clearParams, value: value, readOnly: readOnly })
            }

            return undefined
          }}
          onClick={handleInputClick}
          onChange={async (text) => {
            // 清空操作
            if (!text) {
              let currentValue = null
              // 修改前校验
              if (typeof onBeforeChange === 'function') {
                let goOn = await onBeforeChange(currentValue)
                if (goOn === false) return

                // 修改值
                if (typeof goOn === 'object') {
                  currentValue = goOn
                }
              }
              onChange && onChange(null)
            }
          }}
          ref={comboRef}
        />
      )
    }
    return (
      <Fragment>
        {/* Combo */}
        {getComboNode()}

        {/* Modal */}
        {ModalNode && (
          <ModalNode
            ref={modalRef}
            getComboDOM={() => {
              return comboRef.current
            }}
            value={value}
            onBeforeChange={onBeforeChange}
            onChange={onChange}
            allowClear={allowClear}
            multiple={multiple}
            {...modalProps}
            onVisibleChange={setVisible}
            visible={visible}
          />
        )}
      </Fragment>
    )
  }
)

export default Combo
