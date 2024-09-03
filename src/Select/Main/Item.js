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
      className={`select-option${props.className ? ' ' + props.className : ''}${
        disabled ? ' disabled' : ''
      }${checked ? ' active' : ''}`}
      checked-position={checkedPosition === 'left' ? 'left' : 'right'}
      checked-type={getCheckedType()}
      data-index={index}
      onClick={onClick}
    >
      {/* 左选中 */}
      {checkable !== false && (
        <div className={`left select-option-${getCheckedType()}`}>
          <div className="checked-input"></div>
        </div>
      )}
      {/* Main */}
      <div className="select-option-main">
        {item?.avatar && (
          <div className={`select-option-main-avatar`}>
            <img
              alt=""
              src={item.avatar}
              onError={(e) => {
                e.currentTarget.src = defaultAvatar
              }}
              className="avatar"
            />
          </div>
        )}
        <div className="select-option-main-content">
          <p className="select-option-main-title">{item?.title || item.name}</p>
          {item.description && (
            <div className="select-option-main-description">{item.description}</div>
          )}
        </div>
      </div>
      {/* 内容 */}
      <div className="select-option-content"></div>
      {/* 右选中 */}
      {checkable !== false && (
        <div className={`right select-option-${getCheckedType()}`}>
          <div className="checked-input"></div>
        </div>
      )}
    </div>
  )
}

export default Item
