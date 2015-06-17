iapp.factory('imsg', function(iservice) {
	var myId ;
	
	//我的id
	getMyId = function(){
		if(!myId)
			myId = iservice.getUserInfo().id;
	};
	
	//获取私信长度
	var length = 20;
	
	//获取信息列表
	var getMessageList = function(callback) {
		getMyId();
		var querysql = 'SELECT * FROM (SELECT * FROM message WHERE myId = ? ORDER BY time) GROUP BY senderId ORDER BY time DESC limit 0,?';
//		console.log('myId ' + myId);
//		console.log(length);
		iservice.executeSqlDefault(querysql, [myId, length], function(tr, result) {
			callback && callback(result);
		});
	}
	
	//获取与聊天对象的信息列表
	var getMessageById = function(senderId, callback) {
		getMyId();
		console.log(myId + ' ' + senderId + ' ' + length);
		var querysql = 'SELECT * FROM message WHERE myId = ? and senderId = ? ORDER BY time DESC limit ?,?';
		iservice.executeSqlDefault(querysql, [myId, senderId, 0, length], function(tr, result) {
			callback && callback(result);
		});
	}
	
	//获取最后一条信息的id
	var messageGetLastId = function(callback) {
		getMyId();
		var queryId = 'SELECT id FROM message WHERE myId = ? ORDER BY time DESC limit 0,1';
		iservice.executeSqlDefault(queryId, [myId], function(tr, result) {
			if (result.rows.length != 0) {
				item = result.rows.item(0);
			} else {
				item = {
					id: ''
				};
			}
			callback && callback(item);
		});
	}
	
	//保存信息
	var saveMessage = function(obj) {
		getMyId();
//		console.log(obj);
		var save = queryMessageId(obj.id, function(idExist) {
			if (!idExist) {
				var saveSql = 'INSERT into message values(?,?,?,?,?,?,?,?)'
				iservice.executeSqlDefault(saveSql, [obj.id, myId, obj.receiverid, obj.receiverName, obj.content, obj.time, obj.type, obj.userImg], function(tr, result) {
//					console.log(obj.id + '保存成功');
				}, function() {
					console.log(obj.id + "保存失败");
				});
			}
		});
	}
	
	//发送私信
	var sendMessage = function(sendUserId, lastId, msgCont, callbackFun) {
//		msgCont = encodeURI(encodeURI(msgCont));
		var data = {
			receiverid:	sendUserId,
			content:	msgCont,
			count: 		length,
			pmid: 		lastId
		};
		iservice.post({
			url: '/m/pm/sendMessageAndList',
			data: data,
			callback: function(data) {
				if (!data.success) {
					console.log('私信发送失败');
					return;
				}
				//保存私信信息
				var obj = data.obj;
				for (var i = 0; i < obj.length; i++) {
					saveMessage(data.obj[i]);
				}
				callbackFun && callbackFun();
			}
		});
	}
	//获取最新私信id
	var queryMessageId = function(id, callback) {
		getMyId();
		var querysql = 'select count(id) as num from message where id = ?';
		iservice.executeSqlDefault(querysql, [id], function(tr, result) {
			var idExist = (result.rows.item(0).num === 0) ? false : true;
			callback && callback(idExist);
		})
	};
	
	//同步服务器
	var MessageGetRemote = function() {
		getMyId();
		messageGetLastId(function(item) {
			var data = {
				count: length,
				pmid: item.id
			};
			iservice.post({
				url: '/m/pm/listNew',
				data: data,
				callback: function(data) {
					if (!data.success) {
						console.log('私信列表获取失败');
						return;
					}
					//保存私信信息
					var obj = data.obj;
					for (var i = 0; i < obj.length; i++) {
						saveMessage(data.obj[i]);
					}
				}
			});
		});
	}
	//获取与指定聊天对象信息列表
	var MessageChatGetRemote = function(sendUserId, callback) {
		getMyId();
		var data = {
			receiverid: sendUserId,
			pageSize:	length
		};
		iservice.post({
			url: '/m/pm/listContent',
			data: data,
			callback: function(data) {
				if (!data.success) {
					console.log('私信列表获取失败');
					return;
				}
				//保存私信信息
				var obj = data.obj;
				for (var i = 0; i < obj.length; i++) {
					saveMessage(data.obj[i]);
				}
				callback && callback();
			}
		});
		
	}
	
	//获取联系人ByMyId
	var queryContactByMyId = function(callback) {
		getMyId();
		var querysql = 'SELECT * FROM contact WHERE myId = ? ORDER BY time DESC';
		iservice.executeSqlDefault(querysql, [myId], function(tr, result) {
			 if (result.rows.length != 0) 
                callback && callback(result);
		});
	};
	
	//获取联系人ByMyId
	var hasContactByUserId = function(userId, callback) {
		getMyId();
		console.log(userId);
		var querysql = 'select count(userId) as num from contact where userId = ? and myId = ?';
		iservice.executeSqlDefault(querysql, [userId, myId], function(tr, result) {
     		 callback && callback(result.rows.item(0).num != 0);
		});
	};
	
	//获取联系人ByUserId
	var queryContactByUserId = function(userId, callback) {
		getMyId();
		var querysql = 'select userName, userImg, count(userId) as num from contact where userId = ? and myId = ?';
		iservice.executeSqlDefault(querysql, [userId, myId], function(tr, result) {
			callback && callback(result);
		});
	};
	
	//更新联系人信息
	var updateContact = function(userId, userName, userImg, timestamp){
		getMyId();
		var updateSql = 'update contact set userName = ?,userImg = ?,time = ? where userId =? and myId = ?';
		iservice.executeSqlDefault(updateSql, [userName, myId, timestamp, userId, myId], function(tr, result) {
			callback && callback(result);
		});
	};
	
	//保存联系人
	var saveContact = function(userId, userName, userGroup, userImg) {
		getMyId();
		var timestamp = new Date().getTime();
		queryContactByUserId(userId,function(result){
			var idExist = (result.rows.item(0).num === 0) ? false : true;
			console.log('是否存在联系人:' + idExist);
			if(!idExist){
				var insertSql = 'INSERT into contact values(?,?,?,?,?,?)';
				iservice.executeSqlDefault(insertSql, [myId, userId, userName, userImg, userGroup, timestamp], function(tr, result) {
					console.log('保存成功');
				});
			}
			else
			{
				if (result.rows.item(0).userName != userName || result.rows.item(0).userImg != userImg)
					updateContact(userId, userName, userImg, timestamp);
			}
		});
	};
		
	//获取远程联系人信息
	var getRemoteContact = function() {
		getMyId();
		var url = "/m/pm/contact/listContact";
		iservice.get({
			url: url,
			data: {},
			callback: function(data) 
			{
				if(!data.success)
				{
					iservice.alert('获取通讯录失败', data.msg, null);				
					return;
				}
				else
				{
					var contact = data.obj;
					for (var i in contact) 
						var userGroup = ''; //联系人分组信息预留变量，等服务器升级提供
						saveContact(contact[i].receiverid, contact[i].receiverName, userGroup, contact[i].userImg);
				}
			}
		});
	};	

return {
	imsgLength: length,
	imgurl: iservice.web + '/m/pm/findUserimg?userid=',
	getRemoteMessage: function() {
		MessageGetRemote();
	},
	GetRemoteMessageChat: function (senderId,callback) {
		MessageChatGetRemote(senderId,callback);
	},
	saveMessage: function(myId, obj) {
		saveMessage(myId, obj);
	},
	getMessageList: function(callback) {
		getMessageList(callback);
	},
	getMessageById: function(senderId, callback) {
		getMessageById(senderId, callback);
	},
	getRemoteContact: function(){
		getRemoteContact();
	},
	sendMessage: function(sendUserId, lastId, msgCont, callback) {
		sendMessage(sendUserId, lastId, msgCont, callback);
	},
	queryContact : function(callback){
		queryContactByMyId(callback);
	},
	hasContactByUserId : function(userId, callback){
		hasContactByUserId(userId, callback);
	},
	saveContact : function(userId, userName, userImg){
		saveContact(userId, userName, userImg);
	}
}
});