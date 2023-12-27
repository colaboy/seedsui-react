import React, { useImperativeHandle, useRef, forwardRef, useState } from 'react'
import { Button } from 'seedsui-react'
import locale from './../../locale'
import Preview from './Preview'
import Modal from './../Modal'

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
    backgroundColor
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
      <Button ref={comboRef} onClick={handleSign}>
        {locale('签名')}
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
