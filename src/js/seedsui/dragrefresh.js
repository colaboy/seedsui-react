//Dragrefresh 下拉刷新
(function(window,document,undefined){
	window.Dragrefresh=function(params){
		/*==================
		  Model
		  ==================*/
		var defaults={
			parent:document.body,
			isDisableTop:false,
			isDisableBottom:false,
			minScrollTop:0,
			threshold:100,
			thresholdMaxRange:100,
			refreshHideTop:0,
			duration:150,
			timeout:5000,

			topContainerClass:"dragrefresh",
			bottomContainer:null,
			bottomContainerClass:"loading-more",
			bottomContainerLoadingClass:"loading-progress",

			/*callbacks
			onRefreshStart:function(Dragrefresh)
			onRefreshEnd:function(Dragrefresh)
			onRefreshTimeout:function(Dragrefresh)
			onScroll:function(Dragrefresh)
			onBottom:function(Dragrefresh)
			*/
		}
		params=params||{};
		for(var def in defaults){
			if(params[def]===undefined){
				params[def]=defaults[def];
			}
		}
		var s=this;
		s.params=params;
		//最大拉动值
		s.params.thresholdMax=s.params.threshold+s.params.thresholdMaxRange;
		//Container
		s.parent=typeof s.params.parent=="string"?document.querySelector(s.params.parent):s.params.parent;
		//创建DOM
		s.createRefresh=function(){
			if(s.topContainer)return;
			s.topContainer=document.createElement("div");
			s.topContainer.setAttribute("class",s.params.topContainerClass);
			var iconSvg='<svg width="1000.6px" height="1000.6px" viewBox="0 0 1000.6 1000.6" xml:space="preserve">'+
						'<path d="M867.4,456.1c-24.1,0-43.8,19.7-43.8,43.8c0,1.5,0.1,3.1,0.3,4.6c-2.2,176.4-147.1,319.6-323.7,319.6 c-178.5,0-323.8-145.3-323.8-323.8s145.3-323.8,323.8-323.8c62.8,0,122.8,17.7,174.4,50.8l-29,52.2c0,0,138.4,2.2,149.2,2.4 c10.8,0.2,14.6-5.6,14.6-5.6s5.1-5.8,2.4-15.5c-2.6-9.7-43.2-162.2-43.2-162.2l-38.5,61.1c-67.3-45.7-146.7-70.1-229.8-70.1 c-226.6,0-411,184.4-411,411s184.4,411,411,411c225.8,0,410.1-183.7,410.9-407.3l0.2-4.2C911.2,475.7,891.6,456.1,867.4,456.1z"/>'+
						'</svg>';
			s.topContainer.innerHTML=iconSvg;
			s.parent.appendChild(s.topContainer);
		};
		s.createRefresh();
		s.bottomContainer=typeof s.params.bottomContainer=="string"?s.parent.querySelector(s.params.bottomContainer):s.params.bottomContainer;

		s.createBottomContainer=function(){
			s.bottomContainer=s.parent.querySelector("."+s.params.bottomContainerClass);
			if(!s.bottomContainer){
				s.bottomContainer=document.createElement("div");
				s.bottomContainer.setAttribute("class",s.params.bottomContainerClass);
				var spinnerdiv=document.createElement("div");
				spinnerdiv.setAttribute("class",s.params.bottomContainerLoadingClass);
				s.bottomContainer.appendChild(spinnerdiv);
				s.parent.appendChild(s.bottomContainer);
			}
		}
		if(!s.bottomContainer && s.params.onBottom)s.createBottomContainer();

		/*==================
		  Mothod
		  ==================*/
		//旋转,10W毫秒，旋转4万6千度
		s.spinner=function(){
			s.topContainer.style.webkitTransitionDuration="100000ms";
			s.topContainer.style.webkitTransform='translate3d(0,' + s.touches.posY + 'px,0) rotate(46000deg)';
		}
		s.delaySpinner=function(){//兼容一些不旋转的问题
			s.topContainer.style.webkitTransitionDuration="100000ms";
			setTimeout(function(){
				s.topContainer.style.webkitTransform='translate3d(0,' + s.touches.posY + 'px,0) rotate(46000deg)';
			},100);
		}
		s.cancelSpinner=function(){
			s.topContainer.style.webkitTransitionDuration="0ms";
			s.topContainer.style.webkitTransform='translate3d(0,' + s.touches.posY + 'px,0) rotate(0deg)';
		};
		s.isHid=false;
		//隐藏
		s.hide=function(){
			//停止旋转
			s.cancelSpinner();
			//收起
			s.topContainer.style.webkitTransitionDuration=s.params.duration+"ms";
			s.touches.posY=s.params.refreshHideTop;
			s.topContainer.style.webkitTransform='translate3d(0,' + s.touches.posY + 'px,0) rotate(' + s.touches.rotateDeg + 'deg)';

			s.isHid=true;
		};
		//显示
		s.show=function(){
			s.isHid=false;
			//收到指定位置
			s.topContainer.style.webkitTransitionDuration=s.params.duration+"ms";
			if(s.touches.posY==s.params.threshold){//不执行onTransitionEnd的情况，直接旋转
				s.delaySpinner();
			}
			s.touches.posY=s.params.threshold;
			s.topContainer.style.webkitTransform='translate3d(0,' + s.touches.posY + 'px,0) rotate(' + s.touches.rotateDeg + 'deg)';
		}
		//销毁对象
		s.destroyTop=function(){
			s.parent.parentNode.removeChild(s.topContainer);
		}
		s.destroyBottom=function(){
			s.parent.removeChild(s.bottomContainer);
		}
		s.destroy=function(){
			s.destroyTop();
			s.destroyBottom();
			//销毁事件
			s.detach();
		}
		//Callback 刷新中
		s.refresh=function(){
			s.show();
			//callback onRefreshStart
			if(s.params.onRefreshStart){
				s.params.onRefreshStart(s);
			}
			//callback 超时
			if(s.params.onRefreshTimeout){
				s.timeout=setTimeout(function(){
					s.params.onRefreshTimeout(s);
				}, s.params.timeout);
			}
		};
		//Callback 刷新完成
		s.refreshComplete=function(){
			//清除超时
			if(s.timeout)window.clearTimeout(s.timeout);
			//收起
			s.hide();
			//callback 刷新结束
			if(s.params.onRefreshEnd){
				s.params.onRefreshEnd(s);
			}
		}
		//Callback 刷新超时
		s.refreshTimeout=function(){
			s.hide();
			s.params.onRefreshTimeout(s);
		};

		/*==================
		  Controller
		  ==================*/
		s.isRefreshEnd=true;
		s.events=function(detach){
			var action=detach?"removeEventListener":"addEventListener";
			if(s.params.isDisableTop===false){
				var touchTarget=s.parent;
				touchTarget[action]("touchstart",s.onTouchStart,false);
				touchTarget[action]("touchmove",s.onTouchMove,false);
				touchTarget[action]("touchend",s.onTouchEnd,false);
				touchTarget[action]("touchcancel",s.onTouchEnd,false);
				//头部动画监听
				s.topContainer[action]("webkitTransitionEnd",s.onTransitionEnd,false);
			}
			if(s.params.isDisableBottom===false && s.bottomContainer){
				//绑定底部事件
				if(s.parent==document.body)window[action]("scroll",s.onWindowScroll,false);
				else s.parent[action]("scroll",s.onScroll,false);
				/*s.parent[action]("scroll",s.onScroll,false);*/
			}
		}
		//attach、detach事件
		s.attach=function(){
			s.events();
		};
		s.detach=function(){
			s.events(true);
		};

		//Touch信息
        s.touches={
        	direction:0,
        	vertical:0,
        	isTop:true,
        	startX:0,
        	startY:0,
        	currentX:0,
        	currentY:0,
        	endX:0,
        	endY:0,
        	diffX:0,
        	diffY:0,
        	posY:0,
        	rotateDeg:0
        };
        s.preventDefault=function(e){
			e.preventDefault();
		}
		s.onTouchStart=function(e){
			if(s.isRefreshEnd===false)return;

			s.parent.addEventListener("touchmove",s.preventDefault,false);
			//如果不在顶部，则不触发
			if(s.parent.scrollTop>s.params.minScrollTop)s.touches.isTop=false;
			else s.touches.isTop=true;

			//s.removeTransition();
			s.topContainer.style.webkitTransitionDuration="0ms";

			s.touches.startX=e.touches[0].clientX;
			s.touches.startY=e.touches[0].clientY;
		};
		
		s.onTouchMove=function(e){
			if(s.isRefreshEnd===false)return;

			s.touches.currentX=e.touches[0].clientX;
			s.touches.currentY=e.touches[0].clientY;
			s.touches.diffY=s.touches.currentY-s.touches.startY;
			s.touches.diffX=s.touches.startX-s.touches.currentX;

			//设置滑动方向(-1上下 | 1左右)
			if(s.touches.direction === 0) {
				s.touches.direction = Math.abs(s.touches.diffX) > Math.abs(s.touches.diffY) ? 1 : -1;
			}
			//设置垂直方向(-1上 | 1下)
			if (s.touches.direction === -1) {
				s.touches.vertical = s.touches.diffY < 0 ? 1 : -1;
			}
			
			if(s.touches.vertical==1 || !s.touches.isTop){//向上滑动或者不在顶部
				s.parent.removeEventListener("touchmove",s.preventDefault,false);	
			}else if(s.touches.vertical===-1){//下拉
				s.touches.posY=s.params.refreshHideTop+s.touches.diffY;
				if(s.touches.posY<s.params.thresholdMax){
					s.touches.rotateDeg=s.touches.posY*2;
					//s.transform(s.touches.posY,s.touches.rotateDeg);
					s.topContainer.style.webkitTransform='translate3d(0,' + s.touches.posY + 'px,0) rotate(' + s.touches.rotateDeg + 'deg)';
				}
			}
		};
		s.onTouchEnd=function(e){
			//清除move时记录的方向
			s.touches.direction=0;
			s.touches.vertical=0;

			if(s.isRefreshEnd===false)return;

			s.parent.removeEventListener("touchmove",s.preventDefault,false);
			if(s.touches.posY!=0){//下拉情况下
				if(s.touches.posY<s.params.threshold){//如果小于hold值，则收起刷新
					s.hide();
				}else{//刷新
					s.refresh();
				}
				//标识是否刷新结束，防止重复下拉
				s.isRefreshEnd=false;
			}
		};
		s.onTransitionEnd=function(e){
			if(s.isHid===false){
				s.spinner();
			}else if(s.isHid===true){
				s.isRefreshEnd=true;
			}
		}
		s.onScroll=function(e){
			s.target=e.target;
			if(s.params.onScroll)s.params.onScroll(s);
			if (s.params.onBottom && this.scrollTop + this.clientHeight >= this.scrollHeight){
                s.params.onBottom(s);
            }
		}
		s.onWindowScroll=function(e){
			var clientHeight=window.innerHeight; 
	        var scrollTop=document.body.scrollTop;
	        var scrollHeight=document.body.scrollHeight;
	        if(s.params.onBottom && clientHeight+scrollTop>=scrollHeight){
	            s.params.onBottom(s);
	        }
		}
		//主函数
		s.init=function(){
			s.attach();
		};

		s.init();
	};
})(window,document,undefined);