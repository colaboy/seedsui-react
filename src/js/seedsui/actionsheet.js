//Actionsheet
(function(window,document,undefined){
	
	window.Actionsheet=function(params){
		/*================
		Model
		================*/
		var defaults={
			overflowContainer:document.body,
			parent:document.body,
			maskClass:"mask",
			actionsheetClass:"actionsheet",
			groupClass:"actionsheet-group",
			buttonCancelClass:"actionsheet-cancel",
			buttonCancel:"取消",
			isClickMaskHide:true,
			data:[]
			/*
            Callbacks:
            option.onClick:function(Actionsheet)
			onClickCancel:function(Actionsheet)
			onClickMask:function(Actionsheet)
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
		//Parent | OverflowContainer
		s.parent=typeof s.params.parent=="string"?document.querySelector(s.params.parent):s.params.parent;
		s.overflowContainer=typeof s.params.overflowContainer=="string"?document.querySelector(s.params.overflowContainer):s.params.overflowContainer;
		//Actionsheet | Mask
		s.container,s.mask;
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
        	
        	s.updateData(actionsheet);

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
        s.updateData=function(actionsheet){
        	actionsheet.group.innerHTML="";
        	actionsheet.options=[];
        	for(var i=0,dat;dat=s.params.data[i++];){
				var option=document.createElement("a");
				option.innerHTML=dat.text;
				option.onClick=dat.handler;
				actionsheet.options.push(option);
				actionsheet.group.appendChild(option);
			}
        }
        s.create=function(){
        	s.mask=s.createMask();
        	s.container=s.createActionsheet();
        	s.parent.appendChild(s.mask);
        	s.parent.appendChild(s.container);
        }
        s.create();
        //设置数据
        s.setData=function(data){
        	s.params.data=data;
        	if(s.container)s.updateData(s.container);
        	else s.createActionsheet();
        }

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
        	s.parent.removeChild(s.mask);
        }
        s.showActionsheet=function(){
        	s.container.style.webkitTransform="translate3d(0,0,0)";
        }
        s.hideActionsheet=function(){
        	s.container.style.webkitTransform="translate3d(0,100%,0)";
        }
        s.destroyActionsheet=function(){
        	s.parent.removeChild(s.container);
        }

		s.isHid=true;
		s.hide=function(){
			s.isHid=true;
			//显示遮罩
			s.hideMask();
			//显示弹出框
			s.hideActionsheet();
			//显示滚动条
            s.overflowContainer.style.overflow="auto";
		};
		s.show=function(){
			s.isHid=false;
			//显示遮罩
			s.showMask();
			//显示弹出框
			s.showActionsheet();
			//禁用滚动条
            s.overflowContainer.style.overflow="hidden";
		};
		s.destroy=function(){
			//移动事件监听
			s.detach();
			//移除遮罩
			s.destroyMask();
			//移除弹出框
			s.destroyActionsheet();
			s=null;
		};
		/*================
		Control
		================*/
        s.events=function(detach){
            var touchTarget=s.container;
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
        	//点击容器
        	if(s.params.onClick)s.params.onClick(s);
        	//点击项
        	var options=s.container.options;
        	for(var i=0,opt;opt=options[i++];){
        		if(opt==s.target){
        			//Callback
        			opt.onClick(s);
        			return;
        		}
        	}
        	//点击取消按钮
        	if(s.params.onClickCancel && s.container.buttonCancel==s.target){
        		s.params.onClickCancel(s);
        		return;
        	}
        	s.hide();
		};
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