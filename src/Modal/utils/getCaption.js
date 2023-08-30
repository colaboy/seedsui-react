// 标题
function getCaption({ captionProps }) {
  let captionNode = null
  const { caption, ...otherCaptionProps } = captionProps || {}
  if (caption) {
    captionNode = (
      <div
        {...otherCaptionProps}
        className={`modal-caption${
          otherCaptionProps.className ? ' ' + otherCaptionProps.className : ''
        }`}
      >
        {caption}
      </div>
    )
  }
  return captionNode
}

export default getCaption
