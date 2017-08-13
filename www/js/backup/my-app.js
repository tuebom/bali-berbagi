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

myApp.onPageInit('login', function (page) {
});

myApp.onPageInit('find-hotel', function (page) {

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