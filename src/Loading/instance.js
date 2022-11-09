// Loading 进度条
var Loading = function (params) {
  /* --------------------
  Model
  -------------------- */
  var defaults = {
    mask: null,
    parent: document.body, // 创建于哪个元素下

    maskCss: '',
    maskClass: 'mask loading-mask', // 加loading-propagation允许点击
    maskActiveClass: 'active',
    loadingClass: 'loading',
    loadingActiveClass: 'active',
    captionClass: 'caption',

    types: ['floating', 'filling', 'custom'],
    type: 'floating', // floating流光 | filling填料环 | custom自定义
    iconClass: 'loading-custom-icon',
    icon: '', // 传入icon的class
    caption: '正在加载...' // 实例化时需要国际化
  }
  params = params || {}
  for (var def in defaults) {
    if (params[def] === undefined) {
      params[def] = defaults[def]
    }
  }
  var s = this
  s.params = params
  s.parent =
    typeof s.params.parent === 'string' ? document.querySelector(s.params.parent) : s.params.parent
  s.mask = null
  s.loading = null

  // Mask
  s.updateMask = function () {
    if (!s.mask || !s.mask.tagName) {
      s.mask = document.createElement('div')
    }
    s.mask.setAttribute('class', s.params.maskClass)
    s.mask.setAttribute('style', s.params.maskCss)
  }

  // Loading
  s.updateLoading = function () {
    if (!s.loading) {
      s.loading = document.createElement('div')
    }
    s.loading.setAttribute('class', s.params.loadingClass + ' loading-floating animated')
    // 流光loading-floating
    var html =
      '<div class="loading-floating-icon">' +
      '<div class="loading-floating-blade"></div>' +
      '<div class="loading-floating-blade"></div>' +
      '<div class="loading-floating-blade"></div>' +
      '<div class="loading-floating-blade"></div>' +
      '<div class="loading-floating-blade"></div>' +
      '<div class="loading-floating-blade"></div>' +
      '<div class="loading-floating-blade"></div>' +
      '<div class="loading-floating-blade"></div>' +
      '<div class="loading-floating-blade"></div>' +
      '<div class="loading-floating-blade"></div>' +
      '<div class="loading-floating-blade"></div>' +
      '<div class="loading-floating-blade"></div>' +
      '</div>' +
      '<div class="loading-floating-caption ' +
      s.params.captionClass +
      '">' +
      s.params.caption +
      '</div>'
    if (s.params.type === 'filling') {
      // 填料环loading-filling
      s.loading.setAttribute('class', s.params.loadingClass + ' loading-filling')
      html =
        '<div class="loading-filling-icon"></div>' +
        '<div class="loading-filling-caption ' +
        s.params.captionClass +
        '">' +
        s.params.caption +
        '</div>'
    } else if (s.params.type === 'custom') {
      // 自定义样式,icon
      s.loading.setAttribute('class', s.params.loadingClass + ' loading-custom')
      html =
        '<span class="' +
        s.params.iconClass +
        ' ' +
        s.params.icon +
        '"></span><p class="loading-custom-caption ' +
        s.params.captionClass +
        '">' +
        s.params.caption +
        '</p>'
    }
    s.loading.innerHTML = html
    s.caption = s.loading.querySelector('.' + s.params.captionClass)
    s.icon = s.loading.querySelector('.' + s.params.iconClass)
  }

  // Caption
  s.updateCaption = function () {
    if (s.caption) {
      s.caption.innerHTML = s.params.caption
    }
  }

  // Icon
  s.updateIcon = function () {
    if (s.icon) {
      s.icon.className = s.params.iconClass + (s.params.icon ? ' ' + s.params.icon : '')
    }
  }

  // 创建DOM
  s.createDOM = function () {
    s.updateMask()
    s.updateLoading()
    s.updateCaption()
    s.updateIcon()
    s.mask.appendChild(s.loading)
    s.parent.appendChild(s.mask)
  }

  // 更新DOM
  s.updateDOM = function () {
    s.updateMask()
    s.updateLoading()
    s.updateCaption()
    s.updateIcon()
  }

  s.update = function () {
    if (s.mask && s.loading) {
      s.updateDOM()
    }
    // 已有DOM则只更新DOM, 如果没有自定义则创建DOM
    if (s.params.mask)
      s.mask =
        typeof s.params.mask === 'string' ? document.querySelector(s.params.mask) : s.params.mask
    if (s.mask && s.mask.tagName) {
      s.loading = s.mask.querySelector('.' + s.params.loadingClass)
      s.updateDOM()
    } else {
      s.createDOM()
    }
  }
  s.update()

  // 更新params
  s.updateParams = function (params = {}) {
    for (var param in params) {
      s.params[param] = params[param]
    }
    s.updateDOM()
  }
  /* --------------------
  Method
  -------------------- */
  s.showMask = function () {
    s.mask.classList.add(s.params.maskActiveClass)
  }
  s.hideMask = function () {
    s.mask.classList.remove(s.params.maskActiveClass)
  }
  s.destroyMask = function () {
    s.mask.parentNode.removeChild(s.mask)
  }

  s.showLoading = function () {
    s.loading.classList.add(s.params.loadingActiveClass)
  }
  s.hideLoading = function () {
    s.loading.classList.remove(s.params.loadingActiveClass)
  }

  s.hide = function () {
    s.hideMask()
    s.hideLoading()
  }
  s.show = function () {
    s.showMask()
    s.showLoading()
  }
  s.destroy = function () {
    s.destroyMask()
  }
}

export default Loading
