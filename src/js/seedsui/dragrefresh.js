//Dragrefresh 下拉刷新
(function(window,document,undefined){
	window.Dragrefresh=function(params){
		/*==================
		  Model
		  ==================*/
		var defaults={
			overflowContainer:document.body,
			baseline:0,
			threshold:100,
			duration:150,

			topContainer:null,
			bottomContainer:null,
			bottomRefreshDelay:1000

			/*callbacks
			onPull:function(Dragrefresh)//头部拖动中
			onShowTop:function(Dragrefresh)//开发显示头部
			onHideTop:function(Dragrefresh)//开始隐藏头部
			onTopShowed(Dragrefresh)//头部显示动画结束
            onTopHid(Dragrefresh)//头部隐藏动画结束

            onTopRefresh:function(Dragrefresh)//头部刷新
			onTopComplete:function(Dragrefresh)//头部完成加载
			onTopNoData:function(Dragrefresh)//头部无数据

			onBottomRefresh:function(Dragrefresh)//底部刷新
			onBottomComplete:function(Dragrefresh)//底部完成加载
			onBottomNoData:function(Dragrefresh)//底部无数据
			
			onTransitionEnd:function(Dragrefresh)//头部动画结束
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
		//Container
		s.overflowContainer=typeof s.params.overflowContainer=="string"?document.querySelector(s.params.overflowContainer):s.params.overflowContainer;
		if(!s.overflowContainer){
			console.log("SeedsUI Error : overflowContainer不存在，请检查页面中是否有此元素");
			return;
		}
		//topContainer
		s.topContainer=typeof s.params.topContainer=="string"?document.querySelector(s.params.topContainer):s.params.topContainer;
		if(!s.topContainer){
			console.log("SeedsUI Warn : topContainer不存在，请检查页面中是否有此元素");
		}
		//bottomContainer
		s.bottomContainer=typeof s.params.bottomContainer=="string"?document.querySelector(s.params.bottomContainer):s.params.bottomContainer;
		if(!s.bottomContainer){
			console.log("SeedsUI Warn : bottomContainer不存在，请检查页面中是否有此元素");
		}
		/*==================
		  Mothod
		  ==================*/
		s.isHid=false;
		//隐藏
		s.hideTop=function(){
			s.topContainer.style.webkitTransitionDuration=s.params.duration+"ms";
			s.touches.posY=s.params.baseline;
			s.touches.currentPosY=s.params.baseline;
			s.isTopRefreshing=false;//标识正在刷新状态清除
			s.isHid=true;
			//标识头部正在拖动
			s.isOnPull=false;
			//实体操作
			if(s.params.onHideTop)s.params.onHideTop(s);
		};
		//显示
		s.showTop=function(){
			s.topContainer.style.webkitTransitionDuration=s.params.duration+"ms";
			s.touches.posY=s.params.threshold;
			s.touches.currentPosY=s.params.baseline;
			s.isHid=false;
			//实体操作
			if(s.params.onShowTop)s.params.onShowTop(s);
		};
		//销毁对象
		s.destroyTop=function(){
			s.overflowContainer.removeChild(s.topContainer);
		};
		s.destroyBottom=function(){
			s.overflowContainer.removeChild(s.bottomContainer);
		};
		s.destroy=function(){
			s.destroyTop();
			s.destroyBottom();
			//销毁事件
			s.detach();
		};
		//是否有滚动条
		s.hasScroll=function(){
			var clientHeight=s.overflowContainer.clientHeight || window.innerHeight;
			var scrollHeight=s.overflowContainer.scrollHeight || document.body.scrollHeight;
			var scrollTop=s.overflowContainer.scrollTop || document.body.scrollTop;
			//console.log(clientHeight+":"+scrollHeight+":"+scrollTop);

			if(clientHeight == scrollHeight){
				return false;
            }
            return true;
		};
		//头部刷新完成
		s.topComplete=function(){
			if(!s.topContainer)return;
			//收起
			s.hideTop();
			//底部刷新又有数据了
			s.isBottomNoData=false;
			//Callback onTopComplete
			if(s.params.onTopComplete){
				s.params.onTopComplete(s);
			}
			//如果没有滚动条，则刷新底部数据
			if(!s.hasScroll()){
				s.onBottomRefresh();
			}
		};
		//头部刷新无数据
		s.topNoData=function(){
			if(!s.topContainer)return;
			//收起
			s.hideTop();
			//头部刷新无数据，底部肯定也没有数据
			s.isTopRefreshing=false;
			s.isBottomNoData=true;
			s.isBottomRefreshing=false;
			//Callback onTopNoData
			if(s.params.onTopNoData){
				s.params.onTopNoData(s);
			}
		};
		//底部刷新完成
		s.bottomComplete=function(){
			if(!s.bottomContainer)return;
			//标识底部刷新状态
			s.isBottomRefreshing=false;
			//Callback onBottomComplete
			if(s.params.onBottomComplete){
				s.params.onBottomComplete(s);
			}
			//如果没有滚动条，则再次刷新
			if(!s.hasScroll()){
				s.onBottomRefresh();
			}
		};
		//底部刷新无数据
		s.bottomNoData=function(){
			if(!s.bottomContainer)return;
			//标识底部刷新状态
			s.isBottomNoData=true;
			s.isBottomRefreshing=false;
			//Callback onBottomNoData
			if(s.params.onBottomNoData){
				s.params.onBottomNoData(s);
			}
		};
		/*==================
		  Controller
		  ==================*/
		s.events=function(detach){
			var action=detach?"removeEventListener":"addEventListener";
			var touchTarget=s.overflowContainer;
			if(s.topContainer){
				s.overflowContainer[action]("touchstart",s.onTouchStart,false);
				s.overflowContainer[action]("touchmove",s.onTouchMove,false);
				s.overflowContainer[action]("touchend",s.onTouchEnd,false);
				s.overflowContainer[action]("touchcancel",s.onTouchEnd,false);
				//头部动画监听
				s.topContainer[action]("webkitTransitionEnd",s.onTransitionEnd,false);
			}
			if(s.bottomContainer){
				//绑定底部事件，区分一般容器和body
				if(touchTarget==document.body){
					touchTarget=window;
				}
				touchTarget[action]("scroll",s.onScroll,false);
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
        	currentPosY:0
        };
        s.preventDefault=function(e){
			e.preventDefault();
		}
		s.onTouchStart=function(e){
			s.overflowContainer.addEventListener("touchmove",s.preventDefault,false);
			//如果不在顶部，则不触发
			if(s.overflowContainer.scrollTop>0)s.touches.isTop=false;
			else s.touches.isTop=true;

			s.topContainer.style.webkitTransitionDuration="0ms";

			s.touches.startX=e.touches[0].clientX;
			s.touches.startY=e.touches[0].clientY;
		};
		//标识头部正在拖动
		s.isOnPull=false;
		s.onTouchMove=function(e){
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
			//在顶部下拉
			if(s.touches.isTop && s.touches.vertical==-1){
				s.overflowContainer.addEventListener("touchmove",s.preventDefault,false);
				s.touches.currentPosY=s.touches.posY+s.touches.diffY;
				//实体操作
				if(s.params.onPull)s.params.onPull(s);
				//标识头部正在拖动
				s.isOnPull=true;
			}else{
				s.overflowContainer.removeEventListener("touchmove",s.preventDefault,false);
			}
		};
		s.onTouchEnd=function(e){
			//清除move时记录的方向
			s.touches.direction=0;
			s.touches.vertical=0;
			//下拉的情况
			if(s.touches.currentPosY>0){
				if(s.touches.currentPosY>s.params.threshold){//如果大于hold值，则展示
					s.showTop();
				}else{//小于则收起
					s.hideTop();
				}
			}
		};
		s.isTopRefreshing=false;
		s.onTransitionEnd=function(e){
			if(e.target!=s.topContainer || e.propertyName=="visibility")return;
			//有效的显示状态
			if(s.touches.posY==s.params.threshold && s.isTopRefreshing==false){
				//标识正在刷新，防止重复刷新
				s.isTopRefreshing=true;

				//CallBack onTopRefresh
				if(s.params.onTopRefresh)s.params.onTopRefresh(s);
			}

			//显示与隐藏的回调
			//Callback onTransitionEnd
            if(s.params.onTransitionEnd)s.params.onTransitionEnd(s);
            if(s.isHid){
                //Callback onTopHid
                if(s.params.onTopHid)s.params.onTopHid(s);
            }else{
                //Callback onTopShowed
                if(s.params.onTopShowed)s.params.onTopShowed(s);
            }
		};
		s.isBottomNoData=false;
		s.isBottomRefreshing=false;
		s.onScroll=function(e){
			var clientHeight=this.clientHeight || window.innerHeight;
			var scrollHeight=this.scrollHeight || document.body.scrollHeight;
			var scrollTop=this.scrollTop || document.body.scrollTop;

			if(scrollTop + clientHeight >= scrollHeight-2){
				s.onBottomRefresh();
            }
		}
		s.onBottomRefresh=function(){
			//优先保证头部刷新
			if(s.isBottomNoData || s.isBottomRefreshing || s.isOnPull || s.isTopRefreshing)return;

			s.isBottomRefreshing=true;
			//CallBack onBottomRefresh
            if(s.params.onBottomRefresh)s.params.onBottomRefresh(s);
		}
		//主函数
		s.init=function(){
			s.attach();
		};

		s.init();
	};
})(window,document,undefined);