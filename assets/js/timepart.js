//Timepart 时间段 @require Toast @require DateUtil
(function(window,document,undefined){
	window.Timepart=function(container,params){
		/*================
		Model
		================*/
		var defaults={
			toastParent:document.body,//提示框的父元素

            rowClass:"timepart-row",
            partClass:"timepart-part",
            partActiveClass:"active",
            partDisableClass:"disabled",

            tillUnit:"-",
            colCount:6,//一行6格
            partMinute:30,//一格的30分钟
            startTime:"7:00",
            endTime:"22:00",

            colAttr:"data-col",
            partStartTimeAttr:"data-timepart-start",
            partEndTimeAttr:"data-timepart-end",
            partNumAttr:"data-timepart-num",

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
		s.parts=[];
        s.partsCount=0;//总格数
        s.startTime,s.endTime;//开始和结束时间

        s.updateParts=function(){
            s.parts=[].slice.call(s.container.querySelectorAll("."+s.params.partClass));
            s.parts.forEach(function(n,i){
                n.setAttribute(s.params.partNumAttr,i+1);
            });
            s.partsCount=s.parts.length;
            s.startTime=s.parts[0].getAttribute(s.params.partStartTimeAttr);
            s.endTime=s.parts[s.parts.length-1].getAttribute(s.params.partEndTimeAttr);
        }

        s.getDateByTimeStr=function(timeStr){//字符串转换成Date对象，参数格式如8:00
            var date=new Date();
            var hour=timeStr.split(":")[0];
            var minute=timeStr.split(":")[1];
            date.setHours(hour);
            date.setMinutes(minute);
            date.setSeconds(0,0);
            return date;
        }
        s.createParts=function(){
            if(s.container.children.length>0){
                s.updateParts();
                return;
            }
            s.startTime=s.params.startTime;
            s.endTime=s.params.endTime;
            s.container.setAttribute(s.params.colAttr,s.params.colCount);
            //一格的毫秒数
            var partMilliSecond = s.params.partMinute * 60 * 1000;

            var startTime=s.getDateByTimeStr(s.startTime);
            var endTime=s.getDateByTimeStr(s.endTime);
            //时间差
            var diffTime=new Date().diff(startTime,endTime);
            //总格数
            s.partsCount=diffTime.minutes / s.params.partMinute;
            if(diffTime.minutes % s.params.partMinute != 0){//有分钟余数
                s.toast.setText("时间区间不正确");
                s.toast.show();
                return;
            }
            //生成时间段元素
            var partsHTML="";
            var rowInnerHTML="";
            var partStartTime=startTime;
            
            for(var i=1;i<=s.partsCount;i++){
                var partEndTime=new Date(new Date().setTime(partStartTime.getTime()+partMilliSecond));
                var startTimeStr=partStartTime.hour()+":"+partStartTime.minute();
                var endTimeStr=partEndTime.hour()+':'+partEndTime.minute();

                if(i % s.params.colCount==0){//一行完成时塞到行容器中
                    rowInnerHTML+='<label class="'+s.params.partClass+'" '+s.params.partNumAttr+'="'+i+'" '+s.params.partStartTimeAttr+'="'+startTimeStr+'" '+s.params.partEndTimeAttr+'="'+endTimeStr+'">'+
                        '<span>'+endTimeStr+'</span>'+
                    '</label>';
                    partsHTML+='<div class="timepart-row">'+rowInnerHTML+'</div>';
                    rowInnerHTML="";
                }else{
                    rowInnerHTML+='<label class="'+s.params.partClass+'" '+s.params.partNumAttr+'="'+i+'" '+s.params.partStartTimeAttr+'="'+startTimeStr+'" '+s.params.partEndTimeAttr+'="'+endTimeStr+'">'+
                        '<span>'+startTimeStr+'</span>'+
                    '</label>';
                }

                partStartTime=partEndTime;
            }
            if(rowInnerHTML){//整行外如果有多余的part，则再加一行
                var match=rowInnerHTML.match(new RegExp("<span>[0-9]{1,2}:[0-9]{1,2}</span>","gm"));
                var matchLastTime=match[match.length-1];
                var endTempTimeStr=endTime.hour()+':'+endTime.minute();
                var newRowInnerHTML=rowInnerHTML.replace(matchLastTime,'<span>'+endTempTimeStr+'</span>');

                partsHTML+='<div class="timepart-row">'+newRowInnerHTML+'</div>';
            }
            s.container.innerHTML=partsHTML;
            s.parts=[].slice.call(s.container.querySelectorAll("."+s.params.partClass));
        }
        s.createParts();

		/*================
		Method
		================*/
        //根据时间段获得序号,序号从1开始
        s.getNumsByRange=function(startTime,endTime){//格式如08:00-22:00
            var selStartTime,selEndTime;

            if(startTime instanceof Date){
                selStartTime=startTime.setSeconds(0,0);
            }else if(/[0-9]{1,2}:[0-9]{1,2}/.test(startTime)){
                selStartTime=s.getDateByTimeStr(startTime);
            }else{
                selStartTime=s.getDateByTimeStr(s.startTime);
            }

            if(endTime instanceof Date){
                selEndTime=startTime.setSeconds(0,0);
            }else if(/[0-9]{1,2}:[0-9]{1,2}/.test(endTime)){
                selEndTime=s.getDateByTimeStr(endTime);
            }else{
                selEndTime=s.getDateByTimeStr(s.endTime);
            }

            var nums=[];

            if(selStartTime.getTime()>=selEndTime.getTime()){
                s.toast.setText("开始时间不能小于结束时间");
                s.toast.show();
                return false;
            }

            for(var i=0,part;part=s.parts[i++];){
                var partStartTime=s.getDateByTimeStr(part.getAttribute(s.params.partStartTimeAttr));
                var partEndTime=s.getDateByTimeStr(part.getAttribute(s.params.partEndTimeAttr));
                if(selStartTime.getTime()==partStartTime.getTime()){
                    nums[0]=part.getAttribute(s.params.partNumAttr);
                }
                if(selEndTime.getTime()==partEndTime.getTime()){
                    nums[1]=part.getAttribute(s.params.partNumAttr);
                }
                if(nums[0] && nums[1])break;
            }
            if(!nums[0])nums[0]="1";
            if(!nums[1])nums[1]=s.partsCount;
            return nums;
        }
        //判断是否已经有时间段
        s.hasActiveParts=function(){
            var activeCount=0;
            for(var i=0,part;part=s.parts[i++];){
                if(part.classList.contains(s.params.partActiveClass))activeCount++;
                if(activeCount>=2){
                    return true;
                }
            }
            return false;
        }
        //获得选中的时间段
        s.getActiveRange=function(){
            var activeParts=[];
            s.parts.forEach(function(part){
                if(part.classList.contains(s.params.partActiveClass))activeParts.push(part);
            });
            if(activeParts.length<=0)return false;
            var startTime=activeParts[0].getAttribute(s.params.partStartTimeAttr);
            var endTime=activeParts[activeParts.length-1].getAttribute(s.params.partEndTimeAttr);
            return startTime+s.params.tillUnit+endTime;
        }

        //根据序号选中时间段
		s.activePartsByNum=function(num1,num2){
            var startNum=num1?num1:0;
            var endNum=num2?num2:s.partsCount;
            //序号排序
            if(parseInt(startNum)>parseInt(endNum)){
                var tempNum=startNum;
                startNum=endNum;
                endNum=tempNum;
            }
            //选中
            for(var i=startNum-1;i<endNum;i++){
                //如果跨选禁用段时间
                if(s.parts[i].classList.contains(s.params.partDisableClass)){
                    s.toast.setText(s.params.msgErrorOverDisable);
                    s.toast.show();
                    s.removeAllActive();
                    return;
                }
                s.parts[i].classList.add(s.params.partActiveClass);
            }
        }
        //根据序号禁用时间段
        s.disablePartsByNum=function(num1,num2){
            var startNum=num1?num1:0;
            var endNum=num2?num2:s.partsCount;
            //序号排序
            if(parseInt(startNum)>parseInt(endNum)){
                var tempNum=startNum;
                startNum=endNum;
                endNum=tempNum;
            }
            //禁用
            for(var i=startNum-1;i<endNum;i++){
                s.parts[i].classList.remove(s.params.partActiveClass);
                s.parts[i].classList.add(s.params.partDisableClass);
            }
        }

        //根据时间段禁用时间段
        s.activePartsByRange=function(startTime,endTime){
            var nums=s.getNumsByRange(startTime,endTime);
            if(nums){
                s.activePartsByNum(nums[0],nums[1]);
            }
        }
        //根据时间段禁用时间段
        s.disablePartsByRange=function(startTime,endTime){
            var nums=s.getNumsByRange(startTime,endTime);
            if(nums){
                s.disablePartsByNum(nums[0],nums[1]);
            }
        }

        //移除所有选中状态
        s.removeAllActive=function(){
            s.clickCount=0;
            for(var i=0,part;part=s.parts[i++];){
                part.classList.remove(s.params.partActiveClass);
            }
        }
        //移除所有禁用状态
        s.removeAllDisabled=function(){
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
            if(e.target.getAttribute(s.params.partStartTimeAttr)){//点击part
                s.onClickPart(e);
            }
		}
        var num1,num2;
        s.onClickPart=function(e){
            var target=e.target;
            //如果点击了禁用
            if(target.classList.contains(s.params.partDisableClass)){
                if(s.params.msgErrorClickDisable){
                    s.toast.setText(s.params.msgErrorClickDisable);
                    s.toast.show();
                }
                return;
            }
            //如果已经存在选中时间段
            if(s.hasActiveParts()){
                s.removeAllActive();
                return;
            }

            //记录点击次数
            s.clickCount++;
            var num=target.getAttribute(s.params.partNumAttr);

            if(s.clickCount==3){//如果点击了三次
                s.removeAllActive();
                return;
            }
            if(s.clickCount==1){//如果点击了一次
                num1=num;
                target.classList.add(s.params.partActiveClass);
            }else if(s.clickCount==2){//如果点击了两次
                num2=num;
                s.activePartsByNum(num1,num2);
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