import React, {
  useEffect,
  useImperativeHandle,
  forwardRef,
  useRef,
  useContext,
  useState
} from 'react'
import FormContext from './../FormContext'

const FormItem = forwardRef(
  (
    {
      height = 50,
      // Own properties
      children,
      name,
      ...props
    },
    ref
  ) => {
    const rootRef = useRef(null)
    // Context config
    const { layout, virtual } = useContext(FormContext)

    // In view area to display
    const [inViewArea, setInViewArea] = useState(false)

    // Expose
    useImperativeHandle(ref, () => {
      return {
        rootDOM: rootRef.current,
        getRootDOM: () => rootRef.current
      }
    })

    useEffect(() => {
      const currentElement = rootRef.current

      // 检查全局observer是否存在
      if (virtual.observer && currentElement) {
        // 开始观察当前元素
        virtual.observer.observe(currentElement)

        // 注册当前元素
        virtual.observerCallbacks.set(currentElement, setInViewArea)

        // 组件卸载时停止观察
        return () => {
          if (virtual.observer) {
            virtual.observer.unobserve(currentElement)
          }
        }
      }
      // eslint-disable-next-line
    }, [])

    return (
      <div
        {...props}
        className={`form-item${props.className ? ' ' + props.className : ''}${
          layout === 'horizontal' ? ` row` : ''
        }`}
        style={{ height: height, ...props?.style }}
        id={`${name ? `form-item-${name}` : props?.id || ''}`}
        ref={rootRef}
      >
        {inViewArea ? children : null}
      </div>
    )
  }
)

export default FormItem
