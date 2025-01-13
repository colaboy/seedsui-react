import React, { forwardRef, useRef, useImperativeHandle, useEffect } from 'react'
import showTooltip from './showTooltip'
import hideTooltip from './hideTooltip'

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
    useImperativeHandle(ref, () => {
      return {
        rootDOM: rootRef.current,
        inputDOM: inputRef.current,
        tooltipDOM: tooltipRef.current,
        getRootDOM: () => rootRef.current,
        getInputDOM: () => inputRef.current,
        getTooltipDOM: () => tooltipRef.current
      }
    })

    function handleChange(e) {
      if (disabled || readOnly) return
      let newValue = e.currentTarget.value
      showTooltip(tooltipRef.current, inputRef.current)
      if (newValue) newValue = Number(newValue || 0)
      if (onChange) {
        onChange(newValue)
      }
    }

    function handleClick(e) {
      if (disabled || readOnly) {
        showTooltip(tooltipRef.current, inputRef.current)
        setTimeout(() => {
          hideTooltip(tooltipRef.current)
        }, 300)
      }
    }

    function handleTouchEnd() {
      hideTooltip(tooltipRef.current)
    }

    return (
      <div
        {...props}
        className={`input-range${props.className ? ' ' + props.className : ''}${
          readOnly ? ' ' + 'readOnly' : ''
        }${disabled ? ' ' + 'disabled' : ''}`}
        ref={rootRef}
        onTouchEnd={handleTouchEnd}
        onClick={handleClick}
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
          onChange={handleChange}
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
