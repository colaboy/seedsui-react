//SpDate 扩展scrollpicker日期控件 (require scrollpikcer.js)
(function(window,document,undefined){
	window.SpDate=function(params){
		/*================
	    Model
	    ==================*/
		var defaults={
			parent:document.body,
			viewType:"date",//"date","month","time","datetime"
			isSimpleYear:false,

			yearClass:null,
			monthClass:null,
			dayClass:null,
			hourClass:null,
			minuteClass:null,

			yearsData:null,
			monthsData:null,
			daysData:null,
			hoursData:null,
			minutesData:null,

			defaultYear:null,
			defaultMonth:null,
			defaultDay:null,
			defaultHour:null,
			defaultMinute:null,

			disableYears:null,
			disableMonths:null,
			disableDays:null,
			disableHours:null,
			disableMinutes:null,
			disableDateTime:null,

			minYear:1950,
			maxYear:2050,

			yyUnit:"年",
			MMUnit:"月",
			ddUnit:"日",
			hhUnit:"时",
			mmUnit:"分",

			isClickMaskHide:true,

			/*callbacks
			onClickDone:function(Scrollpicker)
			onClickCancel:function(Scrollpicker)
			onTransitionEnd:function(Scrollpicker)
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
		//SpDate
		var s=this;

		//Params
		s.params = params;

		//Date
	    s.date;
	    s.updateDetault=function(){
	    	s.date = new Date();
		    //默认值
		    if(!s.params.defaultYear)s.params.defaultYear=s.date.getFullYear();
		    if(!s.params.defaultMonth)s.params.defaultMonth=s.date.getMonth()+1;
		    if(!s.params.defaultDay)s.params.defaultDay=s.date.getDate();
		    if(!s.params.defaultHour)s.params.defaultHour=s.date.getHours();
		    if(!s.params.defaultMinute)s.params.defaultMinute=s.date.getMinutes();
	    }
	    s.updateDetault();
	    //设置默认值
	    s.setDefaultYear=function(year){
	    	s.params.defaultYear=year;
	    }
	    s.setDefaultMonth=function(monthKey){
	    	s.params.defaultMonth=monthKey;
	    }
	    s.setDefaultDay=function(dayKey){
	    	s.params.defaultDay=dayKey;
	    }
	    s.setDefaultHour=function(hourKey){
	    	s.params.defaultHour=hourKey;
	    }
	    s.setDefaultMinute=function(minuteKey){
	    	s.params.defaultMinute=minuteKey;
	    }
	    //年
	    s.years=[];
	    if(s.params.yearsData){
	    	s.years=s.params.yearsData;
	    }else{
		    for(var y=s.params.minYear;y<=s.params.maxYear;y++){
		    	s.years.push({"key":y,"value":s.params.isSimpleYear?y.toString().substring(2,4)+s.params.yyUnit:y+s.params.yyUnit,"flag":"date"});
		    }
	    }
	    //月
	    s.months=[];
	    if(s.params.monthsData){
	    	s.months=s.params.monthsData;
	    }else{
	    	for(var m=1;m<=12;m++){
	    		var tempM=m<10?"0"+m:m;
		    	s.months.push({"key":tempM,"value":tempM+s.params.MMUnit,"flag":"date"});
		    }
	    }
	    //日
	    s.days=[];
	    var currentMaxday=new Date(s.date.getFullYear(),s.date.getMonth()+1,0).getDate();
	    if(s.params.daysData){
	    	s.days=s.params.daysData;
	    }else{
	    	for(var d=1;d<=currentMaxday;d++){
	    		var tempD=d<10?"0"+d:d;
		    	s.days.push({"key":tempD,"value":tempD+s.params.ddUnit,"flag":"date"});
		    }
	    }
	    function updateDays(year,month){
	    	var maxDay=new Date(year,month,0).getDate();
	    	s.days=[];
	    	for(var d=1;d<=maxDay;d++){
	    		var tempD=d<10?"0"+d:d;
		    	s.days.push({"key":tempD,"value":tempD+s.params.ddUnit,"flag":"date"});
		    }
		    s.scrollpicker.mergeSlot(2,s.days);//修改第三项
	    }

	    //时
	    s.hours=[];
	    if(s.params.hoursData){
	    	s.hours=s.params.hoursData;
	    }else{
	    	for(var hour=0;hour<=23;hour++){
	    		var tempHour=hour<10?"0"+hour:hour;
		        s.hours.push({"key":tempHour,"value":tempHour+s.params.hhUnit,"flag":"time"});
		    }
	    }
	    
	    //分
	    s.minutes=[];
	    if(s.params.minutesData){
	    	s.minutes=s.params.minutesData;
	    }else{
	    	for(var minute=0;minute<=59;minute++){
	    		var tempMinute=minute<10?"0"+minute:minute;
		        s.minutes.push({"key":tempMinute,"value":tempMinute+s.params.mmUnit,"flag":"time"});
		    }
	    }

	    /*================
	    Method
	    ==================*/
	    s.show=function(){
	    	s.scrollpicker.show();
	    }
	    s.getActiveText=function(activeData){
	    	var activeText="";
	    	var dateArr=[];
	    	var timeArr=[];
	    	activeData.forEach(function(n,i,a){
	    		if(n["flag"]=="date")dateArr.push(n);
                else if(n["flag"]=="time")timeArr.push(n);
                else timeArr.push(n);
            });
            dateArr.forEach(function(n,i,a){
            	if(i==dateArr.length-1){
            		activeText+=n["key"];
            	}else{
            		activeText+=n["key"]+"-";
            	}
            })
            if(activeText!=""){
        		activeText+=" ";
        	}
            timeArr.forEach(function(n,i,a){
            	if(i==timeArr.length-1){
            		activeText+=n["key"];
            	}else{
            		activeText+=n["key"]+":";
            	}
            })
            return activeText;
	    }
	    s.setOnClickDone=function(fn){
	    	s.params.onClickDone=fn;
	    }
	    s.setOnClickCancel=function(fn){
	    	s.params.onClickCancel=fn;
	    }
	    /*================
	    Control
	    ==================*/
	    //滑动面板初始化
	    s.scrollpicker=new Scrollpicker({
	    	parent:s.params.parent,
	    	isClickMaskHide:s.params.isClickMaskHide,
	    	onClickDone:function(e){
	    		s.activeText=s.getActiveText(e.activeOptions);
	    		if(s.params.onClickDone)s.params.onClickDone(s);
	    	},
	        onClickCancel:function(e){
	        	s.activeText=s.getActiveText(e.activeOptions);
	            if(s.params.onClickCancel)s.params.onClickCancel(s);
	            else e.hide();
	            //还原为初始状态
	            //e.updateSlots()
	            //清空数据再注入
	            /*e.reset();
	            addSlot();*/
	        },
	    	onScrollEnd:function(e){
	    		//根据月份算日
	    		if((s.params.viewType=="date" || s.params.viewType=="datetime") && (e.activeSlotIndex==0 || e.activeSlotIndex==1)){
	    			var year=e.activeOptions[0]["key"];
					var month=e.activeOptions[1]["key"];
					
					updateDays(year,month);//更新总天数
	    		}
	    		//回调
	    		if(s.params.onScrollEnd)s.params.onScrollEnd(s);
	    	},
	    	onTransitionEnd:function(e){
	    		if(s.params.onTransitionEnd)s.params.onTransitionEnd(s);
	    	},
	    	onShowed:function(e){
	    		if(s.params.onShowed)s.params.onShowed(s);
	    	},
	    	onHid:function(e){
	    		if(s.params.onHid)s.params.onHid(s);
	    	}
	    });

	    //添加数据
	    function addMonthSlot(){
	    	s.scrollpicker.addSlot(s.years,s.params.defaultYear,s.params.yearClass);
	        s.scrollpicker.addSlot(s.months,s.params.defaultMonth,s.params.monthClass);
	    }
	    function addDateSlot(){
	    	addMonthSlot();
	        s.scrollpicker.addSlot(s.days,s.params.defaultDay,s.params.dayClass);
	    }
	    function addTimeSlot(){
	    	s.scrollpicker.addSlot(s.hours,s.params.defaultHour,s.params.hourClass);
	        s.scrollpicker.addSlot(s.minutes,s.params.defaultMinute,s.params.minuteClass);
	    }
	    function addDateTime(){
	    	addDateSlot();
	    	addTimeSlot()
	    }
	    function initSlots(){
	        switch(s.params.viewType){
	        	case "date":addDateSlot();break;
	        	case "month":addMonthSlot();break;
	        	case "time":addTimeSlot();break;
	        	case "datetime":addDateTime();break;
	        }
	    }
	    s.update=function(){
	    	s.scrollpicker.reset();
	    	initSlots();
	    }
	    s.init=function(){
	    	if(s.params.onInit)s.params.onInit(s);
	    	initSlots();
	    }
	    s.init();
	}
})(window,document,undefined);