import locale from 'library/utils/locale'
import DistrictUtil from 'library/utils/DistrictUtil'
import Bridge from 'library/utils/Bridge'

// import Logger from 'library/utils/Logger'

// 获取地址和偏差
function getAddress() {
  return new Promise((resolve) => {
    // 立即定位
    DistrictUtil.getLocation({
      timeout: Bridge.platform === 'wq' ? 11000 : 3000,
      success: async (data) => {
        // 客户端中不需要再getAddress
        if (data.address) {
          resolve({
            address: data.address,
            longitude: data.longitude,
            latitude: data.latitude
          })
          return
        }
        let address = ''
        try {
          const result = await DistrictUtil.getAddress({
            latitude: data.latitude,
            longitude: data.longitude
          })
          address = result && result.address ? result.address : ''
        } catch (error) {
          console.error(`地图组件未加载，导致无法获取地理逆解析:${data.longitude},${data.latitude}`)
        }

        if (address) {
          resolve({
            address: address,
            longitude: data.longitude,
            latitude: data.latitude
          })
        } else {
          console.error('获取地址失败')
          resolve({
            errCode: 'NETWORK_ERROR',
            errMsg: locale('网络异常，定位失败', 'library.31208a8ed1bbb2f00cea08335add57e3')
          })
        }
      },
      fail: (res) => {
        // 没有拿到位置再次重试5秒
        console.error('定位失败:', JSON.stringify(res))

        if (res?.errCode === 'PERMISSION_DENIED') {
          resolve({
            errCode: 'PERMISSION_DENIED',
            errMsg: locale(
              '未开启定位服务或权限，定位失败',
              'library.95491614e045ef613a2a90b6f0a162f1'
            )
          })

          return
        }
        if (res?.errCode === 'NETWORK_ERROR') {
          resolve({
            errCode: 'NETWORK_ERROR',
            errMsg: locale('网络异常，定位失败', 'library.31208a8ed1bbb2f00cea08335add57e3')
          })
          return
        }

        resolve({
          errCode: 'UNKNOWN_ERROR',
          errMsg: ''
        })
      }
    })
  })
}

export default getAddress
