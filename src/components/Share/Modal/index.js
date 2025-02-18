import React, { forwardRef, useRef, useImperativeHandle } from 'react'
import Main from './../Main'

// 内库使用-start
import LocaleUtil from './../../../utils/LocaleUtil'
import BaseModal from './../../Modal'
import SafeArea from './../../SafeArea'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil, Modal as BaseModal, SafeArea } from 'seedsui-react'
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
      return {
        ...modalRef?.current,
        ...mainRef?.current
      }
    })

    return (
      <BaseModal
        {...props}
        ref={modalRef}
        onVisibleChange={onVisibleChange}
        animation={animation}
        className={`share-modal${SafeArea.getSafeAreaClassName(safeArea)}${
          className ? ' ' + className : ''
        }`}
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
