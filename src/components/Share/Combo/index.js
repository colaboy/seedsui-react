import React, { useImperativeHandle, useRef, forwardRef, useState } from 'react'
import support from './../utils/support'
import Modal from './../Modal'

// Combo
const Combo = (
  {
    // Modal
    portal,
    modalProps,
    modal,

    // Main
    shareTo,
    /*
    {
      wechat|wecom|dingtalk|lark: {
        title = '', // 分享标题
        description = '', // 分享描述
        imageUrl = '', // 分享图标
        url = '' // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      }
    }
    */
    onError,
    onSuccess,

    // Combo
    children,
    ...props
  },
  ref
) => {
  const [visible, setVisible] = useState(false)

  const comboRef = useRef(null)
  const modalRef = useRef(null)
  useImperativeHandle(ref, () => {
    return {
      ...modalRef.current,
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
      getModalDOM: modalRef?.current?.getRootDOM
    }
  })

  // 点击签名
  function handleClick() {
    setVisible(true)
  }

  // 显示项
  function getChildren() {
    if (support(shareTo)) {
      return children ? children : 'Share to'
    }
    return null
  }

  return (
    <>
      <div
        ref={comboRef}
        {...props}
        className={`share-button${props?.className ? ' ' + props.className : ''}`}
        onClick={handleClick}
      >
        {getChildren()}
      </div>
      {typeof modal === 'function' ? (
        modal({
          modalProps,
          ref,
          portal,
          visible,
          onVisibleChange,
          // Main
          shareTo,
          onError,
          onSuccess
        })
      ) : (
        <Modal
          {...(modalProps || {})}
          ref={modalRef}
          portal={portal}
          visible={visible}
          onVisibleChange={(newVisible) => {
            setVisible(newVisible)
          }}
          // Main
          shareTo={shareTo}
          onError={onError}
          onSuccess={onSuccess}
        />
      )}
    </>
  )
}

export default forwardRef(Combo)
