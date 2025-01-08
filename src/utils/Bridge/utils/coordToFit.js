// 内库使用-start
import GeoUtil from './../../GeoUtil'
// 内库使用-end

// 测试使用-start
// import { GeoUtil } from 'seedsui-react'
// 测试使用-start

// 坐标自动转换: 国内转gcj02, 国外转wgs84
function coordToFit(coord) {
  // 参数不合法
  if (!coord?.longitude || !coord?.latitude || !coord?.type) {
    return coord
  }

  // 是否在中国
  let isInChina = GeoUtil.isInChina([coord.longitude, coord.latitude]) === true
  coord.isInChina = isInChina

  // 不在中国
  if (!isInChina) {
    let [longitude, latitude] = GeoUtil.coordtransform(
      [coord.longitude, coord.latitude],
      coord.type,
      'wgs84'
    )

    return {
      ...coord,
      longitude,
      latitude,
      type: 'wgs84'
    }
  }
  // 在中国
  else {
    let [longitude, latitude] = GeoUtil.coordtransform(
      [coord.longitude, coord.latitude],
      coord.type,
      'gcj02'
    )
    return {
      ...coord,
      longitude,
      latitude,
      type: 'gcj02'
    }
  }
}

export default coordToFit
