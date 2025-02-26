import React, { forwardRef, useRef, useImperativeHandle } from 'react'
import getContextNode from './../utils/getContextNode'

const Tabs = forwardRef(
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
      descriptionPosition = 'bottom',
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
    function getTabs() {
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
            className={`tabbar-tabs-tab-wrapper${item?.disabled ? ' disabled' : ''}${
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
            <div className="tabbar-tabs-tab">
              {typeof item.icon === 'function' ? item.icon({ checked: checked }) : item.icon}
              {description && descriptionPosition === 'top' ? (
                <div className={`tabbar-tabs-tab-description`}>{description}</div>
              ) : null}
              <div className={`tabbar-tabs-tab-name`}>{name}</div>
              {description && descriptionPosition !== 'top' ? (
                <div className={`tabbar-tabs-tab-description`}>{description}</div>
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
        className={`tabbar-tabs${className ? ' ' + className : ''}`}
        disabled={disabled}
        ref={rootRef}
      >
        {getTabs()}
      </div>
    )
  }
)

export default Tabs
