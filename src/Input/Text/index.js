import React, { forwardRef, useRef, useImperativeHandle, useEffect } from 'react'
import MathJs from './../../math'

const InputText = forwardRef(
  (
    {
      // 容器
      type = 'text', // 类型: text | number | tel | password
      autoFit, // 自动高度文本框
      readOnly,
      disabled,
      // 文本框
      inputProps = {},
      defaultValue,
      value,
      // 小数精度, 只有数值框才生效
      precision,
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
        focus: _focus
      }
    })

    useEffect(() => {
      let val = inputRef.current.value
      // 更新清除按钮和自适应的高度
      updateClear(val)
      updateAutoFit(val)
      // 自动获取焦点
      if (autoFocus) {
        _focus()
      }
      // 矫正为正确的值
      if (inputRef.current) {
        correctValue(val, true)
      }
    }, []) // eslint-disable-line

    useEffect(() => {
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
        updateAutoFit(val)
      }, 100)
    }

    // 更新清除按钮
    function updateClear(val) {
      if (typeof val === 'number') {
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
      if (val) {
        if (clearRef?.current?.classList?.remove) {
          clearRef.current.classList.remove('hide')
        }
      } else {
        if (clearRef?.current?.classList?.add) {
          clearRef.current.classList.add('hide')
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

    // 矫正最大长度与小数位
    function correctMaxLength(val) {
      // eslint-disable-next-line
      if (typeof val === 'number') val = String(val)

      // 最大长度
      if (maxLength && val && val.length > maxLength) {
        // eslint-disable-next-line
        val = val.substring(0, maxLength)
      }
      return val
    }

    // 矫正小数位截取
    function correctPrecision(val, fixedPrecision) {
      // 符合截取条件时
      if (
        type === 'number' &&
        typeof precision === 'number' &&
        !isNaN(val) &&
        val !== (null || '')
      ) {
        if (fixedPrecision) {
          // eslint-disable-next-line
          val = Number(val || 0).toFixed(precision)
        } else {
          // eslint-disable-next-line
          val = MathJs.fixed(val, precision)
        }
      }
      return val
    }

    // 矫正最大长度和小数位截取
    function correctValue(val, fixedPrecision) {
      if (val === undefined || val === '') return val
      if (typeof val !== 'string' && typeof val !== 'number') return ''

      // 最大长度载取
      // eslint-disable-next-line
      val = correctMaxLength(val)

      // 小数位截取
      // eslint-disable-next-line
      val = correctPrecision(val, fixedPrecision)

      // 矫正后的值和矫正前的值不一致, 需要强制修改文本框内的值
      if (inputRef.current && val !== inputRef.current.value) {
        inputRef.current.value = val
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
    function handleInput(e) {
      // 非受控组件需要操作DOM
      if (value === undefined) {
        updateContainer()
      }

      // Callback
      if (onInput) onInput(e)
    }

    // 修改值
    function handleChange(e) {
      let target = e.target
      let val = target.value
      // 此处不宜用target?.validity?.badInput矫正数值, 因为ios上.也返回空

      // 矫正maxLength和小数点位数
      val = correctValue(val)

      if (onChange) {
        if (val && type === 'number') {
          // eslint-disable-next-line
          val = Number(val)
        }
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
          if (typeof max === 'number') {
            if (Number(val) > Number(max)) val = max
          }
          if (typeof min === 'number') {
            if (Number(val) < Number(min)) val = min
          }

          // 纠正数字
          val = correctValue(val, true)
          // 修改完回调
          if (val !== value) {
            if (onChange) onChange(val)
          }
        }
        // 输入错误或真的为空：用于解决ios可以输入字母中文等问题
        else {
          target.value = ''
        }
      }

      if (onBlur) onBlur(e)
    }

    // 点击清除
    function handleClear(e) {
      e.stopPropagation()
      // 获取焦点
      _focus()

      // Callback
      if (onChange) {
        onChange('')
      }

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
        // pre的左右padding
        let fitLeft = 0
        let fitRight = 0
        if (otherInputProps.style) {
          if (otherInputProps.style.padding) {
            const paddingValues = otherInputProps.style.padding.split(' ')
            if (paddingValues.length === 1) {
              fitLeft = paddingValues[0]
              fitRight = paddingValues[0]
            } else if (paddingValues.length === 2) {
              fitLeft = paddingValues[1]
              fitRight = paddingValues[1]
            } else if (paddingValues.length === 4) {
              fitLeft = paddingValues[1]
              fitRight = paddingValues[3]
            }
          } else if (otherInputProps.style.paddingLeft || otherInputProps.style.paddingRight) {
            fitLeft = otherInputProps.style.paddingLeft || '0'
            fitRight = otherInputProps.style.paddingRight || '0'
          }
        }
        return (
          <div
            {...otherInputProps}
            className={`input-fit-wrapper${
              otherInputProps.className ? ' ' + otherInputProps.className : ''
            }${inputVisible === false ? ' hide' : ''}`}
          >
            <div className={`input-fit`}>
              <textarea
                ref={inputRef}
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
            </div>
            <pre ref={fitRef} style={{ left: fitLeft, right: fitRight }}>
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
          className={`input-clear${clearProps?.className ? ' ' + clearProps?.className : ''}`}
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
