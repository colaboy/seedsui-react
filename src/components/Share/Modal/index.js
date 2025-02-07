import React, { forwardRef, useRef, useImperativeHandle } from 'react'
import Main from './../Main'

// 内库使用-start
import LocaleUtil from './../../../utils/LocaleUtil'
import BaseModal from './../../Modal'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil, Modal as BaseModal } from 'seedsui-react'
测试使用-end */

const Modal = forwardRef(
  (
    {
      safeArea,

      // Main
      mainProps,
      shareTo,
      onError,
      onSuccess,

      // Modal
      animation = 'slideUp',
      className,
      onVisibleChange,
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
        onVisibleChange={onVisibleChange}
        animation={animation}
        className={`share-modal${
          (safeArea === true && ' safeArea') || (safeArea === false && ' clearSafeArea') || ''
        }${className ? ' ' + className : ''}`}
      >
        <div className="share-modal-title">{LocaleUtil.locale('分享到', 'SeedsUI_share_to')}</div>
        <div className="share-modal-main">
          <Main
            {...(mainProps || {})}
            ref={mainRef}
            shareTo={shareTo}
            onError={onError}
            onSuccess={onSuccess}
          />
        </div>
        <div
          className="share-modal-footer-button-cancel"
          onClick={() => {
            onVisibleChange && onVisibleChange(false)
          }}
        >
          {LocaleUtil.locale('取消', 'SeedsUI_cancel')}
        </div>
      </BaseModal>
    )
  }
)

export default Modal
