import React from 'react'

// 内库使用-start
import LocaleUtil from './../../../../../utils/LocaleUtil'
import Layout from './../../../../Layout'
import Button from './../../../../Button'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil, Layout, Button } from 'seedsui-react'
测试使用-end */

// 底部
function Foot({ onOk, onClear }) {
  return (
    <Layout.Footer className="mappage-footer">
      <Button className="mappage-footer-ok" onClick={onOk}>
        {LocaleUtil.locale('确定', 'SeedsUI_ok')}
      </Button>
      <Button className="mappage-footer-clear" onClick={onClear}>
        {LocaleUtil.locale('清空标注', 'SeedsUI_empty_marker')}
      </Button>
    </Layout.Footer>
  )
}
export default Foot
