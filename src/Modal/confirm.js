import React from 'react'
import ReactRender from './../ReactRender'
import Modal from './Modal'

// eslint-disable-next-line
export default function ({
  maskClosable,

  captionProps,
  submitProps,
  cancelProps,
  // 内容
  content,
  ...props
}) {
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

  // 移除
  function destroy() {
    let modal = document.getElementById('__SeedsUI_modal_el__')
    if (!modal) return
    let mask = modal.parentNode
    mask.classList.remove('active')
    modal.classList.remove('active')

    setTimeout(() => {
      if (window.SeedsUIReactModalContainer) {
        ReactRender.unmount(window.SeedsUIReactModalContainer)
      }
    }, 300)
  }

  // 渲染
  function render() {
    // 如果已经存在此节点了，则先移除此节点
    if (window.SeedsUIReactModalContainer) {
      ReactRender.unmount(window.SeedsUIReactModalContainer)
      window.SeedsUIReactModalContainer = null
    }

    // 创建新节点
    let SeedsUIReactModalContainer = document.createDocumentFragment()

    // 渲染组件, 先不显示
    ReactRender.render(
      <Modal
        id="__SeedsUI_modal_el__"
        {...props}
        visible={false}
        maskClosable={maskClosable ?? false}
        onVisibleChange={(visible) => {
          if (!visible) {
            destroy()
          }
        }}
        captionProps={captionProps}
        submitProps={submitProps}
        cancelProps={cancelProps}
      >
        {content}
      </Modal>,
      SeedsUIReactModalContainer
    )
    // 渲染完成后补充active, 解决渲染后动画不生效的问题
    setTimeout(() => {
      let modal = document.getElementById('__SeedsUI_modal_el__')
      if (!modal) return
      let mask = modal.parentNode
      mask.classList.add('active')
      modal.classList.add('active')

      // 防止异步移除
      setTimeout(() => {
        window.SeedsUIReactModalContainer = SeedsUIReactModalContainer
      }, 500)
    }, 10)
  }
  render()
}
