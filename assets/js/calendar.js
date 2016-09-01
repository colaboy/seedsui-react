//Calendar
(function(window,document,undefined){
	
	window.Calendar=function(container,params){
		/*================
		Model
		================*/
		var defaults={
			"viewType":"month",//值为month|week
			"defaultActiveDate":new Date(),
			"disableBeforeDate":null,
			"disableAfterDate":null,
			"activeDate":null,
			"threshold":"50",
			"duration":"300",
			"dayHeight":"50",
			"isYTouch":true,//是否允许上下滑动
			//DOM
			"calendarClass":"calendar",
			"disableClass":"calendar-disable",

			"headerClass":"calendar-header",
			"titleClass":"calendar-title",
			"prevClass":"calendar-prev",
			"nextClass":"calendar-next",
			"prevHTML":"&lt;",
			"nextHTML":"&gt;",

			"weeksClass":"calendar-weeks",
			"weekClass":"calendar-week",

			"wrapperClass":"calendar-wrapper",
			"wrapperXClass":"calendar-wrapper-x",
			"wrapperYClass":"calendar-wrapper-y",
			"monthClass":"calendar-month",
			"monthRowClass":"calendar-monthrow",
			"dayClass":"calendar-day",
			"dayNumClass":"calendar-daynum",

			//状态
			"currentClass":"calendar-current",
			"notcurrentClass":"calendar-notcurrent",
			"todayClass":"calendar-today",
			"activeClass":"calendar-active",

			/*
            Callbacks:
            onClick:function(Calendar)
            onChange:function(Calendar)
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
		s.params.wrapperHeight=s.params.dayHeight*6;
		//禁止修改默认值
		Object.defineProperty(s.params,"defaultActiveDate",{
			enumerable:true,
			configurable:true,
			writable:false
		})
		
		//今天和选中天
		s.today=new Date(),s.activeDate=null;
		//日历工具箱
		if(s.params.activeDate){//如果有选中天，则初始化为选中天
			s.calendarUtil=new CalendarUtil(s.params.activeDate);
			s.activeDate=s.params.activeDate;
		}else{//否则，则初始化为默认天
			s.calendarUtil=new CalendarUtil(s.params.defaultActiveDate);
		}
		//Container
		s.container=typeof container=="string"?document.querySelector(container):container;
		s.container.width=s.container.clientWidth;
		//Header
		s.header,s.title,s.prev,s.next;
		//Week
		s.weekContainer,s.weeks=[];
		//Wrapper
		s.wrapper,s.wrapperX,s.wrapperY,s.months=new Array(3),s.days=[];
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
        	posY:0,
        	maxPosY:s.params.wrapperHeight-s.params.dayHeight,
        	h:s.params.wrapperHeight,
        	direction:0,
        	horizontal:0,
        	vertical:0
        };
		//Header
		s.createHeader=function(){
            var header=document.createElement("div");
            header.setAttribute("class",s.params.headerClass);
            return header;
        }
        s.createPrev=function(){
            var prev=document.createElement("div");
            prev.setAttribute("class",s.params.prevClass);
            prev.innerHTML=s.params.prevHTML;
            return prev;
        }
        s.createNext=function(){
            var next=document.createElement("div");
            next.setAttribute("class",s.params.nextClass);
            next.innerHTML=s.params.nextHTML;
            return next;
        }
        s.createTitle=function(){
            var title=document.createElement("div");
            title.setAttribute("class",s.params.titleClass);
            return title;
        }
        //WeekContainer
		s.createWeekContainer=function(){
			var weekContainer=document.createElement("div");
			weekContainer.setAttribute("class",s.params.weeksClass);

			var weekNames=["日", "一", "二", "三", "四", "五", "六"];
			for(var i=0,weekName;weekName=weekNames[i++];){
				var week=document.createElement("div");
				week.setAttribute("class",s.params.weekClass);
				week.innerHTML=weekName;
				weekContainer.appendChild(week);
				s.weeks.push(week);
			}

			return weekContainer;
		}
		//Wrapper
		s.createWrapper=function(){
			var wrapper=document.createElement("div");
			wrapper.setAttribute("class",s.params.wrapperClass);
			return wrapper;
		}
		s.createWrapperY=function(){
			var wrapperY=document.createElement("div");
			wrapperY.setAttribute("class",s.params.wrapperYClass);
			return wrapperY;
		}
		s.createWrapperX=function(){
			var wrapperX=document.createElement("div");
			wrapperX.setAttribute("class",s.params.wrapperXClass);
			wrapperX.width=s.container.width*3;
			/*wrapperX.width=s.container.width*3;
			wrapperX.style.width=wrapperX.width+"px";*/
			for(var i=0;i<3;i++){
				s.months[i]=document.createElement("div");
				s.months[i].setAttribute("class",s.params.monthClass);
				s.months[i].style.width=s.container.width+"px";
				wrapperX.appendChild(s.months[i]);
			}
			return wrapperX;
		}
		s.createDays=function(){
			for(var i=0;i<3;i++){//注入到月
				
				for(var j=0;j<6;j++){//注入行

					var monthRow=document.createElement("div");
					monthRow.setAttribute("class",s.params.monthRowClass);

					for(var k=0;k<7;k++){//注入到星期

						var day=document.createElement("div");
						day.setAttribute("class",s.params.dayClass);
						day.style.height=s.params.dayHeight+"px";
						day.style.lineHeight=s.params.dayHeight+"px";
						var dayNum=document.createElement("div");
						dayNum.setAttribute("class",s.params.dayNumClass);

						day.appendChild(dayNum);
						monthRow.appendChild(day);

						s.days.push(dayNum);
					}
					s.months[i].appendChild(monthRow);
				}
			}
		}
		//创建DOM
		s.create=function(){
			//创建头部
			if(s.container.querySelector("."+s.params.headerClass)){
				s.header=s.container.querySelector("."+s.params.headerClass);
				s.prev=s.container.querySelector("."+s.params.prevClass);
				s.next=s.container.querySelector("."+s.params.nextClass);
				s.title=s.container.querySelector("."+s.params.titleClass);
			}else{
				s.header=s.createHeader();
				s.prev=s.createPrev();
				s.next=s.createNext();
				s.title=s.createTitle();

				s.header.appendChild(s.prev);
				s.header.appendChild(s.title);
				s.header.appendChild(s.next);
				s.container.appendChild(s.header);
			}
			//创建周
			if(s.container.querySelector("."+s.params.weeksClass)){
				s.weekContainer=s.container.querySelector("."+s.params.weeksClass);
			}else{
				s.weekContainer=s.createWeekContainer();

				s.container.appendChild(s.weekContainer);
			}
			//创建主体
			s.wrapper=s.createWrapper();
			s.wrapperX=s.createWrapperX();
			s.wrapperY=s.createWrapperY();
			s.wrapperY.appendChild(s.wrapperX);
			s.wrapper.appendChild(s.wrapperY);
			s.container.appendChild(s.wrapper);
			s.createDays();
		}
		s.create();
		/*================
		Method
		================*/
        //容器操作类
        s.addDuration=function(){
        	s.wrapper.style.webkitTransitionDuration=s.params.duration+"ms";
        	s.wrapperY.style.webkitTransitionDuration=s.params.duration+"ms";
        	s.wrapperX.style.webkitTransitionDuration=s.params.duration+"ms";
        }
        s.removeDuration=function(){
        	s.wrapper.style.webkitTransitionDuration="0ms";
        	s.wrapperY.style.webkitTransitionDuration="0ms";
        	s.wrapperX.style.webkitTransitionDuration="0ms";
        }
        s.updateTranslateX=function(){
        	s.removeDuration();
        	s.touches.posX=-s.container.width;
        	s.wrapperX.style.webkitTransform="translateX("+s.touches.posX+"px)";
        }
        s.updateContainerHeight=function(){//更新高度
        	if(s.params.viewType==="month"){//展开
        		s.touches.h=s.params.wrapperHeight;
        	}else if(s.params.viewType==="week"){//收缩
        		s.touches.h=s.params.dayHeight;
        	}
        	s.wrapper.style.height=s.touches.h+'px';
        	s.wrapperY.style.webkitTransform="translateY(-"+s.touches.posY+"px)";
        }
        s.updateContainerWidth=function(){//更新宽度
        	s.container.width=s.container.clientWidth;
        	s.wrapperX.width=s.wrapperX.clientWidth;
        	/*s.wrapperX.width=s.container.width*3;
			s.wrapperX.style.width=s.wrapperX.width.width+"px";*/
        	for(var i=0;i<3;i++){
				s.months[i].style.width=s.container.width+"px";
			}
        }
        s.updateContainerSize=function(){
        	s.updateContainerHeight();
        	s.updateContainerWidth();
        	s.updateTranslateX();
        }
        s.updateClasses=function(){
        	//更新容器尺寸
        	s.updateContainerHeight();
        	//位置还原
        	s.updateTranslateX();
        }
        s.updateClasses();
        //左右滑动
        s.slideXTo=function(index){
        	s.touches.posX=-s.container.width*index;
        	s.addDuration();
        	s.wrapperX.style.webkitTransform='translateX(' + s.touches.posX + 'px)';
        	//刷新数据
        	if(index===0){//上一页
        		if(s.params.viewType==="month"){
        			s.calendarUtil.activePrevMonth();
				}else if(s.params.viewType==="week"){
					s.wrapperY.style.webkitTransitionDuration="0ms";
					s.calendarUtil.activePrevWeek();
				}
				s.draw();
        	}else if(index===2){//下一页
        		if(s.params.viewType==="month"){
        			s.calendarUtil.activeNextMonth();
				}else if(s.params.viewType==="week"){
					s.wrapperY.style.webkitTransitionDuration="0ms";
					s.calendarUtil.activeNextWeek();
				}
				s.draw();
			}
        }
        //上下滑动
        s.dragY=function(heightY){
        	s.wrapper.style.height=heightY+'px';
        	var translateY=s.params.wrapperHeight-heightY;
        	if(translateY<=s.touches.maxPosY){
        		s.wrapperY.style.webkitTransform="translateY(-"+translateY+"px)";
        	}
        }
        s.slideYTo=function(index){
        	s.addDuration();
        	if(index===1){//展开
        		s.params.viewType="month";
        		s.touches.posY=0;
        		s.draw();
        	}else if(index===-1){//收缩
        		s.params.viewType="week";
        		s.touches.posY=s.touches.maxPosY;
        		s.draw();
        	}else{
        		s.dragY(s.touches.h);
        	}
        }
		//绘制日历
		var today=new Date();
		s.isToday=function(date){
			if(date.getDate()==today.getDate() && date.getMonth()==today.getMonth() &&  date.getFullYear()==today.getFullYear())return true;
			return false;
		}
		s.data=[];
		s.updateData=function(){
			s.data=s.calendarUtil.getCalendarData();
			s.data.activeIndex=s.calendarUtil.activeIndex;
			var activeRowIndex=s.calendarUtil.activeRowIndex;
			if(s.params.viewType==="week"){
				s.touches.maxPosY=activeRowIndex*s.params.dayHeight;
				s.touches.posY=s.touches.maxPosY;
				var prevWeek=s.calendarUtil.getPrevWeek();
				var nextWeek=s.calendarUtil.getNextWeek();
				var start1=activeRowIndex*7;
				var start2=start1+84;
				//上周
				for(var i=0,datIndex1=start1;i<7;i++){
					s.data[datIndex1]=prevWeek[i];
					datIndex1++;
				}
				//下周
				for(var j=0,datIndex2=start2;j<7;j++){
					s.data[datIndex2]=nextWeek[j];
					datIndex2++;
				}
			}
		}
		s.drawHeader=function(){
			var activeDate=s.calendarUtil.activeDate;
			//注入头部数据
			s.title.innerHTML=activeDate.getFullYear()+"-"+activeDate.month()+"-"+activeDate.day();
		}
		s.draw=function(){
			s.updateData();
			//注入头部
			s.drawHeader();
			//注入身体
			var activeIndex=s.data.activeIndex;
			var activeRowIndex=s.data.activeRowIndex;
			for(var i=0;i<s.days.length;i++){
				s.days[i].innerHTML=s.data[i].getDate();
				//index
				s.days[i].index=i;
				//class
				s.days[i].className=s.params.dayNumClass;
				//class-currentClass
				if(s.data[i].isCurrent)s.days[i].classList.add(s.params.currentClass);
				else s.days[i].classList.add(s.params.notcurrentClass);
				//class-todayClass
				if(s.isToday(s.data[i]))s.days[i].classList.add(s.params.todayClass);
				//class-activeClass
				if(i==activeIndex && s.activeDate)s.days[i].classList.add(s.params.activeClass);
				//禁用日期
				if(s.params.disableBeforeDate && s.data[i].setHours(0,0,0,0)<s.params.disableBeforeDate.setHours(0,0,0,0)){
					s.days[i].classList.add(s.params.disableClass);
				}
				if(s.params.disableAfterDate && s.data[i].setHours(0,0,0,0)>s.params.disableAfterDate.setHours(0,0,0,0)){
					s.days[i].classList.add(s.params.disableClass);
				}
			}
			s.updateContainerHeight();
			if(s.activeDate)s.activeDate=s.calendarUtil.activeDate;
			//Callback onChange
			if(s.params.onChange)s.params.onChange(s);
		}
		s.draw();
		s.activeDay=function(target){
			for(var i=0;i<s.days.length;i++){
				s.days[i].classList.remove(s.params.activeClass);
			}
			//选中日期
			s.activeDate=s.data[target.index];
			s.calendarUtil.setActiveDate(s.activeDate);
			//重新绘制
			s.draw();

			//target.classList.add(s.params.activeClass);
			//s.drawHeader();
		}
		s.showMonth=function(){
			s.slideYTo(1);
        }
        s.showWeek=function(){
        	s.slideYTo(-1);
        }
        s.showToday=function(){
        	s.calendarUtil.setActiveDate(s.today);
        	s.draw();
        }
        s.reset=function(){
        	//选中日期
			s.activeDate=s.params.activeDate;
			s.calendarUtil.setActiveDate(s.params.defaultActiveDate);
			//重新绘制
			s.draw();
        }
		/*================
		Control
		================*/
        s.events=function(detach){
			var action=detach?"removeEventListener":"addEventListener";
			s.wrapper[action]("touchstart",s.onTouchStart,false);
			s.wrapper[action]("touchmove",s.onTouchMove,false);
			s.wrapper[action]("touchend",s.onTouchEnd,false);
			s.wrapper[action]("touchcancel",s.onTouchEnd,false);
			s.wrapper[action]("webkitTransitionEnd",s.onTransitionEnd,false);
			s.wrapper[action]("click",s.onClick,false);

			s.prev[action]("click",s.onClickPrev,false);
			s.next[action]("click",s.onClickNext,false);
        }
        //attach、dettach事件
        s.attach=function(event){
            s.events();
        }
        s.detach=function(event){
            s.events(true);
        }
        s.preventDefault=function(e){
			e.preventDefault();
		}
		//Event Handler
		s.onClickPrev=function(e){
			s.slideXTo(0);
		}
		s.onClickNext=function(e){
			s.slideXTo(2);
		}
		s.onClick=function(e){
			s.target=e.target;
			//禁用状态
			if(e.target.classList.contains(s.params.disableClass))return;

			if(e.target.classList.contains(s.params.dayNumClass))s.activeDay(e.target);
			//Callback onClick
			if(s.params.onClick)s.params.onClick(s);
		}
		s.onTouchStart=function(e){
			s.container.addEventListener("touchmove",s.preventDefault,false);
			s.touches.startX=e.touches[0].clientX;
			s.touches.startY=e.touches[0].clientY;
		};
		s.onTouchMove=function(e){
			s.touches.currentX=e.touches[0].clientX;
			s.touches.currentY=e.touches[0].clientY;
			s.touches.diffX=s.touches.startX-s.touches.currentX;
			s.touches.diffY=s.touches.startY-s.touches.currentY;

			//设置滑动方向(-1上下 | 1左右)
			if(s.touches.direction === 0) {
				s.touches.direction = Math.abs(s.touches.diffX) > Math.abs(s.touches.diffY) ? 1 : -1;
			}

			if(s.touches.direction === 1) {//左右滑动
				var moveX=s.touches.posX-s.touches.diffX;
				if(moveX<0 && Math.abs(moveX-s.container.width)<s.wrapperX.width){//判断是否是边缘
					s.touches.horizontal = moveX < s.touches.posX ? 1 : -1;//设置方向(左右)
					s.wrapperX.style.webkitTransform = 'translateX(' + moveX + 'px)';
				}
			}else if (s.touches.direction === -1) {//上下滑动
				if(s.params.isYTouch===true){//允许Y滑动的情况下
					var heightY=s.touches.h-s.touches.diffY;
					if(heightY>s.params.dayHeight && heightY<s.params.wrapperHeight){//判断是否是边缘
						s.touches.vertical = heightY > s.touches.h ? 1 : -1;//设置方向(上下)
						s.dragY(heightY);
					}
				}else{
					s.container.removeEventListener("touchmove",s.preventDefault,false);
				}
			}
		};
		s.onTouchEnd=function(e){
			if(s.touches.direction === 1) {//左右滑动

				if(Math.abs(s.touches.diffX)<s.params.threshold)s.touches.horizontal=0;
				if(s.touches.horizontal===1)s.slideXTo(2); //下一页
				else if(s.touches.horizontal===-1)s.slideXTo(0);//上一页
				else s.slideXTo(1);//还原当前页

			}else if (s.touches.direction === -1) {//上下滑动
				if(s.params.isYTouch===true){//允许Y滑动的情况下
					if(Math.abs(s.touches.diffY)<s.params.threshold)s.touches.vertical=0;
					if(s.touches.vertical===1)s.slideYTo(1);//展开
					else if(s.touches.vertical===-1)s.slideYTo(-1);//收缩
					else s.slideYTo(0);//还原当前页
				}
			}
			
			//清空滑动方向
			s.touches.direction=0;
			s.touches.horizontal=0;
			s.touches.vertical=0;
		};
		s.onTransitionEnd=function(e){
			//还原位置
			s.updateTranslateX();
		}
		/*================
		Init
		================*/
		s.init=function(){
			s.attach();
		}
		s.init();
	};

	window.CalendarUtil=function(activeDate){
        /*================
        Model
        ================*/
        var s=this;
        s.weekMilliSecound = 7 * 24 * 60 * 60 * 1000;
        s.dayMilliSecound = 24 * 60 * 60 * 1000;
        //选中日期
        s.activeDate=activeDate?new Date(activeDate):new Date();
        //周视图
        s.midWeek=[],s.prevWeek=[],s.nextWeek=[],s.tempWeek=[];

        s.createWeeks=function(){
            for(var i = 0; i < 7; i++) {
                s.midWeek.push(new Date());
                s.prevWeek.push(new Date());
                s.nextWeek.push(new Date());
                s.tempWeek.push(new Date());
            }
        }
        s.createWeeks();
        //月视图
        s.midMonth=[],s.prevMonth=[],s.nextMonth=[],s.tempMonth=[];
        s.createMonths=function(){
            for(var i=0;i<42;i++) {
                s.midMonth.push(new Date());
                s.prevMonth.push(new Date());
                s.nextMonth.push(new Date());
                s.tempMonth.push(new Date());
            }
        }
        s.createMonths();
        /*================
        Method
        ================*/
        //日期比较
        s.compareDate=function(date1,date2){
            var t1days=new Date(date1.getFullYear(),date1.getMonth(),0).getDate();
            var t1=date1.getFullYear()+date1.getMonth()/12+date1.getDate()/t1days/12;
            var t2days=new Date(date2.getFullYear(),date2.getMonth(),0).getDate();
            var t2=date2.getFullYear()+date2.getMonth()/12+date2.getDate()/t2days/12;
            if(t1==t2)return 0;
            else return t1>t2;
        }
        //周视图
        s.updateWeekByDate=function(date,week){
        	var day=date.getDay();
            var startDayMs=date.getTime()-s.dayMilliSecound*day;
            if(!week){
            	week=s.tempWeek;
            }
            week[0].setTime(startDayMs);
            for (var i=1;i<7;i++) {
                week[i].setTime(week[i-1].getTime()+s.dayMilliSecound);
            }
            return week;
        }
        s.getMidWeek=function(){//获得本周
            return s.updateWeekByDate(s.activeDate,s.midWeek);
        }
        s.getPrevWeek=function(){//获得上周
        	var prevWeekDateMs=s.activeDate.getTime()-s.weekMilliSecound;
            return s.updateWeekByDate(new Date(prevWeekDateMs),s.prevWeek);
        }
        s.getNextWeek=function(){//获得下周
        	var nextWeekDateMs=s.activeDate.getTime()+s.weekMilliSecound;
            return s.updateWeekByDate(new Date(nextWeekDateMs),s.nextWeek);
        }
        //月视图
        s.currentMonth=null;
        s.activeIndex=null;
        s.activeRowIndex=null;
        s.updateMonthByDate=function(date,month){
        	//1日
        	var firstDay=new Date();
            firstDay.setTime(date.getTime()-s.dayMilliSecound*(date.getDate()-1));
            var firstDayIndex = firstDay.getDay();

            //31日
            var monthDays=new Date(date.getFullYear(),date.getMonth()+1,0).getDate();
            var lastDayIndex=firstDayIndex+monthDays;

            //起始日
            var startDayMs = firstDay.getTime()-s.dayMilliSecound*firstDayIndex;

        	if(!month){
            	month=s.tempMonth;
            }

            //生成月
            for(var i=0;i<42;i++){
                if(i==0)month[0].setTime(startDayMs);
                else month[i].setTime(month[i-1].getTime()+s.dayMilliSecound);
                //设置选中项
                if(s.currentMonth==="midMonth" && s.compareDate(month[i],date)===0){
                    s.activeIndex=i+42;
                    s.activeRowIndex=Math.floor(i/7);
                }

                //设置当月标识isCurrent
                month[i].isCurrent=false;
                if(i>=firstDayIndex && i<lastDayIndex)month[i].isCurrent=true;
            }
            return month;
        }
        s.getPrevMonth=function(){//获得上月
            s.currentMonth="prevMonth";

            var prevDate=new Date();
            prevDate.setMonth(s.activeDate.getMonth()-1);
            return s.updateMonthByDate(prevDate,s.prevMonth);
        }
        s.getMidMonth=function(){//获得本月
            s.currentMonth="midMonth";

            return s.updateMonthByDate(s.activeDate,s.midMonth);
        }
        s.getNextMonth=function(){//获得下月
            s.currentMonth="nextMonth";

            var nextDate=new Date();
            nextDate.setMonth(s.activeDate.getMonth()+1);
            return s.updateMonthByDate(nextDate,s.nextMonth);
        }
        s.getCalendarData=function(){
            return s.getPrevMonth().concat(s.getMidMonth()).concat(s.getNextMonth());
        }
        //设置选中日期
        s.setActiveDate=function(activeDate){
            s.activeDate.setTime(activeDate.getTime());
        }
        s.activePrevWeek=function(){
            var ms=s.activeDate.getTime()-s.weekMilliSecound;
            s.activeDate.setTime(ms);
        }
        s.activeNextWeek=function(){
            var ms=s.activeDate.getTime()+s.weekMilliSecound;
            s.activeDate.setTime(ms);
        }
        s.activePrevMonth=function(){
            var tempDate=new Date(s.activeDate);
            tempDate.setMonth(s.activeDate.getMonth() - 1);
            if(s.activeDate.getMonth()===tempDate.getMonth()){
            	tempDate=new Date(tempDate.getFullYear(),tempDate.getMonth(),0);
            }
            s.activeDate=tempDate;
        }
        s.activeNextMonth=function(){
        	var tempDate=new Date(s.activeDate);
            tempDate.setMonth(s.activeDate.getMonth() + 1);
            if(s.activeDate.getMonth()===tempDate.getMonth()-2){
            	tempDate=new Date(tempDate.getFullYear(),tempDate.getMonth(),0);
            }
            s.activeDate=tempDate;
        }
        /*其它工具*/
        //推前天数
        s.getBeforeDays=function(beforenum){
            var days=[];
            for(var i=1;i<=beforenum;i++){
                days.push(new Date(s.activeDate.getTime()-i*s.dayMilliSecound));
            }
            return days;
        }
        //推前月
        s.getBeforeMonths=function(beforenum){
            var months=[];
            var tempDate=new Date(s.activeDate.getFullYear(),s.activeDate.getMonth());
            for(var i=1;i<=beforenum;i++){
                var tempDate2=new Date();
                tempDate2.setMonth(tempDate.getMonth()-i);
                months.push(tempDate2);
            }
            return months;
        }
        //推前周
        s.getBeforeWeeks=function(beforenum){
        	 var weeks=new Array(beforenum);
        	 for(var i=0;i<beforenum;i++){
        	 	weeks[i]=[];
        	 	for(var j=0;j<7;j++){
        	 		weeks[i].push(new Date());
        	 	}
        	 	var prevWeekDateMs=s.activeDate.getTime()-s.weekMilliSecound*(i+1);
        	 	s.updateWeekByDate(new Date(prevWeekDateMs),weeks[i]);
        	 }
        	 return weeks;
        }
    };
})(window,document,undefined);