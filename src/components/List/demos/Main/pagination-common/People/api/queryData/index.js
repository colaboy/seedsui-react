import { LocaleUtil, Request } from 'seedsui-react'

import localData from './localData'

// 获取详情
function queryData(url, params, config) {
  const rows = 500

  return new Promise((resolve) => {
    // 查询
    Request.post(
      url || '/combo/v1/getComboGrid.do?comboCode=employee',
      {
        rows: rows,
        isControl: '0',
        ...params
      },
      {
        headers: config?.headers
          ? config?.headers
          : {
              'Content-Type': 'application/x-www-form-urlencoded' // application/json;charset=UTF-8
            }
      }
    )
      .then((result) => {
        if (Array.isArray(result.rows)) {
          let list = result.rows.map((item) => {
            return {
              id: item.id,
              avatar: item.face_pic,
              name: item.name,
              description: item.dept_name + ' ' + item.position_name,
              // 排序号小于9999，则锚点为'*'，否则为拼音首字母
              anchor: item.sequ < 99999 ? '*' : item.name_spell
            }
          })
          let groupList = localData(list)
          groupList.rows = rows
          groupList.totalItems = result.total
          config.success && config.success({ list: list, rows: rows })
          resolve(groupList)
        } else {
          resolve(
            result.message ||
              LocaleUtil.locale(
                '服务器繁忙，请稍后重试',
                'library.3adc7cd58b0694f0078804a786a33bde'
              )
          )
        }
      })
      .catch((err) => {
        resolve(
          LocaleUtil.locale('服务器繁忙，请稍后重试', 'library.3adc7cd58b0694f0078804a786a33bde')
        )
      })
  })
}

export default queryData
