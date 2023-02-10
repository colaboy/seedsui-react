import React from 'react'
import ReactRender from './../ReactRender'
import Toast from './Toast'

// eslint-disable-next-line
export default function ({ content, onVisibleChange, ...props }) {
  // 保持单例
  if (!window.SeedsUIReactToastContainer) {
    window.SeedsUIReactToastContainer = document.createDocumentFragment()
  }

  // 移除
  function destroy() {
    let modal = document.getElementById('__SeedsUI_toast_el__')
    if (!modal) return
    let mask = modal.parentNode
    mask.classList.remove('active')
    modal.classList.remove('active')
    if (onVisibleChange) onVisibleChange(false)
    setTimeout(() => {
      ReactRender.unmount(window.SeedsUIReactToastContainer)
    }, 300)
  }

  // 渲染
  function render() {
    // 渲染组件, 先不显示
    ReactRender.render(
      <Toast
        id="__SeedsUI_toast_el__"
        visible={false}
        onVisibleChange={(visible) => {
          if (!visible) {
            destroy()
          }
        }}
        {...props}
      >
        {content}
      </Toast>,
      window.SeedsUIReactToastContainer
    )
    // 渲染完成后补充active, 解决渲染后动画不生效的问题
    setTimeout(() => {
      let modal = document.getElementById('__SeedsUI_toast_el__')
      if (!modal) return
      let mask = modal.parentNode
      mask.classList.add('active')
      modal.classList.add('active')
      if (onVisibleChange) onVisibleChange(true)
    }, 100)
  }
  render()
}
