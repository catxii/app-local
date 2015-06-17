iapp.controller('SafeSchoolkCtrl', function($rootScope, $state, $scope, $ionicPlatform, $ionicNavBarDelegate, iservice) {
	//地图元素跟 map对象
	var em=null, map = null;
	
	//获取自己当前的地址
	$scope.userLocation = function(){
		map.showUserLocation(true)
		map.getUserLocation(function(state,pos){
			if(0==state){
				map.setCenter(pos);
			}
		});
	};
	
	//创建一个标记
	var createMarker = function(point){
		var marker=new plus.maps.Marker(point);
		marker.setIcon("img/our.png");
		marker.setLabel("华容县教育局");
		var bubble = new plus.maps.Bubble("所在位置");
		marker.setBubble(bubble);
		map.addOverlay(marker);
	};
	
	//初始化地图信息
	var initMap = function(point){
			em=document.getElementById("map");
			
			if(!em || map){return};
			
			map=new plus.maps.Map("map");
			//zoom值范围:3-18
			//设置中心区域
			map.centerAndZoom(point,18);
			$rootScope.map = map;
			createMarker(point);
	};
	
	var loadPointData = function()
	{
		var x = 112.570847;
		var y = 29.528979;
		var point = new plus.maps.Point(parseFloat(x),parseFloat(y));
		initMap(point);
	};
	
  	document.getElementById("backbutton").addEventListener('tap', function(){
  		map.hide();
  	});
  	
	loadPointData();
});