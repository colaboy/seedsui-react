(function(){
    window.Clock=function(container,params){
        /*================
        Module
        =================*/
        var defaults={
            "time":"00:00",
            "hourClass":"hour",
            "minuteClass":"minute",
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
        //Container-Hour|Minute
        s.hour=s.container.querySelector("."+s.params.hourClass);
        s.minute=s.container.querySelector("."+s.params.minuteClass);

        /*================
        Method
        =================*/
        s.updateClock=function(time){
            if(time)s.params.time=time;
            if(!/\d{1,2}:\d{1,2}/.test(s.params.time)){
                console.log("时间格式应为xx:xx");
                return;
            }
            var hourMinute=s.params.time.split(":");
            var hourDeg=s.getHourDeg(hourMinute[0]);
            var minuteDeg=s.getMinuteDeg(hourMinute[1]);
            s.hour.style.WebkitTransform="rotate("+hourDeg+"deg)";
            s.minute.style.WebkitTransform="rotate("+minuteDeg+"deg)";
            if(!isNaN(s.params.duration))s.container.style.WebkitTransitionDuration=s.params.duration+"ms";
            if(!isNaN(s.params.delay))s.container.style.WebkitTransitionDelay=s.params.delay+"ms";
        }
        s.getHourDeg=function(hour){
            return hour*30;
        }
        s.getMinuteDeg=function(minute){
            return minute*6;
        }

        /*================
        Entry
        =================*/
        s.init=function(){
            s.updateClock();
        }
        s.init();
        //Return Clock instance
        return s;
    }
    window.DataClock=function(params){
        /*===============
        Model
        ================*/
        //Containers
        var clocks=document.querySelectorAll("[data-clock]");
        clocks.containers=[];
        //Params
        var jsonParams={};
        if(params)jsonParams=params;
        /*==============
        Entry
        ================*/
        for(var i=0,clock;clock=clocks[i++];){
            jsonParams.time=clock.getAttribute("data-clock");
            clocks.containers[i]=new Clock(clock,jsonParams);
        }
        return clocks;
    }
})();