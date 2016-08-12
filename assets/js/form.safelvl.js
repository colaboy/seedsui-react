(function(window,document,undefined){
	window.SafeLvl={
		/*字符类型*/
	    charMode:function(iN){
	        if (iN>=48 && iN <=57) //数字    
	            return 1;
	        if (iN>=65 && iN <=90) //大写    
	            return 2;
	        if (iN>=97 && iN <=122) //小写    
	            return 4;
	        else
	            return 8;
	    },
	    /*计算密码模式*/
	    pwdLvl:function(modeNum){//
	        var lvl=0;
	        for (var i=0;i<4;i++){
	            if (modeNum & 1) lvl++;
	            modeNum>>>=1;
	        }
	        return lvl;
	    },
		/*密码强度检测*/
		checkSafe:function(pwdField,lvlField){
	    	var val=pwdField.value;
	    	if(val.length<=0){
	    		lvlField.className=lvlField.className.replace(/lvl[0-3]/,"lvl0");
	    		return;
	    	}
	        var mode=0;
	        for (var i=0;i<val.length;i++){
	            mode|=this.charMode(val.charCodeAt(i));
	        }
	        var safelvl=this.pwdLvl(mode);
	        if(lvlField){
	        	lvlField.className=lvlField.className.replace(/lvl[0-3]/,"lvl"+safelvl);
	        }
	        return safelvl;
	    }
	}
})(window,document,undefined);