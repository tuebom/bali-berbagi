// Init App
var myApp = new Framework7({
    modalTitle: 'Bank Ikan',
    // Enable Material theme
    material: true
});

// Expose Internal DOM library
var $$ = Dom7;

var bSignedIn = false;

// var calendarDateFormat = myApp.calendar({
    // input: '#checkin',
    // dateFormat: 'dd-mm-yyyy'
// });

// var calendarDateFormat2 = myApp.calendar({
    // input: '#checkout',
    // dateFormat: 'dd-mm-yyyy'
// });

$$('a').on('click', function (e) { //Close panel when you open a new page
    myApp.closePanel();
});

$$('a.btnLogin').on('click', function(e){
  //var formData = myApp.formToData('#login-form');
  //alert(JSON.stringify(formData));
  //e.preventDefault();
  
  var email = $$('#usermail').val();
  var pwd = $$('#userpass').val();
  
  if (email == '') {
      myApp.alert('Masukkan email anda.', 'Sign In');
      return;
  }
  if (pwd == '') {
      myApp.alert('Masukkan password anda.', 'Sign In');
      return;
  }
  
  myApp.showPreloader();
  $$('#login-form').trigger("submit");

  //window.alert('aya!');
  // myApp.closeModal();
});

$$('#login-form').on('submitted', function (e) {
  var xhr = e.detail.xhr; // actual XHR object
  var resp = JSON.parse(e.detail.data); // Ajax response from action file
  console.log(resp);
  
  myApp.hidePreloader();
  if (!resp.status) {
    myApp.alert(resp.message, 'Sign In');
  } else {
    bSignedIn = true;
    myApp.closeModal();
  }
  // do something with response data
  // mainView.router.loadPage({url:'index-template.php'});
});

// Add main view
var mainView = myApp.addView('.view-main', {
});

myApp.onPageInit('index', function (page) {

  // var mySearchbar = myApp.searchbar('.searchbar', {
      // searchList: '.list-block-search',
      // searchIn: '.item-title'
  // }); 
});

myApp.onPageInit('daftar', function (page) {

  $$('#provinsi').on('change', function(){
    
    //myApp.alert($$('#provinsi').val(), 'Pendaftaran');
    var str = $$('#provinsi').val();
    $$.getJSON ('http://localhost/invest-tour/api/v1/kota?provinsi='+str, function (json) {
      $$('#kota').html('');
      $$.each(json, function(i) {
        $$('#kota').append('<option value="'+json[i].id_kab+'">'+json[i].nama+'</option>')
      });
    });
  });

});

myApp.onPageInit('pulsa', function (page) {

  $$('.tujuan').on('input', function(){
    
    var str = $$('.tujuan').val();
    if (str.length == 4) {
      $$.getJSON ('http://localhost/invest-tour/api/v1/pulsa?hlr='+str, function (json) {
        //Template7.data['url:productlist.html'] = json;
        //console.log(json); // Is definitely passing back data
        //myApp.alert(json, 'Pulsa HP');
        $$('#nominal').html('');
        $$.each(json, function(i) {
          //console.log(json[i].nominal);
          $$('#nominal').append('<option value="'+json[i].kode+'">'+json[i].nominal+'</option>')
        });
        /*var myList = myApp.virtualList('.list-block.virtual-list', {
            // Array with items data
            items: json,
            // Template 7 template to render each item
            template: '<option value="{{kode}}">{{nominal}}</option>'
        });*/
      });
    }
  });

  function onSuccess(contacts) {
      //alert('Found ' + contacts.length + ' contacts.');
      $$('.tujuan').val(contacts[0].phoneNumbers[0].value);
  }
   
  function onError(contactError) {
      alert('onError!');
  }

  $$('.contact').on('click', function(e){
     
    // find all contacts with 'Bob' in any name field 
    var options      = new ContactFindOptions();
    options.filter   = "";
    options.multiple = true;
    options.desiredFields = [navigator.contacts.fieldType.phoneNumbers];
    options.hasPhoneNumber = true;
    var fields       = [navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.phoneNumbers];
    navigator.contacts.find(fields, onSuccess, onError, options);  
  });

  $$('#btnSend').on('click', function(e){
    //e.preventDefault();
    
    var tujuan = $$('#tujuan').val();
    var nominal = $$('#nominal').val();
    var pin = $$('#pin').val();
    
    if (tujuan == '') {
        myApp.alert('Masukkan nomor tujuan.', 'Pulsa HP');
        return;
    }
    if (nominal == '') {
        myApp.alert('Pilih nominal pulsa.', 'Pulsa HP');
        return;
    }
    if (pin == '') {
        myApp.alert('Masukkan nomor pin anda.', 'Pulsa HP');
        return;
    }
    
    myApp.showPreloader();
    $$('.trxpulsa').trigger("submit");

  });


  $$('.trxpulsa').on('submitted', function (e) {
    //var xhr = e.detail.xhr; // actual XHR object
    var resp = JSON.parse(e.detail.data); // Ajax response from action file
    //console.log(resp);
    
    myApp.hidePreloader();
    if (!resp.status) {
      myApp.alert(resp.message, 'Pulsa HP');
    } else {
      myApp.alert(resp.message, 'Pulsa HP');
      mainView.router.back();
    }
  });
});

myApp.onPageInit('paket-data', function (page) {

  $$('.tujuan').on('input', function(){
    
    var str = $$('.tujuan').val();
    if (str.length == 4) {
      $$.getJSON ('http://localhost/invest-tour/api/v1/data?hlr='+str, function (json) {
        //Template7.data['url:productlist.html'] = json;
        console.log(json); // Is definitely passing back data
        //myApp.alert(json, 'Pulsa HP');
        $$('#nominal').html('');
        $$.each(json, function(i) {
          //console.log(json[i].nominal);
          $$('#nominal').append('<option value="'+json[i].kode+'">'+json[i].nama+'</option>')
        });
        /*var myList = myApp.virtualList('.list-block.virtual-list', {
            // Array with items data
            items: json,
            // Template 7 template to render each item
            template: '<option value="{{kode}}">{{nominal}}</option>'
        });*/
      });
    }
  });

  $$('.contact').on('click', function(e){
  
  });

  $$('#btnSend').on('click', function(e){
    //e.preventDefault();
    
    var tujuan = $$('#tujuan').val();
    var nominal = $$('#nominal').val();
    var pin = $$('#pin').val();
    
    if (tujuan == '') {
        myApp.alert('Masukkan nomor tujuan.', 'Paket Data');
        return;
    }
    if (nominal == '') {
        myApp.alert('Pilih jenis paket data.', 'Paket Data');
        return;
    }
    if (pin == '') {
        myApp.alert('Masukkan nomor pin anda.', 'Paket Data');
        return;
    }
    
    myApp.showPreloader();
    $$('.trxdata').trigger("submit");

  });


  $$('.trxdata').on('submitted', function (e) {
    //var xhr = e.detail.xhr; // actual XHR object
    var resp = JSON.parse(e.detail.data); // Ajax response from action file
    //console.log(resp);
    
    myApp.hidePreloader();
    if (!resp.status) {
      myApp.alert(resp.message, 'Paket Data');
    } else {
      myApp.alert(resp.message, 'Paket Data');
      mainView.router.back();
    }
  });
});

myApp.onPageInit('paket-game', function (page) {
  
  $$('#paket').on('change', function(){
    
    var str = $$('#paket').val();
    $$.getJSON ('http://localhost/invest-tour/api/v1/game?paket='+str, function (json) {

      console.log(json);
      $$('#nominal').html('');
      $$.each(json, function(i) {
        $$('#nominal').append('<option value="'+json[i].kode+'">'+json[i].nama+'</option>')
      });
    });
  });

  $$('.contact').on('click', function(e){
  
  });
  
  $$('#btnSend').on('click', function(e){
    //e.preventDefault();
    
    var tujuan = $$('#tujuan').val();
    var nominal = $$('#nominal').val();
    var pin = $$('#pin').val();
    
    if (tujuan == '') {
        myApp.alert('Masukkan nomor tujuan.', 'Paket Game');
        return;
    }
    if (nominal == '') {
        myApp.alert('Pilih nominal paket.', 'Paket Game');
        return;
    }
    if (pin == '') {
        myApp.alert('Masukkan nomor pin anda.', 'Paket Game');
        return;
    }
    
    myApp.showPreloader();
    $$('.trxgame').trigger("submit");

  });

  $$('.trxgame').on('submitted', function (e) {
    //var xhr = e.detail.xhr; // actual XHR object
    var resp = JSON.parse(e.detail.data); // Ajax response from action file
    //console.log(resp);
    
    myApp.hidePreloader();
    if (!resp.status) {
      myApp.alert(resp.message, 'Paket Game');
    } else {
      myApp.alert(resp.message, 'Paket Game');
      mainView.router.back();
    }
  });
});

myApp.onPageInit('token', function (page) {

  $$('.contact').on('click', function(e){
  
  });
  
  $$('#btnSend').on('click', function(e){
    //e.preventDefault();
    
    var nopel = $$('#nopel').val();
    var tujuan = $$('#tujuan').val();
    var nominal = $$('#nominal').val();
    var pin = $$('#pin').val();
    
    if (nopel == '') {
        myApp.alert('Masukkan nomor pelanggan.', 'Token Listrik');
        return;
    }
    if (tujuan == '') {
        myApp.alert('Masukkan nomor tujuan.', 'Token Listrik');
        return;
    }
    if (nominal == '') {
        myApp.alert('Pilih nominal paket.', 'Token Listrik');
        return;
    }
    if (pin == '') {
        myApp.alert('Masukkan nomor pin anda.', 'Token Listrik');
        return;
    }
    
    myApp.showPreloader();
    $$('.trxpln').trigger("submit");

  });

  $$('.trxpln').on('submitted', function (e) {
    //var xhr = e.detail.xhr; // actual XHR object
    var resp = JSON.parse(e.detail.data); // Ajax response from action file
    //console.log(resp);
    
    myApp.hidePreloader();
    if (!resp.status) {
      myApp.alert(resp.message, 'Token Listrik');
    } else {
      myApp.alert(resp.message, 'Token Listrik');
      mainView.router.back();
    }
  });
});

myApp.onPageInit('bpjs', function (page) {
  
  $$('#btnCek').on('click', function(e){
    //e.preventDefault();
    
    var nokartu = $$('#nokartu').val();
    var pin = $$('#pin').val();
    
    if (nokartu == '') {
        myApp.alert('Masukkan nomor kartu BPJS.', 'Pembayaran BPJS');
        return;
    }
    if (pin == '') {
        myApp.alert('Masukkan nomor pin anda.', 'Pembayaran BPJS');
        return;
    }
    
    myApp.showPreloader();
    $$('.trxbpjs').trigger("submit");

  });

  $$('.trxbpjs').on('submitted', function (e) {
    //var xhr = e.detail.xhr; // actual XHR object
    var resp = JSON.parse(e.detail.data); // Ajax response from action file
    //console.log(resp);
    
    myApp.hidePreloader();
    if (!resp.status) {
      myApp.alert(resp.message, 'Pembayaran BPJS');
    } else {
      myApp.alert(resp.message, 'Pembayaran BPJS');
      mainView.router.back();
    }
  });
});

myApp.onPageInit('cart', function (page) {
      $$('.delete').on('click', function(){
        myApp.swipeoutDelete($$('li.swipeout.product1'));
      });
      $$('.delete2').on('click', function(){
        myApp.swipeoutDelete($$('li.swipeout.product2'));
      });
      $$('.delete3').on('click', function(){
        myApp.swipeoutDelete($$('li.swipeout.product3'));
      });
});