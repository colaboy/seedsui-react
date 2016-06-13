(function(window,document,undefined){
    window.Aside=function(container,params){
        /*=========================
          Model
          ===========================*/
        var defaults={
            "wrapperClass":"aside-wrapper",
            "leftSide":null,
            "rightSide":null,
            "asideContainerClass":"aside",
            "sides":{"left":null,"right":null},
            "threshold":{"left":60,"right":60},

            "duration":300,
            "isClickMaskHide":true,
            "isDrag":false,
            /*callbacks
            onInit:function(Aside)
            onSlideChangeStart:function(Aside)
            onSlideChange:function(Aside)
            onSlideChangeEnd:function(Aside)
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
            mask.setAttribute("class","mask");
            return mask;
        }
        s.mask=s.createMask();
        s.section.appendChild(s.mask);
        //Aside
        s.sides={"left":null,"right":null},s.position=null;
        s.update=function(){
            if(s.params.sides["left"])s.updateAside("left");
            if(s.params.sides["right"])s.updateAside("right");
        }
        s.updateAside=function(pos){
            //属性设置
            s.sides[pos]=typeof s.params.sides[pos]=="string"?s.wrapper.querySelector(s.params.sides[pos]):s.params.sides[pos];
            if(!s.sides[pos])return;
            var aside=s.sides[pos];
            //data-position
            aside.setAttribute("data-position",pos);
            //data-transition
            aside.transition=aside.getAttribute("data-transition")||"";
            //width
            aside.width=aside.clientWidth;
            if(pos=="right")aside.width=-aside.width;
            //动画设置
            switch(aside.transition){
                case "overlay":
                aside.showTransform='translate3d(0,0,0)',
                aside.hideTransform='translate3d('+-aside.width+'px,0,0)',
                aside.elTransform=aside;
                break;

                case "push":
                aside.showTransform='translate3d('+aside.width+'px,0,0)',
                aside.hideTransform='translate3d(0,0,0)',
                aside.elTransform=s.wrapper;
                break;

                default:
                aside.showTransform='translate3d('+aside.width+'px,0,0)',
                aside.hideTransform='translate3d(0,0,0)',
                aside.elTransform=s.section;
                break;
            }
        }
        s.update();
        s.updateActiveEl=function(aside){
            if(aside.transition=="overlay"){
                s.activeEl=aside;
            }else if(aside.transition=="push"){
                s.activeEl=s.wrapper;
            }else{
                s.activeEl=s.section;
            }
        }
        /*=========================
          Method
          ===========================*/
        s.showMask=function(){
            s.mask.style.visibility="visible";
            s.mask.style.opacity="1";
        }
        s.hideMask=function(){
            s.mask.style.visibility="hidden";
            s.mask.style.opacity="0";
        }
        s.transformTarget=function(target,transform,duration){
            if(!duration)duration=0;
            target.style.webkitTransitionDuration=duration+"ms";
            target.style.webkitTransform=transform;
        }
        s.isHid=true;
        s.show=function(pos){
            //设置显示侧边
            if(pos)s.position=pos;
            if(!s.sides[s.position]){
                s.position=null;
                return;
            }
            //记录显示状态
            s.isHid=false;
            //显示侧边栏
            s.sides[s.position].style.visibility="visible";
            s.showMask();
            s.transformTarget(s.sides[s.position].elTransform,s.sides[s.position].showTransform,s.params.duration);

            //记录触摸值
            s.touches.posX=s.sides[s.position].width;
            //隐藏滚动条
            s.section.style.overflow="hidden";
        }
        s.hide=function(){
            if(!s.sides[s.position]){
                s.position=null;
                return;
            }
            //记录显示状态
            s.isHid=true;
            //隐藏侧边栏
            s.hideMask();
            s.transformTarget(s.sides[s.position].elTransform,s.sides[s.position].hideTransform,s.params.duration);

            //记录触摸值
            s.touches.posX=0;
            //显示滚动条
            s.section.style.overflow="auto";
        }
        s.setLeftSide=function(argAside){
            s.params.sides["left"]=argAside;
            s.update();
        }
        s.setRightSide=function(argAside){
            s.params.sides["right"]=argAside;
            s.update();
        }
        s.clearChange=function(){
            //初始化transform
            if(s.sides[s.position].style.removeProperty){
                s.sides[s.position].style.removeProperty("transform");
                s.sides[s.position].style.removeProperty("-webkit-transform");
            }else{
                s.sides[s.position].style.removeAttribute("transform");
                s.sides[s.position].style.removeAttribute("-webkit-transform");
            }
            //初始化侧边栏
            s.sides[s.position].style.visibility="hidden";
            //初始化侧边栏
            s.position=null;
        }
        s.addTransitionDuration=function(){
            s.sides[s.position].style.webkitTransitionDuration=s.params.duration+"ms";
        }
        s.removeTransitionDuration=function(){
            s.sides[s.position].style.webkitTransitionDuration="0ms";
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
            if(s.params.isDrag){
                touchTarget[action]("touchstart",s.onTouchStart,false);
                touchTarget[action]("touchmove",s.onTouchMove,false);
                touchTarget[action]("touchend",s.onTouchEnd,false);
                touchTarget[action]("touchcancel",s.onTouchEnd,false);
            }
            touchTarget[action]("click",s.onClick,false);
            //transitionEnd
            s.wrapper[action]("webkitTransitionEnd",s.onTransitionEnd,false);
        }
        //attach、dettach事件
        s.attach=function(event){
            s.events();
        }
        s.detach=function(event){
            s.events(true);
        }
        //Events Handler
        //Touch信息
        s.touches={
            startX:0,
            startY:0,
            currentX:0,
            currentY:0,
            endX:0,
            endY:0,
            diffX:0,
            diffY:0,
            posX:0,
            direction:null,
            position:null
        };
        s.preventDefault=function(e){
            e.preventDefault();
        }
        s.stopPropagation=function(e){
            e.stopPropagation();
        }
        s.onTouchStart=function(e){
            s.container.addEventListener("touchmove",s.preventDefault,false);
            s.touches.startX=e.touches[0].clientX;
            s.touches.startY=e.touches[0].clientY;
        }
        s.showSide;
        s.onTouchMove=function(e){
            s.touches.currentX=e.touches[0].clientX;
            s.touches.currentY=e.touches[0].clientY;
            s.touches.diffX=s.touches.startX-s.touches.currentX;
            s.touches.diffY=s.touches.startY-s.touches.currentY;
            //设置滑动方向
            if(s.touches.direction==null){
                s.touches.direction=Math.abs(s.touches.diffY)-Math.abs(s.touches.diffX)>0?"vertical":"horizontal";
            }
            if(s.touches.direction=="vertical"){
                s.container.removeEventListener("touchmove",s.preventDefault,false);
                return;
            }
            e.stopPropagation();
            //x轴距离左边的像素，向左为负数，向右为正数
            var moveX=s.touches.posX-s.touches.diffX;
            //侧边显示方向
            if(!s.position){
                if(moveX<0)s.position="right";
                else s.position="left";
            }
            //拖动方向
            if(s.touches.diffX<0)s.touches.position="right";
            else s.touches.position="left";
            
            //是否存在此侧边
            if(!s.sides[s.position]){
                return;
            }

            //设置激活侧边栏
            if(!s.showSide){
                s.showSide=s.sides[s.position];
            }
            //判断是否是边缘
            if(Math.abs(moveX)>Math.abs(s.showSide.width)){
                //moveX=s.showSide.width;
                return;
            }
            if(s.position=="left" && moveX<0){
                //moveX=0;
                return;
            }
            if(s.position=="right" && moveX>0){
                //moveX=0;
                return;
            }
            
            //移动位置
            s.showSide.style.visibility="visible";
            if(s.showSide.transition=="overlay"){
                var translateX=-(s.showSide.width-moveX);
                s.transformTarget(s.showSide.elTransform,'translate3d('+translateX+'px,0,0)');
            }else if(s.showSide.transition=="push" || !s.showSide.transition || s.showSide.transition==""){
                s.transformTarget(s.showSide.elTransform,'translate3d('+moveX+'px,0,0)');
            }
        }
        s.onTouchEnd=function(e){
            var sidePos=s.position;
            var touchPos=s.touches.position;
            /*console.log("侧边栏："+sidePos);
            console.log("您拖动的方向："+touchPos);
            console.log("是否是隐藏状态："+s.isHid);*/

            //展开和收缩
            if(s.touches.direction=="horizontal"){
                var threshold=s.params.threshold[sidePos];//拖动阈值
                if(s.isHid){//隐藏状态
                    if(Math.abs(s.touches.diffX)>threshold){
                        s.show(sidePos);
                    }else{
                        s.hide();
                    }
                }else{//已显示状态
                    if(Math.abs(s.touches.diffX)>threshold){
                        if(sidePos==touchPos){//拖动方向相同时才隐藏
                            s.hide();
                        }
                    }else{
                        s.show();
                    }
                }
            }

            //清空滑动方向
            s.touches.direction=null;
            s.touches.position=null;
            s.showSide=null;
        }
        s.onClick=function(e){
            if(s.params.isClickMaskHide && e.target==s.mask && s.isHid==false){
                s.hide();
                s.preventDefault(e);
            }
        }
        s.onTransitionEnd=function(e){
            if(s.mask==e.target)return;

            //移除动画
            s.removeTransitionDuration();
            //如果是隐藏状态，清除修改项
            if(s.isHid==true){
                s.clearChange();
            }
        }
        function init(){
            s.attach();
        }
        init();
    }
})(window,document,undefined);