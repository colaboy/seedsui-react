//Actionsheet
(function(window,document,undefined){
	
	window.Actionsheet=function(params){
		/*================
		Model
		================*/
		var defaults={
			maskClass:"mask",
			actionsheetClass:"actionsheet",
			groupClass:"actionsheet-group",
			buttonCancelClass:"actionsheet-cancel",
			buttonCancel:"取消",
			isClickMaskHide:true,
			data:[]
			/*
            Callbacks:
            option.onClick:function(Alert)
			onClickCancel:function(Alert)
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
		s.container=document.body,s.actionsheet,s.mask;
		//Mask
		s.createMask=function(){
            var mask=document.createElement("div");
            mask.setAttribute("class",s.params.maskClass);
            return mask;
        }
        //Actionsheet
        s.createActionsheet=function(){
        	var actionsheet=document.createElement("div");
        	actionsheet.setAttribute("class",s.params.actionsheetClass);

        	actionsheet.group=document.createElement("div");
        	actionsheet.group.setAttribute("class",s.params.groupClass);

        	actionsheet.options=[];
        	for(var i=0,dat;dat=s.params.data[i++];){
				var option=document.createElement("a");
				option.innerHTML=dat.text;
				option.onClick=dat.handler;
				actionsheet.options.push(option);
				actionsheet.group.appendChild(option);
			}
			actionsheet.appendChild(actionsheet.group);
			//创建取消按钮
			if(s.params.buttonCancel){
				actionsheet.buttonCancel=document.createElement("a");
				actionsheet.buttonCancel.setAttribute("class",s.params.buttonCancelClass);
				actionsheet.buttonCancel.innerHTML=s.params.buttonCancel;
				
				actionsheet.appendChild(actionsheet.buttonCancel);
			}
			return actionsheet;
        }
        s.create=function(){
        	s.mask=s.createMask();
        	s.actionsheet=s.createActionsheet();
        	s.container.appendChild(s.mask);
        	s.container.appendChild(s.actionsheet);
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
        s.destoryMask=function(){
        	s.container.removeChild(s.mask);
        }
        s.showActionsheet=function(){
        	s.actionsheet.style.webkitTransform="translate3d(0,0,0)";
        }
        s.hideActionsheet=function(){
        	s.actionsheet.style.webkitTransform="translate3d(0,100%,0)";
        }
        s.destoryActionsheet=function(){
        	s.container.removeChild(s.actionsheet);
        }

		s.isHid=true;
		s.hide=function(){
			s.isHid=true;
			//显示遮罩
			s.hideMask();
			//显示弹出框
			s.hideActionsheet();
		};
		s.show=function(){
			s.isHid=false;
			//显示遮罩
			s.showMask();
			//显示弹出框
			s.showActionsheet();
		};
		s.destory=function(){
			//移动事件监听
			s.detach();
			//移除遮罩
			s.destoryMask();
			//移除弹出框
			s.destoryActionsheet();
			s=null;
		};
		/*================
		Control
		================*/
        s.events=function(detach){
            var touchTarget=s.actionsheet;
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
        	//点击项
        	var options=s.actionsheet.options;
        	for(var i=0,opt;opt=options[i++];){
        		if(opt==s.target){
        			opt.onClick(s);
        			return;
        		}
        	}
        	//点击取消按钮
        	if(s.params.onClickCancel && s.actionsheet.buttonCancel==s.target){
        		s.params.onClickCancel(s);
        		return;
        	}
        	s.hide();
		};
		s.onClickMask=function(){
			if(s.params.isClickMaskHide)s.hide();
		}
		s.onTransitionEnd=function(e){
			if(s.isHid){
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