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

        // 创建MutationObserver来监听data-in-view属性变化
        const mutationObserver = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'data-in-view') {
              const isInView = currentElement.dataset.inView === 'true'
              setInViewArea(isInView)
            }
          })
        })

        // 开始观察属性变化
        mutationObserver.observe(currentElement, { attributes: true })

        // 组件卸载时停止观察
        return () => {
          if (virtual.observer) {
            virtual.observer.unobserve(currentElement)
          }
          mutationObserver.disconnect()
        }
      }
    }, [])

    return (
      <div
        {...props}
        className={`form-item${props.className ? ' ' + props.className : ''}${
          layout === 'horizontal' ? ` row` : ''
        }`}
        id={`${name ? `form-item-${name}` : props?.id || ''}`}
        ref={rootRef}
      >
        {inViewArea ? children : <div style={{ height }} />}
      </div>
    )
  }
)

export default FormItem
