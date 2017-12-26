//import Picker from './picker.js'
// 扩展picker地区控件 (require pikcer.js)
var PickerCity = function (params) {
  // 参数改写
  var onCityClickDone = params.onClickDone
  var onCityScrollEnd = params.onScrollEnd
  params.onClickDone = undefined
  params.onScrollEnd = undefined
  /* --------------------
    Model
    -------------------- */
  var defaults = {
    viewType: 'area',
    data: null,

    defaultProvince: '',
    defaultCity: '',
    defaultArea: '',

    defaultProvinceKey: '',
    defaultCityKey: '',
    defaultAreaKey: '',

    provinceClass: 'text-center',
    cityClass: 'text-center',
    areaClass: 'text-center',

    defaultValues: [{
      key: '',
      value: '----'
    }],
    onClickDone: function (e) {
      e.activeText = getActiveText(e.activeOptions)
      setActiveKeys(e.activeOptions)
      if (onCityClickDone) onCityClickDone(e)
    },
    onScrollEnd: function (e) {
      // var activeOption = e.activeSlot.values[e.activeSlot.activeIndex]
      var activeOption = e.activeOptions[e.activeSlot.index]
      if (e.activeSlot.index === 0) { // 滚动省
        var city = replaceCity(activeOption.key) // 修改第二项
        replaceArea(city[0].key) // 修改第三项
      } else if (e.activeSlot.index === 1) { // 滚动市
        replaceArea(activeOption.key) // 修改第三项
      }
      // 回调
      if (onCityScrollEnd) onCityScrollEnd(e)
    }
  }
  params = params || {}
  for (var def in defaults) {
    if (params[def] === undefined) {
      params[def] = defaults[def]
    }
  }
  var s = new Picker(params)

  // Data
  s.data = s.params.data
  if (!s.data) return

  // 省、市、区数据
  s.province = null
  s.city = null
  s.area = null

  function trim (str) {
    return str.replace(/(^\s*)|(\s*$)/g, '')
  }
  // 设置默认值
  s.setDefaultProvince = function (province) {
    s.params.defaultProvince = trim('' + province)
  }
  s.setDefaultCity = function (city) {
    s.params.defaultCity = trim('' + city)
  }
  s.setDefaultArea = function (area) {
    s.params.defaultArea = trim('' + area)
  }
  s.setDefaultProvinceKey = function (province) {
    s.params.defaultProvinceKey = trim('' + province)
  }
  s.setDefaultCityKey = function (city) {
    s.params.defaultCityKey = trim('' + city)
  }
  s.setDefaultAreaKey = function (area) {
    s.params.defaultAreaKey = trim('' + area)
  }

  /* --------------------
  Method
  -------------------- */
  function getActiveText (activeData) {
    var activeValues = activeData.map(function (n, i, a) {
      return n['value']
    })
    var activeText = ''
    if (activeValues[0]) activeText += activeValues[0]
    if (activeValues[1]) activeText += '-' + activeValues[1]
    if (activeValues[2] && activeValues[2] !== s.params.defaultValues[0].value) activeText += '-' + activeValues[2]
    return activeText
  }

  function setActiveKeys (activeData) {
    var activeKeys = activeData.map(function (n, i, a) {
      return n['key']
    })
    if (activeKeys[0]) s.setDefaultProvinceKey(activeKeys[0])
    if (activeKeys[1]) s.setDefaultCityKey(activeKeys[1])
    if (activeKeys[2]) s.setDefaultAreaKey(activeKeys[2])
  }

  // 获得第一层
  function getPureArray (array) {
    var arr = []
    /* eslint-disable */
    for (var i = 0, opt; opt = array[i++];) {
      arr.push({
        key: opt.key,
        value: opt.value
      })
    }
    /* eslint-enable */
    return arr
  }

  // 根据key获得children
  function getChildren (key) {
    // 如果没有传key，表示获得第一层
    if (!key) return getPureArray(s.params.data)
    // 如果传key，则找到对应key的子级
    /* eslint-disable */
    for (var i = 0, province; province = s.params.data[i++];) {
      if (province.key === key) return getPureArray(province.children)
      for (var j = 0, city; city = province.children[j++];) {
        if (!city.children) break
        if (city.key === key) return getPureArray(city.children)
      }
    }
    /* eslint-enable */
    return null
  }
  // 根据value获得key
  function getKey (value, key) {
    var data = null
    if (!key) {
      data = s.params.data
    } else {
      data = getChildren(key)
    }
    if (!data) {
      return 0
    }
    /* eslint-disable */
    for (var i = 0, row; row = data[i++];) {
      if (row.value === value) return row.key
    }
    /* eslint-enable */
  }
  /* ----------------
  Init
  ---------------- */
  function replaceProvince (defaultKey) {
    var province = getChildren()
    var defKey = province[0].key
    if (defaultKey) defKey = defaultKey
    s.replaceSlot(0, province, defKey, s.params.cityClass) // 修改第一项
    return province
  }
  function replaceCity (key, defaultKey) {
    var city = getChildren(key)
    var defKey = city[0].key
    if (defaultKey) defKey = defaultKey
    s.replaceSlot(1, city, defKey, s.params.cityClass) // 修改第二项
    return city
  }
  function replaceArea (key, defaultKey) {
    if (s.params.viewType !== 'area') return
    var area = getChildren(key)
    if (area) {
      var defKey = area[0].key
      if (defaultKey) defKey = defaultKey
      s.replaceSlot(2, area, defKey, s.params.areaClass) // 修改第三项
    } else {
      s.replaceSlot(2, s.params.defaultValues, s.params.defaultValues['key'], s.params.areaClass) // 修改第三项
    }
  }
  s.update = function () {
    replaceProvince(s.params.defaultProvinceKey)
    replaceCity(s.params.defaultProvinceKey, s.params.defaultCityKey)
    replaceArea(s.params.defaultCityKey, s.params.defaultAreaKey)
  }
  function addProvince () {
    // 初始化省
    if (!s.province) {
      s.province = getChildren()
    }
    if (!s.params.defaultProvinceKey) {
      s.setDefaultProvinceKey(s.province[0].key)
    }
    s.addSlot(s.province, s.params.defaultProvinceKey, s.params.provinceClass)
  }
  function addCity () {
    // 初始化市
    s.city = getChildren(s.params.defaultProvinceKey)
    if (!s.params.defaultCityKey) {
      s.setDefaultCityKey(s.city[0].key)
    }
    s.addSlot(s.city, s.params.defaultCityKey, s.params.cityClass)
  }
  function addArea () {
    if (s.params.viewType !== 'area') return
    // 初始化区
    s.area = getChildren(s.params.defaultCityKey)
    if (!s.params.defaultAreaKey) {
      s.setDefaultAreaKey(s.city[0].key)
    }
    if (s.area) {
      s.addSlot(s.area, s.params.defaultAreaKey, s.params.areaClass)
    } else {
      s.addSlot(s.params.defaultValues, '', s.params.areaClass)
    }
  }
  function initKeys () {
    if (s.params.defaultProvince) s.setDefaultProvinceKey(getKey(s.params.defaultProvince))
    if (s.params.defaultCity) s.setDefaultCityKey(getKey(s.params.defaultCity, s.params.defaultProvinceKey))
    if (s.params.defaultArea) s.setDefaultAreaKey(getKey(s.params.defaultArea, s.params.defaultCityKey))
  }
  function initSlots () {
    // 把传入的value转为key
    initKeys()
    // 渲染
    addProvince()
    addCity()
    addArea()
  }
  initSlots()
  return s
}

;//export default PickerCity
