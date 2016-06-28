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

            //dom
            pointClass:".gauge-pointer",
            waveClass:".gauge-wave",
            valueClass:".gauge-text",

            //animate
            durationall:2000

            /*callbacks
			onInit:function(Gauge)
			onPointChangeStart:function(Gauge)
			onPointChangeEnd:function(Gauge)
			*/
		}
		for(var def in defaults){
			if(params[def]==undefined){
				params[def]=defaults[def];
			}
		}
		var s=this;
		s.params=params;
		s.container=document.querySelector(container);//容器
		s.point=s.container.querySelector(s.params.pointClass);//指针
		s.wave=s.container.querySelector(s.params.waveClass)||null;//波浪
		s.value=s.container.querySelector(s.params.valueClass);//指针值

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
		  Method
		  ==============*/
		//旋转指针
		s.updatePoint=function(){
			if(s.params.onPointChangeStart)s.params.onPointChangeStart(s);
			s.point.setAttribute("style","-webkit-transform:rotate("+s.pointRotate+"deg);-webkit-transition:all "+s.duration+"ms");
			if(!s.params.onPointChangeEnd)return;
			setTimeout(function(){
				s.params.onPointChangeEnd(s);
			},s.duration);
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
			s.container.style.WebkitAnimationDuration=s.duration+"ms";
		}
		//设置波浪
		s.updateWave=function(){
			if(!s.wave)return;
			var waveTop=100-Math.round(s.percent.toFixed(1)*100);
			if(waveTop<0){
				waveTop=0;
			}
			s.wave.style.top=waveTop+"%";
			s.wave.style.WebkitTransition="all "+s.duration+"ms";
		}
		s.update=function(){
			s.updateBg();
			s.updatePoint();
			s.updateValue();
			s.updateWave();
			if(s.params.onInit)s.params.onInit(s);
		}
		s.update();
	}
})(window,document,undefined);