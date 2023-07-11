import React from 'react'

const Item = ({
  item,
  index,
  // 选中效果: checkbox | tick
  checkedType = 'checkbox',
  // 选中位置: left | right
  checkedPosition = 'right',

  // 定制属性
  optionProps = {},
  ...props
}) => {
  return (
    <div
      {...optionProps}
      {...props}
      className={`select-modal-option${
        checkedPosition === 'left' ? ' checked-position-left' : ' checked-position-right'
      }${optionProps.className ? ' ' + optionProps.className : ''}`}
      data-index={index}
    >
      {/* 左选中 */}
      <div
        className={`left select-modal-option-${
          typeof checkedType === 'string' ? checkedType : 'checkbox'
        }`}
      >
        <div className="checked-input"></div>
      </div>
      {/* 内容 */}
      <p className="select-modal-option-caption">{item.name}</p>
      {/* 右选中 */}
      <div
        className={`right select-modal-option-${
          typeof checkedType === 'string' ? checkedType : 'checkbox'
        }`}
      >
        <div className="checked-input"></div>
      </div>
    </div>
  )
}

export default Item
