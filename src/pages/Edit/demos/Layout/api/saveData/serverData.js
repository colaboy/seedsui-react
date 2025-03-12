// 本地数据转为服务器数据
function serverData({ baseData, data }) {
  return new Promise((resolve) => {
    resolve({
      ...baseData,
      ...data
    })
  })
}

export default serverData
