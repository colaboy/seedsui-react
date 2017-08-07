//扩展picker地区控件 (require pikcer.js)
(function (window, document, undefined) {
  window.CityPicker = function (params) {
    // 参数改写
    var onDateClickDone = params.onClickDone
    var onDateClickCancel = params.onClickCancel
    var onDateScrollEnd = params.onScrollEnd
    params.onClickDone = undefined
    params.onClickCancel = undefined
    params.onScrollEnd = undefined
		/* --------------------
	    Model
	    -------------------- */
    var defaults = {
      data: null,

      province: null,
      city: null,
      area: null,
      defaultProvince: "",
      defaultCity: "",
      defaultArea: "",
      isShowProvince: true,
      isShowCity: true,
      isShowArea: true,

      provinceClass: "text-center",
      cityClass: "text-center",
      areaClass: "text-center",

      defaultValues: [{
        key: 'none',
        value: '----'
      }],
      onClickDone: function (e) {
        var activeOption = getActive(e.activeOptions);
        e.activeValue = activeOption.activeValue;
        e.activeKey = activeOption.activeKey;
        if (onDateClickDone) onDateClickDone(e);
      },
      onClickCancel: function (e) {
        e.activeText = getActive(e.activeOptions);
        if (onDateClickCancel) onDateClickCancel(e);
        else e.hide();
      },
      onScrollEnd: function (e) {
        var activeOption = e.activeSlot.values[e.activeSlot.activeIndex];
        if (e.activeSlot.index === 0) { //滚动省
          s.defaultProvince = activeOption.key;
          s.defaultCity = getChildren(s.defaultProvince)[0].key;
        } else if (e.activeSlot.index === 1) { //滚动市
          s.defaultCity = activeOption.key;
        }
        // 回调
        if (onDateScrollEnd) onDateScrollEnd(e)
        s.updateSlots(s.defaultProvince, s.defaultCity);
      }
    }
    params = params || {};
    for (var def in defaults) {
      if (params[def] === undefined) {
        params[def] = defaults[def];
      }
    }
    var s = new Scrollpicker(params);

    //Data
    s.data = s.params.data;
    if (!s.data) return;

    //省、市、区数据
    s.province = s.params.province || null,
      s.city = s.params.city || null,
      s.area = s.params.area || null,
      s.defaultProvince = s.params.defaultProvince || "",
      s.defaultCity = s.params.defaultCity || "",
      s.defaultArea = s.params.defaultArea || "";

		/*--------------------
	    Method
	    --------------------*/
    function getActive(activeData) {
      console.log(activeData)
      var activeValue = "",
        activeKey = "";
      var cityArr = activeData.filter(function (n) {
        return n != s.params.defaultValues[0];
      });
      cityArr.forEach(function (n, i, a) {
        if (i == cityArr.length - 1) {
          activeValue += n["value"];
          activeKey += n["key"];
        } else {
          activeValue += n["value"] + "-";
          activeKey += n["key"] + "-";
        }
      })
      return {
        activeValue: activeValue,
        activeKey: activeKey
      };
    }

    //获得第一层
    function getPureArray(array) {
      var arr = [];
      for (var i = 0, opt; opt = array[i++];) {
        arr.push({
          key: opt.key,
          value: opt.value
        });
      }
      return arr;
    }

    //根据key获得children
    function getChildren(key) {
      //如果没有传key，表示获得第一层
      if (!key) return getPureArray(s.params.data);
      //如果传key，则找到对应key的子级
      for (var i = 0, province; province = s.params.data[i++];) {
        if (province.key == key) return getPureArray(province.children);
        for (var j = 0, city; city = province.children[j++];) {
          if (!city.children) break;
          if (city.key == key) return getPureArray(city.children);
        }
      }
      return null;
    }
    s.updateSlots = function (defaultProvince, defaultCity, defaultArea) {
      var defaultProvince = defaultProvince
      var defaultCity = defaultCity
      var defaultArea = defaultArea

      //清空槽
      s.clearSlots();

      //初始化省
      if (!s.province) {
        s.province = getChildren();
      }
      if (!defaultProvince || !s.province) {
        defaultProvince = s.province[0].key;
      }
      s.addSlot(s.province, defaultProvince, s.params.provinceClass);

      //初始化市
      s.city = getChildren(defaultProvince);
      if (!defaultCity) {
        defaultCity = s.city[0].key;
      }
      s.addSlot(s.city, defaultCity, s.params.cityClass);

      //初始化区
      if (s.params.isShowArea) {
        s.area = getChildren(defaultCity);
        if (s.area) {
          s.addSlot(s.area, defaultArea, s.params.areaClass);
        } else {
          s.addSlot(s.params.defaultValues, "", s.params.areaClass);
        }
      }
    }
    s.updateSlots(s.params.defaultProvince, s.params.defaultCity, s.params.defaultArea);
    return s;
  }
})(window, document, undefined);