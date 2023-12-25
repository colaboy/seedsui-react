import React, { forwardRef, useRef, useImperativeHandle, useEffect } from 'react'
import { maxLengthFormatter, minMaxFormatter, precisionFormatter, externalFormatter } from './utils'

const InputText = forwardRef(
  (
    {
      // 容器
      type = 'text', // 类型: text | number | tel | password
      autoFit, // 自动高度文本框
      readOnly,
      disabled, // exclusion-ricon
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
      allowClear, // exclusion-ricon
      clearProps,
      onClearVisibleChange,
      // 右侧内容
      rcaption,
      // 子内容
      children,
      // events
      onClick,
      onCompositionStart, // 输入开始时
      onCompositionUpdate, // 输入进行中
      onCompositionEnd, // 输入完成时
      onInput,
      onChange,
      onBeforeChange,
      onBlur,
      onFocus,
      ...props
    },
    ref
  ) => {
    // 节点
    const rootRef = useRef(null)
    const inputRef = useRef(null)
    const fitRef = useRef(null)
    const clearRef = useRef(null)

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
        focus: focus,
        updateClear: updateClear
      }
    })

    useEffect(() => {
      let val = inputRef.current.value

      // 自动获取焦点
      if (autoFocus) {
        focus()
      }

      // 矫正为正确的值
      if (inputRef.current) {
        // 矫正为正确的值
        val = correctValue(val)
        // 格式化输入
        val = externalFormatter(val, { formatter })

        // 矫正后的值和矫正前的值不一致, 需要强制修改文本框内的值
        if (inputRef.current && val !== inputRef.current.value) {
          inputRef.current.value = val
        }
      }

      // 更新清除按钮和自适应的高度
      updateClear(val)
      updateAutoFit(val)
    }, []) // eslint-disable-line

    useEffect(() => {
      updateContainer()
    }, [value]) // eslint-disable-line

    // 禁用时不显示ricon
    useEffect(() => {
      if (disabled === 'exclusion-ricon') {
        let ricon = rootRef?.current?.querySelector('.ricon')
        ricon && ricon.classList.add('hide')
      }
      // eslint-disable-next-line
    }, [disabled])

    // 更新文本框高度和清空按钮
    function updateContainer() {
      if (!rootRef?.current) return
      if (rootRef.current.inputTimeout) {
        clearTimeout(rootRef.current.inputTimeout)
      }
      rootRef.current.inputTimeout = setTimeout(() => {
        if (!inputRef?.current) return
        let val = inputRef.current.value
        // 更新清除按钮和自适应的高度
        updateClear(val)
        updateAutoFit(val)
      }, 100)
    }

    // 更新清除按钮
    function updateClear(val) {
      if (val === undefined) {
        // eslint-disable-next-line
        val = inputRef?.current?.value || ''
      } else if (typeof val === 'number') {
        // eslint-disable-next-line
        val = String(val)
      }
      // 不显示清空
      if (!allowClear) {
        if (clearRef?.current?.classList?.add) {
          clearRef.current.classList.add('hide')
        }
        return
      }

      // 根据值判断是否显示清空
      if (clearRef?.current?.classList) {
        // 右侧图标, 当allowClear为exclusion-ricon时，则与ricon互斥
        let ricon = clearRef.current.nextElementSibling
        if (!ricon || !ricon?.classList?.contains('ricon')) {
          ricon = null
        }

        // 有值隐藏清除
        if (val) {
          clearRef.current.classList.remove('hide')
          typeof onClearVisibleChange === 'function' && onClearVisibleChange(true)

          // 清除图标显示时, 隐藏右侧图标
          if (allowClear === 'exclusion-ricon' && ricon) {
            ricon.classList.add('hide')
          }
        }
        // 无值显示清除
        else {
          clearRef.current.classList.add('hide')
          typeof onClearVisibleChange === 'function' && onClearVisibleChange(false)

          // 清除图标隐藏时, 显示右侧图标
          if (allowClear === 'exclusion-ricon' && ricon) {
            ricon.classList.remove('hide')
          }
        }
      }
    }

    // 自动扩充功能
    function updateAutoFit(val) {
      if (!autoFit) return
      fitRef.current.children[0].innerText = val
      // 多行文本框使用样式宽高100%, 放弃使用js控制高度
      // inputRef.current.style.height = fitRef.current.clientHeight + 'px'
    }

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

    // 清空按钮控制
    function handleInput(e) {
      // 非受控组件需要操作DOM
      if (value === undefined) {
        updateContainer()
      }

      // Callback
      if (onInput) onInput(e)
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

      // 修改前
      if (typeof onBeforeChange === 'function') {
        let goOn = await onBeforeChange(val)
        if (goOn !== undefined && !goOn) return
      }

      // 触发onChange: 使用defaultValue时, 删除到点时会直接把点清空
      if (onChange) {
        onChange(val)
      }
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

        // 修改完回调
        if (val !== value) {
          if (onChange) onChange(val)
        }
      }

      if (onBlur) onBlur(e)
    }

    // 点击清除
    async function handleClear(e) {
      e.stopPropagation()

      // 修改前
      if (typeof onBeforeChange === 'function') {
        let goOn = await onBeforeChange('')
        if (goOn !== undefined && !goOn) return
      }

      // 获取焦点
      focus()

      // Callback
      typeof onChange === 'function' && onChange('')
      typeof clearProps?.onClick === 'function' && clearProps.onClick(e, '')

      // 非受控组件需要操作DOM
      if (value === undefined) {
        updateContainer()
        if (inputRef?.current?.value) {
          inputRef.current.value = ''
        }
      } else {
        // 正常onChange会触发value监听, 但有可能value未变, 手动再触发一遍清空
        updateClear('')
      }
    }

    // render
    function getInputDOM() {
      // 剔除掉onClick事件, 因为在容器onClick已经回调了
      let { visible: inputVisible, ...otherInputProps } = inputProps
      // if (inputVisible === false) return null
      // autoFit类型
      if (autoFit) {
        const { style, className, ...otherFitProps } = otherInputProps
        return (
          <div className={`input-fit-wrapper${inputVisible === false ? ' hide' : ''}`}>
            <textarea
              ref={inputRef}
              // className={className}
              className={`input-fit`}
              style={style}
              {...otherFitProps}
              autoFocus={autoFocus}
              value={value}
              defaultValue={defaultValue}
              maxLength={maxLength}
              readOnly={readOnly}
              disabled={disabled}
              placeholder={placeholder}
              onChange={handleChange}
              onInput={handleInput}
              onBlur={handleBlur}
              onFocus={handleFocus}
            ></textarea>
            <pre ref={fitRef} style={style} className={className}>
              <span></span>
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
            {...otherInputProps}
            autoFocus={autoFocus}
            value={value}
            defaultValue={defaultValue}
            maxLength={maxLength}
            readOnly={readOnly}
            disabled={disabled}
            placeholder={placeholder}
            onChange={handleChange}
            onInput={handleInput}
            onBlur={handleBlur}
            onFocus={handleFocus}
            className={`input-textarea${
              otherInputProps.className ? ' ' + otherInputProps.className : ''
            }${inputVisible === false ? ' hide' : ''}`}
          ></textarea>
        )
      }
      // 其它类型
      return (
        <input
          ref={inputRef}
          type={type}
          {...otherInputProps}
          className={`input-text${
            otherInputProps.className ? ' ' + otherInputProps.className : ''
          }${inputVisible === false ? ' hide' : ''}`}
          defaultValue={defaultValue}
          value={value}
          min={typeof min === 'number' ? min : ''}
          max={typeof max === 'number' ? max : ''}
          maxLength={maxLength}
          disabled={disabled}
          readOnly={readOnly}
          placeholder={placeholder}
          onChange={handleChange}
          onInput={handleInput}
          autoFocus={autoFocus}
          onBlur={handleBlur}
          onFocus={handleFocus}
        />
      )
    }

    return (
      <div
        {...props}
        className={`input-wrapper${props.className ? ' ' + props.className : ''}${
          disabled ? ' disabled' : ''
        }${readOnly ? ' readonly' : ''}`}
        onClick={onClick}
        ref={rootRef}
      >
        {licon && licon}
        {liconProps && (
          <i
            {...liconProps}
            className={`licon icon${liconProps?.className ? ' ' + liconProps?.className : ''}`}
          ></i>
        )}
        {getInputDOM()}
        {children && children}
        <i
          ref={clearRef}
          {...clearProps}
          className={`input-clear hide${clearProps?.className ? ' ' + clearProps?.className : ''}`}
          onClick={handleClear}
        ></i>
        {riconProps && (
          <i
            {...riconProps}
            className={`ricon icon${riconProps?.className ? ' ' + riconProps?.className : ''}`}
          ></i>
        )}
        {ricon && ricon}
        {rcaption && rcaption}
      </div>
    )
  }
)

export default InputText
