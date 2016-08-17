//Timepart 时间段(require EventUtil.js)
(function(window,document,undefined){
	window.Timepart=function(container,params){
		/*================
		Model
		================*/
		var defaults={
			toastParent:document.body,//提示框的父元素
			partAttr:"data-num",
            partActiveClass:"active",
            partDisableClass:"disable",

            msgErrorClickDisable:"不能选择禁用时间",
            msgErrorOverDisable:"不能跨选禁用段时间",
			/*
            Callbacks:
            onOneClick:function(Timepart)
			onTwoClick:function(Timepart)
			onThreeClick:function(Timepart)
			*/
		}
		params=params||{};
		for(var def in defaults){
			if(params[def]==undefined){
				params[def]=defaults[def];
			}
		}
		var s=this;
        //Params
		s.params=params;
        //Container
        s.container=typeof container=="string"?document.querySelector(container):container;
        //Toast
		s.toast=new Toast("",{
			"parent":s.params.toastParent
		});
		s.clickCount=0;
		s.selected=[];
		s.parts=[];
		s.updateParts=function(){
			s.parts=[].slice.call(document.querySelectorAll("["+s.params.partAttr+"]"));
		}
		s.updateParts();
		/*================
		Method
		================*/
		s.activeParts=function(num1,num2){
            //序号排序
            if(parseInt(num1)>parseInt(s.selected[1])){
                var temp=num1;
                num1=num2;
                num2=temp;
            }
            var startNum=num1;
            var endNum=num2;
            //选中
            for(var i=startNum-1;i<endNum;i++){
                //如果跨选禁用段时间
                if(s.parts[i].classList.contains(s.params.partDisableClass)){
                    s.toast.setText(s.params.msgErrorOverDisable);
                    s.toast.show();
                    s.clearActiveParts();
                    return;
                }
                s.parts[i].classList.add(s.params.partActiveClass);
            }
        }
        s.clearActiveParts=function(){
            s.clickCount=0;
            s.selected=[];
            for(var i=0,part;part=s.parts[i++];){
                part.classList.remove(s.params.partActiveClass);
            }
        }
        s.disableParts=function(num1,num2){
            //序号排序
            if(parseInt(num1)>parseInt(s.selected[1])){
                var temp=num1;
                num1=num2;
                num2=temp;
            }
            var startNum=num1;
            var endNum=num2;
            //禁用
            for(var i=startNum-1;i<endNum;i++){
                s.parts[i].classList.remove(s.params.partActiveClass);
                s.parts[i].classList.add(s.params.partDisableClass);
            }
        }
        s.clearDisableParts=function(){
            for(var i=0,part;part=s.parts[i++];){
                part.classList.remove(s.params.partDisableClass);
            }
        }
		/*================
		Events
		================*/
        s.events=function(detach){
            var target=s.container;
            var action=detach?"removeEventListener":"addEventListener";
            target[action]("click",s.onClickContainer,false);
        }
        //attach、dettach事件
        s.attach=function(event){
            s.events();
        }
        s.detach=function(event){
            s.events(true);
        }
		/*================
		Events Handler
		================*/
		s.onClickContainer=function(e){
            if(e.target.getAttribute(s.params.partAttr)){//点击part
                s.onClickPart(e);
            }
		}
        s.onClickPart=function(e){
            var target=e.target;
            if(target.classList.contains(s.params.partDisableClass)){//如果点击了禁用
                if(s.params.msgErrorClickDisable){
                    s.toast.setText(s.params.msgErrorClickDisable);
                    s.toast.show();
                }
                return;
            }
            
            //记录点击次数
            s.clickCount++;
            var num=target.getAttribute(s.params.partAttr);

            if(s.clickCount==3){//如果点击了三次
                s.clearActiveParts();
                return;
            }
            if(s.clickCount==1){//如果点击了一次
                s.selected[0]=num;
                target.classList.add(s.params.partActiveClass);
                console.log("点击第一次："+s.selected);
            }else if(s.clickCount==2){//如果点击了两次
                s.selected[1]=num;
                s.activeParts(s.selected[0],s.selected[1]);
                console.log("点击第二次："+s.selected);
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