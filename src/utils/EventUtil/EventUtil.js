// 使用虚拟滚动条解决渲染性能
// import { useInViewport } from 'ahooks'

// 发布订阅模式
const Observer = {
  events: {},
  /*
	events: {
		eventName1: [fn1, fn2],
		eventName2: [fn1, fn2]
	}
	*/
  on: function (eventName, fn) {
    if (!this.events[eventName]) {
      this.events[eventName] = []
    }
    this.events[eventName].push(fn)
  },
  emit: function (eventName, ...args) {
    const fns = this.events[eventName]
    if (!Array.isArray(fns) || !fns.length) return false
    // eslint-disable-next-line
    for (let i = 0, fn; (fn = fns[i++]); ) {
      fn.apply(this, ...args)
    }
  },
  off: function (eventName, fn) {
    let fns = this.events[eventName]
    if (!Array.isArray(fns) || !fns.length) return false
    for (let i = 0; i < fns.length; i++) {
      let _fn = fns[i]
      if (_fn === fn) {
        fns.splice(i, 1)
      }
    }
  },
  destroy: function (eventName) {
    if (!eventName) {
      this.events = {}
    }
    delete this.events[eventName]
  }
}

export default Observer
