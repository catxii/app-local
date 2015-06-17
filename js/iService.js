iapp.factory('iservice', function($http,$ionicPopup,$ionicLoading,ilocal, isession) {
  //通用web
//var web = 'http://manage.linktrust-edu.com/linktrust';
var web = 'http://172.16.131.235:8080/linktrust';
//var web = 'http://172.16.131.160:8080/linktrust';
  showLoading = function(msg) {
  	if(!msg){
  		$('body').addClass('loadimg');
  	}
    $ionicLoading.show({
//    template:'<img src="img/loading.gif" />'
	  template:msg || '<img src="img/loading.gif"/>'
    });
  };
  hideLoading = function(){
    setInterval(function(){
    	$ionicLoading.hide();
	  	$('body').removeClass('loadimg');
    },300);
  };
  
  toast = function(msg){
  	
  	if(navigator && (/android/gi).test(navigator.appVersion))
  	{
	  	plus.nativeUI.toast(msg);
  	}
  	else
  	{
  		var toast = document.createElement('div');
		toast.classList.add('toast-container');
		toast.innerHTML = '<div class="'+'toast-message'+'">'+msg+'</div>';
		document.body.appendChild(toast);
		setTimeout(function(){
	  		document.body.removeChild(toast);
		},2000);  
  	}
  };
  
  ajax = function(options){
  	
  	//判断options.waiting是否存在
  	if(typeof options.waiting === 'undefined') options.waiting = true;
  	
  	var waiting = options.waiting ? true : false;
  	$.ajax({
			type:options.method,
			url:web + options.url,
			data:options.data,
			async:true,
			timeout:10000,
			beforeSend :function(){
				//if(waiting) showLoading();
			},
			success: function(data){
				options.callback(data);
			},
			error : function(xhr,e,opt)
			{ 
				if(e)
				{
					if(e === 'timeout')
					{
						toast('请求超时,请稍后重试');
					}
					else
					{
						toast("发生网络错误,请稍后重试");
					}
				}
			},
			complete : function(){
				//if(waiting) hideLoading();
			}
			
		});
  };

 return {
 		web: web, //服务器地址
		get: function(options) {
			options.method = 'get';
			ajax(options)
		},
		post: function(options) {
			options.method = 'post';
			ajax(options);
		},
		dbName :'linktrust', //数据库名
		version :  '1.0', //版本信息
		description:'linktrust', //描述信息
		maxSize : 1024 * 1024 * 25, //最大值ֵ
		dbObj : null,
		openDB:function() {
	        try {
	            if (!this.dbObj) {
	                this.dbObj = openDatabase(this.dbName, this.version, this.description, this.maxSize);
	            }
	        } catch (e) {
	            alert("打开数据库出现未知错误： " + e);
	            this.dbObj = null;
	        }
	        return this.dbObj;
	    },
	    getDBconn:function () {
	        this.openDB();
	        return this.dbObj;
	    },
	    executeSqlDefault : function (sqlStr, params, successHandler, errorHandler) {
	        this.openDB();
	        this.dbObj.transaction(function (tx) {
	            tx.executeSql(sqlStr, params, successHandler, errorHandler);
	        }, null, null);
	    },
	    executeSqlTrans : function (fun, successHandler, errorHandler) {
	        this.openDB();
	        this.dbObj.transaction(fun, errorHandler, successHandler);
	    },
	    //修改数据库版本信息
	    changeDBVersion : function (oldVersion, newVersion) {
	        this.dbObj = this.openDB();
	        this.dbObj.changeVersion(oldVersion, newVersion, null, errorFun, null);
	    },
	    //判断某表是否存在:表名、存在回调函数、不存在回调函数
	    isExitTable : function (tableName, exitFun, noexitFun) {
	        this.dbObj = this.openDB();
	        var sql = "select * from sqlite_master where type='table' and name = ?";
	        this.dbObj.transaction(function (tx) {
	            tx.executeSql(sql, [tableName], function (transaction, result) {
	                if (result.rows.length > 0 && exitFun) {
	                    exitFun.call();
	                } else if (result.rows.length <= 0 && noexitFun) {
	                    noexitFun.call();
	                }
	            }, null);
	        });
	    },
	    //删除表数据：表名，删除成功回调函数
	    delTbleData : function (tableName, callBackFun) {
	        this.dbObj = this.openDB();
	        var sql = "delete from ?";
	        this.dbObj.transaction(function (tx) {
	            tx.executeSql(sql, [tableName], callBackFun, null);
	        });
	    },
	    //删除表，删除成功回调函数
	    delTbleData : function (tableName, callBackFun) {
	       this.dbObj = this.openDB();
	        var sql = "drop table ?";
	        this.dbObj.transaction(function (tx) {
	            tx.executeSql(sql, [tableName], callBackFun, null);
	        });
	    },
	    setUserInfo: function(userInfo)
	    {
	    	ilocal.setLocObject('userInfo',userInfo)
	    },
	    getUserInfo : function()
	    {
	    	return ilocal.getLocObject('userInfo');
	    },
	    alert : function(title, content,callback) {
		   var alertPopup = $ionicPopup.alert({
		     title: title,
		     template: content
		   });
		   
		   alertPopup.then(function(res) {
		     callback && callback(res);
		   });
		 },
		showMask :function(msg){
		 	showLoading(msg);
		},
		hideMask : function(){
		 	hideLoading();
		},
		getLoc : function(key){
			return ilocal.getLoc[key];
		},
		setLoc : function(key, value){
			isession.getOb
			ilocal.setLoc(key, value);
		},
		setLocObject : function(key, value){
			 ilocal.setLocObject(key, value);
		},
		getLocObject : function(key){
			return ilocal.getLocObject(key);
		},
		getSLoc : function(key){
			return isession.getSLoc(key);
		},
		setSLoc : function(key, value){
			isession.setSLoc(key, value);
		},
		setSLocObject : function(key, value){
			isession.setSLocObject(key, value);
		},
		getSLocObject : function(key){
			return isession.getSLocObject(key);
		},
		toast: function(msg){
			toast(msg);
		}
	}
});