//Prompt提示框
(function(window,document,undefined){
	
	window.Prompt=function(msg,params){
		/*================
		Model
		================*/
		var defaults={
			parent:document.body,
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
		//Parent
		s.parent=typeof s.params.parent=="string"?document.querySelector(s.params.parent):s.params.parent;
		//创建容器
		s.prompt=null;
		s.createContainer=function(){
			if(s.prompt)return;
			s.prompt=document.createElement("div");
			s.prompt.setAttribute("class",s.params.promptClass);
			s.prompt.innerHTML=msg;
			s.params.parent.appendChild(s.prompt);
		}
		s.createContainer();
		/*================
		Method
		================*/
		s.setText=function(msg){
			s.prompt.innerHTML=msg;
		};
		s.isHid=true;
		s.hide=function(fn){
			s.isHid=true;
			s.prompt.style.opacity="0";
		};
		s.show=function(fn){
			s.isHid=false;
			s.prompt.style.visibility="visible";
			s.prompt.style.opacity="1";
		};
		
		/*================
		Controller
		================*/
		s.events=function(detach){
			var target=s.prompt;
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
				s.prompt.style.visibility="hidden";
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