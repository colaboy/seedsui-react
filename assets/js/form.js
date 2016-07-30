//Form
(function(window,document,undefined){
	window.Form=function(container){
		/*================
		Model
		================*/
		var s=this;
		s.params={};
		s.params.rangeTipClass="range-tooltip";
		s.container=typeof container=="string"?document.querySelector(container):container;
		//s.container=document.querySelector(container);
		s.formElements=[];//表单元素
		s.updateFormElements=function(){
			s.formElements=[];
			//获取有效的表单元素
			for(var i=0;i<s.container.elements.length;i++){
				var field=s.container.elements[i];
				//过滤没有name的表单元素
				if(!field.type || !field.name){
					continue;
				}
				//过滤button、reset、submit
				if(field.type=="button" || field.type=="reset" || field.type=="submit"){
					continue;
				}
				//过滤未选中的checkbox和radio
				if(field.type=="radio" || field.type=="checkbox"){
					if(!field.checked){
						continue;
					}
				}
				//push到数组里
				s.formElements.push(field);
			}
		};
		s.updateFormElements();
		//添加formElements对象
		s.pushElement=function(el){
			s.formElements.push(el);
		};
		/*================
		Method
		================*/
		//表单Json化
		s.serializeArray=function(){
			var parts=[],field=null;
			for(var i=0;i<s.formElements.length;i++){
				field=s.formElements[i];
				//如果是多选框，则每个值单独一个条目
				if(field.type=="select-one" || field.type=="select-multiple"){
					for(var j=0;j<field.options.length;j++){
						var option=field.options[j];
						if(option.selected){
							parts.push(field.name+"="+field.value);
						}
					}
				}else{
					//push到数组里
					parts.push(field.name+"="+field.value);
				}
			}
			return parts;
		};
		//表单序列化
		s.serialize=function(){
			//序列化
			var parts=s.serializeArray();
			//获得字符串
			return parts.join("&");
		};
		//单个元素验证
		s.safelvl=0;//密码安全等级
		var ruleExpr={
			"required":/.+/,//不能为空
			"username":/^[\w]*$/,//只能包括字母、数字和下划线
			"password":/^[0-9_a-zA-Z-~!@#$]*$/,//密码格式不正确
			"mail":/^(\w+@\w+\.[\.\w]+)?$/,//邮箱格式不正确
			"phone":/^([1][34578][0-9]{9})?$/,//手机号码输入不正确
			"chinese":/^[\u4E00-\u9FA5]*$/,//只能填写中文
			"specialchar":/^([\u4e00-\u9fa5]*|[a-zA-Z0-9]*)$///不能为特殊字符
		}
		s.rule=function(field){
			var ruleField=field.getAttribute("data-rule-field")||"";
			var rule=field.getAttribute("data-rule").split(" ");
			var value=field.value||"";
			var errorMsg=null;
			for(var i=0,rulename;rulename=rule[i++];){
				if(ruleExpr[rulename]){//正则验证
					if(!ruleExpr[rulename].test(value)){
						errorMsg=ruleField+lang.rule[rulename];
						break;
					}
				}
				if(value.length<=0){//如果为空
					break;
				}
				if(rulename.indexOf("minlength")>=0){
					var minlength=rulename.split(":")[1];
					if(value.length<minlength){
						errorMsg=ruleField+lang.rule.minlength+ minlength +lang.rule.unit;
						break;
					}
				}else if(rulename.indexOf("maxlength")>=0){
					var maxlength=rulename.split(":")[1];
					if(value.length>maxlength){
						errorMsg=ruleField+lang.rule.maxlength+ maxlength +lang.rule.unit+"，超出"+eval(value.length-maxlength)+lang.rule.unit;
						break;
					}
				}else if(rulename.indexOf("number")>=0){
					if(!Number(value)){
						errorMsg=ruleField+lang.rule.number;
						break;
					}
				}else if(rulename.indexOf("minnumber")>=0){
					var minnumber=rulename.split(":")[1];
					if(Number(value)<Number(minnumber)){
						errorMsg=ruleField+lang.rule.minnumber+minnumber;
						break;
					}
				}else if(rulename.indexOf("maxnumber")>=0){
					var maxnumber=rulename.split(":")[1];
					if(Number(value)>Number(maxnumber)){
						errorMsg=ruleField+lang.rule.maxnumber+maxnumber;
						break;
					}
				}else if(rulename.indexOf("compare")>=0){
					var compareElem=document.getElementsByName(rulename.split(":")[1])[0];
					
					if(compareElem && compareElem.value && compareElem.value!=value){
						errorMsg=lang.rule.twice+ruleField+lang.rule.compare;
						break;
					}
				}else if(rulename=="safelvl"){
					if(s.safelvl<2){
						errorMsg=ruleField+lang.rule[rulename];
						break;
					}
				}
			}
			return errorMsg;
		};
		//表单验证
		var t=new Toast("格式不正确");
		s.validate=function(fn){
			for(var i=0,field;field=s.formElements[i++];){
				if(!field.getAttribute("data-rule")){
					continue;
				}
				var errormsg=s.rule(field);
				if(errormsg){
					if(fn){
						s.field=field;
						s.errormsg=errormsg;
						fn(s);
					}else{
						t.setText(errormsg);
						t.show();
					}
					//field.focus();
					return false;
				}
			}
			return true;
		};
		//字符类型
	    s.charMode=function(iN){
	        if (iN>=48 && iN <=57) //数字    
	            return 1;
	        if (iN>=65 && iN <=90) //大写    
	            return 2;
	        if (iN>=97 && iN <=122) //小写    
	            return 4;
	        else
	            return 8;
	    }
	    //计算密码模式
	    s.pwdLvl=function(num){
	        var lvl=0;
	        for (var i=0;i<4;i++){
	            if (num & 1) lvl++;
	            num>>>=1;
	        }
	        return lvl;
	    }
		//密码强度检测
		s.checkSafe=function(pwdField,lvlField){
	    	var val=pwdField.value;
	    	if(val.length<=0){
        		lvlField.className=lvlField.className.replace(/lvl[0-3]/,"lvl0");
        		return;
        	}
	        var mode=0;
	        for (var i=0;i<val.length;i++){
	            mode|=s.charMode(val.charCodeAt(i));
	        }
	        s.safelvl=s.pwdLvl(mode);
	        if(lvlField){
	        	lvlField.className=lvlField.className.replace(/lvl[0-3]/,"lvl"+s.safelvl);
	        }
	    };
	    /*================
		Controller
		================*/
		s.events=function(detach){
			var action=detach?"removeEventListener":"addEventListener";
			//开关控件
			var switches=document.querySelectorAll(".switch");
			
			for(var i=0,swi;swi=switches[i++];){
				swi[action]("click",s.onSwitch,false);
			}
			//密码小眼睛
			var reveals=document.querySelectorAll("[data-input=reveal] [type=password] + i");
			for(var j=0,reveal;reveal=reveals[j++];){
				reveal[action]("click",s.onReveal,false);
			}
			//清除按钮框
			var clears=document.querySelectorAll("[data-input=clear] input");
			var clearIcons=document.querySelectorAll("[data-input=clear] input+i");
			for(var k=0;k<clears.length;k++){
				clears[k][action]("input",s.onClear,false);
				clearIcons[k][action]("click",s.onClearIcon,false);
			}
			//安全检测框
			var safes=document.querySelectorAll(".safelvl");
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
			var numboxs=document.querySelectorAll(".numbox input[type=number]");
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
		//开关控件
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
		//密码小眼睛
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
		//清除按钮框
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
		//安全检测框
		s.onSafeLvl=function(e){
			var lvlField=this.parentNode.querySelector(".safelvl");
			s.checkSafe(this,lvlField);
		}
		//拖动条
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