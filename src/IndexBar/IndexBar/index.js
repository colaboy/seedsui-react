import React, {
  Fragment,
  forwardRef,
  useRef,
  useImperativeHandle,
  useEffect,
  useState
} from 'react'
import Instance from './instance.js'

const IndexBar = forwardRef(({ container, children, ...props }, ref) => {
  let [anchors, setAnchors] = useState(null)
  // 节点
  const rootRef = useRef(null)
  const tooltipRef = useRef(null)
  const instance = useRef(null)
  useImperativeHandle(ref, () => {
    return {
      rootDOM: rootRef.current,
      tooltipDOM: tooltipRef.current,
      instance: instance.current,
      getRootDOM: () => rootRef.current,
      getTooltipDOM: () => rootRef.current,
      getInstance: () => instance.current
    }
  })

  useEffect(() => {
    // 实例化
    initInstance()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    // 更新锚记
    updateAnchors()
    // eslint-disable-next-line
  }, [children])

  // 实例化
  function initInstance() {
    instance.current = new Instance({
      overflowContainer: container,
      container: rootRef.current,
      tooltipContainer: tooltipRef.current
    })
    // 更新锚记
    updateAnchors()
  }

  // 获取所有锚点
  function updateAnchors() {
    if (!instance.current || !instance.current.getAnchors) return
    anchors = instance.current.getAnchors()
    setAnchors(anchors)
  }

  const DOM = (
    <Fragment>
      {children}
      <div
        ref={rootRef}
        {...props}
        className={`indexbar${props.className ? ' ' + props.className : ''}`}
      >
        {(anchors || []).map((anchor, i) => {
          return (
            <span className="indexbar-button" data-indexbar-link={anchor} key={`btn${i}`}>
              <span className="indexbar-button-caption">{anchor}</span>
            </span>
          )
        })}
      </div>
      <div ref={tooltipRef} className="indexbar-tooltip"></div>
    </Fragment>
  )
  return DOM
})

export default IndexBar
