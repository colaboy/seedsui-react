import React from 'react'

// 内库使用-start
import LocaleUtil from './../../../utils/LocaleUtil'
import Layout from './../../Layout'
import Button from './../../Button'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil, Layout, Button } from 'seedsui-react'
测试使用-start */

// 侧边查询底部按钮
export default function FilterContent({ onConfig, onReset, onOk }) {
  return (
    <Layout.Footer className="modal-filtermodal-footer">
      {onConfig && (
        <div className="modal-filtermodal-footer-config" onClick={onConfig}>
          <i className="modal-filtermodal-footer-config-icon" />
          <div className="modal-filtermodal-footer-config-name">{LocaleUtil.locale('设置')}</div>
        </div>
      )}
      {onReset && (
        <Button
          className="modal-filtermodal-footer-button modal-filtermodal-footer-button-reset"
          onClick={onReset}
        >
          {LocaleUtil.locale('重置', 'SeedsUI_cancel')}
        </Button>
      )}
      {onOk && (
        <Button
          className="modal-filtermodal-footer-button modal-filtermodal-footer-button-ok"
          onClick={onOk}
        >
          {LocaleUtil.locale('确定', 'SeedsUI_ok')}
        </Button>
      )}
    </Layout.Footer>
  )
}
