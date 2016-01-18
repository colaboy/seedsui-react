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
var BaiduMap={
	//gps回调
	gps:function(featureHandler,feature){
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
	},
	
	//根据坐标获得地址
	place:function(point,featureHandler){
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
	},
	
	//一键导航
	mapGuide:function(guideopts){
		var lng=guideopts.point.lng;
		var lat=guideopts.point.lat;
		var title=guideopts.title;
		var content=guideopts.content;
		window.location.href='http://api.map.baidu.com/marker?location='+lat+','+lng+'&title='+title+'&content='+content+'&output=html';
	},
	
	//返回地址截图
	mapImg:function(mapImgOpt){
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