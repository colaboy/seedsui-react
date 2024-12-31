import React from 'react'

// 关键字高亮
const HighlightKeyword = ({ text, keyword }) => {
  if (!keyword) return text
  if (typeof text !== 'string') return text
  const index = text.indexOf(keyword)
  const beforeStr = text.substring(0, index)
  const afterStr = text.slice(index + keyword.length)
  const DOM =
    index > -1 ? (
      <>
        <span className="highlight-keyword-before">{beforeStr}</span>
        <span className="highlight-keyword-active">{keyword}</span>
        <span className="highlight-keyword-before">{afterStr}</span>
      </>
    ) : (
      text
    )

  return DOM
}

export default HighlightKeyword
