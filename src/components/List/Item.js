import React from 'react'

const Item = ({
  disabled,
  leftIcon,
  rightIcon,
  avatar,
  title,
  description,
  content,
  action,
  checked,
  onChange
}) => {
  // 渲染头像
  function getAvatarNode() {
    if (!avatar) return

    if (typeof avatar === 'function') {
      return avatar({ checked })
    }
    if (typeof avatar === 'string') {
      return (
        <div className={`list-option-main-avatar`}>
          <img
            alt=""
            src={avatar}
            onError={(e) => {
              e.target.classList.add('fail')
            }}
            onLoad={(e) => {
              e.target.classList.add('success')
            }}
            className="avatar"
          />
        </div>
      )
    }
    return avatar
  }

  return (
    <div
      className={`list-option${disabled ? ' disabled' : ''}${checked ? ' active' : ''}`}
      onClick={(e) => {
        e.stopPropagation()
        onChange && onChange(!checked)
      }}
    >
      {/* Left Icon */}
      {typeof leftIcon === 'function' ? leftIcon({ checked }) : leftIcon}

      {/* Main */}
      <div className="list-option-main">
        {getAvatarNode()}

        <div className="list-option-main-content">
          <p className="list-option-main-title">{title}</p>
          {description && <div className="list-option-main-description">{description}</div>}
        </div>
      </div>

      {/* Content */}
      {content && <div className="list-option-content">{content}</div>}

      {/* Action */}
      {action && <div className="list-option-action">{action}</div>}

      {/* Right Icon */}
      {typeof rightIcon === 'function' ? rightIcon({ checked }) : rightIcon}
    </div>
  )
}

export default Item
