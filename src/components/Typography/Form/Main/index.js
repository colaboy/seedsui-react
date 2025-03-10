import React, { useImperativeHandle, forwardRef, useRef, useContext } from 'react'
import FormContext from './../FormContext'

const FormMain = forwardRef(
  (
    {
      // Parent transparent properties
      help,
      name,
      // Own properties
      value,
      onChange,
      inputExtra,
      mainExtra,
      children,
      ...props
    },
    ref
  ) => {
    // 获取全局配置
    const { layout, labelCol, mainCol } = useContext(FormContext)

    const rootRef = useRef(null)

    // Expose
    useImperativeHandle(ref, () => {
      return {
        rootDOM: rootRef.current,
        getRootDOM: () => rootRef.current
      }
    })

    function getExtraNode(extra) {
      let ExtraNode = null
      if (React.isValidElement(extra)) {
        ExtraNode = extra
      } else if (typeof extra === 'function') {
        ExtraNode = extra({ value, onChange })
      } else {
        return null
      }
      return <div className="list-item-main-extra">{ExtraNode}</div>
    }

    return (
      <div
        {...props}
        className={`form-item-main${props.className ? ' ' + props.className : ''}${
          layout === 'horizontal' ? ` col-${mainCol?.span || 16}` : ''
        }`}
        ref={rootRef}
      >
        <div className="form-item-main-input">
          {/* In Form, Set value and onChange props to children: */}
          {value || onChange
            ? React.Children.map(children, (child) => {
                // 检查是否是一个 React 组件（函数组件或类组件），而不是原生元素
                if (React.isValidElement(child) && typeof child.type !== 'string') {
                  // 克隆该组件并注入新的属性
                  return React.cloneElement(child, { value, onChange })
                }
                // 如果是原生元素，直接返回
                return child
              })
            : children}
          {/* Input extra */}
          {getExtraNode(inputExtra)}
        </div>
        {/* Main extra */}
        {getExtraNode(mainExtra)}
      </div>
    )
  }
)

export default FormMain
