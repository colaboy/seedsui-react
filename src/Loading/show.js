import locale from './../locale'

// 显示Loading
// eslint-disable-next-line
export default function (props) {
  const { id, maskProps, captionProps, className, style, content, onVisibleChange } = props || {}
  // 渲染
  function render() {
    let loadingId = id || '__SeedsUI_loading_el__'
    // 如果没生成成功, 则强制生成
    let loadingDOM = document.getElementById(loadingId)
    if (!loadingDOM) {
      loadingDOM = document.createElement('div')
      loadingDOM.innerHTML = `<div class="loading-container">
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
      ;(document.getElementById('root') || document.body).appendChild(loadingDOM)
    }

    // 更新dom
    loadingDOM.setAttribute(
      'class',
      `loading-mask mask active${maskProps?.className ? ' ' + maskProps?.className : ''}`
    )
    loadingDOM.setAttribute('id', loadingId)
    for (let key in maskProps?.style || {}) {
      loadingDOM.style[key] = maskProps?.style[key]
    }

    let container = loadingDOM.querySelector('.loading-container')
    if (container) {
      container?.setAttribute(
        'class',
        `loading-container loading-floating animated${className ? ' ' + className : ''}`
      )
      for (let key in style || {}) {
        container.style[key] = style[key]
      }
    }

    let caption = captionProps?.caption || content
    caption = typeof caption === 'string' ? caption : locale('加载中...', 'SeedsUI_loading')
    loadingDOM.querySelector('.loading-content').innerHTML = caption

    // 显示
    loadingDOM.classList.add('active')

    if (typeof onVisibleChange === 'function') {
      onVisibleChange(true)
    }
  }
  render()
}
