import React, {
  forwardRef,
  useRef,
  useImperativeHandle,
  Fragment,
  useState,
  useEffect
} from 'react'

import ComboWrapper from './ComboWrapper'
import FilterModal from './../FilterModal'

// FilterCombo
const FilterCombo = forwardRef(
  (
    {
      // Modal
      modalProps,

      // Combo
      onClick,
      onBeforeOpen,
      combo,
      onVisibleChange,

      children,
      ...props
    },
    ref
  ) => {
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
    async function handleClick(e) {
      if (!visible && typeof onBeforeOpen === 'function') {
        let goOn = await onBeforeOpen()
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

    function getComboNode() {
      if (combo || children) {
        return (
          <ComboWrapper {...props} onClick={handleClick} ref={comboRef}>
            {typeof combo === 'function' ? combo() : combo || children}
          </ComboWrapper>
        )
      }

      return (
        <ComboWrapper
          {...props}
          className={`modal-filtercombo-button${props?.className ? ' ' + props.className : ''}`}
          onClick={handleClick}
          ref={comboRef}
        >
          <i className="modal-filtercombo-button-icon" />
        </ComboWrapper>
      )
    }
    return (
      <Fragment>
        {/* Combo */}
        {getComboNode()}

        {/* Modal */}
        <FilterModal
          ref={modalRef}
          {...modalProps}
          onVisibleChange={setVisible}
          visible={visible}
        />
      </Fragment>
    )
  }
)

export default FilterCombo
