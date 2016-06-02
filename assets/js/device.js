/*!
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
		    isOnline:window.navigator.online,
		    isExmobi:app.toLowerCase().indexOf("exmobi") > -1,//判断是否是Exmobi
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
			cancelAnimationFrame:function(callback){
				var cAF = window.cancelAnimationFrame	||
				window.webkitCancelAnimationFrame	||
				window.mozCancelAnimationFrame		||
				window.oCancelAnimationFrame		||
				window.msCancelAnimationFrame		||
				function (callback) { window.clearTimeout(callback); };
				cAF(callback);
			}
	   }
	}();
})(window,document,undefined);