import React, { forwardRef, useRef, useImperativeHandle, useEffect, useState } from 'react'

/**
 * @deprecated since version 5.2.8
 * 请使用Input.Text
 */
const InputText = forwardRef(
  (
    {
      // 容器
      type = 'text', // 类型: text | number | tel | password
      pre, // 自动伸缩文本框
      readOnly,
      disabled,
      // 文本框
      inputAttribute = {},
      defaultValue,
      value,
      digits,
      max,
      min,
      placeholder,
      maxLength,
      // 自动获取焦点
      autoFocus, // 渲染时自动获取焦点
      autoSelect, // 渲染时自动选中
      // 左右图标
      licon,
      liconAttribute,
      ricon,
      riconAttribute,
      // 清除按键
      clear,
      clearReadOnly,
      clearAttribute,
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
      onBlur,
      onFocus,
      ...others
    },
    ref
  ) => {
    // 清空按钮显示
    const [clearVisible, setClearVisible] = useState(false)

    // 节点
    const rootRef = useRef(null)
    const inputRef = useRef(null)
    const preRef = useRef(null)
    useImperativeHandle(ref, () => {
      return rootRef.current
    })

    // 开放内部方法
    if (rootRef.current) {
      rootRef.current.correctNumber = correctNumber
      rootRef.current.select = _focus
    }

    // 开放内部控件
    if (inputRef.current) {
      rootRef.current.input = inputRef.current
    }

    useEffect(() => {
      let val = inputRef.current.value
      // 更新清除按钮和自适应的高度
      updateClear(val)
      preAutoSize(val)
      // 自动获取焦点
      if (autoFocus) {
        _focus()
      }
    }, []) // eslint-disable-line

    useEffect(() => {
      if (readOnly && !clearReadOnly && !pre) return
      updateContainer()
    }, [value]) // eslint-disable-line

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
        preAutoSize(val)
      }, 100)
    }

    // 更新清除按钮
    function updateClear(val) {
      if (typeof val === 'number') {
        val = String(val)
      }
      if (val) {
        setClearVisible(true)
      } else {
        setClearVisible(false)
      }
    }

    // 自动扩充功能
    function preAutoSize(val) {
      if (!pre) return
      preRef.current.children[0].innerText = val
      // 多行文本框使用样式宽高100%, 放弃使用js控制高度
      // inputRef.current.style.height = preRef.current.clientHeight + 'px'
    }

    // 校验maxLength
    function correctNumber(val) {
      if (typeof val === 'number') val = String(val)
      // 最大长度
      if (maxLength && val && val.length > maxLength) {
        val = val.substring(0, maxLength)
      }
      // 小数位截取
      if (typeof digits === 'number') {
        if (val.indexOf('.') !== -1) {
          val = val.substring(0, val.indexOf('.') + Number(digits) + 1)
        }
      }
      return val
    }

    // 获取焦点
    function _focus() {
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
    function handleInput(event) {
      var e = event.nativeEvent

      // 非受控组件需要操作DOM
      if (defaultValue || defaultValue === '') {
        updateContainer()
      }

      // Callback
      if (onInput) onInput(e, e.target.value)
    }

    // 修改值回调
    function handleChange(e, value, callback) {
      var target = e.target
      var val = typeof value === 'string' || typeof value === 'number' ? value : target.value
      // 输入值不合法
      if (target?.validity?.badInput) {
        val = ''
      }

      // 校验maxLength
      if (val !== '') {
        val = correctNumber(val)
      }

      // 非受控组件需要操作DOM
      if (defaultValue || defaultValue === '') {
        e.target.value = val
      }
      // 回调
      if (callback) {
        callback(e, val)
      }
    }

    // 数值框失去焦点, 校验最大值和最小值
    function handleBlur(e) {
      if (readOnly || disabled) {
        return
      }
      var target = e.target
      var val = target.value
      if (val && !isNaN(val)) {
        // 输入时只校验最大值、小数点、最大长度、返回错误
        if (typeof max === 'number') {
          if (Number(val) > Number(max)) val = max
        }
        if (typeof min === 'number') {
          if (Number(val) < Number(min)) val = min
        }

        // 纠正数字
        if (type === 'number') {
          val = '' + Number(val)
        }

        // 修改完回调
        if (val !== value) {
          handleChange(e, val, onChange)
        }
      }

      if (onBlur) onBlur(e)
    }

    // 点击容器
    function handleClick(e) {
      let elInput = inputRef.current
      if (!elInput) return
      if (disabled) return
      var target = e.target
      if (target.classList.contains('clearicon')) {
        handleClear(e)
        e.stopPropagation()
        return
      }
      if (target.classList.contains('licon') && liconAttribute && liconAttribute.onClick) {
        liconAttribute.onClick(e, elInput.value)
        e.stopPropagation()
        return
      }
      if (target.classList.contains('ricon') && riconAttribute && riconAttribute.onClick) {
        riconAttribute.onClick(e, elInput.value)
        e.stopPropagation()
        return
      }
      if (target.classList.contains('input-text') && inputAttribute.onClick) {
        inputAttribute.onClick(e, elInput.value)
        e.stopPropagation()
        return
      }
      if (onClick) {
        onClick(e, elInput.value)
        e.stopPropagation()
      }
    }
    // 点击清除
    function handleClear(event) {
      // 获取焦点
      _focus()

      // 清除回调
      let e = { target: inputRef.current }

      if (readOnly && clearReadOnly && typeof clearReadOnly === 'function') clearReadOnly(e, '')
      else if (clear && typeof clear === 'function') clear(e, '')

      // Callback
      if (onChange) {
        handleChange(e, '', onChange)
      } else if (!value) {
        // 有value没有onChange本身就清空不掉, 所以要控制这种情况不允许清空
        e.target.value = ''
      }

      // 非受控组件需要操作DOM
      if (defaultValue || defaultValue === '') {
        updateContainer()
      }

      event.stopPropagation()
    }

    // render
    function getInputDOM() {
      // 剔除掉onClick事件, 因为在容器onClick已经回调了
      let otherInputAttribute = filterProps(inputAttribute)
      // pre类型
      if (pre) {
        // pre的左右padding
        let preLeft = 0
        let preRight = 0
        if (otherInputAttribute.style) {
          if (otherInputAttribute.style.padding) {
            const paddingValues = otherInputAttribute.style.padding.split(' ')
            if (paddingValues.length === 1) {
              preLeft = paddingValues[0]
              preRight = paddingValues[0]
            } else if (paddingValues.length === 2) {
              preLeft = paddingValues[1]
              preRight = paddingValues[1]
            } else if (paddingValues.length === 4) {
              preLeft = paddingValues[1]
              preRight = paddingValues[3]
            }
          } else if (
            otherInputAttribute.style.paddingLeft ||
            otherInputAttribute.style.paddingRight
          ) {
            preLeft = otherInputAttribute.style.paddingLeft || '0'
            preRight = otherInputAttribute.style.paddingRight || '0'
          }
        }
        return (
          <div
            {...otherInputAttribute}
            className={`input-pre-box${
              otherInputAttribute.className ? ' ' + otherInputAttribute.className : ''
            }`}
          >
            <div className={`input-pre`}>
              <textarea
                ref={inputRef}
                autoFocus={autoFocus}
                value={value}
                defaultValue={defaultValue}
                maxLength={maxLength}
                readOnly={readOnly}
                disabled={disabled}
                placeholder={placeholder}
                onChange={onChange ? (e) => handleChange(e, null, onChange) : null}
                onCompositionStart={
                  onCompositionStart ? (e) => handleChange(e, null, onCompositionStart) : null
                }
                onCompositionUpdate={
                  onCompositionUpdate ? (e) => handleChange(e, null, onCompositionUpdate) : null
                }
                onCompositionEnd={
                  onCompositionEnd ? (e) => handleChange(e, null, onCompositionEnd) : null
                }
                onInput={handleInput}
                onBlur={handleBlur}
                onFocus={handleFocus}
              ></textarea>
            </div>
            <pre ref={preRef} style={{ left: preLeft, right: preRight }}>
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
            {...otherInputAttribute}
            autoFocus={autoFocus}
            value={value}
            defaultValue={defaultValue}
            maxLength={maxLength}
            readOnly={readOnly}
            disabled={disabled}
            placeholder={placeholder}
            onChange={onChange ? (e) => handleChange(e, null, onChange) : null}
            onCompositionStart={
              onCompositionStart ? (e) => handleChange(e, null, onCompositionStart) : null
            }
            onCompositionUpdate={
              onCompositionUpdate ? (e) => handleChange(e, null, onCompositionUpdate) : null
            }
            onCompositionEnd={
              onCompositionEnd ? (e) => handleChange(e, null, onCompositionEnd) : null
            }
            onInput={handleInput}
            onBlur={handleBlur}
            onFocus={handleFocus}
            className={`input-area${
              otherInputAttribute.className ? ' ' + otherInputAttribute.className : ''
            }`}
          ></textarea>
        )
      }
      // 其它类型
      return (
        <input
          ref={inputRef}
          type={type}
          {...otherInputAttribute}
          className={`input-text${
            otherInputAttribute.className ? ' ' + otherInputAttribute.className : ''
          }`}
          defaultValue={defaultValue}
          value={value}
          min={typeof min === 'number' ? min : ''}
          max={typeof max === 'number' ? max : ''}
          maxLength={maxLength}
          disabled={disabled}
          readOnly={readOnly}
          placeholder={placeholder}
          onChange={onChange ? (e) => handleChange(e, null, onChange) : null}
          onCompositionStart={
            onCompositionStart ? (e) => handleChange(e, null, onCompositionStart) : null
          }
          onCompositionUpdate={
            onCompositionUpdate ? (e) => handleChange(e, null, onCompositionUpdate) : null
          }
          onCompositionEnd={
            onCompositionEnd ? (e) => handleChange(e, null, onCompositionEnd) : null
          }
          onInput={handleInput}
          autoFocus={autoFocus}
          onBlur={handleBlur}
          onFocus={handleFocus}
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
    const otherLiconAttribute = filterProps(liconAttribute)
    const otherRiconAttribute = filterProps(riconAttribute)
    const otherClearAttribute = filterProps(clearAttribute)
    return (
      <div
        {...others}
        className={`input-text-box${others.className ? ' ' + others.className : ''}`}
        onClick={handleClick}
        ref={rootRef}
      >
        {licon && licon}
        {liconAttribute && (
          <i
            {...otherLiconAttribute}
            className={`licon icon${
              otherLiconAttribute.className ? ' ' + otherLiconAttribute.className : ''
            }`}
          ></i>
        )}
        {getInputDOM()}
        {children && children}
        {/* clearicon仅用于点击区分, 没有实际的样式用途 */}
        {clearVisible && (clearReadOnly || clear) && (clearReadOnly || !readOnly) && !disabled && (
          <i
            {...otherClearAttribute}
            className={`icon clearicon${
              otherClearAttribute.className
                ? ' ' + otherClearAttribute.className
                : ' ricon close-icon-clear size18'
            }`}
          ></i>
        )}
        {riconAttribute && (
          <i
            {...otherRiconAttribute}
            className={`ricon icon${
              otherRiconAttribute.className ? ' ' + otherRiconAttribute.className : ''
            }`}
          ></i>
        )}
        {ricon && ricon}
        {rcaption && rcaption}
      </div>
    )
  }
)

export default InputText
