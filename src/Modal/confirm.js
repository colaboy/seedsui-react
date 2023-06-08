import locale from './../locale'
import destroy from './destroy'

// 弹出对话框
export default function confirm({
  maskClosable,

  captionProps,
  submitProps,
  cancelProps,
  // 内容
  content,
  onVisibleChange
}) {
  let mask = null

  // 确定按钮
  if (submitProps === undefined) {
    // eslint-disable-next-line
    submitProps = {
      onClick: () => {}
    }
  }

  // 取消按钮
  if (cancelProps === undefined) {
    // eslint-disable-next-line
    cancelProps = {
      onClick: () => {}
    }
  }

  // 更新属性
  function updateAttribute(mask) {
    // 更新标题
    if (captionProps?.caption) {
      mask.querySelector('.modal-caption').classList.remove('hide')
      mask.querySelector('.modal-caption').innerHTML = captionProps.caption
    } else {
      mask.querySelector('.modal-caption').classList.add('hide')
    }

    // 更新内容
    if (content) {
      mask.querySelector('.modal-content').innerHTML = content
    } else {
      mask.querySelector('.modal-content').innerHTML = ''
    }

    // 提交按钮
    if (submitProps?.onClick || submitProps?.caption) {
      mask.querySelector('.modal-ok').classList.remove('hide')
      mask.querySelector('.modal-ok').innerHTML = submitProps?.caption || locale('确定', 'ok')
    } else {
      mask.querySelector('.modal-ok').classList.add('hide')
    }

    // 取消按钮
    if (cancelProps?.onClick || cancelProps?.caption) {
      mask.querySelector('.modal-cancel').classList.remove('hide')
      mask.querySelector('.modal-cancel').innerHTML =
        cancelProps?.caption || locale('取消', 'cancel')
    } else {
      mask.querySelector('.modal-cancel').classList.add('hide')
    }

    // 更新事件中用到的属性（否则事件中将永远读取到的是闭包中的属性，即上次的属性）
    mask.maskClosable = maskClosable
    mask.submitProps = submitProps
    mask.cancelProps = cancelProps
    mask.onVisibleChange = onVisibleChange
  }

  // 点击遮罩
  function handleMaskClick(e) {
    // 读取更新后的属性
    const maskClosable = mask?.maskClosable
    const onVisibleChange = mask?.onVisibleChange

    if (maskClosable) {
      if (onVisibleChange) onVisibleChange(false)
      destroy()
    }
    e.stopPropagation()
  }

  // 点击确定或者取消按钮
  function handleButtonClick(e) {
    let currentTarget = e.currentTarget
    let isOk = currentTarget.classList.contains('modal-ok')

    // 读取更新后的属性
    const buttonProps = isOk ? mask?.submitProps : mask?.cancelProps
    const onVisibleChange = mask?.onVisibleChange

    if (typeof buttonProps?.onClick === 'function') {
      let close = buttonProps.onClick() ?? true
      if (close) {
        if (onVisibleChange) onVisibleChange(false)
        destroy()
      }
    } else {
      if (onVisibleChange) onVisibleChange(false)
      destroy()
    }
    e.stopPropagation()
  }

  // 渲染
  function render() {
    let modalId = '__SeedsUI_modal_el__'
    // 如果没生成成功, 则强制生成
    mask = document.getElementById(modalId)
    if (!mask) {
      // 创建dom
      mask = document.createElement('div')
      mask.setAttribute('class', `mask modal-mask`)
      mask.setAttribute('id', modalId)
      mask.innerHTML = `
        <div class="popup-animation modal modal-alert middle" data-animation="zoom">
          <div class="modal-body">
            <div class="modal-caption hide"></div>
            <div class="modal-content"></div>
          </div>
          <div class="modal-footer">
            <div class="modal-cancel button"></div>
            <div class="modal-ok button"></div>
          </div>
        </div>
      `

      // 添加到dom上
      ;(document.getElementById('root') || document.body).appendChild(mask)

      // 绑定事件
      attach(mask)
    }

    // 更新属性
    updateAttribute(mask)

    // 渲染完成后补充active, 解决渲染后动画不生效的问题
    setTimeout(() => {
      mask = document.getElementById(modalId)
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

  // 绑定事件
  function attach(mask) {
    let okBtn = mask.querySelector('.modal-ok')
    let cancelBtn = mask.querySelector('.modal-cancel')

    // 绑定事件
    mask.removeEventListener('click', handleMaskClick, false)
    mask.addEventListener('click', handleMaskClick, false)
    if (submitProps?.onClick || submitProps?.caption) {
      okBtn.removeEventListener('click', handleButtonClick, false)
      okBtn.addEventListener('click', handleButtonClick, false)
    }
    if (cancelProps?.onClick || cancelProps?.caption) {
      cancelBtn.removeEventListener('click', handleButtonClick, false)
      cancelBtn.addEventListener('click', handleButtonClick, false)
    }
  }

  // 渲染与绑定事件
  render()
}
