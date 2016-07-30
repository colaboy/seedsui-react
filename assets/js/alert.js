//Alert
(function(window,document,undefined){
	
	window.Alert=function(msg,params){
		/*================
		Model
		================*/
		var defaults={
			"maskClass":"mask",
			"alertClass":"alert",
			"handlerClass":"alert-handler",
			"title":"提示",
			"buttonOk":"确定",
			"buttonCancel":"取消",
			"isClickMaskHide":false
			/*
            Callbacks:
            onClick:function(Alert)
			onClickOk:function(Alert)
			onClickCancel:function(Alert)
			onClickMask:function(Alert)
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
		s.container=document.body,s.alert,s.mask;
		//Mask
		s.createMask=function(){
            var mask=document.createElement("div");
            mask.setAttribute("class",s.params.maskClass);
            return mask;
        }
        //Alert
        s.createButtonCancel=function(){
        	var buttonCancel=document.createElement("a");
			buttonCancel.innerHTML=s.params.buttonCancel;
			return buttonCancel;
        }
		s.createAlert=function(){
			var alert=document.createElement("div");
			alert.setAttribute("class",s.params.alertClass);

			alert.content=document.createElement("label");
			alert.content.innerHTML=msg;

			alert.handler=document.createElement("div");
			alert.handler.setAttribute("class",s.params.handlerClass);

			//如果有取消按钮
			if(s.params.onClickCancel){
				alert.buttonCancel=s.createButtonCancel();
				alert.handler.appendChild(alert.buttonCancel);
			}
			alert.buttonOk=document.createElement("a");
			alert.buttonOk.innerHTML=s.params.buttonOk;

			alert.handler.appendChild(alert.buttonOk);
			
			if(s.params.title){
				alert.caption=document.createElement("h1");
				alert.caption.innerHTML=s.params.title;
				alert.appendChild(alert.caption);
			}

			alert.appendChild(alert.content);
			alert.appendChild(alert.handler);

			return alert;
		}
		s.create=function(){
			s.mask=s.createMask();
			s.alert=s.createAlert();
			s.container.appendChild(s.mask);
			s.container.appendChild(s.alert);
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
        s.showAlert=function(){
        	s.alert.style.visibility="visible";
            s.alert.style.opacity="1";
        }
        s.hideAlert=function(){
        	s.alert.style.opacity="0";
        }
        s.destroyAlert=function(){
        	s.container.removeChild(s.alert);
        }
		s.isHid=true;
		s.hide=function(){
			s.isHid=true;
			//显示遮罩
			s.hideMask();
			//显示弹出框
			s.hideAlert();
			//显示滚动条
            document.body.style.overflow="auto";
		};
		s.show=function(){
			s.isHid=false;
			//显示遮罩
			s.showMask();
			//显示弹出框
			s.showAlert();
			//禁用滚动条
            document.body.style.overflow="hidden";
		};
		s.destroy=function(){
			//移动事件监听
			s.detach();
			//移除遮罩
			s.destroyMask();
			//移除弹出框
			s.destroyAlert();
			s=null;
		};
		//动态设置
		s.setText=function(msg){
			s.alert.content.innerHTML=msg;
		};
		s.setOnClick=function(fn){
        	s.params.onClick=fn;
        }
		s.setOnClickOk=function(fn){
        	s.params.onClickOk=fn;
        }
        s.setOnClickCancel=function(fn){
        	//如果没有取消按钮，创建一个
        	if(!s.params.onClickCancel){
				s.alert.buttonCancel=s.createButtonCancel();
				s.alert.handler.insertBefore(s.alert.buttonCancel,s.alert.buttonOk);
			}
        	s.params.onClickCancel=fn;
        }
		/*================
		Control
		================*/
        s.events=function(detach){
            var touchTarget=s.alert;
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
			
			if(e.target==s.alert.buttonOk){
				if(s.params.onClickOk)s.params.onClickOk(s);
				else s.hide();
			}else if(s.alert.buttonCancel && e.target==s.alert.buttonCancel){
				if(s.params.onClickCancel)s.params.onClickCancel(s);
				else s.hide();
			}
		}
		s.setOnClick=function(fn){
            s.params.onClick=fn;
        }
		s.onClickMask=function(e){
			s.target=e.target;
			if(s.params.onClickMask)s.params.onClickMask(s);
			if(s.params.isClickMaskHide)s.hide();
		}
		s.setOnClickMask=function(fn){
            s.params.onClickMask=fn;
        }
		s.onTransitionEnd=function(e){
			if(s.isHid){
				s.alert.style.visibility="hidden";
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