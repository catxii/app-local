iapp.controller('ContactCtrl', function($state, $rootScope, $scope, $ionicModal, iservice, imsg) {
	$scope.contactList = [];
	$scope.findContactList = [];
	$scope.userName = '';
	$scope.imageUrl = imsg.imgurl;
	
	$ionicModal.fromTemplateUrl('views/addContact.html', {
	    scope: $scope,
	    animation: 'slide-in-up'
	 }).then(function(modal) {
	    $scope.modal = modal;
	 });
	  
	  $scope.$on('$destroy', function() {
	    $scope.modal.remove();
	  });
	  
	  $scope.$on('modal.hidden', function() {
	  });
	  
	  $scope.$on('modal.removed', function() {
	  });	  
	  
	$scope.loadLocalContact = function(){
		imsg.queryContact(function(result){
			 if (result) {
		        for (var j = 0; j < result.rows.length; j++) {
		            $scope.contactList.push(result.rows.item(j));
		            if((j+1) === result.rows.length)
		            	$state.go('tabs.contact')
		        }
		    }
		});
	};
	
	$scope.toDetail = function(obj) {
		obj.sendId = obj.userId;
		obj.senderName = obj.userName;
		obj.id = obj.myId;
		$rootScope.pmdetail = obj;
    	$state.go('tabs.pmdetail2');
    }
	
	$scope.addContactPanelShow = function(){
	    $scope.modal.show();
	};
	
	$scope.addContactPanelClose = function(){
		 $scope.modal.hide();
	};
	
	$scope.addContact = function(contact) {
		imsg.hasContactByUserId(contact.id, function(flag){
			if(flag)
			{
				iservice.toast('该联系人已存在，无需添加!');
				contact.flag = true;
			}
			else
			{
				iservice.post({
					url:'/m/pm/contact/batchAdd',
					data:
					{
						receiverids: contact.id,
				    	groupid: ''
					},
					callback: function(data){
						if (!data.success) 
						{
			                //隐藏等待窗口
			                iservice.alert('添加失败！', data.msg, null);
			                return;
		           		}
						imsg.saveContact(contact.id, contact.userName, contact.image);
						iservice.toast('添加成功');
						contact.flag = true;
						$scope.contactList.push({id:contact.id,userName:contact.userName,userImg:contact.image});
					}
				});
			}
		});
		
	}
	
	$scope.findContact = function(userName){
		console.log(userName);
		if(typeof userName === 'undefined' || !userName)
			return ;
		iservice.post({
			url:'/m/pm/contact/userlist',
			data:{name:userName},
			callback: function(data){
				if (!data.success) 
				{
	                //隐藏等待窗口
	                iservice.alert('查找失败！', data.msg, null);
	                return;
           		}
				$scope.findContactList = data.obj;
			}
		});
	};
	
	
	$scope.loadLocalContact();
	
});