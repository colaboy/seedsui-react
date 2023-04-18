import locale from './../locale'

// 显示Loading
// eslint-disable-next-line
export default function (props) {
  // 渲染
  function render() {
    let loadingId = '__SeedsUI_loading_el__'
    // 如果没生成成功, 则强制生成
    let loadingDOM = document.getElementById(loadingId)
    if (!loadingDOM) {
      loadingDOM = document.createElement('div')
      loadingDOM.setAttribute('class', 'loading-mask mask active')
      loadingDOM.setAttribute('id', loadingId)
      let caption = props?.captionProps?.caption
      caption = typeof caption === 'string' ? caption : locale('加载中...', 'loading')
      loadingDOM.innerHTML = `<div class="loading-floating animated">
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
          <div class="loading-floating-caption">${caption}</div>
        </div>`
      // 添加到dom上
      ;(document.getElementById('root') || document.body).appendChild(loadingDOM)
    }
    // 显示
    loadingDOM.classList.add('active')

    if (typeof props?.onVisibleChange === 'function') {
      props.onVisibleChange(true)
    }
  }
  render()
}
