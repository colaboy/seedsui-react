// 内库使用-start
import LocaleUtil from './../../../../utils/LocaleUtil'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil } from 'seedsui-react'
测试使用-start */

// 地址逆解析函数
function osmGetAddress(params) {
  const url =
    'https://nominatim.openstreetmap.org/reverse?format=json&lat=' +
    params.latitude +
    '&lon=' +
    params.longitude

  return new Promise((resolve) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        resolve({
          ...params,
          address: data.display_name
        })
      })
      .catch((error) => {
        resolve(LocaleUtil.locale('获取地址失败, 请稍后重试', 'SeedsUI_get_address_failed'))
      })
  })
}

export default osmGetAddress
