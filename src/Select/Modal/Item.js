import React from 'react'

const Item = ({
  item,
  index,
  // 选中效果: checkbox | tick | corner
  checkedType = 'checkbox',
  // 选中位置: left | right
  checkedPosition = 'right',

  // 定制属性
  optionProps = {},
  ...props
}) => {
  // 获取checkType
  function getCheckedType() {
    return typeof checkedType === 'string' ? checkedType : 'checkbox'
  }

  return (
    <div
      {...optionProps}
      {...props}
      className={`select-modal-option${optionProps.className ? ' ' + optionProps.className : ''}`}
      checked-position={checkedPosition === 'left' ? 'left' : 'right'}
      checked-type={getCheckedType()}
      data-index={index}
    >
      {/* 左选中 */}
      <div className={`left select-modal-option-${getCheckedType()}`}>
        <div className="checked-input"></div>
      </div>
      {/* 内容 */}
      <p className="select-modal-option-caption">{item.name}</p>
      {/* 右选中 */}
      <div className={`right select-modal-option-${getCheckedType()}`}>
        <div className="checked-input"></div>
      </div>
    </div>
  )
}

export default Item
