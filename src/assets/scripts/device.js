//Device
var Device=(function(){
	var ua = navigator.userAgent.toLowerCase()
	var androidPattern = /android\s*(\d*\.*\d*)/i
    var androidVersion = androidPattern.exec(ua)?androidPattern.exec(ua)[1]:''
	return{
	    //四大内核
	    isTrident:ua.indexOf('trident') > -1,
	    isPresto:ua.indexOf('presto') > -1,
	    isWebKit:ua.indexOf('applewebKit') > -1,
	    isGecko:ua.indexOf('gecko') > -1 && ua.indexOf('khtml') == -1,
	    //设备判断
	    isMobile:!!ua.match(/applewebkit.*mobile.*/),
	    isIPhone:ua.indexOf('iphone') > -1 || ua.indexOf('mac') > -1,
	    isIPad:ua.indexOf('ipad') > -1,
	    isWebApp:ua.indexOf('safari') == -1,
	    //平台判断
	    isAndroid:ua.indexOf('android') > -1,
	    androidVer:androidVersion,
	    isIos:!!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),//ios终端
	    isWebview: ua.indexOf("webview") > -1,
	    //应用程序判断
		isWeixin:ua.match(/micromessenger/i)=="micromessenger",
		isUC:ua.match(/ucbrowser/i)=="ucbrowser",
		isQQ:ua.match(/mqqbrowser/i)=="mqqbrowser",
	    language:(navigator.browserLanguage || navigator.language).toLowerCase(),
	    userAgent:ua,
	    appVersion:navigator.appVersion,
	    isOnline:window.navigator.online
   }
})();