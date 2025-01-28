// 序列化参数, {id: '1', id2: {id-1: '1'}} => "id1=1&id2.id-1=1"
function serializeParams(val, prefix = '') {
  if (val && Object.prototype.toString.call(val) === '[object Object]') {
    const usp = new URLSearchParams()
    const build = (o, p) => {
      Object.keys(o).forEach((key) => {
        const paramKey = p ? `${p}.${key}` : key
        o[key] && typeof o[key] === 'object'
          ? build(o[key], paramKey)
          : usp.append(paramKey, o[key])
      })
    }
    build(val, prefix)
    return usp.toString()
  }
  return val
}

export default serializeParams
