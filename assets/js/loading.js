//Loading
(function(window,document,undefined){
	
	window.Loading=function(loadContainer,maskContainer,params){
		/*================
		Model
		================*/
		var defaults={
			"maskClass":"mask",
			"loadingBoxClass":"loading-box",
			"loadingClass":"loading",
			"isClickMaskHide":false
			/*
            Callbacks:
            onClick:function(Loading)
			*/
		}
		params=params||{};
		for(var def in defaults){
			if(params[def]==undefined){
				params[def]=defaults[def];
			}
		}
		var s=this;
		s.params=params;
		s.container=document.body,s.mask,s.loadingBox;
		//Mask
		s.createMask=function(){
            var mask=document.createElement("div");
            mask.setAttribute("class",s.params.maskClass);
            return mask;
        }
        //LoadingBox
		s.createLoadingBox=function(){
			var loadingBox=document.createElement("div");
			loadingBox.setAttribute("class",s.params.loadingBoxClass);

			loadingBox.loading=document.createElement("div");
			loadingBox.loading.setAttribute("class",s.params.loadingClass);

			loadingBox.appendChild(loadingBox.loading);

			return loadingBox;
		}
		s.create=function(){
			if(loadContainer){
				s.loadingBox=typeof loadContainer=="string"?document.querySelector(loadContainer):loadContainer;
			}else{
				s.loadingBox=s.createLoadingBox();
				s.container.appendChild(s.loadingBox);
			}

			if(maskContainer){
				s.mask=typeof maskContainer=="string"?document.querySelector(maskContainer):maskContainer;
			}else{
				s.mask=s.createMask();
				s.container.insertBefore(s.mask,s.loadingBox);
			}
		}
		s.create();
		/*================
		Method
		================*/
		s.showMask=function(){
            s.mask.style.visibility="visible";
            s.mask.style.opacity="1";
        }
        s.hideMask=function(){
        	s.mask.style.opacity="0";
        }
        s.destroyMask=function(){
        	s.container.removeChild(s.mask);
        }
        s.showLoading=function(){
        	s.loadingBox.style.visibility="visible";
            s.loadingBox.style.opacity="1";
        }
        s.hideLoading=function(){
        	s.loadingBox.style.opacity="0";
        }
        s.destroyLoading=function(){
        	s.container.removeChild(s.loadingBox);
        }
		s.isHid=true;
		s.hide=function(){
			s.isHid=true;
			//显示遮罩
			s.hideMask();
			//显示弹出框
			s.hideLoading();
		};
		s.show=function(){
			s.isHid=false;
			//显示遮罩
			s.showMask();
			//显示弹出框
			s.showLoading();
		};
		s.destroy=function(){
			//移动事件监听
			s.detach();
			//移除遮罩
			s.destroyMask();
			//移除弹出框
			s.destroyLoading();
			s=null;
		};
		//动态设置
		s.setOnClick=function(fn){
        	s.params.onClick=fn;
        }
		/*================
		Control
		================*/
        s.events=function(detach){
            var touchTarget=s.loadingBox;
            var action=detach?"removeEventListener":"addEventListener";
            touchTarget[action]("click",s.onClick,false);
            touchTarget[action]("webkitTransitionEnd",s.onTransitionEnd,false);
            //遮罩
            s.mask[action]("click",s.onClickMask,false);
        }
        //attach、dettach事件
        s.attach=function(event){
            s.events();
        }
        s.detach=function(event){
            s.events(true);
        }
		s.onClick=function(e){
			s.target=e.target;
			if(s.params.onClick)s.params.onClick(s);
		}
		s.onClickMask=function(){
			if(s.params.isClickMaskHide)s.hide();
		}
		s.onTransitionEnd=function(e){
			if(s.isHid){
				s.loadingBox.style.visibility="hidden";
				s.mask.style.visibility="hidden";
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