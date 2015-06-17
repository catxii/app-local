var iapp = angular.module('test', ['ionic']);

//启动项
iapp.run(function($state,$rootScope, $ionicNavBarDelegate, iservice){
	
});

//路由配置表
iapp.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'login.html',
      controller: 'LoginCtrl'
    })
	.state('tabs.pmdetail', {
		url: "/pm-detail",
		views: {
			'pm-tab': {
				templateUrl: "views/pm-detail.html",
				controller: 'PmDetailCtrl'
			}
		},
		onEnter: function($rootScope) {
			$rootScope.hidetabs = true;
		},
		onExit: function($rootScope) {
			$rootScope.hidetabs = false;
		}
	})
	.state('tabs.pmdetail2', {
		url: "/pm-detail2",
		views: {
			'contact-tab': {
				templateUrl: "views/pm-detail.html",
				controller: 'PmDetailCtrl'
			}
		},
		onEnter: function($rootScope) {
			$rootScope.hidetabs = true;
		},
		onExit: function($rootScope) {
			$rootScope.hidetabs = false;
		}
	})
   .state('tabs', {
      url: "/tab",
      abstract: true,
      templateUrl: "views/tabs.html"
    })
    .state('tabs.bank', {
      url: "/dn-bank",
      views: {
        'homeschool-tab': {
	      templateUrl: "views/dn-bank.html",
	 	  controller: 'VirtueBankCtrl'
	 	 }
       }
    })
    .state('tabs.pm', {
      url: "/pm",
      views: {
        'pm-tab': {
          templateUrl: "views/pm.html",
          controller: 'PmCtrl'
        }
      }
    })
    .state('tabs.contact', {
      url: "/contact",
      views: {
        'contact-tab': {
          templateUrl: "views/contact.html",
          controller:'ContactCtrl'
        }
      }                 
    })
     .state('tabs.homework', {
      url: "/homework",
      views: {
        'homeschool-tab': {
          templateUrl: "views/homework.html",
          controller:'HomeworkCtrl'
        }
      }
    })
     .state('tabs.homework-nr', {
      url: "/homework-nr",
      views: {
        'homeschool-tab': {
          templateUrl: "views/home-work-nr.html",
          controller:'HomeworkCtrl'
        }
      }
    })
     .state('tabs.publish-homework', {
      url: "/publish-homework",
      views: {
        'homeschool-tab': {
          templateUrl: "views/publish-homework.html",
          controller:'HomeworkCtrl'
        }
      }
    })
      .state('tabs.safe-to-school', {
      url: "/safe-to-school",
      views: {
        'homeschool-tab': {
          templateUrl: "views/safe-to-school.html",
          controller:'HomeworkCtrl'
        }
      }
    })
       .state('tabs.find', {
      url: "/find",
      views: {
        'homeschool-tab': {
          templateUrl: "views/find-single.html",
          controller:'HomeworkCtrl'
        }
      }
    })
     .state('tabs.address-list', {
      url: "/address-list",
      views: {
        'homeschool-tab': {
          templateUrl: "views/address-list.html",
          controller:'HomeworkCtrl'
        }
      }
    })
     .state('tabs.group-more', {
      url: "/group-more",
      views: {
        'homeschool-tab': {
          templateUrl: "views/address-list-group-more.html",
          controller:'HomeworkCtrl'
        }
      }
    })
     .state('tabs.group-info', {
      url: "/group-info",
      views: {
        'homeschool-tab': {
          templateUrl: "views/address-list-group-info.html",
          controller:'HomeworkCtrl'
        }
      }
    })
    .state('tabs.address-list-group-list', {
      url: "/address-list-group-list",
      views: {
        'homeschool-tab': {
          templateUrl: "views/address-list-group-list.html",
          controller:'HomeworkCtrl'
        }
      }
    })
    .state('tabs.address-list-group-chose', {
      url: "/address-list-group-chose",
      views: {
        'homeschool-tab': {
          templateUrl: "views/address-list-group-chose.html",
          controller:'HomeworkCtrl'
        }
      }
    })
    .state('tabs.address-list-parent', {
      url: "/address-list-parent",
      views: {
        'homeschool-tab': {
          templateUrl: "views/address-list-parent.html",
          controller:'HomeworkCtrl'
        }
      }
    })
    .state('tabs.address-list-group-info-rename', {
      url: "/address-list-group-info-rename",
      views: {
        'homeschool-tab': {
          templateUrl: "views/address-list-group-info-rename.html",
          controller:'HomeworkCtrl'
        }
      }
    })
    .state('tabs.pm-detail-pic-big', {
      url: "/pm-detail-pic-big",
      views: {
        'homeschool-tab': {
          templateUrl: "views/pm-detail-pic-big.html",
          controller:'HomeworkCtrl'
        }
      }
    })
    .state('tabs.space-info-more', {
      url: "/space-info-more",
      views: {
        'homeschool-tab': {
          templateUrl: "views/address-list-space-info-more.html",
          controller:'HomeworkCtrl'
        }
      }
    })
    .state('tabs.photo-select', {
      url: "/photo-select",
      views: {
        'homeschool-tab': {
          templateUrl: "views/photo-select.html",
          controller:'HomeworkCtrl'
        }
      }
    })
     .state('tabs.weibo', {
      url: "/weibo",
      views: {
        'homeschool-tab': {
          templateUrl: "views/space.html",
          controller:'HomeworkCtrl'
        }
      }
    })
     .state('tabs.weibo-detail', {
      url: "/weibo-detail",
      views: {
        'homeschool-tab': {
          templateUrl: "views/space-detail.html",
          controller:'HomeworkCtrl'
        },
        onEnter: function($rootScope) {
			$rootScope.hidetabs = true;
		},
		onExit: function($rootScope) {
			$rootScope.hidetabs = false;
		}
      }
    })
     .state('tabs.weibo-sendmessage', {
      url: "/weibo-sendmessage",
      views: {
        'homeschool-tab': {
          templateUrl: "views/space-sendmessage.html",
          controller:'HomeworkCtrl'
        }
      }
    })
      .state('tabs.space-photo-detail-one', {
      url: "/space-photo-detail-one",
      views: {
        'homeschool-tab': {
          templateUrl: "views/space-photo-detail-one.html",
          controller:'HomeworkCtrl'
        }
      }
    })
  .state('tabs.exam', {
      url: "/exam",
      views: {
        'homeschool-tab': {
          templateUrl: "views/exam-course-list.html",
          controller:'HomeworkCtrl'
        }
      }
    })
  .state('tabs.exam-type-list', {
      url: "/exam-type-list",
      views: {
        'homeschool-tab': {
          templateUrl: "views/exam-type-list.html",
          controller:'HomeworkCtrl'
        }
      }
    })
  .state('tabs.exam-type-list-more-list', {
      url: "/exam-type-list-more-list",
      views: {
        'homeschool-tab': {
          templateUrl: "views/exam-type-list-more-list.html",
          controller:'HomeworkCtrl'
        }
      }
    })
  .state('tabs.register', {
      url: "/register",
      views: {
        'homeschool-tab': {
          templateUrl: "views/user-register.html",
          controller:'HomeworkCtrl'
        }
      }
    })
    .state('tabs.syllabus', {
      url: "/syllabus",
      views: {
        'homeschool-tab': {
          templateUrl: "views/user-syllabus.html",
          controller:'HomeworkCtrl'
        }
      }
    })
     .state('tabs.story-list', {
      url: "/story-list",
      views: {
        'homeschool-tab': {
          templateUrl: "views/user-syllabus-story-list.html",
          controller:'HomeworkCtrl'
        }
      }
    })
     .state('tabs.user-syllabus-more-page', {
      url: "/tabs.user-syllabus-more-page",
      views: {
        'homeschool-tab': {
          templateUrl: "views/tabs.user-syllabus-more-page.html",
          controller:'HomeworkCtrl'
        }
      }
    })
     .state('tabs.homework-confirm', {
      url: "/homework-confirm",
      views: {
        'homeschool-tab': {
          templateUrl: "views/homework-confirm.html",
          controller:'HomeworkCtrl'
        }
      }
    })
  .state('tabs.homework-confirm-more', {
      url: "/homework-confirm-more",
      views: {
        'homeschool-tab': {
          templateUrl: "views/homework-confirm-more.html",
          controller:'HomeworkCtrl'
        }
      }
    })
   .state('tabs.user-mychildren', {
      url: "/user-mychildren",
      views: {
        'homeschool-tab': {
          templateUrl: "views/user-mychildren.html",
          controller:'HomeworkCtrl'
        }
      }
    })
     .state('tabs.user-mychildren-addnew', {
      url: "/user-mychildren-addnew",
      views: {
        'homeschool-tab': {
          templateUrl: "views/user-mychildren-addnew.html",
          controller:'HomeworkCtrl'
        }
      }
    })
       .state('tabs.user-register-get-password', {
      url: "/user-register-get-password",
      views: {
        'homeschool-tab': {
          templateUrl: "views/user-register-get-password.html",
          controller:'HomeworkCtrl'
        }
      }
    })
   .state('tabs.cellect', {
      url: "/cellect",
      views: {
        'homeschool-tab': {
          templateUrl: "views/cellect-list.html",
          controller:'HomeworkCtrl'
        }
      }
    })
   .state('tabs.exam-test', {
      url: "/exam-test",
      views: {
        'homeschool-tab': {
          templateUrl: "views/exam-test.html",
          controller:'HomeworkCtrl'
        }
      }
    })
    .state('tabs.exam-test-status', {
      url: "/exam-test-status",
      views: {
        'homeschool-tab': {
          templateUrl: "views/exam-test-status.html",
          controller:'HomeworkCtrl'
        }
      }
    })
     .state('tabs.weibo-photo-list', {
      url: "/weibo-photo-list",
      views: {
        'homeschool-tab': {
          templateUrl: "views/space-photo-list.html",
          controller:'HomeworkCtrl'
        }
      }
    })

      .state('tabs.weibo-photo-detail', {
      url: "/weibo-photo-detail",
      views: {
        'homeschool-tab': {
          templateUrl: "views/space-photo-detail.html",
          controller:'HomeworkCtrl'
        }
      }
    })
   .state('tabs.space-photo-book', {
      url: "/space-photo-book",
      views: {
        'homeschool-tab': {
          templateUrl: "views/space-photo-add-photobook.html",
          controller:'HomeworkCtrl'
        }
      }
    })
.state('tabs.space-caller', {
      url: "/space-caller",
      views: {
        'homeschool-tab': {
          templateUrl: "views/space-caller.html",
          controller:'HomeworkCtrl'
        }
      }
    })
     .state('tabs.my-area', {
      url: "/my-area",
      views: {
        'homeschool-tab': {
          templateUrl: "views/myarea.html",
          controller:'HomeworkCtrl'
        }
      }
    })
     .state('tabs.reportcard', {
      url: "/reportcard",
      views: {
        'homeschool-tab': {
          templateUrl: "views/reportcardList.html"
        }
      }
    })
    .state('tabs.results', {
      url: "/results/:id",
      views: {
        'homeschool-tab': {
          templateUrl: "views/results.html",
          controller:'ReportCardCtrl'
        }
      }
    })
    .state('tabs.safeschool', {
      url: "/safeSchool",
      views: {
        'homeschool-tab': {
          templateUrl: "views/map.html",
          controller:'SafeSchoolkCtrl'
        }
      } 
    })
   .state('tabs.rectormail', {
      url: "/rectormail",
      views: {
        'homeschool-tab': {
          templateUrl: "views/rector-mail.html",
          controller:'RectorMailCtrl'
        }
      }
    })
   .state('tabs.notice', {
      url: "/notice/:menuid",
      views: {
        'homeschool-tab': {
          templateUrl: "views/noticeList.html",
          controller:'NoticeCtrl'
        }
      }
    })
    .state('tabs.homeschool', {
      url: "/homeschool",
      views: {
        'homeschool-tab': {
          templateUrl: "views/homeschool.html",
          controller:'MenusCtrl'
        }
      }
    });

	$urlRouterProvider.otherwise("/tab/homeschool");

});
