
iapp.controller('HomeworkCtrl', function($state, $scope, $ionicModal, $sce, iservice) {
	$scope.homeworkList = [];
	$scope.bgIndex = 0;
	$ionicModal.fromTemplateUrl('views/home-work-nr.html', {
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

	$scope.showDetail = function(homework) {
		$scope.hd = homework;
		$scope.modal.show();
	};
	var bg = ['orange-bg','positive-bg','green-bg','calm-bg']
	
	$scope.myColor = function(){
		var j = 0 ;
		var len = $scope.homeworkList.length;
		for(var i = 0 ; i < len ; i++){
			if(j > 3) j = 0 ;
			
			$scope.homeworkList[i].bgColor = bg[j];
			
			j++;
		}
	}
	
	$scope.transferred=function(content){
		return $sce.trustAsHtml(content);
	}

	$scope.closeDetail = function() {
		$scope.modal.hide();
	};
    var data = {title:'aaaa',subData:[{title:'111111',score:'120'},{title:'22222222',score:'120'}],cls:''};
    var data2 = {title:'bbbb',subData:[{title:'111111',score:'120'},{title:'22222222',score:'120'}],cls:''};
    $scope.listData = [data,data2];
	$scope.dsPanel = function(dt){
		dt.cls  = !dt.cls ? 'open' : '';
	}
	
	$scope.dsPanelAll = function()
	{
		for(key in $scope.listData){
			$scope.listData[key].cls = '';
		}
	}
	
	$scope.loadHomeWork = function() {

		iservice.get({
			url: '/m/ssn/homework/index',
			data: {},
			callback: function(data) {
				if (!data.success) {
					iservice.alert('获取数据失败', data.msg, null);
					return;
				}
				if (data.obj == false) return;
				$scope.homeworkList = data.obj;
				$scope.myColor();
			}
		});
	};
	$scope.loadHomeWork();
	
	$scope.stepFun = function(){
		$("#step1_button").click(function(){
			$("#step-1").addClass("bounceOutLeft animated").hide();
			$("#step-2").show().addClass("bounceInRight animated");
			$(".step-ul li").eq(1).addClass("complete");
		});
		$("#step2_button").click(function(){
			$("#step-2").addClass("bounceOutLeft animated").hide();
			$("#step-3").show().addClass("bounceInRight animated");
			$(".step-ul li").eq(2).addClass("complete");
		});
	};
	$scope.stepFun();

	$scope.setImgWidth =function(){
		var phoneWidth = $(window).width();
		var padding = 5;
		var imgWidthNum = Math.floor((phoneWidth - 20)/6);
		$(".pic-list-small li").css("width",imgWidthNum);
	};
	$scope.setImgWidth();

	// $scope.photoSelectWidth =function(){
		
	// 	var imgSrc = ["img/userface1.jpg","img/userface2.jpg","img/userface1.jpg"];
	// 	var total = imgSrc.length; //本地图片的数量
	// 	var phoneWidth = $(window).width();
	// 	var padding = 1;
	// 	var imgWidthNum = Math.floor((phoneWidth)/4);
	// 	var PhotoTmp = "";
	// 	var selectISpanHeight = $(".icon-camera").height() + $(".camera-name").height();
	// 	var selectButtonPaddingTop = Math.floor(imgWidthNum/2-selectISpanHeight/2);
	// 	for (var i =0; i <total; i++) {
			
	// 		PhotoTmp += "<li style='width:"+imgWidthNum+"px;height:"+imgWidthNum+"px;padding:"+padding+"px'><label class='checkbox'><input type='checkbox'></label><canvas id='canvas"+i+"' class='photo-canvas' ></canvas></li>"
	// 		$(".photograph-button").css({"padding-top":selectButtonPaddingTop,"width":imgWidthNum,"height":imgWidthNum});
	// 		var imgObj = new Image();
	// 		imgObj.index = i;
	// 		imgObj.onload = function(){
	// 			var cvs = $("#canvas"+this.index)[0].getContext('2d');
	// 			cvs.width = imgWidthNum;
	// 			cvs.height = imgWidthNum;
	// 			cvs.drawImage(this,0,0); //在这里设置canvas图片的路径
	// 		}
	// 		imgObj.src = imgSrc[i]; //定义canvas图片的路径
			
	// 	};
	// 	$(".photo-select-list").append(PhotoTmp);
		
	// };
	// $scope.photoSelectWidth();

	$scope.listAccordion = function(){
			$(".list-accordion").on("click",".list-title",function(){
				var itemParent = $(this).parent();
				if (itemParent.hasClass("active")) {
					itemParent.removeClass("active");
				}else{
					itemParent.addClass("active");
				}
				
			});
	};
	$scope.listAccordion();

	 //照片放大
    $scope.picLightBox = function(picId){
    	var canvasObj = $("#"+picId);
    	var smallImgSrc = canvasObj.attr("data-src-s");
    	var bigImgSrc = canvasObj.attr("data-src-b");
    	var img = new Image();

    	img.src= smallImgSrc;
    	img.onload = function(){
    		var cxt = document.getElementById(picId).getContext("2d");
    		cxt.drawImage(img,0,0,canvasObj.width(),canvasObj.height());
    	}

    	var bigPicTmp = "<div class='lightbox' id='lightbox' style='background-image:url("+bigImgSrc+")'>123</div>";
    	$(canvasObj).click(function(){
    		if (!$(".lightbox").length>0) {
    			$("body").append(bigPicTmp);
    		};
    		$("#lightbox").click(function(){
	    		$(this).parent().find(".lightbox").remove();
	    	});
    	});

    	
    }
    $scope.picLightBox("canvas1");
    $scope.picLightBox("canvas2");
    $scope.picLightBox("canvas3");
    $scope.picLightBox("canvas4");

    $scope.photo_loading = function(ele){
    	var thisPhoto = $("."+ele);
    	var tml = "<div class='block-bg' style='bottom:0;'></div><i class='number'>100%</i>";
    	thisPhoto.append(tml);
    	var progressBar = "";
		var i = 0;
		function bottomCSS(){
			$(".block-bg").css("bottom",i+"%");
			i = i+10;
		}
		setInterval(bottomCSS,1000)
    }
    $scope.photo_loading("photo_loading");

    $scope.buttonSwipesbtn = function(){
    	$(".button-swipes-button").click(function(){
    		var parent = $(this).parent();
    		if ( !parent.hasClass("active") ) {
    			parent.addClass("active").removeClass("hidden");
    		}else{
    			parent.addClass("hidden").removeClass("active");
    		}
    		
    	});
    }
    $scope.buttonSwipesbtn();

});