//Dragrefresh 下拉刷新
(function(window,document,undefined){
	window.Dragrefresh=function(container,params){
		/*==================
		  Model
		  ==================*/
		var defaults={
			"minScrollTop":0,
			"refreshThreshold":100,
			"refreshThresholdMax":100,
			"refreshHideTop":0,
			"duration":150,
			"timeout":5000,

			"bottomContainerClass":"loading-more",
			"bottomContainerLoadingClass":"loading",

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
		s.params.refreshThresholdMax=s.params.refreshThreshold+s.params.refreshThresholdMax;
		//Container
		s.container=typeof container=="string"?document.querySelector(container):container;
		//创建DOM
		s.createRefresh=function(){
			if(s.topContainer)return;
			s.topContainer=document.createElement("div");
			s.topContainer.setAttribute("class","dragrefresh box box-middlecenter");
			var iconSvg='<svg width="1000.6px" height="1000.6px" viewBox="0 0 1000.6 1000.6" xml:space="preserve">'+
						'<path d="M867.4,456.1c-24.1,0-43.8,19.7-43.8,43.8c0,1.5,0.1,3.1,0.3,4.6c-2.2,176.4-147.1,319.6-323.7,319.6 c-178.5,0-323.8-145.3-323.8-323.8s145.3-323.8,323.8-323.8c62.8,0,122.8,17.7,174.4,50.8l-29,52.2c0,0,138.4,2.2,149.2,2.4 c10.8,0.2,14.6-5.6,14.6-5.6s5.1-5.8,2.4-15.5c-2.6-9.7-43.2-162.2-43.2-162.2l-38.5,61.1c-67.3-45.7-146.7-70.1-229.8-70.1 c-226.6,0-411,184.4-411,411s184.4,411,411,411c225.8,0,410.1-183.7,410.9-407.3l0.2-4.2C911.2,475.7,891.6,456.1,867.4,456.1z"/>'+
						'</svg>';
			s.topContainer.innerHTML=iconSvg;
			s.container.appendChild(s.topContainer);
		};
		s.createRefresh();
		s.bottomContainer=null;
		s.createBottomContainer=function(){
			s.bottomContainer=s.container.querySelector("."+s.params.bottomContainerClass);
			if(!s.bottomContainer){
				s.bottomContainer=document.createElement("div");
				s.bottomContainer.setAttribute("class",s.params.bottomContainerClass);
				var spinnerdiv=document.createElement("div");
				spinnerdiv.setAttribute("class",s.params.bottomContainerLoadingClass);
				s.bottomContainer.appendChild(spinnerdiv);
				s.container.appendChild(s.bottomContainer);
			}
		}
		if(s.params.onBottom)s.createBottomContainer();

		/*==================
		  Mothod
		  ==================*/
		//添加动画
		s.addTransition=function(duration){
			if(!duration)duration=s.params.duration;
			s.topContainer.style.webkitTransitionDuration=duration+"ms";
		};
		//移除动画
		s.removeTransition=function(){
			s.topContainer.style.webkitTransitionDuration="0ms";
		};
		//变形
		s.transform=function(y,deg){
			if(!y)y=s.touches.posY;
			if(!deg)deg=s.touches.rotateDeg;
			s.topContainer.style.WebkitTransform='translate3d(0,' + y + 'px,0) rotate(' + deg + 'deg)';
		}
		//旋转,10W毫秒，旋转4万6千度
		s.spinner=function(){
			s.addTransition("100000");
			s.transform(null,"46000");
		};
		s.cancelSpinner=function(){
			s.removeTransition();
			s.transform(null,"0");
		};
		//隐藏
		s.hide=function(){
			//停止旋转
			s.cancelSpinner();
			//收起
			s.addTransition();
			s.touches.posY=s.params.refreshHideTop;
			s.transform(s.touches.posY,s.touches.rotateDeg);

			s.showed=false;
		};
		s.showed=false;
		//显示
		s.show=function(){
			//收到指定位置
			s.addTransition();
			s.touches.posY=s.params.refreshThreshold;
			s.transform(s.touches.posY);

			s.showed=true;
			//开始旋转
			/*setTimeout(function(){
				alert("开始旋转");
				s.spinner();
			}, s.params.duration);*/
		}
		//销毁对象
		s.destoryTop=function(){
			s.container.removeChild(s.topContainer);
		}
		s.destoryBottom=function(){
			s.container.removeChild(s.bottomContainer);
			s.params.onBottom==null;
		}
		s.destory=function(){
			s.destoryTop();
			s.destoryBottom();
			//销毁事件
			s.touchDetach();
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
			//重新绑定事件
			if(s.isAttached==false)s.touchAttach();
		}
		//Callback 刷新超时
		s.refreshTimeout=function(){
			s.hide();
			s.params.onRefreshTimeout(s);
			//重新绑定事件
			if(s.isAttached==false)s.touchAttach();
		};

		/*==================
		  Controller
		  ==================*/
		s.isAttached=true;
		//结束时需要取消绑定的事件
		s.touchEvents=function(detach){
			var touchTarget=s.container;
			var action=detach?"removeEventListener":"addEventListener";
			touchTarget[action]("touchstart",s.onTouchStart,false);
			touchTarget[action]("touchmove",s.onTouchMove,false);
			touchTarget[action]("touchend",s.onTouchEnd,false);
			touchTarget[action]("touchcancel",s.onTouchEnd,false);
		}
		//一直监听的事件
		s.events=function(detach){
			//头部动画事件
			var action=detach?"removeEventListener":"addEventListener";
			s.topContainer[action]("webkitTransitionEnd",s.onTransitionEnd,false);
			//绑定底部事件
			if(s.bottomContainer)s.container[action]("scroll",s.onScroll,false);
		}
		//attach、detach事件
		s.touchAttach=function(){
			s.isAttached=true;
			s.touchEvents();
		};
		s.touchDetach=function(){
			s.isAttached=false;
			s.touchEvents(true);
		};
		s.attach=function(){
			s.events();
		}
		s.detach=function(){
			s.events(true);
		}

		//Touch信息
        s.touches={
        	direction:null,
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
			s.container.addEventListener("touchmove",s.preventDefault,false);
			//如果不在顶部，则不触发
			if(s.container.scrollTop>s.params.minScrollTop)s.touches.isTop=false;
			else s.touches.isTop=true;
			s.removeTransition();
			s.touches.startX=e.touches[0].clientX;
			s.touches.startY=e.touches[0].clientY;
		};
		
		s.onTouchMove=function(e){
			s.touches.currentX=e.touches[0].clientX;
			s.touches.currentY=e.touches[0].clientY;
			s.touches.diffY=s.touches.currentY-s.touches.startY;
			s.touches.diffX=s.touches.startX-s.touches.currentX;
			//设置滑动方向
			if(s.touches.direction==null){
				s.touches.direction=s.touches.diffY<0?"down":"up";
			}
			//不能下拉刷新
			if(s.touches.direction=="down" || !s.touches.isTop){
				s.container.removeEventListener("touchmove",s.preventDefault,false);	
				return;
			}
			//下拉刷新
			s.touches.posY=s.params.refreshHideTop+s.touches.diffY;
			if(s.touches.posY<s.params.refreshThresholdMax){
				s.touches.rotateDeg=s.touches.posY*2;
				s.transform(s.touches.posY,s.touches.rotateDeg);
			}
		};
		s.onTouchEnd=function(e){
			s.container.removeEventListener("touchmove",s.preventDefault,false);

			s.touches.direction=null;
			//如果小于hold值，则收起刷新
			if(s.touches.posY<s.params.refreshThreshold){
				s.hide();
				return;
			}
			//刷新
			s.refresh();
			//移除滑动事件绑定，否则会在刷新过程中重新触发下拉刷新
			s.touchDetach();
		};
		s.onTransitionEnd=function(e){
			if(s.showed==true){
				s.spinner();
			}
		}
		s.onScroll=function(e){
			s.target=e.target;
			if(s.params.onScroll)s.params.onScroll(s);
			if (s.params.onBottom && this.scrollTop + this.clientHeight >= this.scrollHeight){
                s.params.onBottom(s);
            }
		}
		//主函数
		s.init=function(){
			s.touchAttach();
			s.attach();
		};

		s.init();
	};
})(window,document,undefined);