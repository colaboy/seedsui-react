//Toast弹出框
(function(window,document,undefined){
	
	window.Toast=function(msg,params){
		/*================
		Model
		================*/
		var defaults={
			"parent":document.body,
			"toastBoxClass":"toast-box",
			"toastClass":"toast",
			//"delay":1000,
			"showAnimateClass":"toast-show",
			"hideAnimateClass":"toast-hide"
			/*callbacks
            onShowed(Toast)//显示动画结束后回调
            onHid(Toast)//隐藏动画结束后回调
            */
		}
		params=params||{};
		for(var def in defaults){
			if(params[def]==undefined){
				params[def]=defaults[def];
			}
		}
		var msg=msg||"";
		var s=this;
		s.params=params;
		s.parent=typeof s.params.parent=="string"?document.querySelector(s.params.parent):s.params.parent;
		s.toastBox,s.toast;
		s.createToastBox=function(){
			var toastBox=document.createElement("div");
			toastBox.setAttribute("class",s.params.toastBoxClass);
			return toastBox;
		}
		s.createToast=function(){
			var toast=document.createElement("div");
			toast.setAttribute("class",s.params.toastClass);
			if(msg)toast.innerHTML=msg;
			return toast;
		}
		s.create=function(){
			s.toastBox=s.createToastBox();
			s.toast=s.createToast();
			s.toastBox.appendChild(s.toast);
			s.parent.appendChild(s.toastBox);
		}
		s.create();

		/*================
		Method
		================*/
		s.setText=function(msg){
			s.toast.innerHTML=msg;
		};
		s.isHid=true;
		s.disableShow=false;//允许show点击
		s.hide=function(){
			s.isHid=true;
			s.disableShow=true;//禁止show点击
			s.toastBox.classList.remove(s.params.showAnimateClass);
			s.toastBox.classList.add(s.params.hideAnimateClass);
			//s.toastBox.style.webkitTransform='translate3d(0,150px,0)';
		};
		s.show=function(){
			if(s.isHid==false || s.disableShow==true){
				return;
			}
			s.isHid=false;
			s.toastBox.classList.add(s.params.showAnimateClass);
			//s.toastBox.style.webkitTransform='translate3d(0,0,0)';
		};
		s.destroy=function(){
			s.detach();
			s.parent.removeChild(s.toastBox);
			s.toastBox=null;
		};
		/*================
		Controller
		================*/
		s.events=function(detach){
			var target=s.toastBox;
			var action=detach?"removeEventListener":"addEventListener";
			//target[action]("webkitTransitionEnd",s.onTransitionEnd,false);
			target[action]("webkitAnimationEnd",s.onAnimationEnd,false);
		}
		s.attach=function(){
			s.events();
		}
		s.detach=function(){
			s.events(false);
		}
		//Events Handler
		/*s.onTransitionEnd=function(){
			if(s.isHid){//已隐藏状态
				if(s.delayer)window.clearTimeout(s.delayer);
			}else{//已显示状态
				s.delayer=setTimeout(function(){
					s.hide();
				}, s.params.delay);
			}
		}*/
		s.onAnimationEnd=function(){
			if(s.isHid){//已隐藏状态
				s.disableShow=false;//解禁show点击
				s.toastBox.classList.remove("toast-hide");
				//CallBack onHid
				if(s.params.onHid)s.params.onHid(s);
			}else{//已显示状态
				s.hide();
				if(s.params.onShowed)s.params.onShowed(s);
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