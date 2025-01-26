import globalModalId from './globalModalId'

// 渲染
function showMask({ portal, onMaskClick }) {
  // 如果没生成成功, 则强制生成
  let mask = document.querySelector('#' + globalModalId)
  if (!mask) {
    // 创建dom
    mask = document.createElement('div')
    mask.setAttribute('class', `mask modal-mask`)
    mask.setAttribute('id', globalModalId)
    mask.innerHTML = `
      <div class="popup-animation modal modal-alert middle" data-animation="zoom">
        <div class="modal-body">
          <div class="modal-title hide"></div>
          <div class="modal-content"></div>
        </div>
        <div class="modal-footer">
          <div class="modal-cancel"></div>
          <div class="modal-ok"></div>
        </div>
      </div>
    `

    // 添加到dom上
    ;(portal || document.getElementById('root') || document.body).appendChild(mask)

    // 绑定事件
    mask.removeEventListener('click', onMaskClick, false)
    mask.addEventListener('click', onMaskClick, false)
  }

  // 渲染完成后补充active, 解决渲染后动画不生效的问题
  setTimeout(() => {
    mask = document.querySelector('#' + globalModalId)
    if (!mask) return
    // 如果正在移除，则停止移除
    if (mask.timeout) {
      window.clearTimeout(mask.timeout)
    }
    // 动画显示
    mask.classList.add('active')
    mask.querySelector('.modal-alert').classList.add('active')
  }, 10)

  return mask
}

export default showMask
