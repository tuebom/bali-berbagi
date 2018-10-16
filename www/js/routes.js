routes = [
  {
    path: '/',
    url: './index.html',
    on: {
      pageBeforeIn: function (event, page) {
        
        // call ajax request to update
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
        }, 11000);
      }
    }
        
  },
  {
    path: '/pulsa/',
    url: './pages/pulsa.html',
    on: {
      pageInit: function (event, page) {
        
        /*var numpad = app.keypad.create({
          inputEl: '#tujuan',
          dotButton: false,
          valueMaxLength: 13,
          on: {
            change(keypad, value) {
              // console.log(keypad, value);
              value = value.toString();
              if (value.length === 4) {
                updateList(value);
              }
            }
          }
        });*/

        function updateList(hlr) {
          app.request.json('http://212.24.111.23/bali/pulsa/'+hlr, function (json) {

            $$('#nominal').html('');
            for (var i = 0; i < json.length; i++) {
              $$('#nominal').append('<option value="'+json[i].kode+'">'+json[i].nominal+'</option>')
            }
    
          });
        }
        
        // function getKeyCode(str) {
        //     return str.charCodeAt(str.length);
        // }

        // $$('#tujuan').on('keydown', function(evt){ //only numbers 
          
        //   evt = (evt) ? evt : window.event;
        //   var charCode = (evt.which) ? evt.which : evt.keyCode;
          
        //   if (charCode == 229) {
        //     var inputValue = this.value;
        //     charCode = getKeyCode(inputValue);
            
        //     if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        //         // console.log(charCode);
        //         // app.dialog.alert(charCode);
        //         evt.preventDefault();
        //         return false;
        //     }
        //   }
        //   return true;
        // });
        
        $$('#tujuan').on('input', function(){
          
          var str = $$(this).val();
          
          if (str.length < 4) {
            $$('#nominal').html('');
          } else
          if (str.length == 4) {
            updateList(str);
          } else {
            var str = $$(this).val().substring(0, 4);
            updateList(str);
          }
        });

        $$('.contact').on('click', function(e){
     
          navigator.contacts.pickContact(function(contact){
              //console.log('The following contact has been selected:' + JSON.stringify(contact));
              var nomor = contact.phoneNumbers[0].value;
              $$('#tujuan').val(nomor.replace('+62','0').replace(/-/g,'').replace(/ /g,''));
              var str = $$('#tujuan').val().substring(0, 4);
              updateList(str);
          },function(err){
              //console.log('Error: ' + err);
              // alert('Error: ' + err);
              $$('#tujuan').val('');
          });
        });
      
        $$('.btnKirim').on('click', function(e){
          //e.preventDefault();
          
          var tujuan = $$('#tujuan').val();
          if (tujuan === '') {
              app.dialog.alert('Masukkan data nomor hp tujuan.', 'Pulsa HP');
              return;
          }

          var rgx_nohp = /[08][0-9]{9,}/;
          var nohp = tujuan.trim().match(rgx_nohp);
          if (!nohp) {
              app.dialog.alert('Input data nomor hp tujuan belum benar.', 'Pulsa HP');
              return;
          }

          var kode = $$('#nominal').val();
          if (kode === '') {
              app.dialog.alert('Pilih nominal pulsa.', 'Pulsa HP');
              return;
          }
          
          if (app.data.saldo === 0) {
            app.dialog.alert('Saldo anda tidak cukup untuk melakukan transaksi pengisian pulsa.', 'Pulsa HP');
            return;
          }
          
          // app.preloader.show();
          $$(this).prop("disabled", true);

          var formData = app.form.convertToData('.trxpulsa');
          formData.Authorization = app.data.token;
          
          app.request.post('http://212.24.111.23/bali/pulsa', formData, function (res) {
            
            // app.preloader.hide();
            
            var data = JSON.parse(res);
        
            if (data.status) {
              // setTimeout(function () {
                app.router.back();
              // }, 500);
            } else {

              $$(this).prop("disabled", false);
              if (data.message !== '') {
                app.dialog.alert(data.message, 'Pulsa HP');
              }
            }
          });
        });            
      
        if ( AdMob ) {
          AdMob.hideBanner();
        }
      },
      pageAfterOut: function (event, page) {
      
        if ( AdMob ) {
          AdMob.showBanner(AdMob.AD_POSITION.BOTTOM_CENTER);
        }
      }
    }
  },
  {
    path: '/data/',
    url: './pages/data.html',
    on: {
      pageInit: function (event, page) {
        
        /*var numpad = app.keypad.create({
          inputEl: '#tujuan',
          dotButton: false,
          valueMaxLength: 13,
          on: {
            change(keypad, value) {
              // console.log(keypad, value);
              value = value.toString();
              if (value.length === 4) {
                updateList(value);
              }
            }
          }
        });*/
        
        function updateList(hlr) {
          app.request.json('http://212.24.111.23/bali/data/'+hlr, function (json) {

            $$('#paket').html('');
            for (var i = 0; i < json.length; i++) {
              $$('#paket').append('<option value="'+json[i].kode+'">'+json[i].nama+'</option>')
            }
          });
        }
        
        $$('#tujuan').on('input', function(){
          
          var str = $$('#tujuan').val();
          
          if (str.length < 4) {
            $$('#nominal').html('');
          } else
          if (str.length == 4) {
            updateList(str);
          } else {
            var str = $$(this).val().substring(0, 4);
            updateList(str);
          }
        });
        
        $$('.contact').on('click', function(e){
     
          navigator.contacts.pickContact(function(contact){
              //console.log('The following contact has been selected:' + JSON.stringify(contact));
              var nomor = contact.phoneNumbers[0].value;
              $$('#tujuan').val(nomor.replace('+62','0').replace(/-/g,'').replace(/ /g,''));
              var str = $$('#tujuan').val().substring(0, 4);
              updateList(str);
          },function(err){
              //console.log('Error: ' + err);
              // alert('Error: ' + err);
              $$('#tujuan').val('');
          });
        });
      
        $$('.btnKirim').on('click', function(e){
          //e.preventDefault();
          
          var tujuan = $$('#tujuan').val();
          if (tujuan == '') {
              app.dialog.alert('Masukkan data nomor hp tujuan.', 'Paket Data');
              return;
          }

          var rgx_nohp = /[08][0-9]{9,}/;
          var nohp = tujuan.trim().match(rgx_nohp);
          if (!nohp) {
              app.dialog.alert('Input data nomor hp tujuan belum benar.', 'Paket Data');
              return;
          }
          
          if (app.data.saldo == 0) {
            app.dialog.alert('Saldo anda tidak cukup untuk melakukan transaksi pembelian paket data.', 'Paket Data');
            return;
          }
          
          // app.preloader.show();
          $$(this).prop("disabled", true);

          var formData = app.form.convertToData('.trxdata');
          formData.Authorization = app.data.token;
          
          app.request.post('http://212.24.111.23/bali/data', formData, function (res) {
            
            // app.preloader.hide();
            
            var data = JSON.parse(res);
        
            if (data.status) {
              // setTimeout(function () {
                app.router.back();
              // }, 500);
            } else {

              $$(this).prop("disabled", false);
              if (data.message !== '') {
                app.dialog.alert(data.message, 'Paket Data');
              }
            }
          });
        });            
      
        if ( AdMob ) {
          AdMob.hideBanner();
        }
      },
      pageAfterOut: function (event, page) {
      
        if ( AdMob ) {
          AdMob.showBanner(AdMob.AD_POSITION.BOTTOM_CENTER);
        }
      }
    }
  },
  {
    path: '/token/',
    url: './pages/token.html',
    on: {
      pageInit: function (event, page) {
        
        /*var numpad = app.keypad.create({
          inputEl: '#nopel',
          dotButton: false,
          valueMaxLength: 11,
        }); 
        
        var numpad2 = app.keypad.create({
          inputEl: '#tujuan',
          dotButton: false,
          valueMaxLength: 13,
        });*/
        
        $$('.contact').on('click', function(e){
     
          navigator.contacts.pickContact(function(contact){
              //console.log('The following contact has been selected:' + JSON.stringify(contact));
              var nomor = contact.phoneNumbers[0].value;
              $$('#tujuan').val(nomor.replace('+62','0').replace(/-/g,'').replace(/ /g,''));
          },function(err){
              //console.log('Error: ' + err);
              // alert('Error: ' + err);
              $$('#tujuan').val('');
          });
        });
      
        $$('.btnKirim').on('click', function(e){
          //e.preventDefault();
          
          var nopel = $$('#nopel').val();
          if (nopel == '') {
            app.dialog.alert('Masukkan data nomor pelanggan.', 'Token PLN');
            return;
          }

          var rgx_nopel = /[0-9]{11,}/;
          var noplg = nopel.trim().match(rgx_nopel);
          if (!noplg) {
            app.dialog.alert('Input data nomor pelanggan belum benar.', 'Token PLN');
            return;
          }

          var tujuan = $$('#tujuan').val();
          if (tujuan == '') {
              app.dialog.alert('Masukkan data nomor hp tujuan.', 'Token PLN');
              return;
          }
          
          var rgx_nohp = /[08][0-9]{9,}/;
          var nohp = tujuan.trim().match(rgx_nohp);
          if (!nohp) {
            app.dialog.alert('Input data nomor hp tujuan belum benar.', 'Token PLN');
            return;
          }

          var nominal = $$('#nominal').val();
          if (nominal == '') {
              app.dialog.alert('Pilih nominal token.', 'Token PLN');
              return;
          } else
          if (app.data.saldo == 0) {
            app.dialog.alert('Saldo anda tidak cukup untuk melakukan transaksi pembelian token PLN.', 'Token PLN');
            return;
          }
          
          // app.preloader.show();
          $$(this).prop("disabled", true);

          var formData = app.form.convertToData('.trxpln');
          formData.Authorization = app.data.token;
          
          app.request.post('http://212.24.111.23/bali/pln', formData, function (res) {
            
            // app.preloader.hide();
            
            var data = JSON.parse(res);
        
            if (data.status) {
              // setTimeout(function () {
                app.router.back();
              // }, 500);
            } else {

              $$(this).prop("disabled", false);
              if (data.message !== '') {
                app.dialog.alert(data.message, 'Token PLN');
              }
            }
          });
        });            
      
        if ( AdMob ) {
          AdMob.hideBanner();
        }
      },
      pageAfterOut: function (event, page) {
      
        if ( AdMob ) {
          AdMob.showBanner(AdMob.AD_POSITION.BOTTOM_CENTER);
        }
      }
    }
  },
  {
    path: '/telpon/',
    url: './pages/telpon.html',
    on: {
      pageInit: function (event, page) {
        
        /*var numpad = app.keypad.create({
          inputEl: '#tujuan',
          dotButton: false,
          valueMaxLength: 13,
          on: {
            change(keypad, value) {
              // console.log(keypad, value);
              value = value.toString();
              if (value.length === 4) {
                updateList(value);
              }
            }
          }
        });*/
        
        function updateList(hlr) {
          app.request.json('http://212.24.111.23/bali/telpon/'+hlr, function (json) {

            $$('#nominal').html('');
            for (var i = 0; i < json.length; i++) {
              $$('#nominal').append('<option value="'+json[i].kode+'">'+json[i].nominal+'</option>')
            }
    
          });
        }
        
        $$('#tujuan').on('input', function(){
          
          var str = $$('#tujuan').val();
          
          if (str.length < 4) {
            $$('#nominal').html('');
          } else
          if (str.length == 4) {
            updateList(str);
          } else {
            var str = $$(this).val().substring(0, 4);
            updateList(str);
          }
        });

        $$('.contact').on('click', function(e){
     
          navigator.contacts.pickContact(function(contact){
              //console.log('The following contact has been selected:' + JSON.stringify(contact));
              var nomor = contact.phoneNumbers[0].value;
              $$('#tujuan').val(nomor.replace('+62','0').replace(/-/g,'').replace(/ /g,''));
              var str = $$('#tujuan').val().substring(0, 4);
              updateList(str);
          },function(err){
              //console.log('Error: ' + err);
              // alert('Error: ' + err);
              $$('#tujuan').val('');
          });
        });
      
        $$('.btnKirim').on('click', function(e){
          //e.preventDefault();
          
          var tujuan = $$('#tujuan').val();
          if (tujuan == '') {
              app.dialog.alert('Masukkan data nomor hp tujuan.', 'Paket Nelpon');
              return;
          }

          var rgx_nohp = /[08][0-9]{9,}/;
          var nohp = tujuan.trim().match(rgx_nohp);
          if (!nohp) {
              app.dialog.alert('Input data nomor hp tujuan belum benar.', 'Paket Nelpon');
              return;
          }

          var nominal = $$('#nominal').val();
          if (nominal == '') {
              app.dialog.alert('Pilih nominal pakat.', 'Paket Nelpon');
              return;
          }
          
          if (app.data.saldo == 0) {
            app.dialog.alert('Saldo anda tidak cukup untuk melakukan transaksi pembelian paket nelpon.', 'Paket Nelpon');
            return;
          }
          
          // app.preloader.show();
          $$(this).prop("disabled", true);

          var formData = app.form.convertToData('.trxtelpon');
          formData.Authorization = app.data.token;
          
          app.request.post('http://212.24.111.23/bali/telpon', formData, function (res) {
            
            // app.preloader.hide();
            
            var data = JSON.parse(res);
        
            if (data.status) {
              // setTimeout(function () {
                app.router.back();
              // }, 500);
            } else {

              $$(this).prop("disabled", false);
              if (data.message !== '') {
                app.dialog.alert(data.message, 'Paket Nelpon');
              }
            }
          });
        });            
      
        if ( AdMob ) {
          AdMob.hideBanner();
        }
      },
      pageAfterOut: function (event, page) {
      
        if ( AdMob ) {
          AdMob.showBanner(AdMob.AD_POSITION.BOTTOM_CENTER);
        }
      }
    }
  },
  {
    path: '/sms/',
    url: './pages/sms.html',
    on: {
      pageInit: function (event, page) {
        
        /*var numpad = app.keypad.create({
          inputEl: '#tujuan',
          dotButton: false,
          valueMaxLength: 13,
          on: {
            change(keypad, value) {
              // console.log(keypad, value);
              value = value.toString();
              if (value.length === 4) {
                updateList(value);
              }
            }
          }
        });*/
        
        function updateList(hlr) {
          app.request.json('http://212.24.111.23/bali/sms/'+hlr, function (json) {

            $$('#nominal').html('');
            for (var i = 0; i < json.length; i++) {
              $$('#nominal').append('<option value="'+json[i].kode+'">'+json[i].nominal+'</option>')
            }
    
          });
        }
        
        $$('#tujuan').on('input', function(){
          
          var str = $$('#tujuan').val();
          
          if (str.length < 4) {
            $$('#nominal').html('');
          } else
          if (str.length == 4) {
            updateList(str);
          } else {
            var str = $$(this).val().substring(0, 4);
            updateList(str);
          }
        });

        $$('.contact').on('click', function(e){
     
          navigator.contacts.pickContact(function(contact){
              //console.log('The following contact has been selected:' + JSON.stringify(contact));
              var nomor = contact.phoneNumbers[0].value;
              $$('#tujuan').val(nomor.replace('+62','0').replace(/-/g,'').replace(/ /g,''));
              var str = $$('#tujuan').val().substring(0, 4);
              updateList(str);
          },function(err){
              //console.log('Error: ' + err);
              // alert('Error: ' + err);
              $$('#tujuan').val('');
          });
        });
      
        $$('.btnKirim').on('click', function(e){
          //e.preventDefault();
          
          var tujuan = $$('#tujuan').val();
          if (tujuan == '') {
              app.dialog.alert('Masukkan data nomor hp tujuan.', 'Paket SMS');
              return;
          }

          var rgx_nohp = /[08][0-9]{9,}/;
          var nohp = tujuan.trim().match(rgx_nohp);
          if (!nohp) {
              app.dialog.alert('Input data nomor hp tujuan belum benar.', 'Paket SMS');
              return;
          }

          var nominal = $$('#nominal').val();
          if (nominal == '') {
              app.dialog.alert('Pilih nominal paket sms.', 'Paket SMS');
              return;
          }
          
          if (app.data.saldo == 0) {
            app.dialog.alert('Saldo anda tidak cukup untuk melakukan transaksi pembelian paket sms.', 'Paket SMS');
            return;
          }
          
          // app.preloader.show();
          $$(this).prop("disabled", true);

          var formData = app.form.convertToData('.trxsms');
          formData.Authorization = app.data.token;
          
          app.request.post('http://212.24.111.23/bali/sms', formData, function (res) {
            
            // app.preloader.hide();
            
            var data = JSON.parse(res);
        
            if (data.status) {
              // setTimeout(function () {
                app.router.back();
              // }, 500);
            } else {

              $$(this).prop("disabled", false);
              if (data.message !== '') {
                app.dialog.alert(data.message, 'Paket SMS');
              }
            }
          });
        });            
      
        if ( AdMob ) {
          AdMob.hideBanner();
        }
      },
      pageAfterOut: function (event, page) {
      
        if ( AdMob ) {
          AdMob.showBanner(AdMob.AD_POSITION.BOTTOM_CENTER);
        }
      }
    }
  },
  {
    path: '/daftar-game/',
    url: './pages/game1.html',
  },
  {
    path: '/game/',
    url: './pages/game.html',
    on: {
      pageInit: function (event, page) {
        
        /*var numpad = app.keypad.create({
          inputEl: '#tujuan',
          dotButton: false,
          valueMaxLength: 13,
        });*/
        
        function updateList(opr) {
          app.request.json('http://212.24.111.23/bali/game/'+opr, function (json) {

            $$('#nominal').html('');
            for (var i = 0; i < json.length; i++) {
              $$('#nominal').append('<option value="'+json[i].kode+'">'+json[i].nama+'</option>')
            }
    
          });
        }
                
        $$('#paket').on('change', function(e){
          var opr = $$(this).val();
          updateList(opr);
        });

        updateList('FIFA'); // default
        
        $$('.contact').on('click', function(e){
     
          navigator.contacts.pickContact(function(contact){
              //console.log('The following contact has been selected:' + JSON.stringify(contact));
              var nomor = contact.phoneNumbers[0].value;
              $$('#tujuan').val(nomor.replace('+62','0').replace(/-/g,'').replace(/ /g,''));
          },function(err){
              //console.log('Error: ' + err);
              // alert('Error: ' + err);
              $$('#tujuan').val('');
          });
        });
      
        $$('.btnKirim').on('click', function(e){
          //e.preventDefault();
          
          var tujuan = $$('#tujuan').val();
          if (tujuan == '') {
              app.dialog.alert('Masukkan nomor hp tujuan.', 'Paket Game');
              return;
          }
          
          var rgx_nohp = /[08][0-9]{9,}/;
          var nohp = tujuan.trim().match(rgx_nohp);
          if (!nohp) {
            app.dialog.alert('Input data nomor hp tujuan belum benar.', 'Paket Game');
            return;
          }

          var paket = $$('#paket').val();
          if (paket == '') {
              app.dialog.alert('Pilih paket game.', 'Paket Game');
              return;
          }

          var nominal = $$('#nominal').val();
          if (nominal == '') {
              app.dialog.alert('Pilih nominal paket game.', 'Paket Game');
              return;
          } else
          if (app.data.saldo == 0) {
            app.dialog.alert('Saldo anda tidak cukup untuk melakukan transaksi pembelian paket game.', 'Paket Game');
            return;
          }
          
          // app.preloader.show();
          $$(this).prop("disabled", true);

          var formData = app.form.convertToData('.trxgame');
          formData.Authorization = app.data.token;
          
          app.request.post('http://212.24.111.23/bali/game', formData, function (res) {
            
            // app.preloader.hide();

            var data = JSON.parse(res);
        
            if (data.status) {
              // setTimeout(function () {
                app.router.back();
              // }, 500);
            } else {

              $$(this).prop("disabled", false);
              if (data.message !== '') {
                app.dialog.alert(data.message, 'Paket Game');
              }
            }
          });
        });            
      
        if ( AdMob ) {
          AdMob.hideBanner();
        }
      },
      pageAfterOut: function (event, page) {
      
        if ( AdMob ) {
          AdMob.showBanner(AdMob.AD_POSITION.BOTTOM_CENTER);
        }
      }
    }
  },
  /*{
    path: '/bpjs/',
    url: './pages/bpjs1.html',
  },
  {
    path: '/telkom/',
    url: './pages/telkom1.html',
  },*/
  {
    path: '/topup-saldo/',
    url: './pages/topup-saldo.html',
    on: {
      pageInit: function (event, page) {
      
        $$('.btnKirim').on('click', function(e){
          //e.preventDefault();
          
          var nominal = $$('#nominal').val();
          
          if (nominal == '') {
              app.dialog.alert('Maukkan jumlah nominal topup saldo.', 'Topup Saldo');
              return;
          } else
          if (nominal < 50000) {
            app.dialog.alert('Jumlah minimal topup saldo sebesar 50.000.', 'Topup Saldo');
            return;
          }
                  
          app.preloader.show();

          var formData = app.form.convertToData('.topup');
          formData.Authorization = app.data.token;
          
          app.request.post('http://212.24.111.23/bali/member/topup', formData, function (res) {
            
            app.preloader.hide();
            
            var data = JSON.parse(res);
        
            if (data.status) {
              app.router.back();
            } else {
              if (data.message !== '') {
                app.dialog.alert(data.message, 'Topup Saldo');
              }
            }
          });
        });            
      
        if ( AdMob ) {
          AdMob.hideBanner();
        }
      },
      pageAfterOut: function (event, page) {
      
        if ( AdMob ) {
          AdMob.showBanner(AdMob.AD_POSITION.BOTTOM_CENTER);
        }
      }
    }
  },
  {
    path: '/cek-harga/',
    url: './pages/cek-harga.html',
  },
  {
    path: '/cek-harga-pulsa/',
    url: './pages/cek-harga-pulsa.html',
  },
  {
    path: '/cek-harga-data/',
    url: './pages/cek-harga-data.html',
  },
  {
    path: '/cek-harga-telpon/',
    url: './pages/cek-harga-telpon.html',
  },
  {
    path: '/cek-harga-sms/',
    url: './pages/cek-harga-sms.html',
  },
  {
    path: '/cek-harga-game/',
    url: './pages/cek-harga-game.html',
  },
  {
    path: '/harga-pulsa/:opr/:nama',
    async: function (routeTo, routeFrom, resolve, reject) {
      // Router instance
      var router = this;

      // App instance
      var app = router.app;

      // Show Preloader
      app.preloader.show();

      // kode operator
      var opr = routeTo.params.opr;
      var nama = routeTo.params.nama;

      app.request.json("http://212.24.111.23/bali/pulsa/cekharga/"+opr, function(json) {
          
        var data = { title: 'Harga Pulsa ' + nama, list: json };

        resolve(
          { componentUrl: './pages/daftar-harga.html' },
          { context: { data: data } }
        );
        app.preloader.hide();
      });
    }
  },
  {
    path: '/harga-data/:opr/:nama',
    async: function (routeTo, routeFrom, resolve, reject) {
      // Router instance
      var router = this;

      // App instance
      var app = router.app;

      // Show Preloader
      app.preloader.show();

      // kode operator
      var opr = routeTo.params.opr;
      var nama = routeTo.params.nama;

      app.request.json("http://212.24.111.23/bali/data/cekharga/"+opr, function(json) {
          
        var data = { title: 'Harga Paket Data ' + nama, list: json };

        resolve(
          { componentUrl: './pages/daftar-harga.html' },
          { context: { data: data, } }
        );
        app.preloader.hide();
      });
    }
  },
  {
    path: '/harga-telpon/:opr/:nama',
    async: function (routeTo, routeFrom, resolve, reject) {
      // Router instance
      var router = this;

      // App instance
      var app = router.app;

      // Show Preloader
      app.preloader.show();

      // kode operator
      var opr = routeTo.params.opr;
      var nama = routeTo.params.nama;

      app.request.json("http://212.24.111.23/bali/telpon/cekharga/"+opr, function(json) {
          
        var data = { title: 'Harga Paket Nelpon ' + nama, list: json };

        resolve(
          { componentUrl: './pages/daftar-harga.html' },
          { context: { data: data, } }
        );
        app.preloader.hide();
      });
    }
  },
  {
    path: '/harga-sms/:opr/:nama',
    async: function (routeTo, routeFrom, resolve, reject) {
      // Router instance
      var router = this;

      // App instance
      var app = router.app;

      // Show Preloader
      app.preloader.show();

      // kode operator
      var opr = routeTo.params.opr;
      var nama = routeTo.params.nama;

      app.request.json("http://212.24.111.23/bali/sms/cekharga/"+opr, function(json) {
          
        var data = { title: 'Harga Paket SMS ' + nama, list: json };

        resolve(
          { componentUrl: './pages/daftar-harga.html' },
          { context: { data: data, } }
        );
        app.preloader.hide();
      });
    }
  },
  {
    path: '/harga-pln/',
    async: function (routeTo, routeFrom, resolve, reject) {
      // Router instance
      var router = this;

      // App instance
      var app = router.app;

      // Show Preloader
      app.preloader.show();

      // kode operator
      //var opr = routeTo.params.opr;

      // Simulate Ajax Request
      app.request.json("http://212.24.111.23/bali/pln/cekharga", function(json) {
          
        var data = { title: 'Harga Token PLN', list: json };

        resolve(
          { componentUrl: './pages/daftar-harga.html' },
          { context: { data: data, } }
        );
        app.preloader.hide();
      });
    }
  },
  {
    path: '/harga-game/:opr',
    async: function (routeTo, routeFrom, resolve, reject) {
      // Router instance
      var router = this;

      // App instance
      var app = router.app;

      // Show Preloader
      app.preloader.show();

      // kode operator
      var opr = routeTo.params.opr;

      app.request.json("http://212.24.111.23/bali/game/cekharga/"+opr, function(json) {
          
        var data = { title: 'Harga Paket Game ' + opr, list: json };

        resolve(
          { componentUrl: './pages/daftar-harga.html' },
          { context: { data: data, } }
        );
        app.preloader.hide();
      });
    }
  },
  {
    path: '/pendaftaran/',
    url: './pages/pendaftaran.html',
    on: {
      pageInit: function (event, page) {
        
        $$('.btnKirim').on('click', function(e){
          //e.preventDefault();
          
          var nama = $$('#nama').val();
          if (nama == '') {
              app.dialog.alert('Masukkan nama member.', 'Pendaftaran Member');
              return;
          }

          var rgx_nama = /^[a-zA-Z]'?([a-zA-Z]|\,|\.| |-)+$/;
          var namax = nama.trim().match(rgx_nama);
          if (!namax) {
            app.dialog.alert('Input data nama belum benar.', 'Pendaftaran Member');
            return;
          }

          var nohp = $$('#nohp').val();
          if (nohp == '') {
              app.dialog.alert('Masukkan nomor handphone.', 'Pendaftaran Member');
              return;
          }

          var rgx_nohp = /[08][0-9]{9,}/;
          var nohpx = nohp.trim().match(rgx_nohp);
          if (!nohpx) {
            app.dialog.alert('Input data nomor handphone belum benar.', 'Pendaftaran Member');
            return;
          }
        
          app.preloader.show();

          var formData = app.form.convertToData('.pendaftaran');
          formData.mbrid = app.data.mbrid;
          
          app.request.post('http://212.24.111.23/bali/member', formData, function (res) {
            
            app.preloader.hide();
            
            var data = JSON.parse(res);
        
            if (data.status) {
              app.dialog.alert(data.message, 'Registrasi Member');
              setTimeout(function () {
                app.router.back();
              }, 2000);
            } else {
              app.dialog.alert(data.message, 'Pendaftaran Member');
            }
          });
        });                  
      }
    }
  },
  {
    path: '/transfer-saldo/',
    url: './pages/transfer-saldo.html',
    on: {
      pageInit: function (event, page) {
      
        $$('.btnKirim').on('click', function(e){
          //e.preventDefault(); 
          
          var mbrid = $$('#mbrid').val();
          var nominal = $$('#nominal').val();
          
          if (mbrid == '') {
              app.dialog.alert('Masukkan ID member tujuan.', 'Transfer Saldo');
              return;
          } else
          if (mbrid == app.data.mbrid) {
            app.dialog.alert('Nomor ID tujuan tidak boleh sama dengan ID asal.', 'Transfer Saldo');
            return;
          } else
          if (nominal == '') {
              app.dialog.alert('Masukkan nominal transfer saldo.', 'Transfer Saldo');
              return;
          } else
          if (nominal < 500) {
            app.dialog.alert('Jumlah minimal transfer saldo sebesar 500.', 'Transfer Saldo');
            $$('#nominal').val(500);
            return;
          } else
          if (app.data.saldo == 0) {
            app.dialog.alert('Saldo anda kosong. Silahkan topup saldo anda terlebih dahulu.', 'Transfer Saldo');
            return;
          } else
          if (nominal > app.data.saldo) {
            app.dialog.alert('Jumlah maksimal saldo yang bisa ditransfer adalah ' + app.data.saldo +'.', 'Transfer Saldo');
            return;
          }
          
          app.preloader.show();

          var formData = app.form.convertToData('.trfsaldo');
          formData.Authorization = app.data.token;
          //console.log(formData);
          
          app.request.post('http://212.24.111.23/bali/member/trfsaldo', formData, function (res) {
            
            //console.log(res);
            app.preloader.hide();

            var data = JSON.parse(res);
        
            if (data.status) {
              app.router.back();
            } else {
              app.dialog.alert(data.message, 'Transfer Saldo');
            }
          });
        });            
      }
    }
  },
  {
    path: '/histori/',
    async: function (routeTo, routeFrom, resolve, reject) {
      // Router instance
      var router = this;

      // App instance
      var app = router.app;

      // Show Preloader
      app.preloader.show();
        
      if (!app.data.currentDate) {
      
        var now = new Date();
        
        var day = ("0" + now.getDate()).slice(-2);
        var month = ("0" + (now.getMonth() + 1)).slice(-2);
        
        var today = now.getFullYear()+"-"+(month)+"-"+(day) ;
        app.data.currentDate = today;
      }
        
      // console.log('app.data.currentDate: ',app.data.currentDate);
      
      var formData = [];

      formData.tgltrx = app.data.currentDate;
      formData.Authorization = app.data.token;
      
      app.request.post("http://212.24.111.23/bali/member/histori", formData, function(res) {
          
        var data = JSON.parse(res);

        resolve(
          { componentUrl: './pages/histori.html' },
          { context: { data: data } }
        );
        app.preloader.hide();
      });
    },
    
    on: {
      pageInit: function (event, page) {
        
        // console.log('#tgltrx_val: ', $$('#tgltrx').val());
        $$('#tgltrx').val(app.data.currentDate);
        
        // var tglval = $$('#tgltrx').val();
        
        // if (tglval == '') {
          // $$('#tgltrx').val(app.data.currentDate);
          // var now = new Date();
          
          // var day = ("0" + now.getDate()).slice(-2);
          // var month = ("0" + (now.getMonth() + 1)).slice(-2);
          
          // var today = now.getFullYear()+"-"+(month)+"-"+(day) ;
          
          // $$('#tgltrx').val(today);
        // }
      
        $$('#tgltrx').on('change', function(e){

          app.data.currentDate = $$('#tgltrx').val();
          app.router.navigate('/histori/', {
            reloadCurrent: true,
            ignoreCache: true,
          });
        });
      
        if ( AdMob ) {
          AdMob.hideBanner();
        }
      },
      pageAfterOut: function (event, page) {
      
        app.data.currentDate = null;

        if ( AdMob ) {
          AdMob.showBanner(AdMob.AD_POSITION.BOTTOM_CENTER);
        }
      }
    },
  },
  {
    path: '/akun/',
    url: './pages/akun.html',
    on: {
      pageInit: function (event, page) {
        
        var mbrid = app.data.mbrid;
        
        app.request.get('http://212.24.111.23/bali/member/saldo/'+mbrid, function (res) {
            
          var data = JSON.parse(res);
        
          if (data.status) {
            $$('#saldo').text(parseInt(data.saldo).toLocaleString('ID'));
            app.data.saldo = parseInt(data.saldo);

            $$('#poin').text(parseInt(data.poin).toLocaleString('ID'));
            app.data.poin = parseInt(data.poin);

            $$('#bonus').text(parseInt(data.bonus).toLocaleString('ID'));
            app.data.bonus = parseInt(data.bonus);

          } else {
            app.dialog.alert(data.message, 'Akun Saya');
          }
        });
        
        $$('.cek-id').on('click', function(e){
          
          app.request.get('http://212.24.111.23/bali/member/cek_id/'+ app.data.mbrid, function (res) {
            
            var data = JSON.parse(res);
    
            if (data.status) {
              app.dialog.alert(data.message, 'Akun Saya');
            } else {
              app.dialog.alert(data.message, 'Akun Saya');
            }
          });
        });
      }
    }
  },
  {
    path: '/komplain/',
    url: './pages/komplain.html',
    on: {
      pageInit: function (event, page) {
      
        $$('.btnKirim').on('click', function(e){
          //e.preventDefault();
          
          var info = $$('#info').val();
          
          if (info == '') {
              app.dialog.alert('Masukkan pesan info/komplain.', 'Info / Komplain');
              return;
          }
          
          app.preloader.show();

          var formData = app.form.convertToData('.komplain');
          formData.Authorization = app.data.token;
          
          app.request.post('http://212.24.111.23/bali/member/komplain', formData, function (res) {
            
            app.preloader.hide();
            
            var data = JSON.parse(res);
        
            if (data.status) {
              app.router.back();
            } else {
              app.dialog.alert(data.message, 'Info / Komplain');
            }
          });
        });
      
        if ( AdMob ) {
          AdMob.hideBanner();
        }
      },
      pageAfterOut: function (event, page) {
      
        if ( AdMob ) {
          AdMob.showBanner(AdMob.AD_POSITION.BOTTOM_CENTER);
        }
      }
    }
  },
  {
    path: '/settings/',
    url: './pages/settings.html',
  },
  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    url: './pages/404.html',
  },
];
