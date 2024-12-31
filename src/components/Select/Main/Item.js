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
      {/* Left checkbox */}
      {checkable !== false && (
        <div className={`left select-option-${getCheckedType()}`}>
          <div className="checked-input"></div>
        </div>
      )}
      {/* Main */}
      <div className="select-option-main">
        {typeof item?.avatar === 'string' && (
          <div className={`select-option-main-avatar`}>
            <img
              alt=""
              src={item.avatar}
              onError={(e) => {
                e.target.classList.add('fail')
              }}
              onLoad={(e) => {
                e.target.classList.add('success')
              }}
              className="avatar"
            />
          </div>
        )}
        {React.isValidElement(item?.avatar) ? item?.avatar : null}
        <div className="select-option-main-content">
          <p className="select-option-main-title">{item?.title || item.name}</p>
          {item.description && (
            <div className="select-option-main-description">{item.description}</div>
          )}
        </div>
      </div>
      {/* Content */}
      {item.content && <div className="select-option-content">{item.content}</div>}
      {/* Action */}
      {item.action && <div className="select-option-action">{item.action}</div>}
      {/* Right checkbox */}
      {checkable !== false && (
        <div className={`right select-option-${getCheckedType()}`}>
          <div className="checked-input"></div>
        </div>
      )}
    </div>
  )
}

export default Item
