//ImgLazy 图片预加载
(function(window,document,undefined){
	
	window.ImgLazy=function(container,params){
		/*================
		Model
		================*/
		var defaults={
			isScrollLoad:true,//滚动加载
			threshold:300,//滚动加载时，显示区域扩张上下像素
			imgLoadAttr:"data-load-src",//图片地址
			imgErrowAttr:"data-error-src"//错误图片地址
		}
		params=params||{};
		for(var def in defaults){
			if(params[def]==undefined){
				params[def]=defaults[def];
			}
		}
		var s=this;
		s.params=params;
		//Container
		s.container=typeof container=="string"?document.querySelector(container):container;
		if(!s.container){
            console.log("SeedsUI Warn：未找到Imglazy的容器DOM对象，默认将其指向body");
            s.container=document.body;
        }
		//所有图片
		s.imgs=[];
		//对应缓存图片
		s.cacheImgs=[];
		//获得所有懒人图片
		s.updateImgs=function(){
			s.imgs=s.container.querySelectorAll("["+s.params.imgLoadAttr+"]");
			for(var i=0;i<s.imgs.length;i++){
				s.cacheImgs[i]=new Image();
				s.cacheImgs[i].index=i;
				s.cacheImgs[i].errorSrc=s.imgs[i].getAttribute(s.params.imgErrowAttr);
				//如果没有选择滚动加载，则一次性加载
				if(!s.params.isScrollLoad){
					var src=s.imgs[i].getAttribute(s.params.imgLoadAttr);
					s.cacheImgs[i].src=src;
				}
			}
		}
		s.updateImgs();
		s.update=function(){
			//重新获取图片
			s.updateImgs();
			//重新绑定事件
			s.detach();
			s.attach();
		}
		//屏幕高度
		s.windowHeight=window.innerHeight;
		s.scrollTop; 
		/*================
		Method
		================*/
		//获得头部位置
		s.getOffsetTop=function(el){
		    var offsetTop=el.offsetTop;
		    if(el.offsetParent!=null) offsetTop += s.getOffsetTop(el.offsetParent);
		    
		    return offsetTop;
		};
		//元素是否在显示区域内
		s.isInScreen=function(el){
			var offsetTop=s.getOffsetTop(el);
			if(offsetTop>s.scrollTop-s.params.threshold && offsetTop < parseInt(s.scrollTop)+parseInt(s.windowHeight) ){
				return true;
			}
			return false;
		}
		/*================
		Controller
		================*/
		s.events=function(detach){
			var action=detach?"removeEventListener":"addEventListener";
			if(s.params.isScrollLoad){
				var scrollTarget=s.container===document.body?window:s.container;
				scrollTarget[action]("scroll",s.onScroll,false);
			}
			
			//缓存图片绑定onLoad事件|和绑定onError事件
			for(var i=0;i<s.cacheImgs.length;i++){
				s.cacheImgs[i][action]("load",s.onLoad,false);
				s.cacheImgs[i][action]("error",s.onError,false);
			}
		}
		s.attach=function(){
			s.events();
			//初始化时执行一次，让首屏可加载
			s.onScroll();
		}
		s.detach=function(){
			s.events(false);
		}
		//Events Handler
		s.onLoad=function(e){
			var target=e.target;
			var imgTarget=s.imgs[target.index];
			if(imgTarget.tagName==="IMG"){
				imgTarget.src=target.src;
			}else{
				imgTarget.style.backgroundImage="url("+target.src+")";
			}
			
			//console.log("加载图片"+target.index);
		}
		s.onError=function(e){
			var target=e.target;
			if(!target.errorSrc)return;

			var imgTarget=s.imgs[target.index];
			if(imgTarget.tagName==="IMG"){
				imgTarget.src=target.errorSrc;
			}else{
				imgTarget.style.backgroundImage="url("+target.errorSrc+")";
			}
			//console.log("错误图片"+target.index);
		}
		var timer,millisec=300;
		s.onScroll=function(e){
			//计算scrollEnd事件
			s.scrollTop=s.container.scrollTop; 
			var _self = this,
                _args = arguments;
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout( function(){
            	if(s.scrollTop==s.container.scrollTop){
            		s.onScrollEnd.apply(_self,_args);
            		clearTimeout(timer);
            		return;
            	}
                timer = null;
                s.onScroll.apply(_self, _args);
            }, millisec);
		}
		s.onScrollEnd=function(e){
			//console.log("停止滚动");
			for(var i=0;i<s.imgs.length;i++){
				var flag=s.isInScreen(s.imgs[i]);
				if(flag && s.cacheImgs[i].src==""){
					//console.log("加载第"+i+"张："+flag);
					var src=s.imgs[i].getAttribute(s.params.imgLoadAttr);
					s.cacheImgs[i].src=src;
				}
			}
		}
		/*================
		Init
		================*/
		s.init=function(){
			s.attach();
		}
		s.init();
	}
})(window,document,undefined);