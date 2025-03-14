import dayjs from 'dayjs'
import locale from 'library/utils/locale'
import ApiAxios from 'library/deprecated/ApiAxios'

// 获取系统时间, 获取失败时返回系统时间(手机时间)
function getDateTime() {
  return new Promise((resolve) => {
    ApiAxios.post(`/client/getSystemTime.action`)
      .then((result) => {
        if (result.code === '1' && result.data && result.data.s) {
          resolve(dayjs(result.data.s).format('YYYY-MM-DD HH:mm'))
        } else {
          resolve(
            `${dayjs().format('YYYY-MM-DD HH:mm')}(${locale(
              '手机时间',
              'library.aae05676ef01dd23c9ea9b8126c2d333'
            )})`
          )
        }
      })
      .catch((err) => {
        resolve(
          `${dayjs().format('YYYY-MM-DD HH:mm')}(${locale(
            '手机时间',
            'library.aae05676ef01dd23c9ea9b8126c2d333'
          )})`
        )
      })
  })
}
export default getDateTime
