//Dragrefresh 下拉刷新:Circle风格
(function(window,document,undefined){
	window.DfCircle=function(params){
		/*==================
		  Model
		  ==================*/
        var parent=typeof params.parent=="string"?document.querySelector(params.parent):params.parent;
        if(!parent){
            console.log("SeedsUI Error : parent不存在，请检查页面中是否有此元素");
            return;
        }

		var topContainer=document.createElement("div");
		topContainer.setAttribute("class","SID-Dragrefresh-TopContainer df-circle");
		topContainer.innerHTML='<div class="df-circle-icon"></div>';
        parent.appendChild(topContainer);
        var topIcon=topContainer.querySelector(".df-circle-icon");


		var bottomContainer=document.createElement("div");
		bottomContainer.setAttribute("class","SID-Dragrefresh-BottomContainer df-circle-icon df-circle-icon-loading");
        bottomContainer.setAttribute("style","height:50px");
		parent.appendChild(bottomContainer);
		/*==================
		  params
		  ==================*/
		var defaults={
            overflowContainer:params.overflowContainer,
            topContainer:topContainer,
            bottomContainer:bottomContainer,
            baseline:-50,
            threshold:120,
            onTopRefresh:params.onTopRefresh,
            onTopComplete:function(e){
                params.onTopComplete(e);
                bottomContainer.classList.remove("df-circle-icon-none");
            },
            onBottomRefresh:params.onBottomRefresh,
            onBottomComplete:params.onBottomComplete,
            onBottomNoData:function(e){
                bottomContainer.classList.add("df-circle-icon-none");
            },
            //实体操作
            onPull:function(e){
                if(!e.isTopRefreshing){
                    rotateDeg=e.touches.currentPosY*2;
                    topContainer.style.webkitTransform='translate3d(0,' + e.touches.currentPosY + 'px,0) rotate(' + rotateDeg + 'deg)';
                }
            },
            onShowTop:function(e){
                topContainer.style.webkitTransform='translate3d(0,120px,0) rotate(0deg)';
            },
            onHideTop:function(e){
                topContainer.style.webkitTransform='translate3d(0,0,0) rotate(0deg)';
            },
            onTopShowed:function(e){
                topIcon.classList.add("df-circle-icon-loading");
            },
            onTopHid:function(e){
                topIcon.classList.remove("df-circle-icon-loading");
            },
        };
        /*==================
		  Plugin
		  ==================*/
		return new Dragrefresh(defaults);
	};
})(window,document,undefined);