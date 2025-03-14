import { Toast, Device } from 'seedsui-react'
import { getData as getCurrentUser } from 'library/utils/useCurrentUser'
import locale from 'library/utils/locale'
// 记录日志
import Logger from 'library/utils/Logger'
import getAddress from './getAddress'
import getDistance from './getDistance'
import getDateTime from './getDateTime'
import getModel from './getModel'

function getWatermark(watermark = [], onWatermark) {
  // eslint-disable-next-line
  return new Promise(async (resolve) => {
    if (!watermark || !watermark.length) {
      resolve([])
      return
    }
    // 水印值映射
    let wmMap = {}
    let wmList = []

    // 定位信息无需在循环里重复获取，只需要获取一次即可
    let currentPositionErrMsg = ''
    let currentPosition = await getLocation(watermark)

    // 未开启定位阻止拍照
    if (currentPosition === null) {
      resolve(false)
      return
    }

    if (typeof currentPosition === 'string') {
      currentPositionErrMsg = currentPosition
    } else {
      wmMap.address = currentPosition.address
      wmMap.currentPosition = {
        longitude: currentPosition.longitude,
        latitude: currentPosition.latitude
      }
    }

    // 绘制水印
    for (let line of watermark) {
      if (/\$distance:(\d+\.\d+,\d+\.\d+)/gim.test(line)) {
        let matches = line.match(/\$distance:(\d+\.\d+,\d+\.\d+)/gim)
        let compareLnglat = matches[0].replace('$distance:', '').split(',')
        let comparePosition = {
          longitude: compareLnglat[0],
          latitude: compareLnglat[1]
        }
        wmMap.comparePosition = comparePosition

        let distance = getDistance({
          comparePosition: comparePosition,
          currentPosition: currentPosition
        })

        if (distance) {
          wmMap.distance = distance
        }

        let distanceDescription =
          distance === null
            ? ''
            : locale(`偏差${distance}米`, 'library.9400cef8902810d76410f32cc8c827d6', [distance])
        line = line.replace(/\$distance:(\d+\.\d+,\d+\.\d+)/gim, distanceDescription || '')
      }

      // 解决$distance:值为空的情况
      if (line.indexOf('$distance:') !== -1) {
        line = line.replace(/\$distance:,/gim, '')
        line = line.replace(/\$distance:/gim, '')
      }

      if (line.indexOf('$address') !== -1) {
        line = line.replace(/\$address/gim, wmMap.address || currentPositionErrMsg || '')
      }
      if (line.indexOf('$model') !== -1) {
        wmMap.model = getModel()
        line = line.replace(/\$model/gim, getModel())
      }
      if (line.indexOf('$datetime') !== -1) {
        Logger.logStartTime('开始获取系统时间')
        wmMap.datetime = await getDateTime()
        Logger.logEndTime('获取系统时间结束', wmMap.datetime)
        line = line.replace(/\$datetime/gim, wmMap.datetime)
      }
      if (line.indexOf('$name') !== -1) {
        // 获取用户id
        if (!window?.loginUser) {
          Logger.logStartTime('开始获取用户名称')
          window.loginUser = await getCurrentUser()
          Logger.logEndTime('获取用户名称结束', window?.loginUser?.name || '')
        }
        wmMap.name = window?.loginUser?.name || ''
        line = line.replace(/\$name/gim, wmMap.name)
      }
      wmList.push(line)
    }

    // 水印回调
    if (onWatermark) {
      let goOn = await onWatermark(wmMap)
      if (!goOn) {
        resolve(false)
        return
      }
    }

    // 映射值
    resolve({
      ...wmMap,
      list: wmList
    })
  })
}

// 获取定位信息
async function getLocation(watermark) {
  // 定位信息
  let locationResult = ''
  if (
    watermark.some((item) => item.indexOf('$address') !== -1 || item.indexOf('$distance') !== -1)
  ) {
    Logger.logStartTime('开始定位')
    locationResult = await getAddress()
    Logger.logEndTime('定位结束', locationResult)

    // 需要定位, 却没有开启权限阻止拍照
    if (locationResult?.errCode === 'PERMISSION_DENIED') {
      if (Device.device === 'pc') {
        return ''
      }
      // 未开启定位权限阻止拍照
      Toast.show({
        content: locale(
          '未开启定位服务或权限，定位失败',
          'library.95491614e045ef613a2a90b6f0a162f1'
        )
      })
      return null
    }
  }

  // 不需要打印的错误
  if (locationResult?.errCode === 'UNKNOWN_ERROR') {
    return ''
  }
  // 打印错误信息
  if (locationResult?.errCode) {
    return locationResult.errMsg
  }
  // 获取地址正确
  return locationResult
}
export default getWatermark
