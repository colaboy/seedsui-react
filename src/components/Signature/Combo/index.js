import React, { useImperativeHandle, useRef, forwardRef, useState } from 'react'
import Preview from './Preview'
import Modal from './../Modal'

// 内库使用-start
import LocaleUtil from './../../../utils/LocaleUtil'
import Button from './../../Button'
// 内库使用-end

/* 测试使用-start
import { locale, Button } from 'seedsui-react'
测试使用-end */

// Combo
const Combo = (
  {
    value,
    onBeforeChange,
    onChange,
    // 弹框配置
    portal,
    // 绘画配置
    color,
    backgroundColor,
    ...props
  },
  ref
) => {
  const [visible, setVisible] = useState(false)

  const comboRef = useRef(null)
  const modalRef = useRef(null)
  useImperativeHandle(ref, () => {
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
      modalDOM: modalRef?.current?.rootDOM,
      getModalDOM: modalRef?.current?.getRootDOM
    }
  })

  // 点击签名
  function handleSign() {
    setVisible(true)
  }

  // 修改签名
  function handleChange(base64) {
    setVisible(false)
    onChange?.(base64)
  }
  // 已签显示图片
  if (value && typeof value === 'string') {
    return <Preview value={value} onDelete={onChange ? handleChange : null} />
  }

  // 未签显示签名
  return (
    <>
      <Button
        ref={comboRef}
        {...props}
        className={`signature-button${props?.className ? ' ' + props.className : ''}`}
        onClick={handleSign}
      >
        <i className={`signature-button-icon-add`}></i>
        {/* 文字 */}
        <div className="signature-button-label">
          {LocaleUtil.locale('签名', 'SeedsUI_signature')}
        </div>
      </Button>
      <Modal
        ref={modalRef}
        portal={portal}
        visible={visible}
        value={value}
        onBeforeChange={onBeforeChange}
        onChange={handleChange}
        onVisibleChange={(newVisible) => {
          setVisible(newVisible)
        }}
        // 绘画配置
        color={color}
        backgroundColor={backgroundColor}
      />
    </>
  )
}

export default forwardRef(Combo)
