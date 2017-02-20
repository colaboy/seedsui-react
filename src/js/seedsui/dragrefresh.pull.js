//Dragrefresh 下拉刷新:pull风格
(function(window,document,undefined){
	window.DfPull=function(params){
		/*==================
		  Model
		  ==================*/
        var parent=typeof params.parent=="string"?document.querySelector(params.parent):params.parent;
        if(!parent){
            console.log("SeedsUI Error : parent不存在，请检查页面中是否有此元素");
            return;
        }

		var topContainer=document.createElement("div");
		topContainer.setAttribute("class","SID-Dragrefresh-TopContainer df-pull");
		topContainer.innerHTML='<div class="df-pull-box">'+
                    '<div class="df-pull-icon"></div>'+
                    '<div class="df-pull-caption">下拉可以刷新</div>'+
                '</div>';
        parent.insertBefore(topContainer,parent.childNodes[0]);
        var topIcon=topContainer.querySelector(".df-pull-icon");
        var topCaption=topContainer.querySelector(".df-pull-caption");

		var bottomContainer=document.createElement("div");
		bottomContainer.setAttribute("class","SID-Dragrefresh-BottomContainer df-pull");
		bottomContainer.setAttribute("style","height: 50px;");
		bottomContainer.innerHTML='<div class="df-pull-box">'+
                    '<div class="df-pull-icon df-pull-icon-loading"></div>'+
                    '<div class="df-pull-caption">正在加载...</div>'+
                '</div>';
		parent.appendChild(bottomContainer);
        var bottomIcon=bottomContainer.querySelector(".df-pull-icon");
        var bottomCaption=bottomContainer.querySelector(".df-pull-caption");
		/*==================
		  params
		  ==================*/
		var defaults={
            overflowContainer:params.overflowContainer,
            topContainer:topContainer,
            bottomContainer:bottomContainer,
            threshold:50,
            onTopRefresh:params.onTopRefresh,
            onTopComplete:function(e){
                params.onTopComplete(e);
                bottomIcon.classList.remove("df-pull-icon-none");
                bottomCaption.innerHTML="正在加载...";
            },
            onBottomRefresh:params.onBottomRefresh,
            onBottomComplete:params.onBottomComplete,
            onBottomNoData:function(e){
                bottomIcon.classList.add("df-pull-icon-none");
                bottomCaption.innerHTML="没有更多数据了";
                params.onBottomNoData(e);
            },
            //实体操作
            onPull:function(e){
                topContainer.style.height=e.touches.currentPosY+"px";
                if(!e.isTopRefreshing){
                    if(e.touches.currentPosY>=e.params.threshold){
                        topIcon.classList.add("df-pull-icon-down");
                        topCaption.innerHTML="释放立即刷新";
                    }else{
                        topIcon.classList.remove("df-pull-icon-down");
                        topCaption.innerHTML="下拉可以刷新";
                    }
                }
            },
            onShowTop:function(e){
                topContainer.style.height=e.params.threshold+"px";
                topIcon.classList.remove("df-pull-icon-down");
                topIcon.classList.add("df-pull-icon-loading");
                topCaption.innerHTML="正在刷新...";
            },
            onHideTop:function(e){
                topContainer.style.height="0";
            },
            onTopHid:function(e){
                topIcon.classList.remove("df-pull-icon-down");
                topIcon.classList.remove("df-pull-icon-loading");
            },
        };
        /*==================
		  Plugin
		  ==================*/
		return new Dragrefresh(defaults);
	};
})(window,document,undefined);