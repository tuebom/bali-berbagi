angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope, $state, $ionicHistory, $ionicPlatform, $localStorage, $ionicPopup) {
  
	$ionicPlatform.ready(function() {
		
		var push = PushNotification.init({
				"android": {
						"senderID": "597497239727"
				},
				"browser": {
					pushServiceURL: 'http://push.api.phonegap.com/v1/push'
				},
				"ios": {
						"sound": true,
						"vibration": true,
						"badge": true
				},
				"windows": {}
		});

		push.on('registration', function(data) {
				//alert(data.registrationId);

				var oldRegId = $localStorage.gcmid;
				
				if (oldRegId !== data.registrationId) {
						
						// Save new registration ID
						$localStorage.gcmid = data.registrationId;
						
						$ionicPopup.alert({
							title: 'Bali Berbagi',
							template: 'Perangkat berhasil diregistrasi.'
						});
						// Post registrationId to your app server as the value has changed
				}
		});

		push.on('error', function(e) {
				console.log("push error = " + e.message);
		});

		push.on('notification', function(data) {
				
				$ionicPopup.alert({
					title: 'Bali Berbagi',
					template: data.message
				});
		});
  })
 
	//$ionicPlatform.onHardwareBackButton(function() {
        //ionic.Platform.exitApp();
	//});
   
})

.controller('RegisterCtrl', function($scope, $state, $localStorage, $ionicPopup, $ionicPlatform, $ionicHistory, Data) {
  
	$scope.user = {
		nama: '',
		kota: '',
		nohp: '',
		gcmid: ''
	};
  
	$ionicPlatform.ready(function() {
	
		var push = PushNotification.init({
				"android": {
						"senderID": "597497239727"
				},
				"browser": {
					pushServiceURL: 'http://push.api.phonegap.com/v1/push'
				},
				"ios": {
						"sound": true,
						"vibration": true,
						"badge": true
				},
				"windows": {}
		});

		/*push.on('registration', function(data) {

				var oldRegId = $localStorage.gcmid;
				if (oldRegId !== data.registrationId) {
						
						// Save new registration ID
						$localStorage.gcmid = data.registrationId;
						$scope.user.gcmid = data.registrationId;
						
						$ionicPopup.alert({
							title: 'Bali Berbagi',
							template: data.registrationId
							//cssClass: 'animated bounceInDown'
						});
						// Post registrationId to your app server as the value has changed
				}
		});*/

		/*push.on('error', function(e) {
			console.log("push error = " + e.message);
		});*/

		push.on('notification', function(data) {
				
				$ionicPopup.alert({
					title: 'Bali Berbagi',
					template: data.message
				});
		});
  })
 
	$scope.register = function(user) {

		Data.post('mobile/register', {
			nama: user.nama,
			kota: user.kota,
			nohp: user.nohp,
			gcmid: user.gcmid
		}).then(function (results) {
		
			if (results.status == "success") {
				
				$ionicPopup.alert({
					title: 'Bali Berbagi',
					template: results.message
				});

				$ionicHistory.nextViewOptions({
					disableBack: true
				});
				
				$localStorage.mbrid = results.tmbrid;
				$localStorage.nohp = user.nohp;
				$localStorage.gcmid = user.gcmid;
				
				$state.go('signin', {}, {location: 'replace'});
			}
			else
			{
				$ionicPopup.alert({
					title: 'Bali Berbagi',
					template: results.message
				});
			}
		});
  };
})

.controller('SignInCtrl', function($scope, $state, $stateParams, $localStorage, $ionicPopup, $ionicLoading, $ionicHistory, Data) {

  $scope.user = {
	pin: '',
	mbrid: $localStorage.mbrid,
	nohp: $localStorage.nohp,
	gcmid: $localStorage.gcmid
  };
  
  $scope.show = function() {
    $ionicLoading.show({
      template: '<ion-spinner></ion-spinner></p>'
    });
  };

  $scope.hide = function(){
    $ionicLoading.hide();
  };

  $scope.$on('$ionicView.enter', function(e) {
	$scope.user.pin = '';
  });
  
  $scope.signIn = function(user) {
    
	$scope.show($ionicLoading);
	
	Data.post('mobile/login', {
		mbrid: user.mbrid,
		nohp: user.nohp,
		pin: user.pin,
		gcmid: user.gcmid
	}).then(function (results) {
		
		//Data.toast(results);
		
		if (results.status == "success") {
		
			$scope.hide($ionicLoading);
			$localStorage.mbrid = user.mbrid;
			$localStorage.nohp = user.nohp;
			$localStorage.token = results.token;
			// console.log('token: ', results.token);
			
			//***
			$ionicHistory.clearHistory();
			$ionicHistory.currentView($ionicHistory.backView());
			
			$ionicHistory.nextViewOptions({
				disableBack: true
			});
				
			$state.go('tab.chats', {}, {location: 'replace'});
		}
		else
		{
			$scope.hide($ionicLoading);			
			$ionicPopup.alert({
				title: 'Bali Berbagi',
				template: results.message
			});
		}
	});
  };  
})

.controller('DashCtrl', function($scope, $stateParams, $localStorage, $ionicPlatform, $ionicHistory, Data) {

  $scope.$on('$ionicView.enter', function(e) {

    $scope.token = $localStorage.token;
    $scope.saldo = 0;
    $scope.poin = 0;

    Data.get( 'cur_bonus?token=' + $scope.token, {
    }).then(function (results) {
      
      // console.log(results);
      // if (results.status == "success") {
      
        $scope.saldo = results.saldo;
        $scope.poin = results.poin;
      // }
    });
  });
	
	$ionicPlatform.ready(function() {

		var push = PushNotification.init({
				"android": {
						"senderID": "597497239727"
				},
				"browser": {
					pushServiceURL: 'http://push.api.phonegap.com/v1/push'
				},
				"ios": {
						"sound": true,
						"vibration": true,
						"badge": true
				},
				"windows": {}
		});

		/*push.on('registration', function(data) {

				var oldRegId = $localStorage.gcmid;
				if (oldRegId !== data.registrationId) {
						// Save new registration ID
						$localStorage.gcmid = data.registrationId;
						// Post registrationId to your app server as the value has changed
				}
		});*/

		push.on('error', function(e) {
				console.log("push error = " + e.message);
		});

		push.on('notification', function(data) {
				
				navigator.notification.alert(
						data.message,         // message
						null,                 // callback
						data.title,           // title
						'OK'                  // buttonName
				);
		});

	});

	$ionicPlatform.onHardwareBackButton(function() {
        if($state.current.name == 'tab.dash') {
			Data.get('mobile/logout').then(function (results) {
			});
		}
	});
	
	// $scope.clearHistory = function() {
		//$ionicHistory.clearCache();
		//$ionicHistory.clearHistory();
		//$ionicHistory.currentView($ionicHistory.backView());
	// }
})

.controller('ChatsCtrl', function($scope, $state, $localStorage, $ionicHistory, $ionicPlatform, Products, Data) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
	$scope.operators = Products.all();

  $scope.$on('$ionicView.enter', function(e) {

    $scope.token = $localStorage.token;
    $scope.saldo = 0;
    $scope.poin = 0;

    Data.get( 'cur_bonus?token=' + $scope.token, {
    }).then(function (results) {
      
      // console.log(results);
      // if (results.status == "success") {
      
        $scope.saldo = results.saldo;
        $scope.poin = results.poin;
      // }
    });
  });
	
	$ionicPlatform.ready(function() {

		var push = PushNotification.init({
				"android": {
						"senderID": "597497239727"
				},
				"browser": {
					pushServiceURL: 'http://push.api.phonegap.com/v1/push'
				},
				"ios": {
						"sound": true,
						"vibration": true,
						"badge": true
				},
				"windows": {}
		});

		/*push.on('registration', function(data) {

				var oldRegId = $localStorage.gcmid;
				if (oldRegId !== data.registrationId) {
						// Save new registration ID
						$localStorage.gcmid = data.registrationId;
						// Post registrationId to your app server as the value has changed
				}
		});*/

		push.on('error', function(e) {
				console.log("push error = " + e.message);
		});

		push.on('notification', function(data) {
				
				navigator.notification.alert(
						data.message,         // message
						null,                 // callback
						data.title,           // title
						'OK'                  // buttonName
				);
		});

	});
       
	$scope.openItem = function(opr) {
		$state.go("tab.svc-detail", { opr: opr.kode, svcId: opr.id }); //'app.item'
	}

	$ionicPlatform.onHardwareBackButton(function() {
    if($state.current.name == 'tab.chats') {
			Data.get('mobile/logout').then(function (results) {
			});
		}
	});
	
	// $scope.clearHistory = function() {
		//$ionicHistory.clearCache();
		//$ionicHistory.clearHistory();
		//$ionicHistory.currentView($ionicHistory.backView());
	// }
})

.controller('SvcDetailCtrl', function($scope, $state, $localStorage, $ionicHistory, $ionicModal, $ionicPopup, $stateParams, Products, Data) {

  $scope.services = Products.get($stateParams.svcId);
  $scope.submitTitle = "Input Nomor Handphone";

  // Form data for the submit modal
  $scope.trxData = {};
  $scope.trxPLN = false;

	if ($stateParams.opr == 'PLN') {
		$scope.trxPLN = true;
		$scope.submitTitle = "Input Nomor Pelanggan";
	}

  $scope.invalid = function() {
    return this.form.$invalid;
  };

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/submit.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeTrx = function() {
    $scope.modal.hide();
	$scope.trxData = {};

	$ionicHistory.nextViewOptions({
		disableBack: true
	});
	$state.go("tab.chats");
  };

  // Open the login modal
  $scope.inputNumber = function(opr) {
	
	$scope.trxData.token = $localStorage.token;
	$scope.trxData.kode = opr.kode;
	$scope.trxData.cmdPost = opr.cmd;
    
	$scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doProsesTrx = function(data) {

	Data.post( data.cmdPost, {
		kode: data.kode,
		nopel: data.nopel,
		tujuan: data.tujuan,
		pin: data.pin,
		token: data.token
	}).then(function (results) {
		
		if (results.status == "success") {
		
			$scope.closeTrx();
			$scope.trxData = {};

			$ionicHistory.nextViewOptions({
				disableBack: true
				//historyRoot: true
			});

			$state.go("tab.chats");
		}
		else
		{
			$ionicPopup.alert({
				title: 'Bali Berbagi',
				template: results.message
			});
		}
	});
  };
})

.controller('ToolCtrl', function($scope, $state, $ionicModal, $ionicPopup, $localStorage, $ionicPlatform, Data) {
	
	$scope.context = 0;
  
	$ionicPlatform.ready(function() {

		var push = PushNotification.init({
				"android": {
						"senderID": "597497239727"
				},
				"browser": {
					pushServiceURL: 'http://push.api.phonegap.com/v1/push'
				},
				"ios": {
						"sound": true,
						"vibration": true,
						"badge": true
				},
				"windows": {}
		});

		/*push.on('registration', function(data) {

				var oldRegId = $localStorage.gcmid;
				if (oldRegId !== data.registrationId) {
						// Save new registration ID
						$localStorage.gcmid = data.registrationId;
						// Post registrationId to your app server as the value has changed
				}
		});*/

		push.on('error', function(e) {
				console.log("push error = " + e.message);
		});

		push.on('notification', function(data) {

				navigator.notification.alert(
						data.message,         // message
						null,                 // callback
						data.title,           // title
						'OK'                  // buttonName
				);
		});

	});

  $scope.$on('$ionicView.enter', function(e) {

    /*$ionicHistory.nextViewOptions({
      disableBack: true
      //historyRoot: true
    });*/
          
    // Form data for the submit modal
    $scope.trxData = {};
  });

  $scope.invalid = function() {
    return this.form.$invalid;
  };

	$ionicPlatform.onHardwareBackButton(function() {
    if($state.current.name == 'tab.tool') {
      switch($scope.context) {
          case 1:
              closeDF();
              break;
          case 2:
              closeTS();
              break;
          case 3:
              closeTB();
              break;
          case 4:
              closeTB();
              break;
          case 5:
              closeKP();
              break;
      }
    }
	});

  // Pendaftaran member
  $ionicModal.fromTemplateUrl('templates/daftar.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.mdlDF = modal;
  });

  $scope.daftarMember = function() {
    $scope.trxData.token = $localStorage.token;
    $scope.context = 1;
    $scope.mdlDF.show();
  };

  $scope.closeDF = function() {
    $scope.mdlDF.hide();
	$state.go("tab.tool");
  };

  $scope.doRegister = function(data) {

	Data.post('daftar', {
		reffid: $localStorage.mbrid,
		nama: data.nama,
		kota: data.kota,
		nohp: data.nohp,
		token: data.token
	}).then(function (results) {
		
		if (results.status == "success") {
		
			$ionicPopup.alert({
				title: 'Bali Berbagi',
				template: results.message
			});
			
			$scope.closeDF();
			$scope.trxData = {};

			// $ionicHistory.nextViewOptions({
				// disableBack: true
				// historyRoot: true
			// });

			$state.go("tab.tool");
		}
		else
		{
			$ionicPopup.alert({
				title: 'Bali Berbagi',
				template: results.message
			});
		}
	});
  };

	// Transfer saldo
  $ionicModal.fromTemplateUrl('templates/tsaldo.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.mdlTS = modal;
  });

  $scope.transferSaldo = function() {
    $scope.trxData.token = $localStorage.token;
    $scope.context = 2;
    $scope.mdlTS.show();
  };

  $scope.closeTS = function() {
    $scope.mdlTS.hide();
    $state.go("tab.tool");
  };

  $scope.doTransferSld = function(data) {
	
    Data.post('tsaldo', {
      tujuan: data.tujuan,
      nominal: data.nominal,
      pin: data.pin,
      token: data.token
    }).then(function (results) {
		
		if (results.status == "success") {
		
			$scope.closeTS();
			$scope.trxData = {};

			// $ionicHistory.nextViewOptions({
				// disableBack: true
				// historyRoot: true
			// });

			$state.go("tab.tool");
		}
		else
		{
			$ionicPopup.alert({
				title: 'Bali Berbagi',
				template: results.message
			});
		}
	});
  };

	// Transfer bonus
  $ionicModal.fromTemplateUrl('templates/tbonus.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.mdlTB = modal;
  });

  $scope.transferBonus = function() {
    $scope.trxData.token = $localStorage.token;
    $scope.context = 3;
    $scope.mdlTB.show();
  };

  $scope.closeTB = function() {
    $scope.mdlTB.hide();
	$state.go("tab.tool");
  };

  $scope.doTransferBns = function(data) {

	Data.post('tbonus', {
		nominal: data.nominal,
		pin: data.pin,
		token: data.token
	}).then(function (results) {
		
		if (results.status == "success") {
		
			$scope.closeTB();
			$scope.trxData = {};

			// $ionicHistory.nextViewOptions({
				// disableBack: true
				//historyRoot: true
			// });

			$state.go("tab.tool");
		}
		else
		{
			$ionicPopup.alert({
				title: 'Bali Berbagi',
				template: results.message
			});
		}
	});
  };

  $scope.cekBonus = function() {

    var token = $localStorage.token;
    
    Data.get('cek_bonus?token='+token, {
    }).then(function (results) {
      
      if (results.status == "success") {
        /*$ionicHistory.nextViewOptions({
          disableBack: true
          //historyRoot: true
        });*/

        $state.go("tab.tool");
      }
      else
      {
        $ionicPopup.alert({
          title: 'Bali Berbagi',
          template: results.message
        });
      }
    });
  };

  $scope.openCH = function() {
    $state.go("tab.cek-harga");
  };

  $scope.openCHT = function() {
    $state.go("tab.cek-histori");
  };

  // $scope.openSH = function() {
	// $state.go("tab.setup-harga");
  // };

  // Ganti PIN
  $ionicModal.fromTemplateUrl('templates/gantipin.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.mdlGP = modal;
  });

  $scope.gantiPIN = function() {
    $scope.trxData.token = $localStorage.token;
    $scope.context = 4;
    $scope.mdlGP.show();
  };

  $scope.closeGP = function() {
    $scope.mdlGP.hide();
    $state.go("tab.tool");
  };

  $scope.doGantiPIN = function(data) {
    //console.log('Change pin data: ', data);

    Data.post('ganti_pin', {
      pinlama: data.pinlama,
      pinbaru: data.pinbaru,
      token: data.token
    }).then(function (results) {
      
      if (results.status == "success") {
        
        $scope.closeGP();
        $scope.trxData = {};

        // $ionicHistory.nextViewOptions({
          // disableBack: true
          //historyRoot: true
        // });

        $state.go("tab.tool");
      }
      else
      {
        $ionicPopup.alert({
          title: 'Bali Berbagi',
          template: results.message
        });
      }
    });
  };

	// Info / Komplain
  $ionicModal.fromTemplateUrl('templates/komplain.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.mdlKP = modal;
  });

  $scope.sendInfo = function() {
    $scope.trxData.token = $localStorage.token;
    $scope.context = 5;
    $scope.mdlKP.show();
  };

  $scope.closeKP = function() {
    $scope.mdlKP.hide();
    $state.go("tab.tool");
  };

  $scope.doSendInfo = function(data) {

    Data.post('komplain', {
      info: data.info,
      token: data.token
    }).then(function (results) {
      
      if (results.status == "success") {
        
        $scope.closeKP();
        $scope.trxData = {};

        // $ionicHistory.nextViewOptions({
          // disableBack: true
          //historyRoot: true
        // });

        $state.go("tab.tool");
      }
      else
      {
        $ionicPopup.alert({
          title: 'Bali Berbagi',
          template: results.message
        });
      }
    });
  };
	
	// $scope.clearHistory = function() {
		//$ionicHistory.clearCache();
		//$ionicHistory.clearHistory();
		//$ionicHistory.currentView($ionicHistory.backView());
	// }
})

.controller('CekHargaCtrl', function($scope, $state, $localStorage, Products) {
  
	$scope.operators = Products.all();
	$scope.token = $localStorage.token;

	$scope.cekHarga = function(opr){
		$state.go("tab.item-detail", { opr: opr.kode, svcId: opr.id });
	}

})

.controller('CekHistoriCtrl', function($scope, $ionicPopup, $ionicLoading, $localStorage, Products, Data) {
  
  $scope.show = function() {
    $ionicLoading.show({
      template: '<ion-spinner></ion-spinner><p>Loading...</p>'
    });
  };

  $scope.hide = function(){
    $ionicLoading.hide();
  };

  $scope.$on('$ionicView.enter', function(e) {

    $scope.token = $localStorage.token;
    $scope.data = {};

		$scope.show($ionicLoading);
    
		Data.get('histori2?token=' + $scope.token, {
		}).then(function (results) {
			
			if (results.status == "success") {
			
				//console.log('data: ', results.data);
				$scope.data = results.data;
				for (var i = 0; i < $scope.data.length; i++) {
					$scope.data[i].logo = Products.logo($scope.data[i].kdopr).image;
				}

				$scope.hide($ionicLoading);
			}
			else
			{
				$scope.hide($ionicLoading);
				
				$ionicPopup.alert({
					title: 'Bali Berbagi',
					template: results.message
				});
			}
		});
  });

})

/*.controller('SetupHargaCtrl', function($scope, $state, $ionicHistory, Products) {
  
	$scope.operators = Products.all();
        
	$scope.openItem = function(opr){
		$state.go("tab.item-detail", { svcId: opr.id });
	}

})*/

.controller('ItemDetailCtrl', function($scope, $state, $ionicPopup, $stateParams, $localStorage, $ionicLoading, $ionicPlatform, Products, Data) {

  $scope.services = Products.get($stateParams.svcId);
  $scope.token = $localStorage.token;
  $scope.opr = $stateParams.opr;
  $scope.data;
  $scope.submitTitle = "Daftar Harga " + $scope.opr;
  
  $scope.show = function() {
    $ionicLoading.show({
      template: '<ion-spinner></ion-spinner><p>Loading...</p>'
    });
  };

  $scope.hide = function(){
    $ionicLoading.hide();
  };

  $scope.$on('$ionicView.enter', function(e) {
  
		$scope.show($ionicLoading);
		
		Data.get('cekharga2?operator=' + $scope.opr + '&token=' + $scope.token, {
		}).then(function (results) {
			
			if (results.status == "success") {
			
				$scope.data = results.data;
				$scope.hide($ionicLoading);
			}
			else
			{
				$scope.hide($ionicLoading);
				
				$ionicPopup.alert({
					title: 'Bali Berbagi',
					template: results.message
				});
			}
		});
  });
});
