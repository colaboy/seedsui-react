import React from 'react'

// 内库使用-start
import LocaleUtil from './../../../utils/LocaleUtil'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil } from 'seedsui-react'
测试使用-end */

// 标签模式
const Tags = ({
  leftIcon,
  rightIcon,
  className,
  style,
  contentProps,
  placeholder,
  readOnly,
  disabled,
  allowClear,
  value,
  onAdd,
  onEdit,
  onDelete
}) => {
  return (
    <>
      <div
        className={`modal-selectcombo-tags${className ? ' ' + className : ''}`}
        style={style}
        onClick={onAdd}
      >
        {typeof leftIcon === 'function' ? leftIcon({ value }) : leftIcon}
        {/* 主体 */}
        <div
          {...contentProps}
          className={`modal-selectcombo-tags-content${
            contentProps?.className ? ' ' + contentProps.className : ''
          }`}
        >
          {Array.isArray(value)
            ? value.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="modal-selectcombo-tags-item"
                    onClick={
                      readOnly || disabled
                        ? undefined
                        : (e) => {
                            onEdit && onEdit(index)
                            e.stopPropagation()
                          }
                    }
                  >
                    {item.name}
                    {readOnly || disabled || !allowClear ? null : (
                      <i
                        className="modal-selectcombo-tags-item-clear"
                        onClick={(e) => {
                          onDelete && onDelete(item)
                          e.stopPropagation()
                        }}
                      ></i>
                    )}
                  </div>
                )
              })
            : null}
          {(!Array.isArray(value) || !value?.length) && (
            <p className="color-placeholder" style={{ padding: '10px 0' }}>
              {placeholder || LocaleUtil.locale('Please Select', 'SeedsUI_select_placeholder')}
            </p>
          )}
        </div>
        {typeof rightIcon === 'function' ? rightIcon({ value }) : rightIcon}
      </div>
    </>
  )
}

export default Tags
