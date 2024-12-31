// 获取选中项
function getCheckedKeysProp(value, defaultValue) {
  let val = value || defaultValue
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
  // value or defaultValue
  let valueProp = {}
  if (value) {
    valueProp = {
      checkedKeys: checkedKeys
    }
  } else if (defaultValue) {
    valueProp = {
      defaultCheckedKeys: checkedKeys
    }
  }
  return valueProp
}

export default getCheckedKeysProp
