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
  // 保持单例
  if (!window.SeedsUIReactModalContainer) {
    window.SeedsUIReactModalContainer = document.createDocumentFragment()
  }

  // 确定按钮
  if (submitProps === undefined) {
    submitProps = {
      onClick: () => {}
    }
  }

  // 取消按钮
  if (cancelProps === undefined) {
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
      ReactRender.unmount(window.SeedsUIReactModalContainer)
    }, 300)
  }

  // 渲染
  function render() {
    // 渲染组件, 先不显示
    ReactRender.render(
      <Modal
        id="__SeedsUI_modal_el__"
        {...props}
        visible={false}
        maskClosable={maskClosable ?? false}
        onVisibleChange={destroy}
        captionProps={captionProps}
        submitProps={submitProps}
        cancelProps={cancelProps}
      >
        {content}
      </Modal>,
      window.SeedsUIReactModalContainer
    )
    // 渲染完成后补充active, 解决渲染后动画不生效的问题
    setTimeout(() => {
      let modal = document.getElementById('__SeedsUI_modal_el__')
      if (!modal) return
      let mask = modal.parentNode
      mask.classList.add('active')
      modal.classList.add('active')
    })
  }
  render()
}
