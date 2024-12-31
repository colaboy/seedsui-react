import locale from './../../utils/locale'

// 显示Loading
// eslint-disable-next-line
export default function (props) {
  const { id, maskProps, captionProps, className, style, content, onVisibleChange } = {
    ...(this?.defaultProps || {}),
    ...(props || {})
  }

  // 渲染
  function render() {
    let loadingId = id || '__SeedsUI_loading_mask__'
    let mask = document.getElementById(loadingId)

    // 如果没生成成功, 则强制生成
    if (!mask) {
      mask = document.createElement('div')
      mask.innerHTML = `<div class="loading-container">
          <div class="loading-floating-icon">
            <div class="loading-floating-blade"></div>
            <div class="loading-floating-blade"></div>
            <div class="loading-floating-blade"></div>
            <div class="loading-floating-blade"></div>
            <div class="loading-floating-blade"></div>
            <div class="loading-floating-blade"></div>
            <div class="loading-floating-blade"></div>
            <div class="loading-floating-blade"></div>
            <div class="loading-floating-blade"></div>
            <div class="loading-floating-blade"></div>
            <div class="loading-floating-blade"></div>
            <div class="loading-floating-blade"></div>
          </div>
          <div class="loading-floating-caption loading-content"></div>
        </div>`

      // 添加到dom上
      let root = document.getElementById('root') || document.body
      root.appendChild(mask)
    }

    // 更新mask
    mask.setAttribute(
      'class',
      `loading-mask mask active${maskProps?.className ? ' ' + maskProps?.className : ''}`
    )
    mask.setAttribute('id', loadingId)
    mask.setAttribute('style', '')
    for (let key in maskProps?.style || {}) {
      mask.style[key] = maskProps?.style[key]
    }

    // 更新container
    let container = mask.querySelector('.loading-container')
    if (container) {
      container?.setAttribute(
        'class',
        `loading-container loading-floating animated${className ? ' ' + className : ''}`
      )
      container?.setAttribute('style', '')
      for (let key in style || {}) {
        container.style[key] = style[key]
      }
    }

    let caption = captionProps?.caption || content
    caption = typeof caption === 'string' ? caption : locale('加载中...', 'SeedsUI_loading')
    mask.querySelector('.loading-content').innerHTML = caption

    // 显示
    mask.classList.add('active')

    if (typeof onVisibleChange === 'function') {
      onVisibleChange(true)
    }

    return mask
  }
  return render()
}
