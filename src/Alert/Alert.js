import React, { forwardRef, useContext } from 'react'
import { createPortal } from 'react-dom'
import Context from './../Context/instance.js'

// 弹框
/**
 * @deprecated since version 5.2.8
 * 请使用Modal
 */
const Alert = forwardRef(
  (
    {
      portal,
      show,
      animation = 'zoom', // slideLeft | slideRight | slideUp | slideDown | zoom | fade
      duration,

      maskAttribute = {},

      caption,
      captionAttribute = {},

      icon,

      contentAttribute = {},

      submitCaption,
      submitAttribute = {},

      cancelCaption,
      cancelAttribute = {},

      children,
      ...others
    },
    ref
  ) => {
    // context
    const context = useContext(Context) || {}
    const locale =
      context.locale ||
      function (remark) {
        return remark || ''
      }

    // 构建动画
    let animationClassName = ''
    switch (animation) {
      case 'slideLeft':
        animationClassName = 'popup-animation right-middle'
        break
      case 'slideRight':
        animationClassName = 'popup-animation left-middle'
        break
      case 'slideUp':
        animationClassName = 'popup-animation bottom-center'
        break
      case 'slideDown':
        animationClassName = 'popup-animation top-center'
        break
      case 'zoom':
        animationClassName = 'popup-animation middle'
        break
      case 'fade':
        animationClassName = 'popup-animation middle'
        break
      case 'none':
        animationClassName = ''
        break
      default:
        animationClassName = 'popup-animation middle'
    }
    // 动画时长
    let durationStyle = {}
    if (typeof duration === 'number') {
      durationStyle = {
        WebkitTransitionDuration: duration + 'ms'
      }
    }

    return createPortal(
      <div
        ref={ref}
        {...maskAttribute}
        className={`mask alert-mask${maskAttribute.className ? ' ' + maskAttribute.className : ''}${
          show ? ' active' : ''
        }`}
        style={Object.assign({}, durationStyle, maskAttribute.style || {})}
      >
        <div
          data-animation={animation}
          {...others}
          className={`alert${animationClassName ? ' ' + animationClassName : ''}${
            others.className ? ' ' + others.className : ''
          }${show ? ' active' : ''}`}
          style={Object.assign({}, durationStyle, others.style || {})}
        >
          {/* 身体 */}
          <div className="alert-body">
            {/* 身体-标题 */}
            {caption && (
              <div
                {...captionAttribute}
                className={`alert-caption${
                  captionAttribute.className ? ' ' + captionAttribute.className : ''
                }`}
              >
                {caption}
              </div>
            )}
            {/* 身体-内容 */}
            <div
              {...contentAttribute}
              className={`alert-content${
                contentAttribute.className ? ' ' + contentAttribute.className : ''
              }`}
            >
              {icon}
              {children}
            </div>
          </div>
          {/* 底部 */}
          <div className="alert-footer">
            {cancelAttribute.onClick && (
              <div
                {...cancelAttribute}
                className={`alert-cancel button${
                  cancelAttribute.className ? ' ' + cancelAttribute.className : ''
                }`}
              >
                {cancelCaption || locale('取消', 'cancel')}
              </div>
            )}
            {submitAttribute.onClick && (
              <div
                {...submitAttribute}
                className={`alert-submit button${
                  submitAttribute.className ? ' ' + submitAttribute.className : ''
                }`}
              >
                {submitCaption || locale('确定', 'ok')}
              </div>
            )}
          </div>
        </div>
      </div>,
      portal || context.portal || document.getElementById('root') || document.body
    )
  }
)

export default Alert
