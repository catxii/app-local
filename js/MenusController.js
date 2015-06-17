iapp.controller('MenusCtrl', function($scope, $state, $ionicScrollDelegate, iservice) {
	$scope.items = ['0','1'];
	
	 $scope.loadMore = function() {
   		// fetch data here...
  	 };
  	 
	  $scope.onChatScroll = ionic.debounce(function(top) {
	  	console.log('join..:',top)
	    if ($ionicScrollDelegate.getScrollPosition().top <= top) {
	      $scope.loadMore();
	    }
	  }, 500);

    $scope.myPhoto = function(){
    		console.log('f7...');
    		var myPhotoBrowserDark = myApp.photoBrowser({
		    photos : [
		        'http://lorempixel.com/1024/1024/sports/1/',
		        'http://lorempixel.com/1024/1024/sports/2/',
		        'http://lorempixel.com/1024/1024/sports/3/',
		    ],
		    theme: 'dark'
		});
		myPhotoBrowserDark.open();
    }
	$scope.$on('stateChangeSuccess', function() {
		$scope.loadMore();
	});


});