import React from 'react'
import locale from 'library/utils/locale'

import { Button } from 'seedsui-react'
import Layout from 'library/components/Layout'

// 侧边查询底部按钮
export default function FilterContent({ onReset, onOk }) {
  return (
    <Layout.Footer className="flex bg-white border-t">
      <Button className="flex lg bg-white flex-1" onClick={onReset}>
        {locale('重置', 'library.4b9c3271dc2f299dc3aeffb369187513')}
      </Button>
      <Button className="flex lg primary flex-1" onClick={onOk}>
        {locale('确定', 'library.38cf16f2204ffab8a6e0187070558721')}
      </Button>
    </Layout.Footer>
  )
}
