// 标题
function getCaption({ captionProps }) {
  let caption = null
  const { caption: titleText, ...otherCaptionProps } = captionProps || {}
  if (titleText) {
    caption = (
      <div
        {...otherCaptionProps}
        className={`modal-caption${
          otherCaptionProps.className ? ' ' + otherCaptionProps.className : ''
        }`}
      >
        {titleText}
      </div>
    )
  }
  return caption
}

export default getCaption
