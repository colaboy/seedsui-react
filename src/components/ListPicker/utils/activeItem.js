// 选中项
function activeItem(item, props) {
  let { active, multiple, id } = props || {}
  // id字段名，一般为id，也可能手动修改
  if (!id) id = 'id'
  // multiple未传则为必选单选
  if (multiple === undefined) {
    active = {
      [item[id]]: item
    }
  } else {
    // 正常单选和多选
    if (active[item[id]]) {
      delete active[item[id]]
    } else {
      if (multiple) {
        active[item[id]] = item
      } else {
        active = {
          [item[id]]: item
        }
      }
    }
  }
  return active
}

export default activeItem
