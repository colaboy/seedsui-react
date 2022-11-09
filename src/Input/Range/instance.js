// InputRange 范围框
var InputRange = function (container, params) {
  /* -----------------------
  Model
	----------------------- */
  var defaults = {
    tooltipClass: 'input-range-tooltip',
    inputClass: 'input-range-input'
    /*
		Callbacks:
		onChange:function(s)
		*/
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
    console.log('SeedsUI Error：未找到InputRange的DOM对象，请检查传入参数是否正确')
    return
  }

  // Tooltip
  s.tooltip = s.container.querySelector('.' + s.params.tooltipClass)
  if (!s.container) {
    console.log('SeedsUI Error：未找到InputRange的tooltip，请检查传入参数是否正确')
    return
  }

  // Input
  s.input = s.container.querySelector('.' + s.params.inputClass)
  if (!s.input) {
    console.log('SeedsUI Error：未找到InputRange的input，请检查传入参数是否正确')
    return
  }

  /* -----------------------
	Touch Events
	----------------------- */
  s.events = function (detach) {
    var touchTarget = s.container
    var action = detach ? 'removeEventListener' : 'addEventListener'
    touchTarget[action]('touchstart', s.onTouchStart, false)
    touchTarget[action]('mousedown', s.onTouchStart, false)
    touchTarget[action]('touchmove', s.onTouchMove, false)
    touchTarget[action]('touchend', s.onTouchEnd, false)
    touchTarget[action]('mouseup', s.onTouchEnd, false)
    touchTarget[action]('touchcancel', s.onTouchEnd, false)
    touchTarget[action]('click', s.onClick, false)
    s.input[action]('input', s.onInput, false)
  }
  // attach、dettach事件
  s.attach = function () {
    s.events()
  }
  s.detach = function () {
    s.events(true)
  }
  // s.attach()
  /* -----------------------
	Touch Handler
	----------------------- */
  s.onTouchStart = function (e) {
    e.stopPropagation()
  }
  s.onTouchMove = function (e) {
    e.stopPropagation()
  }
  s.onTouchEnd = function (e) {
    e.stopPropagation()
    s.hideToolTip()
    s.event = e
    if (s.params.onChange && !s.input.disabled) s.params.onChange(s)
  }
  s.onClick = function () {
    if (s.input.disabled) {
      s.showToolTip(s.tooltip, s.input)
      setTimeout(() => {
        s.hideToolTip()
      }, 300)
    }
  }
  s.onInput = function () {
    s.showToolTip(s.tooltip, s.input)
  }
  /* -----------------------
	Method
	----------------------- */
  s.showToolTip = function (tooltip, input) {
    //当前值所占百分比
    var percent = ((input.value - input.min) / (input.max - input.min)).toFixed(2)

    //距左的位置
    var dragRange = input.clientWidth * percent
    var offsetLeft = input.offsetLeft + dragRange - 10
    //var currentOffsetLeft=offsetLeft-input.parentNode.offsetLeft

    //滑块内部的实际位置
    var currentBallLeft = 28 * percent

    //当前值的位置-滑块的位置=小球正中间的位置
    var left = offsetLeft - currentBallLeft
    tooltip.innerHTML = input.value
    tooltip.style.visibility = 'visible'
    tooltip.style.left = left + 'px'
  }
  s.hideToolTip = function () {
    s.tooltip.style.visibility = 'hidden'
  }
  /* -----------------------
	Init
	----------------------- */
  s.update = function () {
    if (s.container) {
      s.detach()
    }
    s.attach()
  }
  s.update()
}

export default InputRange
