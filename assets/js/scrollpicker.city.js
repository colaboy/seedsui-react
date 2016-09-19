//SpCity 扩展scrollpicker地区控件 (require scrollpikcer.js)
(function(window,document,undefined){
	window.SpCity=function(params){
		/*================
	    Model
	    ==================*/
		var defaults={
			parent:document.body,
			viewType:"city",//"city","area"
			data:null,
			defaultValue:"----",
			provinceClass:"",
			cityClass:"",
			areaClass:"",

			isClickMaskHide:true,

			onScrollStart:null,
            onScroll:null
			/*callbacks
			onClickDone:function(Scrollpicker)
			onClickCancel:function(Scrollpicker)
			onTransitionEnd:function(Scrollpicker)
            onShowed(Scrollpicker)//显示动画结束后回调
            onHid(Scrollpicker)//隐藏动画结束后回调
            onScrollStart:function(Scrollpicker)
            onScroll:function(Scrollpicker)
            onScrollEnd:function(Scrollpicker)
			*/
		}
		params=params||{};
		for(var def in defaults){
			if(params[def]===undefined){
				params[def]=defaults[def];
			}
		}
		//SpCity
		var s=this;

		//Params
		s.params = params;

		//Data
		s.data=s.params.data;
		if(!s.data)return;

		//初始化数据
		var province=[],city=[];
		s.data.forEach(function(n,i,a){
			province.push(n);
			if(i==0){
				city=n.children;
			}
		})
		/*================
	    Method
	    ==================*/
		s.show=function(){
			s.scrollpicker.show();
		}
		s.getActiveText=function(activeData){
	    	var activeText="";
	    	var cityArr=activeData.filter(function(n,i,a){
	    		return n["value"]!=s.params.defaultValue;
			});
			cityArr.forEach(function(n,i,a){
				if(i==cityArr.length-1){
	        		activeText+=n["value"];
	        	}else{
	        		activeText+=n["value"]+"-";
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
		//初始化滚动控件
		var activeSlotIndex="unknow";//记录锁定滚动
		s.scrollpicker=new Scrollpicker({
			"parent":s.params.parent,
			"isClickMaskHide":s.params.isClickMaskHide,
			"isCascade":true,//是否开启级联更新
			"onClickDone":function(e){
				e.activeText=s.getActiveText(e.activeOptions);
		    	if(s.params.onClickDone)s.params.onClickDone(e);
	    	},
	    	"onClickCancel":function(e){
	    		e.activeText=s.getActiveText(e.activeOptions);
	            if(s.params.onClickCancel)s.params.onClickCancel(e);
	            else e.hide();
	    	},
	    	onScrollStart:function(e){
	    		if(activeSlotIndex=="unknow"){
	    			activeSlotIndex=e.activeSlotIndex;//开始锁定滚动
	    			for(var i=0,slot;slot=e.slots[i++];){
		    			slot.isLock=true;
		    		}
		    		e.slots[activeSlotIndex].isLock=false;
	    		}
            },
            onScroll:s.params.onScroll,
			onScrollEnd:function(e){
				console.log(1);
				renderAfter(activeSlotIndex);
				activeSlotIndex="unknow";//解除锁定滚动
				function renderAfter(index){
					//获得当前选中数据
					var nextSlotIndex=index+1;
					var slot=e.slots[index];
					var activeIndex=slot.activeIndex;
					var childrenData=slot.values[activeIndex].children;
					if(s.params.viewType=="city"){
						if(nextSlotIndex>=2){
							return;
						}
					}
					//如果有子级
		    		if(childrenData){
		    			//修改下一列数据
		    			e.replaceSlot(nextSlotIndex,childrenData,'text-center citycol');
		    			//递归
		    			renderAfter(nextSlotIndex);
		    		}
				}
				//Callback
            	if(s.params.onScrollEnd)s.params.onScrollEnd(e);
	    	},
	    	onTransitionEnd:function(e){
	    		if(s.params.onTransitionEnd)s.params.onTransitionEnd(e);
	    	},
	    	onShowed:function(e){
	    		if(s.params.onShowed)s.params.onShowed(e);
	    	},
	    	onHid:function(e){
	    		if(s.params.onHid)s.params.onHid(e);
	    	}
		});
		function initSlots(){
			s.scrollpicker.addSlot(province,s.params.provinceClass);
			s.scrollpicker.addSlot(city,s.params.cityClass);
			if(s.params.viewType=="area"){
				s.scrollpicker.addSlot([{'key':'-','value':s.params.defaultValue}],s.params.areaClass);
			}
		}
		s.init=function(){
	    	initSlots();
	    }
	    s.init();
	}
})(window,document,undefined);