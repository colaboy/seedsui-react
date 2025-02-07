import React, { forwardRef, useRef, useImperativeHandle, useEffect } from 'react'
import { maxLengthFormatter, minMaxFormatter, precisionFormatter, externalFormatter } from './utils'

const InputText = forwardRef(
  (
    {
      // 容器
      type = 'text', // 类型: text | number | tel | password
      style,
      className,
      autoFit, // 自动高度文本框
      readOnly,
      disabled,
      // 文本框
      input,
      value,
      formatter,
      // 小数精度, 只有数值框才生效
      precision,
      // [Number框]小数位补0, true: 不补0; false: 补0。 [Text框]影响左右空格;
      trim,
      max,
      min,
      placeholder,
      maxLength,
      // 自动获取焦点
      autoFocus, // 渲染时自动获取焦点
      autoSelect, // 渲染时自动选中
      // 左右图标
      leftIcon,
      rightIcon,
      // 清除按键
      clear,
      allowClear,
      // events
      onClick,
      onChange,
      onBlur,
      onFocus,
      inputProps = {},
      ...props
    },
    ref
  ) => {
    // 节点
    const rootRef = useRef(null)
    const inputRef = useRef(null)

    useImperativeHandle(ref, () => {
      return {
        rootDOM: rootRef.current,
        inputDOM: inputRef.current,
        getRootDOM: () => {
          return rootRef.current
        },
        getInputDOM: () => {
          return inputRef.current
        },
        correctValue: correctValue,
        focus: focus
      }
    })

    useEffect(() => {
      if (!inputRef.current) return
      // 自动获取焦点
      if (autoFocus) {
        focus()
      }

      if (!value) return

      let val = ''

      // 矫正为正确的值
      val = correctValue(value)
      // 格式化输入
      val = externalFormatter(value, { formatter })

      // 矫正后的值和矫正前的值不一致, 需要强制修改文本框内的值
      if (val !== value) {
        onChange(val)
      }
    }, []) // eslint-disable-line

    // 矫正最大长度和小数位截取
    function correctValue(val) {
      if (val === undefined || val === '') return val
      if (typeof val !== 'string' && typeof val !== 'number') return ''

      // 最大最小值矫正
      // eslint-disable-next-line
      val = minMaxFormatter(val, { min, max })

      // 小数位截取
      // eslint-disable-next-line
      val = precisionFormatter(val, { precision, trim })

      // 最大长度载取
      // eslint-disable-next-line
      val = maxLengthFormatter(val, { maxLength })

      return val
    }

    // 获取焦点
    function focus() {
      if (disabled || readOnly || !inputRef.current) return
      inputRef.current.focus()
      // 只有获取焦点以后才能选中
      if (autoSelect) {
        inputRef.current.select()
      }
    }

    // 获取焦点时, 如果readOnly或者disabled时, 需要立即失去焦点, 解决ios会出现底栏的问题
    function handleFocus(e) {
      if (readOnly || disabled) {
        e.target.blur()
        return
      }
      if (onFocus) onFocus(e)
    }

    // 修改值
    async function handleChange(e) {
      let target = e.target
      let val = target.value
      // 此处不宜用target?.validity?.badInput矫正数值, 因为ios上.也返回空

      // 矫正maxLength和小数点位数(不能矫正其它框，因为矫正将无法输入中文)
      if (val && type === 'number') {
        // 不能校验最小值，因为min={0.1}时，无法删除
        val = minMaxFormatter(val, { max })
        val = precisionFormatter(val, { precision, trim: false })
        val = maxLengthFormatter(val, { maxLength })
        if (target.value !== val) {
          target.value = val
        }
      }

      // 触发onChange: 使用defaultValue时, 删除到点时会直接把点清空
      if (onChange) onChange(val, { action: 'change' })
    }

    // 数值框失去焦点, 校验最大值和最小值
    function handleBlur(e) {
      if (readOnly || disabled) {
        return
      }
      let target = e.target
      let val = target.value

      // 数值框失焦时需要矫正数值
      if (type === 'number') {
        // 正常输入：矫正最大最小值、小数点、最大长度
        if (val && !isNaN(val)) {
          // 纠正数字
          val = correctValue(val)
        }
        // 输入错误或真的为空：用于解决ios可以输入字母中文等问题
        else {
          val = ''
        }

        // 格式化输入
        val = externalFormatter(val, { formatter })

        // 赋值
        target.value = val
      }

      // trim
      if (trim && val && typeof val === 'string' && val.trim() !== val) {
        val = val.trim()
      }

      // 修改完回调
      if (val !== value) {
        if (onChange) onChange(val, { action: 'blur' })
      }

      if (onBlur) onBlur(e)
    }

    // 点击清除
    async function handleClear(e) {
      e && e?.stopPropagation?.()

      // 获取焦点
      focus()

      // Callback
      typeof onChange === 'function' && onChange('', { action: 'clickClear' })
    }

    // render
    function getInputNode() {
      if (typeof input === 'function') {
        return input({ allowClear, value })
      }

      // autoFit类型
      if (autoFit) {
        return (
          <div className={`input-fit-wrapper`}>
            <textarea
              ref={inputRef}
              {...inputProps}
              className={`input-fit${inputProps?.className ? ' ' + inputProps?.className : ''}`}
              autoFocus={autoFocus}
              value={value}
              maxLength={maxLength}
              readOnly={readOnly}
              disabled={disabled}
              placeholder={placeholder}
              onChange={handleChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
            ></textarea>
            <pre style={inputProps?.style} className={inputProps?.className}>
              <span>{value}</span>
            </pre>
          </div>
        )
      }
      // textarea类型
      if (type === 'textarea') {
        // 如果值绑定属性,则只有通过父组件的prop来改变值
        return (
          <textarea
            ref={inputRef}
            {...inputProps}
            autoFocus={autoFocus}
            value={value}
            maxLength={maxLength}
            readOnly={readOnly}
            disabled={disabled}
            placeholder={placeholder}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            className={`input-textarea${inputProps.className ? ' ' + inputProps.className : ''}`}
          ></textarea>
        )
      }
      // 其它类型
      return (
        <input
          ref={inputRef}
          type={type}
          {...inputProps}
          className={`input-text${inputProps.className ? ' ' + inputProps.className : ''}`}
          value={value}
          min={typeof min === 'number' ? min : ''}
          max={typeof max === 'number' ? max : ''}
          maxLength={maxLength}
          disabled={disabled}
          readOnly={readOnly}
          placeholder={placeholder}
          onChange={handleChange}
          autoFocus={autoFocus}
          onBlur={handleBlur}
          onFocus={handleFocus}
        />
      )
    }

    // 渲染清除按钮
    function getClearNode() {
      // 自定义渲染清空按钮
      if (typeof clear === 'function') {
        return clear({ allowClear, disabled, readOnly, value, triggerClear: handleClear })
      }

      // 默认渲染
      if (!allowClear || !value) return null
      return <i className={`input-clear`} onClick={handleClear}></i>
    }

    return (
      <div
        {...props}
        style={style}
        className={`input-wrapper${className ? ' ' + className : ''}${disabled ? ' disabled' : ''}${
          readOnly ? ' readonly' : ''
        }`}
        onClick={onClick}
        ref={rootRef}
      >
        {typeof leftIcon === 'function' ? leftIcon({ value }) : leftIcon}
        {getInputNode()}
        {getClearNode()}
        {typeof rightIcon === 'function' ? rightIcon({ value }) : rightIcon}
      </div>
    )
  }
)

export default InputText
