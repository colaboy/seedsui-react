import React from 'react'

const Item = ({
  item,
  index,
  // 选中效果: checkbox | tick | corner
  checkedType = 'checkbox',
  // 选中位置: left | right
  checkedPosition = 'right',

  disabled,
  checked,
  checkable,
  onClick,
  ...props
}) => {
  // 获取checkType
  function getCheckedType() {
    return typeof checkedType === 'string' ? checkedType : 'checkbox'
  }

  return (
    <div
      {...props}
      className={`select-modal-option${props.className ? ' ' + props.className : ''}${
        disabled ? ' disabled' : ''
      }${checked ? ' active' : ''}`}
      checked-position={checkedPosition === 'left' ? 'left' : 'right'}
      checked-type={getCheckedType()}
      data-index={index}
      onClick={onClick}
    >
      {/* 左选中 */}
      {checkable !== false && (
        <div className={`left select-modal-option-${getCheckedType()}`}>
          <div className="checked-input"></div>
        </div>
      )}
      {/* 内容 */}
      <p className="select-modal-option-caption">{item.name}</p>
      {/* 右选中 */}
      {checkable !== false && (
        <div className={`right select-modal-option-${getCheckedType()}`}>
          <div className="checked-input"></div>
        </div>
      )}
    </div>
  )
}

export default Item
