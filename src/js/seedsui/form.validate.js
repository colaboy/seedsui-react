//FormValidate(require Prompt.js)
(function(window,document,undefined){
	window.FormValidate=function(formElements,params){
		/*================
		Model
		================*/
		var defaults={
			/*callbacks
			onSuccess:function(Form)
			onFail:function(Form)
			*/
		}
		params=params||{};
		for(var def in defaults){
			if(params[def]===undefined){
				params[def]=defaults[def];
			}
		}
		//Formvalidate
		var s=this;
		//Params
		s.params = params;
		//表单元素
		s.formElements=formElements||[];
		
		/*================
		Method
		================*/
		//设置formElements对象
		s.setFormElements=function(formElements){
			s.formElements=formElements;
		};
		//添加formElements对象
		s.pushElement=function(el){
			s.formElements.push(el);
		};
		//单个元素验证
		var ruleExpr={
			"required":/.+/,//不能为空
			"positiveInteger":/^[1-9]{1,}[0-9]*$/,//正整数
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
					var divSafes=document.querySelectorAll(".safelvl");
					var pattern=/lvl([0-9])/;
					for(var j=0,divSafe;divSafe=divSafes[j++];){
						var str=divSafe.className;
						//如果安全等级低于2则返回
						if(pattern.exec(str) && pattern.exec(str)[1] && pattern.exec(str)[1]<2){
							errorMsg=ruleField+lang.rule[rulename];
							break;
						}
						if(errorMsg)break;
					}
				}
			}
			return errorMsg;
		};
		/*表单验证*/
		s.prompt=new Prompt("格式不正确",{
			"parent":s.params.promptParent
		});
		s.validate=function(){
			for(var i=0,field;field=s.formElements[i++];){
				if(!field.getAttribute("data-rule")){
					continue;
				}
				var errormsg=s.rule(field);
				if(errormsg){
					s.field=field;
					s.errormsg=errormsg;
					s.prompt.setText(errormsg);
					
					if(s.params.onFail){
						s.params.onFail(s);
					}else{
						s.prompt.show();
					}
					//field.focus();
					return false;
				}
			}
			if(s.params.onSuccess)s.params.onSuccess(s);
			return true;
		};
	}
})(window,document,undefined);