//Counter
(function(window,document,undefined){
	window.Counter=function(params){
		/*=========================
          Model
          ===========================*/
		var defaults={
			"timerClass":"timer",
			"defaultDuration":500,
			"defaultFrom":0,
			"defaultTo":0
		}
		params=params||{};
		for(var def in defaults){
			if(params[def]===undefined){
				params[def]=defaults[def];
			}
		}
		//Counter
		var s=this;

		//Params
		s.params = params;

		//Timers
		s.timers=document.querySelectorAll("."+s.params.timerClass);
		//Interval
		s.intervalTimer;
		/*=========================
          Method
          ===========================*/
		//计数器
		s.intervalNumber=function(el){
			var toNumber=el.getAttribute("data-to")||s.params.defaultTo;
			var fromNumber=el.getAttribute("data-from")||s.params.defaultFrom;
			var duration=el.getAttribute("data-duration")||s.params.defaultDuration;
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
			s.intervalTimer=setInterval(function(){
				fromNumber=fromNumber+plusNumberFps;
				el.innerHTML=fromNumber;
				if (fromNumber >= toNumber) {
					el.innerHTML=toNumber;
					clearInterval(s.intervalTimer);
				}
			},milli);
		}

		//计数器
		s.counter=function(){
			for(var i=0,t;t=s.timers[i++];){
				s.intervalNumber(t);
			}
		}
		/*=========================
          Control
          ===========================*/
        s.init=function(){
        	s.counter();
        }
        s.init();
	}
})(window,document,undefined);