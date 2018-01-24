//import Picker from './picker.js'
// 需要string.js的trim方法
var PickerCity = function (params) {
  // 参数改写
  var onCityClickSubmit = params.onClickSubmit
  var onCityScrollEnd = params.onScrollEnd
  params.onClickSubmit = undefined
  params.onScrollEnd = undefined
  /* --------------------
    Model
    -------------------- */
  var defaults = {
    viewType: 'area',
    data: null,

    defaultProvince: '北京市',
    defaultCity: '东城区',
    defaultArea: '',

    provinceClass: 'text-center',
    cityClass: 'text-center',
    areaClass: 'text-center',

    defaultValues: [{
      key: '',
      value: '----'
    }],
    onClickSubmit: function (e) {
      e.activeText = getActiveText(e.activeOptions)
      setActiveKeys(e.activeOptions)
      if (onCityClickSubmit) onCityClickSubmit(e)
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
  // 省、市、区选中的key
  s.activeProvinceKey = null
  s.activeCityKey = null
  s.activeAreaKey = null

  // 设置默认值
  s.setActiveProvinceKey = function (key) {
    s.activeProvinceKey = key.trim()
  }
  s.setActiveCityKey = function (key) {
    s.activeCityKey = key.trim()
  }
  s.setActiveAreaKey = function (key) {
    s.activeAreaKey = key.trim()
  }

  /* --------------------
  Method
  -------------------- */
  // 根据省市区名获得keys,返回:['320000','320100','320105'],参数:['江苏省','南京市','建邺区']
  function getKesByValues (values) {
    if (!values) return null
    var keys = []
    for (var i = 0, province; province = s.params.data[i++];) { // eslint-disable-line
      // 获得省
      if (province.value === values[0]) {
        keys.push(province.key)
        for (var j = 0, city; city = province.children[j++];) { // eslint-disable-line
          // 获得市
          if (city.value === values[1]) {
            keys.push(city.key)
            if (values[2]) {
              for (var k = 0, area; area = city.children[k++];) { // eslint-disable-line
                // 获得区
                if (area.value === values[2]) {
                  keys.push(area.key)
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
    // 如果省市区不对,则返回null
    return null
  }
  // 设置选中的省市区,不传参数则读取默认省市区
  s.setDefaults = function (argActiveValues) {
    var activeValues = argActiveValues || []
    // 如果没有传值,则读取默认值
    if (!activeValues || activeValues.length === 0) {
      if (s.params.defaultProvince) activeValues.push(s.params.defaultProvince)
      if (s.params.defaultCity) activeValues.push(s.params.defaultCity)
      if (s.params.defaultArea) activeValues.push(s.params.defaultArea)
    }
    // 设置选中的key
    var keys = getKesByValues(activeValues)
    if (keys && keys[0]) s.setActiveProvinceKey(keys[0])
    if (keys && keys[1]) s.setActiveCityKey(keys[1])
    if (keys && keys[2]) s.setActiveAreaKey(keys[2])
  }
  
  // 获得选中的文字
  function getActiveText (activeOptions) {
    var activeValues = activeOptions.map(function (n, i, a) {
      return n['value']
    })
    var activeText = ''
    if (activeValues[0]) activeText += activeValues[0]
    if (activeValues[1]) activeText += '-' + activeValues[1]
    if (activeValues[2] && activeValues[2] !== s.params.defaultValues[0].value) activeText += '-' + activeValues[2]
    return activeText
  }
  // 设置选中的keys
  function setActiveKeys (activeOptions) {
    var activeKeys = activeOptions.map(function (n, i, a) {
      return n['key']
    })
    if (activeKeys[0]) s.setActiveProvinceKey(activeKeys[0])
    if (activeKeys[1]) s.setActiveCityKey(activeKeys[1])
    if (activeKeys[2]) s.setActiveAreaKey(activeKeys[2])
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
  function getChildrenByKey (key) {
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
  /* ----------------
  Init
  ---------------- */
  /* // 替换省
  function replaceProvince (activeKey) {
    var provinces = getChildrenByKey()
    s.replaceSlot(0, provinces, activeKey || provinces[0].key, s.params.cityClass)
    return provinces
  } */
  // 替换市
  function replaceCity (key, activeKey) {
    var citys = getChildrenByKey(key)
    s.replaceSlot(1, citys, activeKey || citys[0].key, s.params.cityClass)
    return citys
  }
  // 替换区
  function replaceArea (key, activeKey) {
    if (s.params.viewType !== 'area') return
    var areas = getChildrenByKey(key)
    if (areas && areas.length && areas.length > 0) {
      s.replaceSlot(2, areas, activeKey || areas[0].key, s.params.areaClass)
    } else {
      s.replaceSlot(2, s.params.defaultValues, s.params.defaultValues['key'], s.params.areaClass)
    }
  }
  // 添加省
  function addProvince () {
    if (!s.province) {
      s.province = getChildrenByKey()
    }
    if (!s.activeProvinceKey) {
      s.setActiveProvinceKey(s.province[0].key)
    }
    s.addSlot(s.province, s.activeProvinceKey, s.params.provinceClass)
  }
  // 添加市
  function addCity () {
    s.city = getChildrenByKey(s.activeProvinceKey)
    if (!s.activeCityKey) {
      s.setActiveCityKey(s.city[0].key)
    }
    s.addSlot(s.city, s.activeCityKey, s.params.cityClass)
  }
  // 添加区
  function addArea () {
    if (s.params.viewType !== 'area') return
    s.area = getChildrenByKey(s.activeCityKey)
    if (!s.activeAreaKey) {
      s.setActiveAreaKey(s.city[0].key)
    }
    if (s.area) {
      s.addSlot(s.area, s.activeAreaKey, s.params.areaClass)
    } else {
      s.addSlot(s.params.defaultValues, '', s.params.areaClass)
    }
  }
  
  function initSlots () {
    if (!s.activeProvinceKey) return
    // 渲染
    addProvince()
    addCity()
    addArea()
  }
  s.update = function () {
    s.clearSlots()
    initSlots()
  }
  // 设置默认选中项
  s.setDefaults()
  // 添加省市区
  initSlots()
  return s
}

;//export default PickerCity
