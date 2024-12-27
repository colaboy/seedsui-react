import React, { forwardRef, useRef, useImperativeHandle } from 'react'
import Star from './../../../deprecated/Star'
import locale from './../../../utils/locale'

const InputStar = forwardRef(
  (
    {
      value = 0,
      min = 0,
      max = 5,
      onChange,
      onError, // ({e, {errMsg: '错误信息', select: '当前选中', min: '最小值', value: '矫正后的值'}})
      ...props
    },
    ref
  ) => {
    if (typeof max !== 'number' || max <= 0) {
      max = 5
    }
    const rootRef = useRef(null)
    useImperativeHandle(ref, () => {
      return {
        rootDOM: rootRef.current,
        getRootDOM: () => rootRef.current
      }
    })
    function handleChange(e, newValue) {
      if (newValue < min) {
        if (onError) {
          onError({
            errMsg: locale(`不能小于${min}颗星`, 'SeedsUI_min_star_error', [min]),
            min: min,
            value: newValue
          })
          return
        }
        newValue = min
      }
      if (onChange) onChange(newValue)
      e.stopPropagation()
    }
    const stars = []
    for (var i = 1; i <= max; i++) {
      stars.push(i)
    }
    let current = value
    if (current < min) current = min
    return (
      <div
        {...props}
        className={`input-star${props.className ? ' ' + props.className : ''}`}
        ref={rootRef}
      >
        {stars.map((index) => (
          <Star
            onClick={(e) => {
              handleChange(e, index)
            }}
            key={index}
            className={index <= current ? 'active' : ''}
          />
        ))}
      </div>
    )
  }
)

export default InputStar
