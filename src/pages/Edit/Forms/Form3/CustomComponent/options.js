import locale from 'library/utils/locale'

// 选项列表
const options = [
  {
    id: '1',
    name: locale('自定义校验1', 'library.60bea7f929d42eee3615c405cc9b12a0')
  },
  {
    id: '2',
    name: locale('自定义校验2', 'library.e2924c2cc27ea2179b3b31e564a49dbb')
  }
]

// 获取选项
function getOption(id) {
  for (let option of options) {
    if (id === option.id) {
      return option
    }
  }
}

export { options, getOption }
