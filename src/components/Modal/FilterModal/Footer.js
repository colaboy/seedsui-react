import React from 'react'

// 内库使用-start
import LocaleUtil from './../../../utils/LocaleUtil'
import Layout from './../../Layout'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil, Layout } from 'seedsui-react'
测试使用-start */

// 侧边查询底部按钮
export default function FilterFooter({ onConfig, onReset, onOk }) {
  const buttons = []
  if (onConfig) {
    buttons.push({
      type: 'tab',
      id: 'config',
      icon: 'seeds-icon-config',
      name: LocaleUtil.locale('设置', 'SeedsUI_config')
    })
  }
  if (onReset) {
    buttons.push({
      id: 'reset',
      name: LocaleUtil.locale('重置', 'SeedsUI_reset')
    })
  }
  if (onOk) {
    buttons.push({
      id: 'ok',
      primary: true,
      name: LocaleUtil.locale('确定', 'SeedsUI_ok')
    })
  }

  console.log(buttons)
  return (
    <Layout.Footer
      buttons={buttons}
      onChange={(item) => {
        if (item.id === 'config') {
          onConfig && onConfig()
        } else if (item.id === 'reset') {
          onReset && onReset()
        } else if (item.id === 'ok') {
          onOk && onOk()
        }
      }}
    />
  )
}
