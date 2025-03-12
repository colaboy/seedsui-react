// 本地数据转为服务器数据
function serverData({ formData }) {
  return new Promise((resolve) => {
    let params = {
      name1: formData.name1
    }

    resolve(params)
  }, false)
}

export default serverData
