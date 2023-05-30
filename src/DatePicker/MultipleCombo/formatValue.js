import locale from './../../locale'

// value不存在时默认为当天
function formatValue({ value }) {
  if (!value) {
    // eslint-disable-next-line
    value = [
      {
        type: 'date',
        id: 'start',
        name: locale('开始时间', 'start_time'),
        value: new Date()
      },
      {
        type: 'date',
        id: 'end',
        name: locale('结束时间', 'end_time'),
        value: new Date()
      }
    ]
  }
  return value
}

export default formatValue
