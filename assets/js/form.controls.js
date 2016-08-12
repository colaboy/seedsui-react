//Formcontrols (require form.safelvl.js)
(function(window,document,undefined){
	window.Formcontrols=function(params){
		/*================
		Model
		================*/
		var defaults={
			rangeTipClass:"range-tooltip",//滑动条弹出框
			numboxClass:"numbox",//数字框
			revealAttr:"[data-input=reveal]",
			clearAttr:"[data-input=clear]",
			safelvlClass:"safelvl"
		}
		params=params||{};
		for(var def in defaults){
			if(params[def]===undefined){
				params[def]=defaults[def];
			}
		}
		//Formcontrols
		var s=this;
		//Params
		s.params = params;

		/*================
		Method
		================*/
		s.update=function(){
			s.detach();
			s.attach();
		}
	    /*================
		Events
		================*/
		s.events=function(detach){
			var action=detach?"removeEventListener":"addEventListener";
			//开关控件
			var switches=document.querySelectorAll(".switch");
			
			for(var i=0,swi;swi=switches[i++];){
				swi[action]("click",s.onSwitch,false);
			}
			//密码小眼睛
			var reveals=document.querySelectorAll(s.params.revealAttr+" [type=password] + i");
			for(var j=0,reveal;reveal=reveals[j++];){
				reveal[action]("click",s.onReveal,false);
			}
			//清除按钮框
			var clears=document.querySelectorAll(s.params.clearAttr+" input");
			var clearIcons=document.querySelectorAll(s.params.clearAttr+" input+i");
			for(var k=0;k<clears.length;k++){
				clears[k][action]("input",s.onClear,false);
				if(clearIcons[k])clearIcons[k][action]("click",s.onClearIcon,false);
			}
			//安全检测框
			var safes=document.querySelectorAll("."+s.params.safelvlClass);
			for(var l=0,safe;safe=safes[l++];){
				var safeInput=safe.parentNode.querySelector("input[type]");
				safeInput[action]("input",s.onSafeLvl,false);
			}
			//拖动条
			var ranges=document.querySelectorAll("."+s.params.rangeTipClass+"+input[type=range]");
			for(var m=0,range;range=ranges[m++];){
				range[action]("touchstart",s.onRangeStart,false);
				range[action]("touchmove",s.onRangeMove,false);
				range[action]("input",s.onRangeMove,false);
				range[action]("touchend",s.onRangeEnd,false);
			}
			//数字框
			var numboxs=document.querySelectorAll("."+s.params.numboxClass+" input[type=number]");
			for(var n=0,numbox;numbox=numboxs[n++];){
				numbox.nextElementSibling[action]("click",s.onNumboxPlus,false);
				numbox.previousElementSibling[action]("click",s.onNumboxMinus,false);
			}
		}
		s.hasEvents=false;
		s.attach=function(event){
			if(!s.hasEvents)s.events();
		}
		s.detach=function(event){
			s.events(true);
		}
		/*================
		Events Handler
		================*/
		/*开关控件*/
		s.createHiddenInput=function(name){
			var hiddenInput=document.createElement("input");
			hiddenInput.setAttribute("type","hidden");
			if(name)hiddenInput.setAttribute("name",name);
			return hiddenInput;
		}
		s.onSwitch=function(e){
			var parentNode=this.parentNode;
			var name=this.getAttribute("data-name");
			var onVal=this.getAttribute("data-on-value");
			var offVal=this.getAttribute("data-off-value");
			var hiddenInput=this.nextElementSibling;
			if(hiddenInput && (!hiddenInput.type || hiddenInput.type!="hidden"))hiddenInput=null;
			if(name && !hiddenInput){
				hiddenInput=s.createHiddenInput(name);
				parentNode.insertBefore(hiddenInput,this.nextSibling);
			}
			if(this.classList.contains("active")){
				this.classList.remove("active");
				if(hiddenInput)hiddenInput.value=offVal;
			}else{
				this.classList.add("active");
				if(hiddenInput)hiddenInput.value=onVal;
			}
		}
		/*密码小眼睛*/
		s.onReveal=function(e){
			var pwdInput=this.parentNode.querySelector("input[type]");
			if(this.classList.contains("active")){
				this.classList.remove("active");
				pwdInput.type="password";
			}else{
				this.classList.add("active");
				pwdInput.type="text";
			}
			pwdInput.focus();
		}
		/*清除按钮框*/
		s.onClear=function(e){
			var clearIcon=this.nextElementSibling;
			if(!clearIcon || clearIcon.tagName!="I")return;
			if(this.value.length>0){
				clearIcon.style.display="block";
			}else{
				clearIcon.style.display="none";
			}
		}
		s.onClearIcon=function(e){
			var txtInput=this.parentNode.querySelector("input[type]");
			this.style.display="none";
			txtInput.value="";
			txtInput.focus();
		}
		/*安全检测框*/
		s.onSafeLvl=function(e){
			var lvlField=this.parentNode.querySelector("."+s.params.safelvlClass);
			if(SafeLvl)SafeLvl.checkSafe(this,lvlField);
		}
		/*拖动条*/
		s.showToolTip=function(tooltip,rangeInput){
			//当前值所占百分比
			var percent=((rangeInput.value-rangeInput.min)/(rangeInput.max-rangeInput.min)).toFixed(2);
			
			//距左的位置
			var dragRange=rangeInput.clientWidth*percent;
			var offsetLeft=rangeInput.offsetLeft+dragRange-10;
			//var currentOffsetLeft=offsetLeft-rangeInput.parentNode.offsetLeft;

			//滑块内部的实际位置
			var currentBallLeft=28*percent;

			//当前值的位置-滑块的位置=小球正中间的位置
			var left=offsetLeft-currentBallLeft;
			tooltip.innerHTML=rangeInput.value;
			tooltip.setAttribute("style","display:block;left:"+left+"px");
		}
		s.rangeTooltip,s.rangeInput;
		s.onRangeStart=function(e){
			s.rangeTooltip=this.previousElementSibling;
			s.rangeInput=this;
			s.showToolTip(s.rangeTooltip,s.rangeInput);
		}
		s.onRangeMove=function(e){
			s.showToolTip(s.rangeTooltip,s.rangeInput);
		}
		s.onRangeEnd=function(e){
			setTimeout(function(){
				s.rangeTooltip.style.display="none";
	        },1000);
		}
		//数字框
		s.numboxSum=function(inputNumber,btnPlus,btnMinus,operate){
			var min=inputNumber.getAttribute("min")||0;
			var max=inputNumber.getAttribute("max")||9999;
			var step=inputNumber.getAttribute("step")||1;

			var result;

			if(operate){//加运算
				btnMinus.disabled=false;
				result=parseInt(inputNumber.value)+parseInt(step);
				if(result>=max){
					result=max;
					btnPlus.disabled=true;
				}
			}else{//减运算
				btnPlus.disabled=false;
				result=inputNumber.value-step;
				if(result<=min){
					result=min;
					btnMinus.disabled=true;
				}
			}
			inputNumber.value=result;
		}
		s.onNumboxPlus=function(e){
			var inputNumber=this.previousElementSibling;
			var btnPlus=this;
			var btnMinus=inputNumber.previousElementSibling;
			s.numboxSum(inputNumber,btnPlus,btnMinus,true);
		}
		s.onNumboxMinus=function(e){
			var inputNumber=this.nextElementSibling;
			var btnPlus=inputNumber.nextElementSibling;
			var btnMinus=this;
			s.numboxSum(inputNumber,btnPlus,btnMinus,false);
		}
		//初始化
		s.init=function(){
			s.attach();
		};
		s.init();
	}
})(window,document,undefined);