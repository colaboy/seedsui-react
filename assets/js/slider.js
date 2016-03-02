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
			"slidesPerView":1,
			"threshold":"50",
			"duration":"300",

			//loop
			"loop":false,
			"slideDuplicateClass":'slider-slide-duplicate',

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
            if (s.paginationContainer && s.paginationContainer.length > 0) {
                var bulletsHTML = '';
                var numberOfBullets = s.params.loop ? s.slides.length - s.loopedSlides * 2 : s.snapGrid.length;
                for (var i = 0; i < numberOfBullets; i++) {
                    if (s.params.paginationBulletRender) {
                        bulletsHTML += s.params.paginationBulletRender(i, s.params.bulletClass);
                    }
                    else {
                        bulletsHTML += '<span class="' + s.params.bulletClass + '"></span>';
                    }
                }
                s.paginationContainer.html(bulletsHTML);
                s.bullets = s.paginationContainer.find('.' + s.params.bulletClass);
            }
            /*if (!s.params.pagination) return;
            s.pagination=document.querySelector(s.params.pagination);
            if(!s.pagination)return;
            s.bullet=[];
            s.pagination.innerHTML="";

			for(var i=0,bullet;bullet=s.slide[i++];){
				var bullet=document.createElement("span");
				bullet.setAttribute("class",s.params.bulletClass);
				if(i==s.index){
					bullet.setAttribute("class",s.params.bulletClass+" "+s.params.bulletActiveClass);
				}
				s.bullet.push(bullet);
				s.pagination.appendChild(bullet);
			}*/

			//s.bullet=s.pagination.querySelectorAll("."+s.params.bulletClass);
        };
        /*=========================
          Slides
          ===========================*/
		s.updateSlidesSize=function(){
			s.slide = s.wrapper.querySelectorAll('.' + s.params.slideClass);
		};
		/*=========================
          Container Size
          ===========================*/
        s.updateContainerSize=function(){
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
			//设置单个slide宽度
			for(var i=0;i<s.slide.length;i++){
				s.slide[i].style.width=s.width+"px";
				s.slide[i].style.height=s.height+"px";
			}
			//设置wrapper宽度
			s.wrapper.width=s.width*s.slide.length;
			s.wrapper.style.width=s.wrapper.width+"px";
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
        s.createLoop = function () {
        	if(!s.params.loop)return;
        	if(s.params.slidesPerView>s.slide.length)return;
        	var prependSlides = [], appendSlides = [],i;
        	[].slice.call(s.slide).forEach(function(n,i,a){
        		if (i < s.params.slidesPerView)appendSlides.push(n);
        		if (i < s.slide.length && i >= s.slide.length - s.params.slidesPerView)prependSlides.push(n);
        	});
        	for (i = 0; i < appendSlides.length; i++) {
                s.wrapper.appendChild(appendSlides[i].cloneNode(true)).classList.add(s.params.slideDuplicateClass);
            }
            for (i = prependSlides.length - 1; i >= 0; i--) {
                s.wrapper.insertBefore(prependSlides[i].cloneNode(true),s.wrapper.firstElementChild).classList.add(s.params.slideDuplicateClass);
            }
        	
        	/*s.params.duration=0;
        	s.slideTo(1);
        	s.params.duration=defaults.duration;*/
        };
        s.destroyLoop = function () {
        	s.params.loop=null;
        	var slideDuplicate=s.wrapper.querySelectorAll('.' + s.params.slideDuplicateClass);
        	for(var i=0,slideDu;slideDu=slideDuplicate[i++];){
        		s.wrapper.removeChild(slideDu);
        	}
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
        	posX:0,
        	direction:null
        };
        //索引
        s.index=0;
        //Handler
		s.onTouchstart=function(e){
			s.touches.startX=e.touches[0].clientX;
			s.touches.startY=e.touches[0].clientY;
			//关闭自动播放
			s.stopAutoplay();
			//runCallBacks
			if(s.params.onSlideChangeStart)s.params.onSlideChangeStart(s);
			e.stopPropagation();
		};
		s.onTouchmove=function(e){
			s.touches.currentX=e.touches[0].clientX;
			s.touches.currentY=e.touches[0].clientY;
			s.touches.diff=s.touches.startX-s.touches.currentX;
			var diffY=s.touches.startY-s.touches.currentY;
			//设置滑动方向
			if(s.touches.direction==null){
				s.touches.direction=Math.abs(diffY)-Math.abs(s.touches.diff)>0?"vertical":"horizontal";
			}
			//左右滑动
			if(s.touches.direction=="horizontal"){
				//x轴距离左边的像素，向左为负数，向右为正数
				var moveX=s.touches.posX-s.touches.diff;
				//判断是否是边缘
				if(moveX>0 || -moveX + s.container.width >= s.wrapper.width){
					return;
				}
				s.wrapper.style.left=moveX+"px";
			}
		};
		s.onTouchend=function(e){
			//左右拉动
			if(s.touches.direction=="horizontal"){
				//左右拉动
				if(s.touches.diff>s.params.threshold){
					//下一页
					s.index++;
				}else if(s.touches.diff<-s.params.threshold){
					//上一页
					s.index--;
				}
				s.slideTo();
			}

			//清空滑动方向
			s.touches.direction=null;
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
        function updatePosX(){
        	s.wrapper.style.webkitTransitionDuration=s.params.duration+"ms";
        	s.touches.posX=-s.index*s.width;
        	s.wrapper.style.left=s.touches.posX+"px";
        }
        s.slideTo=function(slideIndex){
        	if(slideIndex>=0){
				s.index=slideIndex;
			}
			if(s.index<0){
				s.index=0;
			}
			if(s.index>s.slide.length-1){
				s.index=s.slide.length-1;
			}
			if(s.params.slidesPerView>1 && s.index>s.slide.length-params.slidesPerView){
				s.index=s.slide.length-s.params.slidesPerView;
			}
			
			//更新class
			s.updateClasses();
			//移动至index
			updatePosX();
			setTimeout(function(){
				//runCallBacks
				if(s.params.onSlideChangeEnd)s.params.onSlideChangeEnd(s);
				//循环的情况
				if(s.params.loop){
					if(s.touches.posX==0){
						s.index=s.slide.length-s.params.slidesPerView*2;
						//console.log("最左侧，应跳转到："+s.index);
						s.params.duration=0;
						updatePosX();
						s.params.duration=defaults.duration;
						return;
					}
					if(-s.touches.posX + s.container.width >= s.wrapper.width){
						s.index=s.params.slidesPerView;
						//console.log("最右侧，应跳转到："+s.index);
						s.params.duration=0;
						updatePosX();
						s.params.duration=defaults.duration;
						return;
					}
				}
			},s.params.duration);
        };

		//主函数
		s.init=function(){
			if (s.params.loop) s.createLoop();
			s.updateSlidesSize();
            s.updateContainerSize();
            s.updatePagination();
			s.attach();
			if (s.params.autoplay) s.startAutoplay();
		}
		//执行主函数
		s.init();
	}
	Slider.prototype={
		preventDefault:function(e){
			e.preventDefault();
		},
		support:{
			touch:(function(){return 'ontouchstart' in window})(),
			animationend:(function(){return 'onanimationend' in window})(),
			transitionend:(function(){return 'ontransitionend' in window})(),
		}
	}
})(window,document,undefined)