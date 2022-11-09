import React, { forwardRef, useRef, useImperativeHandle, useEffect, Fragment } from 'react'
import Instance from './instance.js'
import { createPortal } from 'react-dom'

const IndexBar = forwardRef(
  (
    {
      portal, // 绘制区域
      overflowContainer, // 滚动区域
      indexs = [
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'G',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z'
      ],
      ...others
    },
    ref
  ) => {
    const barRef = useRef(null)
    const toolTipRef = useRef(null)
    useImperativeHandle(ref, () => {
      return barRef.current
    })
    const instance = useRef(null)

    useEffect(() => {
      instance.current = new Instance({
        overflowContainer: overflowContainer || barRef.current.parentNode,
        parent: portal || barRef.current.parentNode,
        bar: barRef.current,
        tooltip: toolTipRef.current
      })
    }, []) // eslint-disable-line

    const DOM = (
      <Fragment>
        <div
          ref={barRef}
          {...others}
          className={`indexbar${others.className ? ' ' + others.className : ''}`}
        >
          {indexs.map((index, i) => {
            return (
              <span className="indexbar-button" key={`btn${i}`}>
                {index}
              </span>
            )
          })}
        </div>
        <div ref={toolTipRef} className="indexbar-tooltip"></div>
      </Fragment>
    )
    if (portal) {
      return createPortal(DOM, portal)
    }
    return DOM
  }
)

export default IndexBar
