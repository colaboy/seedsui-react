import React, { useState, useEffect, useImperativeHandle, forwardRef, useRef } from 'react'

// 内库使用-start
import Bridge from './../../../utils/Bridge'
import LocaleUtil from './../../../utils/LocaleUtil'
import Input from './../../Input'
import Button from './../../Button'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil, Bridge, Input, Button } from 'seedsui-react'
测试使用-end */

const Search = forwardRef(
  (
    {
      placeholder,
      value,
      onChange,
      onSearch,
      // Config
      collapse, // 折叠模式, true|false
      barCode,
      ok,
      onOk,
      cancel,
      onCancel,
      inputProps,
      ...props
    },
    ref
  ) => {
    // 展开和收缩: collapse, expand
    const [toggle, setToggle] = useState(collapse === true ? 'collapse' : undefined)

    // 创建ref, useRef每次都会返回相同的引用, 所以用createRef
    const rootRef = useRef(null)
    useImperativeHandle(ref, () => {
      return {
        rootDOM: rootRef?.current,
        getRootDOM: () => rootRef?.current,
        collapse: collapseContainer,
        expand: expandContainer
      }
    })

    // From collapse to expand, focus to input
    useEffect(() => {
      if (toggle !== 'expand') return

      rootRef.current.querySelector('[type=search]')?.focus?.()
      // eslint-disable-next-line
    }, [toggle])

    // 展开和收缩
    function collapseContainer() {
      if (!collapse) return
      setToggle('collapse')
    }
    function expandContainer() {
      if (!collapse) return
      setToggle('expand')
    }

    // 搜索
    function handleSearch(keyword) {
      if (onSearch) onSearch(keyword)
    }

    // 扫描二维码
    function handleBarCode() {
      Bridge.scanQRCode({
        // desc: '',
        scanType: ['barCode'],
        success: (res) => {
          let newValue = res.resultStr
          onChange && onChange(newValue)
          onSearch && onSearch(newValue)
        }
      })
    }

    function getMainNode() {
      return (
        <>
          {/* 文本框 */}
          <form
            action="."
            className={`toolbar-search-form`}
            onSubmit={(e) => {
              e.preventDefault()
              let input = e.currentTarget.querySelector('.input-text')
              handleSearch(value)
              input && input.blur()
              e.stopPropagation()
            }}
          >
            <Input.Text
              className="toolbar-search-input"
              leftIcon={<i className="toolbar-search-input-left-icon" />}
              type="search"
              placeholder={placeholder || LocaleUtil.locale('搜索', 'SeedsUI_search')}
              allowClear
              value={value}
              onChange={onChange}
              {...inputProps}
            />
          </form>

          {/* 二维码 */}
          {barCode && (
            <Button className="toolbar-search-button-barcode" onClick={handleBarCode}>
              <i className="toolbar-search-button-barcode-icon"></i>
            </Button>
          )}

          {/* 提交按钮 */}
          {ok && (
            <span
              className="toolbar-search-button-ok"
              onClick={(e) => {
                onSearch && onSearch()
              }}
            >
              {LocaleUtil.locale('搜索', 'SeedsUI_search')}
            </span>
          )}

          {/* 折叠模式: 取消按钮 */}
          {(cancel || toggle) && (
            <span
              className="toolbar-search-button-cancel"
              onClick={(e) => {
                collapseContainer()
                onCancel && onCancel()
              }}
            >
              {LocaleUtil.locale('取消', 'SeedsUI_cancel')}
            </span>
          )}
        </>
      )
    }

    function getCollpaseNode() {
      return (
        <div className="toolbar-search-collapse">
          <i
            className="toolbar-search-collapse-icon"
            onClick={() => {
              expandContainer()
            }}
          ></i>
        </div>
      )
    }

    function getNode() {
      if (!toggle) {
        return getMainNode()
      }
      // 折叠模式, 仅显示一个图标, 其它div默认隐藏
      return toggle === 'expand' ? getMainNode() : getCollpaseNode()
    }
    return (
      <div
        {...props}
        className={`toolbar-search${toggle ? ' ' + toggle : ''}${
          props?.className ? ' ' + props.className : ''
        }`}
        ref={rootRef}
      >
        {getNode()}
      </div>
    )
  }
)

export default Search
