/*
*	兼容html5 的 Exmobi js
*/
var dbcount=0;//双击关闭，计数器
var toast=new Toast();//提示框
var Exmobi={
	os:function(){
		var osname=DeviceUtil.getOs().toLowerCase();
		return DeviceUtil.getOs().toLowerCase();
	},
	showProgress : function(cb){
		progressbar = progressbar||new ProgressBar();
		progressbar.setMessage("加载中");
    	progressbar.show();
		cb&&cb();
	},
	hideProgress : function(cb){
		progressbar&&progressbar.cancel();
		cb&&cb();
	},
	alert : function(str, cb){
		ExMobiWindow.alert(str, function(){
			cb&&cb();
		});
	},
	confirm : function(str, okcb, cancelcb){
		ExMobiWindow.confirm(str, function(){
			okcb&&okcb();
		},function(){
			cancelcb&&cancelcb();
		});
	},
	open:function(hash, isBlank){
		var isNewWindow=true;
		if(isBlank){
			isNewWindow=isBlank;
		}
		ExMobiWindow.open(hash, isNewWindow);
	},
	close:function(){
		ExMobiWindow.close();
	},
	dbclick:function(msg){
		toast.setText(msg);
		toast.show();
		setTimeout( function(){dbcount=0} , 1000);
		if(dbcount==0){
			dbcount=2;
			return false;
		}
		return true;
	},
	dbclose:function(){
		if(Exmobi.dbclick("再按一次退出应用")){
			ExMobiWindow.close();
		}
	},
	exit:function(mes){
		if(mes){
			ClientUtil.exit(mes);
			return;
		}
		ClientUtil.exitNoAsk();
	},
	dbexit:function(){
		if(Exmobi.dbclick("再按一次退出应用")){
			ClientUtil.exitNoAsk();
		}
	},
	qrcode:function(){
		var qrcode = new Decode();
		qrcode.onCallback = qrCodeCallback;//设置解码结束回调函数
    	qrcode.startDecode();//开始解码
	},
	camera:function(){
		var camerawindow = new CameraWindow();
		camerawindow.onCallback=cameraCallback;
		camerawindow.startCamera();
	},
	imageChoice:function(pwidth,nums){
		var folder=new File("res:image/filechoice",true);
		var imageChoice=new ImageChoice();
		imageChoice.pwidth=600;
		imageChoice.nums=1;
		if(pwidth){
			imageChoice.pwidth=pwidth;
		}
		if(nums){
			imageChoice.nums=nums;
		}
		imageChoice.onCallback=imageChoiceCallback;
		if(!folder.exists()){
			folder.mkdirs();
		}
		imageChoice.path = "res:image/filechoice";
		imageChoice.start();
	},
	gps:function(){
		var toast=new Toast();
		toast.setText("正在定位，请稍后...");
		toast.show();
		var objGps;
		if(Exmobi.os()=="android"){
			objGps=new BaiduLocation();
		}else{
			objGps=new Gps();
		}
		objGps.setTimeout(5000);
	    objGps.onCallback=gpsCallback;
	    objGps.startPosition();
	},
	location:function(latitude,longitude){
		//构建location对象
	    var objLocation=new Location(); 
	    //设置回调函数
	    objLocation.onCallback=gpsCallback; 
	    //设置超时时间 
	    objLocation.setTimeout(5000);
	    objLocation.startGetLocationInfo(latitude,longitude);//通过纬度，经度获取位置信息
	},
	tel:function(telnumber){
		if(telnumber){
			PhoneUtil.tel(telnumber);
			return;
		}
		PhoneUtil.tel();
		return;
	},
	//*拨打电话t为号码，n为名称,如用在Exmobi中，请重写confirm方法
	askTel:function(telnumber,telname){
		if(arguments.length==0 && Exmobi["_telcache"]){
			PhoneUtil.tel(Exmobi["_telcache"]);
		}else if(!telnumber){
			alert("您所拨打的号码不存在！");
		}else{
			var message = telname?"您确认拨打"+telname+"的电话吗？":"您确认拨打电话"+telnumber+"吗？";
			Exmobi["_telcache"] = telnumber;
			var r=confirm(message);
			if(r){
				Exmobi.askTel();
			}
		}
	},
	//多个号码用|隔开
	sms:function(telnumber,content,isSent){
		//直接发送短信
		if(telnumber && content && isSent){
			SmsUtil.sendSms(telnumber,content);//直接发送短信
			return;
		}
		//打开系统短信带入号码与内容
		if(telnumber && content){
			SmsUtil.openSystemSms(telnumber,content);
			return;
		}
		//打开系统短信带入号码
		if(telnumber){
			SmsUtil.openSystemSms(telnumber);
			return;
		}
		//调用打开系统短信界面
		SmsUtil.openSystemSms();
	},
	//多个收件人用;隔开
	mail:function(mailTo,mailTitle,mailContent,mailCC,mailBcc){
		var mail=new MailObject();
		if(mailTo){
			mail.to=mailTo;
		}
		if(mailCC){
			mail.cc=mailCC;
		}
		if(mailBcc){
			mail.bcc=mailBcc;
		}
		if(mailTitle){
			mail.subject=mailTitle;
		}
		if(mailContent){
			mail.body=mailContent;
		}
		mail.show();
	},
	//添加联系人到手机通讯录
	addContact:function(name,phone,address){
		//增加联系人,不添加至群组 
		var card = new Vcard();
		if(name){
			card.name = name;
		}
		if(phone){
			card.mobile = phone;
		}
		if(address){
			card.address = address;
		}
		ContactUtil.addNewVcard(card); 
	},
	//打开系统浏览器
	openBrowser:function(url){
		NativeUtil.browser(url);
	},
	openVideo:function(path){
		MediaUtil.openVideo(path);
	},
	//缓存
	setCache:function(key,value){
		CacheUtil.setCache(key,value);
	},
	getCache:function(key){
		return CacheUtil.getCache(key);
	},
	//修改webview地址
	setWebviewUrl:function(webobj,url){
	    webobj.loadUrl(url);
	},
	openWebview:function(hash,isBlank,params){
		var isBlank=isBlank||true;
		var url=hash;
		var urlExpr=/^http/;
		if(urlExpr.test(hash)){
			url=hash;
		}
		//var fileName=url.substr(eval(url.lastIndexOf("/")+1));
		//var fileId=fileName.split(".")[0];

		//Params
		var defaults={
			uixmlId:"",
			openanimation:"",
			closeanimation:""
		}
		var params=params||{};
		for(var def in defaults){
			if(params[def]===undefined){
				params[def]=defaults[def];
			}
		}
		var uixml='<html isbridge="true" id="'+params.uixmlId+'" openanimation="'+params.openanimation+'" closeanimation="'+params.closeanimation+'">\n'+
						'<head>\n'+
							'<title show="false">SeedsUI</title>\n'+
							'<script>\n'+
							'<![CDATA[\n'+
								'function doReady(){\n'+
									'var newwv = document.getElementById("newwv");\n'+
									'newwv.executeScript(\'document.addEventListener("backmonitor",back, false);\');\n'+
								'}\n'+
							']]>\n'+
							'</script>\n'+
						'</head>\n'+
						'<body style="padding:0px;margin:0px;">\n'+
							'<webview id="newwv" url="'+url.replace(/\&/g,'&amp;')+'" backmonitor="true" plusready="doReady()"></webview>\n'+
						'</body>\n'+
					'</html>\n';
		ExMobiWindow.openData(uixml, isBlank, false, '','');
	}
}