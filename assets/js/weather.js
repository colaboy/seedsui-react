/*!
 * 天气控件
 * @version 1.0.0
 * @author WangMingzhu
 * @require db.js & dateutil.js
 */

/**
*  天气控件
* 
*  @class Weather
*  @constructor
*  @param container //选择dom .weatherbox
*  @param params //配置项，如{"city":"扬州","expires":0.1}
*  @return {josn}
*  @import DateUtil from './DateUtil.js'
*/
(function(window,document,undefined){
	
	window.Weather=function(container,params){
		//Model
	    var defaults={
	    	"city":"南京",
	    	"expires":"today"
	    };
	    params=params||{};
	    for(var def in defaults){
	    	if(params[def]==undefined){
	    		params[def]=defaults[def];
	    	}
	    };
	    var s=this;
	    s.params=params;
	    //Expires
		if((!s.params.expires=="today" || s.params.expires==0) && typeof s.params.expires=="number"){
			return;
		}
		s.params.expires=DateUtil.format(DateUtil.expires(s.params.expires));
		//Icon
		s.icon={
			"qing" : "icon-weaqing",
			"duoyun" : "icon-weaduoyun",
			"zhenyu" : "icon-weazhenyu",
			"leizhenyu" : "icon-wealeizhenyu",
			"leizhenyubanyoubingbao" : "icon-wealeizhenyubanyoubingbao",
			"yujiaxue" : "icon-weayujiaxue",
			"xiaoyu" : "icon-weaxiaoyu",
			"zhongyu" : "icon-weazhongyu",
			"dayu" : "icon-weadayu",
			"baoyu" : "icon-weabaoyu",
			"dabaoyu" : "icon-weadabaoyu",
			"tedabaoyu" : "icon-weatedabaoyu",
			"zhenxue" : "icon-weazhenxue",
			"xiaoxue" : "icon-weaxiaoxue",
			"zhongxue" : "icon-weazhongxue",
			"daxue" : "icon-weadaxue",
			"baoxue" : "icon-weabaoxue",
			"wu" : "icon-weawu",
			"dongyu" : "icon-weadongyu",
			"shachenbao" : "icon-weashachenbao",
			"xiaoyuzhuanzhongyu" : "icon-weaxiaoyuzhuanzhongyu",
			"zhongyuzhuandayu" : "icon-weazhongyuzhuandayu",
			"dayuzhuanbaoyu" : "icon-weadayuzhuanbaoyu",
			"baoyuzhuandabaoyu" : "icon-weabaoyuzhuandabaoyu",
			"dabaoyuzhuantedabaoyu" : "icon-weadabaoyuzhuantedabaoyu",
			"xiaoxuezhuanzhongxue" : "icon-weaxiaoxuezhuanzhongxue",
			"zhongxuezhuandaxue" : "icon-weazhongxuezhuandaxue",
			"daxuezhuanbaoxue" : "icon-weadaxuezhuanbaoxue",
			"fuchen" : "icon-weafuchen",
			"yangsha" : "icon-weayangsha",
			"qiangshachenbao" : "icon-weaqiangshachenbao",
			"mai" : "icon-weamai",
			"yin" : "icon-weayin"
		};
		//Container
	    s.container=document.querySelector(container);
	    //City
	    s.city=s.container.querySelector(".weather-current-city");
	    //Date
	    s.date=s.container.querySelector("#weather-current-date");
	    //NowTemprature
	    s.nowTemprature=s.container.querySelector("#weather-current-temperature");
	    //Pm2.5
	    s.pm25=s.container.querySelector(".weather-current-pm25");
	    //Quality
	    s.quality=s.container.querySelector(".weather-air-quality");
	    //NowIcon当前天气图标
	    s.nowIcon=s.container.querySelector("#weather-current-icon");
	    //NowName当前天气名称
	    s.nowName=s.container.querySelector(".weather-name");
	    //Wind当前天气风级
	    s.wind=s.container.querySelector("#weather-current-wind");
	    //OtherDays其它天气
	    s.otherDays=s.container.querySelectorAll(".weather-otherday");
		/*===========================
	    Method
	    ===========================*/
		//如果本地数据库已存在，并且没有过期，就不再读取baidu天气api
		s.initWeatherData=function(){
			var weatherData=DB.get("weatherJson");
			var weatherDataExpires=DB.get("weatherJson_expires");
			var today=DateUtil.format(DateUtil.todayNow());
			if(weatherData && weatherDataExpires && weatherDataExpires>today){
				console.log("正在读取缓存天气，缓存于"+weatherDataExpires+"过期");
				s.showWeather(JSON.parse(weatherData));
				return;
			}
			s.loadWeatherData();
		};
		s.loadWeatherData=function(){
			$.ajax({
				url: 'http://api.map.baidu.com/telematics/v3/weather?location='+s.params.city+'&output=json&ak=W79uNeeyw7QXp6FGUzR6r8lY',
				type: 'GET',
				dataType: 'jsonp',
				success: function(json) {
					console.log(json);
					if (!json) {
						alert("你填写的现居地有误 ");
						return;
					}
					console.log("正在读取服务器天气..");
					
					//如果传入了时效参数，就将josn存储到本地数据库
					console.log("正在定义缓存时效，时效截止于"+s.params.expires);
					DB.set("weatherJson",JSON.stringify(json));
					DB.set("weatherJson_expires",s.params.expires);
					
					s.showWeather(json);
				},
				error:function(msg){
					console.log("ajax请求失败："+msg);
				}
			});
		};

		s.showWeather=function(json){
			var temperatureExpr=/(-)?\d*℃/;
			var weekExpr=/(周|星期|礼拜)[1-7一二三四五六七天日]/;
			if (json.status == 'success') {
				//获得当前城市
				s.city.innerHTML=json.results[0].currentCity;
				//$(".weather-current-city",s.container).html(json.results[0].currentCity);
				//获得当前日期
				s.date.innerHTML=json.date;
				//$("#weather-current-date",s.container).html(json.date);
				var today=json.results[0].weather_data[0].date;
				var temperatureMatch=temperatureExpr.exec(today);
				var weekMatch=weekExpr.exec(today);
				//获得当前温度
				s.nowTemprature.innerHTML=temperatureMatch[0];
				//$("#weather-current-temperature",s.container).html(temperatureMatch[0]);
				//获得当天温度
				s.container.querySelector("#weather-today-temperature").innerHTML=json.results[0].weather_data[0].temperature;
				//$("#weather-today-temperature",s.container).html(json.results[0].weather_data[0].temperature);
				var pm25=json.results[0].pm25;
				var airquality=s.airqualityLvl(pm25);
				//获得当前空气pm2.5
				s.pm25.innerHTML=pm25;
				//$(".weather-current-pm25",s.container).html(pm25);
				//获得当前空气质量
				s.quality.innerHTML=airquality;
				//$(".weather-air-quality",s.container).html(airquality);
				//获得当前天气图标
				s.nowIcon.setAttribute("class",json.results[0].weather_data[0].dayPictureUrl);
				//$("#weather-current-icon",s.container).attr("class",s.reWeatherIcon(json.results[0].weather_data[0].dayPictureUrl));
				//获得当天天气名称
				s.nowName.innerHTML=json.results[0].weather_data[0].weather;
				//$(".weather-name",s.container).html(json.results[0].weather_data[0].weather);
				//获得当天风向与级数
				s.wind.innerHTML=json.results[0].weather_data[0].wind;
				//$("#weather-current-wind").html(json.results[0].weather_data[0].wind);
				for(var i=0;i<4;i++){
					if (6 < DateUtil.hour() < 18) {
						s.otherDays[i].querySelector("i").setAttribute("class",s.reWeatherIcon(json.results[0].weather_data[i].dayPictureUrl));
						//$(".weather-otherday i",s.container).eq(i).attr("class",s.reWeatherIcon(json.results[0].weather_data[i].dayPictureUrl));
					}else{
						s.otherDays[i].querySelector("i").setAttribute("class",s.reWeatherIcon(json.results[0].weather_data[i].dayPictureUrl));
						//$(".weather-otherday i",s.container).eq(i).attr("class",s.reWeatherIcon(json.results[0].weather_data[i].dayPictureUrl));
					}
					s.otherDays[i].querySelector("p").innerHTML=json.results[0].weather_data[i].temperature;
					s.otherDays[i].querySelector("small").innerHTML=json.results[0].weather_data[i].temperature;
					//$(".weather-otherday p",s.container).eq(i).html(json.results[0].weather_data[i].temperature);
					//$(".weather-otherday small",s.container).eq(i).html(json.results[0].weather_data[i].date);
				}
				s.otherDays[0].querySelector("small").innerHTML=weekMatch[0];
				//$(".weather-otherday small",s.container).eq(0).html(weekMatch[0]);
			}else{
				alert("天气获取失败,请刷新后重试");
			}
		}

		//Controller
		s.initWeatherData();
	};
	//prototype
	Weather.prototype={
		reWeatherIcon:function(weatherImg){
			var weatherImgName = weatherImg.substring(weatherImg.lastIndexOf('/')+1, weatherImg.lastIndexOf('.'));
			return this.icon[weatherImgName];
		},
		airqualityLvl:function(pm25){
			var airquality="";
			if(pm25<=50){
				airquality="优";
			}else if(pm25>50 && pm25<=100){
				airquality="良";
			}else if(pm25>100 && pm25<=150){
				airquality="轻度污染";
			}else if(pm25>150 && pm25<=200){
				airquality="中度污染";
			}else if(pm25>200 && pm25<=300){
				airquality="重度污染";
			}else{
				airquality="严重污染";
			}
			return airquality;
		}
	}
})(window,document,undefined);