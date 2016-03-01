(function(window,document,undefined){
	'use strict'
	window.Dragrefresh=function(container,params){
		/*==================
		  Model
		  ==================*/
		var defaults={
			"refreshThreshold":50,
			"refreshThresholdMax":150,
			"refreshHideTop":-58,
			"duration":300,
			"overtime":5000

			/*callbacks
			onRefresh:function(Dragrefresh)
			onRefreshComplete:function(Dragrefresh)
			onRefreshOvertime:function(Dragrefresh)

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
		s.container=typeof container=="string"?document.querySelector(container):container;

		/*==================
		  View Refresh
		  ==================*/
		s.createRefresh=function(){
			if(s.refreshEl)return;
			s.refreshEl=document.createElement("div");
			s.refreshEl.setAttribute("class","dragrefresh box box-middlecenter");
			var iconSvg='<svg width="1000.6px" height="1000.6px" viewBox="0 0 1000.6 1000.6" xml:space="preserve">'+
						'<path d="M867.4,456.1c-24.1,0-43.8,19.7-43.8,43.8c0,1.5,0.1,3.1,0.3,4.6c-2.2,176.4-147.1,319.6-323.7,319.6 c-178.5,0-323.8-145.3-323.8-323.8s145.3-323.8,323.8-323.8c62.8,0,122.8,17.7,174.4,50.8l-29,52.2c0,0,138.4,2.2,149.2,2.4 c10.8,0.2,14.6-5.6,14.6-5.6s5.1-5.8,2.4-15.5c-2.6-9.7-43.2-162.2-43.2-162.2l-38.5,61.1c-67.3-45.7-146.7-70.1-229.8-70.1 c-226.6,0-411,184.4-411,411s184.4,411,411,411c225.8,0,410.1-183.7,410.9-407.3l0.2-4.2C911.2,475.7,891.6,456.1,867.4,456.1z"/>'+
						'</svg>';
			s.refreshEl.innerHTML=iconSvg;
			s.container.appendChild(s.refreshEl);
		};
		s.hideRefresh=function(){
			s.transition();
			s.touches.posY=s.params.refreshHideTop;
			s.refreshEl.style.top=s.touches.posY+"px";
		};
		s.preventDefault = function (e) {
			e.preventDefault();
        };
        s.addPreventDefault = function (e) {
			document.addEventListener("touchmove",s.preventDefault,false);
        };
        s.removePreventDefault = function (e) {
			document.removeEventListener("touchmove",s.preventDefault,false);
        };
		/*==================
		  Refresh Animate
		  ==================*/
		s.transition=function(){
			s.refreshEl.style.transition=s.params.duration+"ms";
		};
		s.cancelTransition=function(){
			s.refreshEl.style.transition="0ms";
		};

		s.spinner=function(){
			s.rotate+=10;
			if(s.rotate>=360){
				s.rotate=0;
			}
			s.refreshEl.style.transform="rotate("+s.rotate+"deg)";
			s.rAf=s.requestAnimationFrame(s.spinner);
		};
		s.cancelSpinner=function(){
			s.cancelAnimationFrame(s.rAf);
		};

		//View
		s.view=function(){
			s.createRefresh();
		};

		//Controller
		/*==================
		  Callback onRefresh
		  ==================*/
		s.refresh=function(){
			s.transition();
			s.refreshEl.style.top=s.params.refreshThreshold+"px";
			setTimeout(function(){
				s.cancelTransition();
				s.spinner();
			}, s.params.duration);
			//callback onRefresh
			if(s.params.onRefresh){
				s.params.onRefresh(s);
			}
			//callback onOvertime
			if(s.params.onRefreshOvertime){
				s.refreshOvertime();
			}
		};
		/*==================
		  Callback onRefreshComplete
		  ==================*/
		s.refreshComplete=function(){
			s.cancelOvertime();
			s.cancelSpinner();
			s.hideRefresh();
			s.attach();
			//callback onRefreshComplete
			if(s.params.onRefreshComplete){
				s.params.onRefreshComplete(s);
			}
		}
		/*==================
		  Callback onRefreshOvertime
		  ==================*/
		s.refreshOvertime=function(){
			//callback onRefreshComplete
			s.overtime=setTimeout(function(){
				s.cancelSpinner();
				s.hideRefresh();
				s.attach();
				s.params.onRefreshOvertime(s);
			}, s.params.overtime);
		};
		s.cancelOvertime=function(){
			if(s.overtime)window.clearTimeout(s.overtime);
		};

		/*==================
		  Callback onBottom
		  ==================*/
		s.bottomRefreshEl=s.container.querySelector(".loading-more");
		function createBottomRefresh(){
			if(s.bottomRefreshEl)return;
			s.bottomRefreshEl=document.createElement("div");
			s.bottomRefreshEl.setAttribute("class","loading-more");
			var spinnerdiv=document.createElement("div");
			spinnerdiv.setAttribute("class","loading");
			s.bottomRefreshEl.appendChild(spinnerdiv);

			s.container.appendChild(s.bottomRefreshEl);
		}
		s.bottomRefresh=function(){
			if(!s.params.onBottom)return;
			//创建底部刷新块
			createBottomRefresh();
			//判断是否滚动到底部
			s.container.addEventListener("scroll",function(e){
	            if (this.scrollTop + this.clientHeight >= this.scrollHeight){
	                s.params.onBottom(s);
	            }
	        },false);
		};

		//事件管理
		var touchEvents={
			"start":"touchstart",
			"move":"touchmove",
			"end":"touchend"
		}
		s.events=function(detach){
			var touchTarget=s.container;
			var action=detach?"removeEventListener":"addEventListener";
			touchTarget[action](touchEvents.start,s.onTouchstart,false);
			touchTarget[action](touchEvents.move,s.onTouchmove,false);
			touchTarget[action](touchEvents.end,s.onTouchend,false);
		}
		//attach、detach事件
		s.attach=function(attachEvent){
			if(!attachEvent){
				s.events();
				return;
			}
			if(attachEvent=="start"){
				s.container["addEventListener"](touchEvents.start,s.onTouchstart,false);
			}
			if(attachEvent=="move"){
				s.container["addEventListener"](touchEvents.move,s.onTouchmove,false);
			}
			if(attachEvent=="end"){
				s.container["addEventListener"](touchEvents.end,s.onTouchend,false);
			}
		};
		s.detach=function(detachEvent){
			if(!detachEvent){
				s.events(true);
				return;
			}
			if(detachEvent=="start"){
				s.container["removeEventListener"](touchEvents.start,s.onTouchstart,false);
			}
			if(detachEvent=="move"){
				s.container["removeEventListener"](touchEvents.move,s.onTouchmove,false);
			}
			if(detachEvent=="end"){
				s.container["removeEventListener"](touchEvents.end,s.onTouchend,false);
			}
		};
		//Touch信息
        s.touches={
        	isTop:true,
        	startX:0,
        	startY:0,
        	currentX:0,
        	currentY:0,
        	endX:0,
        	endY:0,
        	diff:0,
        	posY:0
        };
		s.onTouchstart=function(e){
			//如果不在顶部，则不触发
			if(s.container.scrollTop>0){
				s.touches.isTop=false;
			}else{
				s.touches.isTop=true;
			}
			s.cancelTransition();
			s.touches.startX=e.touches[0].clientX;
			s.touches.startY=e.touches[0].clientY;
		};
		s.onTouchmove=function(e){
			s.touches.currentX=e.touches[0].clientX;
			s.touches.currentY=e.touches[0].clientY;
			s.touches.diff=s.touches.currentY-s.touches.startY;
			var diffX=s.touches.startX-s.touches.currentX;
			//判断头部、横向滚动、向上滚动，则不下拉刷新
			if(!s.touches.isTop || Math.abs(diffX) > Math.abs(s.touches.diff) || s.touches.diff<0){
				return;
			}
			s.addPreventDefault();
			s.touches.posY=s.params.refreshHideTop+s.touches.diff;
			if(s.touches.posY<s.params.refreshThresholdMax){
				s.rotate=s.touches.posY*2;
				s.refreshEl.style.transform="rotate("+s.rotate+"deg)";
				s.refreshEl.style.top=s.touches.posY+"px";
			}
		};
		s.onTouchend=function(e){
			s.removePreventDefault();
			//如果小于hold值，则收起刷新
			if(s.touches.posY<s.params.refreshThreshold){
				s.hideRefresh();
				return;
			}
			//刷新
			s.refresh();
			//移动事件绑定，否则会在刷新过程中重新触发下拉刷新
			s.detach();
		};
		
		//主函数
		s.init=function(){
			s.view();
			s.attach();
			//底部触发事件
			s.bottomRefresh();
		};

		s.init();
	};
	Dragrefresh.prototype={
		scrollTop:(function(){
			 return document.body.scrollTop;
		})(),
		requestAnimationFrame:function(callback){
			var rAF = window.requestAnimationFrame	||
			window.webkitRequestAnimationFrame	||
			window.mozRequestAnimationFrame		||
			window.oRequestAnimationFrame		||
			window.msRequestAnimationFrame		||
			function (callback) { window.setTimeout(callback, 1000 / 60); };
			var r=rAF(callback);
			return r;
		},
		cancelAnimationFrame:function(handler){
			var cAF = window.cancelAnimationFrame	||
			window.webkitCancelAnimationFrame	||
			window.mozCancelAnimationFrame		||
			window.oCancelAnimationFrame		||
			window.msCancelAnimationFrame		||
			function (handler) { window.clearTimeout(handler); };
			cAF(handler);
		},
	}
})(window,document,undefined)