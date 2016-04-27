/*!
 * 卡片框
 * @version 1.0.0
 * @author WangMingzhu
 * @requie jquery.js
 */

/**
*  下方弹出卡片框
* 
*  @class Actionsheet
*/
(function(window,document,undefined){
	
	window.Actionsheet=function(params){
		/*var defaults=[];
		params=params||null;
		if(params==null){
			params=defaults;
		}*/
		var s=this;
		s.params=params||[];
		//开关动画
		s.hideAnimate={bottom:"-100%"};
		s.showAnimate={bottom:"0%"};

		/*================
		Model
		================*/
		var createEl=function(tagname,classname){
			var el=document.createElement(tagname);
			if(classname)el.setAttribute("class",classname);
			return el;
		}
		s.createMask=function(){
			if(!s.mask)s.mask=createEl("div","popup-mask");
			document.body.appendChild(s.mask);

			//遮罩绑定点击事件
			s.mask.addEventListener("click",s.onClickCancel,false);
		};
		s.createContainer=function(){
			if(!s.container)s.container=createEl("div","popup actionsheet");
			var group=createEl("div","actionsheet-group");
			for(var i=0,param;param=s.params[i++];){
				var btn=createEl("a");
				btn.innerHTML=param.text;
				group.appendChild(btn);
				//绑定事件
				(function(param){
					btn.addEventListener("click",function(e){
						s.target=e.target;
						param.handler(s);
					},false);
				})(param)
			}
			//创建取消按钮
			var cancel=createEl("a","actionsheet-cancel");
			cancel.innerHTML="取消";

			s.container.appendChild(group);
			s.container.appendChild(cancel);

			document.body.appendChild(s.container);

			//取消按钮绑定点击事件
			cancel.addEventListener("click",s.onClickCancel,false);
		}
		s.destoryContainer=function(){
			s.container.innerHTML="";
		}
		/*================
		Method
		================*/
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
		s.onClickCancel=function(){
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
		/*================
		Set
		================*/
		s.setParams=function(params){
			s.params=params;
			s.destoryContainer();
			s.createContainer();
		}
	}
})(window,document,undefined);