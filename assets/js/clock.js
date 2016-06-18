//Clock
(function(){
    window.Clock=function(container,params){
        /*================
        Model
        =================*/
        var defaults={
            "hourClass":"clock-hour",
            "minuteClass":"clock-minute",
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
        s.container=typeof container === "string"?document.querySelector(container):container;
        s.hour,s.minute,s.time;

        /*================
        Method
        =================*/
        s.update=function(time){
            s.hour=s.container.querySelector("."+s.params.hourClass);
            s.minute=s.container.querySelector("."+s.params.minuteClass);
            s.time=s.container.getAttribute("data-clock");
            if(!s.time || !/\d{1,2}:\d{1,2}/.test(s.time)){
                console.log("时间格式应为xx:xx");
                return;
            }

            var hourMinute=s.time.split(":");
            var hourDeg=s.getHourDeg(hourMinute[0]);
            var minuteDeg=s.getMinuteDeg(hourMinute[1]);

            if(!isNaN(s.params.duration))s.container.style.WebkitTransitionDuration=s.params.duration+"ms";
            if(!isNaN(s.params.delay))s.container.style.WebkitTransitionDelay=s.params.delay+"ms";

            s.hour.style.webkitTransform="rotate("+hourDeg+"deg)";
            s.minute.style.webkitTransform="rotate("+minuteDeg+"deg)";
        }
        s.getHourDeg=function(hour){
            return hour*30;
        }
        s.getMinuteDeg=function(minute){
            return minute*6;
        }
        s.update();
    }
    window.DataClock=function(params){
        var s=this;
        /*==============
        Model
        ================*/
        s.clocks=document.querySelectorAll("[data-clock]");
        s.clocks.containers=[];
        var jsonParams={};
        if(params)jsonParams=params;
        /*==============
        Method
        ================*/
        for(var i=0,clock;clock=s.clocks[i++];){
            s.clocks.containers[i]=new Clock(clock,jsonParams);
        }
    }
})();