import React, { useRef } from 'react'

function Timeline({
  list, // [{content: node, contentHTML: string, icon: node(默认Dot), active: bool}]
  caseAttribute = {},
  lineAttribute = {},
  lineCross = true, // 线条是否通到底部
  badgeAttribute = {},
  dotAttribute = {},
  contentAttribute = {},
  ...others
}) {
  const rootRef = useRef(null)

  if (!list) return null
  return (
    <div
      ref={rootRef}
      {...others}
      className={`timeline${others.className ? ' ' + others.className : ''}`}
    >
      {/* 每项 */}
      {list.map((item, index) => {
        return (
          <div
            key={index}
            {...caseAttribute}
            className={`timeline-case${item.active ? ' active' : ''}${
              caseAttribute.className ? ' ' + caseAttribute.className : ''
            }`}
          >
            {/* 左侧线 */}
            <div
              {...lineAttribute}
              className={`timeline-line${
                lineAttribute.className ? ' ' + lineAttribute.className : ''
              }`}
            ></div>
            {/* 标记小圆点 */}
            <div
              {...badgeAttribute}
              className={`timeline-badge${
                badgeAttribute.className ? ' ' + badgeAttribute.className : ''
              }`}
            >
              {item.icon || (
                <i
                  {...dotAttribute}
                  className={`timeline-dot${
                    dotAttribute.className ? ' ' + dotAttribute.className : ''
                  }`}
                ></i>
              )}
            </div>
            {/* 内容 */}
            <div
              {...contentAttribute}
              className={`timeline-content${
                contentAttribute.className ? ' ' + contentAttribute.className : ''
              }`}
            >
              {item.content}
              {item.contentHTML && (
                <div dangerouslySetInnerHTML={{ __html: item.contentHTML }}></div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Timeline
