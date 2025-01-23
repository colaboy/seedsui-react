import { isValidElement, createElement } from 'react'

// Whether has React Node
function hasNode(nodes) {
  if (Array.isArray(nodes) && nodes.length) {
    for (let node of nodes) {
      if (isValidElement(node)) return true
    }
    return false
  }
  return isValidElement(nodes)
}

export default hasNode
