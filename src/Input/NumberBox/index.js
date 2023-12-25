import React, { forwardRef, useRef, useImperativeHandle, useEffect } from 'react'
import MathJs from './../../math'
import InputNumber from './../Number'

// 数值框
const NumberBox = forwardRef(
  (
    {
      // 加减号
      plusProps = {},
      minusProps = {},
      stepFocus, // 点击加减按钮获取焦点

      // 文本框
      // 容器
      type = 'text', // 类型: text | number | tel | password
      autoFit, // 自动高度文本框
      readOnly,
      disabled,
      // 文本框
      inputProps = {},
      defaultValue,
      value,
      formatter,
      // 小数精度, 只有数值框才生效
      precision,
      // 小数位补0, true: 不补0; false: 补0;
      trim,
      max,
      min,
      placeholder,
      maxLength,
      // 自动获取焦点
      autoFocus, // 渲染时自动获取焦点
      autoSelect, // 渲染时自动选中
      // 左右图标
      licon,
      liconProps,
      ricon,
      riconProps,
      // 清除按键
      allowClear,
      clearProps,
      onClearVisibleChange,
      // 右侧内容
      rcaption,
      // 子内容
      children,
      // 事件
      onClick,
      onCompositionStart, // 输入开始时
      onCompositionUpdate, // 输入进行中
      onCompositionEnd, // 输入完成时
      onInput,
      onChange,
      onBlur,
      onFocus,

      ...props
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
      let minus = rootRef.current.querySelector('.numbox-button-minus')
      let plus = rootRef.current.querySelector('.numbox-button-plus')
      if (!isNaN(min) && !isNaN(val) && Number(val) <= Number(min)) {
        minus.setAttribute('disabled', 'true')
      } else {
        minus.removeAttribute('disabled')
      }
      if (!isNaN(max) && !isNaN(val) && Number(val) >= Number(max)) {
        plus.setAttribute('disabled', 'true')
      } else {
        plus.removeAttribute('disabled')
      }
    }

    // 修改值回调
    function handleChange(val) {
      if (disabled) return
      let inputDOM = _getInputDOM()
      if (!inputDOM) return

      // 非受控组件需要操作DOM
      if (value === undefined) {
        inputDOM.value = val
        updateState(val)
      }
      if (onChange) onChange(val)
    }

    // 点击减
    function handleMinus(e) {
      e.stopPropagation()
      if (disabled) return

      let inputDOM = _getInputDOM()
      if (!inputDOM) return
      let val = inputRef?.current?.correctValue(
        MathJs.strip(Number(inputDOM.value || 0) - 1),
        'blur'
      )
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
      let val = inputRef?.current?.correctValue(
        MathJs.strip(Number(inputDOM.value || 0) + 1),
        'blur'
      )
      // Callback
      handleChange(val)
      if (plusProps.onClick) plusProps.onClick(e, val)
      if (stepFocus) {
        inputDOM.focus()
      }
    }

    // 文本框属性
    if (!inputProps) {
      // eslint-disable-next-line
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
          className="numbox-input-wrapper"
          type="number"
          readOnly={readOnly}
          disabled={disabled}
          inputProps={inputProps}
          defaultValue={defaultValue}
          value={value}
          formatter={formatter}
          precision={precision}
          trim={trim}
          max={max}
          min={min}
          placeholder={placeholder}
          maxLength={maxLength}
          autoFocus={autoFocus} // 渲染时自动获取焦点
          autoSelect={autoSelect} // 渲染时自动选中
          licon={licon}
          liconProps={liconProps}
          ricon={ricon}
          riconProps={riconProps}
          allowClear={allowClear}
          clearProps={clearProps}
          onClearVisibleChange={onClearVisibleChange}
          rcaption={rcaption}
          onClick={onClick}
          onCompositionStart={onCompositionStart} // 输入开始时
          onCompositionUpdate={onCompositionUpdate} // 输入进行中
          onCompositionEnd={onCompositionEnd} // 输入完成时
          onInput={onInput}
          onChange={handleChange}
          onBlur={onBlur}
          onFocus={onFocus}
        >
          {children}
        </InputNumber>
      )
    }

    return (
      <div
        {...props}
        disabled={(!isNaN(min) && !isNaN(max) ? Number(min) >= Number(max) : false) || disabled}
        className={`numbox${props.className ? ' ' + props.className : ''}`}
        ref={rootRef}
      >
        <input
          value="-"
          // disabled={minDisabled}
          {...minusProps}
          type="button"
          className={`numbox-button numbox-button-minus${
            minusProps.className ? ' ' + minusProps.className : ''
          }`}
          onClick={handleMinus}
        />
        {getInputDOM()}
        <input
          value="+"
          // disabled={maxDisabled}
          {...plusProps}
          type="button"
          className={`numbox-button numbox-button-plus${
            plusProps.className ? ' ' + plusProps.className : ''
          }`}
          onClick={handlePlus}
        />
      </div>
    )
  }
)

export default NumberBox
