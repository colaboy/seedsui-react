function getAnchors(scrollerDOM) {
  let anchors = []
  let anchorsDOM = scrollerDOM.querySelectorAll('[data-indexbar-anchor]')
  for (let i = 0, anchorDOM; (anchorDOM = anchorsDOM[i++]); ) {
    let anchorName = anchorDOM.getAttribute('data-indexbar-anchor')
    anchors.push(anchorName)
  }
  return anchors
}

export default getAnchors
