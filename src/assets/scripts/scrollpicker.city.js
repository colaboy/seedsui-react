//SpCity 扩展scrollpicker地区控件 (require scrollpikcer.js)
(function(window, document, undefined) {
	window.SpCity = function(params) {
		/*================
	    Model
	    ==================*/
		var defaults = {
			parent: document.body,
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

			defaultValues: [{
				key: 'none',
				value: '----'
			}],
			provinceClass: "",
			cityClass: "",
			areaClass: "",
			/*callbacks
			onClickDone:function(Scrollpicker)
			onClickCancel:function(Scrollpicker)
			*/
		}
		params = params || {};
		for (var def in defaults) {
			if (params[def] === undefined) {
				params[def] = defaults[def];
			}
		}
		//SpCity
		var s = this;

		//Params
		s.params = params;

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
		/*================
	    Method
	    ==================*/
		s.setOnClickDone = function(fn) {
			s.params.onClickDone = fn;
		}
		s.setOnClickCancel = function(fn) {
			s.params.onClickCancel = fn;
		}
		s.getActive = function(activeData) {
				var activeValue = "",
					activeKey = "";
				var cityArr = activeData.filter(function(n) {
					return n != s.params.defaultValues[0];
				});
				cityArr.forEach(function(n, i, a) {
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
			/*================
	    Control
	    ==================*/
		var params = {
			parent: s.params.parent,
			isClickMaskHide: s.params.isClickMaskHide,
			onClickDone: function(e) {
				var activeOption = s.getActive(e.activeOptions);
				e.activeValue = activeOption.activeValue;
				e.activeKey = activeOption.activeKey;
				if (s.params.onClickDone) s.params.onClickDone(e);
			},
			onClickCancel: function(e) {
				e.activeText = s.getActive(e.activeOptions);
				if (s.params.onClickCancel) s.params.onClickCancel(e);
				else e.hide();
			},
			onScrollEnd: function(e) {
				var activeOption = e.activeSlot.values[e.activeSlot.activeIndex];
				if (e.activeSlot.index === 0) { //滚动省
					s.defaultProvince = activeOption.key;
					s.defaultCity = s.getChildren(s.defaultProvince)[0].key;
				} else if (e.activeSlot.index === 1) { //滚动市
					s.defaultCity = activeOption.key;
				}
				s.updateSlots(s.defaultProvince, s.defaultCity);
			}
		};
		//初始化滚动控件
		s.scrollpicker = new Scrollpicker();
		s.getSingleArray = function(mulArr) {
			var array = [];
			for (var i = 0, opt; opt = mulArr[i++];) {
				array.push({
					key: opt.key,
					value: opt.value
				});
			}
			return array;
		}
		s.getChildren = function(key) {
			//如果没有传key，表示获得第一层
			if (!key) return s.getSingleArray(s.data);
			//如果传key，则找到对应key的子级
			for (var i = 0, province; province = s.data[i++];) {
				if (province.key == key) return s.getSingleArray(province.children);
				for (var j = 0, city; city = province.children[j++];) {
					if (!city.children) break;
					if (city.key == key) return s.getSingleArray(city.children);
				}
			}
			return null;
		}
		s.updateSlots = function(defaultProvince, defaultCity, defaultArea) {
			var defaultProvince = defaultProvince,
				defaultCity = defaultCity,
				defaultArea = defaultArea;

			//清空槽
			s.scrollpicker.clearSlots();

			//初始化省
			if (!s.province) {
				s.province = s.getChildren();
			}
			if (!defaultProvince || !s.province) {
				defaultProvince = s.province[0].key;
			}
			s.scrollpicker.addSlot(s.province, defaultProvince, s.params.provinceClass);

			//初始化市
			s.city = s.getChildren(defaultProvince);
			if (!defaultCity) {
				defaultCity = s.city[0].key;
			}
			s.scrollpicker.addSlot(s.city, defaultCity, s.params.cityClass);

			//初始化区
			if (s.params.isShowArea) {
				s.area = s.getChildren(defaultCity);
				if (s.area) {
					s.scrollpicker.addSlot(s.area, defaultArea, s.params.areaClass);
				} else {
					s.scrollpicker.addSlot(s.params.defaultValues, "", s.params.areaClass);
				}
			}
		}
		s.updateSlots(s.params.defaultProvince, s.params.defaultCity, s.params.defaultArea);

		s.init = function() {}
	}
})(window, document, undefined);