import Toast from './../Toast'
import EventUtil from './../EventUtil'

var Debugger = {
  // 日志打印
  vconsole: null,
  vconsoleLogger: function (el) {
    var target = el || document.body
    if (this.vconsole) return
    EventUtil.addHandler(target, 'countclick', (e) => {
      // eslint-disable-next-line
      top._wx_debug_ = true
      if (e.code === '1' && !this.vconsole) {
        import('vconsole').then((VConsole) => {
          if (VConsole && VConsole.default) {
            this.vconsole = new VConsole.default()
          } else {
            Toast.show({ content: '打开调试模式失败' })
          }
        })
      }
    })
  }
}

export default Debugger
