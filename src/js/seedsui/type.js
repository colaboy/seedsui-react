//Type 类型判断
(function(window,document,undefined){
	window.Type={};

	/*====================
	基本类型
	=====================*/
	var types=["String","Boolean","Number","Array","Date","Object","HTMLElement","Function"];
	for(var i=0,type;type=types[i++];){
		(function(type){
			Type['is'+type]=function(obj){
				return Object.prototype.toString.call(obj)==='[object '+type+']';
			}
		})(type);
	}

	/*====================
	其它类型
	=====================*/
	Type.isWindow=function(obj){
		return obj===window;
	}
	Type.isPlainObject=function( obj ) {
        if(!obj || !Type.isObject(obj) || obj.nodeType || Type.isWindow(obj))return false;
        return obj.constructor===Object;
    }
	Type.isEmptyObject=function(obj){
		var key;
        for(key in obj){};
        //return key===undefined || obj.hasOwnProperty(key);
    	return key===undefined;
	}
	Type.isJson=function(obj){
		if(!Type.isPlainObject(obj))return false;
		try{
			JSON.stringify(obj);
			return true;
		}catch(e){
			return false;
		}
	}
	Type.isQueryId=function(id){
		var idExpr=/^#([\w-]*)$/;
		var match=idExpr.exec(id);
		if(match && match.length>0){
			return match[1];
		}
		return false;
	}
	Type.isQueryClass=function(classname){
		var classExpr=/^\.([\w-]*)$/;
		var match=classExpr.exec(classname);
		if(match && match.length>0){
			return match[1];
		}
		return false;
	}
	Type.isId=function(id){
		if(typeof id === "string" && document.getElementById(id)){
			return true;
		}
		return false;
	}
	Type.isClass=function(classname){
		if(typeof classname === "string" && document.getElementsByClassName(classname)){
			return true;
		}
		return false;
	}
	Type.isTag=function(str){
		var tagExpr=/^<(\w+)\s*.*\/\w*>$/im;
		var match=tagExpr.exec(str);
		if(match && match.length>0){
			return true;
		}
		return false;
	}
	Type.char=function(char){
		if (char>=48 && char <=57) //数字
            return "number";
        if (char>=65 && char <=90) //大写
            return "capitalize";
        if (char>=97 && char <=122) //小写
            return "lowercase";
        else
            return "other";
	}
})(window,document,undefined);