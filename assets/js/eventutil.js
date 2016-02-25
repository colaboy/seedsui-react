/*!
 * 事件函数库
 * @version 1.0.0
 * @author WangMingzhu
 */

/**
*  事件函数库，兼容性强
* 
*  @class EventUtil
*/
(function(window,document,undefined){
	'use strict';
	function _swipe_(element,type,handler){
		var xDown, yDown,xUp,yUp,xDiff,yDiff;
		element.addEventListener( 'touchstart', function( e ){
			var touches = e.touches[0];
			xDown = touches.clientX;
			yDown = touches.clientY;
		}, false);
		
		element.addEventListener( 'touchend', function( e ){
			var touches = e.changedTouches[0],
			xUp = touches.clientX,
			yUp = touches.clientY;
			xDiff=xDown - xUp;
			yDiff=yDown - yUp;
			//单击事件
			if( Math.abs(xDown - xUp) < 6 && Math.abs(yDown - yUp) < 6 ){
				if(type==="tap"){
					handler(e);
				}
				return "tap";
			}
			//上下滑动
			if(Math.abs(yDiff)>Math.abs(xDiff)){
				if(yDiff>0){
					if(type==="swipeup"){
						handler(e);
					}
					return "swipeup";
				}
				
				if(type==="swipedown"){
					handler(e);
				}
				return "swipedown";
			}
			//左右滑动
			if(xDiff>0){
				if(type==="swipeleft"){
					handler(e);
				}
				return "swipeleft";
			}
			if(type==="swiperight"){
				handler(e);
			}
			return "swiperight";
		}, false );
	};
	//transtionend事件与animationend兼容写法
	var transitionend,animationend;
	function whichTransitionEvent(){
		var t,
		el = document.createElement("fakeelement");
		var transitions = {
			"transition"      : "transitionend",
			"OTransition"     : "oTransitionEnd",
			"MozTransition"   : "transitionend",
			"WebkitTransition": "webkitTransitionEnd"
		};
		for (t in transitions){
			if (el.style[t] !== undefined){
				return transitions[t];
			}
		}
	};
	function whichAnimationEvent(){
		var t,
		el = document.createElement("fakeelement");
		var animations = {
			"animation"      : "animationend",
			"OAnimation"     : "oAnimationEnd",
			"MozAnimation"   : "animationend",
			"WebkitAnimation": "webkitAnimationEnd"
		};
		for (t in animations){
			if (el.style[t] !== undefined){
				return animations[t];
			}
		}
	};
	var EventUtil = {
		/**
		 * 绑定事件
		 * 
		 * @method addHandler
		 * @param element //元素对象
		 * @param type //事件类型
		 * @param handler //响应函数
		 * @return void
		 */
		callback:function(fun,event){
			fun(event);
		},
		addHandler:function (element, type, handler) {
			//tap、swipeleft、swiperight、swipedown、swipeup
			if(type==="tap" || type==="swipeleft" ||  type==="swiperight" ||  type==="swipedown" ||  type==="swipeup"){
				_swipe_(element,type,handler);
				return;
			}
			//animationend
			if(type.toLowerCase()==="animationend"){
				if(!animationend){
					animationend=whichAnimationEvent();
				}
				if (element.addEventListener) {
					element.addEventListener(animationend, handler, false);
				}else if(element.attachEvent){
					element.attachEvent(animationend, handler);
				}
				//webkitAnimationEnd oanimationend msAnimationEnd animationend
				return;
			}
			//TransitionEnd
			if(type.toLowerCase()==="transitionend"){
				if(!transitionend){
					transitionend=whichTransitionEvent();
				}
				if (element.addEventListener) {
					element.addEventListener(transitionend, handler, false);
				}else if(element.attachEvent){
					element.attachEvent(transitionend, handler);
				}
				return;
			}
			//oninput
			if(type.toLowerCase()==="input" || type.toLowerCase()==="propertychange"){
				type="input";
				if(element.attachEvent){
					type="propertychange";
				}
			}
			//系统事件
			if (element.addEventListener) {
				element.addEventListener(type, handler, false);
			} else if (element.attachEvent) {
				element.attachEvent("on" + type, handler);
			} else {
				element["on" + type] = handler;
			}
		},
		removeHandler:function(element, type, handler) {
			if (element.removeEventListener) {
				element.removeEventListener(type, handler, false);
			} else if (element.detachEvent) {
				element.detachEvent("on" + type, handler);
			} else {
				element["on" + type] = null;
			}
		},
		preventDefault:function (e) {
			if (e.preventDefault) {
				e.preventDefault();
			} else {
				e.returnValue = false;
			}
		},
		stopPropagation:function(e){
			if(e.stopPropagation){
				e.stopPropagation();
			}else{
				e.cancelBubble=true;
			}
		},
		event:function(e){
			return e?e:window.e;
		},
		type:function(e){
			return e.type;
		},
		target:function(e){
			return e.target || e.srcElement;
		}
	};
	window.EventUtil=EventUtil;
})(window,document,undefined)