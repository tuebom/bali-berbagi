// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngStorage', 'starter.controllers', 'starter.services'])

.run(function($rootScope, $ionicPlatform) {
  
	$ionicPlatform.ready(function() {
	
		/*if( ionic.Platform.isAndroid() )  { 
			 admobid = { // for Android
					banner: 'ca-app-pub-xxx/xxx' // Change this to your Ad Unit Id for banner...
			 };

			 if(AdMob) 
					AdMob.createBanner( {
						 adId:admobid.banner, 
						 position:AdMob.AD_POSITION.BOTTOM_CENTER, 
						 autoShow:true
					} );
		}*/

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });

  $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
    $rootScope.token = current.$route.token;
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $compileProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js

    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|blob|content|ms-appx|x-wmapp0):|data:image\/|img\//);
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|ghttps?|ms-appx|x-wmapp0):/);
    
    $ionicConfigProvider.scrolling.jsScrolling(ionic.Platform.isIOS());

	$stateProvider

	.state('home', {
		url: "/home",
		templateUrl: "templates/home.html",
		controller: 'HomeCtrl'
	})
	.state('register', {
		url: '/register',
		templateUrl: 'templates/register.html',
		controller: 'RegisterCtrl'
	})
	.state('signin', {
		url: '/sign-in',
		templateUrl: 'templates/sign-in.html',
		controller: 'SignInCtrl'
	})

	// setup an abstract state for the tabs directive
  .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:

	.state('tab.dash', {
		url: '/dash',
		views: {
		  'tab-dash': {
			templateUrl: 'templates/tab-chst.html', /*dash*/
			controller: 'CekHistoriCtrl' /*'DashCtrl'*/
		  }
		}
	})
	.state('tab.chats', {
		url: '/services',
		views: {
			'tab-services': {
				templateUrl: 'templates/tab-chats.html',
				controller: 'ChatsCtrl'
			}
		}
	})
	.state('tab.svc-detail', {
		url: '/services/:opr/:svcId',
		views: {
			'tab-services': {
				templateUrl: 'templates/svc-detail.html',
				controller: 'SvcDetailCtrl'
			}
		}
	})
	.state('tab.tool', {
		url: '/tool',
		views: {
		  'tab-tool': {
			templateUrl: 'templates/tab-tool.html',
			controller: 'ToolCtrl'
		  }
		}
	})
	.state('tab.cek-harga', {
		url: '/tool',
		views: {
			'tab-tool': {
				templateUrl: 'templates/tab-chrg.html',
				controller: 'CekHargaCtrl'
			}
		}
	})
	// .state('tab.cek-histori', {
		// url: '/tool',
		// views: {
			// 'tab-tool': {
				// templateUrl: 'templates/tab-chst.html',
				// controller: 'CekHistoriCtrl'
			// }
		// }
	// })
	// .state('tab.setup-harga', {
		// url: '/tool',
		// views: {
			// 'tab-tool': {
				// templateUrl: 'templates/tab-sh.html',
				// controller: 'SetupHargaCtrl'
			// }
		// }
	// })
	.state('tab.item-detail', {
		url: '/tool/:opr/:svcId',
		views: {
			'tab-tool': {
				templateUrl: 'templates/hrg-detail.html',
				controller: 'ItemDetailCtrl'
			}
		}
	});

  // if none of the above states are matched, use this as the fallback
//  $urlRouterProvider.otherwise('/register');
        
    $urlRouterProvider.otherwise(function ($injector, $location) {
        var $state = $injector.get("$state");
        $state.go("home");
    });

});
