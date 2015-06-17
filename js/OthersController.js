iapp.controller('RectorMailCtrl', function($state, $scope, $ionicModal, iservice, imsg) {
	$scope.rector = {mail:''};
	$scope.sendMail = function(){
		var mail = $scope.rector.mail;
		if(!mail){
			iservice.toast('请先输入些内容吧!');
			return;
		}
		var myId = iservice.getUserInfo().id;
		iservice.post({
			url:'/m/ssn/mailbox/commit',
			data: 
			{
		    	userId: myId,
		        content: mail
		    },
		    callback : function(data){
		    	if (!data.success) 
		    	{
			        iservice.alert('发送失败', data.msg, null);
			        return;
		    	}
		    	$scope.rector.mail = '';
		    	iservice.toast('您的消息已经发送成功了!');
		    }
		});
	}
});

iapp.controller('NoticeCtrl', function($state, $scope,$sce, $stateParams, $ionicModal, iservice) {
	$scope.noticeList = [];
	var menuId = $stateParams.menuid;
	
	$ionicModal.fromTemplateUrl('views/notice-detail.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.modal = modal;
	});

	$scope.$on('$destroy', function() {
		$scope.modal.remove();
	});

	$scope.$on('modal.hidden', function() {});

	$scope.$on('modal.removed', function() {});

	$scope.showNotice = function(notice) {
		$scope.nd = notice;
		$scope.modal.show();
	};
	
	$scope.transferred=function(content){
		return $sce.trustAsHtml(content);
	}

	$scope.closeDetail = function() {
		$scope.modal.hide();
	};
	
	$scope.loadNoticeList = function(){
		
		if(menuId === 'classNotice')
		{
			$scope.title = '班级通知';
			var url = '/m/ssn/classNotice/index';
		}
		else
		{
			$scope.title = '学校通知';
			var url = '/m/ssn/schoolnews/index';
		}
		
		iservice.post({
			url : url,
			data:{},
		    callback : function(data){
		    	if (!data.success) 
		    	{
			        iservice.alert('获取数据失败', data.msg, null);
			        return;
		    	}
		    	$scope.noticeList = data.obj;
		    }
		});
	}
	
	$scope.loadNoticeList();
});

	
