//事件函数
(function(window,document,undefined){
	window.TapSwipe=function(element,type,handler){
		var s=this;
		s.params={
			threshold:0
		}
		/*=========================
          Model
          ===========================*/
		s.touches={
			direction:0,
			vertical:0,
			horizontal:0,
			startX:0,
			startY:0,
			endX:0,
			endY:0,
			diffX:0,
			diffY:0,
		}
		//s.element,s.type,s.handler;
		s.element=element;
    	s.type=type;
		s.handler=handler;
		/*=========================
          Method
          ===========================*/

        /*=========================
          Touch Events
          ===========================*/
		//绑定事件
		s.events=function(detach){
			var touchTarget=s.element;
			var action=detach?"removeEventListener":"addEventListener";
			touchTarget[action]("touchstart",s.onTouchStart,false);
			touchTarget[action]("touchend",s.onTouchEnd,false);
		}
		//attach、dettach事件
		s.attach=function(event){
			s.events();
		}
		s.detach=function(event){
			s.events(true);
		}
		/*=========================
          Touch Handler
          ===========================*/
        s.onTouchStart=function(e){
			s.touches.startX = e.touches[0].clientX;
			s.touches.startY = e.touches[0].clientY;
		}
		s.onTouchEnd=function(e){
			s.touches.endX = e.changedTouches[0].clientX,
			s.touches.endY = e.changedTouches[0].clientY;
			s.touches.diffX=s.touches.startX - s.touches.endX;
			s.touches.diffY=s.touches.startY - s.touches.endY;
			//单击事件
			if(s.type==="tap" && Math.abs(s.touches.diffX) < 6 && Math.abs(s.touches.diffY) < 6 ){
				s.handler(e);
				return;
			}

			/*设置方向*/
			if(s.touches.direction === 0) {//设置滑动方向(-1上下 | 1左右)
				s.touches.direction = Math.abs(s.touches.diffX) > Math.abs(s.touches.diffY) ? 1 : -1;
			}
			if (s.touches.direction === -1) {//设置垂直方向(-1上 | 1下)
				s.touches.vertical = s.touches.diffY < 0 ? 1 : -1;
			}
			if (s.touches.direction === 1) {//设置左右方向(-1左 | 1右)
				s.touches.horizontal = s.touches.diffX < 0 ? 1 : -1;
			}

			/*swipeleft | swiperight | swipedown | swipeup 事件*/
			if(s.type==="swipeup" && s.touches.vertical === -1){//上
				if(Math.abs(s.touches.diffY) > s.params.threshold){
					s.handler(e);
				}
			}else if(s.type==="swipedown" && s.touches.vertical === 1){//下
				if(Math.abs(s.touches.diffY) > s.params.threshold){
					s.handler(e);
				}
			}else if(s.type==="swipeleft" && s.touches.horizontal === -1){//左
				if(Math.abs(s.touches.diffY) > s.params.threshold){
					s.handler(e);
				}
			}else if(s.type==="swiperight" && s.touches.horizontal === 1){//右
				if(Math.abs(s.touches.diffY) > s.params.threshold){
					s.handler(e);
				}
			}

			/*清空方向*/
			s.touches.direction=0;
		}
		/*=========================
          Init
          ===========================*/
        s.init=function(){
        	s.attach();
        }
        s.init();
	}
	var touchEvent=[];
	window.EventUtil = {
		addHandler:function (element, type, handler) {
			//tap | swipeleft | swiperight | swipedown | swipeup 事件
			if(type==="tap" || type==="swipeleft" ||  type==="swiperight" ||  type==="swipedown" ||  type==="swipeup"){
				if(!touchEvent[element])touchEvent[element]=new TapSwipe(element,type,handler);
				return;
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
			//tap、swipeleft、swiperight、swipedown、swipeup
			if(type==="tap" || type==="swipeleft" ||  type==="swiperight" ||  type==="swipedown" ||  type==="swipeup"){
				touchEvent[element].detach();
				return;
			}
			//系统事件
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
})(window,document,undefined);