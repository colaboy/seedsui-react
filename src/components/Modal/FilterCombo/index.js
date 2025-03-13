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
      // Combo
      onClick,
      onBeforeOpen,
      combo,
      onVisibleChange,

      // Modal
      modalProps,
      onCancel,
      onOk,
      onReset,
      onConfig,
      children,
      ...props
    },
    ref
  ) => {
    // Expose methods
    const comboRef = useRef(null)
    const modalRef = useRef(null)

    // 控制Modal显隐
    const [visible, setVisible] = useState(null)

    useImperativeHandle(ref, () => {
      return {
        ...comboRef?.current,
        ...modalRef?.current,
        close: () => {
          setVisible(false)
        },
        open: () => {
          setVisible(true)
        }
      }
    })

    useEffect(() => {
      if (visible === null) return
      typeof modalProps?.onVisibleChange === 'function' && modalProps.onVisibleChange(visible)
      typeof onVisibleChange === 'function' && onVisibleChange(visible)

      // eslint-disable-next-line
    }, [visible])

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

    function getComboNode() {
      if (combo) {
        return (
          <ComboWrapper {...props} onClick={handleClick} ref={comboRef}>
            {typeof combo === 'function' ? combo() : combo}
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
          onCancel={onCancel}
          onOk={onOk}
          onReset={onReset}
          onConfig={onConfig}
        >
          {children}
        </FilterModal>
      </Fragment>
    )
  }
)

export default FilterCombo
