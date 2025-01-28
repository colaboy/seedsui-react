import getCountry from './getCountry'
import formatCountry from './formatCountry'
import getProvince from './getProvince'
import formatProvinceData from './formatProvinceData'
import getStreet from './getStreet'

const api = {
  // 获取国家
  getCountry: async function () {
    let result = await getCountry()
    return formatCountry(result)
  },
  /**
   * @description: 获取省市区
   * @param {Number} countryId 国家ID
   * @return {[{id: '100200', name: '江苏省', parentid: '86', ...}]}
   */
  getProvince: async function (countryId) {
    let result = await getProvince(countryId)
    return formatProvinceData(result)
  },
  /**
   * @description: 获取街道
   * @param {Number} id 区ID
   * @return {{id: '100200300', name: '沙洲街道', parentid: '100200', isStreet: true}}
   */
  getStreet: async function (districtId) {
    let result = await getStreet(districtId)
    return result
  }
}

export default api
