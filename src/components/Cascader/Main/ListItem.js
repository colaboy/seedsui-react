import React, { Fragment, forwardRef } from 'react'

// 内库使用-start
import LocaleUtil from '../../../utils/LocaleUtil'
import Result from './../../Result'
import Button from './../../Button'
import IndexBar from './../../IndexBar'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil, Result, Button, IndexBar } from 'seedsui-react'
测试使用-end */

const ListItem = forwardRef(
  (
    {
      optionProps,
      // 选中列表
      list,
      value,
      onReLoad,
      // 修改
      onSelect,
      ...props
    },
    ref
  ) => {
    // 错误信息
    let status = 500

    // 显示分栏
    const indexes = {}

    if (Array.isArray(list) && !list.length) {
      // eslint-disable-next-line
      list = LocaleUtil.locale('暂无数据', 'SeedsUI_no_data')
      status = 'empty'
    }

    return (
      <div
        {...props}
        className={`modal-selectmodal-main${props?.className ? ' ' + props.className : ''}`}
        ref={ref}
      >
        {typeof list === 'string' && (
          <Result title={list} status={status} className={`cascader-exception`}>
            {status === 500 && onReLoad && (
              <Button className="primary result-button" onClick={onReLoad}>
                {LocaleUtil.locale('重新加载', 'SeedsUI_reload')}
              </Button>
            )}
          </Result>
        )}
        {Array.isArray(list) &&
          list.map((item, index) => {
            // 字母分栏
            let anchorBar = null
            if (item.anchor && !indexes[item.anchor]) {
              indexes[item.anchor] = true
              anchorBar = (
                <IndexBar.Anchor className="cascader-list-divider" name={item.anchor}>
                  {item.anchor}
                </IndexBar.Anchor>
              )
            }

            return (
              <Fragment key={item.id || index}>
                {anchorBar}
                <div
                  {...optionProps}
                  className={`cascader-option${
                    optionProps.className ? ' ' + optionProps.className : ''
                  }${
                    value?.some?.((selected) => {
                      return selected.id === item.id
                    })
                      ? ' active'
                      : ''
                  }`}
                  onClick={(e) => {
                    e.stopPropagation()
                    onSelect(item)
                  }}
                >
                  <p className="cascader-option-title">{item.name}</p>
                  <i className="cascader-option-icon"></i>
                </div>
              </Fragment>
            )
          })}
      </div>
    )
  }
)

export default ListItem
