import React, { forwardRef, useRef, useImperativeHandle, useEffect } from 'react'
import Instance from './instance'

const Range = forwardRef(
  (
    {
      value = 0,
      min = 0,
      max = 100,
      step = 1,
      readOnly,
      disabled,
      inputProps = {},
      tooltipProps = {},
      onChange,
      ...props
    },
    ref
  ) => {
    const rootRef = useRef(null)
    const inputRef = useRef(null)
    const tooltipRef = useRef(null)
    const instance = useRef(null)
    useImperativeHandle(ref, () => {
      return {
        rootDOM: rootRef.current,
        inputDOM: inputRef.current,
        tooltipDOM: tooltipRef.current,
        instance: instance.current,
        getRootDOM: () => rootRef.current,
        getInputDOM: () => inputRef.current,
        getTooltipDOM: () => tooltipRef.current,
        getInstance: () => instance.current
      }
    })
    useEffect(() => {
      if (instance.current) return
      initInstance()
    }, []) // eslint-disable-line

    // 更新句柄, 防止synchronization模式, 每次组件在render的时候都生成上次render的state、function、effects
    if (instance.current) {
      instance.current.params.onChange = handleChange
    }
    function initInstance() {
      instance.current = new Instance(rootRef.current, {
        onChange: handleChange
      })
    }

    function handleChange() {
      let newValue = inputRef.current.value
      if (newValue) newValue = Number(newValue || 0)
      if (onChange) {
        onChange(newValue)
      }
    }
    return (
      <div
        {...props}
        className={`input-range${props.className ? ' ' + props.className : ''}`}
        ref={rootRef}
      >
        <input
          ref={inputRef}
          {...inputProps}
          readOnly={readOnly}
          disabled={disabled}
          type="range"
          className={`input-range-input${inputProps.className ? ' ' + inputProps.className : ''}`}
          min={min}
          max={max}
          step={step}
          defaultValue={value}
        />
        <div
          ref={tooltipRef}
          {...tooltipProps}
          className={`input-range-tooltip${
            tooltipProps.className ? ' ' + tooltipProps.className : ''
          }`}
        >
          {value}
        </div>
      </div>
    )
  }
)

export default Range
