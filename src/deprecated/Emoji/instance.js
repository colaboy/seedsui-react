// Emoji 表情管理
var Emoji = function (params) {
  /* --------------------
  Model
  -------------------- */
  var defaults = {
    data: null,

    mask: null,
    maskClass: 'emoji-mask',
    maskActiveClass: 'active',
    isClickMaskHide: true,

    containerClass: 'emoji',
    containerActiveClass: 'active',

    submitClass: 'emoji-edit-submit',

    textareaClass: 'emoji-edit-input',

    iconClass: 'emoji-edit-icon', // 展开和收缩按钮

    faceClass: 'emoji-face', // 表情
    faceNameAttr: 'title',
    faceIdAttr: 'data-emoji',
    deleteClass: 'emoji-face-delete', // 删除表情按钮

    carrouselClass: 'emoji-carrousel'
    /*
    callbacks
		onChange:function(s, value)
		onClickMask: function(s)
		onClickSubmit: function(s, value)
    */
  }
  params = params || {}
  for (var def in defaults) {
    if (params[def] === undefined) {
      params[def] = defaults[def]
    }
  }

  // Emoji
  var s = this

  // Params
  s.params = params

  // Mask
  s.mask = typeof s.params.mask === 'string' ? document.querySelector(s.params.mask) : s.params.mask
  if (!s.mask || !s.mask.tagName) {
    console.log('SeedsUI Error：未找到Emoji的mask元素，请检查传入参数是否正确')
    return
  }

  // Container
  s.container = s.mask.querySelector('.' + s.params.containerClass)
  if (!s.container) {
    console.log('SeedsUI Error：未找到Emoji的container元素，请检查传入参数是否正确')
    return
  }

  // Textarea
  s.textarea = s.mask.querySelector('.' + s.params.textareaClass + ' textarea')
  if (!s.textarea) {
    console.log('SeedsUI Error：未找到Emoji的textarea元素，请检查传入参数是否正确')
    return
  }
  if (s.textarea.tagName !== 'TEXTAREA') {
    console.log('SeedsUI Error：Emoji的textarea元素必须为一个textarea')
    return
  }

  // Icon
  s.icon = s.mask.querySelector('.' + s.params.iconClass)
  if (!s.textarea) {
    console.log('SeedsUI Error：未找到Emoji的icon元素，请检查传入参数是否正确')
    return
  }

  // Carrousel
  s.carrousel = s.mask.querySelector('.' + s.params.carrouselClass)
  if (!s.textarea) {
    console.log('SeedsUI Error：未找到Emoji的carrousel元素，请检查传入参数是否正确')
    return
  }
  // 更新params
  s.updateParams = function (params = {}) {
    for (var param in params) {
      s.params[param] = params[param]
    }
  }
  /* --------------------
  Method
	-------------------- */
  // 设置数据
  s.setData = function (data) {
    s.params.data = data
  }
  // 显隐
  s.showMask = function () {
    s.mask.classList.add(s.params.maskActiveClass)
  }
  s.hideMask = function () {
    s.mask.classList.remove(s.params.maskActiveClass)
  }
  s.destroyMask = function () {
    s.mask.parentNode.removeChild(s.mask)
  }
  s.showContainer = function () {
    s.container.classList.add(s.params.containerActiveClass)
  }
  s.hideContainer = function () {
    s.container.classList.remove(s.params.containerActiveClass)
  }
  s.show = function () {
    s.showMask()
    s.showContainer()
  }
  s.hide = function () {
    s.hideMask()
    s.hideContainer()
  }
  // 将文件转成图片
  s.parse = function (str) {
    var emojiExpr = /(\[[\u4E00-\u9FA5]*\])/gm
    var parseStr = str
    while (emojiExpr.exec(str)) {
      if (s.params.data[RegExp.$1]) {
        parseStr = parseStr.replace(
          RegExp.$1,
          '<span ' + s.params.faceIdAttr + '=' + s.params.data[RegExp.$1] + '></span>'
        )
      }
    }
    return parseStr
  }
  // 监听位置
  s.cursorOffset = 0

  // 插入表情文字
  s.insertFace = function (emojiName) {
    // 设置value
    var value = s.textarea.value
    var valueBefore = value.substr(0, s.cursorOffset)
    var valueAfter = value.substr(s.cursorOffset, value.length)
    var valueInsert = emojiName
    s.cursorOffset = s.cursorOffset + emojiName.length
    return valueBefore + valueInsert + valueAfter
  }
  // 删除表情文字
  s.deleteFace = function () {
    // 设置value
    var value = s.textarea.value
    var valueBefore = value.substr(0, s.cursorOffset)
    var valueAfter = value.substr(s.cursorOffset, value.length)
    var isDeleted = false
    if (!valueBefore) return value
    // 匹配光标前的最后一个表情
    for (var face in s.params.data) {
      if (
        valueBefore.lastIndexOf(face) !== -1 &&
        valueBefore.lastIndexOf(face) === valueBefore.length - face.length
      ) {
        valueBefore = valueBefore.substring(0, valueBefore.lastIndexOf(face))
        isDeleted = true
        break
      }
    }
    // 如果没有匹配到表情, 则删除最后一个字符
    if (!isDeleted) {
      valueBefore = valueBefore.substring(0, valueBefore.length - 1)
    }
    s.cursorOffset = valueBefore.length
    return valueBefore + valueAfter
  }
  // 设置光标位置
  s.setCaretPosition = function (input, pos) {
    if (!input) return
    if (input.createTextRange) {
      var range = input.createTextRange()
      range.move('character', pos)
      range.select()
    } else {
      if (input.selectionStart) {
        input.focus()
        input.setSelectionRange(pos, pos)
      } else {
        var value = input.value
        input.focus()
        input.value = ''
        input.value = value
      }
    }
  }
  s.showCarrousel = function () {
    // 解决ios12输入法遮挡的问题
    s.textarea.disabled = true
    setTimeout(() => {
      s.carrousel.style.display = 'block'
      s.icon.classList.add('active')
    }, 100)
  }
  s.hideCarrousel = function () {
    s.carrousel.style.display = 'none'
    s.icon.classList.remove('active')
    s.textarea.disabled = false
  }
  s.toggleCarrousel = function () {
    if (s.carrousel.style.display === 'none') {
      s.showCarrousel()
    } else {
      s.hideCarrousel()
    }
  }
  /* --------------------
  Controller
	-------------------- */
  s.preventDefault = function (e) {
    e.preventDefault()
  }
  s.events = function (detach) {
    var action = detach ? 'removeEventListener' : 'addEventListener'
    s.mask[action]('click', s.onClick, false)
    // ios内核bug兼容
    if (navigator.userAgent.toLowerCase().match(/cpu iphone os (.*?) like mac os/)) {
      // 获取焦点
      s.textarea[action]('focus', s.onFocus, false)
      // 去除获取焦点时的滚动条
      s.mask[action]('touchmove', s.preventDefault, false)
      // 失去焦点
      s.textarea[action]('blur', s.onBlur, false)
    }
    // 获得光标位置
    document[action]('selectionchange', s.onSelectionChange, false)
    s.textarea[action]('input', s.onInput, false)
  }
  s.attach = function () {
    s.events()
  }
  s.detach = function () {
    s.events(false)
  }
  s.onClick = function (e) {
    s.event = e
    var target = e.target
    if (target.classList.contains(s.params.faceClass)) {
      // 点击表情
      let value = s.insertFace(target.getAttribute(s.params.faceNameAttr))
      s.event = e
      if (s.params.onChange) {
        s.params.onChange(s, value)
      } else {
        s.textarea.value = value
        // 设置光标位置
        s.textarea.focus()
        s.setCaretPosition(s.textarea, s.cursorOffset)
      }
    } else if (target.classList.contains(s.params.iconClass)) {
      // 点击展开收缩图标
      s.toggleCarrousel()
    } else if (target.classList.contains(s.params.maskClass)) {
      // 点击遮罩
      if (s.params.onClickMask) s.params.onClickMask(s)
      if (s.params.isClickMaskHide) s.hide()
    } else if (target.classList.contains(s.params.submitClass)) {
      // 点击提交
      if (s.params.onClickSubmit) s.params.onClickSubmit(s, s.textarea.value)
      if (s.params.isClickMaskHide) s.hide()
    } else if (target.classList.contains(s.params.deleteClass)) {
      // 点击删除
      let value = s.deleteFace()
      if (s.params.onChange) {
        s.params.onChange(s, value)
      } else {
        s.textarea.value = value
        // 设置光标位置
        s.textarea.focus()
        s.setCaretPosition(s.textarea, s.cursorOffset)
      }
    } else if (target.tagName === 'TEXTAREA') {
      // 点击文本框
      s.icon.classList.remove('active')
      s.carrousel.style.display = 'none'
      s.textarea.disabled = false
      s.textarea.focus()
    }
    e.stopPropagation()
  }
  // 兼容iphonex迅飞输入法快捷选词栏遮住输入框的问题
  s.onFocus = function () {
    setTimeout(() => {
      document.body.scrollTop = document.body.scrollHeight
    }, 300)
  }
  // 兼容ios12输入法把页面顶上去, 不回弹的问题
  s.onBlur = function () {
    setTimeout(() => {
      document.body.scrollTop = 0
    }, 10)
  }
  // 获得光标位置
  s.onSelectionChange = function (e) {
    if (Object.prototype.toString.call(e.target.activeElement) === '[object HTMLTextAreaElement]') {
      s.cursorOffset = s.textarea.selectionStart
    }
  }
  s.onInput = function (e) {
    s.cursorOffset = e.target.selectionStart
  }
  /* --------------------
  Init
  -------------------- */
  s.init = function () {
    s.attach()
  }
  s.init()
}

export default Emoji
