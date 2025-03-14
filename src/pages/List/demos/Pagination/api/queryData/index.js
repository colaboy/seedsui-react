import { Request, Device, LocaleUtil } from 'seedsui-react'
const locale = LocaleUtil.locale

// 获取列表
function queryData(params) {
  const rows = 20
  return new Promise((resolve) => {
    // 查询
    Request.post(
      '/combo/v1/getComboGrid.do?comboCode=employee',
      {
        rows: rows,
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
          list.rows = rows
          list.totalItems = result.total
          resolve(list)
        } else {
          resolve(result.message || locale('获取数据错误！'))
        }
      })
      .catch((err) => {
        resolve(err?.data?.message || locale('获取数据异常！'))
      })
  })
}

export default queryData
