// require PrototypeMath.js, 用于解决加减法精度丢失的问题
import React, { forwardRef, useRef, useImperativeHandle, useEffect, useState } from 'react'
import InputNumber from './../InputNumber'

// 数值框
const NumBox = forwardRef(
  (
    {
      // 容器
      disabled,
      // 加减号
      plusAttribute = {},
      minusAttribute = {},
      // 文本框
      inputAttribute = {},
      defaultValue,
      value,
      digits,
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
      liconAttribute,
      ricon,
      riconAttribute,
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
    const [inputRef, setInputRef] = useState(null)

    useImperativeHandle(ref, () => {
      return rootRef.current
    })

    const [minDisabled, setMinDisabled] = useState(false)
    const [maxDisabled, setMaxDisabled] = useState(false)

    useEffect(() => {
      let val = inputRef?.input?.value || value || ''
      updateState(val)
    }, [value]) // eslint-disable-line

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
    function handleChange(e, val) {
      // 非受控组件需要操作DOM
      if (defaultValue || defaultValue === '') {
        if (e?.target?.input) e.target.input.value = val
      }
      updateState(val)
      if (onChange) onChange(e, val)
    }

    // 点击减
    function handleMinus(e) {
      let event = { target: inputRef }
      let val = inputRef.correctNumber(Math.Calc.subtract(inputRef?.input?.value, 1))
      // Callback
      handleChange(event, val)
      if (minusAttribute.onClick) minusAttribute.onClick(e, val)
      if (stepFocus) {
        inputRef.input.focus()
      }
    }

    // 点击加
    function handlePlus(e) {
      let event = { target: inputRef }
      if (isNaN(inputRef?.input?.value)) return
      let val = inputRef.correctNumber(Math.Calc.add(inputRef?.input?.value, 1))
      // Callback
      handleChange(event, val)
      if (plusAttribute.onClick) plusAttribute.onClick(e, val)
      if (stepFocus) {
        inputRef?.input?.focus()
      }
    }

    // 点击容器
    function handleClick(e) {
      e.stopPropagation()
      if (disabled) return
      const target = e.target
      if (liconAttribute && liconAttribute.onClick && target.classList.contains('licon')) {
        liconAttribute.onClick(e, inputRef?.input?.value)
        return
      }
      if (riconAttribute && riconAttribute.onClick && target.classList.contains('ricon')) {
        riconAttribute.onClick(e, inputRef?.input?.value)
        return
      }
      if (target.classList.contains('numbox-input')) {
        // 由InputNumber透传inputAttribute.onClick
        return
      }
      if (target.classList.contains('numbox-button-plus')) {
        handlePlus(e)
        return
      }
      if (target.classList.contains('numbox-button-minus')) {
        handleMinus(e)
        return
      }
      if (onClick) onClick(e, inputRef?.input?.value)
    }

    // 文本框属性
    if (!inputAttribute) {
      // eslint-disable-next-line
      inputAttribute = {}
    }
    inputAttribute.className = inputAttribute.className
      ? `${inputAttribute.className} numbox-input`
      : 'numbox-input'

    // render
    function getInputDOM() {
      return (
        <InputNumber
          ref={setInputRef}
          className="numbox-input-wrapper"
          type="number"
          digits={digits}
          inputAttribute={inputAttribute}
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

    // 过滤已经回调的属性
    function filterProps(props) {
      if (!props) return {}
      const { onClick, ...otherProps } = props
      return { ...otherProps }
    }
    // 剔除掉onClick事件, 因为在容器onClick已经回调了
    let otherLiconAttribute = filterProps(liconAttribute)
    let otherRiconAttribute = filterProps(riconAttribute)
    return (
      <div
        {...others}
        disabled={(!isNaN(min) && !isNaN(max) ? Number(min) >= Number(max) : false) || disabled}
        className={`numbox${others.className ? ' ' + others.className : ''}`}
        onClick={handleClick}
        ref={rootRef}
      >
        <input
          value="-"
          disabled={minDisabled}
          {...plusAttribute}
          type="button"
          className={`numbox-button numbox-button-minus${
            plusAttribute.className ? ' ' + plusAttribute.className : ''
          }`}
        />
        {licon && licon}
        {otherLiconAttribute && !Object.isEmptyObject(otherLiconAttribute) && (
          <i
            {...otherLiconAttribute}
            className={`licon icon${
              otherLiconAttribute.className ? ' ' + liconAttribute.className : ''
            }`}
          ></i>
        )}
        {getInputDOM()}
        {otherRiconAttribute && !Object.isEmptyObject(otherRiconAttribute) && (
          <i
            {...otherRiconAttribute}
            className={`ricon icon${
              otherRiconAttribute.className ? ' ' + otherRiconAttribute.className : ''
            }`}
          ></i>
        )}
        {ricon && ricon}
        <input
          value="+"
          disabled={maxDisabled}
          {...minusAttribute}
          type="button"
          className={`numbox-button numbox-button-plus${
            minusAttribute.className ? ' ' + minusAttribute.className : ''
          }`}
        />
      </div>
    )
  }
)

export default NumBox
