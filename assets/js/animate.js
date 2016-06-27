//Animate
window.Animate={
	raf:window.requestAnimationFrame||
		window.webkitRequestAnimationFrame||
		window.mozRequestAnimationFrame||
		window.oRequestAnimationFrame||
		window.msRequestAnimationFrame||
		function (callback) { window.setTimeout(callback, 1000 / 60); },

	caf:window.cancelAnimationFrame||
		window.webkitCancelAnimationFrame||
		window.mozCancelAnimationFrame||
		window.oCancelAnimationFrame||
		window.msCancelAnimationFrame||
		function (handler) { window.clearTimeout(handler); },
	//动画执行一次后销毁
	one:function(el,aniname){
		var animExpr=new RegExp("\\s{0,}"+aniname,"g");
		if(el.className.match(animExpr)){
			el.className=el.className.replace(animExpr,"");
		}
		el.className+=" "+aniname;
		if(!el.hasEndEvent){
			el.addEventListener("webkitAnimationEnd",function(e){
				el.className=el.className.replace(animExpr,"");
			},false);
			el.hasEndEvent=true;
		}
	},
	//setInterval帧率测试
	testSiFps:function(callback){
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
	},
	//requestAnimationFrame帧率测试
	testRafFps:function(callback){
    	var fps=0;
    	function fpstest(timestamp){
    		fps++;
    		var raf=requestAnimationFrame(fpstest);
    		if(timestamp>=1000){
    			if(callback){
	    			callback(fps);
	    		}
    			cancelAnimationFrame(raf);
    		}
    	}
    	requestAnimationFrame(fpstest);
	}
};