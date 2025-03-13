import { Request, Device } from 'seedsui-react'

// 获取列表
function queryData(params) {
  return new Promise((resolve) => {
    // 查询
    Request.post(
      '/combo/v1/getComboGrid.do?comboCode=employee',
      {
        rows: 500,
        isControl: '0',
        menuId: Device.getUrlParameter('menuId') || '',
        ...params
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded' // application/json;charset=UTF-8
        }
      }
    )
      .then((result) => {
        if (Array.isArray(result.rows)) {
          let list = result.rows.map((item) => {
            return {
              ...item,
              id: item.id,
              name: item.name,
              description: item.dept_name + ' ' + item.position_name
            }
          })
          resolve(list)
        } else {
          resolve(result.message || '服务器繁忙，请稍后重试')
        }
      })
      .catch((err) => {
        resolve(err?.data?.message || '服务器繁忙，请稍后重试')
      })
  })
}

export default queryData
