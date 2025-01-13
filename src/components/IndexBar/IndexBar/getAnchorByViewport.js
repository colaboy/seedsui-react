function getAnchorByViewport(scrollerDOM) {
  let anchorsDOM = scrollerDOM.querySelectorAll('[data-indexbar-anchor]')
  for (let i = 0, anchorDOM; (anchorDOM = anchorsDOM[i++]); ) {
    const rect = anchorDOM.getBoundingClientRect()
    if (rect.top >= 0) {
      return anchorDOM.getAttribute('data-indexbar-anchor')
    }
  }
  return ''
}

export default getAnchorByViewport
