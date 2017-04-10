//ListPull 列表滑动菜单
(function(window,document,undefined){
	window.ListPull=function(container,params){
		/*================
		Model
		================*/
		var defaults={
			leftClass:"listpull-left",
			rightClass:"listpull-right",
			handlerClass:"listpull-handler",
			handlerActiveClass:"listpull-active",
			threshold:50,
			duration:150
			/*
            Callbacks:
            onClick:function(ListPull)

            onPull:function(ListPull)
            onPullEnd:function(ListPull)

            onHid:function(ListPull)
            onShowed:function(ListPull)

            onLeftHid:function(ListPull)
            onLeftShowed:function(ListPull)

			onRightHid:function(ListPull)
            onRightShowed:function(ListPull)
			*/
		}
		params=params||{};
		for(var def in defaults){
			if(params[def]===undefined){
				params[def]=defaults[def];
			}
		}
		var s=this;
		//Params
		s.params=params;
		//Container(Element)
		s.container=typeof container === "string"?document.querySelector(container):container;
		/*================
		Method
		================*/
		s.dragHorizontal=0;//设置左右方向(-1左 | 1右)
		s.hide=function(dragContainer,horizontalFlag){
			var dragContainer=dragContainer;
			if(!dragContainer){
				var dragContainer=s.container.querySelectorAll("."+s.params.handlerActiveClass)[0];
			}

			dragContainer.style.webkitTransitionDuration=s.params.duration+"ms";
			dragContainer.style.webkitTransform='translate3d(0px,0px,0px)';
			dragContainer.classList.remove(s.params.handlerActiveClass);

			if(isNaN(horizontalFlag)){
				s.dragHorizontal=s.moveX>0?-2:2
			}else{
				s.dragHorizontal=horizontalFlag;
			}
		}
		s.show=function(dragContainer,x,horizontalFlag){
			dragContainer.style.webkitTransitionDuration=s.params.duration+"ms";
			dragContainer.style.webkitTransform='translate3d(' +x+ 'px,0px,0px)';

			dragContainer.classList.add(s.params.handlerActiveClass);
			s.dragHorizontal=horizontalFlag;
		}
		/*================
		Controller
		================*/
		s.events=function(detach){
			var touchTarget=s.container;
			var action=detach?"removeEventListener":"addEventListener";
			touchTarget[action]("touchstart",s.onTouchStart,false);
			touchTarget[action]("touchmove",s.onTouchMove,false);
			touchTarget[action]("touchend",s.onTouchEnd,false);
			touchTarget[action]("touchcancel",s.onTouchEnd,false);

			touchTarget[action]("webkitTransitionEnd",s.onTransitionEnd,false);
		}
		s.attach=function(event){
            s.events();
        }
        s.detach=function(event){
            s.events(true);
        }
        /*=========================
          Touch Handler
          ===========================*/
        //Touch信息
        s.touches={
			direction:0,
			vertical:0,
			horizontal:0,
			startX:0,
			startY:0,
			currentX:0,
        	currentY:0,
			endX:0,
			endY:0,
			diffX:0,
			diffY:0
		};
        //索引
        s.activeIndex=0;
        function preventDefault(e){
			e.preventDefault();
		}
		
		s.onTouchStart=function(e){
			s.container.addEventListener("touchmove",preventDefault,false);
			s.touches.startX=e.touches[0].clientX;
			s.touches.startY=e.touches[0].clientY;
			//初始化拉动对象参数
			s.dragContainer=null,s.dragLeftMax=0,s.dragRightMax=-0,s.moveX=0;
			//Callback onClick
			s.target=e.target;
			if(s.params.onClick)s.params.onClick(s);
			//如果点击时有展开的列表项，则先收缩
			var handlerActives=s.container.querySelectorAll("."+s.params.handlerActiveClass);
			if(handlerActives.length>0){
				e.preventDefault();
				s.hide(handlerActives[0],s.moveX>0?-2:2);
				s.container.removeEventListener("touchmove",preventDefault,false);
				return;
			}
			//拉动对象
			if(e.target.classList.contains(s.params.handlerClass)){
				s.dragContainer=e.target;
				var left=s.dragContainer.parentNode.querySelector("."+s.params.leftClass);
				var right=s.dragContainer.parentNode.querySelector("."+s.params.rightClass);
				if(left)s.dragLeftMax=left.clientWidth;
				if(right)s.dragRightMax=-right.clientWidth;
			}else{
				s.container.removeEventListener("touchmove",preventDefault,false);
			}
		};
		s.onTouchMove=function(e){
			s.touches.currentX=e.touches[0].clientX;
			s.touches.currentY=e.touches[0].clientY;
			s.touches.diffX=s.touches.startX-s.touches.currentX;
			s.touches.diffY=s.touches.startY-s.touches.currentY;

			//设置滑动方向
			if(s.touches.direction === 0) {//设置滑动方向(-1上下 | 1左右)
				s.touches.direction = Math.abs(s.touches.diffX) > Math.abs(s.touches.diffY) ? 1 : -1;
			}
			if (s.touches.direction === -1) {//设置垂直方向(-1上 | 1下)
				s.touches.vertical = s.touches.diffY < 0 ? 1 : -1;
			}
			if (s.touches.direction === 1) {//设置左右方向(-1左 | 1右)
				s.touches.horizontal = s.touches.diffX < 0 ? 1 : -1;
			}
			
			//如果是上下滑动则不工作
			if(s.touches.vertical !=0 ){
				s.container.removeEventListener("touchmove",preventDefault,false);
				return;
			}

			//如果滑动了，则禁止事件向下传播
			e.stopPropagation();

			s.moveX=-s.touches.diffX;
			if(s.moveX<s.dragRightMax)s.moveX=s.dragRightMax;
			if(s.moveX>s.dragLeftMax)s.moveX=s.dragLeftMax;
			//Callback onPull
			if(s.params.onPull)s.params.onPull(s);

			//滑动
			if(s.dragContainer)s.dragContainer.style.webkitTransform='translate3d(' +s.moveX+ 'px,0px,0px)';
		};
		s.onTouchEnd=function(e){
			if(s.params.onPullEnd){
				s.params.onPullEnd(s);
				if(s.break===true)return;
			}
			if(s.moveX>0){//左pull
				if(Math.abs(s.moveX)>s.params.threshold){
					s.show(s.dragContainer,s.dragLeftMax,-1);
				}else{
					s.hide(s.dragContainer,-2);
				}
			}else if(s.moveX<0){//右pull
				if(Math.abs(s.moveX)>s.params.threshold){
					s.show(s.dragContainer,s.dragRightMax,1);
				}else{
					s.hide(s.dragContainer,2);
				}
			}
			s.break=null;
			//清空滑动方向
			s.touches.direction=0;
			s.touches.vertical=0;
			s.touches.horizontal=0;
		};
		s.onTransitionEnd=function(e){
			if(!e.target.classList.contains(s.params.handlerClass) || e.propertyName=="visibility")return;
			//有效的显示状态
			if(s.dragHorizontal===-2 || s.dragHorizontal===2){
				//Callback onHid
                if(s.params.onHid)s.params.onHid(s);
			}
			if(s.dragHorizontal===-1 || s.dragHorizontal===1){
				//Callback onShowed
                if(s.params.onShowed)s.params.onShowed(s);
			}

			if(s.dragHorizontal===-1){//左显示
                //Callback onLeftShowed
                if(s.params.onLeftShowed)s.params.onLeftShowed(s);
            }else if(s.dragHorizontal===-2){//左隐藏
                //Callback onLeftHid
                if(s.params.onLeftHid)s.params.onLeftHid(s);
            }else if(s.dragHorizontal===1){//右显示
                //Callback onRightShowed
                if(s.params.onRightShowed)s.params.onRightShowed(s);
            }else if(s.dragHorizontal===2){//右隐藏
                //Callback onRightHid
                if(s.params.onRightHid)s.params.onRightHid(s);
            }
		};
        //Init
        s.init=function(){
        	s.attach();
        }
        s.init();
	}
})(window,document,undefined);