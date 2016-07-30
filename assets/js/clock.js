//Clock
(function(window,document,undefined){
    window.Clock=function(clock,params){
        /*================
        Model
        =================*/
        var defaults={
            "hourClass":"clock-hour",
            "minuteClass":"clock-minute",
            "clockAttr":"data-clock"
            /*
            "duration":"500",
            "delay":"0"
            */
        }
        params=params||{};
        for(var def in defaults){
            if(params[def]===undefined){
                params[def]=defaults[def];
            }
        }
        var s=this;
        //Params
        s.params = params;
        //Container
        s.clock=typeof clock === "string"?document.querySelector(clock):clock;
        s.hour,s.minute,s.time,s.hourDeg,s.minuteDeg;
        /*================
        Method
        =================*/
        s.getHourDeg=function(hour){
            return hour*30;
        }
        s.getMinuteDeg=function(minute){
            return minute*6;
        }
        s.update=function(){
            s.hour=s.clock.querySelector("."+s.params.hourClass);
            s.minute=s.clock.querySelector("."+s.params.minuteClass);
            s.time=s.clock.getAttribute(s.params.clockAttr);
            if(!s.time || !/\d{1,2}:\d{1,2}/.test(s.time)){
                console.log("时间格式应为xx:xx");
                return;
            }
            var hourMinute=s.time.split(":");
            s.hourDeg=s.getHourDeg(hourMinute[0]);
            s.minuteDeg=s.getMinuteDeg(hourMinute[1]);
        }
        s.update();
        s.play=function(){
            if(!isNaN(s.params.duration))s.clock.style.webkitTransitionDuration=s.params.duration+"ms";
            if(!isNaN(s.params.delay))s.clock.style.webkitTransitionDelay=s.params.delay+"ms";
            s.hour.style.webkitTransform="rotate("+s.hourDeg+"deg)";
            s.minute.style.webkitTransform="rotate("+s.minuteDeg+"deg)";
        }
        s.play();
    }
    window.Clocks=function(params){
        var s=this;
        //获得所有元素
        s.clocks=document.querySelectorAll("[data-clock]");
        s.clocks.clocks=[];
        var jsonParams={};
        if(params)jsonParams=params;
        //实例化所有元素
        for(var i=0,clock;clock=s.clocks[i++];){
            s.clocks.clocks[i]=new Clock(clock,jsonParams);
        }
    }
})(window,document,undefined);