//Toast 提示框
(function(window,document,undefined){
	
	window.Toast=function(msg,params){
		/*================
		Model
		================*/
		var defaults={
			parent:document.body,
			toastClass:"toast",
			activeClass:"active",
			css:{},
			delay:1500,

			toastContentClass:"toast-content",
			
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
		s.container,s.toastContent;
		s.createContainer=function(){
			var container=document.createElement("div");
			container.setAttribute("class",s.params.toastClass);
			return container;
		}
		s.createToastContent=function(){
			var toastContent=document.createElement("div");
			toastContent.setAttribute("class",s.params.toastContentClass);
			if(msg)toastContent.innerHTML=msg;
			return toastContent;
		}
		s.create=function(){
			s.container=s.createContainer();
			s.toastContent=s.createToastContent();
			s.container.appendChild(s.toastContent);
			s.parent.appendChild(s.container);
		}
		s.create();
		s.update=function(){
            for(var c in s.params.css){
                s.toastContent.style[c]=s.params.css[c];
            }
		}
		s.update();

		/*================
		Method
		================*/
		s.setText=function(msg){
			s.toastContent.innerHTML=msg;
		};
		s.isHid=true;
		s.hide=function(fn){
			s.isHid=true;
			s.container.classList.remove(s.params.activeClass);
		};
		s.show=function(fn){
			s.isHid=false;
			s.container.classList.add(s.params.activeClass);

			//显示数秒后，自动消失
			if(s.delayer)window.clearTimeout(s.delayer);
			s.delayer=setTimeout(function(){
				s.hide();
			}, s.params.delay);
		};
		s.destroy=function(){
			s.parent.removeChild(s.container);
		};
		/*================
		Controller
		================*/
		s.events=function(detach){
			var target=s.container;
			var action=detach?"removeEventListener":"addEventListener";
			target[action]("webkitTransitionEnd",s.onTransitionEnd,false);
			//target[action]("webkitAnimationEnd",s.onAnimationEnd,false);
		}
		s.attach=function(){
			s.events();
		}
		s.detach=function(){
			s.events(false);
		}
		//Events Handler
		s.onTransitionEnd=function(e){
			if(e.propertyName=="visibility")return;
			if(s.isHid){
				//Callback onHid
				if(s.params.onHid)s.params.onHid(s);
			}else{
				//Callback onShowed
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