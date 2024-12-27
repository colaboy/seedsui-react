// 重置class
function clearClass({ rootRef, classNames }) {
  let originActives = rootRef.current.querySelectorAll(`.${classNames.join(',.')}`)
  if (originActives && originActives.length) {
    for (let i = 0, originActive; (originActive = originActives[i++]); ) {
      for (let className of classNames) {
        originActive.classList.remove(className)
      }
    }
  }
}

export default clearClass
