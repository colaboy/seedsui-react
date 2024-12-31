// InputPassword 密码框
var InputPassword = function (container, params) {
  /* -----------------------
  Model
	----------------------- */
  var defaults = {
    revealClass: 'input-icon-reveal',
    inputClass: 'input-text'
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

  // Reveal
  s.reveal = s.container.querySelector('.' + s.params.revealClass)
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
    var touchTarget = s.reveal
    var action = detach ? 'removeEventListener' : 'addEventListener'
    touchTarget[action]('click', s.revealAutoSize, false)
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
  s.onReveal = function () {
    if (s.reveal.classList.contains('active')) {
      s.reveal.classList.remove('active')
      s.input.type = 'password'
    } else {
      s.reveal.classList.add('active')
      s.input.type = 'text'
    }
    s.input.focus()
  }
}

export default InputPassword
