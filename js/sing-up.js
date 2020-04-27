  function statusChangeCallback(response) {  
    console.log('statusChangeCallback');
    console.log(response);                   
    if (response.status === 'connected') {  
      testAPI();  
  };
  }


  function checkLoginState() {              
    FB.getLoginStatus(function(response) {   
      statusChangeCallback(response);
    });
  }


  window.fbAsyncInit = function() {
    FB.init({
      appId : '763630314064160',
      autoLogAppEvents : true,
      xfbml : true,
      version : 'v5.0'           
    });


    FB.getLoginStatus(function(response) {   
      statusChangeCallback(response);       
    });
  };


  
  (function(d, s, id) {                     
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

 
  function testAPI() {                      
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name);
      window.location.replace("question.html?p=1");
    });
  }
