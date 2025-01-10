import React, { forwardRef, useRef, useImperativeHandle } from 'react'

const Tabs = forwardRef(
  (
    {
      className = 'tabs-line tabs-line-width-percent70 border-b', // tabs-line | tabs-rect | tabs-lump | tabs-dropdown | tabs-footer
      // 内部tab宽度平均分配
      average = false,
      contentProps = {},
      titleProps = {},
      subtitleProps = {},

      value,
      list = [],
      // [
      //   {
      //     icon: node,
      //     iconActive: node,
      //     ricon: node,
      //     riconActive: node,

      //     name: string,
      //     subtitle: string,

      //     props: object // tab属性
      //   }
      // ]

      disabled,
      onChange,
      ...props
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

    function handleClick(e, item) {
      if (onChange) {
        onChange(item, { event: e })
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
      if (props?.style && props?.style?.height) {
        tabStyle = {
          height: props.style.height
        }
      }
      // 遍历
      return list.map((item, index) => {
        const { icon, iconActive, ricon, riconActive, name, subtitle, props: attribute = {} } = item
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
            className={`tab${item?.disabled ? ' disabled' : ''}${isActive ? ' active' : ''}`}
            data-index={index}
            key={index}
            {...attribute}
            style={Object.assign({}, tabStyle, attribute?.style || {})}
            onClick={(e) => handleClick(e, item)}
          >
            {liconDOM && liconDOM}
            <div className="tab-content" {...contentProps}>
              <div
                {...titleProps}
                className={`tab-title${titleProps.className ? ' ' + titleProps.className : ''}`}
              >
                {name}
              </div>
              {subtitle && (
                <div
                  {...subtitleProps}
                  className={`tab-subtitle${
                    subtitleProps.className ? ' ' + subtitleProps.className : ''
                  }`}
                >
                  {subtitle}
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
        {...props}
        className={`tabs animated${average ? ' tabs-tab-average' : ''}${
          className ? ' ' + className : ''
        }`}
        disabled={disabled}
        ref={rootRef}
      >
        {tabsContent}
      </ul>
    )
  }
)

export default Tabs
