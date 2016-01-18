
/*
*	兼容html5 的 Exmobi js
*/
var o=1;//双击关闭，计数器
var qrcode;//扫码控件
var camerawindow;//拍照控件
var imageChoice;//照片选择控件
var gpsPosition;//gps定位
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
	dbclose:function(){
		if(o==1){
			var toast = new Toast();
			toast.setText("再按一次退出应用");
			toast.show();
		}
		else if(o==2){
			ExMobiWindow.close();
		}
		o++;
		setTimeout( function(){o=1} , 2000);
	},
	exit:function(mes){
		if(mes){
			ClientUtil.exit(mes);
			return;
		}
		ClientUtil.exitNoAsk();
	},
	dbexit:function(){
		if(o==1){
			var toast = new Toast();
			toast.setText("再按一次退出应用");
			toast.show();
		}
		else if(o==2){
			ClientUtil.exitNoAsk();
		}
		o++;
		setTimeout( function(){o=1} , 2000);
	},
	qrcode:function(){
		qrcode = new Decode();
		qrcode.onCallback = qrCodeCallback;//设置解码结束回调函数
    	qrcode.startDecode();//开始解码
	},
	camera:function(){
		camerawindow = new CameraWindow();
		camerawindow.onCallback=cameraCallback;
		camerawindow.startCamera();
	},
	imageChoice:function(pwidth,nums){
		var folder=new File("res:image/filechoice",true);
		imageChoice=new ImageChoice();
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
		var gpsLocation;
		if(Exmobi.os()=="android"){
			gpsLocation=new BaiduLocation();
		}else{
			gpsLocation=new Gps();
		}
		gpsLocation.setTimeout(5000);
	    gpsLocation.onCallback =function(){
	    	if(!gpsLocation.isSuccess()){//返回定位是否成功
		       alert(gpsLocation.objName+"定位失败")//定位失败
		       gpsLocation.stopPosition()//停止定位
		       return;
		    }
		    var latitude = gpsLocation.latitude;//获得纬度
		    var longitude = gpsLocation.longitude;//获得经度
		    var locationtime = gpsLocation.locationtime;//定位成功时间
		    var accuracy = gpsLocation.accuracy;//获取定位精度
		    //alert("latitude:"+latitude+";longitude:"+longitude+";locationtime:"+locationtime+";accuracy:"+accuracy);
		    
		    //构建location对象
		    gpsPosition=new Location(); 
		    //设置回调函数
		    gpsPosition.onCallback=gpsCallback; 
		    //设置超时时间 
		    gpsPosition.setTimeout(5000);
		    gpsPosition.startGetLocationInfo(latitude,longitude);//通过纬度，经度获取位置信息
	    };
	    gpsLocation.startPosition();
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
		alert(CacheUtil.getCache(key));
		return CacheUtil.getCache(key);
	},
	//修改webview地址
	setWebviewUrl:function(webobj,url){
	    webobj.loadUrl(url);
	},
	openWebview:function(hash, isBlank, transition){
		var blank=isBlank||true;
		var url=hash;
		var urlExpr=/^http/;
		if(urlExpr.test(hash)){
			url=hash;
		}
		//var fileName=url.substr(eval(url.lastIndexOf("/")+1));
		//var fileId=fileName.split(".")[0];
		
		var strHtml='<html isbridge="true">\n'+
						'<head>\n'+
							'<title show="false">Agile Lite</title>\n'+
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
		ExMobiWindow.openData(strHtml, blank, false, '','');
	}
}