(function(window,document,undefined){
	window.Indexbar=function(container,params){
		/*=========================
          Params
          ===========================*/
		var defaults={
			"indexbarActiveClass":"active",
			"indexActiveClass":"active",
			"tooltipClass":"indexbar-tooltip"

			/*callbacks
			onInit:function(Indexbar)
			onSlideChangeStart:function(Indexbar)
			onSlideChangeEnd:function(Indexbar)
			*/
		}
		params=params||{};
		for(var def in defaults){
			if(params[def]===undefined){
				params[def]=defaults[def];
			}
		}
		//Indexbar
		var s=this;

		//Params
		s.params = params;

		//Container
		s.container=typeof container=="string"?document.querySelector(container):container;
		if(!s.container)return;

		//Section
		s.section=s.container.parentNode;

		//Article
		s.article=s.section.querySelector("article");
		
		//Indexs
		s.indexs=s.container.querySelectorAll("a");
		s.indexHeight=s.article.clientHeight/s.indexs.length;
		[].slice.call(s.indexs).forEach(function(n,i,a){
			n.style.height=s.indexHeight+"px";
			n.style.lineHeight=s.indexHeight+"px";
		})

		//Tooltip
		s.tooltip=s.section.querySelector("."+s.params.tooltipClass);

		//Controller
		/*=========================
          Touch Events
          ===========================*/
		//body事件绑定
		var touchTarget=document.body;
		s.bodyEvents=function(detach){
			var action=detach?"removeEventListener":"addEventListener";
			touchTarget[action]("touchmove",s.onTouchMove,false);
			touchTarget[action]("touchend",s.onTouchEnd,false);
			touchTarget[action]("touchcancel",s.onTouchEnd,false);
		}
		//attach、dettach事件
		s.bodyAttach=function(event){
			s.bodyEvents();
		}
		s.bodyDetach=function(event){
			s.bodyEvents(true);
		}
		/*=========================
          Touch Handler
          ===========================*/
        //Touch信息
        s.touches={
        	startX:0,
        	startY:0,
        	currentX:0,
        	currentY:0,
        	endX:0,
        	endY:0
        };
        //索引
        function preventDefault(e){
			e.preventDefault();
		}
		s.onTouchMove=function(e){
			s.touches.currentY=e.touches[0].clientY;
			s.goIndex(s.touches.currentY);
		};
		s.onTouchEnd=function(e){
			touchTarget.removeEventListener("touchmove",preventDefault,false);
			s.bodyDetach();
			//移除激活indexbar
			s.container.classList.remove(s.params.indexbarActiveClass);
		};
		s.container.addEventListener("touchstart",function(e){
			touchTarget.addEventListener("touchmove",preventDefault,false);
			s.touches.startX=e.touches[0].clientX;
			s.touches.startY=e.touches[0].clientY;
			//给body绑定触摸事件
			s.bodyAttach();
			//滚动到指定位置
			s.goIndex(s.touches.startY);
			//激活indexbar
			s.container.classList.add(s.params.indexbarActiveClass);
		},false);
		/*=========================
          Method
          ===========================*/
        s.indexHTML="A";
        s.goIndex=function(y){
        	//修改文字
        	s.index=document.elementFromPoint(s.touches.startX,y);
        	if(s.index.parentNode!=s.container)return;
        	s.indexHTML=s.index.innerHTML;
        	s.tooltip.innerHTML=s.indexHTML;
        	s.indexLI=s.section.querySelector('[data-index='+s.indexHTML+']');
        	//移动位置
        	if(s.indexLI)s.article.scrollTop=s.indexLI.offsetTop;
        }
	}
})(window,document,undefined);