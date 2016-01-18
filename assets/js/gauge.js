/*!
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
	/**
	 * 可视化数据：指针
	 * 
	 * @module Gauge
	 * @constructor
	 * @param container //元素对象
	 * @param params //配置参数，如：{minValue:0,maxValue:400,currentValue:10}
	 * @return void
	 */
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
})(window,document,undefined);