//Dragrefresh 下拉刷新:pull风格
(function(window,document,undefined){
	window.DfPull=function(params){
		/*==================
		  Model
		  ==================*/
        var topParent=typeof params.topParent=="string"?document.querySelector(params.topParent):params.topParent;
        if(!topParent){
            console.log("SeedsUI Error : Dragrefresh.Pull topParent不存在，请检查页面中是否有此元素");
            return;
        }
        var bottomParent=typeof params.bottomParent=="string"?document.querySelector(params.bottomParent):params.bottomParent;
        if(!bottomParent){
            console.log("SeedsUI Error : Dragrefresh.Pull bottomParent不存在，请检查页面中是否有此元素");
            return;
        }

		var topContainer=params.topContainer;
        if(params.topContainer==undefined){
            topContainer=topParent.querySelector(".SID-Dragrefresh-TopContainer");
            if(!topContainer){
                topContainer=document.createElement("div");
        		topContainer.setAttribute("class","SID-Dragrefresh-TopContainer df-pull");
        		topContainer.innerHTML='<div class="df-pull-box">'+
                            '<div class="df-pull-icon"></div>'+
                            '<div class="df-pull-caption">下拉可以刷新</div>'+
                        '</div>';
                topParent.insertBefore(topContainer,topParent.childNodes[0]);
            }
            var topIcon=topContainer.querySelector(".df-pull-icon");
            var topCaption=topContainer.querySelector(".df-pull-caption");
        }

        var bottomContainer=params.bottomContainer;
        if(params.bottomContainer==undefined){
            bottomContainer=bottomParent.querySelector(".SID-Dragrefresh-BottomContainer");
            if(!bottomContainer){
        		bottomContainer=document.createElement("div");
        		bottomContainer.setAttribute("class","SID-Dragrefresh-BottomContainer df-pull");
        		bottomContainer.setAttribute("style","height: 50px;");
        		bottomContainer.innerHTML='<div class="df-pull-box">'+
                            '<div class="df-pull-icon df-pull-icon-loading"></div>'+
                            '<div class="df-pull-caption">正在加载...</div>'+
                        '</div>';
        		bottomParent.appendChild(bottomContainer);
            }
            var bottomIcon=bottomContainer.querySelector(".df-pull-icon");
            var bottomCaption=bottomContainer.querySelector(".df-pull-caption");
        }
		/*==================
		  params
		  ==================*/
		var defaults={
            overflowContainer:params.overflowContainer||document.body,
            topContainer:topContainer,
            bottomContainer:bottomContainer,
            threshold:50,
            onTopRefresh:topContainer&&params.onTopRefresh?params.onTopRefresh:null,
            onTopComplete:topContainer?function(e){
                params.onTopComplete(e);
                if(bottomContainer){
                    bottomIcon.classList.remove("df-pull-icon-none");
                    bottomCaption.innerHTML="正在加载...";
                }
            }:null,
            onTopNoData:topContainer&&params.onTopNoData?params.onTopNoData:null,
            onBottomRefresh:bottomContainer&&params.onBottomRefresh?params.onBottomRefresh:null,
            onBottomComplete:bottomContainer&&params.onBottomComplete?params.onBottomComplete:null,
            onBottomNoData:bottomContainer?function(e){
                bottomIcon.classList.add("df-pull-icon-none");
                bottomCaption.innerHTML="没有更多数据了";
                if(params.onBottomNoData)params.onBottomNoData(e);
            }:null,
            //实体操作
            onPull:topContainer?function(e){
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
            }:null,
            onShowTop:topContainer?function(e){
                topContainer.style.height=e.params.threshold+"px";
                topIcon.classList.remove("df-pull-icon-down");
                topIcon.classList.add("df-pull-icon-loading");
                topCaption.innerHTML="正在刷新...";
            }:null,
            onHideTop:topContainer?function(e){
                topContainer.style.height="0";
            }:null,
            onTopHid:topContainer?function(e){
                topIcon.classList.remove("df-pull-icon-down");
                topIcon.classList.remove("df-pull-icon-loading");
            }:null,
        };
        /*==================
		  Plugin
		  ==================*/
		return new Dragrefresh(defaults);
	};
})(window,document,undefined);