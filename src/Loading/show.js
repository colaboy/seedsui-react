import React from 'react'
import ReactRender from './../ReactRender'
import Loading from './Loading'
import locale from './../locale'

// 显示Loading
// eslint-disable-next-line
export default function (props) {
  // 保持单例
  if (!window.SeedsUIReactLoadingContainer) {
    window.SeedsUIReactLoadingContainer = document.createDocumentFragment()
  }

  // 渲染
  function render() {
    let loadingId = '__SeedsUI_loading_el__'
    ReactRender.render(
      <Loading
        id={loadingId}
        portal={document.getElementById('root') || document.body}
        {...(props || {})}
      />,
      window.SeedsUIReactLoadingContainer
    )
    // 如果没生成成功, 则强制生成
    requestAnimationFrame(() => {
      if (!document.getElementById(loadingId)) {
        const loadingDOM = document.createElement('div')
        loadingDOM.setAttribute('class', 'loading-mask mask active')
        loadingDOM.innerHTML = `<div id="__SeedsUI_loading_el__" class="loading-floating animated">
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
          <div class="loading-floating-caption">${
            props?.captionProps?.caption || locale('加载中...', 'loading')
          }</div>
        </div>`
        ;(document.getElementById('root') || document.body).appendChild(loadingDOM)
      }
    })
  }
  render()
}
