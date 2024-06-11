import locale from './../../../locale'

// 地址逆解析函数
function osmGetAddress({ longitude, latitude }) {
  var url =
    'https://nominatim.openstreetmap.org/reverse?format=json&lat=' + latitude + '&lon=' + longitude

  return new Promise((resolve) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        resolve({
          address: data.display_name
        })
      })
      .catch((error) => {
        resolve(locale('获取地址失败, 请稍后重试', 'SeedsUI_get_address_failed'))
      })
  })
}

export default osmGetAddress
