import React, { forwardRef, useRef, useImperativeHandle } from 'react'

const Tabs = forwardRef(
  (
    {
      className = 'tabs-line tabs-line-width-percent70 border-b', // tabs-line | tabs-rect | tabs-lump | tabs-dropdown | tabs-footer
      // 内部tab宽度平均分配
      average = false,
      contentProps = {},
      captionProps = {},
      sndcaptionProps = {},

      value,
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

      disabled,
      onChange,
      ...others
    },
    ref
  ) => {
    const rootRef = useRef(null)
    useImperativeHandle(ref, () => {
      return {
        rootDOM: rootRef.current,
        getRootDOM: () => {
          return rootRef.current
        }
      }
    })

    function handleClick(e) {
      const target = e.target
      const index = target.getAttribute('data-index')
      if (!index) return
      if (onChange) {
        onChange(list[index])
        e.stopPropagation()
      }
    }

    // 根据value判断此项是否为选中状态
    function getIsActive(item) {
      if (Object.prototype.toString.call(value) === '[object Object]') {
        if (item.id && value.id) {
          return item.id === value.id
        } else if (item.name && value.name) {
          return item.name === value.name
        } else if (item.caption && value.caption) {
          return item.caption === value.caption
        } else {
          return false
        }
      }
      return false
    }

    // 图标DOM
    function getIcon(icon, iconActive, isActive) {
      if (isActive) {
        return iconActive ? iconActive : icon
      }
      return icon
    }

    // 内容DOM
    function getTabsContent() {
      if (!Array.isArray(list)) {
        console.log('SeedsUI: Tabs的传入参数list类型不正确')
        return null
      }
      // tabStyle高度
      let tabStyle = {}
      if (others?.style && others?.style?.height) {
        tabStyle = {
          height: others.style.height
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
          attribute = {}
        } = item
        let isActive = getIsActive(item)
        let liconDOM = null
        if (icon) {
          liconDOM = getIcon(icon, iconActive, isActive)
        }
        let riconDOM = null
        if (ricon) {
          riconDOM = getIcon(ricon, riconActive, isActive)
        }
        return (
          <li
            className={`tab${isActive ? ' active' : ''}`}
            data-index={index}
            key={index}
            {...attribute}
            style={Object.assign(tabStyle, attribute?.style || {})}
          >
            {liconDOM && liconDOM}
            <div className="tab-content" {...contentProps}>
              <div
                {...captionProps}
                className={`tab-caption${
                  captionProps.className ? ' ' + captionProps.className : ''
                }`}
              >
                {caption || name}
              </div>
              {sndcaption && (
                <div
                  {...sndcaptionProps}
                  className={`tab-sndcaption${
                    sndcaptionProps.className ? ' ' + sndcaptionProps.className : ''
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

    // 获取tabs的DOM
    const tabsContent = getTabsContent()

    return (
      <ul
        {...others}
        className={`tabs animated${average ? ' tabs-tab-average' : ''}${
          className ? ' ' + className : ''
        }`}
        disabled={disabled}
        onClick={handleClick}
        ref={rootRef}
      >
        {tabsContent}
      </ul>
    )
  }
)

export default Tabs
