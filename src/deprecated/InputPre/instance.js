// InputPre 自增高控件
var InputPre = function (container, params) {
  /* -----------------------
  Model
	----------------------- */
  var defaults = {
    preClass: 'input-pre pre',
    inputClass: 'input-pre'
  }
  params = params || {}
  for (var def in defaults) {
    if (params[def] === undefined) {
      params[def] = defaults[def]
    }
  }
  var s = this
  s.params = params

  // Container
  s.container = typeof container === 'string' ? document.querySelector(container) : container
  if (!s.container) {
    console.log('SeedsUI Error：未找到InputPre的DOM对象，请检查传入参数是否正确')
    return
  }

  // Pre
  s.pre = s.container.querySelector('.' + s.params.preClass)
  if (!s.container) {
    console.log('SeedsUI Error：未找到InputPre的pre，请检查传入参数是否正确')
    return
  }

  // Input
  s.input = s.container.querySelector('.' + s.params.inputClass)
  if (!s.input) {
    console.log('SeedsUI Error：未找到InputPre的input，请检查传入参数是否正确')
    return
  }

  /* -----------------------
	Touch Events
	----------------------- */
  s.events = function (detach) {
    var touchTarget = s.input
    var action = detach ? 'removeEventListener' : 'addEventListener'
    touchTarget[action]('input', s.preAutoSize, false)
  }
  // attach、dettach事件
  s.attach = function () {
    s.events()
  }
  s.detach = function () {
    s.events(true)
  }
  s.attach()
  /* -----------------------
	Method
	----------------------- */
  s.preAutoSize = () => {
    s.input.style.height = s.pre.clientHeight + 'px'
  }
}

export default InputPre
