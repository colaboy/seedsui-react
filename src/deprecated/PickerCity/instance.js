import Picker from './../../components/Picker/Deprecated/instance.js'

var PickerCity = function (params) {
  /* --------------------
    Model
    -------------------- */
  var defaults = {
    idPropertyName: 'id',
    namePropertyName: 'name',
    childPropertyName: 'children',

    split: '-',

    viewType: 'district',
    data: null,

    defaultProvinceKey: '',
    defaultCityKey: '',
    defaultDistrictKey: '',

    defaultProvince: '北京市',
    defaultCity: '东城区',
    defaultDistrict: '',

    provinceClass: 'text-center',
    cityClass: 'text-center',
    districtClass: 'text-center'
  }
  params = params || {}
  for (var def in defaults) {
    if (params[def] === undefined || params[def] === null) {
      params[def] = defaults[def]
    }
  }
  var s = new Picker(params)

  // DefaultValue
  s.params.defaultValues = [
    {
      [s.params.idPropertyName]: '',
      [s.params.namePropertyName]: '----'
    }
  ]

  // Data
  if (!s.params.data) return

  // 省、市、区数据
  s.province = null
  s.city = null
  s.district = null
  // 省、市、区选中的key
  s.activeProvinceKey = null
  s.activeCityKey = null
  s.activeDistrictKey = null

  // 设置默认值
  s.setActiveProvinceKey = function (key) {
    s.activeProvinceKey = ('' + key).replace(/(^\s*)|(\s*$)/, '')
  }
  s.setActiveCityKey = function (key) {
    s.activeCityKey = ('' + key).replace(/(^\s*)|(\s*$)/, '')
  }
  s.setActiveDistrictKey = function (key) {
    s.activeDistrictKey = ('' + key).replace(/(^\s*)|(\s*$)/, '')
  }

  /* --------------------
  Method
  -------------------- */
  // 设置数据
  s.setData = function (data, dataProperty) {
    if (data) s.params.data = data
    if (dataProperty && dataProperty.idPropertyName)
      s.params.idPropertyName = dataProperty.idPropertyName
    if (dataProperty && dataProperty.namePropertyName)
      s.params.namePropertyName = dataProperty.namePropertyName
    if (dataProperty && dataProperty.childPropertyName)
      s.params.childPropertyName = dataProperty.childPropertyName
  }
  // 根据省市区名获得keys,返回:['320000','320100','320105'],参数:['江苏省','南京市','建邺区']
  s.getKeysByValues = function (values) {
    var keys = []
    for (var i = 0, province; (province = s.params.data[i++]); ) {
      // eslint-disable-line
      // 获得省, 兼容简称模式: 例如"江苏省"和"江苏"也能匹配成功
      if (
        values[0] &&
        (province[s.params.namePropertyName].indexOf(values[0]) > -1 ||
          values[0].indexOf(province[s.params.namePropertyName]) > -1)
      ) {
        keys.push(province[s.params.idPropertyName])
        for (var j = 0, city; (city = province[s.params.childPropertyName][j++]); ) {
          // eslint-disable-line
          // 获得市
          if (
            values[1] &&
            (city[s.params.namePropertyName].indexOf(values[1]) > -1 ||
              values[1].indexOf(city[s.params.namePropertyName]) > -1)
          ) {
            keys.push(city[s.params.idPropertyName])
            if (values[2]) {
              for (var k = 0, district; (district = city[s.params.childPropertyName][k++]); ) {
                // eslint-disable-line
                // 获得区
                if (
                  values[2] &&
                  (district[s.params.namePropertyName].indexOf(values[2]) > -1 ||
                    values[2].indexOf(district[s.params.namePropertyName]) > -1)
                ) {
                  keys.push(district[s.params.idPropertyName])
                  return keys
                }
              }
            } else {
              return keys
            }
          }
        }
      }
    }
    // 如果省市区不对,则返回第一个省第一个市
    return [
      s.params.data[0][s.params.idPropertyName],
      s.params.data[0][s.params.childPropertyName][0][s.params.idPropertyName]
    ]
  }
  // 根据省市区名获得keys,返回:['江苏省','南京市','建邺区'],参数:['320000','320100','320105']
  s.getValuesByKeys = function (keys) {
    var values = []
    for (var i = 0, province; (province = s.params.data[i++]); ) {
      // eslint-disable-line
      // 获得省, 兼容简称模式: 例如"江苏省"和"江苏"也能匹配成功
      if (keys[0] && province[s.params.idPropertyName] === keys[0]) {
        values.push(province[s.params.namePropertyName])
        for (var j = 0, city; (city = province[s.params.childPropertyName][j++]); ) {
          // eslint-disable-line
          // 获得市
          if (keys[1] && city[s.params.idPropertyName] === keys[1]) {
            values.push(city[s.params.namePropertyName])
            if (keys[2]) {
              for (var k = 0, district; (district = city[s.params.childPropertyName][k++]); ) {
                // eslint-disable-line
                // 获得区
                if (keys[2] && district[s.params.idPropertyName] === keys[2]) {
                  values.push(district[s.params.namePropertyName])
                  return values
                }
              }
            } else {
              return values
            }
          }
        }
      }
    }
    // 如果省市区不对,则返回第一个省第一个市
    return [
      s.params.data[0][s.params.namePropertyName],
      s.params.data[0][s.params.childPropertyName][0][s.params.namePropertyName]
    ]
  }
  // 获取value,根据key
  s.getValueByKey = function (key) {
    for (var i = 0, province; (province = s.params.data[i++]); ) {
      // eslint-disable-line
      // 获得省, 兼容简称模式: 例如"江苏省"和"江苏"也能匹配成功
      if (province[s.params.idPropertyName] === key) return province[s.params.namePropertyName]
      for (var j = 0, city; (city = province[s.params.childPropertyName][j++]); ) {
        // eslint-disable-line
        // 获得市
        if (city[s.params.idPropertyName] === key) return city[s.params.namePropertyName]
        for (var k = 0, district; (district = city[s.params.childPropertyName][k++]); ) {
          // eslint-disable-line
          // 获得区
          if (district[s.params.idPropertyName] === key) return district[s.params.namePropertyName]
        }
      }
    }
  }
  // 设置选中的省市区,参数:['江苏省','南京市','建邺区']
  s.setDefaultValues = function (argActiveValues) {
    var activeValues = argActiveValues || ''
    // 设置选中的key
    var keys = s.getKeysByValues(activeValues)
    if (keys && keys[0]) s.setActiveProvinceKey(keys[0])
    if (keys && keys[1]) s.setActiveCityKey(keys[1])
    if (keys && keys[2]) s.setActiveDistrictKey(keys[2])
  }
  // 设置选中的省市区编码,参数:['320000','320100','320105']
  s.setDefaultKeys = function (argActiveKeys) {
    if (!Array.isArray(argActiveKeys) || argActiveKeys.length < 2) {
      return
    }
    // 设置选中的key
    var keys = argActiveKeys
    if (keys && keys[0]) s.setActiveProvinceKey(keys[0])
    if (keys && keys[1]) s.setActiveCityKey(keys[1])
    if (keys && keys[2]) s.setActiveDistrictKey(keys[2])
  }

  // 获得选中的文字
  s.getActiveText = function (activeOptions) {
    var activeValues = activeOptions.map(function (n, i, a) {
      return n[s.params.namePropertyName]
    })
    var activeText = ''
    if (activeValues[0]) activeText += activeValues[0]
    if (activeValues[1]) activeText += s.params.split + activeValues[1]
    if (activeValues[2] && activeValues[2] !== s.params.defaultValues[0][s.params.namePropertyName])
      activeText += s.params.split + activeValues[2]
    return activeText
  }
  // 设置选中的keys
  s.setActiveKeys = function (activeOptions) {
    var activeKeys = activeOptions.map(function (n, i, a) {
      return n[s.params.idPropertyName]
    })
    if (activeKeys[0]) s.setActiveProvinceKey(activeKeys[0])
    if (activeKeys[1]) s.setActiveCityKey(activeKeys[1])
    if (activeKeys[2]) s.setActiveDistrictKey(activeKeys[2])
  }

  // 获得第一层
  function getPureArray(array) {
    var arr = []
    /* eslint-disable */
    for (var i = 0, opt; (opt = array[i++]); ) {
      arr.push({
        [s.params.idPropertyName]: opt[s.params.idPropertyName],
        [s.params.namePropertyName]: opt[s.params.namePropertyName]
      })
    }
    /* eslint-enable */
    return arr
  }

  // 根据key获得children
  function getChildrenByKey(key) {
    // 如果没有传key，表示获得第一层
    if (!key) return getPureArray(s.params.data)
    // 如果传key，则找到对应key的子级
    /* eslint-disable */
    for (var i = 0, province; (province = s.params.data[i++]); ) {
      if (province[s.params.idPropertyName] == key)
        return getPureArray(province[s.params.childPropertyName])
      for (var j = 0, city; (city = province[s.params.childPropertyName][j++]); ) {
        if (!city[s.params.childPropertyName]) break
        if (city[s.params.idPropertyName] == key)
          return getPureArray(city[s.params.childPropertyName])
      }
    }
    /* eslint-enable */
    return null
  }
  /* ----------------
  Init
  ---------------- */
  /* // 替换省
  function replaceProvince (activeKey) {
    var provinces = getChildrenByKey()
    s.replaceSlot(0, provinces, activeKey || provinces[0][s.params.idPropertyName], s.params.cityClass)
    return provinces
  } */
  // 替换市
  s.replaceCity = function (key, activeKey) {
    var citys = getChildrenByKey(key)
    s.replaceSlot(1, citys, activeKey || citys[0][s.params.idPropertyName], s.params.cityClass)
    return citys
  }
  // 替换区
  s.replaceDistrict = function (key, activeKey) {
    if (s.params.viewType !== 'district') return
    var districts = getChildrenByKey(key)
    if (districts && districts.length && districts.length > 0) {
      s.replaceSlot(
        2,
        districts,
        activeKey || districts[0][s.params.idPropertyName],
        s.params.districtClass
      )
    } else {
      s.replaceSlot(
        2,
        s.params.defaultValues,
        s.params.defaultValues[s.params.idPropertyName],
        s.params.districtClass
      )
    }
  }
  // 添加省
  function addProvince() {
    s.province = getChildrenByKey()
    if (!s.activeProvinceKey) {
      s.setActiveProvinceKey(s.province[0][s.params.idPropertyName])
    }
    s.addSlot(s.province, s.activeProvinceKey, s.params.provinceClass)
  }
  // 添加市
  function addCity() {
    s.city = getChildrenByKey(s.activeProvinceKey)
    // code有误
    if (!s.city) {
      console.warn(
        'SeedsUI PickerCity: 上级省code' + s.activeProvinceKey + '下级不存在,将默认选中第一个城市'
      )
      s.setActiveProvinceKey(s.province[0][s.params.idPropertyName])
      s.city = getChildrenByKey(s.activeProvinceKey)
      s.setActiveCityKey(s.city[0][s.params.idPropertyName])
    }
    if (!s.activeCityKey) {
      s.setActiveCityKey(s.city[0][s.params.idPropertyName])
    }
    s.addSlot(s.city, s.activeCityKey, s.params.cityClass)
  }
  // 添加区
  function addDistrict() {
    if (s.params.viewType !== 'district') return
    s.district = getChildrenByKey(s.activeCityKey)
    // code有误
    if (!s.district) {
      console.warn(
        'SeedsUI PickerCity: 上级市code' + s.activeCityKey + '下级不存在,将默认选中第一个区县或置空'
      )
      s.setActiveCityKey(s.city[0][s.params.idPropertyName])
      s.district = getChildrenByKey(s.city[0][s.params.idPropertyName])
      if (s.district) s.setActiveDistrictKey(s.district[0][s.params.idPropertyName])
    }
    if (!s.activeDistrictKey && s.district) {
      s.setActiveDistrictKey(s.district[0][s.params.idPropertyName])
    }
    if (s.district) {
      s.addSlot(s.district, s.activeDistrictKey, s.params.districtClass)
    } else {
      s.addSlot(s.params.defaultValues, '', s.params.districtClass)
    }
  }

  function initSlots() {
    // 渲染
    addProvince()
    addCity()
    addDistrict()
  }
  s.update = function () {
    s.clearSlots()
    initSlots()
  }
  // 设置默认选中项
  if (s.params.defaultProvinceKey && s.params.defaultCityKey) {
    s.setDefaultKeys([
      s.params.defaultProvinceKey,
      s.params.defaultCityKey,
      s.params.defaultDistrictKey
    ])
  } else {
    s.setDefaultValues([s.params.defaultProvince, s.params.defaultCity, s.params.defaultDistrict])
  }
  // 添加省市区
  initSlots()
  return s
}

export default PickerCity
