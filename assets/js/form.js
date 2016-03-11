/*!
 * form表单类库
 * @version 1.0.0
 * @author WangMingzhu
 *
 * @requie datatype.js
 * @requie jquery.js
 */

/**
*  表单序列化
* 
*  @class Form
*/
(function(window,document,undefined){
	'use strict';
	window.Form=function(container){
		/*================
		Model
		================*/
		var s=this;
		s.container=document.querySelector(container);
		s.formElements=[];//表单元素
		s.getFormElements=function(){
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
		//表单控件初始化(主要是针对小眼睛和开关控件)
		s.initFormControl=function(){
			//开关控件点击
			$(".switch").click(function(){
				var name=$(this).data("name");
				var val=$(this).data("value")||"";
				var hiddeninput=$("+input[name="+name+"]",this);
				if(name && !hiddeninput[0]){
					$('<input type="hidden" name="'+name+'">').insertAfter(this);
					hiddeninput=$("+input[name="+name+"]",this);
				}
				
				if($(this).hasClass("active")){
					$(this).removeClass("active");
					if(hiddeninput[0])hiddeninput.val("");
				}else{
					$(this).addClass("active");
					if(hiddeninput[0])hiddeninput.val(val);
				}
			});
			//密码控件点击小眼睛
			$("[type=password] + i").click(function(){
				if($(this).hasClass("active")){
					$(this).removeClass("active");
					$(this).parent().find("input[type]").attr("type","password");
				}else{
					$(this).parent().find("input[type]").attr("type","text");
					$(this).addClass("active");
				}
				$(this).parent().find("input[type]")[0].focus();
			});
			//带清空按钮
			$("[data-input='clear'] input").on("input",function(){
	    		if($(this).val().length>0){
	    			$("+i",this).css("display","block");
	    		}else{
	    			console.log(2);
	    			$("+i",this).css("display","none");
	    		}
	    	});
	    	$("[data-input='clear'] input+i").css("display","none").on("click",function(){
	    		$(this).css("display","none");
	    		$(this).parent().find("input").val("").focus();
	    	})
			//安全检测
			$(".safelvl").parent().find("[type=password]").on("input propertychange",function(){
				s.checkSafe($(this)[0],$(".safelvl")[0]);
			});
		};
		/*================
		Method
		================*/
		//表单序列化
		s.serialize=function(){
			var parts=[],field=null;
			for(var i=0;i<s.formElements.length;i++){
				field=s.formElements[i];
				//如果是多选框，则每个值单独一个条目
				if(field.type=="select-one" || field.type=="select-multiple"){
					for(var j=0;j<field.options.length;j++){
						var option=field.options[j];
						if(option.selected){
							parts.push(field.name+"="+option.value);
						}
					}
				}else{
					//push到数组里
					parts.push(field.name+"="+field.value);
				}
			}
			return parts.join("&");
		};
		//单个验证
		s.safelvl=0;//密码安全等级
		var ruleExpr = {
			"required":/^.+$/,//不能为空
			"username":/^[\w]*$/,//只能包括字母、数字和下划线
			"password":/^[0-9_a-zA-Z-~!@#$]*$/,//密码格式不正确
			"mail":/^(\w+@\w+\.[\.\w]+)?$/,//邮箱格式不正确
			"phone":/^([1][34578][0-9]{9})?$/,//手机号码输入不正确
			"chinese":/^[\u4E00-\u9FA5]*$///只能填写中文
		}
		s.rule=function(field){
			var ruleField=field.getAttribute("data-rule-field")||"";
			var rule=field.getAttribute("data-rule").split(" ");
			var value=field.value||"";
			var errorMsg=null;
			for(var i=0,rulename;rulename=rule[i++];){
				if(ruleExpr[rulename]){
					if(!ruleExpr[rulename].test(value)){
						errorMsg=ruleField+lang.rule[rulename];
						break;
					}
				}else if(rulename.indexOf("minlength")>=0){
					var minlength=rulename.split(":")[1];
					if(value.length>0 && value.length<minlength){
						errorMsg=ruleField+lang.rule.minlength+ minlength +lang.rule.unit;
						break;
					}
				}else if(rulename.indexOf("maxlength")>=0){
					var maxlength=rulename.split(":")[1];
					if(value.length>maxlength){
						errorMsg=ruleField+lang.rule.maxlength+ maxlength +lang.rule.unit;
						break;
					}
				}else if(rulename.indexOf("compare")>=0){
					var compareElem=document.getElementsByName(rulename.split(":")[1])[0];
					
					if(compareElem && compareElem.value && compareElem.value!=value){
						errorMsg=lang.rule.twice+ruleField+lang.rule.compare;
						break;
					}
				}else if(rulename=="safelvl"){
					if(value.length>0 && s.safelvl<3){
						errorMsg=ruleField+lang.rule[rulename];
						break;
					}
				}
			}
			return errorMsg;
		};
		//表单验证
		s.validate=function(){
			for(var i=0,field;field=s.formElements[i++];){
				if(!field.getAttribute("data-rule")){
					continue;
				}
				var errormsg=s.rule(field);
				if(errormsg){
					var t=new Toast(errormsg);
					t.show(function(s){s.destory();});
					t=null;
					field.focus();
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
		s.init=function(){
			s.getFormElements();
			s.initFormControl();
		};
		s.init();
	}
})(window,document,undefined);