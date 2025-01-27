import React from 'react'
import locale from 'library/utils/locale'

import Layout from 'library/components/Layout'

// 侧边查询底部按钮
export default function FilterContent({ onSave, onCancel }) {
  return (
    <>
      <Layout.Footer className="listpicker-footer border-t">
        <div className="listpicker-footer-button primary" onClick={onSave}>
          {locale('确定', 'library.38cf16f2204ffab8a6e0187070558721')}
        </div>
      </Layout.Footer>
      <Layout.Footer className="listpicker-footer border-t">
        <div className="listpicker-footer-button" onClick={onCancel}>
          {locale('打回', 'library.9a7b15dccc5cda2e3db1110678576104')}
        </div>
        <div className="listpicker-footer-button primary" onClick={onSave}>
          {locale('确定', 'library.38cf16f2204ffab8a6e0187070558721')}
        </div>
      </Layout.Footer>
    </>
  )
}
