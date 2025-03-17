import React from 'react'
import Highlight from './../Highlight'

// 关键字高亮
const getHighlightNode = (text, keyword) => {
  if (!keyword) return text
  if (typeof text !== 'string') return text
  const index = text.indexOf(keyword)
  const beforeStr = text.substring(0, index)
  const afterStr = text.slice(index + keyword.length)
  const node =
    index > -1 ? (
      <>
        {beforeStr}
        <Highlight>{keyword}</Highlight>
        {afterStr}
      </>
    ) : (
      text
    )

  return node
}

export default getHighlightNode
