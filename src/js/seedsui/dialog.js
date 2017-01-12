//Dialog 自定义弹出框
(function(window,document,undefined){
    window.Dialog=function(wrapper,params){
        /*=========================
          Model
          ===========================*/
        var defaults={
            overflowContainer:document.body,
            dialogClass:"dialog",
            maskClass:"mask",
            position:null,
            defaultPosition:"middle",
            css:{},
            maskCss:{},
            duration:300,
            isClickMaskHide:true
            /*callbacks
            onClick:function(Dialog)
            onClickMask:function(Dialog)
            onTransitionEnd:function(Dialog)
            onShowed(Dialog)//显示动画结束后回调
            onHid(Dialog)//隐藏动画结束后回调
            */
        }
        params=params||{};
        for(var def in defaults){
            if(params[def]===undefined){
                params[def]=defaults[def];
            }
        }
        //Dialog
        var s=this;

        //Params
        s.params = params;
        //Mask
        s.mask;
        //Dialog(外层生成的包裹容器)
        s.container;
        //Wrapper(源容器)
        s.wrapper=typeof wrapper=="string"?document.querySelector(wrapper):wrapper;
        if(!s.wrapper){
            console.log("SeedsUI Error：未找到Dialog的DOM对象，请检查传入参数是否正确");
            return;
        }
        //Parent(父容器，为了方便在源容器处插入包裹容器)
        s.parent=s.wrapper.parentNode;
        //OverflowContainer
        s.overflowContainer=typeof s.params.overflowContainer=="string"?document.querySelector(s.params.overflowContainer):s.params.overflowContainer;
        
        //Mask
        s.createMask=function(){
            var mask=document.createElement("div");
            mask.setAttribute("class",s.params.maskClass);
            return mask;
        }
        //ContainerBox
        s.createContainerBox=function(){
            var dialog=document.createElement("div");
            dialog.setAttribute("class",s.params.dialogClass);
            return dialog;
        }
        s.create=function(){
            //插入Dialog
            s.container=s.createContainerBox();
            s.parent.insertBefore(s.container,s.wrapper);
            s.container.appendChild(s.wrapper);
            //插入遮罩
            s.mask=s.createMask();
            s.parent.insertBefore(s.mask,s.container);
        }
        s.create();

        s.update=function(){
            s.wrapper.style.display="block";
            s.container.setAttribute("style","");
            if(s.params.position){
                s.container.setAttribute("data-position",s.params.position);
            }else if(s.container.getAttribute("data-position")){
                s.params.position=s.container.getAttribute("data-position");
            }else{
                s.params.position=s.params.defaultPosition;
                s.container.setAttribute("data-position",s.params.position);
            }
            //Dialog Css
            for(var c in s.params.css){
                s.container.style[c]=s.params.css[c];
            }
            //Mask Css
            for(var maskc in s.params.maskCss){
                s.mask.style[maskc]=s.params.maskCss[maskc];
            }
            switch(s.params.position){
                case "top":case "top-right":
                s.container.showAnimation={webkitTransform:"translate3d(0,0,0)"},
                s.container.hideAnimation={webkitTransform:"translate3d(0,-100%,0)"},
                s.container.style.webkitTransform="translate3d(0,-100%,0)";
                break;
                case "top-center":
                s.container.showAnimation={webkitTransform:"translate3d(-50%,0,0)"},
                s.container.hideAnimation={webkitTransform:"translate3d(-50%,-100%,0)"},
                s.container.style.webkitTransform="translate3d(-50%,-100%,0)";
                break;

                case "bottom":case "bottom-right":
                s.container.showAnimation={webkitTransform:"translate3d(0,0,0)"},
                s.container.hideAnimation={webkitTransform:"translate3d(0,100%,0)"},
                s.container.style.webkitTransform="translate3d(0,100%,0)";
                break;
                case "bottom-center":
                s.container.showAnimation={webkitTransform:"translate3d(-50%,0,0)"},
                s.container.hideAnimation={webkitTransform:"translate3d(-50%,100%,0)"},
                s.container.style.webkitTransform="translate3d(-50%,100%,0)";
                break;

                case "left":case "left-bottom":
                s.container.showAnimation={webkitTransform:"translate3d(0,0,0)"},
                s.container.hideAnimation={webkitTransform:"translate3d(-100%,0,0)"},
                s.container.style.webkitTransform="translate3d(-100%,0,0)";
                break;
                case "left-middle":
                s.container.showAnimation={webkitTransform:"translate3d(0,-50%,0)"},
                s.container.hideAnimation={webkitTransform:"translate3d(-100%,-50%,0)"},
                s.container.style.webkitTransform="translate3d(-100%,-50%,0)";
                break;

                case "right":case "right-bottom":
                s.container.showAnimation={webkitTransform:"translate3d(0,0,0)"},
                s.container.hideAnimation={webkitTransform:"translate3d(100%,0,0)"},
                s.container.style.webkitTransform="translate3d(100%,0,0)";
                break;

                case "right-middle":
                s.container.showAnimation={webkitTransform:"translate3d(0,-50%,0)"},
                s.container.hideAnimation={webkitTransform:"translate3d(100%,-50%,0)"},
                s.container.style.webkitTransform="translate3d(100%,-50%,0)";
                break;

                default:
                s.container.showAnimation={opacity:1},
                s.container.hideAnimation={opacity:0},
                s.container.style.opacity=0;
                break;
            }
            //设置动画毫秒数
            s.container.style.webkitTransitionDuration=s.params.duration+"ms";
        }
        s.update();
        /*=========================
          Method
          ===========================*/
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
        s.showDialog=function(){
            s.container.style.visibility="visible";
            for(var ani in s.container.showAnimation){
                s.container.style[ani]=s.container.showAnimation[ani];
            }
        }
        s.hideDialog=function(){
            for(var ani in s.container.hideAnimation){
                s.container.style[ani]=s.container.hideAnimation[ani];
            }
        }
        s.destroyDialog=function(){
            s.parent.removeChild(s.container);
        }
        s.isHid=true;
        s.show=function(fn){
            s.isHid=false;
            s.showMask();
            s.showDialog();
            if(fn)s.params.onShowed=fn;
            //禁用滚动条
            if(s.overflowContainer)
            s.overflowContainer.style.overflow="hidden";
        }
        s.hide=function(fn){
            s.isHid=true;
            s.hideMask();
            s.hideDialog();
            if(fn)s.params.onHid=fn;
            //显示滚动条
            if(s.overflowContainer)
            s.overflowContainer.style.overflow="auto";
        }
        s.destroy=function(){
            s.destroyMask();
            s.destroyDialog();
        }
        //设置位置
        s.setPosition=function(pos){
            s.params.position=pos;
            s.update();
        }
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
            if(s.params.onClick)s.params.onClick(s);
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
            s.target=e.target;
            if(s.params.onTransitionEnd)s.params.onTransitionEnd(s);
            if(s.isHid){
                s.container.style.visibility="hidden";
                s.mask.style.visibility="hidden";
                if(s.params.onHid)s.params.onHid(s);
            }else{
                if(s.params.onShowed)s.params.onShowed(s);
            }
        }

        s.init=function(){
            s.attach();
        }
        s.init();
    }
})(window,document,undefined);