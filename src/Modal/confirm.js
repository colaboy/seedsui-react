import locale from './../locale'
import destroy from './destroy'

// 弹出对话框
export default function confirm({
  portal,

  maskClosable,
  onVisibleChange,

  // 遮罩
  maskProps,

  // 标题
  captionProps,

  // 内容
  content,
  contentProps,

  // 底部
  footerProps,

  // 确定
  submitProps,
  // 取消, 默认显示取消按钮
  cancelProps = {}
}) {
  let mask = null

  // 确定按钮
  if (submitProps === undefined) {
    // eslint-disable-next-line
    submitProps = {
      onClick: () => {}
    }
  }

  // 更新class和style
  function updateStyle({ target, props, baseClassName }) {
    if (!target) return

    const { style, className } = props || {}
    // 还原样式
    target.setAttribute('style', '')
    target.setAttribute('class', baseClassName)

    // 增加样式
    if (style) {
      for (let stylePropName in style) {
        target.style[stylePropName] = style[stylePropName]
      }
    }
    if (className) {
      target.className = `${baseClassName}${className ? ' ' + className : ''}`
    }
  }

  // 更新属性
  function updateAttribute(mask) {
    // 更新遮罩
    updateStyle({ target: mask, props: maskProps, baseClassName: 'mask modal-mask' })

    // 更新标题
    let captionDOM = mask.querySelector('.modal-caption')
    updateStyle({ target: captionDOM, props: captionProps, baseClassName: 'modal-caption' })
    if (captionProps?.caption) {
      captionDOM.classList.remove('hide')
      captionDOM.innerHTML = captionProps.caption
    } else {
      captionDOM.classList.add('hide')
    }

    // 更新内容
    let contentDOM = mask.querySelector('.modal-content')
    updateStyle({ target: contentDOM, props: contentProps, baseClassName: 'modal-content' })
    if (content) {
      contentDOM.innerHTML = content
    } else {
      contentDOM.innerHTML = ''
    }

    // 更新底部
    let footerDOM = mask.querySelector('.modal-footer')
    updateStyle({ target: footerDOM, props: footerProps, baseClassName: 'modal-footer' })

    // 提交按钮
    let submitDOM = mask.querySelector('.modal-ok')
    updateStyle({ target: submitDOM, props: submitProps, baseClassName: 'modal-ok' })
    if (submitProps || submitProps?.caption) {
      submitDOM.classList.remove('hide')
      submitDOM.innerHTML = submitProps?.caption || locale('确定', 'ok')
    } else {
      submitDOM.classList.add('hide')
    }

    // 取消按钮
    let cancelDOM = mask.querySelector('.modal-cancel')
    updateStyle({ target: cancelDOM, props: cancelProps, baseClassName: 'modal-cancel' })
    if (cancelProps || cancelProps?.caption) {
      cancelDOM.classList.remove('hide')
      cancelDOM.innerHTML = cancelProps?.caption || locale('取消', 'cancel')
    } else {
      cancelDOM.classList.add('hide')
    }

    // 更新事件中用到的属性（否则事件中将永远读取到的是闭包中的属性，即上次的属性）
    mask.maskClosable = maskClosable
    mask.submitProps = submitProps
    mask.cancelProps = cancelProps
    mask.onVisibleChange = onVisibleChange

    // dom透传
    if (toString.call(portal).indexOf('HTML') !== -1) {
      portal.appendChild(mask)
    } else {
      ;(document.getElementById('root') || document.body).appendChild(mask)
    }
  }

  // 点击遮罩
  function handleMaskClick(e) {
    e.stopPropagation()

    // 点击确定或取消按钮
    if (e.target.classList.contains('modal-cancel') || e.target.classList.contains('modal-ok')) {
      handleButtonClick(e)
      return
    }

    // 点击遮罩
    if (e.target.classList.contains('mask')) {
      // 读取更新后的属性
      const maskClosable = mask?.maskClosable
      const onVisibleChange = mask?.onVisibleChange

      if (maskClosable) {
        if (onVisibleChange) onVisibleChange(false)
        destroy(e.currentTarget)
      }
    }
  }

  // 点击确定或者取消按钮
  function handleButtonClick(e) {
    let isOk = e.target.classList.contains('modal-ok')

    // 读取更新后的属性
    const buttonProps = isOk ? mask?.submitProps : mask?.cancelProps
    const onVisibleChange = mask?.onVisibleChange

    if (typeof buttonProps?.onClick === 'function') {
      let close = buttonProps.onClick() ?? true
      if (close) {
        if (onVisibleChange) onVisibleChange(false)
        destroy(e.currentTarget.closest('.modal-mask'))
      }
    } else {
      if (onVisibleChange) onVisibleChange(false)
      destroy(e.currentTarget.closest('.modal-mask'))
    }
    e.stopPropagation()
  }

  // 渲染
  function render() {
    let modalId = '__SeedsUI_modal_el__'
    // 如果没生成成功, 则强制生成
    let container = document.body
    if (toString.call(portal).indexOf('HTML') !== -1) {
      container = portal
    }
    mask = container.querySelector('#' + modalId)
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
            <div class="modal-cancel"></div>
            <div class="modal-ok"></div>
          </div>
        </div>
      `

      // 添加到dom上
      ;(container || document.getElementById('root') || document.body).appendChild(mask)

      // 绑定事件
      attach(mask)
    }

    // 更新属性
    updateAttribute(mask)

    // 渲染完成后补充active, 解决渲染后动画不生效的问题
    setTimeout(() => {
      mask = container.querySelector('#' + modalId)
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
    // 绑定事件
    mask.removeEventListener('click', handleMaskClick, false)
    mask.addEventListener('click', handleMaskClick, false)
  }

  // 渲染与绑定事件
  render()
  return mask
}
