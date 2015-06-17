iapp.controller('VirtueBankCtrl', function($scope, $state, iservice,$ionicActionSheet, $timeout) {

  function showSildeBox(){
		// 设置点到学生状态
	   var hideSheet = $ionicActionSheet.show({
	     buttons: [
	       { text: '<span class="red-color">缺到</span>' },
	       { text: '<span class="blue-color">请假</span>' }
	     ],
//	     destructiveText: 'Delete',
	     titleText: '设置学生的状态',
	     cancelText: '取消',
	     cancel: function() {
	          // add cancel code..
	        },
	     buttonClicked: function(index) {
	       return true;
	     }
	   });
	  }


	 $scope.show = function(){
	 	showSildeBox();
	 }


  buildContent = function(virtueData)
  {
  	if(!virtueData.success)
	{
		iservice.alert('获取数据失败',virtueData.msg, null);
	}
	
  	var virtueObj = virtueData.obj;
  	
	if(virtueObj){
		//总分
		$scope.virtueBank.total = virtueObj.virtuesum;
		//同学名称
		$scope.virtueBank.stuName = virtueObj.stuname;
		$scope.virtueBank.items = virtueObj.virtueNun;
	} 
  };
  
  $scope.loadVirtueBankData = function()
  {
  	
  	$scope.virtueBank = {total:0,stuName:'',items:[]};
  	
	var virtueData = iservice.getSLocObject('virtueData');
	
	if(!virtueData)
	{
	  	iservice.post({url:'/m/ssn/homework/virtue',data:{},callback:function(data){
	  		if(!data) return ;
	  		iservice.setSLocObject('virtueData', data);
			buildContent(data)
	  	}});
	}
	else
	{
		buildContent(virtueData);
	}
  };
  
  $scope.loadVirtueBankData();
});