import React from 'react'

// 测试使用
// import { locale, Layout, Button } from 'seedsui-react'

// 内库使用
import locale from './../../../../../utils/locale'
import Layout from './../../../../Layout'
import Button from './../../../../Button'

// 底部
function Foot({ onOk, onClear }) {
  return (
    <Layout.Footer className="mappage-footer">
      <Button className="mappage-footer-ok" onClick={onOk}>
        {locale('确定', 'SeedsUI_ok')}
      </Button>
      <Button className="mappage-footer-clear" onClick={onClear}>
        {locale('清空标注', 'SeedsUI_empty_marker')}
      </Button>
    </Layout.Footer>
  )
}
export default Foot
