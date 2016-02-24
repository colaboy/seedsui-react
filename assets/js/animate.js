/*!
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

	function countTo(el){
		var toNumber=el.getAttribute("data-to")||0;
		var fromNumber=el.getAttribute("data-from")||0;
		var duration=el.getAttribute("data-from")||500;
		//总值
		var diffNumber=toNumber-fromNumber;
		if(diffNumber<0 || isNaN(fromNumber) || isNaN(toNumber)){
			console.log("请确定开始时间与结束时间是否输入正确！");
			return;
		}
		//帧毫秒
		var milli=10;
		//总帧数
		var fps=duration/milli;
		//每帧增加的数字
		var plusNumberFps=Math.round(diffNumber/fps);
		//如果总帧数大于总值，则将帧数缩减等同于总值，并设置正确的帧毫秒
		if(plusNumberFps<1){
			fps=diffNumber;
			milli=duration/fps;
			plusNumberFps=Math.round(diffNumber/fps);
		}
		console.log("总帧数："+fps+";帧毫秒："+milli+";总值："+diffNumber+";递增："+plusNumberFps);

		var countTimer=setInterval(function(){
			fromNumber=fromNumber+plusNumberFps;
			el.innerHTML=fromNumber;
			if (fromNumber >= toNumber) {
				el.innerHTML=toNumber;
				clearInterval(countTimer);
			}
		},milli);
	}
	function rafCountTo(el){
		var toNumber=el.getAttribute("data-to")||0;
		var fromNumber=el.getAttribute("data-from")||0;
		function step() {
			fromNumber += 1;
			el.innerHTML=fromNumber;
			if (fromNumber < toNumber) {
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
			for(var i=0,t;t=timers[i++];){
				countTo(t);
			}
		}
	}
})();