//Weather 天气控件
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
	    s.expires;
	    //Date
	    var date=new Date();
		if((!s.params.expires=="today" || s.params.expires==0) && typeof s.params.expires=="number"){
			return;
		}
		s.getExpires=function(){
			s.expires=date.expires(s.params.expires);
		}
		s.getExpires();
		//URL
	    s.weatherURL='http://api.map.baidu.com/telematics/v3/weather?location='+s.params.city+'&output=json&ak=W79uNeeyw7QXp6FGUzR6r8lY';
	    //s.weatherURL='http://api.map.baidu.com/telematics/v3/weather?location=南京';
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
	    //Citys
	    s.citysEl=[].slice.call(s.container.querySelectorAll(".weather-current-city"));
	    //Date
	    s.dateEl=s.container.querySelector("#weather-current-date");
	    //Temprature当前温度
	    s.tempratureEl=s.container.querySelector("#weather-current-temperature");
	    //NowTemprature今天温度
	    s.todayTempratureEl=s.container.querySelector("#weather-today-temperature");
	    //Pm2.5
	    s.pm25sEl=[].slice.call(s.container.querySelectorAll(".weather-current-pm25"));
	    //Quality
	    s.qualitysEl=[].slice.call(s.container.querySelectorAll(".weather-air-quality"));
	    //NowIcon当前天气图标
	    s.iconEl=s.container.querySelector("#weather-current-icon");
	    //NowName当前天气名称
	    s.weathersEl=[].slice.call(s.container.querySelectorAll(".weather-name"));
	    //Wind当前天气风级
	    s.windEl=s.container.querySelector("#weather-current-wind");
	    //OtherDays其它天气
	    s.otherDaysEl=s.container.querySelectorAll(".weather-otherday li");
	    //数据
	    s.todayData={
	    	/*"iconClass":"",
	    	"city":"",
	    	"date":"",
	    	"week":"",
	    	"weather":"",
	    	"temprature":"",
	    	"nowTemprature":"",
	    	"quality":"",
	    	"wind":""*/
	    }
	    s.otherDaysData=[
	    	/*{"iconClass":"","temprature":"","week":""},
	    	{"iconClass":"","temprature":"","week":""},
	    	{"iconClass":"","temprature":"","week":""},
	    	{"iconClass":"","temprature":"","week":""}*/
	    ]
		/*===========================
	    Method
	    ===========================*/
	    //Ajax
	    Weather.jsonpFn={};
	    Weather.jsonpCallback=function(data){
	        Weather.jsonpFn(data);
	    }
	    s.script;
	    s.jsonp=function(url,fn){
	    	var head=document.getElementsByTagName('head')[0];
	    	if(s.script)head.removeChild(s.script);
            Weather.jsonpFn=fn;
            var url=encodeURI(url+'&callback=Weather.jsonpCallback');
            s.script=document.createElement('script');
            s.script.type="text/javascript";
            s.script.src=url;
            s.script.onerror=function(){
                s.onError("s.jsonp方法136行");
            };
            head.appendChild(s.script);
        }
	    s.parseIcon=function(weatherImg){
	    	var weatherImgName = weatherImg.substring(weatherImg.lastIndexOf('/')+1, weatherImg.lastIndexOf('.'));
			return this.icon[weatherImgName];
	    }
	    s.getStainLvl=function(pm25){
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
	    
		s.initData=function(){
			var cache=JSON.parse(DB.get("weatherJson"));
			var cacheExpires=DB.get("weatherJson_expires");
			//var now=date.format(date.datetime());
			console.log(date);
			console.log(cacheExpires);
			if(!cache || cache.status!="success" || cacheExpires<=date){
				console.log("不读缓存");
				s.loadData();
				return;
			}
			s.render(cache);
		};
		s.loadData=function(){
			s.jsonp(s.weatherURL,s.onSuccess);
		};
		//适配数据
	    s.adapterData=function(data){
	    	var temperatureExpr=/(-)?\d*℃/;
			var weekExpr=/(周|星期|礼拜)[1-7一二三四五六七天日]/;
			var todayData=data.results[0].weather_data[0].date;

			var iconClass=s.parseIcon(data.results[0].weather_data[0].dayPictureUrl);
			var city=data.results[0].currentCity;
			var date=data.date;
			var week=weekExpr.exec(todayData)[0];
			var weather=data.results[0].weather_data[0].weather;
			var temprature=temperatureExpr.exec(todayData)[0];
			var nowTemprature=temperatureExpr.exec(todayData)[0];
			var pm25=data.results[0].pm25;
			var quality=s.getStainLvl(pm25);
			var wind=data.results[0].weather_data[0].wind;

	    	s.todayData={
		    	"iconClass":iconClass,
		    	"city":city,
		    	"date":date,
		    	"week":week,
		    	"weather":weather,
		    	"temprature":temprature,
		    	"nowTemprature":nowTemprature,
		    	"pm25":pm25,
		    	"quality":quality,
		    	"wind":wind
		    }
		    
		    for(var i=0;i<4;i++){
		    	var otherIconClass=s.parseIcon(data.results[0].weather_data[i].dayPictureUrl);
		    	var otherTemprature=data.results[0].weather_data[i].temperature;
		    	var otherWeek=data.results[0].weather_data[i].date;
		    	if(i==0)otherWeek=week;
		    	s.otherDaysData[i]={
		    		"iconClass":otherIconClass,
		    		"temprature":otherTemprature,
		    		"week":otherWeek
		    	}
				/*if (6 < date.hour() < 18) {
					s.otherDaysEl[i].querySelector("i").setAttribute("class",s.parseIcon(json.results[0].weather_data[i].dayPictureUrl));
				}else{
					s.otherDaysEl[i].querySelector("i").setAttribute("class",s.parseIcon(json.results[0].weather_data[i].dayPictureUrl));
				}*/
			}
	    }
	    s.render=function(data){
	    	s.adapterData(data);
	    	//获得当前城市
			s.citysEl.forEach(function(n,i,a){
				n.innerHTML=s.todayData.city;
			})
			//获得当前日期
			s.dateEl.innerHTML=s.todayData.date;
			//获得今天周
			s.todayWeek=s.todayData.week;
			//获得当前温度
			s.tempratureEl.innerHTML=s.todayData.nowTemprature;
			//获得当天温度
			s.todayTempratureEl.innerHTML=s.todayData.temprature;
			//获得当前空气pm2.5
			s.pm25sEl.forEach(function(n,i,a){
				n.innerHTML=s.todayData.pm25;
			})
			//获得当前空气质量
			s.qualitysEl.forEach(function(n,i,a){
				n.innerHTML=s.todayData.quality;
			})
			//获得当前天气图标
			s.iconEl.setAttribute("class",s.todayData.iconClass);
			//获得当天天气名称
			s.weathersEl.forEach(function(n,i,a){
				n.innerHTML=s.todayData.weather;
			})
			//获得当天风向与级数
			s.windEl.innerHTML=s.todayData.wind;
			//剩余4天
			for(var i=0;i<4;i++){
				s.otherDaysEl[i].querySelector("i").setAttribute("class",s.otherDaysData[i].iconClass);
				s.otherDaysEl[i].querySelector("p").innerHTML=s.otherDaysData[i].temprature;
				s.otherDaysEl[i].querySelector("small").innerHTML=s.otherDaysData[i].week;
			}
	    }

		//Controller
		s.onSuccess=function(data){
			if (!data) {
				alert("你填写的现居地有误 ");
				return;
			}
			console.log("正在读取服务器天气..");
			
			console.log("正在定义缓存时效，时效截止于"+s.expires);
			DB.set("weatherJson",JSON.stringify(data));
			DB.set("weatherJson_expires",s.expires);
			
			s.render(data);
		},
		s.onError=function(msg){
			console.log("天气获取失败,请刷新后重试："+msg);
		}
		s.initData();
	};
})(window,document,undefined);