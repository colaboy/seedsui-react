import React, { forwardRef, useRef, useImperativeHandle } from 'react'
import getContextNode from './../utils/getContextNode'

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
          content: Node,
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
    function getIsChecked(item) {
      if (item?.id !== undefined && value?.id !== undefined) {
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
        let checked = getIsChecked(item)
        return (
          <div
            className={`tabbar-menus-tab-wrapper${item?.disabled ? ' disabled' : ''}${
              checked ? ' active' : ''
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
              {typeof item.icon === 'function' ? item.icon({ checked: checked }) : item.icon}
              {description && descriptionPosition === 'top' ? (
                <div className={`tabbar-menus-tab-description`}>{description}</div>
              ) : null}
              <div className={`tabbar-menus-tab-name`}>{name}</div>
              {description && descriptionPosition !== 'top' ? (
                <div className={`tabbar-menus-tab-description`}>{description}</div>
              ) : null}
              {getContextNode(item.content, { ...item, checked: checked })}
            </div>
          </div>
        )
      })
    }

    return (
      <div
        {...props}
        className={`tabbar-menus${className ? ' ' + className : ''}`}
        disabled={disabled}
        ref={rootRef}
      >
        {getMenus()}
      </div>
    )
  }
)

export default Menus
