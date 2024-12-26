import React, { forwardRef } from 'react'
import Device from './../utils/Device'
import Header from './../Header'
import Titlebar from './../Titlebar'

/**
 * @deprecated since version 5.4.9
 * 请使用Layout
 */
const Page = forwardRef(({ animation, titlebarVisible = 'auto', children, ...props }, ref) => {
  // 支持根据标题自动渲染Titlebar
  let titleText = Device.getUrlParameter('showTitlebar')

  if (titlebarVisible === 'auto') {
    // URL中包含titlebar参数显示
    // eslint-disable-next-line
    titlebarVisible =
      window.location.href.indexOf('?showTitlebar=') !== -1 ||
      window.location.href.indexOf('&showTitlebar=') !== -1

    // 全局配置显示
    if (
      window.__SeedsUI_config__ &&
      Object.prototype.toString.call(window.__SeedsUI_config__) === '[object Object]'
    ) {
      if (window.__SeedsUI_config__?.Titlebar?.titlebarVisible) {
        // eslint-disable-next-line
        titlebarVisible = true
      }
    }
  }

  return (
    <section
      ref={ref}
      {...props}
      className={'page' + (props.className ? ' ' + props.className : '')}
      data-animation={animation}
    >
      {titlebarVisible ? (
        <Header>
          <Titlebar caption={decodeURIComponent(decodeURIComponent(titleText || ''))} />
        </Header>
      ) : null}
      {children}
    </section>
  )
})

export default Page
