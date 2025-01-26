import React, { forwardRef } from 'react'
import InputText from './../Text'

// 内库使用-start
import Bridge from './../../../utils/Bridge'
import LocaleUtil from './../../../utils/LocaleUtil'
import Clipboard from './../../../utils/Clipboard'
import Toast from './../../Toast'
import Modal from './../../Modal'
// 内库使用-end

/* 测试使用-start
import { Bridge, LocaleUtil, Clipboard, Toast, Modal } from 'seedsui-react'
测试使用-end */

const Url = forwardRef(({ onClick, type, ...props }, ref) => {
  function copyLink(url) {
    Clipboard.copy(url, {
      success: () => {
        Toast.show({
          content: LocaleUtil.locale('链接已复制到剪贴板')
        })
      },
      fail: () => {
        Modal.alert({
          maskProps: {
            style: {
              zIndex: 100
            }
          },
          title: LocaleUtil.locale('提示'),
          content: LocaleUtil.locale('链接复制到剪贴板失败, 请长按复制') + `<br/>${url}`
        })
      }
    })
  }

  const handleClick = (e) => {
    onClick && onClick(e)

    if (!props?.readOnly && !props?.disabled) return

    // 网址不再需要协议前缀 有前缀则保留，无前缀则手动拼接http协议作为前缀
    let value = e.target.value
    let url = /^(https|http)?:\/\//.test(value) ? value : `http://${value}`

    // 只读时复制连接或打开链接
    if (Bridge.platform === 'wq' || Bridge.platform === 'dinghuo') {
      try {
        Bridge.invoke('openDefaultBrowser', { url }, function (res) {
          if (![res?.err_msg, res?.errMsg].includes('openDefaultBrowser:ok')) {
            copyLink(url)
          }
        })
      } catch (err) {
        copyLink(url)
      }
    } else {
      copyLink(url)
    }
  }

  return <InputText ref={ref} {...props} onClick={handleClick} type="url" />
})

export default Url
