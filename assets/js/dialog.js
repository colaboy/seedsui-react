(function(window,document,undefined){
    window.Dialog=function(wrapper,params){
        /*=========================
          Model
          ===========================*/
        var defaults={
            dialogClass:"dialog",
            maskClass:"mask",
            position:null,
            defaultPosition:"middle",
            css:{},
            duration:"300",
            isClickMaskHide:true
            /*callbacks
            onClick:function(this)
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

        //Container
        s.dialog,s.mask,s.wrapper=typeof wrapper=="string"?document.querySelector(wrapper):wrapper;
        s.container=s.wrapper.parentNode;
        if(!s.wrapper)return;
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
            s.dialog=s.createContainerBox();
            s.container.insertBefore(s.dialog,s.wrapper);
            s.dialog.appendChild(s.wrapper);
            //插入遮罩
            s.mask=s.createMask();
            s.container.insertBefore(s.mask,s.dialog);
        }
        s.create();

        s.update=function(){
            s.wrapper.style.display="block";
            s.dialog.setAttribute("style","");
            if(s.params.position){
                s.dialog.setAttribute("data-position",s.params.position);
            }else if(s.dialog.getAttribute("data-position")){
                s.params.position=s.dialog.getAttribute("data-position");
            }else{
                s.params.position=s.params.defaultPosition;
                s.dialog.setAttribute("data-position",s.params.position);
            }

            for(var c in s.params.css){
                s.dialog.style[c]=s.params.css[c];
            }
            
            switch(s.params.position){
                case "top":case "top-right":
                s.dialog.showAnimation={webkitTransform:"translate3d(0,0,0)"},
                s.dialog.hideAnimation={webkitTransform:"translate3d(0,-100%,0)"},
                s.dialog.style.webkitTransform="translate3d(0,-100%,0)";
                break;
                case "top-center":
                s.dialog.showAnimation={webkitTransform:"translate3d(-50%,0,0)"},
                s.dialog.hideAnimation={webkitTransform:"translate3d(-50%,-100%,0)"},
                s.dialog.style.webkitTransform="translate3d(-50%,-100%,0)";
                break;

                case "bottom":case "bottom-right":
                s.dialog.showAnimation={webkitTransform:"translate3d(0,0,0)"},
                s.dialog.hideAnimation={webkitTransform:"translate3d(0,100%,0)"},
                s.dialog.style.webkitTransform="translate3d(0,100%,0)";
                break;
                case "bottom-center":
                s.dialog.showAnimation={webkitTransform:"translate3d(-50%,0,0)"},
                s.dialog.hideAnimation={webkitTransform:"translate3d(-50%,100%,0)"},
                s.dialog.style.webkitTransform="translate3d(-50%,100%,0)";
                break;

                case "left":case "left-bottom":
                s.dialog.showAnimation={webkitTransform:"translate3d(0,0,0)"},
                s.dialog.hideAnimation={webkitTransform:"translate3d(-100%,0,0)"},
                s.dialog.style.webkitTransform="translate3d(-100%,0,0)";
                break;
                case "left-middle":
                s.dialog.showAnimation={webkitTransform:"translate3d(0,-50%,0)"},
                s.dialog.hideAnimation={webkitTransform:"translate3d(-100%,-50%,0)"},
                s.dialog.style.webkitTransform="translate3d(-100%,-50%,0)";
                break;

                case "right":case "right-bottom":
                s.dialog.showAnimation={webkitTransform:"translate3d(0,0,0)"},
                s.dialog.hideAnimation={webkitTransform:"translate3d(100%,0,0)"},
                s.dialog.style.webkitTransform="translate3d(100%,0,0)";
                break;

                case "right-middle":
                s.dialog.showAnimation={webkitTransform:"translate3d(0,-50%,0)"},
                s.dialog.hideAnimation={webkitTransform:"translate3d(100%,-50%,0)"},
                s.dialog.style.webkitTransform="translate3d(100%,-50%,0)";
                break;

                default:
                s.dialog.showAnimation={opacity:1},
                s.dialog.hideAnimation={opacity:0},
                s.dialog.style.opacity=0;
                break;
            }
            s.dialog.style.webkitTransitionDuration=s.params.duration+"ms";
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
        s.destoryMask=function(){
            s.container.removeChild(s.mask);
        }
        s.showDialog=function(){
            s.dialog.style.visibility="visible";
            for(var ani in s.dialog.showAnimation){
                s.dialog.style[ani]=s.dialog.showAnimation[ani];
            }
        }
        s.hideDialog=function(){
            for(var ani in s.dialog.hideAnimation){
                s.dialog.style[ani]=s.dialog.hideAnimation[ani];
            }
        }
        s.destoryDialog=function(){
            s.container.removeChild(s.dialog);
        }
        s.isHid=true;
        s.show=function(){
            s.isHid=false;
            s.showMask();
            s.showDialog();
        }
        s.hide=function(){
            s.isHid=true;
            s.hideMask();
            s.hideDialog();
        }
        s.destory=function(){
            s.destoryMask();
            s.destoryDialog();
        }
        //设置位置
        s.setPosition=function(pos){
            s.params.position=pos;
            s.update();
        }

        //Callback
        if(s.params.onClick){
            s.wrapper.addEventListener("click",onClickCallback,false);
        }
        function onClickCallback(e){
            s.target=e.target;
            s.params.onClick(s)
        };
        /*================
        Control
        ================*/
        s.events=function(detach){
            var touchTarget=s.dialog;
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
        s.onClickMask=function(){
            if(s.params.isClickMaskHide)s.hide();
        }
        s.onTransitionEnd=function(e){
            if(s.isHid){
                s.dialog.style.visibility="hidden";
                s.mask.style.visibility="hidden";
            }
        }

        s.init=function(){
            s.attach();
        }
        s.init();
    }
})(window,document,undefined);