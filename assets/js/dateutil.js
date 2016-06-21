//DateUtil
Date.prototype.year=function(){
	return this.getFullYear();
}
Date.prototype.month=function(){
	return this.getMonth()+1;
}
Date.prototype.day=function(){
	return this.getDate();
}
Date.prototype.hour=function(){
	return this.getHours();
}
Date.prototype.minute=function(){
	return this.getMinutes();
}
Date.prototype.seconds=function(){
	return this.getSeconds();
}
Date.prototype.quarter=function(){//第几季
	return Math.floor((this.getMonth()+3)/3);
}
Date.prototype.milliseconds=function(){//获得时间的毫秒
	return this.getMilliseconds();
}
Date.prototype.date=function(){//yy-HH-dd
	return this.getFullYear()+"-"+this.month()+"-"+this.day();
}
Date.prototype.time=function(){//hh:mm
	return this.hour()+":"+this.minute();
}
Date.prototype.datetime=function(){//yy-HH-dd hh:mm
	return this.date()+" "+this.time();
}
Date.prototype.fulldatetime=function(){//yy-HH-dd hh:mm:ss
	return this.datetime()+":"+this.getSeconds();
}
Date.prototype.timestamp=function(){//获得现在距1970-1-1的毫秒数
	return this.getTime();
}
Date.prototype.days=function(year,month){//返回当月共多少天
	if(month && year){
		return new Date(year,month,0).getDate();
	}
	return new Date(this.year(),this.month(),0).getDate();
}
Date.prototype.tomorrow=function(){
	if(this.days()>=this.day()+1){
		return this.year()+"-"+this.month()+"-"+eval(this.day()+1);
	}else{
		if(this.month()==12){
			return eval(this.year()+1)+"-"+1+"-"+1;
		}
		return this.year()+"-"+eval(this.month()+1)+"-"+1;
	}
}
Date.prototype.plusDay=function(num){
	if(this.days()>=this.day()+num){
		return this.year()+"-"+this.month()+"-"+eval(this.day()+num);
	}else{
		if(this.month()==12){
			return eval(this.year()+num)+"-"+num+"-"+num;
		}
		return this.year()+"-"+eval(this.month()+num)+"-"+num;
	}
	return this.today()+" "+this.now();
}
Date.prototype.format=function(){//格式化日期yyyy-MM-dd hh:mm:ss
	var fmt="yyyy-MM-dd hh:mm:ss";
	if(fmtType){
		fmt=fmtType;
	}
	var y,M,d,h,m,s;
	
	if(fmtDate instanceof Date == true){
		y=fmtDate.getFullYear();
		M=fmtDate.getMonth() + 1;
		d=fmtDate.getDate();
		h=fmtDate.getHours();
		m=fmtDate.getMinutes();
		s=fmtDate.getSeconds();
	}
	//如果不是Date对象,就用另一种方法处理
	else{
		//匹配年月日yyyy-MM-dd或者yyyy.mm.dd或者yyyy/mm/dd
		var dateExpr=/([1-2][0-9][0-9][0-9])[\.\/-](0?[[1-9]|1[0-2])[\.\/-]([1-3][0-9]|0?[0-9])/
		var dateMatch=dateExpr.exec(fmtDate);
		if(!dateMatch || isNaN(dateMatch[1])  && isNaN(dateMatch[2]) && isNaN(dateMatch[3])){
			alert("您所要格式化的时期格式不正确");
			return;
		}
		y=dateMatch[1];
		M=dateMatch[2];
		d=dateMatch[3];
		h="00";
		m="00";
		s="00";
		
		//匹配时分hh:mm
		var timeExpr=/(0?[0-9]|[1-2][0-9]):([1-6][0-9]|0?[0-9])/
		var timeMatch=timeExpr.exec(fmtDate);
		if(timeMatch){
			h=timeMatch[1]?timeMatch[1]:"00";
			m=timeMatch[2]?timeMatch[2]:"00";
			s="00";
		}
		
		//匹配时分hh:mm:ss
		var tExpr=/(\d{2}|\d{1}):(\d{2}|\d{1}):(\d{2}|\d{1})/
		var tMatch=tExpr.exec(fmtDate);
		if(tMatch){
			h=tMatch[1]?tMatch[1]:"00";
			m=tMatch[2]?tMatch[2]:"00";
			s=tMatch[3]?tMatch[3]:"00";
		}
	}
	
	var dateExprs={
		"M+" :M,   
		"d+" :d,  
		"h+" :h,   
		"m+" :m,  
		"s+" :s
	};
	if(/(y+)/.test(fmt)){
		fmt=fmt.replace(RegExp.$1, (y+"").substr(4 - RegExp.$1.length));
	}
	for(var k in dateExprs){
		//"("+ k +")"=(M+)、(d+)、(h+)...
		if(new RegExp("("+ k +")").test(fmt)){
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (dateExprs[k]) : (("00"+ dateExprs[k]).substr((""+ dateExprs[k]).length)));   
		}
	}
	return fmt;
}
Date.prototype.expires=function(cacheTime){//时效性
	var y=this.getFullYear();
	var M=this.getMonth() + 1;
	var d=this.getDate();
	var h=this.getHours();
	var m=this.getMinutes();
	var s=this.getSeconds();
	if(!cacheTime){
		alert("请传入合法的时效");
		return;
	}
	//当传入的是today，时效将保存到隔天0点0分
	if(cacheTime==="today"){
		d++;
		h=0;
		m=0;
		s=0;
	}
	//当传入的是数字，并且小于1，当作延长分钟
	if(!isNaN(cacheTime) && cacheTime<1){
		m+=Math.abs(Math.round(cacheTime*60));
		if(m>=60){
			m=m-60
			h+=1;
		}
	}
	//当传入的是数字，并且大于1，当作延长小时
	if(!isNaN(cacheTime) && cacheTime>=1){
		h+=Math.abs(Math.round(cacheTime));
	}
	if(typeof cacheTime==="object"){
		if(!isNaN(cacheTime.year) && eval(cacheTime.year+y)<=2999){
			y=cacheTime.year?cacheTime.year+y:y;
		}
		if(!isNaN(cacheTime.month) && eval(cacheTime.month+M)<=12){
			M=cacheTime.month?cacheTime.month+M:M;
		}
		if(!isNaN(cacheTime.day) && eval(cacheTime.day+d)<=this.days()){
			d=cacheTime.day?cacheTime.day+d:d;
		}
		if(!isNaN(cacheTime.hour) && eval(cacheTime.hour+h)<24){
			h=cacheTime.hour?cacheTime.hour+h:h;
		}
		if(!isNaN(cacheTime.minute) && eval(cacheTime.minute+m)<60){
			m=cacheTime.minute?cacheTime.minute+m:m;
		}
		if(!isNaN(cacheTime.second) && eval(cacheTime.second+s)<60){
			s=cacheTime.second?cacheTime.second+s:s;
		}
	}
	return y+"-"+M+"-"+d+" "+h+":"+m+":"+s;
}

var DateUtil=function(){
	var date = new Date();
	return {
		year:function(){
			return date.getFullYear();
		},
		month:function(){
			return date.getMonth() + 1;
		},
		day:function(){
			return date.getDate();
		},
		hour:function(){
			return date.getHours();
		},
		minute:function(){
			return date.getMinutes();
		},
		seconds:function(){
			return date.getSeconds();
		},
		quarter:function(){
			return Math.floor((date.getMonth()+3)/3);
		},
		milliseconds:function(){
			return date.getMilliseconds();
		},
		today:function(){
			return date.getFullYear()+"-"+DateUtil.month()+"-"+date.getDate();
		},
		now:function(){
			return date.getHours()+":"+date.getMinutes();
		},
		todayNow:function(){
			return DateUtil.today()+" "+DateUtil.now();
		},
		fullTodayNow:function(){
			return DateUtil.today()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
		},
		time:function(){
			return date.getTime();//获得现在距1970-1-1的毫秒数
		},
		//返回当月共多少天
		days:function(month,year){
			var monthExpr=/^(0?[[1-9]|1[0-2])$/;//匹配1-12月
			var yearExpr=/^[1-2][0-9][0-9][0-9]$/;//匹配1000-2999年
			if(month && year){
				if(monthExpr.exec(month) && yearExpr.exec(year)){
					return new Date(year,month,0).getDate();
				}else{
					alert("您输入的月份和年份不正确");
					return;
				}
			}
			if(month){
				if(monthExpr.exec(month)){
					return new Date(date.getFullYear(),month,0).getDate();
				}else{
					alert("您输入的月份不正确");
					return;
				}
			}
			return new Date(date.getFullYear(), (date.getMonth()+1), 0).getDate();
		},
		tomorrow:function(){
			if(DateUtil.days()>=DateUtil.day()+1){
				return DateUtil.year()+"-"+DateUtil.month()+"-"+eval(DateUtil.day()+1);
			}else{
				if(DateUtil.month()==12){
					return eval(DateUtil.year()+1)+"-"+1+"-"+1;
				}
				return DateUtil.year()+"-"+eval(DateUtil.month()+1)+"-"+1;
			}
		},
		plusDay:function(num){
			if(DateUtil.days()>=DateUtil.day()+num){
				return DateUtil.year()+"-"+DateUtil.month()+"-"+eval(DateUtil.day()+num);
			}else{
				if(DateUtil.month()==12){
					return eval(DateUtil.year()+num)+"-"+num+"-"+num;
				}
				return DateUtil.year()+"-"+eval(DateUtil.month()+num)+"-"+num;
			}
		},
		//格式化日期yyyy-MM-dd hh:mm:ss
		format:function(fmtDate,fmtType){
			var fmt="yyyy-MM-dd hh:mm:ss";
			if(fmtType){
				fmt=fmtType;
			}
			var y,M,d,h,m,s;
			
			if(fmtDate instanceof Date == true){
				y=fmtDate.getFullYear();
				M=fmtDate.getMonth() + 1;
				d=fmtDate.getDate();
				h=fmtDate.getHours();
				m=fmtDate.getMinutes();
				s=fmtDate.getSeconds();
			}
			//如果不是Date对象,就用另一种方法处理
			else{
				//匹配年月日yyyy-MM-dd或者yyyy.mm.dd或者yyyy/mm/dd
				var dateExpr=/([1-2][0-9][0-9][0-9])[\.\/-](0?[[1-9]|1[0-2])[\.\/-]([1-3][0-9]|0?[0-9])/
				var dateMatch=dateExpr.exec(fmtDate);
				if(!dateMatch || isNaN(dateMatch[1])  && isNaN(dateMatch[2]) && isNaN(dateMatch[3])){
					alert("您所要格式化的时期格式不正确");
					return;
				}
				y=dateMatch[1];
				M=dateMatch[2];
				d=dateMatch[3];
				h="00";
				m="00";
				s="00";
				
				//匹配时分hh:mm
				var timeExpr=/(0?[0-9]|[1-2][0-9]):([1-6][0-9]|0?[0-9])/
				var timeMatch=timeExpr.exec(fmtDate);
				if(timeMatch){
					h=timeMatch[1]?timeMatch[1]:"00";
					m=timeMatch[2]?timeMatch[2]:"00";
					s="00";
				}
				
				//匹配时分hh:mm:ss
				var tExpr=/(\d{2}|\d{1}):(\d{2}|\d{1}):(\d{2}|\d{1})/
				var tMatch=tExpr.exec(fmtDate);
				if(tMatch){
					h=tMatch[1]?tMatch[1]:"00";
					m=tMatch[2]?tMatch[2]:"00";
					s=tMatch[3]?tMatch[3]:"00";
				}
			}
			
			var dateExprs={
				"M+" :M,   
				"d+" :d,  
				"h+" :h,   
				"m+" :m,  
				"s+" :s
			};
			if(/(y+)/.test(fmt)){
				fmt=fmt.replace(RegExp.$1, (y+"").substr(4 - RegExp.$1.length));
			}
			for(var k in dateExprs){
				//"("+ k +")"=(M+)、(d+)、(h+)...
				if(new RegExp("("+ k +")").test(fmt)){
					fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (dateExprs[k]) : (("00"+ dateExprs[k]).substr((""+ dateExprs[k]).length)));   
				}
			}
			return fmt;
		},
		//时效性
		expires:function(cacheTime){
			var y=date.getFullYear();
			var M=date.getMonth() + 1;
			var d=date.getDate();
			var h=date.getHours();
			var m=date.getMinutes();
			var s=date.getSeconds();
			if(!cacheTime){
				alert("请传入合法的时效");
				return;
			}
			//当传入的是today，时效将保存到隔天0点0分
			if(cacheTime==="today"){
				d++;
				h=0;
				m=0;
				s=0;
			}
			//当传入的是数字，并且小于1，当作延长分钟
			if(!isNaN(cacheTime) && cacheTime<1){
				m+=Math.abs(Math.round(cacheTime*60));
				if(m>=60){
					m=m-60
					h+=1;
				}
			}
			//当传入的是数字，并且大于1，当作延长小时
			if(!isNaN(cacheTime) && cacheTime>=1){
				h+=Math.abs(Math.round(cacheTime));
			}
			if(typeof cacheTime==="object"){
				if(!isNaN(cacheTime.year) && eval(cacheTime.year+y)<=2999){
					y=cacheTime.year?cacheTime.year+y:y;
				}
				if(!isNaN(cacheTime.month) && eval(cacheTime.month+M)<=12){
					M=cacheTime.month?cacheTime.month+M:M;
				}
				if(!isNaN(cacheTime.day) && eval(cacheTime.day+d)<=DateUtil.days()){
					d=cacheTime.day?cacheTime.day+d:d;
				}
				if(!isNaN(cacheTime.hour) && eval(cacheTime.hour+h)<24){
					h=cacheTime.hour?cacheTime.hour+h:h;
				}
				if(!isNaN(cacheTime.minute) && eval(cacheTime.minute+m)<60){
					m=cacheTime.minute?cacheTime.minute+m:m;
				}
				if(!isNaN(cacheTime.second) && eval(cacheTime.second+s)<60){
					s=cacheTime.second?cacheTime.second+s:s;
				}
			}
			return y+"-"+M+"-"+d+" "+h+":"+m+":"+s;
		}
	};
}();