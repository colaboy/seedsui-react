import React, { forwardRef, useRef, useImperativeHandle } from 'react'
import BaseModal from './../../Modal'
import Main from './../Main'

const Modal = forwardRef(
  (
    {
      // Main
      main,
      mainProps,
      shareTo,
      onError,
      onSuccess,

      // Modal
      animation = 'slideUp',
      className,
      ...props
    },
    ref
  ) => {
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

    return (
      <BaseModal
        {...props}
        ref={modalRef}
        animation={animation}
        className={`share-modal${className ? ' ' + className : ''}`}
      >
        {typeof main === 'function' ? (
          main({
            ref: mainRef,
            mainProps,
            shareTo,
            onError,
            onSuccess
          })
        ) : (
          <Main
            {...(mainProps || {})}
            ref={mainRef}
            shareTo={shareTo}
            onError={onError}
            onSuccess={onSuccess}
          />
        )}
      </BaseModal>
    )
  }
)

export default Modal
