import React from 'react'
import { LocaleUtil, Layout, Button } from 'seedsui-react'
const locale = LocaleUtil.locale

// 底部
function Footer({ onOk, onCancel }) {
  return (
    <Layout.Footer className="bg-white padding">
      {onCancel && (
        <Button className="primary flex radius-m" onClick={onCancel}>
          {locale('打回', 'library.9a7b15dccc5cda2e3db1110678576104')}
        </Button>
      )}
      {onOk && (
        <Button className="primary flex radius-m" onClick={onOk}>
          {locale('确定', 'library.38cf16f2204ffab8a6e0187070558721')}
        </Button>
      )}
    </Layout.Footer>
  )
}

export default Footer
