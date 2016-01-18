/*!
*	类型判断
*	@version 1.0.0
*	@author WangMingzhu
*/

/**
*  数据类型判断，主要用于是否是字符串、boolean值、Josn数据类型判断
* 
*  @class Type
*/
(function(window,document,undefined){
	'use strict';
	window.Type={};
	var t=Type;
	/*====================
	动态添加方法Method:isString | isBoolean | isNumber | isArray | isObject | isHTMLElement
	=====================*/
	for(var i=0,type;type=["String","Boolean","Number","Array","Object","HTMLElement","Function"][i++];){
		(function(type){
			t["is"+type]=function(obj){
				if(type=="HTMLElement" && Object.prototype.toString.call(obj).indexOf("HTML")){
					return true;
				}
				return Object.prototype.toString.call(obj)==="[object "+type+"]";
			}
		})(type);
	}
	/*====================
	Other Method
	=====================*/
	t.isJson=function(obj){
		if(!obj){
			return false;
		}
		if(this.isObject(obj)){
			try{
				JSON.stringify(obj);
				return true;
			}catch(e){
				return false;
			}
		}else if(this.isString(obj)){
			try{
				JSON.parse(obj);
				return true;
			}catch(e){
				return false;
			}
		}else{
			return false;
		}
	},
	t.isQueryId=function(id){
		var idExpr=/^#([\w-]*)$/;
		var match=idExpr.exec(id);
		if(match && match.length>0){
			return match[1];
		}
		return false;
	},
	t.isQueryClass=function(classname){
		var classExpr=/^\.([\w-]*)$/;
		var match=classExpr.exec(classname);
		if(match && match.length>0){
			return match[1];
		}
		return false;
	},
	t.isId=function(id){
		if(typeof id === "string" && document.getElementById(id)){
			return true;
		}
		return false;
	},
	t.isClass=function(classname){
		if(typeof classname === "string" && document.getElementsByClassName(classname)){
			return true;
		}
		return false;
	},
	t.isTag=function(str){
		var tagExpr=/^<(\w+)\s*.*\/\w*>$/im;
		var match=tagExpr.exec(str);
		if(match && match.length>0){
			return true;
		}
		return false;
	},
	t.hasEvent=function(element,strEvent){
		return (document.all(element)[strEvent] == null) ? false : true 
	}
})(window,document,undefined)