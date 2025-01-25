import React, { forwardRef, useRef, useImperativeHandle } from 'react'

const Group = forwardRef(
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
    function getIsChecked(item) {
      if (item?.id && value?.id) {
        return item.id === value.id
      }
      return false
    }

    // 内容DOM
    function getGroup() {
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
            className={`tabbar-group-tab-wrapper${item?.disabled ? ' disabled' : ''}${
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
            <div className="tabbar-group-tab">
              {typeof item.icon === 'function' ? item.icon({ checked: checked }) : item.icon}
              {description && descriptionPosition === 'top' ? (
                <div className={`tabbar-group-tab-description`}>{description}</div>
              ) : null}
              <div className={`tabbar-group-tab-name`}>{name}</div>
              {description && descriptionPosition !== 'top' ? (
                <div className={`tabbar-group-tab-description`}>{description}</div>
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
        className={`tabbar tabbar-group${className ? ' ' + className : ''}`}
        disabled={disabled}
        ref={rootRef}
      >
        {getGroup()}
      </div>
    )
  }
)

export default Group
