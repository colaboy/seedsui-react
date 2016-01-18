(function(window,document,undefined){
	'use strict';
	window.Slider=function(container,params){
		//Model
		/*=========================
          Params
          ===========================*/
		var defaults={
			"pagination":null,
			"autoplay":false,
			"loop":false,
			"slidesPerView":1,
			"spaceBetween":10,

			//dom class
			"wrapperClass":"slider-wrapper",
			"slideClass":"slider-slide",
			"slideActiveClass":"active",
			"bulletClass":"bullet",
			"bulletActiveClass":"active"

			/*callbacks
			onInit:function(Slider)
			onSlideChangeStart:function(Slider)
			onSlideChangeEnd:function(Slider)
			*/
		}
		params=params||{};
		for(var def in defaults){
			if(params[def]===undefined){
				params[def]=defaults[def];
			}
		}
		//Slider
		var s=this;

		//Params
		s.params = params;

		//Container,Wrapper,Slides和Pagination
		s.container=document.querySelector(container);
		s.wrapper=document.querySelector(container+" > ."+s.params.wrapperClass);
		s.slide=document.querySelectorAll(container+" > ."+s.params.wrapperClass+" > ."+s.params.slideClass+"");
		if(s.slide.length<=0){
			return;
		}
		//Container width
		s.container.width=s.container.clientWidth;

		//View
		/*=========================
          Pagination
          ===========================*/
        s.updatePagination = function () {
            if (!s.params.pagination) return;
            s.pagination=document.querySelector(s.params.pagination);
			for(var bulletnum=0;bulletnum<s.slide.length;bulletnum++){
				var bullet=document.createElement("span");
				bullet.setAttribute("class",s.params.bulletClass);
				if(bulletnum==s.index){
					bullet.setAttribute("class",s.params.bulletClass+" "+s.params.bulletActiveClass);
				}
				s.pagination.appendChild(bullet);
			}
			s.bullet=s.pagination.querySelectorAll("."+s.params.bulletClass);
        };
        /*=========================
          Slides
          ===========================*/
		s.updateSlidesSize=function(){
			//Slide width
			s.width=Math.floor(s.container.width/s.params.slidesPerView);
			if(s.container.clientHeight<=0){
				setTimeout(function(){
					s.height=s.wrapper.clientHeight;
					s.container.style.height=s.height+"px";
				}, 50);
			}else{
				s.height=s.container.clientHeight;
			}
			s.wrapper.width=s.width*s.slide.length;
			s.wrapper.style.width=s.wrapper.width+"px";

			for(var i=0;i<s.slide.length;i++){
				s.slide[i].style.width=s.width+"px";
				s.slide[i].style.height=s.height+"px";
			}
		};
        /*=========================
          Classes
          ===========================*/
        s.updateClasses = function () {
        	//Slide
        	for(var i=0;i<s.slide.length;i++){
				s.slide[i].className=s.slide[i].className.replace(/\s{1,}active/,"");
			}
			s.slide[s.index].className+=" "+s.params.slideActiveClass;
			// Pagination
			if(s.bullet && s.bullet.length>0){
				for(var i=0;i<s.bullet.length;i++){
					s.bullet[i].className=s.bullet[i].className.replace(/\s{1,}active/,"");
				}
				s.bullet[s.index].className+=" "+s.params.bulletActiveClass;
			}
        };
        /*=========================
          Loop
          ===========================*/
        s.updateLoop = function () {
        	if(!s.params.loop)return;
        	/*var firstChild=s.slide[0].cloneNode(true);
        	var lastChild=s.slide[s.slide.length-1].cloneNode(true);
        	s.wrapper.appendChild(firstChild);
        	s.wrapper.insertBefore(lastChild,s.wrapper.childNodes[0]);
        	s.slide=document.querySelectorAll(container+" > ."+s.params.wrapperClass+" > ."+s.params.slideClass+"");*/
        };
        s.destroyLoop = function () {
            
        };
        s.view = function(){
    		s.updateSlidesSize();
    		s.updateLoop();
        	s.updatePagination();
        	s.updateClasses();
    		s.startAutoplay();
        };

        //Controller
		/*=========================
          Touch Events
          ===========================*/
		var touchEvents={
			"start":"touchstart",
			"move":"touchmove",
			"end":"touchend"
		}
		//绑定事件
		s.events=function(detach){
			var touchTarget=s.container;
			var action=detach?"removeEventListener":"addEventListener";
			touchTarget[action](touchEvents.start,s.onTouchstart,false);
			touchTarget[action](touchEvents.move,s.onTouchmove,false);
			touchTarget[action](touchEvents.end,s.onTouchend,false);
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
        	endY:0,
        	diff:0,
        	posX:0
        };
        //索引
        s.index=0;
        //Handler
		s.onTouchstart=function(e){
			s.touches.startX=e.touches[0].clientX;
			s.touches.startY=e.touches[0].clientY;
			e.stopPropagation();
			//关闭自动播放
			s.stopAutoplay();
			//runCallBacks
			if(s.params.onSlideChangeStart)s.params.onSlideChangeStart(s);
		};
		s.onTouchmove=function(e){
			s.touches.currentX=e.touches[0].clientX;
			s.touches.currentY=e.touches[0].clientY;
			s.touches.diff=s.touches.startX-s.touches.currentX;
			var diffY=s.touches.startY-s.touches.currentY;
			//判断是否是边缘
			var moveX=s.touches.posX-s.touches.diff;
			if((moveX>0 || moveX-s.container.width<-s.wrapper.width)&& !s.params.loop){
				return;
			}
			s.wrapper.style.left=moveX+"px";
			e.stopPropagation();
		};
		s.onTouchend=function(e){
			//判断拉动方向
			if(s.touches.diff/s.width>=0.5){
				//下一页
				s.index++;
			}else if(s.touches.diff/s.width<=-0.5){
				//上一页
				s.index--;
			}
			s.slideTo();
			e.stopPropagation();
			//开启自动播放
			s.startAutoplay();
		};
		/*=========================
          Autoplay
          ===========================*/
        s.startAutoplay = function () {
        	if(!s.params.autoplay)return;
			s.autoplayer=window.setInterval(function(){
				s.index++;
				if(s.index>=s.slide.length){
					s.index=0;
				}
				s.slideTo(s.index);
			},s.params["autoplay"]);
        };

        s.stopAutoplay = function (internal) {
        	if(s.autoplayer){
        		window.clearInterval(s.autoplayer);
        	}
        };

		/*=========================
          Method
          ===========================*/
        s.slideTo=function(slideIndex){
        	var duration="300";
        	if(slideIndex){
				s.index=slideIndex;
			}

			if(s.index<0){
				s.index=0;
			}
			if(s.index>s.slide.length-1){
				s.index=s.slide.length-1;
			}
			if(s.params.slidesPerView>1 && s.index>s.slide.length-params.slidesPerView && !s.params.loop){
				s.index=s.slide.length-s.params.slidesPerView;
			}
			s.touches.posX=-s.index*s.width;
			//更新class
			s.updateClasses();
			//移动至index
			s.wrapper.style.webkitTransitionDuration=duration+"ms";
			s.wrapper.style.left=s.touches.posX+"px";
			s.wrapper.addEventListener("transitionend",function(){
				this.style.webkitTransitionDuration="0ms";
				//runCallBacks
				if(s.params.onSlideChangeEnd)s.params.onSlideChangeEnd(s);
			},false);
        };

		//主函数
		s.init=function(){
			s.view();
			s.attach();
		}
		//执行主函数
		s.init();
	}
	Slider.prototype={
		preventHandler:function(e){
			e.preventDefault()
		},
		support:{
			touch:(function(){return 'ontouchstart' in window})(),
			animationend:(function(){return 'onanimationend' in window})(),
			transitionend:(function(){return 'transitionend' in window})(),
		}
	}
})(window,document,undefined)