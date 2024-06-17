// 生成随机点
function getPoints({ center, radius, count }) {
  const { latitude, longitude } = center
  const points = []

  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2 // 随机角度
    const distance = Math.random() * radius // 随机半径
    const lat = latitude + (distance / 111300) * Math.sin(angle) // 纬度变化
    const lng =
      longitude + ((distance / 111300) * Math.cos(angle)) / Math.cos((latitude * Math.PI) / 180) // 经度变化
    points.push({
      latitude: lat,
      longitude: lng
    })
  }

  return points
}

export default getPoints
