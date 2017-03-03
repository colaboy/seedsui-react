//Scrollpicker 滚动选择器
(function(window,document,undefined){
    window.Scrollpicker=function(params){
        /*=========================
          Model
          ===========================*/
        var defaults={
            parent:document.body,
            //picker:null,
            pickerClass:"scrollpicker",
            pickerActiveClass:"active",
            headerClass:"scrollpicker-header",
            headerDoneClass:"scrollpicker-done",
            headerDoneText:"完成",
            headerCancelClass:"scrollpicker-cancel",
            headerCancelText:"取消",
            wrapperClass:"scrollpicker-wrapper",
            layerClass:"scrollpicker-layer",
            layerFrameClass:'scrollpicker-layer-frame',
            layerFrameHTML:'<div class="scrollpicker-layer-frame"></div>',
            slotsClass:"scrollpicker-slots",
            slotClass:"scrollpicker-slot",
            lockClass:"lock",
            slotActiveClass:"active",
            slotLiActiveClass:"active",
            cellHeight:44,
            friction:0.002,//摩擦力
            bounceRange:44,//弹性值
            isClickMaskHide:true,
            isCascade:false,//是否清除后面的值
            defaultValues:[{'key':null,'value':'----'}]

            /*callbacks
            onInit:function(Scrollpicker)
            onClickCancel:function(Scrollpicker)
            onClickDone:function(Scrollpicker)
            onScrollStart:function(Scrollpicker)
            onScroll:function(Scrollpicker)
            onScrollEnd:function(Scrollpicker)
            onTransitionEnd:function(Scrollpicker)//动画结束后回调
            onShowed(Scrollpicker)//显示动画结束后回调
            onHid(Scrollpicker)//隐藏动画结束后回调
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
        s.parent=typeof s.params.parent=="string"?document.querySelector(s.params.parent):s.params.parent;
        s.picker,s.mask,s.header,s.wrapper,s.slotbox,s.layer,s.headerDone,s.headerCancel;
        //槽元素与其值
        s.slots=[],s.activeOptions=[];
        //新建Container
        s.createPicker=function(){
            var picker=document.createElement("div")
            picker.setAttribute("class",s.params.pickerClass);
            return picker;
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
            layer.innerHTML=s.params.layerFrameHTML;
            return layer;
        }
        //新建Mask
        s.createMask=function(){
            var mask=document.createElement("div");
            mask.setAttribute("class","mask");
            return mask;
        }
        //新建一行List
        s.createLi=function(value){
            var li=document.createElement("li");
            li.innerHTML=value;
            return li;
        }
        //创建DOM
        s.create=function(){
            s.picker=s.createPicker();
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

            s.picker.appendChild(s.header);
            s.picker.appendChild(s.wrapper);

            s.parent.appendChild(s.mask);
            s.parent.appendChild(s.picker);
        }
        s.create();
        /*=========================
          Method
          ===========================*/
        //添加一列
        s.addSlot=function(values,defaultKey,classes){
            if (!classes)classes='';
            //设置属性
            var slot=document.createElement("ul");
            slot.setAttribute("class",s.params.slotClass+" "+classes);
            slot.values=values;
            slot.defaultKey=defaultKey;
            if(classes.indexOf(s.params.lockClass)>=0)slot.isLock=true;
            else slot.isLock=false;

            //渲染
            s.renderSlot(s.slots.length,slot);
            //添加到集合里
            s.slots.push(slot);
        }
        //替换一列
        s.replaceSlot=function(index,values,defaultKey,classes,fn){
            if (!classes)classes='';
            //设置属性
            var slot=s.slots[index];
            slot.setAttribute("class",s.params.slotClass+" "+classes);
            slot.values=values;
            slot.defaultKey=defaultKey;
            if(classes.indexOf(s.params.lockClass)>=0)slot.isLock=true;
            else slot.isLock=false;

            //渲染
            s.renderSlot(index,slot);
            //级联更新
            //if(s.params.isCascade)clearAfterSlot(index);
            //if(fn)fn(s);
        }
        //清空下列
        function clearAfterSlot(col){
            var nextCol=++col;
            var nextSlot=s.slots[nextCol];
            if(nextSlot){
                nextSlot.innerHTML="<li>"+s.params.defaultValues[0].value+"</li>"
                //s.updateSlot(nextSlot);
                console.log(nextSlot);
                s.renderSlot(nextCol,nextSlot);
                clearAfterSlot(nextCol);
                //设置选中项
                s.activeOptions[nextCol]=s.params.defaultValues[0];
            }
        }
        //渲染一列
        s.renderSlot=function(index,slot){
            slot.innerHTML="";
            //渲染
            slot.defaultIndex=0;
            slot.list=[];
            for(var i=0,value;value=slot.values[i];i++){
                //获得defaultIndex
                if(!slot.defaultIndex && slot.defaultKey && slot.defaultKey==value["key"]){
                    slot.defaultIndex=i;
                }

                //把li添加到槽中
                var li=s.createLi(value["value"]);
                slot.list.push(li);
                slot.appendChild(li);
            }
            slot.activeIndex=slot.defaultIndex;
            //选中项
            s.activeOptions[index]=slot.values[slot.activeIndex];
            slot.list[slot.activeIndex].className=s.params.slotLiActiveClass;
            //设置一槽的属性
            /*
            slot.values
            slot.defaultKey
            slot.defaultIndex
            slot.activeIndex
            slot.index
            slot.list
            */
            slot.index=index;
            slot.defaultPosY=-slot.defaultIndex*s.params.cellHeight;
            slot.activePosY=-slot.activeIndex*s.params.cellHeight;
            slot.minPosY=0;
            slot.maxPosY=-(slot.values.length-1)*s.params.cellHeight;
            slot.minBouncePosY=s.params.bounceRange;
            slot.maxBouncePosY=slot.maxPosY-s.params.bounceRange;
            s.slotbox.appendChild(slot);
            slot.style.webkitTransform='translate3d(0px,'+slot.activePosY+'px,0px)';
        }
        s.isHid=true;
        //显示
        s.show=function(){
            s.isHid=false;
            s.mask.style.visibility="visible";
            s.mask.style.opacity="1";
            s.picker.classList.add(s.params.pickerActiveClass);
        }
        //隐藏
        s.hide=function(){
            s.isHid=true;
            s.mask.style.opacity="0";
            s.mask.style.visibility="hidden";
            s.picker.classList.remove(s.params.pickerActiveClass);
        }
        //重置
        s.reset=function(){
            //清空指向
            s.slots=[];
            //清空数据
            s.slotbox.innerHTML="";
        }
        //清除
        s.destroy=function(){
            s.detach();
            s.parent.removeChild(s.mask);
            s.parent.removeChild(s.picker);
        }
        //寻找当前点击的槽
        s.updateActiveSlot=function(xPos){
            var xPos=xPos||0;
            var slotPos=0;
            for(var i=0;i<s.slots.length;i++){
                slotPos+=s.slots[i].clientWidth;
                if (xPos<slotPos) {
                    s.activeSlot=s.slots[i];
                    break;
                }
            }
        }
        //计算惯性时间与坐标，返回距离和时间
        s.getInertance=function(opts){
            var range=opts.range,//滑动距离(正数)
                duration=opts.duration,//滑动时长
                friction=opts.friction,//惯性强度
                value=opts.value,//当前值(负数)
                min=opts.min,//最小值(正数)
                max=opts.max;//最大值(负数)

            //使用公式算出duration(新时长)与range(新距离)
            var newDuration=(2*range/duration)/friction;
            if(!newDuration && newDuration!==0){
                newDuration=100;
            }
            //使用公式算出range(新距离)
            var newRange=-(friction/2)*(newDuration*newDuration);//(负数)
            if(range<0){//如果拖动间距为负值，则为向下拖动
                newDuration=-newDuration;
                newRange=-newRange;
            }
            //计算value(新值)
            var newValue=value+newRange;

            //如果超出边缘，重新计算duration(新时间)与value(新值)
            if(newValue>min){//顶部
                newRange=Math.abs(value-min);
                newDuration=Math.abs(Math.round(range/duration*100));
                newValue=min;
                //console.log("value:"+value+";min:"+min+";newRange:"+newRange+";newDuration:"+newDuration);
            }else if(newValue<max){//底部
                newValue=max;
                newDuration=Math.abs(Math.round(range/duration*100));
                newRange=max-value;
                //console.log("value:"+value+";max:"+max+";newRange:"+newRange+";newDuration:"+newDuration);
            }

            //返回值
            return {
                range:newRange,
                duration:newDuration,
                value:newValue
            }
        }
        //更新列表激活状态
        s.updateActiveList=function(slot,posY){
            var index=-Math.round((posY-s.params.cellHeight*2)/s.params.cellHeight)-2;
            slot.list.forEach(function(n,i,a){
                n.classList.remove("active");
                if(i==index){
                    n.classList.add("active");
                    //s.activeNode=n;
                }
            });
            //添加到激活项
            var activeOption=s.slots[slot.index].values[index];
            s.activeOptions[slot.index]=activeOption;
            //设置选中项
            s.slots[slot.index].activeIndex=index;
        }
        //位置矫正
        s.posCorrect=function(slot){
            slot.style.webkitTransitionDuration='500ms';
            if (slot.activePosY > slot.minPosY){//最上面
                slot.activePosY=slot.minPosY;
            }else if(slot.activePosY < slot.maxPosY) {//最下面
                slot.activePosY=slot.maxPosY;
            }else{//在中间
                var remainder=slot.activePosY%s.params.cellHeight;
                if(remainder!=0){
                    //算出比例
                    var divided=Math.round(slot.activePosY/s.params.cellHeight);
                    //对准位置
                    slot.activePosY=s.params.cellHeight*divided;
                }
            }
            slot.style.webkitTransform='translate3d(0px,' + slot.activePosY + 'px,0px)';
            s.updateActiveList(slot,slot.activePosY);
            //动画时间回0
            slot.style.webkitTransitionDuration='0ms';
            //标识正在刷新，防止重复刷新
            s.isRefreshing=false;
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
            s.picker[action]("webkitTransitionEnd",s.onTransitionEnd,false);
            //mask
            s.mask[action]("click",s.onClickMask,false);
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
        function preventDefault(e){
            e.preventDefault();
        }
        //Mask
        s.onClickMask=function(e){
            if(s.params.isClickMaskHide===true)s.hide();
        }
        //Done|Cancel
        s.onClickDone=function(e){
            s.target=e.target;
            s.params.onClickDone(s);
        }
        s.onClickCancel=function(e){
            s.target=e.target;
            s.params.onClickCancel(s);
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
            posY:0,
            currentPosY:0,
            direction:null
        };
        //标识正在刷新，防止重复刷新
        s.isRefreshing=false;
        s.lockScroll=function(){
            s.layer.removeEventListener("touchmove",s.onTouchMove,false);
            s.layer.removeEventListener("touchend",s.onTouchEnd,false);
            s.layer.removeEventListener("touchcancel",s.onTouchEnd,false);
        }
        s.unLockScroll=function(){
            s.layer.addEventListener("touchmove",s.onTouchMove,false);
            s.layer.addEventListener("touchend",s.onTouchEnd,false);
            s.layer.addEventListener("touchcancel",s.onTouchEnd,false);
        }
        //触摸事件
        s.onTouchStart=function(e){
            //正在刷新将不工作
            if(s.isRefreshing){
                s.lockScroll();
                return;
            }
            s.touches.startX=e.touches[0].clientX;
            s.touches.startY=e.touches[0].clientY;
            //寻找当前点击的槽
            s.updateActiveSlot(s.touches.startX);

            //锁定的槽将不工作
            if(s.activeSlot.isLock){
                s.lockScroll();
                return;
            }
            s.touches.posY=s.activeSlot.activePosY;
            //解除锁定
            s.unLockScroll();
            
            //记录点击时间
            s.touches.startTimeStamp=e.timeStamp;
            //Callback
            if(s.params.onScrollStart)s.params.onScrollStart(s);
        }
        s.onTouchMove=function(e){
            s.touches.currentY=e.touches[0].clientY;
            s.touches.diffY=s.touches.startY-s.touches.currentY;
            s.touches.currentPosY=s.touches.posY-s.touches.diffY;
            if(s.touches.currentPosY > s.activeSlot.minBouncePosY){
                s.touches.currentPosY=s.activeSlot.minBouncePosY;
            }else if(s.touches.currentPosY<s.activeSlot.maxBouncePosY){
                s.touches.currentPosY=s.activeSlot.maxBouncePosY;
            }
            s.activeSlot.style.webkitTransform='translate3d(0px,' + s.touches.currentPosY + 'px,0px)';
            //当前槽选中行
            s.updateActiveList(s.activeSlot,s.touches.currentPosY);

            //Callback
            if(s.params.onScroll)s.params.onScroll(s);
        }
        s.onTouchEnd=function(e){
            //标识正在刷新，防止重复刷新
            s.isRefreshing=true;
            //判断是否是tap
            s.touches.endX=e.changedTouches[0].clientX;
            s.touches.endY=e.changedTouches[0].clientY;
            s.touches.diffX=s.touches.startX-s.touches.endX;
            s.touches.diffY=s.touches.startY-s.touches.endY;
            if(Math.abs(s.touches.diffX) < 6 && Math.abs(s.touches.diffY) < 6 ){
                return;
            }
            //计算拖动时间
            s.touches.duration=e.timeStamp-s.touches.startTimeStamp;
            //惯性值计算
            var inertance=s.getInertance({
                range:s.touches.diffY,
                duration:s.touches.duration,
                friction:s.params.friction,
                value:s.touches.currentPosY,
                min:s.activeSlot.minBouncePosY,
                max:s.activeSlot.maxBouncePosY
            });
            //滚动到指定位置
            s.activeSlot.style.webkitTransitionDuration=inertance.duration+"ms";
            s.activeSlot.activePosY=inertance.value;
            s.activeSlot.style.webkitTransform='translate3d(0px,' + inertance.value + 'px,0px)';
            //不执行onTransitionEnd的情况，则需要手动执行onTransitionEnd
            if(s.touches.currentPosY==s.activeSlot.minBouncePosY || s.touches.currentPosY==s.activeSlot.maxBouncePosY){
                var e={};
                e.target=s.activeSlot;
                s.onTransitionEnd(e);
            }
        }
        //惯性滚动结束后
        s.onTransitionEnd=function(e){
            var target=e.target;
            if(target.classList.contains(s.params.slotClass)){//slot槽结束
                s.posCorrect(target);//位置矫正
            }else if(target.classList.contains(s.params.pickerClass)){//容器
                if(s.params.onTransitionEnd)s.params.onTransitionEnd(s);
                if(s.isHid){
                    if(s.params.onHid)s.params.onHid(s);
                }else{
                    if(s.params.onShowed)s.params.onShowed(s);
                }
            }
        }
        function init(){
            if(s.params.onInit)s.params.onInit(s);
            s.attach();
        }
        init();
    }
})(window,document,undefined);