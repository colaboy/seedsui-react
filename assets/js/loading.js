//Loading
(function(window,document,undefined){
	
	window.Loading=function(params){
		/*================
		Model
		================*/
		var defaults={
			parent:document.body,
			loadContainer:null,
			mask:null,
			maskClass:"mask",
			loadingContainerClass:"loading-box",
			loadingClass:"loading",
			isClickMaskHide:false
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
		s.parent=typeof s.params.parent=="string"?document.querySelector(s.params.parent):s.params.parent;
		s.mask,s.loadingContainer;
		//Mask
		s.createMask=function(){
            var mask=document.createElement("div");
            mask.setAttribute("class",s.params.maskClass);
            return mask;
        }
        //LoadingBox
		s.createLoadingBox=function(){
			var loadingContainer=document.createElement("div");
			loadingContainer.setAttribute("class",s.params.loadingContainerClass);

			loadingContainer.loading=document.createElement("div");
			loadingContainer.loading.setAttribute("class",s.params.loadingClass);

			loadingContainer.appendChild(loadingContainer.loading);

			return loadingContainer;
		}
		s.create=function(){
			if(s.params.loadContainer){
				s.loadingContainer=typeof s.params.loadContainer=="string"?document.querySelector(s.params.loadContainer):s.params.loadContainer;
			}else{
				s.loadingContainer=s.createLoadingBox();
				s.parent.appendChild(s.loadingContainer);
			}

			if(s.params.mask){
				s.mask=typeof s.params.mask=="string"?document.querySelector(s.params.mask):s.params.mask;
			}else{
				s.mask=s.createMask();
				s.parent.insertBefore(s.mask,s.loadingContainer);
			}
		}
		s.create();
		if(!s.mask || !s.loadingContainer)return;
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
        	s.parent.removeChild(s.mask);
        }
        s.showLoading=function(){
        	s.loadingContainer.style.visibility="visible";
            s.loadingContainer.style.opacity="1";
        }
        s.hideLoading=function(){
        	s.loadingContainer.style.opacity="0";
        }
        s.destroyLoading=function(){
        	s.parent.removeChild(s.loadingContainer);
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
            var touchTarget=s.loadingContainer;
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
				s.loadingContainer.style.visibility="hidden";
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