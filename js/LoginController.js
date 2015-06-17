iapp.controller('LoginCtrl', function($scope, $state,iservice, imsg) {
	
  initTable = function()
  {
  	//判断表是否存在
  	iservice.isExitTable('userInfo',null,function(){
  		var sql = 'create table if not exists userInfo (id text PRIMARY KEY,account text,pwd text,name text, photo text, ltime datetime)';
  		iservice.executeSqlDefault(sql,[],function(){
  			console.log('用户信息本地表创建成功...');
  		}, function(){
  			console.log("用户信息本地表创建失败...");
  		})
  	});
  	//创建联系人本地数据表
  	iservice.isExitTable('contact',null,function(){
  		var sql = 'create table if not exists contact (myId text, userId text, userName text, userImg text, userGroup text, time TIMESTAMP)';
  		iservice.executeSqlDefault(sql,[],function(){
  			console.log('联系人本地表创建成功...');
  		}, function(){
  			console.log("联系人本地表创建失败...");
  		})
  	});
  	//创建私信本地数据表
  	iservice.isExitTable('message',null,function(){
  		var sql = 'create table if not exists message (id text PRIMARY KEY, myId text, senderId text, senderName text, content ntext, time TIMESTAMP, type text, userImg text)';
  		iservice.executeSqlDefault(sql,[],function(){
  			console.log('私信本地表创建成功...');
  		}, function(){
  			console.log("私信本地表创建失败...");
  		})
  	});
  	
  };
  
  initTable();
  queryAllUserInfo = function(callback){
  	var queryAllUser = 'select * from userInfo';
  	iservice.executeSqlDefault(queryAllUser,[],function(tr, result){
		if (result.rows.length != 0) {
			var items = result.rows;
		}
	}, function(){
		console.log("查询失败...");
	})
  };
  
  querySingleUserInfo = function(id,callback,noexitfun)
  {
  	console.log('查询用户信息..');
  	var queryUser = 'select * from userInfo where id = ?';
  	iservice.executeSqlDefault(queryUser,[id],function(tr, result){
		if (result.rows.length != 0) {
			item = result.rows.item(0);
			callback && callback(item);
		}
		else
		{
			noexitfun && noexitfun();
		}
	})
  };
  
  updateUserInfo = function(data){
  	var updateSql = 'update userInfo set account = ?, pwd=?,name = ? ,photo = ?,ltime = ? where id =?';
  	var user = querySingleUserInfo(data.sysid, function(){
  		iservice.executeSqlDefault(updateSql,[data.account,data.password,data.userName,data.image,new Date(),data.sysid],function(tr, result){
  			console.log('更新成功');
		}, function(){
			console.log("更新失败");
		})
  	});
  };
  
  saveUserInfo = function(data){
  	var user = querySingleUserInfo(data.sysid, function(){
  		console.log('有用户信息..');
  		updateUserInfo(data);
  	},function(){
  		console.log('无用户信息...');
  		var saveSql = 'INSERT into userInfo values(?,?,?,?,?,?)'
		iservice.executeSqlDefault(saveSql,[data.sysid,data.account,data.password,data.userName,data.image,new Date()],function(tr, result){
			console.log('保存成功');
		}, function(){
			console.log("保存失败");
		})
  	});
  };
  
  $scope.user ={username:'',password:''};
  
  $scope.signIn = function(user)
  {
  	$state.go("tabs.homeschool");
  	var clientId = '11111';
  	var data = {account:user.username,password:user.password,clientId:clientId};
  	if(!user.username || !user.password)
  	{
  		iservice.alert('温馨提示','用户名或密码不能为空!');
  		return ;
  	}
  	iservice.post({url:'/m/sys/login',data:data,callback:function(data){
		if(!data.success)
		{
			iservice.alert('登陆失败', data.msg, null);
			return;
		}
		
		data.obj.password = user.password;
		data.obj.account = user.username;
		iservice.setUserInfo(data.obj);
		
		var type = data.obj.userType;
		if(type === '4' || type === '0')
		{
			iservice.alert('温馨提示','暂时未对管理开放App权限.');
			return ;
		}
		
		//保存用户信息
		saveUserInfo(data.obj);
		
		//同步服务器私信列表
		imsg.getRemoteMessage();
		
		//同步联系人
		imsg.getRemoteContact();
		
		//跳转
		$state.go("tabs.homeschool");
  	}});
  };
  
   var user = iservice.getUserInfo();
	if(user)
	{
		$scope.user = {username:user.account,password:user.password};
	}
});