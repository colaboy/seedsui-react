//Prompt 提示框
(function(window,document,undefined){
	
	window.Prompt=function(msg,params){
		/*================
		Model
		================*/
		var defaults={
			parent:document.body,
			promptClass:"prompt",
			promptActiveClass:"active",
			css:{},
			delay:1500

			/*callbacks
			onShowed:function(Prompt)//开窗完成时动画
			onHid:function(Prompt)//关窗完成时动画
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
		//Parent
		s.parent=typeof s.params.parent=="string"?document.querySelector(s.params.parent):s.params.parent;
		//创建容器
		s.container=null;
		s.create=function(){
			if(s.container)return;
			s.container=document.createElement("div");
			s.container.setAttribute("class",s.params.promptClass);
			s.container.innerHTML=msg;
			s.parent.appendChild(s.container);
		}
		s.create();
		s.update=function(){
            for(var c in s.params.css){
                s.container.style[c]=s.params.css[c];
            }
		}
		s.update();
		/*================
		Method
		================*/
		s.setText=function(msg){
			s.container.innerHTML=msg;
		};
		s.isHid=true;
		s.hide=function(fn){
			s.isHid=true;
			s.container.classList.remove(s.params.promptActiveClass);
		};
		s.show=function(fn){
			s.isHid=false;
			s.container.classList.add(s.params.promptActiveClass);

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
				if(s.params.onHid)s.params.onHid();
			}else{
				//Callback onShowed
				if(s.params.onShowed)s.params.onShowed();
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