(function(window,document,undefined){
    window.Asidecontainer=function(container,params){
        /*=========================
          Model
          ===========================*/
        var defaults={
            "wrapperClass":"asidecontainer-wrapper",
            "aside":"aside",
            "asideClass":"asidecontainer-wrapper",
            "duration":300,
            "isClickMaskHide":true,
            /*callbacks
            onInit:function(Scrollpicker)
            onSlideChangeStart:function(Scrollpicker)
            onSlideChange:function(Scrollpicker)
            onSlideChangeEnd:function(Scrollpicker)
            */
        }
        params=params||{};
        for(var def in defaults){
            if(params[def]===undefined){
                params[def]=defaults[def];
            }
        }
        //AsideContainer
        var s=this;
        //Params
        s.params=params;
        //Container
        s.container=typeof container=="string"?document.querySelector(container):container;
        //Wrapper
        s.wrapper=s.container.querySelector("."+s.params.wrapperClass);
        //Section
        s.section=s.container.querySelector("section");
        //Mask
        s.createMask=function(){
            var mask=document.createElement("div");
            mask.setAttribute("class","popup-mask");
            return mask;
        }
        s.mask=s.createMask();
        s.section.appendChild(s.mask);
        //Aside
        s.aside,s.activeEl;
        s.update=function(){
            s.aside=typeof s.params.aside=="string"?s.container.querySelector(s.params.aside):s.params.aside;
            s.aside.position=s.aside.getAttribute("data-position");
            s.aside.transition=s.aside.getAttribute("data-transition");
            s.aside.width=s.aside.clientWidth;
            if(s.aside.position=="right")s.aside.width=-s.aside.width;
            //设置操作对象
            switch(s.aside.transition){
                case "overlay":
                s.activeEl=s.aside,
                s.activeEl.showTransform='translate3d(0,0,0)',
                s.activeEl.hideTransform='translate3d('+-s.aside.width+'px,0,0)';
                break;

                case "push":
                s.activeEl=s.wrapper,
                s.activeEl.showTransform='translate3d('+s.aside.width+'px,0,0)',
                s.activeEl.hideTransform='translate3d(0,0,0)';
                break;

                default:
                s.activeEl=s.section,
                s.activeEl.showTransform='translate3d('+s.aside.width+'px,0,0)',
                s.activeEl.hideTransform='translate3d(0,0,0)';
                break;
            }
        }
        s.update();
        /*=========================
          Method
          ===========================*/
        s.showMask=function(){
            s.mask.style.display="block";
            s.mask.style.opacity="1";
        }
        s.hideMask=function(){
            s.mask.style.display="none";
            s.mask.style.opacity="0";
        }
        s.isHid=false;
        s.show=function(){
            //显示侧边栏
            s.aside.style.visibility="visible";

            //显示遮罩
            s.isHid=false;
            s.showMask();
            
            //设置动元素动画
            s.activeEl.style.webkitTransitionDuration=s.params.duration+"ms";
            s.activeEl.style.webkitTransform=s.activeEl.showTransform;
        }
        s.hide=function(){
            //隐藏遮罩
            s.isHid=true;
            s.hideMask();
            //设置动元素动画
            s.activeEl.style.webkitTransitionDuration=s.params.duration+"ms";
            s.activeEl.style.webkitTransform=s.activeEl.hideTransform;
        }
        s.setAside=function(argAside){
            s.params.aside=argAside;
            s.update();
        }
        s.clearChange=function(){
            if(s.activeEl.style.removeProperty){
                s.activeEl.style.removeProperty("transform");
                s.activeEl.style.removeProperty("-webkit-transform");
            }else{
                s.activeEl.style.removeAttribute("transform");
                s.activeEl.style.removeAttribute("-webkit-transform");
            }
            //隐藏侧边栏
            s.aside.style.visibility="hidden";
        }
        s.addTransitionDuration=function(){
            s.activeEl.style.webkitTransitionDuration=s.params.duration+"ms";
        }
        s.removeTransitionDuration=function(){
            s.activeEl.style.webkitTransitionDuration="0ms";
        }
        /*=========================
          Control
          ===========================*/
        s.preventDefault=function(e){
            e.preventDefault();
        }
        s.events=function(detach){
            var touchTarget=s.container;
            var action=detach?"removeEventListener":"addEventListener";
            touchTarget[action]("touchstart",s.onTouchStart,false);
            touchTarget[action]("touchmove",s.onTouchMove,false);
            touchTarget[action]("touchend",s.onTouchEnd,false);
            touchTarget[action]("touchcancel",s.onTouchEnd,false);
            //preventDefault
            s.aside[action]("touchmove",s.preventDefault,false);
            s.section[action]("touchmove",s.preventDefault,false);
            touchTarget[action]("touchmove",s.preventDefault,false);
            //transitionEnd
            s.wrapper[action]("webkitTransitionEnd",s.onTransitionEnd,false);
            /*s.section[action]("webkitTransitionEnd",s.onTransitionEnd,false);
            s.aside[action]("webkitTransitionEnd",s.onTransitionEnd,false);*/
            //click
            if(s.params.isClickMaskHide==true)s.mask[action]("click",s.hide,false);
        }
        //attach、dettach事件
        s.attach=function(event){
            s.events();
        }
        s.detach=function(event){
            s.events(true);
        }
        //Events Handler
        s.onTouchStart=function(){
            
        }
        s.onTouchMove=function(){
            
        }
        s.onTouchEnd=function(){
            
        }
        s.onTransitionEnd=function(){
            s.removeTransitionDuration();
            if(s.isHid==true){
                s.clearChange();
            }
            //s.activeEl.removeAttribute("style",0);
        }
        function init(){
            s.attach();
        }
        init();
    }
})(window,document,undefined);