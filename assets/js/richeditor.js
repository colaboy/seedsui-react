/*!
*	富文本编辑
*	@version 1.0.0
*	@author WangMingzhu
*/

/**
*  富文本编辑，主要用于编辑模式框（contenteditable="true"）或者 iFrame富文本框，背景色、加粗、链接、插入图片等功能
* 
*  @class RichEditor
*/
var Richeditor={
	//获取选区
	selection:function(){
		return document.getSelection();
	},
	//获取文本框光标位置
	getTxtCusorPos:function(txt){
		var cusorPos=-1;
		//非ie
		if(txt.selectionStart){//非IE浏览器
			cusorPos= txt.selectionStart;
			return cusorPos;
		}
		//讨厌的ie
		if(document.selection && document.selection.createRange){
			var range = document.selection.createRange();
			range.moveStart("character",-txt.value.length);
			cusorPos=range.text.length;
			return cusorPos;
		}
	},
	//获取光标位置
	getDivCusorPos:function(){
		var cusorPos = 0;// 光标位置
		//非ie
		if(window.getSelection){
			var selection=window.getSelection();
			//选中区域的“起点”
			/*console.log(selection.anchorNode);
			//选中区域的“结束点”
			console.log(selection.focusNode);
			//“结束点”的偏移量
			console.log(selection.focusOffset);
			//判断是否有选中区域
			console.log(selection.isCollapsed);
			//一般一个页面只有一个range，也有可能是多个range(使用Ctrl健进行多选)
			console.log(selection.rangeCount);*/
			
			//“起点”的偏移量
			cusorPos=selection.anchorOffset;
			return cusorPos;
		}
		//讨厌的ie
		if(document.selection && document.selection.createRange){
			var range = document.selection.createRange();
			var srcele = range.parentElement();
			var copy = document.body.createTextRange();
			copy.moveToElementText(srcele);
			for (cusorPos = 0; copy.compareEndPoints("StartToStart", range) < 0; cusorPos++) {
				copy.moveStart("character", 1);
			}
			return cusorPos;
		}
	},
	//只支持高级浏览器
	selectionPos:function(classname){
		var selection=window.getSelection();
		var cursorOffset=0;
		document.onselectionchange=function(e){
			if(e.target.activeElement.className==classname){
				cursorOffset=selection.anchorOffset;
			}
		}
		return cursorOffset;
	},
	/**
	 * 确定命令是否已经激活
	 * 
	 * @method isenable
	 * @param commandName (命令名称，如：backcolor)
	 * @return boolean
	 */
	isenable:function(commandName){
		return document.queryCommandEnabled(commandName);
	},
	backgroundcolor:function(color){
		document.execCommand("backcolor",false,color);
	},
	bold:function(){
		document.execCommand("bold",false,null);
	},
	italic:function(){
		document.execCommand("italic",false,null);
	},
	underline:function(){
		document.execCommand("underline",false,null);
	},
	copy:function(){
		document.execCommand("copy",false,null);
	},
	selectall:function(){
		document.execCommand("selectall",false,null);
	},
	cut:function(){
		document.execCommand("cut",false,null);
	},
	paste:function(){
		document.execCommand("paste",false,null);
	},
	del:function(){
		document.execCommand("delete",false,null);
	},
	link:function(url){
		document.execCommand("createlink",false,url);
	},
	unlink:function(){
		document.execCommand("unlink",false,null);
	},
	fontname:function(fontName){
		document.execCommand("fontname",false,fontName);
	},
	fontsize:function(fontSize){
		if(fontSize){
			document.execCommand("fontsize",false,fontSize);
			return;
		}
		return document.queryCommandValue("fontsize");
	},
	fontcolor:function(fontColor){
		document.execCommand("forecolor",false,fontColor);
	},
	format:function(tag){
		document.execCommand("formatblock",false,tag);
	},
	unformat:function(){
		document.execCommand("removeformat",false,null);
	},
	indent:function(){
		document.execCommand("indent",false,null);
	},
	outdent:function(){
		document.execCommand("outdent",false,null);
	},
	hr:function(){
		document.execCommand("inserthorzizontalrule",false,null);
	},
	img:function(url){
		document.execCommand("insertimage",false,url);
	},
	ol:function(){
		document.execCommand("insertorderedlist",false,null);
	},
	ul:function(){
		document.execCommand("insertunorderedlist",false,null);
	},
	p:function(){
		document.execCommand("insertparagraph",false,null);
	},
	center:function(){
		document.execCommand("justifycenter",false,null);
	},
	left:function(){
		document.execCommand("justifyleft",false,null);
	},
	right:function(){
		document.execCommand("justifyright",false,null);
	},
	//设置光标位置
	setCaretPosition:function(elem, caretPos) {
	    if(elem != null) {
	        if(elem.createTextRange) {
	            var range = elem.createTextRange();
	            range.move('character', caretPos);
	            range.select();
	        }
	        else {
	            if(elem.selectionStart) {
	                elem.focus();
	                elem.setSelectionRange(caretPos, caretPos);
	            }
	            else
	                elem.focus();
	        }
	    }
	},
	isEnter:function(){
		//监听键盘输入
		EventUtil.addHandler(window,"keydown",function(e){
			keynum = e.which || e.keyCode;
			if(keynum=="13"){
				return true;
			}
			return false;
		})
	},
	queryInput:function(queryExtend,queryCollapse){
		var winHeight=window.innerHeight,currentWinHeight=window.innerHeight;
		var listenerInput;//监听输入框
		listenerInput=setInterval(function(e){
			currentWinHeight=window.innerHeight;
			//获得输入法高度
			if(DB.get("queryInputHeight") && DB.get("queryInputHeight")>0){
				console.log("读取数据库queryInputHeight:"+DB.get("inputHeight"));
				this.inputHeight=DB.get("queryInputHeight");
				clearInterval(listenerInput);
			}else{
				this.inputHeight=winHeight-currentWinHeight;
				console.log("注入数据库queryInputHeight:"+inputHeight);
				DB.set("queryInputHeight",inputHeight);
			}
			//判断输入法是否收缩
			if(winHeight==currentWinHeight){
				if(queryCollapse){
					queryCollapse.call(this,e);
				}
				clearInterval(listenerInput);
			}else{
				if(queryExtend){
					queryExtend.call(this,e);
				}
			}
		},500);
	},
};