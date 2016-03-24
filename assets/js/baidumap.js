/*!
 * 百度地图api
 * @version 1.0.0
 * @author WangMingzhu
 */

/**
*  百度地图api调用
* 
*  @class BaiduMap
*/
(function(window,document,undefined){
	
	window.BaiduMap=function(container,params){
		/*=========================
          Params
          ===========================*/
        var defaults={
        	//定义弹出框样式
			"infoWindowStyle":{
				width:250,
				height:120,
				title:"<h4 style='margin:0 0 5px 0;padding:0.2em 0'>最新签到</h4>",
				enableMessage:true,
				offset:new BMap.Size(0, -20)
			},
			//自定义标记图标
			"markerIcon":null,
			//自定义标记label样式
			"labelStyle":{
				display:"block",
				position:"relative",
				width:"30px",
				height:"30px",
				borderRadius:"50% 50% 50% 0",
				webkitTransform:"rotate(-45deg)",
				webkitTransformOrigin:"center",
				border:"none",
				margin:"-12px 0 0 -7px"
			},
		}
		params=params||{};
		for(var def in defaults){
			if(params[def]===undefined){
				params[def]=defaults[def];
			}
		}
		//Map
		var s=this;
		//Params
		s.params = params;
		//初始化地图控件
		s.map = new BMap.Map(container);
		s.container=document.querySelector("#"+container);
		
		/*=========================
          Method
          ===========================*/
        //标记点击，打开infowWindow
        function addClickHandler(content,marker){
			marker.addEventListener("click",function(e){
				openInfo(content,e)}
			);
		}
		//打开infowWindow
		function openInfo(content,e){
			var p = e.target;
			var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
			var infoWindow = new BMap.InfoWindow(content,s.params.infoWindowStyle);  // 创建信息窗口对象 
			s.map.openInfoWindow(infoWindow,point); //开启信息窗口
		}
		//显示地图标记
		s.show=function(markerData){
			s.map.clearOverlays();
			if(!markerData){
				s.map.centerAndZoom("南京", 15);
				return;
			}
			if(arguments.length===2){
				s.map.centerAndZoom(new BMap.Point(arguments[0],arguments[1]), 15);
				return;
			}
			//显示区域
			s.map.centerAndZoom(new BMap.Point(markerData[0][0],markerData[0][1]), 15);
			for(var i=0;i<markerData.length;i++){
				//添加label对象
				if(s.params.labelStyle){
					var myLabel=new BMap.Label(markerData[i][3]);
					s.params.labelStyle.backgroundColor=markerData[i][4];
					myLabel.setStyle(s.params.labelStyle);
				}
				//添加描点
				var marker = new BMap.Marker(new BMap.Point(markerData[i][0],markerData[i][1]));
				if(s.params.markerIcon)marker.setIcon(s.params.markerIcon);
				marker.setLabel(myLabel);
				var content = markerData[i][2];
				s.map.addOverlay(marker);
				//添加点击
				addClickHandler(content,marker);
			}
		}
		//获得gps位置信息
		s.gps=function(featureHandler,feature){
			var geolocation = new BMap.Geolocation();
			geolocation.getCurrentPosition(function(pos){
				if(this.getStatus() == BMAP_STATUS_SUCCESS){
					var point=pos.point,y=point.lng,x=point.lat;
					//这里是坐标point
					if(feature && feature==="point"){
						featureHandler(point);
						return;
					}
					//根据point得到地址
					var gpsPlace = new BMap.Geocoder();
					gpsPlace.getLocation(point, function(result){      
						if (result){
							//执行传入的回调函数
							featureHandler(point,result.address);
						}else{
							alert("获取地址失败"+this.getStatus());
						}
					});
				}else {
					alert("获取坐标失败"+this.getStatus());
				}
			},{enableHighAccuracy: true});
		}
		//根据坐标获得地址
		s.place=function(point,featureHandler){
			alert(point);
			//根据point得到地址
			var gpsPlace = new BMap.Geocoder();
			gpsPlace.getLocation(point, function(result){      
				if (result){
					//执行传入的回调函数
					if(feature && feature==="place"){
						featureHandler(result.address);
					}
				}
			});
		}
		//一键导航
		s.mapGuide=function(guideopts){
			var lng=guideopts.point.lng;
			var lat=guideopts.point.lat;
			var title=guideopts.title;
			var content=guideopts.content;
			window.location.href='http://api.map.baidu.com/marker?location='+lat+','+lng+'&title='+title+'&content='+content+'&output=html';
		}

		//返回地址截图
		s.mapImg=function(mapImgOpt){
			var lng=mapImgOpt.point.lng;
			var lat=mapImgOpt.point.lat;
			var title=mapImgOpt.title;
			var content=mapImgOpt.content;
			var width=mapImgOpt.width;
			var height=mapImgOpt.height;
			
			var imgSrc="http://api.map.baidu.com/staticimage?width="+width+"&height="+height+"&center="+lng+","+lat+"&markers="+lng+","+lat+"&scale=1&zoom=15&markerStyles=-1,http://api.map.baidu.com/images/marker_red.png";
			return imgSrc;
		}
	};
})(window,document,undefined);