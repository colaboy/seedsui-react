//Indexbar 索引控件
(function(window,document,undefined){
	window.Indexbar=function(container,params){
		/*=========================
          Params
          ===========================*/
		var defaults={
			"indexbarClass":"indexbar",
			"indexbarActiveClass":"active",
			"indexActiveClass":"active",
			"toolTipClass":"indexbar-tooltip",
			"indexlistClass":"indexlist"
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

		//IndexList
		s.indexList=s.container.querySelector("."+s.params.indexlistClass);

		//IndexbarContainer
		s.indexBar,s.toolTip;
		s.createIndexBar=function(){
			var indexBar=document.createElement("div")
            indexBar.setAttribute("class",s.params.indexbarClass);
            return indexBar;
		}
		var arrIndexChar=["A","B","C","D","E","F","G","H","I","G","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
		s.createIndexs=function(){
			var indexs=[];
			arrIndexChar.forEach(function(n,i,a){
				var indexChar=document.createElement("a");
				indexChar.innerHTML=n;
				indexs.push(indexChar);
			});
            return indexs;
		}
		s.createToolTip=function(){
			var toolTip=document.createElement("div")
            toolTip.setAttribute("class",s.params.toolTipClass);
            return toolTip;
		}
		s.create=function(){
			s.indexBar=s.createIndexBar();
			s.indexs=s.createIndexs();
			s.indexs.forEach(function(n,i,a){
				s.indexBar.appendChild(n);
			});
			s.toolTip=s.createToolTip();
			s.container.appendChild(s.indexBar);
			s.container.appendChild(s.toolTip);
		}
		s.create();

		//Indexs
		s.indexs=s.indexBar.querySelectorAll("a");
		s.updateContainerSize=function(){
			s.indexHeight=s.indexBar.clientHeight/s.indexs.length;
			[].slice.call(s.indexs).forEach(function(n,i,a){
				n.style.height=s.indexHeight+"px";
				n.style.lineHeight=s.indexHeight+"px";
			})
		}
		s.updateContainerSize();

		//Tooltip
		s.tooltip=s.indexBar.parentNode.querySelector("."+s.params.toolTipClass);


		//Controller
		/*=========================
          Touch Events
          ===========================*/
		//body事件绑定
		var touchTarget=s.container;
		s.events=function(detach){
			var action=detach?"removeEventListener":"addEventListener";
			touchTarget[action]("touchmove",s.onTouchMove,false);
			touchTarget[action]("touchend",s.onTouchEnd,false);
			touchTarget[action]("touchcancel",s.onTouchEnd,false);
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
			s.detach();
			//移除激活indexbar
			s.indexBar.classList.remove(s.params.indexbarActiveClass);
		};
		s.indexBar.addEventListener("touchstart",function(e){
			touchTarget.addEventListener("touchmove",preventDefault,false);
			s.touches.startX=e.touches[0].clientX;
			s.touches.startY=e.touches[0].clientY;
			//给body绑定触摸事件
			s.attach();
			//滚动到指定位置
			s.goIndex(s.touches.startY);
			//激活indexbar
			s.indexBar.classList.add(s.params.indexbarActiveClass);
		},false);
		/*=========================
          Method
          ===========================*/
        s.indexHTML="A";
        s.goIndex=function(y){
        	//修改文字
        	s.index=document.elementFromPoint(s.touches.startX,y);
        	if(!s.index.parentNode || s.index.parentNode!=s.indexBar)return;
        	s.indexHTML=s.index.innerHTML;
        	s.tooltip.innerHTML=s.indexHTML;
        	s.indexLI=s.container.querySelector('[data-index='+s.indexHTML+']');
        	//移动位置
        	if(s.indexLI)s.indexList.scrollTop=s.indexLI.offsetTop-s.indexList.offsetTop;
        }
	}
})(window,document,undefined);