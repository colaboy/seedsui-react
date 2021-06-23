import React, { forwardRef } from 'react'

const Tabbar = forwardRef(
  (
    {
      style,
      className = 'tabbar-line tabbar-line-width70 border-b', // tabbar-line | tabbar-rect | tabbar-lump | tabbar-dropdown | tabbar-footer

      contentAttribute = {},
      captionAttribute = {},
      sndcaptionAttribute = {},

      list = [],
      // [
      //   {
      //     icon: node,
      //     iconActive: node,
      //     ricon: node,
      //     riconActive: node,

      //     name: string, // 与caption完全相同, 允许传入name或者caption
      //     caption: string,
      //     sndcaption: string,

      //     attribute: object // tab属性
      //   }
      // ]
      rectJustify = true, // react 类型自适应, 矩形tabbar应当有的总宽度

      tiled, // 宽度等分, 默认宽度弹性伸缩
      disabled,
      exceptOnClickActive = true, // 排除点击选中的菜单
      onChange,
      activeIndex = 0,
      ...others
    },
    ref
  ) => {
    function handleClick(e) {
      const target = e.target
      if (exceptOnClickActive && target.classList.contains('active')) return
      const index = target.getAttribute('data-index')
      if (!index) return
      if (onChange) {
        onChange(e, list[index].name || list[index].caption, [list[index]], Number(index))
        e.stopPropagation()
      }
    }
    function getTabbarStyle() {
      var tabbarStyle = {}
      // 矩形tabbar应当有的总宽度
      if (rectJustify && className.hasClass('tabbar-rect')) {
        switch (list.length) {
          case 1:
            tabbarStyle = { width: '30%' }
            break
          case 2:
            tabbarStyle = { width: '50%' }
            break
          case 3:
            tabbarStyle = { width: '50%' }
            break
          default:
            tabbarStyle = {}
        }
      }
      return Object.assign({}, tabbarStyle, style)
    }
    function getTabbarClassName() {
      return (
        'tabbar animated' +
        (className ? ' ' + className : ' tabbar-line-width60') +
        (tiled ? ' tabbar-tiled' : '')
      )
    }
    function getIconDOM(icon, iconActive, isActive) {
      if (isActive) {
        return iconActive ? iconActive : icon
      }
      return icon
    }
    function getTabsDOM() {
      if (!Array.isArray(list)) {
        console.log('SeedsUI: Tabbar的传入参数list类型不正确')
        return
      }
      // tabStyle高度
      var tabStyle = {}
      if (style && style.height) {
        tabStyle = {
          height: style.height
        }
      }
      // 遍历
      return list.map((item, index) => {
        const {
          icon,
          iconActive,
          ricon,
          riconActive,
          name,
          caption,
          sndcaption,
          attribute = {},
          style = {}
        } = item
        let isActive = activeIndex === index
        let liconDOM = null
        if (icon) {
          liconDOM = getIconDOM(icon, iconActive, isActive)
        }
        let riconDOM = null
        if (ricon) {
          riconDOM = getIconDOM(ricon, riconActive, isActive)
        }
        return (
          <li
            className={`tab${isActive ? ' active' : ''}`}
            style={Object.assign(tabStyle, style || {})}
            data-index={index}
            key={index}
            {...attribute}
          >
            {liconDOM && liconDOM}
            <div className="tab-content" {...contentAttribute}>
              <div
                {...captionAttribute}
                className={`tab-caption${
                  captionAttribute.className ? ' ' + captionAttribute.className : ''
                }`}
              >
                {caption || name}
              </div>
              {sndcaption && (
                <div
                  {...sndcaptionAttribute}
                  className={`tab-sndcaption${
                    sndcaptionAttribute.className ? ' ' + sndcaptionAttribute.className : ''
                  }`}
                >
                  {sndcaption}
                </div>
              )}
            </div>
            {riconDOM && riconDOM}
          </li>
        )
      })
    }
    // 获取tabbar样式
    const tabbarStyle = getTabbarStyle()
    // 获取tabbar的ClassName
    const tabbarClassName = getTabbarClassName()
    // 获取tabs的DOM
    const tabsDOM = getTabsDOM()

    return (
      <ul
        ref={ref}
        {...others}
        className={tabbarClassName}
        disabled={disabled}
        style={tabbarStyle}
        onClick={handleClick}
      >
        {tabsDOM}
      </ul>
    )
  }
)

export default Tabbar
