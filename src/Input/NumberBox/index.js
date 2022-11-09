// require PrototypeMath.js, 用于解决加减法精度丢失的问题
import React, { forwardRef, useRef, useImperativeHandle, useEffect, useState } from 'react'
import InputNumber from './../Number'

// 数值框
const NumberBox = forwardRef(
  (
    {
      // 容器
      disabled,
      // 加减号
      plusProps = {},
      minusProps = {},
      // 文本框
      inputProps = {},
      defaultValue,
      value,
      precision,
      max,
      min,
      placeholder,
      maxLength = '16',
      readOnly,
      // 自动获取焦点
      autoFocus, // 渲染时自动获取焦点
      autoSelect, // 渲染时自动选中
      stepFocus, // 点击加减按钮获取焦点
      // 左右图标
      licon,
      liconProps,
      ricon,
      riconProps,
      // events
      onClick,
      onChange,
      onBlur,
      onFocus,
      ...others
    },
    ref
  ) => {
    const rootRef = useRef(null)
    const inputRef = useRef(null)

    useImperativeHandle(ref, () => {
      return {
        rootDOM: rootRef.current,
        inputDOM: inputRef?.current,
        getRootDOM: () => {
          return rootRef.current
        },
        getInputDOM: inputRef?.current?.getInputDOM,
        getInputRef: () => {
          return inputRef
        }
      }
    })

    const [minDisabled, setMinDisabled] = useState(false)
    const [maxDisabled, setMaxDisabled] = useState(false)

    useEffect(() => {
      let inputDOM = _getInputDOM()
      let val = (inputDOM?.value ? inputDOM.value : value) || ''
      updateState(val)
    }, [value]) // eslint-disable-line

    // 获取文本框
    function _getInputDOM() {
      if (inputRef?.current?.getInputDOM) {
        return inputRef.current.getInputDOM()
      }
      return null
    }

    // 更新禁用状态
    function updateState(val) {
      if (!isNaN(min) && !isNaN(val) && Number(val) <= Number(min)) {
        setMinDisabled(true)
      } else {
        setMinDisabled(false)
      }
      if (!isNaN(max) && !isNaN(val) && Number(val) >= Number(max)) {
        setMaxDisabled(true)
      } else {
        setMaxDisabled(false)
      }
    }

    // 修改值回调
    function handleChange(val) {
      if (disabled) return
      let inputDOM = _getInputDOM()
      if (!inputDOM) return

      // 非受控组件需要操作DOM
      if (defaultValue || defaultValue === '') {
        inputDOM.value = val
      }
      updateState(val)
      if (onChange) onChange(val)
    }

    // 点击减
    function handleMinus(e) {
      e.stopPropagation()
      if (disabled) return

      let inputDOM = _getInputDOM()
      if (!inputDOM) return
      let val = inputRef.current.correctNumber(Math.Calc.subtract(inputDOM.value, 1))
      // Callback
      handleChange(val)
      if (minusProps.onClick) minusProps.onClick(e, val)
      if (stepFocus) {
        inputDOM.focus()
      }
    }

    // 点击加
    function handlePlus(e) {
      e.stopPropagation()
      if (disabled) return

      let inputDOM = _getInputDOM()
      if (!inputDOM) return
      if (isNaN(inputDOM?.value)) return
      let val = inputRef.current.correctNumber(Math.Calc.add(inputDOM.value, 1))
      // Callback
      handleChange(val)
      if (plusProps.onClick) plusProps.onClick(e, val)
      if (stepFocus) {
        inputDOM.focus()
      }
    }

    // 文本框属性
    if (!inputProps) {
      inputProps = {}
    }
    inputProps.className = inputProps.className
      ? `${inputProps.className} numbox-input`
      : 'numbox-input'

    // render
    function getInputDOM() {
      return (
        <InputNumber
          ref={inputRef}
          className="numbox-input-box"
          type="number"
          precision={precision}
          inputProps={inputProps}
          defaultValue={defaultValue}
          value={value}
          min={min}
          max={max}
          maxLength={maxLength}
          disabled={disabled}
          readOnly={readOnly}
          placeholder={placeholder}
          onChange={handleChange}
          autoFocus={autoFocus}
          autoSelect={autoSelect}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      )
    }

    return (
      <div
        ref={rootRef}
        {...others}
        disabled={(!isNaN(min) && !isNaN(max) ? Number(min) >= Number(max) : false) || disabled}
        className={`numbox${others.className ? ' ' + others.className : ''}`}
      >
        <input
          value="-"
          disabled={minDisabled}
          {...plusProps}
          type="button"
          className={`numbox-button numbox-button-minus${
            plusProps.className ? ' ' + plusProps.className : ''
          }`}
          onClick={handleMinus}
        />
        {licon && licon}
        {liconProps && !Object.isEmptyObject(liconProps) && (
          <i
            {...liconProps}
            className={`licon icon${liconProps.className ? ' ' + liconProps.className : ''}`}
          ></i>
        )}
        {getInputDOM()}
        {riconProps && !Object.isEmptyObject(riconProps) && (
          <i
            {...riconProps}
            className={`ricon icon${riconProps.className ? ' ' + riconProps.className : ''}`}
          ></i>
        )}
        {ricon && ricon}
        <input
          value="+"
          disabled={maxDisabled}
          {...minusProps}
          type="button"
          className={`numbox-button numbox-button-plus${
            minusProps.className ? ' ' + minusProps.className : ''
          }`}
          onClick={handlePlus}
        />
      </div>
    )
  }
)

export default NumberBox
