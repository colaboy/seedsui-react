import React from 'react'
import { LocaleUtil, Layout, Button } from 'seedsui-react'
const locale = LocaleUtil.locale

// 底部
function Footer({ okText, onOk, cancelText, onCancel }) {
  return (
    <Layout.Footer className="bg-white padding">
      {onCancel && (
        <Button className="primary flex radius-m" onClick={onCancel}>
          {cancelText || locale('Back')}
        </Button>
      )}
      {onOk && (
        <Button className="primary flex radius-m" onClick={onOk}>
          {okText || locale('Ok')}
        </Button>
      )}
    </Layout.Footer>
  )
}

export default Footer
