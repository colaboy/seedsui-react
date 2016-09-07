//Counter 动态数字
(function(window,document,undefined){
	window.Counter=function(counter,params){
		/*=========================
        Model
        ===========================*/
        var defaults={
			"fromAttr":"data-from",
			"toAttr":"data-to",
			"durationAttr":"data-duration",
			"defaultDuration":500,
			"defaultFrom":0,
			"defaultTo":0,
			"minMilli":10
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
		s.params=params;

		//Counter
		s.counter=typeof counter === "string"?document.querySelector(counter):counter;
		s.timers=document.querySelectorAll("."+s.params.timerClass);

		//From(开始数字) | To(结束数字) | Duration(执行时长) | Current(当前数字)
		s.from=s.counter.getAttribute(s.params.fromAttr)||s.params.defaultFrom;
		s.to=s.counter.getAttribute(s.params.toAttr)||s.params.defaultTo;
		s.duration=s.counter.getAttribute(s.params.durationAttr)||s.params.defaultDuration;
		s.current=s.from;

		//Diff(差值)
		s.diff=s.to-s.from;

		if(s.diff<0 || isNaN(s.from) || isNaN(s.to)){
			console.log("请确定开始时间与结束时间是否输入正确！");
			return;
		}

		//NumFps(递增值)
		s.numFps=1;

		//Milli(毫秒/帧)
		s.milli=s.duration/s.diff;
		if(s.milli<s.minMilli){
			s.milli=s.minMilli;
			//总值/执行次数=递增值
			s.numFps=s.diff/(s.duration/s.milli)
		}

		//console.log("差值:"+s.diff+" ;递增:"+s.numFps+" ;毫秒/帧:"+s.milli);

		//Interval
		s.interval;
		/*=========================
          Method
          ===========================*/
		s.play=function(){
			s.interval=window.setInterval(function(){
				s.current=eval(s.current+s.numFps);
				s.counter.innerHTML=s.current;
				if (s.current >= s.to) {
					s.counter.innerHTML=s.to;
					clearInterval(s.interval);
				}
			},s.milli);
		}
		/*=========================
          Control
          ===========================*/
        s.play();
	}
	window.Counters=function(params){
		var s=this;
        //获得所有元素
        s.counters=document.querySelectorAll(".counter");
        s.counters.counters=[];
        var jsonParams={};
        if(params)jsonParams=params;
        //实例化所有元素
        for(var i=0,counter;counter=s.counters[i++];){
            s.counters.counters[i]=new Counter(counter,jsonParams);
        }
	}
})(window,document,undefined);