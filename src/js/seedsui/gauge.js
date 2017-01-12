//Gauge 仪表盘
(function(window,document,undefined){
	
	window.Gauge=function(container,params){
		/*============
		  Model
		  ==============*/
		var defaults={
			minValue:0,
            maxValue:360,
            currentValue:0,

            maxPointRotate:270,

            //dom
            pointClass:".gauge-pointer",
            waveClass:".gauge-wave",
            valueClass:".gauge-text",

            //animate
            durationall:2000

            /*callbacks
			onPointChangeStart:function(Gauge)
			onPointChangeEnd:function(Gauge)
			onPointOut:function(Gauge)
			*/
		}
		for(var def in defaults){
			if(params[def]==undefined){
				params[def]=defaults[def];
			}
		}
		var s=this;
		s.params=params;
		s.container=typeof container=="string"?document.querySelector(container):container;
		if(!s.container){
            console.log("SeedsUI Error：未找到Gauge的DOM对象，请检查传入参数是否正确");
            return;
        }
		s.point=s.container.querySelector(s.params.pointClass);//指针
		s.wave=s.container.querySelector(s.params.waveClass)||null;//波浪
		s.value=s.container.querySelector(s.params.valueClass);//指针值

		s.percent=(s.params.currentValue-s.params.minValue)/(s.params.maxValue-s.params.minValue);//当前值所占比例
		
		s.duration=Math.round(s.percent*s.params.durationall);//执行时间长度
		if(s.duration>s.params.durationall){
			s.duration=s.params.durationall
		}
		s.bgLvl=Math.round(s.percent*10)+1;//背景等级
		if(s.bgLvl<1)s.bgLvl=1;
		if(s.bgLvl>10)s.bgLvl=10;
		
		/*============
		  Method
		  ==============*/
		//旋转指针
		s.updatePoint=function(){
			//指针旋转角度
			s.pointRotate=eval(s.params.maxPointRotate*s.percent);

			//CallBack onPointOut
			if(s.pointRotate>s.params.maxPointRotate){
				s.pointRotate=s.params.maxPointRotate;

				if(s.params.onPointOut)s.params.onPointOut(s);
			}

			//CallBack onPointChangeStart
			if(s.params.onPointChangeStart)s.params.onPointChangeStart(s);

			//开始旋转
			s.point.setAttribute("style","-webkit-transform:rotate("+s.pointRotate+"deg);-webkit-transition:transform "+s.duration+"ms");

			//CallBack onPointChangeEnd
			/*if(s.params.onPointChangeEnd){
				setTimeout(function(){
					s.params.onPointChangeEnd(s);
				},s.duration);
			}*/
		}
		//设置数字
		s.updateValue=function(){
			s.value.innerHTML=s.params.currentValue;
		}
		//更改背景色
		s.updateBg=function(){
			var bgExpr=/bg[1-9]0?$/g;
			if(bgExpr.test(s.container.className)){
				s.container.className=s.container.className.replace(bgExpr,"bg"+s.bgLvl);
			}else{
				s.container.className+=" bg"+s.bgLvl;
			}
			s.container.style.webkitAnimationDuration=s.duration+"ms";
		}
		//设置波浪
		s.updateWave=function(){
			if(!s.wave)return;
			var waveTop=100-Math.round(s.percent.toFixed(1)*100);
			if(waveTop<0){
				waveTop=0;
			}
			s.wave.style.top=waveTop+"%";
			s.wave.style.webkitTransition="all "+s.duration+"ms";
		}
		s.update=function(){
			s.updateBg();
			s.updatePoint();
			s.updateValue();
			s.updateWave();
		}
		/*==================
		  Events
		  ==================*/
		s.events=function(detach){
			var action=detach?"removeEventListener":"addEventListener";
			s.point[action]("webkitTransitionEnd",s.onTransitionEnd,false);
		}
		//attach、detach事件
		s.attach=function(){
			s.events();
		};
		s.detach=function(){
			s.events(true);
		};
		s.onTransitionEnd=function(e){
			//CallBack onPointChangeEnd
			if(s.params.onPointChangeEnd)s.params.onPointChangeEnd(s);
		}
		//Init
		s.init=function(){
			s.update();
			s.attach();
		}
		s.init();
	}
})(window,document,undefined);