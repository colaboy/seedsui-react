//Toast弹出框
(function(window,document,undefined){
	
	window.Toast=function(msg,params){
		/*================
		Model
		================*/
		var defaults={
			"toastBoxClass":"toast-box",
			"toastClass":"toast",
			"delay":1000
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
		s.container=document.body,s.toastBox,s.toast;
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
			s.container.appendChild(s.toastBox);
		}
		s.create();

		/*================
		Method
		================*/
		s.setText=function(msg){
			s.toast.innerHTML=msg;
		};
		s.isHid=true;
		s.hide=function(){
			s.isHid=true;
			s.toastBox.style.webkitTransform='translate3d(0,150px,0)';
		};
		s.show=function(){
			s.isHid=false;
			s.toastBox.style.webkitTransform='translate3d(0,0,0)';
		};
		s.destory=function(){
			s.detach();
			s.container.removeChild(s.toastBox);
		};
		/*================
		Controller
		================*/
		s.events=function(detach){
			var target=s.toastBox;
			var action=detach?"removeEventListener":"addEventListener";
			target[action]("webkitTransitionEnd",s.onTransitionEnd,false);
		}
		s.attach=function(){
			s.events();
		}
		s.detach=function(){
			s.events(false);
		}
		//Events Handler
		s.onTransitionEnd=function(){
			if(s.isHid){
				if(s.delayer)window.clearTimeout(s.delayer);
			}else{
				//已显示状态
				s.delayer=setTimeout(function(){
					s.hide();
				}, s.params.delay);
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