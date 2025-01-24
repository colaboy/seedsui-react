import React, { forwardRef, useRef, useImperativeHandle } from 'react'

const Menus = forwardRef(
  (
    {
      value,
      list = [],
      /*
      [
        {
          icon: Node,
          name: string,
          description: string,
          disabled
          children: Node,
        }
      ]
      */
      className,
      disabled,
      descriptionPosition,
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

    // 根据value判断此项是否为选中状态
    function getIsActive(item) {
      if (item?.id && value?.id) {
        return item.id === value.id
      }
      return false
    }

    // 内容DOM
    function getMenus() {
      if (!Array.isArray(list)) {
        console.log('SeedsUI TabBar: Parameter list is wrong')
        return null
      }

      // 遍历
      return list.map((item, index) => {
        const { name, description, props: tabProps = {} } = item
        let isActive = getIsActive(item)
        return (
          <div
            className={`tabbar-menus-tab-wrapper${item?.disabled ? ' disabled' : ''}${
              isActive ? ' active' : ''
            }`}
            data-index={index}
            key={index}
            {...tabProps}
            onClick={(e) => {
              e.stopPropagation()
              onChange && onChange(item)
            }}
          >
            <div className="tabbar-menus-tab">
              {typeof item.icon === 'function' ? item.icon(isActive) : item.icon}
              {description && descriptionPosition === 'top' ? (
                <div className={`tabbar-menus-tab-description`}>{description}</div>
              ) : null}
              <div className={`tabbar-menus-tab-name`}>{name}</div>
              {description && descriptionPosition !== 'top' ? (
                <div className={`tabbar-menus-tab-description`}>{description}</div>
              ) : null}
              {item.children && item.children}
            </div>
          </div>
        )
      })
    }

    return (
      <div
        {...props}
        className={`tabbar tabbar-menus${className ? ' ' + className : ''}`}
        disabled={disabled}
        ref={rootRef}
      >
        {getMenus()}
      </div>
    )
  }
)

export default Menus
