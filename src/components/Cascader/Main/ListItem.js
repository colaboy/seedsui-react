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
    let errCode = 'ERROR'

    // 显示分栏
    const indexes = {}

    if (Array.isArray(list) && !list.length) {
      // eslint-disable-next-line
      list = LocaleUtil.locale('暂无数据', 'SeedsUI_no_data')
      errCode = 'NO_DATA'
    }

    return (
      <div
        {...props}
        className={`modal-picker-main${props?.className ? ' ' + props.className : ''}`}
        ref={ref}
      >
        {typeof list === 'string' && (
          <Result
            title={list}
            image={
              errCode === 'ERROR'
                ? '//res.waiqin365.com/d/waiqin365_h5/components/error.png'
                : '//res.waiqin365.com/d/waiqin365_h5/components/empty.png'
            }
            className={`cascader-exception`}
          >
            {errCode === 'ERROR' && (
              <Button className="primary cascader-exception-button" onClick={onReLoad}>
                {LocaleUtil.locale('重新加载', 'noKey_64ca9bab920a2983bcf270320d850d00')}
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
                <IndexBar.Anchor name={item.anchor}>
                  <p className="indexbar-list-divider">{item.anchor}</p>
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
                    value?.some((selected) => {
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
