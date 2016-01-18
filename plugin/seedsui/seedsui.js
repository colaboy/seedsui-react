/*!
 * 卡片框
 * @version 1.0.0
 * @author WangMingzhu
 * @requie jquery.js
 */

/**
*  下方弹出卡片框
* 
*  @class Actionsheet
*/
(function(window,document,undefined){
	'use strict';
	window.Actionsheet=function(params){
		var defaults=[
			{
				text : '退出',
		        handler : function(e){
		        	Popup.confirm("您确定要退出吗",function(){
						this.toast("确定")
					},function(){
						this.destroy();
					});
				}
		    }
		];
		params=params||null;
		if(params==null){
			params=defaults;
		}
		var s=this;
		s.params=params;
		//开关动画
		s.hideAnimate={bottom:"-100%"};
		s.showAnimate={bottom:"0%"};

		/*================
		Model
		================*/
		var createEl=function(tagname,classname){
			var el=document.createElement(tagname);
			if(classname)el.setAttribute("class",classname);
			return el;
		}
		s.createMask=function(){
			if(s.mask)return;
			s.mask=createEl("div","popup-mask");
			document.body.appendChild(s.mask);

			//遮罩绑定点击事件
			s.mask.addEventListener("click",s.onClickCancel,false);
		};
		s.createContainer=function(){
			if(s.container)return;
			s.container=createEl("div","popup actionsheet");

			var group=createEl("div","actionsheet-group");
			for(var i=0,param;param=s.params[i++];){
				var btn=createEl("a");
				btn.innerHTML=param.text;
				group.appendChild(btn);
				//绑定事件
				(function(param){
					btn.addEventListener("click",function(){
						param.handler(s);
					},false);
				})(param)
			}
			//创建取消按钮
			var cancel=createEl("a","actionsheet-cancel");
			cancel.innerHTML="取消";

			s.container.appendChild(group);
			s.container.appendChild(cancel);

			document.body.appendChild(s.container);

			//取消按钮绑定点击事件
			cancel.addEventListener("click",s.onClickCancel,false);
		}
		/*================
		Method
		================*/
		s.hide=function(){
			$(s.mask).animate({opacity:0},"fast","linear",function(){
				$(this).css("display","none");
			});
			$(s.container).animate(s.hideAnimate,"fast","linear",function(){
				$(this).css("display","none");
			});
		};
		s.show=function(){
			if(s){
				$(s.mask).css("display","block").animate({opacity:1},"fast","linear");
				$(s.container).css("display","block").animate(s.showAnimate,"fast","linear");
			}
		};
		s.destory=function(){
			$(s.mask).animate({opacity:0},"fast","linear",function(){
				$(this).remove();
			});
			$(s.container).animate(s.hideAnimate,"fast","linear",function(){
				$(this).remove();
			});
			s=null;
		};
		/*================
		Event
		================*/
		s.onClickCancel=function(){
			if(s.params.onClickOk){
				s.params.onClickOk(s);
				return;
			}
			s.hide();
		};
		/*================
		Init
		================*/
		s.init=function(){
			s.createMask();
			s.createContainer();
		}
		s.init();
	}
})(window,document,undefined);/*!
 * 对话框
 * @version 1.0.0
 * @author WangMingzhu
 * @requie jquery.js
 */

/**
*  对话框
* 
*  @class Confirm
*/
(function(window,document,undefined){
	'use strict';
	window.Alert=function(msg,params){
		/*================
		Model
		================*/
		var defaults={
			"title":"提示",
			"buttonOk":"确定"
			/*
            Callbacks:
			onClickOk:function(alert)
			onClickCancel:function(alert)
			*/
		}
		params=params||{};
		for(var def in defaults){
			if(params[def]==undefined){
				params[def]=defaults[def];
			}
		}
		var s=this;
		s.params=params;
		//开关动画
		s.hideAnimate={"opacity":"0"};
		s.showAnimate={"opacity":"1"};
		/*================
		Method
		================*/
		s.createMask=function(){
			if(s.mask)return;
			s.mask=document.createElement("div");
			s.mask.setAttribute("class","popup-mask");
			document.body.appendChild(s.mask);
		};
		s.createContainer=function(){
			if(s.container)return;
			s.container=document.createElement("div");
			s.container.setAttribute("class","popup confirm");
			var title=document.createElement("h1");
			title.innerHTML=s.params.title;
			s.content=document.createElement("label");
			s.content.innerHTML=msg;
			var handler=document.createElement("div");
			handler.setAttribute("class","popup-handler");

			s.buttonOk=document.createElement("a");
			s.buttonOk.innerHTML=s.params.buttonOk;

			handler.appendChild(s.buttonOk);
			
			s.container.appendChild(title);
			s.container.appendChild(s.content);
			s.container.appendChild(handler);

			document.body.appendChild(s.container);

			//ok按钮绑定点击事件
			s.buttonOk.addEventListener("click",s.onClickOk,false);
		}
		/*================
		Controller
		================*/
		s.setText=function(msg){
			s.content.innerHTML=msg;
		};
		s.hide=function(){
			$(s.mask).animate({opacity:0},"fast","linear",function(){
				$(this).css("display","none");
			});
			$(s.container).animate(s.hideAnimate,"fast","linear",function(){
				$(this).css("display","none");
			});
		};
		s.show=function(){
			if(s){
				$(s.mask).css("display","block").animate({opacity:1},"fast","linear");
				$(s.container).css("display","block").animate(s.showAnimate,"fast","linear");
			}
		};
		s.destory=function(){
			$(s.mask).animate({opacity:0},"fast","linear",function(){
				$(this).remove();
			});
			$(s.container).animate(s.hideAnimate,"fast","linear",function(){
				$(this).remove();
			});
			s=null;
		};
		/*================
		Event
		================*/
		s.onClickOk=function(){
			if(s.params.onClickOk){
				s.params.onClickOk(s);
				return;
			}
			s.hide();
		};
		/*================
		Init
		================*/
		s.init=function(){
			s.createMask();
			s.createContainer();
		}
		s.init();
	}
})(window,document,undefined);/*!
 * 动画库
 * @version 1.0.0
 * @author WangMingzhu
 * 
 * @import EventUtil from './eventutil.js'
 */

/**
*  常用的动画库
* 
*  @class Animate
*/

var Animate=(function(){
	var requestAnimationFrame = window.requestAnimationFrame||
		window.webkitRequestAnimationFrame||
		window.mozRequestAnimationFrame||
		window.oRequestAnimationFrame||
		window.msRequestAnimationFrame||
		function (callback) { window.setTimeout(callback, 1000 / 60); };

	var cancelAnimationFrame = window.cancelAnimationFrame||
		window.webkitCancelAnimationFrame||
		window.mozCancelAnimationFrame||
		window.oCancelAnimationFrame||
		window.msCancelAnimationFrame||
		function (handler) { window.clearTimeout(handler); };

	function countTo(element,fromNumber,toNumber){
		var fromNum = fromNumber;
		var toNum=toNumber;
		var elem=element;
		function step() {
			fromNum += 1;
			elem.innerHTML=fromNum;
			if (fromNum < toNum) {
				requestAnimationFrame(step);
			}
		}
		step();
	}
	//setInterval帧率测试
	function testSiFps(callback){
    	var fps=0;
    	var si=setInterval(function(){
    		fps++;
    	},1);
    	setTimeout(function(){
    		//alert("setInterval帧率："+fps);
    		if(callback){
    			callback(fps);
    		}
			clearInterval(si);
		},1000);
	}
	//requestAnimationFrame帧率测试
	function testRafFps(callback){
    	var fps=0;
    	function fpstest(timestamp){
    		fps++;
    		var raf=requestAnimationFrame(fpstest);
    		if(timestamp>=1000){
    			//alert("requestAnimationFrame帧率："+count1);
    			if(callback){
	    			callback(fps);
	    		}
    			cancelAnimationFrame(raf);
    		}
    	}
    	requestAnimationFrame(fpstest);
	}

	return{
		//动画执行一次后销毁
		one:function(el,aniname){
			var animExpr=new RegExp("\\s{0,}"+aniname,"g");
			if(el.className.match(animExpr)){
				el.className=el.className.replace(animExpr,"");
			}
			el.className+=" "+aniname;
			EventUtil.addHandler(el,"animationend",function(e){
				el.className=el.className.replace(animExpr,"");
			});
		},
		//setTime帧率测试
		testSiFps:testSiFps,
		//requestAnimation帧率测试
		testRafFps:testRafFps,
		//计数器
		counter:function(){
			var timers=document.querySelectorAll(".timer");
			for(var i=0;i<timers.length;i++){
				var dataTo=timers[i].getAttribute("data-to")||0;
				var dataFrom=timers[i].getAttribute("data-from")||0;
				if(dataFrom>dataTo){
					alert("起始值dataFrom不能大于结束值dataTo");
					return;
				}
				countTo(timers[i],dataFrom,dataTo);
			}
		}
	}
})();/*!
 * 百度地图api
 * @version 1.0.0
 * @author WangMingzhu
 */

/**
*  百度地图api调用
* 
*  @class BaiduMap
*/
var BaiduMap={
	//gps回调
	gps:function(featureHandler,feature){
		var geolocation = new BMap.Geolocation();
		geolocation.getCurrentPosition(function(pos){
			if(this.getStatus() == BMAP_STATUS_SUCCESS){
				var point=pos.point,y=point.lng,x=point.lat;
				//这里是坐标point
				if(feature && feature==="point"){
					featureHandler(point);
					return;
				}
				//根据point得到地址
				var gpsPlace = new BMap.Geocoder();
				gpsPlace.getLocation(point, function(result){      
					if (result){
						//执行传入的回调函数
						featureHandler(point,result.address);
					}else{
						alert("获取地址失败"+this.getStatus());
					}
				});
			}else {
				alert("获取坐标失败"+this.getStatus());
			}
		},{enableHighAccuracy: true});
	},
	
	//根据坐标获得地址
	place:function(point,featureHandler){
		alert(point);
		//根据point得到地址
		var gpsPlace = new BMap.Geocoder();
		gpsPlace.getLocation(point, function(result){      
			if (result){
				//执行传入的回调函数
				if(feature && feature==="place"){
					featureHandler(result.address);
				}
			}
		});
	},
	
	//一键导航
	mapGuide:function(guideopts){
		var lng=guideopts.point.lng;
		var lat=guideopts.point.lat;
		var title=guideopts.title;
		var content=guideopts.content;
		window.location.href='http://api.map.baidu.com/marker?location='+lat+','+lng+'&title='+title+'&content='+content+'&output=html';
	},
	
	//返回地址截图
	mapImg:function(mapImgOpt){
		var lng=mapImgOpt.point.lng;
		var lat=mapImgOpt.point.lat;
		var title=mapImgOpt.title;
		var content=mapImgOpt.content;
		var width=mapImgOpt.width;
		var height=mapImgOpt.height;
		
		var imgSrc="http://api.map.baidu.com/staticimage?width="+width+"&height="+height+"&center="+lng+","+lat+"&markers="+lng+","+lat+"&scale=1&zoom=15&markerStyles=-1,http://api.map.baidu.com/images/marker_red.png";
		return imgSrc;
	}
};/*!
 * 对话框
 * @version 1.0.0
 * @author WangMingzhu
 * @requie jquery.js
 */

/**
*  弹出是否框
* 
*  @class Confirm
*/
(function(window,document,undefined){
	'use strict';
	window.Confirm=function(msg,params){
		/*================
		Model
		================*/
		var defaults={
			"title":"提示",
			"buttonOk":"确定",
			"buttonCancel":"取消",
			/*
            Callbacks:
			onClickOk:function(alert)
			onClickCancel:function(alert)
			*/
		}
		params=params||{};
		for(var def in defaults){
			if(params[def]==undefined){
				params[def]=defaults[def];
			}
		}
		var s=this;
		s.params=params;
		//开关动画
		s.hideAnimate={"opacity":"0"};
		s.showAnimate={"opacity":"1"};

		/*================
		Method
		================*/
		s.createMask=function(){
			if(s.mask)return;
			s.mask=document.createElement("div");
			s.mask.setAttribute("class","popup-mask");
			document.body.appendChild(s.mask);
		};
		s.createContainer=function(){
			if(s.container)return;
			s.container=document.createElement("div");
			s.container.setAttribute("class","popup confirm");
			var title=document.createElement("h1");
			title.innerHTML=s.params.title;
			s.content=document.createElement("label");
			s.content.innerHTML=msg;
			var handler=document.createElement("div");
			handler.setAttribute("class","popup-handler");

			s.buttonCancel=document.createElement("a");
			s.buttonCancel.innerHTML=s.params.buttonCancel;

			s.buttonOk=document.createElement("a");
			s.buttonOk.innerHTML=s.params.buttonOk;

			handler.appendChild(s.buttonCancel);
			handler.appendChild(s.buttonOk);
			
			s.container.appendChild(title);
			s.container.appendChild(s.content);
			s.container.appendChild(handler);

			document.body.appendChild(s.container);

			//ok按钮绑定点击事件
			s.buttonOk.addEventListener("click",s.onClickOk,false);
			s.buttonCancel.addEventListener("click",s.onClickCancel,false);
		}
		
		/*================
		Controller
		================*/
		s.setText=function(msg){
			s.content.innerHTML=msg;
		};
		s.hide=function(){
			$(s.mask).animate({opacity:0},"fast","linear",function(){
				$(this).css("display","none");
			});
			$(s.container).animate(s.hideAnimate,"fast","linear",function(){
				$(this).css("display","none");
			});
		};
		s.show=function(){
			if(s){
				$(s.mask).css("display","block").animate({opacity:1},"fast","linear");
				$(s.container).css("display","block").animate(s.showAnimate,"fast","linear");
			}
		};
		s.destory=function(){
			$(s.mask).animate({opacity:0},"fast","linear",function(){
				$(this).remove();
			});
			$(s.container).animate(s.hideAnimate,"fast","linear",function(){
				$(this).remove();
			});
			s=null;
		};
		/*================
		Event
		================*/
		s.onClickOk=function(){
			if(s.params.onClickOk){
				s.params.onClickOk(s);
				return;
			}
		};
		s.onClickCancel=function(){
			if(s.params.onClickCancel){
				s.params.onClickCancel(s);
				return;
			}
			s.hide();
		};
		/*================
		Init
		================*/
		s.init=function(){
			s.createMask();
			s.createContainer();
		}
		s.init();
	}
})(window,document,undefined);/*!
 * 日期能力扩展
 * @version 1.0.0
 * @author WangMingzhu
 */

/**
*  日期能力扩展
* 
*  @class DateUtil
*/
var DateUtil=function(){
	'use strict';
	var date = new Date();
	return {
		year:function(){
			return date.getFullYear();
		},
		month:function(){
			return date.getMonth() + 1;
		},
		day:function(){
			return date.getDate();
		},
		hour:function(){
			return date.getHours();
		},
		minute:function(){
			return date.getMinutes();
		},
		seconds:function(){
			return date.getSeconds();
		},
		quarter:function(){
			return Math.floor((date.getMonth()+3)/3);
		},
		milliseconds:function(){
			return date.getMilliseconds();//获得时间的毫秒
		},
		today:function(){
			return date.getFullYear()+"-"+DateUtil.month()+"-"+date.getDate();
		},
		now:function(){
			return date.getHours()+":"+date.getMinutes();
		},
		todayNow:function(){
			return DateUtil.today()+" "+DateUtil.now();
		},
		fullTodayNow:function(){
			return DateUtil.today()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
		},
		time:function(){
			return date.getTime();//获得现在距1970-1-1的毫秒数
		},
		//返回当月共多少天
		days:function(month,year){
			var monthExpr=/^(0?[[1-9]|1[0-2])$/;//匹配1-12月
			var yearExpr=/^[1-2][0-9][0-9][0-9]$/;//匹配1000-2999年
			if(month && year){
				if(monthExpr.exec(month) && yearExpr.exec(year)){
					return new Date(year,month,0).getDate();
				}else{
					alert("您输入的月份和年份不正确");
					return;
				}
			}
			if(month){
				if(monthExpr.exec(month)){
					return new Date(date.getFullYear(),month,0).getDate();
				}else{
					alert("您输入的月份不正确");
					return;
				}
			}
			return new Date(date.getFullYear(), (date.getMonth()+1), 0).getDate();
		},
		tomorrow:function(){
			if(DateUtil.days()>=DateUtil.day()+1){
				return DateUtil.year()+"-"+DateUtil.month()+"-"+eval(DateUtil.day()+1);
			}else{
				if(DateUtil.month()==12){
					return eval(DateUtil.year()+1)+"-"+1+"-"+1;
				}
				return DateUtil.year()+"-"+eval(DateUtil.month()+1)+"-"+1;
			}
		},
		plusDay:function(num){
			if(DateUtil.days()>=DateUtil.day()+num){
				return DateUtil.year()+"-"+DateUtil.month()+"-"+eval(DateUtil.day()+num);
			}else{
				if(DateUtil.month()==12){
					return eval(DateUtil.year()+num)+"-"+num+"-"+num;
				}
				return DateUtil.year()+"-"+eval(DateUtil.month()+num)+"-"+num;
			}
		},
		//格式化日期yyyy-MM-dd hh:mm:ss
		format:function(fmtDate,fmtType){
			var fmt="yyyy-MM-dd hh:mm:ss";
			if(fmtType){
				fmt=fmtType;
			}
			var y,M,d,h,m,s;
			
			if(fmtDate instanceof Date == true){
				y=fmtDate.getFullYear();
				M=fmtDate.getMonth() + 1;
				d=fmtDate.getDate();
				h=fmtDate.getHours();
				m=fmtDate.getMinutes();
				s=fmtDate.getSeconds();
			}
			//如果不是Date对象,就用另一种方法处理
			else{
				//匹配年月日yyyy-MM-dd或者yyyy.mm.dd或者yyyy/mm/dd
				var dateExpr=/([1-2][0-9][0-9][0-9])[\.\/-](0?[[1-9]|1[0-2])[\.\/-]([1-3][0-9]|0?[0-9])/
				var dateMatch=dateExpr.exec(fmtDate);
				if(!dateMatch || isNaN(dateMatch[1])  && isNaN(dateMatch[2]) && isNaN(dateMatch[3])){
					alert("您所要格式化的时期格式不正确");
					return;
				}
				y=dateMatch[1];
				M=dateMatch[2];
				d=dateMatch[3];
				h="00";
				m="00";
				s="00";
				
				//匹配时分hh:mm
				var timeExpr=/(0?[0-9]|[1-2][0-9]):([1-6][0-9]|0?[0-9])/
				var timeMatch=timeExpr.exec(fmtDate);
				if(timeMatch){
					h=timeMatch[1]?timeMatch[1]:"00";
					m=timeMatch[2]?timeMatch[2]:"00";
					s="00";
				}
				
				//匹配时分hh:mm:ss
				var tExpr=/(\d{2}|\d{1}):(\d{2}|\d{1}):(\d{2}|\d{1})/
				var tMatch=tExpr.exec(fmtDate);
				if(tMatch){
					h=tMatch[1]?tMatch[1]:"00";
					m=tMatch[2]?tMatch[2]:"00";
					s=tMatch[3]?tMatch[3]:"00";
				}
			}
			
			var dateExprs={
				"M+" :M,   
				"d+" :d,  
				"h+" :h,   
				"m+" :m,  
				"s+" :s
			};
			if(/(y+)/.test(fmt)){
				fmt=fmt.replace(RegExp.$1, (y+"").substr(4 - RegExp.$1.length));
			}
			for(var k in dateExprs){
				//"("+ k +")"=(M+)、(d+)、(h+)...
				if(new RegExp("("+ k +")").test(fmt)){
					fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (dateExprs[k]) : (("00"+ dateExprs[k]).substr((""+ dateExprs[k]).length)));   
				}
			}
			return fmt;
		},
		//时效性
		expires:function(cacheTime){
			var y=date.getFullYear();
			var M=date.getMonth() + 1;
			var d=date.getDate();
			var h=date.getHours();
			var m=date.getMinutes();
			var s=date.getSeconds();
			if(!cacheTime){
				alert("请传入合法的时效");
				return;
			}
			//当传入的是today，时效将保存到隔天0点0分
			if(cacheTime==="today"){
				d++;
				h=0;
				m=0;
				s=0;
			}
			//当传入的是数字，并且小于1，当作延长分钟
			if(!isNaN(cacheTime) && cacheTime<1){
				m+=Math.abs(Math.round(cacheTime*60));
				if(m>=60){
					m=m-60
					h+=1;
				}
			}
			//当传入的是数字，并且大于1，当作延长小时
			if(!isNaN(cacheTime) && cacheTime>=1){
				h+=Math.abs(Math.round(cacheTime));
			}
			if(typeof cacheTime==="object"){
				if(!isNaN(cacheTime.year) && eval(cacheTime.year+y)<=2999){
					y=cacheTime.year?cacheTime.year+y:y;
				}
				if(!isNaN(cacheTime.month) && eval(cacheTime.month+M)<=12){
					M=cacheTime.month?cacheTime.month+M:M;
				}
				if(!isNaN(cacheTime.day) && eval(cacheTime.day+d)<=DateUtil.days()){
					d=cacheTime.day?cacheTime.day+d:d;
				}
				if(!isNaN(cacheTime.hour) && eval(cacheTime.hour+h)<24){
					h=cacheTime.hour?cacheTime.hour+h:h;
				}
				if(!isNaN(cacheTime.minute) && eval(cacheTime.minute+m)<60){
					m=cacheTime.minute?cacheTime.minute+m:m;
				}
				if(!isNaN(cacheTime.second) && eval(cacheTime.second+s)<60){
					s=cacheTime.second?cacheTime.second+s:s;
				}
			}
			return y+"-"+M+"-"+d+" "+h+":"+m+":"+s;
		}
	};
}();/*!
 * 本地数据库
 * @version 1.0.0
 * @author WangMingzhu
 */

/**
 *  本地数据库
 * 
 *  @class DB
 */

var DB = function() {
    'use strict';

    function checkManifest() {
        window.addEventListener("updateready", function(e) {
            console.log("离线缓存状态：" + window.applicationCache.status);
            if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
                window.applicationCache.swapCache();
                if (confirm('发现此manifest文件有更新，是否更新？')) {
                    window.location.reload();
                }
            } else {
                console.log('manifest文件没有变化');
            }
        }, false);
    }

    function setCookie(key, value) {
        var Days = 30;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        document.cookie = key + "=" + escape(value) + ";expires=" + exp.toGMTString();
    }

    function getCookie(key) {
        var valExpr = new RegExp("(^| )" + key + "=([^;]*)(;|$)");
        var match = valExpr.exec(document.cookie);
        if (match && match[2]) {
            return unescape(match[2]);
        }
        return null;
    }

    function delCookie(key) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var val = getCookie(key);
        if (val != null) {
            document.cookie = key + "=" + val + ";expires=" + exp.toGMTString();
        }
    }

    var store = window.localStorage;
    var session = window.sessionStorage;
    if (!store) {
        doc.style.behavior = 'url(#default#userData)'; //保存表单的值
        //console.log("您当前的设备不支持本地数据库localstore");
    }
    return {
        //application cache
        checkManifest: checkManifest,
        /**
         * 保存数据
         * 
         * @method set
         * @param key //键
         * @param val //值
         * @return void
         */
        set: function(key, val) {
            if (store) {
                store.setItem(key, val);
            } else {
                setCookie(key, val);
            }
        },
        /**
         * 保存数据
         * 
         * @method get
         * @param key //键
         * @return string //返回您所存储的值
         */
        get: function(key) {
            if (store) {
                if (typeof key == "number") {
                    return store.key(key);
                }
                return store.getItem(key);
            } else {
                return getCookie(key);
            }
        },
        /**
         * 删除数据
         * 
         * @method del
         * @param key //根据键删除此项
         */
        del: function(key) {
            if (store) {
                store.removeItem(key);
            } else {
                delCookie(key);
            }
        },
        /**
         * 清空数据
         * 
         * @method clear
         * @return void
         */
        clear: function() {
            if (store) {
                return store.clear();
            } else {
                alert("抱歉，cookie不可以全部清空!");
            }
        },

        setSession: function(key, value) {
            session.setItem(key, value);
        },
        getSession: function(key) {
            if (typeof key == "number") {
                return session.key(key);
            }
            return session.getItem(key);
        },
        delSession: function(key) {
            session.removeItem(key);
        },
        clearSession: function() {
            session.clear();
        },
        /**
         * 根据请求名称获取值
         * 
         * @method getParameter
         * @param argName //参数名称
         * @return string
         */
        getParameter: function(argName){
            var param = location.search.match(new RegExp("[\?\&]" + argName + "=([^\&]*)(\&?)","i"));
            return param ? param[1] : param;
        }
    };
}();/*!
 * 设备信息
 * @version 1.0.0
 * @author WangMingzhu
 */

/**
*  获取设备信息
* 
*  @class Device
*/
(function(window,document,undefined){
	'use strict';
	window.Device=function(){
		var u=navigator.userAgent,app=navigator.appVersion;
		function isPc(){
			var userAgentInfo = navigator.userAgent;  
			var agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");  
			var flag = true;
			for (var i=0;i<agents.length;i++) {  
				if (u.indexOf(agents[i])>0){ 
					flag = false; break; 
				}
			}  
			return flag; 
		}
		return{
		    //四大内核
		    isTrident:u.indexOf('Trident') > -1,
		    isPresto:u.indexOf('Presto') > -1,
		    isWebKit:u.indexOf('AppleWebKit') > -1,
		    isGecko:u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
		    //设备判断
		    isMobile:!!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
		    isIPhone:u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
		    isIPad:u.indexOf('iPad') > -1, //是否iPad
		    isWebApp:u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
		    isPc:isPc(),//是否是PC端
		    //平台判断
		    isAndroid:u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
		    isIos:!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),//ios终端
		    //isWebview =u.toLowerCase().indexOf("webview") > -1,
		    //应用程序判断
			isWeixin:app.toLowerCase().indexOf("micromessenger") > -1,//判断是否是微信
			isUC:app.toLowerCase().indexOf("ucbrowser") > -1,//判断是否是UC
			isQQ:app.toLowerCase().indexOf("mqqbrowser") > -1,//判断是否是UC
		    language:(navigator.browserLanguage || navigator.language).toLowerCase(),
		    userAgent:u,
		    appVersion:app,
		    isOnline:window.navigator.online
	   }
	}();
})(window,document,undefined)(function(window,document,undefined){
    'use strict';
    /*=========================
      jquery|Dom7|zepto 扩展
      ===========================*/
    var $;
    if (typeof Dom7 === 'undefined') {
        $ = window.Dom7 || window.Zepto || window.jQuery;
    }
    else {
        $ = Dom7;
    }
    if (!$) return;
    /*=========================
      dialog
      ===========================*/
    var containerBox,mask;
    $.fn.extend({
        dialog:function(params){
            //设置参数
            var defaults={
                pos:"middle"
            };
            var params=params||{};
            for(var def in defaults){
                if(params[def]==undefined){
                    params[def]=defaults[def];
                }
            };
            //设置动画
            var hideAnimate={opacity:0};
            var showAnimate={opacity:1};
            switch(params.pos){
                case "middle":hideAnimate={opacity:0};showAnimate={opacity:1};break;
                case "top":hideAnimate={top:"-100%"};showAnimate={top:"0%"};break;
                case "bottom":hideAnimate={bottom:"-100%"};showAnimate={bottom:"0%"};break;
                case "left":hideAnimate={left:"-100%"};showAnimate={left:"0%"};break;
                case "right":hideAnimate={right:"-100%"};showAnimate={right:"0%"};break;
                default :params.pos="middle";hideAnimate={opacity:0};showAnimate={opacity:1};
            }
            var s=this;

            //生成外框
            if(!containerBox){
                containerBox=document.createElement("div");
                containerBox.setAttribute("class","popup");
                $(s).wrap(containerBox);
            }
            //生成遮罩
            if(!mask){
                mask=document.createElement("div");
                mask.setAttribute("class","popup-mask");
                $(s).parent().before(mask);
            }
            
            //隐藏遮罩与外框
            function hideMask(){
                $(mask).animate({opacity:0},"fast","linear",function(){
                    $(this).css("display","none");
                });
                mask.removeEventListener("click",hideMask,false);
                $(s).parent().animate(hideAnimate,"fast","linear");
            }
            //显示遮罩与外框
            function showMask(){
                //显示遮罩
                $(mask).css("display","block").animate({opacity:1},"fast","linear");
                //遮罩绑定点击事件
                mask.addEventListener("click",hideMask,false);

                //设置宽度
                var popw=$(s)[0].style.width;
                if(!popw){
                    popw="100%";
                }
                //初始化容器
                $(s).parent().removeAttr("style");
                $(s).parent().css(hideAnimate);
                $(s).parent().attr("data-pos",params.pos);
                //显示容器
                $(s).css("display","block");
                $(s).parent().animate(showAnimate,"fast","linear");
            }
            s.hideDialog=hideMask;
            s.showDialog=showMask;
            showMask();
            return s;
        }
    });

})(window,document,undefined);(function(window,document,undefined){
	'use strict'
	window.Dragrefresh=function(container,params){
		/*==================
		  Model
		  ==================*/
		var defaults={
			"refreshThreshold":50,
			"refreshThresholdMax":150,
			"refreshHideTop":-58,
			"duration":300,
			"overtime":5000

			/*callbacks
			onRefresh:function(Dragrefresh)
			onRefreshComplete:function(Dragrefresh)
			onRefreshOvertime:function(Dragrefresh)
			*/	
		}
		params=params||{};
		for(var def in defaults){
			if(params[def]===undefined){
				params[def]=defaults[def];
			}
		}
		var s=this;
		s.params=params;
		s.container=container==document.body?document.body:document.querySelector(container);

		/*==================
		  View Refresh
		  ==================*/
		s.createRefresh=function(){
			s.refreshEl=document.createElement("div");
			s.refreshEl.setAttribute("class","dragrefresh icon-refresh");
			s.container.appendChild(s.refreshEl);
		};
		s.hideRefresh=function(){
			s.transition();
			s.touches.posY=s.params.refreshHideTop;
			s.refreshEl.style.top=s.touches.posY+"px";
		};
		s.preventDefault = function (e) {
			e.preventDefault();
        };
        s.addPreventDefault = function (e) {
			document.addEventListener("touchmove",s.preventDefault,false);
        };
        s.removePreventDefault = function (e) {
			document.removeEventListener("touchmove",s.preventDefault,false);
        };
		/*==================
		  Refresh Animate
		  ==================*/
		s.transition=function(){
			s.refreshEl.style.transition=s.params.duration+"ms";
		};
		s.cancelTransition=function(){
			s.refreshEl.style.transition="0ms";
		};

		s.spinner=function(){
			s.rotate+=10;
			if(s.rotate>=360){
				s.rotate=0;
			}
			s.refreshEl.style.transform="rotate("+s.rotate+"deg)";
			s.rAf=s.requestAnimationFrame(s.spinner);
		};
		s.cancelSpinner=function(){
			s.cancelAnimationFrame(s.rAf);
		};

		//View
		s.view=function(){
			s.createRefresh();
		};

		//Controller
		/*==================
		  Callback onRefresh
		  ==================*/
		s.refresh=function(){
			s.transition();
			s.refreshEl.style.top=s.params.refreshThreshold+"px";
			setTimeout(function(){
				s.cancelTransition();
				s.spinner();
			}, s.params.duration);
			//callback onRefresh
			if(s.params.onRefresh){
				s.params.onRefresh(s);
			}
			//callback onOvertime
			if(s.params.onRefreshOvertime){
				s.refreshOvertime();
			}
		};
		/*==================
		  Callback onRefreshComplete
		  ==================*/
		s.refreshComplete=function(){
			s.cancelOvertime();
			s.cancelSpinner();
			s.hideRefresh();
			s.attach();
			//callback onRefreshComplete
			if(s.params.onRefreshComplete){
				s.params.onRefreshComplete(s);
			}
		}
		/*==================
		  Callback onRefreshOvertime
		  ==================*/
		s.refreshOvertime=function(){
			//callback onRefreshComplete
			s.overtime=setTimeout(function(){
				s.cancelSpinner();
				s.hideRefresh();
				s.attach();
				s.params.onRefreshOvertime(s);
			}, s.params.overtime);
		};
		s.cancelOvertime=function(){
			if(s.overtime)window.clearTimeout(s.overtime);
		};
		
		//事件管理
		var touchEvents={
			"start":"touchstart",
			"move":"touchmove",
			"end":"touchend"
		}
		s.events=function(detach){
			var touchTarget=s.container;
			var action=detach?"removeEventListener":"addEventListener";
			touchTarget[action](touchEvents.start,s.onTouchstart,false);
			touchTarget[action](touchEvents.move,s.onTouchmove,false);
			touchTarget[action](touchEvents.end,s.onTouchend,false);
		}
		//attach、detach事件
		s.attach=function(attachEvent){
			if(!attachEvent){
				s.events();
				return;
			}
			if(attachEvent=="start"){
				s.container["addEventListener"](touchEvents.start,s.onTouchstart,false);
			}
			if(attachEvent=="move"){
				s.container["addEventListener"](touchEvents.move,s.onTouchmove,false);
			}
			if(attachEvent=="end"){
				s.container["addEventListener"](touchEvents.end,s.onTouchend,false);
			}
		};
		s.detach=function(detachEvent){
			if(!detachEvent){
				s.events(true);
				return;
			}
			if(detachEvent=="start"){
				s.container["removeEventListener"](touchEvents.start,s.onTouchstart,false);
			}
			if(detachEvent=="move"){
				s.container["removeEventListener"](touchEvents.move,s.onTouchmove,false);
			}
			if(detachEvent=="end"){
				s.container["removeEventListener"](touchEvents.end,s.onTouchend,false);
			}
		};
		//Touch信息
        s.touches={
        	isTop:true,
        	startX:0,
        	startY:0,
        	currentX:0,
        	currentY:0,
        	endX:0,
        	endY:0,
        	diff:0,
        	posY:0
        };
		s.onTouchstart=function(e){
			//如果不在顶部，则不触发
			if(s.container.scrollTop>0){
				s.touches.isTop=false;
			}else{
				s.touches.isTop=true;
			}
			s.cancelTransition();
			s.touches.startX=e.touches[0].clientX;
			s.touches.startY=e.touches[0].clientY;
		};
		s.onTouchmove=function(e){
			s.touches.currentX=e.touches[0].clientX;
			s.touches.currentY=e.touches[0].clientY;
			s.touches.diff=s.touches.currentY-s.touches.startY;
			var diffX=s.touches.startX-s.touches.currentX;
			//判断头部、横向滚动、向上滚动，则不下拉刷新
			if(!s.touches.isTop || Math.abs(diffX) > Math.abs(s.touches.diff) || s.touches.diff<0){
				return;
			}
			s.addPreventDefault();
			s.touches.posY=s.params.refreshHideTop+s.touches.diff;
			if(s.touches.posY<s.params.refreshThresholdMax){
				s.rotate=s.touches.posY*2;
				s.refreshEl.style.transform="rotate("+s.rotate+"deg)";
				s.refreshEl.style.top=s.touches.posY+"px";
			}
		};
		s.onTouchend=function(e){
			s.removePreventDefault();
			//如果小于hold值，则收起刷新
			if(s.touches.posY<s.params.refreshThreshold){
				s.hideRefresh();
				return;
			}
			//刷新
			s.refresh();
			//移动事件绑定，否则会在刷新过程中重新触发下拉刷新
			s.detach();
		};
		
		//主函数
		s.init=function(){
			s.view();
			s.attach();
		};

		s.init();
	};
	Dragrefresh.prototype={
		scrollTop:(function(){
			 return document.body.scrollTop;
		})(),
		requestAnimationFrame:function(callback){
			var rAF = window.requestAnimationFrame	||
			window.webkitRequestAnimationFrame	||
			window.mozRequestAnimationFrame		||
			window.oRequestAnimationFrame		||
			window.msRequestAnimationFrame		||
			function (callback) { window.setTimeout(callback, 1000 / 60); };
			var r=rAF(callback);
			return r;
		},
		cancelAnimationFrame:function(handler){
			var cAF = window.cancelAnimationFrame	||
			window.webkitCancelAnimationFrame	||
			window.mozCancelAnimationFrame		||
			window.oCancelAnimationFrame		||
			window.msCancelAnimationFrame		||
			function (handler) { window.clearTimeout(handler); };
			cAF(handler);
		},
	}
})(window,document,undefined)/*!
 * 事件函数库
 * @version 1.0.0
 * @author WangMingzhu
 */

/**
*  事件函数库，兼容性强
* 
*  @class EventUtil
*/
(function(window,document,undefined){
	'use strict';
	function _swipe_(element,type,handler){
		var xDown, yDown,xUp,yUp,xDiff,yDiff;
		element.addEventListener( 'touchstart', function( e ){
			var touches = e.touches[0];
			xDown = touches.clientX;
			yDown = touches.clientY;
		}, false);
		
		element.addEventListener( 'touchend', function( e ){
			var touches = e.changedTouches[0],
			xUp = touches.clientX,
			yUp = touches.clientY;
			xDiff=xDown - xUp;
			yDiff=yDown - yUp;
			//单击事件
			if( Math.abs(xDown - xUp) < 6 && Math.abs(yDown - yUp) < 6 ){
				if(type==="tap"){
					handler(e);
				}
				return "tap";
			}
			//上下滑动
			if(Math.abs(yDiff)>Math.abs(xDiff)){
				if(yDiff>0){
					if(type==="swipeup"){
						handler(e);
					}
					return "swipeup";
				}
				
				if(type==="swipedown"){
					handler(e);
				}
				return "swipedown";
			}
			//左右滑动
			if(xDiff>0){
				if(type==="swipeleft"){
					handler(e);
				}
				return "swipeleft";
			}
			if(type==="swiperight"){
				handler(e);
			}
			return "swiperight";
		}, false );
	}
	var EventUtil = {
		/**
		 * 绑定事件
		 * 
		 * @method addHandler
		 * @param element //元素对象
		 * @param type //事件类型
		 * @param handler //响应函数
		 * @return void
		 */
		callback:function(fun,event){
			fun(event);
		},
		addHandler:function (element, type, handler) {
			//tap、swipeleft、swiperight、swipedown、swipeup
			if(type==="tap" || type==="swipeleft" ||  type==="swiperight" ||  type==="swipedown" ||  type==="swipeup"){
				_swipe_(element,type,handler);
				return;
			}
			//animationend
			if(type.toLowerCase()==="animationend"){
				if (element.addEventListener) {
					element.addEventListener(type, handler, false);
				}else if(element.attachEvent){
					element.attachEvent(type, handler);
				}
				//"webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", handler, false
				return;
			}
			//TransitionEnd
			if(type.toLowerCase()==="transitionend"){
				if (element.addEventListener) {
					element.addEventListener(type, handler, false);
				}else if(element.attachEvent){
					element.attachEvent(type, handler);
				}
				//"webkitTransitionEnd mozTransitionEnd MSTransitionEnd otransitionend transitionend", handler, false
				return;
			}
			//oninput
			if(type.toLowerCase()==="input" || type.toLowerCase()==="propertychange"){
				type="input";
				if(element.attachEvent){
					type="propertychange";
				}
			}
			//系统事件
			if (element.addEventListener) {
				element.addEventListener(type, handler, false);
			} else if (element.attachEvent) {
				element.attachEvent("on" + type, handler);
			} else {
				element["on" + type] = handler;
			}
		},
		removeHandler:function(element, type, handler) {
			if (element.removeEventListener) {
				element.removeEventListener(type, handler, false);
			} else if (element.detachEvent) {
				element.detachEvent("on" + type, handler);
			} else {
				element["on" + type] = null;
			}
		},
		preventDefault:function (e) {
			if (e.preventDefault) {
				e.preventDefault();
			} else {
				e.returnValue = false;
			}
		},
		stopPropagation:function(e){
			if(e.stopPropagation){
				e.stopPropagation();
			}else{
				e.cancelBubble=true;
			}
		},
		event:function(e){
			return e?e:window.e;
		},
		type:function(e){
			return e.type;
		},
		target:function(e){
			return e.target || e.srcElement;
		}
	};
	window.EventUtil=EventUtil;
})(window,document,undefined)/*!
 * 表情工具库
 * @version 1.0.0
 * @author WangMingzhu
 */

(function(window,document,undefined){
	'use strict';
	window.Face={
		icons:{
			"[拜拜]":"baibai.png",
			"[发呆]":"fadai.png",
			"[坏笑]":"huaixiao.png",
			"[流汗]":"liuhan.png",
			"[呕吐]":"outu.png",
			"[微笑]":"weixiao.png",
			"[晕]":"yun.png",
			"[眨眼]":"zhayan.png",
			"[龀牙]":"ziya.png",
		},
		parse:function(str,src){
			var parseSrc=src||"../assets/css/img/face/";
			var parseStr=str;
			var faceExpr=/(\[[\u4E00-\u9FA5]*\])/gm;
			var result;
			while((result=faceExpr.exec(parseStr))!=null){
				if(Face.icons[result[0]]){
					var facesrc=Face.icons[result[0]];
					parseStr=parseStr.replace(result[0],"<img src='"+parseSrc+facesrc+"'/>");
				}
			}
			return parseStr;
		}
	}
})(window,document,undefined);/*!
 * form表单类库
 * @version 1.0.0
 * @author WangMingzhu
 *
 * @requie datatype.js
 * @requie jquery.js
 */

/**
*  表单序列化
* 
*  @class Form
*/
(function(window,document,undefined){
	'use strict';
	window.Form=function(container){
		/*================
		Model
		================*/
		var s=this;
		s.container=document.querySelector(container);
		s.formElements=[];//表单元素
		s.getFormElements=function(){
			//获取有效的表单元素
			for(var i=0;i<s.container.elements.length;i++){
				var field=s.container.elements[i];
				//过滤没有name的表单元素
				if(!field.type || !field.name){
					continue;
				}
				//过滤button、reset、submit
				if(field.type=="button" || field.type=="reset" || field.type=="submit"){
					continue;
				}
				//过滤未选中的checkbox和radio
				if(field.type=="radio" || field.type=="checkbox"){
					if(!field.checked){
						continue;
					}
				}
				//push到数组里
				s.formElements.push(field);
			}
		};
		//表单控件初始化(主要是针对小眼睛和开关控件)
		s.initFormControl=function(){
			//开关控件点击
			$(".switch").click(function(){
				$(this).toggleClass("active");
			});
			//密码控件点击小眼睛
			$("[type=password] + i").click(function(){
				if($(this).hasClass("active")){
					$(this).removeClass("active");
					$(this).parent().find("input[type]").attr("type","password");
				}else{
					$(this).parent().find("input[type]").attr("type","text");
					$(this).addClass("active");
				}
				$(this).parent().find("input[type]")[0].focus();
			});
			//带清空按钮
			$("input[data-clear='true']").on("input propertychange",function(){
				if($(this).val().length>0){
					$("+i",this).css({display:"block"});
				}else{
					$("+i",this).css({display:"none"});
				}
				$("+i",this).click(function(){
					$(this).css({display:"none"});
					$(this).prev().val("");
				});
			});
			//安全检测
			$(".safelvl").parent().find("[type=password]").on("input propertychange",function(){
				s.checkSafe($(this)[0],$(".safelvl")[0]);
			});
		};
		/*================
		Method
		================*/
		//表单序列化
		s.serialize=function(){
			var parts=[],field=null;
			for(var i=0;i<s.formElements.length;i++){
				field=s.formElements[i];
				//如果是多选框，则每个值单独一个条目
				if(field.type=="select-one" || field.type=="select-multiple"){
					for(var j=0;j<field.options.length;j++){
						var option=field.options[j];
						if(option.selected){
							parts.push(field.name+"="+option.value);
						}
					}
				}else{
					//push到数组里
					parts.push(field.name+"="+field.value);
				}
			}
			return parts.join("&");
		};
		//单个验证
		s.safelvl=0;//密码安全等级
		var ruleExpr = {
			"required":/^.+$/,//不能为空
			"username":/^[\w]*$/,//只能包括字母、数字和下划线
			"password":/^[0-9_a-zA-Z-~!@#$]*$/,//密码格式不正确
			"mail":/^(\w+@\w+\.[\.\w]+)?$/,//邮箱格式不正确
			"phone":/^([1][34578][0-9]{9})?$/,//手机号码输入不正确
			"chinese":/^[\u4E00-\u9FA5]*$///只能填写中文
		}
		s.rule=function(field){
			var ruleField=field.getAttribute("data-rule-field")||"";
			var rule=field.getAttribute("data-rule").split(" ");
			var value=field.value||"";
			var errorMsg=null;
			for(var i=0,rulename;rulename=rule[i++];){
				if(ruleExpr[rulename]){
					if(!ruleExpr[rulename].test(value)){
						errorMsg=ruleField+lang.rule[rulename];
						break;
					}
				}else if(rulename.indexOf("minlength")>=0){
					var minlength=rulename.split(":")[1];
					if(value.length<minlength){
						errorMsg=ruleField+lang.rule.minlength+ minlength +lang.rule.unit;
						break;
					}
				}else if(rulename.indexOf("maxlength")>=0){
					var maxlength=rulename.split(":")[1];
					if(value.length>maxlength){
						errorMsg=ruleField+lang.rule.maxlength+ maxlength +lang.rule.unit;
						break;
					}
				}else if(rulename.indexOf("compare")>=0){
					var compareElem=document.getElementsByName(rulename.split(":")[1])[0];
					
					if(compareElem && compareElem.value && compareElem.value!=value){
						errorMsg=lang.rule.twice+ruleField+lang.rule.compare;
						break;
					}
				}else if(rulename=="safelvl"){
					if(s.safelvl<3){
						errorMsg=ruleField+lang.rule[rulename];
						break;
					}
				}
			}
			return errorMsg;
		};
		//表单验证
		s.validate=function(){
			for(var i=0,field;field=s.formElements[i++];){
				if(!field.getAttribute("data-rule")){
					continue;
				}
				var errormsg=s.rule(field);
				if(errormsg){
					var t=new Toast(errormsg);
					t.show(function(s){s.destory();});
					t=null;
					field.focus();
					return false;
				}
			}
			return true;
		};
		//字符类型
	    s.charMode=function(iN){
	        if (iN>=48 && iN <=57) //数字    
	            return 1;
	        if (iN>=65 && iN <=90) //大写    
	            return 2;
	        if (iN>=97 && iN <=122) //小写    
	            return 4;
	        else
	            return 8;
	    }
	    //计算密码模式
	    s.pwdLvl=function(num){
	        var lvl=0;
	        for (var i=0;i<4;i++){
	            if (num & 1) lvl++;
	            num>>>=1;
	        }
	        return lvl;
	    }
		//密码强度检测
		s.checkSafe=function(pwdField,lvlField){
	    	var val=pwdField.value;
	    	if(val.length<=0){
        		lvlField.className=lvlField.className.replace(/lvl[0-3]/,"lvl0");
        		return;
        	}
	        var mode=0;
	        for (var i=0;i<val.length;i++){
	            mode|=s.charMode(val.charCodeAt(i));
	        }
	        s.safelvl=s.pwdLvl(mode);
	        if(lvlField){
	        	lvlField.className=lvlField.className.replace(/lvl[0-3]/,"lvl"+s.safelvl);
	        }
	    };
	    /*================
		Controller
		================*/
		s.init=function(){
			s.getFormElements();
			s.initFormControl();
		};
		s.init();
	}
})(window,document,undefined)/*!
 * 可视化数据
 * @version 1.0.0
 * @author WangMingzhu
 */

/**
*  仪表盘
* 
*  @class gauge
*/
(function(window,document,undefined){
	'use strict';
	window.Gauge=function(container,params){
		/*============
		  Model
		  ==============*/
		var defaults={
			minValue:0,
            maxValue:360,
            currentValue:0,

            //dom
            point:".gauge-pointer",
            wave:".gauge-wave",
            val:".gauge-text",

            //animate
            durationall:2000
		}
		for(var def in defaults){
			if(params[def]==undefined){
				params[def]=defaults[def];
			}
		}
		var s=this;
		s.params=params;
		s.container=document.querySelector(container);//容器
		s.point=s.container.querySelector(s.params.point);//指针
		s.wave=s.container.querySelector(s.params.wave)||null;//波浪
		s.val=s.container.querySelector(s.params.val);//指针值

		s.percent=(s.params.currentValue-s.params.minValue)/(s.params.maxValue-s.params.minValue);//当前值所占比例
		s.duration=Math.round(s.percent*s.params.durationall);//执行时间长度
		s.bgLvl=Math.round(s.percent*10)+1;//背景等级
		if(s.bgLvl<1){
			s.bgLvl=1;
		}
		if(s.bgLvl>10){
			s.bgLvl=10;
		}
		s.pointRotate=eval(270*s.percent);//指针旋转角度
		if(s.pointRotate>270){
			s.pointRotate=270;
			s.burst=s.params.currentValue-s.params.maxValue;//爆表值
			console.log("已爆表");
		}
		/*============
		  View
		  ==============*/
		//旋转指针
		s.updatePoint=function(){
			s.point.setAttribute("style","-webkit-transform:rotate("+s.pointRotate+"deg);-webkit-transition:all "+s.duration+"ms");
		}
		//设置数字
		s.updateVal=function(){
			s.val.innerHTML=s.params.currentValue;
		}
		//更改背景色
		s.updateBg=function(){
			var bgExpr=/bg[1-9]0?$/g;
			if(bgExpr.test(s.container.className)){
				s.container.className=s.container.className.replace(bgExpr,"bg"+s.bgLvl);
			}else{
				s.container.className+=" bg"+s.bgLvl;
			}
			s.container.setAttribute("style","-webkit-animation-duration:"+s.duration+"s;animation-duration:"+s.duration+"ms;");
		}
		//设置波浪
		s.updateWave=function(){
			if(!s.wave)return;
			var waveTop=100-Math.round(s.percent.toFixed(1)*100);
			if(waveTop<0){
				waveTop=0;
			}
			s.wave.setAttribute("style","top:"+waveTop+"%;-webkit-transition:all "+s.duration+"ms");
		}
		s.view=function(){
			s.updateBg();
			s.updatePoint();
			s.updateVal();
			//s.updateWave();
		}
		/*============
		  Controller
		  ==============*/
		s.view();
	}
})(window,document,undefined);/*!
 * 多媒体控件
 * @version 1.0.0
 * @author WangMingzhu
 */

/**
*  系统多媒体控件api
* 
*  @class Media
*  @constructor
*  @param media //video dom 或者 audio src(用于播放背景音乐)
*/
(function(window,document,undefined){
	'use strict';
	window.Media=function(media){
		/*===========================
	    Model
	    ===========================*/
		var s=this;
		s.media=document.querySelector(media)||new Audio(media);
		/*===========================
	    Method
	    ===========================*/
	    s.playAudio=function(loop){
			s.media.autoplay = true;
			s.media.loop = loop || false;
			s.media.play();
			return s;
		};
	    //判断视频加载状态
	    s.isReady=function(){
	    	if(s.media.readyState!=4){
				console.log("视频尚未加载完成，状态："+s.media.readyState);
				return false;
			}
			return true;
	    };
		//暂停与播放
		s.resume=function(){
			if(s.media.paused){
				s.media.play();
				return false;
			}else{
				s.media.pause();
				return true;
			}
		};
		//全屏与非全屏，w3c推荐标准，但尚未兼容
		s.fullScreen=function(){
			if(s.media.requestFullscreen){
				s.media.exitFullscreen();
				return false;
			}else{
				s.media.requestFullscreen();
				return true;
			}
		};
		//播放时间
		s.durationTime=function(){
			if(!s.isReady)return;
			if(arguments.length>0){
				s.media.duration=arguments[0];
			}
			return s.media.duration;
		};
		//当前时间
		s.currentTime=function(){
			if(!s.isReady)return;
			if(arguments.length>0){
				s.media.currentTime=arguments[0];
			}
			return s.media.currentTime;
		};
		//音量，值为0.0到1.0
		s.volume=function(){
			if(arguments.length>0){
				s.media.volume=arguments[0];
			}
			return s.media.volume;
		};
		//音量值大小
		s.volumeLvl=function(){
			var volnumber=s.media.volume;
			if(volnumber==0){
				return 0;
			}else if(volnumber>0 && volnumber<0.3){
				return 1;
			}else if(volnumber>0.3 && volnumber<0.6){
				return 2;
			}else if(volnumber>0.6 && volnumber<0.9){
				return 3;
			}else{
				return 4;
			}
		};
		//设置播放速度，默认为1.0秒
		s.rate=function(){
			if(arguments){
				s.media.defaultPlaybackRate=arguments[0];
			}
			return s.media.defaultPlaybackRate;
		};
		
		//是否支持此视频
		s.isSupport=function(mediaPostfix){
			var maybeMedia="";
			var probablyMedia="";
			switch(mediaPostfix){
				//音频
				case "aac":maybeMedia="audio/mp4",probablyMedia="audio/mp4; codecs=\"mp4a.40.2\"";break;
				case "mp3":maybeMedia="audio/mpeg",probablyMedia="audio/mpeg";break;
				case "vorbis":maybeMedia="audio/ogg",probablyMedia="audio/ogg; codecs=\"vorbis\"";break;//后缀通常为ogg
				case "wav":maybeMedia="audio/wav",probablyMedia="audio/wav; codecs=\"1\"";break;
				//视频
				case "h.264":maybeMedia="video/mp4",probablyMedia="video/mp4; codecs=\"avc1.42E01E, mp4a.40.2\"";break;//后缀通常为mpg4、mp4、mov
				case "theora":maybeMedia="video/ogg",probablyMedia="video/ogg; codecs=\"theora\"";break;//后缀通常为ogg
				case "webm":maybeMedia="video/webm",probablyMedia="video/webm; codecs=\"vp8, vorbis\"";break;//后缀通常为webm
			}
			if(maybeMedia!="" && probablyMedia!="" && (player.canPlayType(maybeMedia) || player.canPlayType(probablyMedia))){
				return true;
			}
			return false;
		};
		/*===========================
	    Events
	    ===========================*/
	    var event=function(eventname,fn,detach){
			var action=detach?"removeEventListener":"addEventListener";
			s.media[action](eventname,fn,false);
		}
		//因为没有数据不能播放，readyState值为0
		s.onDataunavailable=function(callback,detach){
			event("dataunavailable",callback,detach);
		};
		//当前帧已下载完成，readyState值为1
		s.onCanshowcurrentframe=function(callback,detach){
			event("canshowcurrentframe",callback,detach);
		};
		//可以播放时，readyState值为2
		s.onCanplay=function(callback,detach){
			event("canplay",callback,detach);
		};
		//播放可继续，而且应该不会中断，readyState值为3
		s.onCanplaythrough=function(callback,detach){
			event("canplaythrough",callback,detach);
		};
		//所有媒体已加载完成，load有可能会被废弃，建议使用canplaythrough
		s.onLoad=function(callback,detach){
			event("load",callback,detach);
		};
		//媒体的第一帧已加载完成
		s.onLoadeddata=function(callback,detach){
			event("loadeddata",callback,detach);
		};
		//媒体的元数据已加载完成
		s.onLoadedmetadata=function(callback,detach){
			event("loadedmetadata",callback,detach);
		};
		//下载已开始
		s.onLoadstart=function(callback,detach){
			event("loadstart",callback,detach);
		};
		//正在下载
		s.onProgress=function(callback,detach){
			event("progress",callback,detach);
		};
		//下载中断
		s.onAbort=function(callback,detach){
			event("abort",callback,detach);
		};
		//浏览器尝试下载，但未接收到数据
		s.onStalled=function(callback,detach){
			event("stalled",callback,detach);
		};
		//下载发生网络错误
		s.onError=function(callback,detach){
			event("error",callback,detach);
		};
		//网络连接关闭
		s.onEmptied=function(callback,detach){
			event("emptied",callback,detach);
		};
		//发生错误阻止了媒体下载
		s.onEmpty=function(callback,detach){
			event("empty",callback,detach);
		};
		//准备播放
		s.onPlay=function(callback,detach){
			event("play",callback,detach);
		};
		//正在播放
		s.onPlaying=function(callback,detach){
			event("playing",callback,detach);
		};
		//当前时间被不合理或意外的方式更新
		s.onTimeupdate=function(callback,detach){
			event("timeupdate",callback,detach);
		};
		//暂停
		s.onPause=function(callback,detach){
			event("pause",callback,detach);
		};
		//播放暂停，等待下载更多数据
		s.onWaiting=function(callback,detach){
			event("pause",callback,detach);
		};
		//媒体已播放至末尾，播放停止
		s.onEnded=function(callback,detach){
			event("ended",callback,detach);
		};
		//更改音量事件
		s.onVolumechange=function(callback,detach){
			event("volumechange",callback,detach);
		};
		//更改播放速度事件
		s.onRatechange=function(callback,detach){
			event("ratechange",callback,detach);
		};
		//搜索结束
		s.onSeeked=function(callback,detach){
			event("seeked",callback,detach);
		};
		//正在移动到新位置
		s.onSeeking=function(callback,detach){
			event("seeking",callback,detach);
		};
	};
})(window,document,undefined)/*!
*	富文本编辑
*	@version 1.0.0
*	@author WangMingzhu
*/

/**
*  富文本编辑，主要用于编辑模式框（contenteditable="true"）或者 iFrame富文本框，背景色、加粗、链接、插入图片等功能
* 
*  @class RichEditor
*/
var Richeditor={
	//获取选区
	selection:function(){
		return document.getSelection();
	},
	//获取文本框光标位置
	getTxtCusorPos:function(txt){
		var cusorPos=-1;
		//非ie
		if(txt.selectionStart){//非IE浏览器
			cusorPos= txt.selectionStart;
			return cusorPos;
		}
		//讨厌的ie
		if(document.selection && document.selection.createRange){
			var range = document.selection.createRange();
			range.moveStart("character",-txt.value.length);
			cusorPos=range.text.length;
			return cusorPos;
		}
	},
	//获取光标位置
	getDivCusorPos:function(){
		var cusorPos = 0;// 光标位置
		//非ie
		if(window.getSelection){
			var selection=window.getSelection();
			//选中区域的“起点”
			/*console.log(selection.anchorNode);
			//选中区域的“结束点”
			console.log(selection.focusNode);
			//“结束点”的偏移量
			console.log(selection.focusOffset);
			//判断是否有选中区域
			console.log(selection.isCollapsed);
			//一般一个页面只有一个range，也有可能是多个range(使用Ctrl健进行多选)
			console.log(selection.rangeCount);*/
			
			//“起点”的偏移量
			cusorPos=selection.anchorOffset;
			return cusorPos;
		}
		//讨厌的ie
		if(document.selection && document.selection.createRange){
			var range = document.selection.createRange();
			var srcele = range.parentElement();
			var copy = document.body.createTextRange();
			copy.moveToElementText(srcele);
			for (cusorPos = 0; copy.compareEndPoints("StartToStart", range) < 0; cusorPos++) {
				copy.moveStart("character", 1);
			}
			return cusorPos;
		}
	},
	//只支持高级浏览器
	selectionPos:function(classname){
		var selection=window.getSelection();
		var cursorOffset=0;
		document.onselectionchange=function(e){
			if(e.target.activeElement.className==classname){
				cursorOffset=selection.anchorOffset;
			}
		}
		return cursorOffset;
	},
	/**
	 * 确定命令是否已经激活
	 * 
	 * @method isenable
	 * @param commandName (命令名称，如：backcolor)
	 * @return boolean
	 */
	isenable:function(commandName){
		return document.queryCommandEnabled(commandName);
	},
	backgroundcolor:function(color){
		document.execCommand("backcolor",false,color);
	},
	bold:function(){
		document.execCommand("bold",false,null);
	},
	italic:function(){
		document.execCommand("italic",false,null);
	},
	underline:function(){
		document.execCommand("underline",false,null);
	},
	copy:function(){
		document.execCommand("copy",false,null);
	},
	selectall:function(){
		document.execCommand("selectall",false,null);
	},
	cut:function(){
		document.execCommand("cut",false,null);
	},
	paste:function(){
		document.execCommand("paste",false,null);
	},
	del:function(){
		document.execCommand("delete",false,null);
	},
	link:function(url){
		document.execCommand("createlink",false,url);
	},
	unlink:function(){
		document.execCommand("unlink",false,null);
	},
	fontname:function(fontName){
		document.execCommand("fontname",false,fontName);
	},
	fontsize:function(fontSize){
		if(fontSize){
			document.execCommand("fontsize",false,fontSize);
			return;
		}
		return document.queryCommandValue("fontsize");
	},
	fontcolor:function(fontColor){
		document.execCommand("forecolor",false,fontColor);
	},
	format:function(tag){
		document.execCommand("formatblock",false,tag);
	},
	unformat:function(){
		document.execCommand("removeformat",false,null);
	},
	indent:function(){
		document.execCommand("indent",false,null);
	},
	outdent:function(){
		document.execCommand("outdent",false,null);
	},
	hr:function(){
		document.execCommand("inserthorzizontalrule",false,null);
	},
	img:function(url){
		document.execCommand("insertimage",false,url);
	},
	ol:function(){
		document.execCommand("insertorderedlist",false,null);
	},
	ul:function(){
		document.execCommand("insertunorderedlist",false,null);
	},
	p:function(){
		document.execCommand("insertparagraph",false,null);
	},
	center:function(){
		document.execCommand("justifycenter",false,null);
	},
	left:function(){
		document.execCommand("justifyleft",false,null);
	},
	right:function(){
		document.execCommand("justifyright",false,null);
	},
	/**
	 * 富文本带表情编辑框，解决ios软键盘覆盖fixed的问题
	 *
	 * @method richText
	 * 
	 * @return void
	 */
	richEdit:function(selector){
		var richEdit=document.querySelector(selector);
		var mask=document.querySelector(selector+"+.mask");
		var facebox=richEdit.querySelector(".face");
		var textarea=richEdit.querySelector("textarea");
		var relTextarea=richEdit.querySelector("pre");
		var relTextareaFont=relTextarea.querySelector("span");
		relTextarea.style.width=textarea.clientWidth+"px";
		textarea.style.height=relTextarea.clientHeight+"px";
		//遮罩层添加点击事件
		mask.addEventListener("click",function(e){
			richEdit.className=richEdit.className.replace(/\s{1,}active/,"");
			textarea.blur();
		},false);
		//获得光标位置
		var cursorOffset=0;
		document.onselectionchange=function(e){
			if(Object.prototype.toString.call(e.target.activeElement)=="[object HTMLTextAreaElement]"){
				//计算textarea高度
				relTextareaFont.innerText=textarea.value;
				textarea.style.height=relTextarea.clientHeight+"px";
				//获得光标位置
				cursorOffset=textarea.selectionStart;
			}
		}
		textarea.addEventListener("input",function(e){
			//计算textarea高度
			relTextareaFont.innerText=textarea.value;
			textarea.style.height=relTextarea.clientHeight+"px";
			//获得光标位置
			cursorOffset=textarea.selectionStart;
		},false);
		//点击input框
		textarea.addEventListener("click",function(e){
			richEdit.className=richEdit.className+" active";
		},false);
		var self=this;
		//点击表情
		facebox.addEventListener("click",function(e){
			if(e.target.getAttribute("data-face")){
				insertFace(e.target);
			}
			textarea.focus();
			self.setCaretPosition(textarea,cursorOffset);
		},false);

		//插入表情
		function insertFace(objFace){
			var faceName=objFace.getAttribute("data-face");
			var faceSrc=objFace.getAttribute("data-face-src");
			var editText=textarea.value;
			var editTextBefore=editText.substr(0,cursorOffset);
			var editTextAfter=editText.substr(cursorOffset,editText.length);
			var editTextInsert=faceName;
			cursorOffset=cursorOffset+faceName.length;
			textarea.value=editTextBefore+editTextInsert+editTextAfter;
		}
	},
	//设置光标位置
	setCaretPosition:function(elem, caretPos) {
	    if(elem != null) {
	        if(elem.createTextRange) {
	            var range = elem.createTextRange();
	            range.move('character', caretPos);
	            range.select();
	        }
	        else {
	            if(elem.selectionStart) {
	                elem.focus();
	                elem.setSelectionRange(caretPos, caretPos);
	            }
	            else
	                elem.focus();
	        }
	    }
	},
	isEnter:function(){
		//监听键盘输入
		EventUtil.addHandler(window,"keydown",function(e){
			keynum = e.which || e.keyCode;
			if(keynum=="13"){
				return true;
			}
			return false;
		})
	},
	queryInput:function(queryExtend,queryCollapse){
		var winHeight=window.innerHeight,currentWinHeight=window.innerHeight;
		var listenerInput;//监听输入框
		listenerInput=setInterval(function(e){
			currentWinHeight=window.innerHeight;
			//获得输入法高度
			if(DB.get("queryInputHeight") && DB.get("queryInputHeight")>0){
				console.log("读取数据库queryInputHeight:"+DB.get("inputHeight"));
				this.inputHeight=DB.get("queryInputHeight");
				clearInterval(listenerInput);
			}else{
				this.inputHeight=winHeight-currentWinHeight;
				console.log("注入数据库queryInputHeight:"+inputHeight);
				DB.set("queryInputHeight",inputHeight);
			}
			//判断输入法是否收缩
			if(winHeight==currentWinHeight){
				if(queryCollapse){
					queryCollapse.call(this,e);
				}
				clearInterval(listenerInput);
			}else{
				if(queryExtend){
					queryExtend.call(this,e);
				}
			}
		},500);
	},
}/*!
 * 社会化分享
 * @version 1.0.0
 * @author WangMingzhu
 */

/**
*  获取设备信息
* 
*  @class Share
*/
(function(window,document,undefined){
	'use strict';
	window.Share=function(params){
		/*===============
		Model
		================*/
		var s=this;
		var defaults={
			"href":window.location.href,
			"title":document.title || '',
			"desc":"",
			"imgUrl":"",
			"imgTitle":document.title || '',
			"from":window.location.host || "",
			"cusTxt":"请输入此时此刻想要分享的内容"
		};
		params=params||{};
		for(var def in defaults){
			if(params[def]==undefined){
				params[def]=defaults[def];
			}
		}
		s.params=params;

		/*===============
		Method
		================*/
		//uc分享
		var ucAppList = {
		        "tsina": ["kSinaWeibo", "SinaWeibo", "11", "新浪微博"],
		        "weixin": ["kWeixin", "WechatFriends", "1", "微信好友"],
		        "fweixin": ["kWeixinFriend", "WechatTimeline", "8", "微信朋友圈"],
		        "qq": ["kQQ", "QQ", "4", "QQ好友"],
		        /*"tqq": ["kQQWeibo", "QQWeibo", "11", "腾讯微博"],
		         * "qzone": ['kQZone', 'QZone', '3', 'QQ空间']*/
		};
		s.UCshare=function(toApp) {
			var to_app;
			if(Device.isIos){
				to_app=ucAppList[toApp][0];
				ucbrowser.web_share(s.params.title, s.params.title, s.params.href, to_app, "","@"+s.params.from, ''); 
			}else{
				to_app=ucAppList[toApp][1];
				ucweb.startRequest("shell.page_share", [s.params.title, s.params.title, s.params.href, to_app, "", "@"+s.params.from, ""]);  
			}
		};

		//html分享
		function popIFrame(openUrl){
			var tempDiv = document.createElement("div");
			tempDiv.style.visibility = "hidden";
			tempDiv.innerHTML = '<iframe src="' + openUrl + '" scrolling="no" width="1" height="1"></iframe>';
			document.body.appendChild(tempDiv);
			setTimeout(function () {
				tempDiv && tempDiv.parentNode && tempDiv.parentNode.removeChild(tempDiv);
			}, 5000);
		};
		s.HTMLShare=function(toApp){
			var openUrl=""
			if (toApp == "qzone") {
				if(Device.isMobile){
					openUrl= "mqqapi://share/to_qzone?src_type=web&version=1&file_type=news&req_type=1&image_url="+s.params.imgUrl+"&title="+s.params.title+"&description="+s.params.desc+"&url="+s.params.href+"&app_name="+s.params.from;
					popIFrame(openUrl);
					return;
				}
				openUrl="http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url="+s.params.href+"&amp;title="+s.params.title+"&amp;showcount=0&amp;summary="+s.params.desc+"&amp;pics="+s.params.imgUrl+"";
				window.open(openUrl);
				return;
			}
			if(toApp=="tsina"){
				openUrl="http://service.weibo.com/share/share.php?url="+s.params.href+"&language=zh_cn&title="+s.params.title+"&pic="+s.params.imgUrl+"&searchPic=true";
				window.open(openUrl);
				return;
			}
			if(toApp=="tqq"){
				openUrl=encodeURI("http://share.v.t.qq.com/index.php?c=share&a=index&title="+s.params.title+"&url="+s.params.href+"&appkey=ce15e084124446b9a612a5c29f82f080&site="+s.params.from+"&pic="+s.params.imgUrl);
				window.open(openUrl,"转播到腾讯微博");
				return;
			}
			if(toApp="qq"){
				openUrl="http://connect.qq.com/widget/shareqq/index.html?url="+s.params.href+"#0-sqq-1-85270-9737f6f9e09dfaf5d3fd14d775bfee85&title="+s.params.title+"&desc="+s.params.desc+"&summary=&site="+s.params.from+"&pics="+s.params.imgUrl;
				window.open(openUrl);
				return;
			}
		}

		/*===============
		Controller
		================*/
		s.toQzone=function(){
			s.HTMLShare("qzone");
		};
		s.toTsina=function(){
			if(Device.isUC){
				s.UCshare("tsina");
			}else{
				s.HTMLShare("tsina");
			}
		};
		s.toTqq=function(){
			s.HTMLShare("tqq");
		};
		s.toWeixin=function(){
			if(Device.isUC){
				s.UCshare("weixin");
			}else{
				alert("您当前的浏览器不支持分享到微信");
			}
		};
		s.toFWeixin=function(){
			if(Device.isUC){
				s.UCshare("fweixin");
			}else{
				alert("您当前的浏览器不支持分享到微信朋友圈");
			}
		};
		s.toQQ=function(){
			if(Device.isUC){
				s.UCshare("qq");
			}else{
				s.HTMLShare("qq");
			}
		};
	}
})(window,document,undefined)/*!
 * 单例模式
 * @version 1.0.0
 * @author WangMingzhu
 */

var getSingle=function(fn){
	var result;
	return function(){
		result=result || fn.apply(this,arguments);
	}
}(function(window,document,undefined){
	'use strict';
	window.Slider=function(container,params){
		//Model
		/*=========================
          Params
          ===========================*/
		var defaults={
			"pagination":null,
			"autoplay":false,
			"loop":false,
			"slidesPerView":1,
			"spaceBetween":10,

			//dom class
			"wrapperClass":"slider-wrapper",
			"slideClass":"slider-slide",
			"slideActiveClass":"active",
			"bulletClass":"bullet",
			"bulletActiveClass":"active"

			/*callbacks
			onInit:function(Slider)
			onSlideChangeStart:function(Slider)
			onSlideChangeEnd:function(Slider)
			*/
		}
		params=params||{};
		for(var def in defaults){
			if(params[def]===undefined){
				params[def]=defaults[def];
			}
		}
		//Slider
		var s=this;

		//Params
		s.params = params;

		//Container,Wrapper,Slides和Pagination
		s.container=document.querySelector(container);
		s.wrapper=document.querySelector(container+" > ."+s.params.wrapperClass);
		s.slide=document.querySelectorAll(container+" > ."+s.params.wrapperClass+" > ."+s.params.slideClass+"");
		if(s.slide.length<=0){
			return;
		}
		//Container width
		s.container.width=s.container.clientWidth;

		//View
		/*=========================
          Pagination
          ===========================*/
        s.updatePagination = function () {
            if (!s.params.pagination) return;
            s.pagination=document.querySelector(s.params.pagination);
			for(var bulletnum=0;bulletnum<s.slide.length;bulletnum++){
				var bullet=document.createElement("span");
				bullet.setAttribute("class",s.params.bulletClass);
				if(bulletnum==s.index){
					bullet.setAttribute("class",s.params.bulletClass+" "+s.params.bulletActiveClass);
				}
				s.pagination.appendChild(bullet);
			}
			s.bullet=s.pagination.querySelectorAll("."+s.params.bulletClass);
        };
        /*=========================
          Slides
          ===========================*/
		s.updateSlidesSize=function(){
			//Slide width
			s.width=Math.floor(s.container.width/s.params.slidesPerView);
			if(s.container.clientHeight<=0){
				setTimeout(function(){
					s.height=s.wrapper.clientHeight;
					s.container.style.height=s.height+"px";
				}, 50);
			}else{
				s.height=s.container.clientHeight;
			}
			s.wrapper.width=s.width*s.slide.length;
			s.wrapper.style.width=s.wrapper.width+"px";

			for(var i=0;i<s.slide.length;i++){
				s.slide[i].style.width=s.width+"px";
				s.slide[i].style.height=s.height+"px";
			}
		};
        /*=========================
          Classes
          ===========================*/
        s.updateClasses = function () {
        	//Slide
        	for(var i=0;i<s.slide.length;i++){
				s.slide[i].className=s.slide[i].className.replace(/\s{1,}active/,"");
			}
			s.slide[s.index].className+=" "+s.params.slideActiveClass;
			// Pagination
			if(s.bullet && s.bullet.length>0){
				for(var i=0;i<s.bullet.length;i++){
					s.bullet[i].className=s.bullet[i].className.replace(/\s{1,}active/,"");
				}
				s.bullet[s.index].className+=" "+s.params.bulletActiveClass;
			}
        };
        /*=========================
          Loop
          ===========================*/
        s.updateLoop = function () {
        	if(!s.params.loop)return;
        	/*var firstChild=s.slide[0].cloneNode(true);
        	var lastChild=s.slide[s.slide.length-1].cloneNode(true);
        	s.wrapper.appendChild(firstChild);
        	s.wrapper.insertBefore(lastChild,s.wrapper.childNodes[0]);
        	s.slide=document.querySelectorAll(container+" > ."+s.params.wrapperClass+" > ."+s.params.slideClass+"");*/
        };
        s.destroyLoop = function () {
            
        };
        s.view = function(){
    		s.updateSlidesSize();
    		s.updateLoop();
        	s.updatePagination();
        	s.updateClasses();
    		s.startAutoplay();
        };

        //Controller
		/*=========================
          Touch Events
          ===========================*/
		var touchEvents={
			"start":"touchstart",
			"move":"touchmove",
			"end":"touchend"
		}
		//绑定事件
		s.events=function(detach){
			var touchTarget=s.container;
			var action=detach?"removeEventListener":"addEventListener";
			touchTarget[action](touchEvents.start,s.onTouchstart,false);
			touchTarget[action](touchEvents.move,s.onTouchmove,false);
			touchTarget[action](touchEvents.end,s.onTouchend,false);
		}
		//attach、dettach事件
		s.attach=function(event){
			s.events();
		}
		s.detach=function(event){
			s.events(true);
		}
		/*=========================
          Touch Handler
          ===========================*/
        //Touch信息
        s.touches={
        	startX:0,
        	startY:0,
        	currentX:0,
        	currentY:0,
        	endX:0,
        	endY:0,
        	diff:0,
        	posX:0
        };
        //索引
        s.index=0;
        //Handler
		s.onTouchstart=function(e){
			s.touches.startX=e.touches[0].clientX;
			s.touches.startY=e.touches[0].clientY;
			e.stopPropagation();
			//关闭自动播放
			s.stopAutoplay();
			//runCallBacks
			if(s.params.onSlideChangeStart)s.params.onSlideChangeStart(s);
		};
		s.onTouchmove=function(e){
			s.touches.currentX=e.touches[0].clientX;
			s.touches.currentY=e.touches[0].clientY;
			s.touches.diff=s.touches.startX-s.touches.currentX;
			var diffY=s.touches.startY-s.touches.currentY;
			//判断是否是边缘
			var moveX=s.touches.posX-s.touches.diff;
			if((moveX>0 || moveX-s.container.width<-s.wrapper.width)&& !s.params.loop){
				return;
			}
			s.wrapper.style.left=moveX+"px";
			e.stopPropagation();
		};
		s.onTouchend=function(e){
			//判断拉动方向
			if(s.touches.diff/s.width>=0.5){
				//下一页
				s.index++;
			}else if(s.touches.diff/s.width<=-0.5){
				//上一页
				s.index--;
			}
			s.slideTo();
			e.stopPropagation();
			//开启自动播放
			s.startAutoplay();
		};
		/*=========================
          Autoplay
          ===========================*/
        s.startAutoplay = function () {
        	if(!s.params.autoplay)return;
			s.autoplayer=window.setInterval(function(){
				s.index++;
				if(s.index>=s.slide.length){
					s.index=0;
				}
				s.slideTo(s.index);
			},s.params["autoplay"]);
        };

        s.stopAutoplay = function (internal) {
        	if(s.autoplayer){
        		window.clearInterval(s.autoplayer);
        	}
        };

		/*=========================
          Method
          ===========================*/
        s.slideTo=function(slideIndex){
        	var duration="300";
        	if(slideIndex){
				s.index=slideIndex;
			}

			if(s.index<0){
				s.index=0;
			}
			if(s.index>s.slide.length-1){
				s.index=s.slide.length-1;
			}
			if(s.params.slidesPerView>1 && s.index>s.slide.length-params.slidesPerView && !s.params.loop){
				s.index=s.slide.length-s.params.slidesPerView;
			}
			s.touches.posX=-s.index*s.width;
			//更新class
			s.updateClasses();
			//移动至index
			s.wrapper.style.webkitTransitionDuration=duration+"ms";
			s.wrapper.style.left=s.touches.posX+"px";
			s.wrapper.addEventListener("transitionend",function(){
				this.style.webkitTransitionDuration="0ms";
				//runCallBacks
				if(s.params.onSlideChangeEnd)s.params.onSlideChangeEnd(s);
			},false);
        };

		//主函数
		s.init=function(){
			s.view();
			s.attach();
		}
		//执行主函数
		s.init();
	}
	Slider.prototype={
		preventHandler:function(e){
			e.preventDefault()
		},
		support:{
			touch:(function(){return 'ontouchstart' in window})(),
			animationend:(function(){return 'onanimationend' in window})(),
			transitionend:(function(){return 'transitionend' in window})(),
		}
	}
})(window,document,undefined)/*!
 * 卡片框
 * @version 1.0.0
 * @author WangMingzhu
 * @requie jquery.js
 */

/**
*  toast弹出框
* 
*  @class Actionsheet
*/
(function(window,document,undefined){
	'use strict';
	window.Toast=function(msg,params){
		/*================
		Model
		================*/
		var defaults={
			delay:1000
		}
		params=params||{};
		for(var def in defaults){
			if(params[def]==undefined){
				params[def]=defaults[def];
			}
		}
		var s=this;
		s.params=params;
		//开关动画
		s.hideAnimate={opacity:0};
		s.showAnimate={opacity:"1",bottom:"50px"};

		/*================
		Method
		================*/
		s.createContainer=function(){
			if(s.container)return;
			s.container=document.createElement("div");
			s.container.setAttribute("class","toast-box");
			s.toast=document.createElement("div");
			s.toast.setAttribute("class","toast");
			s.toast.innerHTML=msg;
			s.container.appendChild(s.toast);
			document.body.appendChild(s.container);
		}
		/*================
		Controller
		================*/
		s.setText=function(msg){
			s.toast.innerHTML=msg;
		};
		s.hide=function(fn){
			$(s.container).animate(s.hideAnimate,"fast","linear",function(){
				$(this).css({"display":"none","bottom":"-100%"});
				if(fn)fn(s);
			});
		};
		s.show=function(fn){
			clearTimeout(s.delay);
			if(s){
				$(s.container).css("display","block").animate(s.showAnimate,"fast","linear");
				s.delay=setTimeout(function(){
					s.hide(fn);
				},s.params.delay);
			}
		};
		s.destory=function(){
			$(s.container).remove();
			s=null;
		};
		/*================
		Init
		================*/
		s.init=function(){
			s.createContainer();
		}
		s.init();
	}
})(window,document,undefined);/*!
*	类型判断
*	@version 1.0.0
*	@author WangMingzhu
*/

/**
*  数据类型判断，主要用于是否是字符串、boolean值、Josn数据类型判断
* 
*  @class Type
*/
(function(window,document,undefined){
	'use strict';
	window.Type={};
	var t=Type;
	/*====================
	动态添加方法Method:isString | isBoolean | isNumber | isArray | isObject | isHTMLElement
	=====================*/
	for(var i=0,type;type=["String","Boolean","Number","Array","Object","HTMLElement","Function"][i++];){
		(function(type){
			t["is"+type]=function(obj){
				if(type=="HTMLElement" && Object.prototype.toString.call(obj).indexOf("HTML")){
					return true;
				}
				return Object.prototype.toString.call(obj)==="[object "+type+"]";
			}
		})(type);
	}
	/*====================
	Other Method
	=====================*/
	t.isJson=function(obj){
		if(!obj){
			return false;
		}
		if(this.isObject(obj)){
			try{
				JSON.stringify(obj);
				return true;
			}catch(e){
				return false;
			}
		}else if(this.isString(obj)){
			try{
				JSON.parse(obj);
				return true;
			}catch(e){
				return false;
			}
		}else{
			return false;
		}
	},
	t.isQueryId=function(id){
		var idExpr=/^#([\w-]*)$/;
		var match=idExpr.exec(id);
		if(match && match.length>0){
			return match[1];
		}
		return false;
	},
	t.isQueryClass=function(classname){
		var classExpr=/^\.([\w-]*)$/;
		var match=classExpr.exec(classname);
		if(match && match.length>0){
			return match[1];
		}
		return false;
	},
	t.isId=function(id){
		if(typeof id === "string" && document.getElementById(id)){
			return true;
		}
		return false;
	},
	t.isClass=function(classname){
		if(typeof classname === "string" && document.getElementsByClassName(classname)){
			return true;
		}
		return false;
	},
	t.isTag=function(str){
		var tagExpr=/^<(\w+)\s*.*\/\w*>$/im;
		var match=tagExpr.exec(str);
		if(match && match.length>0){
			return true;
		}
		return false;
	},
	t.hasEvent=function(element,strEvent){
		return (document.all(element)[strEvent] == null) ? false : true 
	}
})(window,document,undefined)/*!
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
	'use strict';
	window.Weather=function(container,params){
		var s=this;
		s.container=document.querySelector(container);
		//Model
		/*===========================
	    Param
	    ===========================*/
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
	    s.params=params;
	    //初始化expires时效性参数
		if((!s.params.expires=="today" || s.params.expires==0) && typeof s.params.expires=="number"){
			return;
		}
		s.params.expires=DateUtil.format(DateUtil.expires(s.params.expires));

		/*===========================
	    Icon
	    ===========================*/
		s.icon={
			"qing" : "weather-icon-qing",
			"duoyun" : "weather-icon-duoyun",
			"zhenyu" : "weather-icon-zhenyu",
			"leizhenyu" : "weather-icon-leizhenyu",
			"leizhenyubanyoubingbao" : "weather-icon-leizhenyubanyoubingbao",
			"yujiaxue" : "weather-icon-yujiaxue",
			"xiaoyu" : "weather-icon-xiaoyu",
			"zhongyu" : "weather-icon-zhongyu",
			"dayu" : "weather-icon-dayu",
			"baoyu" : "weather-icon-baoyu",
			"dabaoyu" : "weather-icon-dabaoyu",
			"tedabaoyu" : "weather-icon-tedabaoyu",
			"zhenxue" : "weather-icon-zhenxue",
			"xiaoxue" : "weather-icon-xiaoxue",
			"zhongxue" : "weather-icon-zhongxue",
			"daxue" : "weather-icon-daxue",
			"baoxue" : "weather-icon-baoxue",
			"wu" : "weather-icon-wu",
			"dongyu" : "weather-icon-dongyu",
			"shachenbao" : "weather-icon-shachenbao",
			"xiaoyuzhuanzhongyu" : "weather-icon-xiaoyuzhuanzhongyu",
			"zhongyuzhuandayu" : "weather-icon-zhongyuzhuandayu",
			"dayuzhuanbaoyu" : "weather-icon-dayuzhuanbaoyu",
			"baoyuzhuandabaoyu" : "weather-icon-baoyuzhuandabaoyu",
			"dabaoyuzhuantedabaoyu" : "weather-icon-dabaoyuzhuantedabaoyu",
			"xiaoxuezhuanzhongxue" : "weather-icon-xiaoxuezhuanzhongxue",
			"zhongxuezhuandaxue" : "weather-icon-zhongxuezhuandaxue",
			"daxuezhuanbaoxue" : "weather-icon-daxuezhuanbaoxue",
			"fuchen" : "weather-icon-fuchen",
			"yangsha" : "weather-icon-yangsha",
			"qiangshachenbao" : "weather-icon-qiangshachenbao",
			"mai" : "weather-icon-mai",
			"yin" : "weather-icon-yin"
		};
		
		/*===========================
	    Load data
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
			console.log(s.params.city);
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

		//view
		/*===========================
	    Show weather
	    ===========================*/
		s.showWeather=function(json){
			var temperatureExpr=/(-)?\d*℃/;
			var weekExpr=/(周|星期|礼拜)[1-7一二三四五六七天日]/;
			if (json.status == 'success') {
				//获得当前城市
				$(".weather-current-city",s.container).html(json.results[0].currentCity);
				//获得当前日期
				$("#weather-current-date",s.container).html(json.date);
				var today=json.results[0].weather_data[0].date;
				var temperatureMatch=temperatureExpr.exec(today);
				var weekMatch=weekExpr.exec(today);
				//获得当前温度
				$("#weather-current-temperature",s.container).html(temperatureMatch[0]);
				//获得当天温度
				$("#weather-today-temperature",s.container).html(json.results[0].weather_data[0].temperature);
				var pm25=json.results[0].pm25;
				var airquality=s.airqualityLvl(pm25);
				//获得当前空气pm2.5
				$(".weather-current-pm25",s.container).html(pm25);
				//获得当前空气质量
				$(".weather-air-quality",s.container).html(airquality);
				//获得当前天气图标
				$("#weather-current-icon",s.container).attr("class",s.reWeatherIcon(json.results[0].weather_data[0].dayPictureUrl));
				//获得当天天气名称
				$(".weather-name",s.container).html(json.results[0].weather_data[0].weather);
				//获得当天风向与级数
				$("#weather-current-wind").html(json.results[0].weather_data[0].wind);
				for(var i=0;i<4;i++){
					if (6 < DateUtil.hour() < 18) {
						$(".weather-otherday i",s.container).eq(i).attr("class",s.reWeatherIcon(json.results[0].weather_data[i].dayPictureUrl));
				}else{
					$(".weather-otherday i",s.container).eq(i).attr("class",s.reWeatherIcon(json.results[0].weather_data[i].dayPictureUrl));
				}
				$(".weather-otherday p",s.container).eq(i).html(json.results[0].weather_data[i].temperature);
				$(".weather-otherday small",s.container).eq(i).html(json.results[0].weather_data[i].date);
				/*$(s.container).append("天气:" + json.results[0].weather_data[i].weather+"    ");
				$(s.container).append("风向:" + json.results[0].weather_data[i].wind+"    ");*/
				}
				$(".weather-otherday small",s.container).eq(0).html(weekMatch[0]);
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
})(window,document,undefined);var lang = {
	"rule": {
		"required": "不能为空",
		"username": "只能包括字母、数字和下划线",
		"password": "密码格式不正确",
		"phone": "手机号码输入不正确",
		"mail": "邮箱格式不正确",
		"chinese": "只能填写中文",
		"minlength": "最小长度为",
		"maxlength": "最大长度为",
		"unit": "位",
		"twice": "两次",
		"compare": "输入不一致",
		"safelvl":"不安全，请增强"
	}
}