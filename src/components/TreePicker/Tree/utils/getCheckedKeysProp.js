// 获取选中项
function getCheckedKeysProp(value) {
  let val = value
  let checkedKeys = []
  if (Array.isArray(val) && val.length) {
    // 半选不能加到选中项中
    val = val.filter((item) => !item.halfChecked)
    for (let item of val) {
      if (typeof item.id === 'string' || typeof item.id === 'number') {
        checkedKeys.push(item.id)
      }
    }
  }
  // value
  let valueProp = {}
  if (value) {
    valueProp = {
      checkedKeys: checkedKeys
    }
  }
  return valueProp
}

export default getCheckedKeysProp
