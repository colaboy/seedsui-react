import baiduGetAddress from './baiduGetAddress'
import googleGetAddress from './googleGetAddress'
import osmGetAddress from './osmGetAddress'

// 地址逆解析
async function getAddress({ longitude, latitude }, type) {
  let result = null
  if (window.google) {
    result = await googleGetAddress({ longitude, latitude }, type)
  } else if (window.BMap) {
    result = await googleGetAddress({ longitude, latitude }, type)
  } else {
    result = await osmGetAddress({ longitude, latitude }, type)
  }
  return result
}

export default getAddress
