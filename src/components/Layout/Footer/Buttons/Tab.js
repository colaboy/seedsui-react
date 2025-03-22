import React, { useState } from 'react'

// 内库使用-start
import ActionSheet from './../../../ActionSheet'
// 内库使用-end

/* 测试使用-start
import { ActionSheet } from 'seedsui-react'
测试使用-start */

// 图文组合
export default function Tab({ icon, type, id, name, children, onChange }) {
  // ActionSheet
  const [visible, setVisible] = useState(false)
  function handleClick() {
    if (Array.isArray(children) && children.length) {
      setVisible(true)
    }
    onChange && onChange({ type, id, name })
  }

  // 获取选中状态的Node
  function getIconNode() {
    if (typeof icon === 'string') {
      return <i className={icon} />
    }
    if (typeof icon === 'function') {
      return icon({ type, id, name })
    }
    if (React.isValidElement(icon)) {
      return icon
    }

    return <i className={`layout-footer-tab-icon-more`} />
  }

  return (
    <>
      <div className="layout-footer-tab" onClick={handleClick}>
        <span className={`layout-footer-tab-icon`}>{getIconNode()}</span>
        <div className="layout-footer-tab-name">{name}</div>
      </div>

      {Array.isArray(children) && children.length ? (
        <ActionSheet.Modal
          visible={visible}
          list={children}
          onChange={(newValue) => {
            onChange && onChange(newValue)
            setVisible(false)
          }}
          onVisibleChange={setVisible}
        />
      ) : null}
    </>
  )
}
