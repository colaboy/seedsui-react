import React, { useImperativeHandle, forwardRef, useRef } from 'react'

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
      value,
      onChange,
      onSearch,
      // Config
      collapse, // 折叠模式
      qrcode,
      ok,
      onOk,
      cancel,
      onCancel,
      ...props
    },
    ref
  ) => {
    // 创建ref, useRef每次都会返回相同的引用, 所以用createRef
    const rootRef = useRef(null)
    useImperativeHandle(ref, () => {
      return {
        rootDOM: rootRef?.current,
        getRootDOM: () => rootRef?.current,
        setValue: setValue,
        getValue: () => {
          return value
        },
        collapse: collapseContainer,
        expand: expandContainer
      }
    })

    // 展开和收缩
    function collapseContainer() {
      if (!collapse) return
      rootRef.current.classList.add('collapse')
      rootRef.current.classList.remove('expand')
    }
    function expandContainer() {
      if (!collapse) return
      rootRef.current.classList.remove('collapse')
      rootRef.current.classList.add('expand')
    }

    // 搜索
    function handleSearch(keyword) {
      if (onSearch) onSearch(keyword)
    }

    // 扫描二维码
    function handleQrocde() {
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

    return (
      <div
        {...props}
        className={`toolbar-search${collapse ? ' collapse' : ''}${
          props?.className ? ' ' + props.className : ''
        }`}
        ref={rootRef}
      >
        {/* 折叠模式, 仅显示一个图标, 其它div默认隐藏 */}
        <div className="toolbar-search-collapse">
          <i
            className="toolbar-search-collapse-icon"
            onClick={() => {
              rootRef.current.querySelector('[type=search]').focus()
              expandContainer()
            }}
          ></i>
        </div>

        {/* 文本框 */}
        <form
          action="."
          className={`toolbar-search-form`}
          onSubmit={(e) => {
            e.preventDefault()
            let input = e.currentTarget.querySelector('.input-text')
            handleSearch(input?.value || '')
            input && input.blur()
            e.stopPropagation()
          }}
        >
          <Input.Text
            className="toolbar-search-input"
            leftIcon={<i className="toolbar-search-input-left-icon" />}
            type="search"
            placeholder={LocaleUtil.locale('搜索', 'SeedsUI_search')}
            allowClear
          />
        </form>

        {/* 二维码 */}
        {qrcode && (
          <Button className="toolbar-search-button-qrcode" onClick={handleQrocde}>
            <i className="toolbar-search-button-qrcode-icon"></i>
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
        {(cancel || collapse) && (
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
      </div>
    )
  }
)

export default Search
