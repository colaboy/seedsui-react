// 获取缩略图
function formatThumb(src) {
  if (typeof src !== 'string' || src.indexOf('?') !== -1) return src
  return `${src}?x-oss-process=style/zk_upload`
}

export default formatThumb
