// 第三方库导入
import React from 'react'
import { LocaleUtil, Layout, Button } from 'seedsui-react'
// 项目内部模块导入
// 样式图片等资源文件导入

const locale = LocaleUtil.locale

// 底部
function Footer({ ok, onOk, cancel, onCancel }) {
  return (
    <Layout.Footer className="bg-white padding">
      {onCancel && (
        <Button className="primary flex radius-m" onClick={onCancel}>
          {cancel || locale('Back')}
        </Button>
      )}
      {onOk && (
        <Button className="primary flex radius-m" onClick={onOk}>
          {ok || locale('Ok')}
        </Button>
      )}
    </Layout.Footer>
  )
}

export default Footer
