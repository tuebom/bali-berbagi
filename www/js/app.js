// Dom7
var $$ = Dom7;

var AdMob = null;

// Framework7.use(Framework7Keypad);

// Framework7 App main instance
var app  = new Framework7({
  root: '#app', // App root element
  id: 'io.framework7.bali-berbagi', // App bundle ID
  name: 'Bali Berbagi', // App name
  theme: 'auto', // Automatic theme detection
  init: true,
  initOnDeviceReady: true,
  
  touch: {
    disableContextMenu: false,
  },
  
  // App root data
  data: function () {
    return {
      db: null,
      mbrid: null,
      nohp: '',
      pin: '',
      saldo: 0,
      poin: 0,
      bonus: 0,
      currentDate: null,
      token: null,
      push: null,
      //admobid: {}
    };
  },
  // App root methods
  methods: {
    // helloWorld: function () {
      // app.dialog.alert('Hello World!');
    // },
  },
  on: {

    init: function () { // sama dengan onDeviceReady

      /*function copyDatabaseFile(dbName) {

        var sourceFileName = cordova.file.applicationDirectory + 'www/' + dbName;
        var targetDirName = cordova.file.dataDirectory;

        return Promise.all([
          new Promise(function (resolve, reject) {
            resolveLocalFileSystemURL(sourceFileName, resolve, reject);
          }),
          new Promise(function (resolve, reject) {
            resolveLocalFileSystemURL(targetDirName, resolve, reject);
          })
        ]).then(function (files) {
          var sourceFile = files[0];
          var targetDir = files[1];
          return new Promise(function (resolve, reject) {
            targetDir.getFile(dbName, {}, resolve, reject);
          }).then(function () {
            console.log("file already copied");
          }).catch(function () {
            console.log("file doesn't exist, copying it");
            return new Promise(function (resolve, reject) {
              sourceFile.copyTo(targetDir, dbName, resolve, reject);
            }).then(function () {
              console.log("database file copied");
            });
          });
        });
      }*/

      // copyDatabaseFile('acc.db').then(function () {
        // // success! :)
        // app.data.db = window.sqlitePlugin.openDatabase({name: 'acc.db'});

        /*
        var currentDate = new Date();
        var month = currentDate.getMonth() + 1;
        var year = currentDate.getFullYear();
        
        var db = app.data.db;
        
        db.transaction(function(tx) {
          tx.executeSql('insert into setup (nama, bulan, tahun) values (?, ?, ?);', ['Nama Usaha Anda',month,year]);
        }, function(error) {
          app.dialog.alert('insert error: ' + error.message);
        });  */
         
      // }).catch(function (err) {
        // // error! :(
        // console.log(err);
      // });
      
      if (hrs > 8) {

        // jika lebih 8 jam, setup info login terakhir kali
        $$('#my-login-screen [name="mbrid"]').val(localStorage.getItem('mbrid'));
        $$('#my-login-screen [name="nohp"]').val(localStorage.getItem('nohp'));

      } else {

        var mbrid = localStorage.getItem('mbrid');
        var nohp  = localStorage.getItem('nohp');
        var pin   = localStorage.getItem('pin');
        var gcmid = localStorage.getItem('RegId');

        var formData = {};
        formData.mbrid = mbrid;
        formData.nohp  = nohp;
        formData.pin   = pin;
        formData.gcmid = RegId;
  
        app.preloader.show();

        app.request.post('http://212.24.111.23/bali/auth/login', formData, function (res) {
    
          app.preloader.hide();
          var data = JSON.parse(res);
      
          if (data.status) {
          
            app.data.mbrid = mbrid;
            app.data.nohp = nohp;
            app.data.pin = pin;
            app.data.token = data.token;
            
            // ambil informasi saldo member
            app.request.get('http://212.24.111.23/bali/member/saldo/'+mbrid, function (res) {
                
              var data = JSON.parse(res);
          
              if (data.status) {
                $$('.saldo').text(parseInt(data.saldo).toLocaleString('ID'));
                app.data.saldo = parseInt(data.saldo);
              } else {
                app.dialog.alert(data.message, 'Akun Saya');
              }
            });
      
          }
        });
      }
    
      //*
      this.data.push = PushNotification.init({
        "android": {
            "senderID": "597497239727"
        },
        "ios": {
            "sound": true,
            "vibration": true,
            "badge": true
        },
        "windows": {}
      });

      var push = this.data.push;

      push.on('registration', function(data) {

        var oldRegId = localStorage.getItem('RegId');
        if (oldRegId !== data.registrationId) {
            // Save new registration ID
            localStorage.setItem('RegId', data.registrationId);
            // Post registrationId to your app server as the value has changed
            // app.dialog.alert('Registrasi Id berhasil!');
        }

      });

      push.on('notification', function(data) {
        
        // show message
        app.dialog.alert(data.message, 'Bali Berbagi');
        
        // update info saldo
        setTimeout(function () {

          // http://212.24.111.23/
          app.request.get('http://212.24.111.23/bali/member/saldo/'+ app.data.mbrid, function (res) {
          
            var data = JSON.parse(res);
        
            if (data.status) {
              $$('.saldo').text(parseInt(data.saldo).toLocaleString('ID'));
              app.data.saldo = parseInt(data.saldo);
              app.data.bonus = parseInt(data.bonus);
            } else {
              app.dialog.alert(data.message, 'Bali Berbagi');
            }
          });
        }, 1000);
      }); //*/
    },     
  },
  // App routes
  routes: routes,
  // Enable panel left visibility breakpoint
  panel: {
    leftBreakpoint: 960,
  },
});


// Init/Create left panel view
var mainView = app.views.create('.view-left', {
  url: '/'
});

// Init/Create main view
var mainView = app.views.create('.view-main', {
  url: '/'
});

var swiper = app.swiper.create('.swiper-container', {
    speed: 400,
    //slidesPerView: auto,
    loop: true,
    //autoHeight: true,
    shortSwipes: false,
    longSwipes: false,
    //effect:'fade'
    //spaceBetween: 100
});

swiper.autoplay.start();


var la = localStorage.getItem('lastOpened');
// console.log('la: ', la)

var ca = new Date().getTime();
// console.log('ca: ', ca)

var msec = ca - la;
var mins = Math.floor(msec / 60000);
var hrs = Math.floor(mins / 60);

// console.log('hrs: ', hrs)

// cek selisih waktu, jika lebih tampilkan form login
if (hrs > 8) {

  var ls = app.loginScreen.create({ el: '#my-login-screen' });
  ls.open(false);
}

var ac_share = app.actions.create({
  buttons: [
    {
      text: '<div class="list"><ul><li><div class="item-content">'+
      '<div class="item-media"><img class="material-icons" src="img/whatsapp.png" /></div>'+
      '<div class="item-inner">'+
        '<div class="item-title-row">'+
          '<div class="item-title">Whatsapp</div>'+
        '</div>'+
        '<div class="item-text"></div>'+
      '</div>'+
    '</div></li></ul></div>',
      onClick: function () {
        var msg = 'Ayo dapatkan pulsa dan paket internet murah lewat aplikasi ini!' +
        'https://play.google.com/store/apps/details?id=com.app.bali-berbagi';
        window.plugins.socialsharing.shareViaWhatsApp(msg, null, null, null, function(e){
          app.dialog.alert('Sharing failed with message: ' + e, 'Bali Berbagi');
        })
      }
    },
    {
      text: '<div class="list"><ul><li><div class="item-content">'+
      '<div class="item-media"><img class="material-icons" src="img/telegram.png" /></div>'+
      '<div class="item-inner">'+
        '<div class="item-title-row">'+
          '<div class="item-title">Telegram</div>'+
        '</div>'+
        '<div class="item-text"></div>'+
      '</div>'+
    '</div></li></ul></div>',
      onClick: function () {
        var msg = 'Ayo dapatkan pulsa dan paket internet murah lewat aplikasi ini!' +
        'https://play.google.com/store/apps/details?id=com.app.bali-berbagi';
        window.plugins.socialsharing.shareVia('org.telegram.messenger', msg, null, null, null, null, function(e){
          app.dialog.alert('Sharing failed with message: ' + e, 'Bali Berbagi');
        })
      }
    },
    {
      text: '<div class="list"><ul><li><div class="item-content">'+
      '<div class="item-media"><img class="material-icons" src="img/facebook.png" /></div>'+
      '<div class="item-inner">'+
        '<div class="item-title-row">'+
          '<div class="item-title">Facebook</div>'+
        '</div>'+
        '<div class="item-text"></div>'+
      '</div>'+
    '</div></li></ul></div>',
      onClick: function () {
        var msg = 'Ayo dapatkan pulsa dan paket internet murah lewat aplikasi ini!' +
        'https://play.google.com/store/apps/details?id=com.app.bali-berbagi';
        window.plugins.socialsharing.shareViaFacebook(msg, null, null, null, function(e){
          app.dialog.alert('Sharing failed with message: ' + e, 'Bali Berbagi');
        })
      }
    },
    /*{
      text: '<div class="list"><ul><li><div class="item-content">'+
      '<div class="item-media"><img class="material-icons" src="img/twitter.png" /></div>'+
      '<div class="item-inner">'+
        '<div class="item-title-row">'+
          '<div class="item-title">Twitter</div>'+
        '</div>'+
        '<div class="item-text"></div>'+
      '</div>'+
    '</div></li></ul></div>',
      onClick: function () {
        var msg = 'Ayo dapatkan pulsa dan paket internet murah lewat aplikasi ini!' +
        'https://play.google.com/store/apps/details?id=com.app.bali-berbagi';
        window.plugins.socialsharing.shareViaTwitter(msg, null, 'https://twitter.com/', null, function(e){
          app.dialog.alert('Sharing failed with message: ' + e, 'Bali Berbagi');
        })
      }
    },*/
    {
      text: '<div class="list"><ul><li><div class="item-content">'+
      '<div class="item-media"></div>'+
      '<div class="item-inner">'+
        '<div class="item-title-row">'+
          '<div class="item-title">Cancel</div>'+
        '</div>'+
        '<div class="item-text"></div>'+
      '</div>'+
    '</div></li></ul></div>',
      color: 'red',
    },
  ]
});

$$('.ac-share').on('click', function () {
  ac_share.open();
});

// Login Screen
$$('#my-login-screen .login-button').on('click', function () {
  
  var mbrid = $$('#my-login-screen [name="mbrid"]').val();
  if (mbrid === '') {
      app.dialog.alert('Masukkan ID member anda.', 'Login Member');
      return;
  }
  
  var nohpx = $$('#my-login-screen [name="nohp"]').val();
  if (nohpx === '') {
      app.dialog.alert('Masukkan nomor handphone anda.', 'Login Member');
      return;
  }

  var rgx_nohp = /[08][0-9]{9,}/;
  var nohp = nohpx.trim().match(rgx_nohp);
  if (!nohp) {
      app.dialog.alert('Input data nomor handphone belum benar.', 'Login Member');
      return;
  }

  var pin = $$('#my-login-screen [name="pin"]').val();
  if (pin === '') {
      app.dialog.alert('Masukkan nomor PIN anda.', 'Login Member');
      return;
  }
  
  app.preloader.show();

  var formData = app.form.convertToData('.login-form');

  var regId = localStorage.getItem('RegId');
  formData.gcmid = regId;

  // app.request.setup({
  //   headers: {
  //     'Access-Control-Allow-Origin': '*',
  //     'Access-Control-Allow-Headers': 'origin, content-type, accept',
  //     'content-type': 'application/x-www-form-urlencoded',
  //     'server': 'Apache/2.4.7 (Win32) OpenSSL/1.0.1e PHP/5.6.12'
  //   }
  // })
  
  // http://212.24.111.23/
  app.request.post('http://212.24.111.23/bali/auth/login', formData, function (res) {
    
    app.preloader.hide();
    var data = JSON.parse(res);

    if (data.status) {
    
      localStorage.setItem('mbrid', mbrid);
      localStorage.setItem('nohp', nohp);
      localStorage.setItem('pin', pin);

      app.loginScreen.close('#my-login-screen');
      
      app.data.mbrid = mbrid;
      app.data.nohp = nohp;
      app.data.pin = pin;
      app.data.token = data.token;
      
      // kosongkan isian nomor pin
      $$('#my-login-screen [name="pin"]').val('');
      
      app.request.get('http://212.24.111.23/bali/member/saldo/'+mbrid, function (res) {
          
        var data = JSON.parse(res);
    
        if (data.status) {
          $$('.saldo').text(parseInt(data.saldo).toLocaleString('ID'));
          app.data.saldo = parseInt(data.saldo);
        } else {
          app.dialog.alert(data.message, 'Akun Saya');
        }
      });

      // if ( AdMob ) {
     
      //   // this will create a banner on startup
      //   AdMob.showBanner(AdMob.AD_POSITION.BOTTOM_CENTER);
      // }

    } else {
      app.dialog.alert(data.message, 'Login Member');
    }
  });
});

$$('a.label-register').on('click', function () {
  // Close login screen
  app.loginScreen.close('#my-login-screen');
  app.loginScreen.open('#my-reg-screen');
});


// Registrasi member
$$('#my-reg-screen .register-button').on('click', function () {
  
  var nama = $$('#my-reg-screen [name="nama"]').val();
  if (nama === '') {
      app.dialog.alert('Masukkan nama lengkap anda.', 'Registrasi Member');
      return;
  }
  
  var rgx_nama = /^[a-zA-Z]'?([a-zA-Z]|\,|\.| |-)+$/;
  var namax = nama.trim().match(rgx_nama);
  if (!namax) {
    app.dialog.alert('Input data nama belum benar.', 'Registrasi Member');
    return;
  }

  var nohpx = $$('#my-reg-screen [name="nohp"]').val();
  if (nohpx === '') {
      app.dialog.alert('Masukkan nomor handphone.', 'Registrasi Member');
      return;
  }

  var rgx_nohp = /[08][0-9]{9,}/;
  var nohp = nohpx.trim().match(rgx_nohp);
  if (!nohp) {
    app.dialog.alert('Input data nomor handphone belum benar.', 'Registrasi Member');
    return;
  }

  app.preloader.show();
  
  var regId = localStorage.getItem('RegId');
  var formData = app.form.convertToData('.register-form');

  formData.mbrid = 1;
  formData.gcmid = regId;
  
  app.request.post('http://212.24.111.23/bali/member', formData, function (res) {
    
    app.preloader.hide();
    
    var data = JSON.parse(res);

    if (data.status) {
      
      // simpan data nomor handphone
      localStorage.setItem('mbrid', data.mbrid);
      localStorage.setItem('nohp', nohp);

      app.data.mbrid = data.mbrid;
      app.data.nohp = data.nohp;

      // set data ke form login
      $$('#my-login-screen [name="mbrid"]').val(data.mbrid);
      $$('#my-login-screen [name="nohp"]').val(nohp);

      app.loginScreen.close('#my-reg-screen');
      app.loginScreen.open('#my-login-screen');
    
      setTimeout(function () {
        app.dialog.alert(data.message, 'Registrasi Member');
      }, 2000);

    } else {
      app.dialog.alert(data.message, 'Registrasi Member');
    }
  });
});

$$('a.label-login').on('click', function () {
  // Close register screen
  app.loginScreen.close('#my-reg-screen');
  app.loginScreen.open('#my-login-screen');
});

$$('#my-login-screen').on('loginscreen:opened', function (e, loginScreen) {
  // set data ke form login
  $$('#my-login-screen [name="mbrid"]').val(localStorage.getItem('mbrid'));
  $$('#my-login-screen [name="nohp"]').val(localStorage.getItem('nohp'));
});

$$('#tukar-poin .btnTukar').on('click', function(e){
  //e.preventDefault();

  var poin = $$('#tukar-poin [name="poin"]').val();

  if (poin === '' || poin === '0') {
    app.dialog.alert('Masukkan jumlah poin yang akan ditukar.', 'Tukar Poin');
    return;
  } else
  if (app.data.poin === 0) {
    app.dialog.alert('Jumlah poin anda masih kosong.', 'Tukar Poin');
    return;
  } else
  if (poin > app.data.poin) {
    app.dialog.alert('Jumlah maksimal poin yang bisa ditukar adalah ' + app.data.poin +'.', 'Tukar Poin');
    $$('#tukar-poin [name="poin"]').val(app.data.poin);
    return;
  }

  var formData = app.form.convertToData('.tkrpoin');
  formData.Authorization = app.data.token;
  
  app.request.post('http://212.24.111.23/bali/member/tukarpoin', formData, function (res) {
    
    app.preloader.hide();
    
    var data = JSON.parse(res);

    if (data.status) {
      $$('#tukar-poin [name="poin"]').val('');
      app.popup.close($$('.page[data-name="tukar-poin"]').parents(".popup"));

      app.request.get('http://212.24.111.23/bali/member/saldo/' + app.data.mbrid, function (res) {
          
        var data = JSON.parse(res);
    
        if (data.status) {
          $$('#saldo').text(parseInt(data.saldo).toLocaleString('ID'));
          app.data.saldo = parseInt(data.saldo);

          $$('#poin').text(parseInt(data.poin).toLocaleString('ID'));
          app.data.poin = parseInt(data.poin);
        } else {
          app.dialog.alert(data.message, 'Akun Saya');
        }
      });
      
    } else {
      app.dialog.alert(data.message, 'Tukar Poin');
    }
  });
});  

$$('#transfer-bonus .btnTransfer').on('click', function(e){
  //e.preventDefault();
  
  var bonus = parseInt($$('#transfer-bonus [name="nominal"]').val());

  if (bonus === '' || bonus === '0') {
    app.dialog.alert('Masukkan jumlah bonus yang akan ditransfer.', 'Transfer Bonus');
    return;
  } else
  if (app.data.bonus === 0) {
    app.dialog.alert('Jumlah bonus anda masih kosong.', 'Transfer Bonus');
    return;
  } else
  if (bonus < 500) {
    app.dialog.alert('Jumlah minimal transfer bonus sebesar 500.', 'Transfer Bonus');
    $$('#nominal').val(500);
    return;
  } else
  if (app.data.bonus < 500) {
    app.dialog.alert('Jumlah bonus anda belum mencukupi minimal transfer.', 'Transfer Bonus');
    $$('#nominal').val('');
    return;
  } else
  if (bonus > app.data.bonus) {
    app.dialog.alert('Jumlah maksimal bonus yang bisa ditransfer adalah ' + app.data.bonus +'.', 'Transfer Bonus');
    $$('#nominal').val(app.data.bonus);
    return;
  }

  var formData = app.form.convertToData('.trfbonus');
  formData.Authorization = app.data.token;
  
  app.request.post('http://212.24.111.23/bali/member/trfbonus', formData, function (res) {
    
    app.preloader.hide();

    var data = JSON.parse(res);

    if (data.status) {
      $$('#transfer-bonus [name="nominal"]').val('');
      app.popup.close($$('.page[data-name="transfer-bonus"]').parents(".popup"));

      app.request.get('http://212.24.111.23/bali/member/saldo/' + app.data.mbrid, function (res) {
          
        var data = JSON.parse(res);
    
        if (data.status) {
          $$('#saldo').text(parseInt(data.saldo).toLocaleString('ID'));
          app.data.saldo = parseInt(data.saldo);
          
          $$('#bonus').text(parseInt(data.bonus).toLocaleString('ID'));
          app.data.bonus = parseInt(data.bonus);
        } else {
          app.dialog.alert(data.message, 'Akun Saya');
        }
      });
    } else {
      app.dialog.alert(data.message, 'Transfer Bonus');
    }
  });
});  

// ganti pin
$$('#ganti-pin .btnGanti').on('click', function () {
  
  var pinlama = $$('#ganti-pin [name="pinlama"]').val();
  var pinbaru = $$('#ganti-pin [name="pinbaru"]').val();
  
  if (pinlama === '') {
      app.dialog.alert('Masukkan nomor pin yang lama.', 'Ganti PIN');
      return;
  } else
  if (pinlama !== app.data.pin) {
    app.dialog.alert('Input nomor pin yang lama belum benar.', 'Ganti PIN');
    return;
  } else
  if (pinbaru === '') {
      app.dialog.alert('Masukkan nomor pin yang baru.', 'Ganti PIN');
      return;
  }
  
  app.preloader.show();

  var formData = app.form.convertToData('.ganti-pin');
  formData.Authorization = app.data.token;
  
  app.request.post('http://212.24.111.23/bali/member/gantipin', formData, function (res) {
    
    app.preloader.hide();
    var data = JSON.parse(res);

    if (data.status) {
      $$('#ganti-pin [name="pinlama"]').val('');
      $$('#ganti-pin [name="pinbaru"]').val('');
      app.popup.close($$('.page[data-name="ganti-pin"]').parents(".popup"));
    } else {
      app.dialog.alert(data.message, 'Ganti PIN');
    }
  });
});

$$(document).on('backbutton', function (e) {

  e.preventDefault();

  // for example, based on what and where view you have
  if (app.views.main.router.url === '/') {
    
    // catat waktu terakhir pemakaian
    var dateEnd = new Date().getTime();
    localStorage.setItem('lastOpened', dateEnd);

    navigator.app.exitApp();
  } else {
    mainView.router.back();
  }
});

$$('#my-login-screen').on('loginscreen:open', function (e, loginScreen) {

  // if ( AdMob ) {
  //   AdMob.hideBanner();
  // }
});

app.on('pageInit', function (page) {

  $$('input').on('focus', function () {
    
    $$('.kb').css('height', '280px');
    //var limit = $$(window).height() - 280;

    if ($$(this).offset().top > 280) {
      $$('.page-content').scrollTop($$(this).offset().top-168);
    }
  });

  $$('input').on('blur', function () {
    $$('.kb').css('height', '0px');
  });
});
