//Prompt提示框
(function(window,document,undefined){
	
	window.Prompt=function(msg,params){
		/*================
		Model
		================*/
		var defaults={
			promptClass:"prompt",
			delay:1000
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
		//创建容器
		s.container=null;
		s.createContainer=function(){
			if(s.container)return;
			s.container=document.createElement("div");
			s.container.setAttribute("class",s.params.promptClass);
			s.container.innerHTML=msg;
			document.body.appendChild(s.container);
		}
		s.createContainer();
		/*================
		Method
		================*/
		s.setText=function(msg){
			s.container.innerHTML=msg;
		};
		s.isHid=true;
		s.hide=function(fn){
			s.isHid=true;
			s.container.style.opacity="0";
		};
		s.show=function(fn){
			s.isHid=false;
			s.container.style.visibility="visible";
			s.container.style.opacity="1";
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
		s.onTransitionEnd=function(){
			if(s.isHid){
				s.container.style.visibility="hidden";
				if(s.delayer)window.clearTimeout(s.delayer);
			}else{
				//延迟时间后自动消失
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