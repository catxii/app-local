iapp.controller('ReportCardCtrl', function($state, $scope, $stateParams, iservice) {
	var id = $stateParams.id;
	$scope.classroomtestData = [];
	$scope.testData = [];
	//随堂测试
	$scope.initClassroomTest = function() {
		iservice.get({
			url:'/m/ssn/score/quizzlist',
			data:{},
			callback: function(data)
			{
				if(!data.success)
				{
					iservice.alert('获取数据失败', data.msg, null);
					return ;
				}
				if(data)
				{
					$scope.classroomtestData = data.obj;
				}
			}
		});
	};
	
	$scope.initTestData = function() {
		iservice.get({
			url:'/m/ssn/score/scoreList',
			data:{},
			callback: function(data)
			{
				if(!data.success)
				{
					iservice.alert('获取数据失败', data.msg, null);
					return ;
				}
				if(data)
				{
					$scope.testData = data.obj;
				}
			}
		});
	};
	
	$scope.id = id;
	console.log(id === '1');
	
	if(id === '1')
	{
		$scope.initClassroomTest();
	}
	else
	{
		$scope.initTestData();
	}
	
});
