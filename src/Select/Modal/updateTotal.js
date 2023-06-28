// 更新总数
function updateTotal(rootRef) {
  let total = rootRef.current.querySelectorAll('.select-modal-wrapper .active')?.length || 0
  let submit = rootRef.current.querySelector('.picker-submit')
  if (submit) {
    let replaceStr = total ? `(${total})` : ''
    submit.innerHTML = submit.innerHTML.replace(/\(\d+\)/gim, '')
    submit.innerHTML += replaceStr
  }
}

export default updateTotal
