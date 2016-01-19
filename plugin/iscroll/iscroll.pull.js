IScroll.extend=IScroll.prototype.extend=function(){
	var options=arguments[0];
	for(name in options){
		this[name]=options[name];
	}
}
IScroll.prototype.extend({
	pull:function(pullOption){
		//判断参数是否正确
		if(!pullOption && typeof pullOption!="object"){
			alert("您传入的下拉刷新参数不正确");
			return;
		}
		//判断是否有下拉显示的div
		if(!this.wrapper.getElementsByClassName("pullDown")[0]){
			//创建下拉层
			var pulldiv=document.createElement("div");
			pulldiv.setAttribute("class","pullDown");
			var pullDownIcon=document.createElement("span");
			pullDownIcon.setAttribute("class","pullDownIcon");
			var pullDownLabel=document.createElement("span");
			pullDownLabel.setAttribute("class","pullDownLabel");
			pullDownLabel.innerHTML="下拉刷新...";
			pulldiv.appendChild(pullDownIcon);
			pulldiv.appendChild(pullDownLabel);
			//插入到页面中去
			var scroller=this.wrapper.querySelector(".scroller");
			scroller.insertBefore(pulldiv,scroller.childNodes[0]);
		}
		
		//this.wrapper;//选择到的对象
		var pullBlock=this.wrapper.getElementsByClassName("pullDown")[0];
		var y=0;//顶部y
		var endY=0;//松手时的y
		var startY=0;//开始滚动时的y
		var isPullDown=false;
		var isBottom=false;
		
		var pullOption={
			"pullDownText1":pullOption.pullDownText1||"下拉刷新",
			"pullDownText2":pullOption.pullDownText2||"释放立即刷新",
			"pullDownText3":pullOption.pullDownText3||"正在刷新",
			"pullDownRange":pullOption.pullDownRange||50,
			"onPullDown":pullOption.onPullDown,
			"onPullDownDone":pullOption.onPullDownDone||null,
			"onPullDownError":pullOption.onPullDownError||null,
			"onPullBottom":pullOption.onPullBottom||null,
			"onPullBottomDone":pullOption.onPullBottomDone||null,
			"onPullBottomError":pullOption.onPullBottomError||null,
			"isBottomDone":undefined,
			"isPullDownDone":undefined
		}
		
		var self=this;
		
		this.on('scrollStart', function () {
			startY=this.y>>0;
		});
		this.on('scroll', function () {
			y=this.y>>0;
			//滚动到底部，触发底部事件
			if(y<=self.maxScrollY){
				isBottom=true;
				return;
			}
			isBottom=false;
			//向下拉动，如果拉的不到位，将会隐藏
			var marTop=eval(y-pullOption.pullDownRange)<0?eval(y-pullOption.pullDownRange):0;
			/*if(y>0 && endY<pullOption.pullDownRange){
				$(pullBlock).css({"display":"block","margin-top": marTop+"px"});
			}*/
			if(y>0 && y<pullOption.pullDownRange && endY<pullOption.pullDownRange){
				//下拉块：下拉显示下拉块
				$(pullBlock).removeClass("flip");
				$(".pullDownLabel",pullBlock).html(pullOption.pullDownText1);
				$(pullBlock).css({"display":"block","margin-top": marTop+"px"});
			}else if(y>0 && y>=pullOption.pullDownRange && endY<pullOption.pullDownRange){
				//下拉块：下拉到Range
				$(pullBlock).addClass("flip");
				$(".pullDownLabel",pullBlock).html(pullOption.pullDownText2);
			}
			//松手处
			document.addEventListener("touchend",function(){
				//若不是从头部向上滚动，则不可以刷新
				if(startY<-150){
					isPullDown=false;
					return;
				}
				endY=y;
				if(endY>=pullOption.pullDownRange){
					isPullDown=true;
					$(pullBlock).css({"display":"block","margin-top": "0px"});
				}else{
					isPullDown=false;
				}
			},false);
		});
		this.on('scrollEnd', function () {
			//滚动至底部时，执行底部函数
			if(isBottom){
				pullOption.onPullBottom();
				var listenBottomDone=window.setInterval(function(){
					//判断是否加载成功
					if(pullOption.isBottomDone==true){
						window.clearInterval(listenBottomDone);
						if(pullOption.onPullBottomDone){
							pullOption.onPullBottomDone();
						}
						
						//刷新IScroll：加载完成后，并刷新iscroll
						self.refresh();
					}else if(pullOption.isBottomDone==false){
						window.clearInterval(listenPullDownDone);
						if(pullOption.onPullBottomError){
							pullOption.onPullBottomError();
						}
					}
				},200)
			}
			//刷新状态时，改变图标样式，并执行刷新函数
			if(isPullDown==true){
				//下拉块：更改下拉层为刷新样式
				$(pullBlock).addClass("loading");
				$(".pullDownLabel",pullBlock).html(pullOption.pullDownText3);
				
				isPullDown=false;
				pullOption.onPullDown();
				var listenPullDownDone=window.setInterval(function(){
					//判断是否加载成功
					if(pullOption.isPullDownDone==true){
						window.clearInterval(listenPullDownDone);
						if(pullOption.onPullDownDone){
							pullOption.onPullDownDone();
						}
						//刷新IScroll：加载完成后，初始化下拉层，并刷新iscroll
						$(pullBlock).removeClass("flip");
						$(pullBlock).removeClass("loading");
						$(".pullDownLabel",pullBlock).html(pullOption.pullDownText1);
						
						$(pullBlock).css({"display":"none","margin-top": 0+"px"});//隐藏下拉块
						endY=0;//松手处初始化
						self.refresh();
					}else if(pullOption.isPullDownDone==false){
						window.clearInterval(listenPullDownDone);
						if(pullOption.onPullDownError){
							pullOption.onPullDownError();
						}
					}
				},200)
			}
		});
	}
});