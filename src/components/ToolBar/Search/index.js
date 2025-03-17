import React, { useState, useImperativeHandle, forwardRef, useRef } from 'react'

// 内库使用-start
import Bridge from './../../../utils/Bridge'
// 内库使用-end

/* 测试使用-start
import { Bridge } from 'seedsui-react'
测试使用-end */

import PlaceholderInput from './Placeholder/Input'
import PlaceholderIcon from './Placeholder/Icon'
import Expand from './Expand'

const Search = forwardRef(
  (
    {
      // Filter properties
      onChange,
      // Core properties
      placeholder,
      value,
      onSearch,
      // Config
      barCode,
      ok,
      onOk,
      cancel,
      onCancel,
      // Input Placeholder
      inputProps,
      // Icon Placeholder
      combo,
      children,
      ...props
    },
    ref
  ) => {
    // 展开和收缩: collapse, expand
    const [toggle, setToggle] = useState(false)

    // 创建ref, useRef每次都会返回相同的引用, 所以用createRef
    const rootRef = useRef(null)
    useImperativeHandle(ref, () => {
      return {
        rootDOM: rootRef?.current,
        getRootDOM: () => rootRef?.current,
        collapse: collapse,
        expand: expand
      }
    })

    // 展开和收缩
    function collapse() {
      setToggle('collapse')
    }
    function expand() {
      setToggle('expand')
    }

    // 扫描二维码
    function handleBarCode() {
      Bridge.scanQRCode({
        // desc: '',
        scanType: ['barCode'],
        success: (res) => {
          let newValue = res.resultStr
          onSearch && onSearch(newValue)
        }
      })
    }

    function getComboNode() {
      if (combo || children) {
        if (combo === 'icon') {
          return <PlaceholderIcon onClick={expand} />
        }

        if (typeof combo === 'function') {
          return combo({
            value
          })
        }
        return combo || children
      }

      return (
        <PlaceholderInput
          placeholder={placeholder}
          value={value}
          onExpand={expand}
          onBarCode={handleBarCode}
          barCode={barCode}
          inputProps={inputProps}
        />
      )
    }

    return (
      <div
        {...props}
        className={`toolbar-search${combo === 'icon' ? '-icon' : ''} ${toggle ? ' ' + toggle : ''}${
          props?.className ? ' ' + props.className : ''
        }`}
        ref={rootRef}
      >
        {getComboNode()}
        {toggle === 'expand' && (
          <Expand
            placeholder={placeholder}
            value={value}
            onSearch={(newValue) => {
              onSearch && onSearch(newValue)
            }}
            onBarCode={handleBarCode}
            onCancel={collapse}
            barCode={barCode}
          />
        )}
      </div>
    )
  }
)

export default Search
