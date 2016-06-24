//SpDate 扩展scrollpicker日期控件
(function(window,document,undefined){
	window.SpDate=function(params){
		/*================
	    Model
	    ==================*/
		var defaults={
			"viewType":"date",//"date","month","time","datetime"
			"yearsData":null,
			"monthsData":null,
			"daysData":null,
			"hoursData":null,
			"minutesData":null,

			"yearClass":null,
			"monthClass":null,
			"dayClass":null,
			"hourClass":null,
			"minuteClass":null,

			"yearDefault":null,
			"monthDefault":null,
			"dayDefault":null,
			"hourDefault":null,
			"minuteDefault":null,

			"yyUnit":"年",
			"MMUnit":"月",
			"ddUnit":"日",
			"hhUnit":"时",
			"mmUnit":"分",

			/*callbacks
			onClickDone:function(SpDate)
			onClickCancel:function(SpDate)
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
	    s.date = new Date();
	    s.currents={},s.defaults={},s.classes={};
	    s.updateDatetime=function(){
	    	//当前值
	    	s.currents.year=s.date.year();
		    s.currents.month=s.date.month();
		    s.currents.day=s.date.day();
		    s.currents.hour=s.date.hour();
		    s.currents.minute=s.date.minute();
		    //默认值
		    s.defaults.year=s.currents.year+s.params.yyUnit;
		    s.defaults.month=s.currents.month+s.params.MMUnit;
		    s.defaults.day=s.currents.day+s.params.ddUnit;
		    s.defaults.hour=s.currents.hour+s.params.hhUnit;
		    s.defaults.minute=s.currents.minute+s.params.mmUnit;
		    //样式值
		    s.classes.year=s.params.yearClass||"";
		    s.classes.month=s.params.monthClass||"";
		    s.classes.day=s.params.dayClass||"";
		    s.classes.hour=s.params.hourClass||"";
		    s.classes.minute=s.params.minuteClass||"";
	    }
	    s.updateDatetime();

	    //年
	    s.years=[];
	    if(s.params.yearsData){
	    	s.years=s.params.yearsData;
	    }else{
		    for(var y=s.currents.year-5;y<=s.currents.year+5;y++){
		    	s.years.push({"key":y,"value":y+s.params.yyUnit,"flag":"date"});
		    }
	    }
	    //月
	    s.months=[];
	    if(s.params.monthsData){
	    	s.months=s.params.monthsData;
	    }else{
	    	for(var m=1;m<=12;m++){
		    	s.months.push({"key":m,"value":m+s.params.MMUnit,"flag":"date"});
		    }
	    }
	    
	    //日
	    s.days=[];
	    if(s.params.daysData){
	    	s.days=s.params.daysData;
	    }else{
	    	for(var d=1;d<=s.date.days();d++){
		    	s.days.push({"key":d,"value":d+s.params.ddUnit,"flag":"date"});
		    }
	    }
	    function replaceDays(maxDay){
	    	s.days=[];
	    	for(var d=1;d<=maxDay;d++){
		    	s.days.push({"key":d,"value":d+s.params.ddUnit,"flag":"date"});
		    }
	    }

	    //时
	    s.hours=[];
	    if(s.params.daysData){
	    	s.hours=s.params.hoursData;
	    }else{
	    	for(var hour=1;hour<=24;hour++){
		        s.hours.push({"key":hour,"value":hour+s.params.hhUnit,"flag":"time"});
		    }
	    }
	    
	    //分
	    s.minutes=[];
	    if(s.params.minutesData){
	    	s.minutes=s.params.minutesData;
	    }else{
	    	for(var minute=1;minute<=60;minute++){
		        s.minutes.push({"key":minute,"value":minute+s.params.mmUnit,"flag":"time"});
		    }
	    }

	    /*================
	    Method
	    ==================*/
	    s.show=function(){
	    	datetimeSp.show();
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
	    var datetimeSp=new Scrollpicker({
	    	"onClickDone":function(e){
	    		e.activeText=s.getActiveText(e.activeOptions);
	    		if(s.params.onClickDone)s.params.onClickDone(e);
	    	},
	        "onClickCancel":function(e){
	        	e.activeText=s.getActiveText(e.activeOptions);
	            if(s.params.onClickCancel)s.params.onClickCancel(e);
	            else e.hide();
	            //还原为初始状态
	            //e.updateSlots()
	            //清空数据再注入
	            /*e.reset();
	            addSlot();*/
	        },
	    	"onScrollEnd":function(e){
	    		if((s.params.viewType=="date" || s.params.viewType=="datetime") && e.activeSlotIndex!=2){
	    			var year=e.activeOptions[0]["key"];
					var month=e.activeOptions[1]["key"];
					var maxDay=s.date.days(year,month);
					replaceDays(maxDay);//更新总天数
					renderDay();//渲染天
	    		}
	    	}
	    });
	    function renderDay(){
			datetimeSp.mergeSlot(2,s.days);//修改第三项
		}

	    //添加数据
	    function addMonthSlot(){
	    	datetimeSp.addSlot(s.years,s.classes.year,s.defaults.year);
	        datetimeSp.addSlot(s.months,s.classes.month,s.defaults.month);
	    }
	    function addDateSlot(){
	    	addMonthSlot();
	        datetimeSp.addSlot(s.days,s.classes.day,s.defaults.day);
	    }
	    function addTimeSlot(){
	    	datetimeSp.addSlot(s.hours,s.classes.hour,s.defaults.hour);
	        datetimeSp.addSlot(s.minutes,s.classes.minute,s.defaults.minute);
	    }
	    function addDateTime(){
	    	addDateSlot();
	    	addTimeSlot()
	    }
	    function addSlot(){
	        switch(s.params.viewType){
	        	case "date":addDateSlot();break;
	        	case "month":addMonthSlot();break;
	        	case "time":addTimeSlot();break;
	        	case "datetime":addDateTime();break;
	        }
	    }
	    addSlot();
	}
})(window,document,undefined);