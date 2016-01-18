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
})();