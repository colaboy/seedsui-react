//SafeLvl 密码安全级别
(function(window,document,undefined){
	window.SafeLvl={
		//字符类型
	    charMode:function(char){
	        if (char>=48 && char <=57) //数字
	            return "number";
	        if (char>=65 && char <=90) //大写
	            return "capitalize";
	        if (char>=97 && char <=122) //小写
	            return "lowercase";
	        else
	            return "other";
	    },
	    //密码强度检测
		check:function(value){
	        var mode={};
	        for (var i=0;i<value.length;i++){
	            mode[this.charMode(value.charCodeAt(i))]="";
	        }
	        var lvl=0;
	        for(m in mode){
	        	lvl++;
	        }
	        return lvl;
	    },
	    //强度文本框绑定
	    fields:function(txtField,lvlField){
	    	if(!lvlField)return;
	    	var value=txtField.value;
	        var lvl=this.check(value);
	        lvlField.className=lvlField.className.replace(/lvl[0-3]/,"lvl"+lvl);
	    }
	}
})(window,document,undefined);