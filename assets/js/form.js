//Form(require Prompt.js)
(function(window,document,undefined){
	window.Form=function(container,params){
		/*================
		Model
		================*/
		var defaults={
			formFilterClass:null,//过滤表单元素
			promptParent:document.body,//提示框的父元素
			
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
		//Form
		var s=this;
		//Params
		s.params = params;
		//Container
		s.container=typeof container=="string"?document.querySelector(container):container;
		//表单元素
		s.formElements=[];
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
				if(s.params.formFilterClass && field.classList.contains(s.params.formFilterClass)){
					continue;
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
		/*表单Json化*/
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
		/*表单序列化*/
		s.serialize=function(){
			//序列化
			var parts=s.serializeArray();
			//获得字符串
			return parts.join("&");
		};
		/*单个元素验证*/
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
						console.log(pattern.exec(str)[1]);
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
					
					if(s.params.onFail){
						s.params.onFail(s);
					}else{
						s.prompt.setText(errormsg);
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