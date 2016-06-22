//Scrollpicker 滚动选择器
(function(window,document,undefined){
    window.Scrollpicker=function(params){
        /*=========================
          Model
          ===========================*/
        var defaults={
            container:null,
            headerClass:"scrollpicker-header",
            headerDoneClass:"scrollpicker-done",
            headerDoneText:"完成",
            headerCancelClass:"scrollpicker-cancel",
            headerCancelText:"取消",
            wrapperClass:"scrollpicker-wrapper",
            layerClass:"scrollpicker-layer",
            layerFrameClass:"scrollpicker-layer-frame",
            slotsClass:"scrollpicker-slots",
            slotClass:"scrollpicker-slot",
            lockClass:"lock",
            slotActiveClass:"active",
            slotListActiveClass:"active",
            cellHeight:44,
            friction:0.002,//摩擦力
            bounceRange:44,//弹性值
            isClickMaskHide:true,
            isCascade:false,//是否清除后面的值
            defaultValues:[{'key':null,'value':'----'}]

            /*callbacks
            onClickCancel:function(Scrollpicker)
            onClickDone:function(Scrollpicker)
            onScrollStart:function(Scrollpicker)
            onScroll:function(Scrollpicker)
            onScrollEnd:function(Scrollpicker)
            */
        }
        params=params||{};
        for(var def in defaults){
            if(params[def]===undefined){
                params[def]=defaults[def];
            }
        }
        //Scrollpicker
        var s=this;

        //Params
        s.params = params;

        //Dom元素
        s.container,s.mask,s.header,s.wrapper,s.slotbox,s.layer,s.headerDone,s.headerCancel;
        //槽元素与其值
        s.slots=[],s.slots.col=0,s.activeOptions=[],s.activeOption={};
        //是否渲染
        s.isRendered=false;
        /*=========================
          View
          ===========================*/
        //新建Container
        s.createContainer=function(){
            var container=document.createElement("div")
            container.setAttribute("class","scrollpicker");
            return container;
        }
        //新建Header
        s.createHeader=function(){
            var header=document.createElement("div");
            header.setAttribute("class",s.params.headerClass);
            return header;
        }
        //新建Header按钮
        s.createHeaderDone=function(){
            var headerDone=document.createElement("a");
            headerDone.setAttribute("class",s.params.headerDoneClass);
            headerDone.innerHTML=s.params.headerDoneText;
            return headerDone;
        }
        s.createHeaderCancel=function(){
            var headerCancel=document.createElement("a");
            headerCancel.setAttribute("class",s.params.headerCancelClass);
            headerCancel.innerHTML=s.params.headerCancelText;
            return headerCancel;
        }
        //新建Wrapper
        s.createWrapper=function(){
            var wrapper=document.createElement("div");
            wrapper.setAttribute("class",s.params.wrapperClass);
            return wrapper;
        }
        //新建Slotbox
        s.createSlotbox=function(){
            var slotbox=document.createElement("div");
            slotbox.setAttribute("class",s.params.slotsClass);
            return slotbox;
        }
        //新建Layer
        s.createLayer=function(){
            var layer=document.createElement("div");
            layer.setAttribute("class",s.params.layerClass);
            var layerFrame=document.createElement("div");
            layerFrame.setAttribute("class",s.params.layerFrameClass);
            layer.appendChild(layerFrame);
            return layer;
        }
        //新建Mask
        s.createMask=function(){
            var mask=document.createElement("div");
            mask.setAttribute("class","mask");
            return mask;
        }
        //新建一行List
        s.createLi=function(value,classes){
            var li=document.createElement("li");
            li.setAttribute("class",classes);
            li.innerHTML=value;
            return li;
        }
        //创建DOM
        s.create=function(){
            if(s.params.container){
                s.container=typeof container=="string"?document.querySelector(container):container;
                s.mask=s.container.previousElementSibling;
                s.header=s.container.querySelector("."+s.params.headerClass);
                s.headerDone=s.container.querySelector("."+s.params.headerDoneClass);
                s.headerCancel=s.container.querySelector("."+s.params.headerCancelClass);
                s.wrapper=s.container.querySelector("."+s.params.wrapperClass);
                s.slotbox=s.container.querySelector("."+s.params.slotsClass);
                s.layer=s.container.querySelector("."+s.params.layerClass);
            }else{
                s.container=s.createContainer();
                s.mask=s.createMask();
                s.header=s.createHeader();
                s.headerDone=s.createHeaderDone();
                s.headerCancel=s.createHeaderCancel();
                s.wrapper=s.createWrapper();
                s.slotbox=s.createSlotbox();
                s.layer=s.createLayer();

                s.header.appendChild(s.headerCancel);
                s.header.appendChild(s.headerDone);

                s.wrapper.appendChild(s.slotbox);
                s.wrapper.appendChild(s.layer);

                s.container.appendChild(s.header);
                s.container.appendChild(s.wrapper);

                document.body.appendChild(s.mask);
                document.body.appendChild(s.container);
            }
        }
        s.create();
        /*=========================
          Method
          ===========================*/
        //添加一列
        s.addSlot=function(values,classes,defaultValue){
            if (!classes){
                classes='';
            }
            //设置属性
            var slot=document.createElement("ul");
            slot.setAttribute("class",s.params.slotClass+" "+classes);
            slot.values=values;
            slot.defaultValue=defaultValue;
            slot.col=s.slots.col;
            //判断是否有锁定
            if(classes.indexOf(s.params.lockClass)>=0)slot.isLock=true;
            else slot.isLock=false;
            //渲染
            s.slots.col++;
            s.renderSlot(slot);
            s.slotbox.appendChild(slot);
            //添加到集合里
            s.slots.push(slot);
        }
        //替换一列
        s.replaceSlot=function(col,values,classes,defaultValue){
            //设置属性
            var slot=s.slots[col];
            slot.setAttribute("class",s.params.slotClass+" "+classes);
            slot.values=values;
            slot.defaultValue=defaultValue;
            //清空此列
            s.clearSlot(slot);
            //重新渲染
            s.renderSlot(slot);
            if(s.params.isCascade)clearAfterSlot(col);
        }
        //修改一列
        s.mergeSlot=function(col,values){
            //设置属性
            var slot=s.slots[col];
            slot.values=values;
            //更新此列
            s.renderSlot(slot);
        }
        //清空下列
        function clearAfterSlot(col){
            var nextCol=++col;
            var nextSlot=s.slots[nextCol];
            if(nextSlot){
                nextSlot.innerHTML="<li>"+s.params.defaultValues[0].value+"</li>"
                s.updateSlot(nextSlot);
                clearAfterSlot(nextCol);
                //设置选中项
                s.activeOptions[nextCol]=s.params.defaultValues[0];
            }
        }
        //清空一列
        s.clearSlot=function(slot){
            //初始化一列值
            slot.activeIndex=null;
            slot.defaultIndex=null;
        }
        //渲染一列
        s.renderSlot=function(slot){
            slot.innerHTML="";
            slot["list"]=[];
            var col=slot.col;
            var values=slot.values;
            var defaultValue=slot.defaultValue;
            //选中项不能超过总项数
            if(slot.activeIndex && slot.activeIndex>=values.length-1){
                slot.activeIndex=values.length-1;
            }
            //渲染
            for(var i=0,rowData;rowData=values[i];i++){
                //获得activeIndex
                if(defaultValue && defaultValue==rowData["value"]){
                    if(!slot.activeIndex){
                        slot.activeIndex=i;
                    }
                    slot.defaultIndex=i;
                }else{
                    if(!slot.activeIndex){
                        slot.activeIndex=0;
                    }
                    slot.defaultIndex=0;
                }

                //添加到选中项
                var li,liClasses="";
                if(i==slot.activeIndex){
                    liClasses="active";
                    s.activeOptions[col]=rowData;
                }

                li=s.createLi(rowData["value"],liClasses);
                slot.appendChild(li);
                slot["list"].push(li);
            }
            //更新此列
            s.updateSlot(slot);
        }
        //更新DOM数据，获得所有槽和槽内list列表
        s.updateSlot=function(slot){
            //slot["list"]=[].slice.call(slot.querySelectorAll("li"));
            slot["defaultPosY"]=-slot.defaultIndex*s.params.cellHeight;
            slot["activePosY"]=-slot.activeIndex*s.params.cellHeight;
            slot["posY"]=slot["activePosY"];
            slot["minPosY"]=0;
            slot["maxPosY"]=-(slot["list"].length-1)*s.params.cellHeight;
            slot["minBouncePosY"]=s.params.bounceRange;
            slot["maxBouncePosY"]=slot["maxPosY"]-s.params.bounceRange;
            slot.style.WebkitTransform='translate3d(0px,'+slot["activePosY"]+'px,0px)';
            slot["list"].forEach(function(n,i,arr){
                n.className="";
                if(i==slot.activeIndex){
                    n.className="active";
                }
            });
        }
        s.updateSlots=function(){
            s.slots=[].slice.call(s.container.querySelectorAll("."+s.params.slotClass));
            s.slots.forEach(function(n,i,a){
                s.clearSlot(n);
                s.renderSlot(n);
            });
        }
        
        //显示
        s.show=function(){
            if(s.isRendered==false){
                s.attach();
            }
            s.mask.style.visibility="visible";
            s.mask.style.opacity="1";
            s.container.style.WebkitTransform='translate3d(0px,0px,0px)';
        }
        //隐藏
        s.hide=function(){
            s.mask.style.opacity="0";
            s.mask.style.visibility="hidden";
            s.container.style.WebkitTransform='translate3d(0px,100%,0px)';
        }
        //重置
        s.reset=function(){
            //清空指向
            s.slots=[];
            //清空数据
            s.isRendered=false;
            s.slotbox.innerHTML="";
        }
        //清除
        s.destroy=function(){
            s.detach();
            document.body.removeChild(s.mask);
            document.body.removeChild(s.container);
        }
        
        s.slotPosY=function(slot,posY){
            slot.style.WebkitTransform='translate3d(0px,' + posY + 'px,0px)';
        }
        s.updateActiveSlot=function(xPos){
            var xPos=xPos||0;
            var slotPos=0;
            for(var i=0;i<s.slots.length;i++){
                slotPos+=s.slots[i].clientWidth;
                if (xPos<slotPos) {
                    s.activeSlot=s.slots[i];
                    s.activeSlotIndex=i;
                    break;
                }
            }
        }
        //计算惯性时间与坐标，返回距离和时间
        s.getInertance=function(distance,duration,friction){
            //使用公式算出惯性执行时间与距离
            var newDuration=(2*distance/duration)/friction;
            var newDistance=-(friction/2)*(newDuration*newDuration);
            //如果惯性执行时间为负值，则为向上拖动
            if(newDuration<0){
                newDuration=-newDuration;
                newDistance=-newDistance;
            }
            return {distance:newDistance,duration:newDuration}
        }
        var isTransitionEnd=true;//有时候原坐标和目标坐标相同时，不会执行transition事件，用此值来记录是否执行的状态
        //滚动至
        s.scrollTo=function(slot,posY,duration){
            slot.posY=posY;
            if(duration==0 || duration){
                var duration=duration;
            }else{
                duration=100;
            }
            if(posY>slot.minBouncePosY){
                slot.posY=slot.minBouncePosY;
                duration=s.sideDuration(posY,slot.minBouncePosY,duration);//计算新的执行时间
            }else if(posY<slot.maxBouncePosY){
                slot.posY=slot.maxBouncePosY;
                duration=s.sideDuration(posY,slot.maxBouncePosY,duration);//计算新的执行时间
            }
            slot.style.webkitTransitionDuration=duration+"ms";
            slot.style.WebkitTransform='translate3d(0px,' + slot.posY + 'px,0px)';
            //如果不执行onTransitionEnd
            if(isTransitionEnd==false || duration==0){
                s.onTransitionEnd();
                isTransitionEnd=true;
            }
        }
        //计算超出边缘时新的时间
        s.sideDuration=function(posY,bouncePosY,duration){
            return Math.round(duration/(posY/bouncePosY));
        }
        //更新列表激活状态
        s.updateActiveList=function(posY){
            var index=-Math.round((posY-s.params.cellHeight*2)/s.params.cellHeight)-2;
            s.activeSlot.list.forEach(function(n,i,a){
                n.classList.remove("active");
                if(i==index){
                    n.classList.add("active");
                    //s.activeNode=n;
                }
            });
            //添加到激活项
            s.activeOption=s.slots[s.activeSlotIndex].values[index];
            s.activeOptions[s.activeSlotIndex]=s.activeOption;
            //设置选中项
            s.slots[s.activeSlotIndex].activeIndex=index;
        }
        //位置矫正
        s.posCorrect=function(){
            s.activeSlot.style.webkitTransitionDuration='500ms';
            var remainder=s.activeSlot.posY%s.params.cellHeight;
            if(remainder!=0){
                //算出比例
                var divided=Math.round(s.activeSlot.posY/s.params.cellHeight);
                //对准位置
                var top=s.params.cellHeight*divided;
                s.activeSlot.posY=top;
                s.activeSlot.style.WebkitTransform='translate3d(0px,' + top + 'px,0px)';
            }
            s.updateActiveList(s.activeSlot.posY);
            //动画时间回0
            s.activeSlot.style.webkitTransitionDuration='0ms';
            //Callback
            if(s.params.onScrollEnd)s.params.onScrollEnd(s);
        }
        /*=========================
          Control
          ===========================*/
        s.events=function(detach){
            var touchTarget=s.layer;
            var action=detach?"removeEventListener":"addEventListener";
            touchTarget[action]("touchstart",s.onTouchStart,false);
            touchTarget[action]("touchmove",s.onTouchMove,false);
            touchTarget[action]("touchend",s.onTouchEnd,false);
            touchTarget[action]("touchcancel",s.onTouchEnd,false);
            //preventDefault
            s.mask[action]("touchmove",preventDefault,false);
            s.header[action]("touchmove",preventDefault,false);
            touchTarget[action]("touchmove",preventDefault,false);
            //transitionEnd
            s.slots.forEach(function(n,i,a){
                n[action]("webkitTransitionEnd",s.onTransitionEnd,false);
            });
            //mask
            if(s.params.isClickMaskHide==true)s.mask[action]("click",s.hide,false);
            //确定和取消按钮
            if(s.params.onClickDone)s.headerDone[action]("click",s.onClickDone,false);
            if(s.params.onClickCancel)s.headerCancel[action]("click",s.onClickCancel,false);
        }
        //attach、dettach事件
        s.attach=function(event){
            s.events();
        }
        s.detach=function(event){
            s.events(true);
        }
        s.touches={
            startX:0,
            startY:0,
            currentX:0,
            currentY:0,
            endX:0,
            endY:0,
            startTimeStamp:0,
            duration:0,
            diffX:0,
            diffY:0,
            direction:null
        };
        function preventDefault(e){
            e.preventDefault();
        }
        //取消和确定按钮
        s.onClickDone=function(e){
            s.target=e.target;
            s.params.onClickDone(s);
        }
        s.onClickCancel=function(e){
            s.target=e.target;
            s.params.onClickCancel(s);
        }
        //添加和删除取消和确定按钮点击
        s.setOnClickDone=function(callback){
            s.params.onClickDone=callback;
            s.headerDone.addEventListener("click",onClickDoneCallback,false);
        }
        s.removeOnClickDone=function(){
            s.params.onClickDone=null;
            s.headerDone.removeEventListener("click",onClickDoneCallback,false);
        }
        function onClickDoneCallback(e){
            s.target=e.target;
            s.params.onClickDone(s)
        };
        s.setOnClickCancel=function(callback){
            s.params.onClickCancel=callback;
            s.headerCancel.addEventListener("click",onClickCancelCallback,false);
        }
        s.removeOnClickCancel=function(){
            s.params.onClickCancel=null;
            s.headerCancel.removeEventListener("click",onClickCancelCallback,false);
        }
        function onClickCancelCallback(e){
            s.target=e.target;
            s.params.onClickCancel(s)
        };
        //触摸事件
        s.onTouchStart=function(e){
            //s.layer.addEventListener("touchmove",preventDefault,false);
            s.touches.startX=e.touches[0].clientX;
            s.touches.startY=e.touches[0].clientY;
            //寻找当前点击的槽
            s.updateActiveSlot(s.touches.startX);
            //记录点击时间
            s.touches.startTimeStamp=e.timeStamp;
            //Callback
            if(s.params.onScrollStart)s.params.onScrollStart(s);
        }
        s.onTouchMove=function(e){
            if(s.activeSlot.isLock)return;
            s.touches.currentY=e.touches[0].clientY;
            s.touches.diffY=s.touches.startY-s.touches.currentY;
            s.activeSlot.moveY=s.activeSlot.posY-s.touches.diffY;
            if(s.activeSlot.moveY>s.activeSlot.minBouncePosY){
                s.activeSlot.moveY=s.activeSlot.minBouncePosY;
            }else if(s.activeSlot.moveY<s.activeSlot.maxBouncePosY){
                s.activeSlot.moveY=s.activeSlot.maxBouncePosY;
            }
            s.activeSlot.style.WebkitTransform='translate3d(0px,' + s.activeSlot.moveY + 'px,0px)';
            s.updateActiveList(s.activeSlot.moveY);

            //Callback
            if(s.params.onScroll)s.params.onScroll(s);
        }
        s.onTouchEnd=function(e){
            if(s.activeSlot.isLock)return;
            //设置当前坐标值
            s.activeSlot.posY=s.activeSlot.moveY;
            //计算拖动时间
            s.touches.duration=e.timeStamp-s.touches.startTimeStamp;
            //惯性值计算
            var inertance=s.getInertance(s.touches.diffY,s.touches.duration,s.params.friction);
            //惯性Y坐标
            var newPosY=s.activeSlot.posY + inertance.distance;
            //如果原坐标和目标坐标相同，则不执行transitionEnd
            if(s.activeSlot.moveY==s.activeSlot.minBouncePosY || s.activeSlot.moveY==s.activeSlot.maxBouncePosY){
                isTransitionEnd=false;
            }
            //滚动到指定位置
            s.scrollTo(s.activeSlot,newPosY,inertance.duration);
        }
        //惯性滚动结束后
        s.onTransitionEnd=function(){
            //如果跑到边界之外回到圈内
            if (s.activeSlot.posY > 0){
                s.activeSlot.posY=0;
            }else if(s.activeSlot.posY < s.activeSlot.maxPosY) {
                s.activeSlot.posY=s.activeSlot.maxPosY;
            }
            s.activeSlot.style.WebkitTransform='translate3d(0px,' + s.activeSlot.posY + 'px,0px)';
            //位置矫正
            s.posCorrect();
        }
        function init(){
            if(s.params.container){
                s.attach();
            }
        }
        init();
    }
})(window,document,undefined);