import React, { useImperativeHandle, forwardRef, useRef } from 'react'
import locale from 'library/utils/locale'
import { closeAllDropdown } from './utils'

import { Button } from 'seedsui-react'

// 工具栏
import Input from 'library/deprecated/Input'
import Bridge from 'library/utils/Bridge'
const Search = forwardRef(
  (
    {
      // 是否受控
      controlled,
      // 类型(过滤多余属性)
      type,
      // 是否离线搜索(过滤多余属性)
      remote,
      // 折叠
      fold,
      foldProps,
      // 是否显示搜索按钮
      submit,
      // 条形码
      qrcode,
      qrcodeConfig,
      // 文本
      allowClear = true,
      value,
      // 事件
      onSearch,
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
        getValue: () => {
          if (rootRef.current) {
            let inputText = rootRef.current.querySelector('.input-text')
            return inputText.value
          }
          return ''
        }
      }
    })

    // 搜索
    function handleSearch(keyword) {
      if (onSearch) onSearch(keyword)
    }

    // 扫描二维码
    function handleQrocde(e) {
      // 隐藏已经弹出的mask
      if (document.querySelector('.dropdown-mask.active')) {
        closeAllDropdown()
        return false
      }

      let form = e.target?.previousElementSibling
      Bridge.scanQRCode({
        // desc: '扫描商品',
        scanType: ['barCode'],
        ...qrcodeConfig,
        success: (res) => {
          // 赋值
          if (form) {
            let inputText = form.querySelector('.input-text')
            let clear = form.querySelector('.input-clear')
            if (inputText) inputText.value = res.resultStr
            if (clear) clear.classList.remove('hide')
          }

          if (onSearch) onSearch(res.resultStr)
        }
      })
    }

    // 折叠模式: 展开
    function handleExpand() {
      rootRef.current.classList.remove('collapse')
      rootRef.current.classList.add('expand')
      rootRef.current.querySelector('[type=search]').focus()
    }

    // 判定是否受控
    let controlledProps = {}
    if (controlled) {
      controlledProps = {
        value: value
      }
    } else {
      controlledProps = {
        defaultValue: value
      }
    }
    return (
      <>
        {fold && (
          <div {...(foldProps || {})}>
            <i className="icon icon-search color-sub size22" onClick={handleExpand}></i>
          </div>
        )}

        <form
          ref={rootRef}
          action="."
          className={`toolbar-search-form${fold ? ' collapse' : ''}`}
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
            type="search"
            placeholder={locale('搜索', 'library.e5f71fc31e7246dd6ccc5539570471b0')}
            licon={<i className="icon icon-search color-sub size14" style={{ margin: '8px' }}></i>}
            inputProps={{ style: { padding: '2px 0' } }}
            allowClear={allowClear}
            // 安卓弹出软键盘时，底部不显示(安卓不支持has, 改为js实现)
            onFocus={() => {
              document.body.classList.add('keyboard-active')
            }}
            onBlur={() => {
              document.body.classList.remove('keyboard-active')
            }}
            {...controlledProps}
            {...props}
          />

          {/* 折叠模式: 取消按钮 */}
          {fold && (
            <span
              className="toolbar-search-cancel"
              onClick={(e) => {
                // 折叠模式失焦需要折叠
                rootRef.current.classList.remove('expend')
                rootRef.current.classList.add('collapse')
              }}
            >
              {locale('取消', 'library.625fb26b4b3340f7872b411f401e754c')}
            </span>
          )}
        </form>

        {/* 二维码 */}
        {qrcode && (
          <Button className="toolbar-button" onClick={handleQrocde}>
            <i className="icon icon-barcode size20 events-none"></i>
          </Button>
        )}

        {/* 提交按钮 */}
        {submit && (
          <span
            className="toolbar-search-submit"
            onClick={(e) => {
              handleSearch(e.target.parentNode.querySelector('.input-text')?.value || '')
            }}
          >
            {locale('搜索', 'library.e5f71fc31e7246dd6ccc5539570471b0')}
          </span>
        )}
      </>
    )
  }
)

export default Search
