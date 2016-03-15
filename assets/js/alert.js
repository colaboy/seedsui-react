/*!
 * 对话框
 * @version 1.0.0
 * @author WangMingzhu
 * @requie jquery.js
 */

/**
*  对话框
* 
*  @class Confirm
*/
(function(window,document,undefined){
	
	window.Alert=function(msg,params){
		/*================
		Model
		================*/
		var defaults={
			"title":"提示",
			"buttonOk":"确定"
			/*
            Callbacks:
			onClickOk:function(alert)
			onClickCancel:function(alert)
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
		//开关动画
		s.hideAnimate={"opacity":"0"};
		s.showAnimate={"opacity":"1"};
		/*================
		Method
		================*/
		s.createMask=function(){
			if(s.mask)return;
			s.mask=document.createElement("div");
			s.mask.setAttribute("class","popup-mask");
			document.body.appendChild(s.mask);
		};
		s.createContainer=function(){
			if(s.container)return;
			s.container=document.createElement("div");
			s.container.setAttribute("class","popup confirm");
			var title=document.createElement("h1");
			title.innerHTML=s.params.title;
			s.content=document.createElement("label");
			s.content.innerHTML=msg;
			var handler=document.createElement("div");
			handler.setAttribute("class","popup-handler");

			s.buttonOk=document.createElement("a");
			s.buttonOk.innerHTML=s.params.buttonOk;

			handler.appendChild(s.buttonOk);
			
			s.container.appendChild(title);
			s.container.appendChild(s.content);
			s.container.appendChild(handler);

			document.body.appendChild(s.container);

			//ok按钮绑定点击事件
			s.buttonOk.addEventListener("click",s.onClickOk,false);
		}
		/*================
		Controller
		================*/
		s.setText=function(msg){
			s.content.innerHTML=msg;
		};
		s.hide=function(){
			$(s.mask).animate({opacity:0},"fast","linear",function(){
				$(this).css("display","none");
			});
			$(s.container).animate(s.hideAnimate,"fast","linear",function(){
				$(this).css("display","none");
			});
		};
		s.show=function(){
			if(s){
				$(s.mask).css("display","block").animate({opacity:1},"fast","linear");
				$(s.container).css("display","block").animate(s.showAnimate,"fast","linear");
			}
		};
		s.destory=function(){
			$(s.mask).animate({opacity:0},"fast","linear",function(){
				$(this).remove();
			});
			$(s.container).animate(s.hideAnimate,"fast","linear",function(){
				$(this).remove();
			});
			s=null;
		};
		/*================
		Event
		================*/
		s.onClickOk=function(){
			if(s.params.onClickOk){
				s.params.onClickOk(s);
				return;
			}
			s.hide();
		};
		/*================
		Init
		================*/
		s.init=function(){
			s.createMask();
			s.createContainer();
		}
		s.init();
	}
})(window,document,undefined);