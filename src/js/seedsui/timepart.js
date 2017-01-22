//Timepart 时间段
(function(window,document,undefined){
	window.Timepart=function(container,params){
		/*================
		Model
		================*/
		var defaults={
            rowClass:"timepart-row",
            progressClass:"timepart-progress",
            partClass:"timepart-part",
            partStartClass:"timepart-startTime",
            partEndClass:"timepart-endTime",
            activeClass:"active",
            disableClass:"disabled",

            colCount:6,//一行6格
            partMinute:30,//一格的30分钟
            startTime:"7:00",
            endTime:"22:00",

            colAttr:"data-col",

			/*
            Callbacks:
            onClickDisabled:function(Timepart)
            onOverDisabled:function(Timepart)
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
        //设置Container的data-col
        s.container.setAttribute(s.params.colAttr,s.params.colCount);

        if(!s.container){
            console.log("SeedsUI Error：未找到Timepart的DOM对象，请检查传入参数是否正确");
            return;
        }
        //点击次数
		s.clickCount=0;
        //更新选中的时间段
        s.activeStartTime,s.activeEndTime;
        
        //单元格
		s.parts=[],s.partsCount=0;
        var partMilliSecond = s.params.partMinute * 60 * 1000;
        //行
        s.rows=[],s.rowsCount;
        var rowMilliSecond = partMilliSecond * s.params.colCount;

        //字符串转换成Date对象，参数格式如8:00
        s.parseDate=function(timeStr){
            var date=new Date();
            var hour=timeStr.split(":")[0];
            var minute=timeStr.split(":")[1];
            date.setHours(hour);
            date.setMinutes(minute);
            date.setSeconds(0,0);
            return date;
        };
        //开始和结束时间
        s.startTime=s.parseDate(s.params.startTime);
        s.endTime=s.parseDate(s.params.endTime);

        //总格数
        s.updateParsCount=function(){
            var startTime=s.parseDate(s.params.startTime);
            var endTime=s.parseDate(s.params.endTime);
            s.partsCount=(endTime.getTime()-startTime.getTime())/partMilliSecond;
            if(Math.ceil(s.partsCount) != s.partsCount){//是否是整数
                s.partsCount=0;
                console.log("SeedsUI Error：时间区间参数partMinute不正确，不能整除");
                return;
            }
            return s.partsCount;
        };
        //总行数
        s.updateRowsCount=function(){
            if(s.partsCount===0)s.updateParsCount();
            s.rowsCount=Math.ceil(s.partsCount/s.params.colCount);
            return s.rowsCount;
        };
        
        s.createParts=function(){
            s.updateRowsCount();
            //创建行
            for(var i=0;i<s.rowsCount;i++){
                var rowStartTime=s.startTime.getTime() + (rowMilliSecond * i);
                var rowEndTime=rowStartTime + rowMilliSecond;
                if(rowEndTime > s.endTime.getTime())rowEndTime=s.endTime.getTime();

                var row=document.createElement("div");
                row.setAttribute("class",s.params.rowClass);
                row.startTime = new Date(rowStartTime);
                row.endTime = new Date(rowEndTime);

                s.rows.push(row);
                s.container.appendChild(row);

                //创建列
                for(var j=0;j<s.params.colCount;j++){
                    var partStartTime=rowStartTime + (partMilliSecond * j);
                    var partEndTime=partStartTime + partMilliSecond;
                    if(partStartTime > s.endTime.getTime() || partEndTime > s.endTime.getTime())return;

                    var part=document.createElement("label");
                    part.setAttribute("class",s.params.partClass);
                    part.startTime = new Date(partStartTime);
                    part.endTime = new Date(partEndTime);

                    var startHour=part.startTime.getHours()<10?"0"+part.startTime.getHours():part.startTime.getHours();
                    var startMinute=part.startTime.getMinutes()<10?"0"+part.startTime.getMinutes():part.startTime.getMinutes();
                    var endHour=part.endTime.getHours()<10?"0"+part.endTime.getHours():part.endTime.getHours();
                    var endMinute=part.endTime.getMinutes()<10?"0"+part.endTime.getMinutes():part.endTime.getMinutes();
                    part.innerHTML='<span class="'+s.params.partStartClass+'">'+startHour+':'+startMinute+'</span>'+
                    '<span class="'+s.params.partEndClass+'">'+endHour+':'+endMinute+'</span>';
                    s.parts.push(part);
                    row.appendChild(part);
                }
            }
        };
        s.update=function(){
            s.createParts();
        };
        s.update();

		/*================
		Method
		================*/
        //获得进度条的开始行数、结束行数、开始位置、结束位置、开始段数、结束段数
        s.getTimesRange=function(startTime,endTime){
            //开始结束位置总比例
            var firstStartRatio=((startTime.getTime()-s.startTime.getTime())/rowMilliSecond).toString();
            var lastEndRatio=((endTime.getTime()-s.startTime.getTime())/rowMilliSecond).toString();
            //console.log("firstStartRatio"+firstStartRatio,"lastEndRatio"+lastEndRatio);
            /*
             *行数:开始结束位置行数
             */
            var startRow=Math.floor(firstStartRatio);
            var endRow=Math.floor(lastEndRatio);//为整数时得减1
            /*
             *左右:开始结束行左右值
             */
            var left=Math.floor(firstStartRatio.replace(/\d+\./,"0.")*100);
            var right=Math.round(100-lastEndRatio.replace(/\d+\./,"0.")*100);
            //console.log("left"+left,"right"+right);
            
            //如果结束位置在顶右处，则结束行-1 右边间距为0
            if(/^[1-9]{1,}[0-9]*$/.test(lastEndRatio)){
                endRow=endRow-1;
                right=0;
            }

            /*
             *段数:开始结束段数字
             */
            var startNum=Math.floor(firstStartRatio*s.params.colCount);
            var endNum=Math.ceil(lastEndRatio*s.params.colCount)-1;
            //console.log("startNum"+startNum,"endNum"+endNum);
            return{
                startRow:startRow,
                endRow:endRow,

                left:left,
                right:right,

                startNum:startNum,
                endNum:endNum
            }
        };
        //设置进度条
        s.setProgress=function(startTime,endTime,className){
            var startTime=Object.prototype.toString.call(startTime)==='[object Date]'?startTime:s.parseDate(startTime||s.params.startTime);
            var endTime=Object.prototype.toString.call(endTime)==='[object Date]'?endTime:s.parseDate(endTime||s.params.endTime);
            var range=s.getTimesRange(startTime,endTime);
            //设置parts的class
            for(var i=range.startNum;i<=range.endNum;i++){
                //如果跨选禁用段时间
                if(s.parts[i].classList.contains(s.params.disableClass)){
                    //Callback onOverDisabled
                    if(s.params.onOverDisabled)s.params.onOverDisabled(s);
                    s.removeAllActive();
                    return;
                }
                s.parts[i].classList.add(className);
            }

            //设置progress的left和right
            for(var j=range.startRow;j<=range.endRow;j++){
                var progress=document.createElement("div");
                progress.setAttribute("class",s.params.progressClass);

                progress.classList.add(className);
                progress.style.display="block";
                progress.style.left=0;
                progress.style.right=0;
                if(j==range.startRow){
                    progress.style.left=range.left+"%";
                }
                if(j==range.endRow){
                    progress.style.right=range.right+"%";
                }

                s.rows[j].appendChild(progress);
            }
        };
        s.activeTimes=function(startTime,endTime){
            s.setProgress(startTime,endTime,s.params.activeClass);
        };
        s.disableTimes=function(startTime,endTime){
            s.setProgress(startTime,endTime,s.params.disableClass);
        };
        //获取选中的开始时间段
        s.getActiveStartTime=function(){
            var hour="00",minute="00";
            if(s.activeStartTime){
                hour=s.activeStartTime.getHours()<10?"0"+s.activeStartTime.getHours():s.activeStartTime.getHours();
                minute=s.activeStartTime.getMinutes()<10?"0"+s.activeStartTime.getMinutes():s.activeStartTime.getMinutes();
            }
            return hour+":"+minute;
        }
        //获取选中的结束时间段
        s.getActiveEndTime=function(){
            var hour="00",minute="00";
            if(s.activeEndTime){
                hour=s.activeEndTime.getHours()<10?"0"+s.activeEndTime.getHours():s.activeEndTime.getHours();
                minute=s.activeEndTime.getMinutes()<10?"0"+s.activeEndTime.getMinutes():s.activeEndTime.getMinutes();
            }
            return hour+":"+minute;
        }

        //删除进度条
        s.removeProgress=function(className){
            //清空parts
            for(var i=0,part;part=s.parts[i++];){
                part.classList.remove(className);
            }
            //清空progress
            var activeProgress=s.container.querySelectorAll("."+s.params.progressClass+"."+className);
            [].slice.call(activeProgress).forEach(function(n,i){
                n.parentNode.removeChild(n);
            });
        };
        s.removeAllActive=function(){
            s.clickCount=0;
            s.activeStartTime=null,s.activeEndTime=null;

            s.removeProgress(s.params.activeClass);
        };
        s.removeAllDisabled=function(){
            s.removeProgress(s.params.disableClass);
        };
        s.updateActiveTimeByParts=function(part1,part2){
            var startPart=part1,endPart=part2;
            if(part1.startTime>part2.startTime){
                startPart=part2;
                endPart=part1;
            }
            s.activeStartTime=startPart.startTime;
            s.activeEndTime=endPart.endTime;
        };
		/*================
		Events
		================*/
        s.events=function(detach){
            var target=s.container;
            var action=detach?"removeEventListener":"addEventListener";
            target[action]("click",s.onClickContainer,false);
        };
        //attach、dettach事件
        s.attach=function(event){
            s.events();
        };
        s.detach=function(event){
            s.events(true);
        };
		/*================
		Events Handler
		================*/
		s.onClickContainer=function(e){
            if(e.target.classList.contains(s.params.partClass)){//点击part
                s.onClickPart(e);
            }
		};
        var part1,part2;
        s.onClickPart=function(e){
            var target=e.target;
            //如果点击了禁用
            if(target.classList.contains(s.params.disableClass)){
                //Callback onClickDisabled
                if(s.params.onClickDisabled)s.params.onClickDisabled(s);
                return;
            }
            //如果点击了激活
            if(target.classList.contains(s.params.activeClass)){
                s.removeAllActive();
                return;
            }

            //记录点击次数
            s.clickCount++;
            if(s.clickCount==1){//如果点击了一次
                part1=target;
                target.classList.add(s.params.activeClass);
            }else if(s.clickCount==2){//如果点击了两次
                part2=target;
                s.updateActiveTimeByParts(part1,part2);
                s.activeTimes(s.activeStartTime,s.activeEndTime);
            }else if(s.clickCount==3){//如果点击了三次
                s.removeAllActive();
            }
        };
		/*================
		Init
		================*/
		s.init=function(){
			s.attach();
		}
		s.init();
	}
})(window,document,undefined);