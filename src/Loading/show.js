import React from 'react'
import ReactRender from './../ReactRender'
import Loading from './Loading'

// 显示Loading
// eslint-disable-next-line
export default function (props) {
  // 保持单例
  if (!window.SeedsUIReactLoadingContainer) {
    window.SeedsUIReactLoadingContainer = document.createDocumentFragment()
  }

  // 渲染
  function render() {
    ReactRender.render(
      <Loading
        id="__SeedsUI_loading_el__"
        portal={document.getElementById('root') || document.body}
        {...(props || {})}
      />,
      window.SeedsUIReactLoadingContainer
    )
  }
  render()
}
