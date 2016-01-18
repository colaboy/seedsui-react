/*!
 * 卡片框
 * @version 1.0.0
 * @author WangMingzhu
 * @requie jquery.js
 */

/**
*  toast弹出框
* 
*  @class Actionsheet
*/
(function(window,document,undefined){
	'use strict';
	window.Toast=function(msg,params){
		/*================
		Model
		================*/
		var defaults={
			delay:1000
		}
		params=params||{};
		for(var def in defaults){
			if(params[def]==undefined){
				params[def]=defaults[def];
			}
		}
		var s=this;
		s.params=params;
		//开关动画
		s.hideAnimate={opacity:0};
		s.showAnimate={opacity:"1",bottom:"50px"};

		/*================
		Method
		================*/
		s.createContainer=function(){
			if(s.container)return;
			s.container=document.createElement("div");
			s.container.setAttribute("class","toast-box");
			s.toast=document.createElement("div");
			s.toast.setAttribute("class","toast");
			s.toast.innerHTML=msg;
			s.container.appendChild(s.toast);
			document.body.appendChild(s.container);
		}
		/*================
		Controller
		================*/
		s.setText=function(msg){
			s.toast.innerHTML=msg;
		};
		s.hide=function(fn){
			$(s.container).animate(s.hideAnimate,"fast","linear",function(){
				$(this).css({"display":"none","bottom":"-100%"});
				if(fn)fn(s);
			});
		};
		s.show=function(fn){
			clearTimeout(s.delay);
			if(s){
				$(s.container).css("display","block").animate(s.showAnimate,"fast","linear");
				s.delay=setTimeout(function(){
					s.hide(fn);
				},s.params.delay);
			}
		};
		s.destory=function(){
			$(s.container).remove();
			s=null;
		};
		/*================
		Init
		================*/
		s.init=function(){
			s.createContainer();
		}
		s.init();
	}
})(window,document,undefined);