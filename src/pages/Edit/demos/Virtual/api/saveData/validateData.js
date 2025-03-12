import locale from 'library/utils/locale'

// 校验
function validateData({ formData }) {
  return new Promise((resolve) => {
    resolve(locale('校验未通过', 'library.dd64a02bc98798d6a977a3ff134a2126'))
    // resolve(true)
  })
}

export default validateData
