iapp.controller('PmCtrl', function($state, $rootScope, $scope, imsg) {
    $scope.pmList = [];
    $scope.pmimgurl = imsg.imgurl;

    //  var myId = iservice.getUserInfo().id;

    $scope.toDetail = function(obj) {
        console.log(obj);
        if (!!obj.senderId) {
            $rootScope.pmdetail = obj;
            //      $event.stopPropagation();
            $state.go('tabs.pmdetail');
        }
    }

    $scope.MessageGetLocal = function() {
        imsg.getMessageList(function(result) {
            //          console.log('共有 ' + result.rows.length);
            if (!!result && (result.rows.length > 0)) {
                for (var i = 0; i < result.rows.length; i++) {
                    $scope.pmList.push(result.rows.item(i));
                    if ((i + 1) === result.rows.length) {
                        $state.go('tabs.pm');
                    }
                }
            }
        });
    }
    $scope.MessageGetLocal();
});

iapp.controller('PmDetailCtrl', function($state, $scope, $rootScope, $ionicNavBarDelegate, iservice, imsg) {
    $scope.pmList = []; //聊天信息列表
    $scope.sendContent; //聊天发送内容
    $scope.pmimgurl = imsg.imgurl;
    var senderId;
    try {
        senderId = ($rootScope.pmdetail.senderId) ? $rootScope.pmdetail.senderId : $rootScope.pmdetail.userId; //对方用户Id
    } catch (err) {
        console.log(err);
        return;
    }

    try {
        $scope.senderName = $rootScope.pmdetail.senderName; //对方用户昵称
    } catch (err) {
        console.log(err);
        return;
    }

    imsg.GetRemoteMessageChat(senderId, function() {
        $scope.MessageChatGetLocal();
    });

    //检查私信是否存在
    var isMessageExist = function(id) {
        for (var i = 0; i < $scope.pmList.length; i++) {
            if ($scope.pmList[i].id === id) return true;
        }
        return false;
    }

    //发送私信
    $scope.sendMessage = function() {
        if (!$scope.sendContent) {
            //没输入消息
            iservice.alert('温馨提示', '说点什么吧');
            return;
        }
        var lastId = '';
        try {
        	lastId = $scope.pmList[$scope.pmList.length - 1].id;
        } catch (err) {
	        console.log(err);
	    }
        console.log(lastId);
        imsg.sendMessage(senderId, lastId, $scope.sendContent, function() {
            $scope.sendContent = '';
            console.log('我被调用了！');
            $scope.MessageChatGetLocal();
        });
    }

    //获取本地数据库私信列表
    $scope.MessageChatGetLocal = function() {
        imsg.getMessageById(senderId, function(result) {
//      	console.log('共有 ' + result.rows.length);
            if (!!result && (result.rows.length > 0)) {
                //消息逆序
                for (var i = result.rows.length - 1; i >= 0; i--) {
                    var id = result.rows.item(i).id;
                    console.log(result.rows.item(i).content);
                    //                  $scope.pmList.push(result.rows.item(i));
                    if (!isMessageExist(id)) {
                        $scope.pmList.push(result.rows.item(i));
                    }
                    if ((i + 1) === result.rows.length) {
                        $state.go('tabs.pmdetail');
                    }
                }
            }
            console.log($scope.pmList);
        });
    }
    
    //刷新获取更早私信
    $scope.refreshMessage = function() {
    	//刷新
    	$scope.pmList.unshift({
    		id:"14845c01559a3c0d9cedf64e",
    		MyId:"546ef0055103124bd2f158cc",
    		senderId:"53dce1ef4696f433f2d32b00",
    		senderId:"假的",
    		content:"下拉刷新测试数据",
    		time:1417960949000,
    		type:"S",
    		userImg:""});
//  	console.log('刷完后' + $scope.pmList);	
    	$scope.$broadcast('scroll.refreshComplete');
    	$scope.$apply();
    }

    //  iapp.directive('timeshow',function() {
    //      return {
    //          restrict:   'A',
    //          template:   '<div>{{time}}</div>',
    //          replace:    true,
    //          scope:      {
    //              time:   '=bingdToThis'
    //          }
    ////            link:       function($scope, element, attris) {
    ////                
    ////            }
    //      }
    //  })

   
});

//处理私信时间格式
iapp.filter('timeformat', function() {
    return function(time) {
        var now = new Date();
        var t = new Date(parseInt(time));
        var tH = t.getHours().toString();
        if (tH.length < 2) tH = '0' + tH;
        var tM = t.getMinutes().toString();
        if (tM.length < 2) tM = '0' + tM;
        var rTime = tH + ':' + tM;
        if (now.toLocaleDateString() != t.toLocaleDateString()) {
            var diff = new Date(now.toLocaleDateString()).getTime() - new Date(t.toLocaleDateString()).getTime();
            if (diff == 86400000) {
                rTime = '昨天 ' + rTime;
            } else {
                rTime = t.getFullYear() + '年' + (t.getMonth() + 1) + '月' + t.getDate() + '日 ' + rTime;
            }
        }
        return rTime;
    }
});
