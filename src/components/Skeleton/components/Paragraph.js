import React from 'react'
import Block from './Block'

const Paragraph = ({
  length,
  animated = true,
  avatarProps,
  titleProps = {},
  itemProps = {},
  oddProps = {},
  evenProps = {},
  ...props
}) => {
  return (
    <div className="skeleton-card" {...props}>
      {avatarProps && (
        <Block
          animated={animated}
          {...avatarProps}
          className={`skeleton-avatar${avatarProps.className ? ' ' + avatarProps.className : ''}`}
        />
      )}

      <div className="skeleton-card-content">
        {/* Title */}
        {titleProps && (
          <Block
            animated={animated}
            {...titleProps}
            className={`skeleton-title${titleProps.className ? ' ' + titleProps.className : ''}`}
          />
        )}

        {/* Items */}
        {Array.from({ length: length ?? 2 }).map((_, index) => {
          let currentItemProps = { ...itemProps, ...((index + 1) % 2 === 0 ? evenProps : oddProps) }

          return (
            <Block
              animated={animated}
              key={index}
              {...currentItemProps}
              className={`skeleton-item${props.className ? ' ' + props.className : ''}`}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Paragraph
