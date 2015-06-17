iapp.factory('ilocal', function() {
	var local = window.localStorage;
	return{
		getLoc : function(key){
			if(key) return local[key];
		},
		setLoc : function(key, value){
			if(key && value) local[key] = value;
		},
		setLocObject : function(key, value){
			if(key && value) local[key] = JSON.stringify(value);
		},
		getLocObject : function(key){
			//return JSON.parse(local[key] || '{}');
			try{
				return JSON.parse(local[key]);
			}
			catch(e){
				return null;
			}
		}
	}
});

//sessionStorage
iapp.factory('isession', function() {
	var local = window.sessionStorage;
	return{
		getSLoc : function(key){
			if(key) return local[key];
		},
		setSLoc : function(key, value){
			if(key && value) local[key] = value;
		},
		setSLocObject : function(key, value){
			if(key && value) local[key] = JSON.stringify(value);
		},
		getSLocObject : function(key){
			try{
				return JSON.parse(local[key]);
			}
			catch(e){
				return null;
			}
		}
	}
});