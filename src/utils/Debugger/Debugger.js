import locale from './../locale'
import createDebugElement from './createDebugElement'
import triggerClickLimit from './triggerClickLimit'

// 内库使用-start
import Toast from './../Toast'
// 内库使用-end

/* 测试使用-start
import { Toast } from 'seedsui-react'
测试使用-end */

// 如果DB里存储debug, 则默认开启debug模式
if (window.sessionStorage.getItem('_debug_')) {
  window.top._debug_ = true
}

// Debugger Tools
let Debugger = {
  debugVisible: undefined,
  // Add bind: click debug element 10 times and then show debug panel
  bindDebug: function (container) {
    let target = container || document.getElementById('_debug_trigger_')
    if (!target) {
      target = createDebugElement()
    }
    if (!target) return
    triggerClickLimit(target, 10, () => {
      this.showDebug()
    })
  },
  // Show debug panel
  showDebug: function () {
    if (this.debugVisible) return true
    return new Promise((resolve) => {
      import('vconsole')
        .then((VConsole) => {
          if (VConsole?.default) {
            // eslint-disable-next-line
            VConsole = VConsole.default
          }
          window.top._debug_ = true
          window.sessionStorage.setItem('_debug_', '1')
          this.debugVisible = new VConsole()
          resolve(true)
        })
        .catch((error) => {
          Toast.show({
            content: locale('打开调试面板失败'),
            maskClickable: true
          })
          resolve(false)
        })
    })
  }
}

export default Debugger
