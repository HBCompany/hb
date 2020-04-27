var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    let cont = this.nextElementSibling;
    if (cont)
      cont.classList.toggle("active");
    /*var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    } */
  });
}


    /*  window.fbAsyncInit = function() {
        FB.init({
          appId : '763630314064160',
          autoLogAppEvents : true,
          xfbml : true,
          version : 'v5.0'  
        });
        FB.getLoginStatus(function(response) {
            //statusChangeCallback(response);
        });
      };

       (function(d, s, id){
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) {return;}
         js = d.createElement(s); js.id = id;
         js.src = "https://connect.facebook.net/en_US/sdk.js";
         fjs.parentNode.insertBefore(js, fjs);
       }(document, 'script', 'facebook-jssdk'));

       function statusChangeCallback(response){
         if(response.status === 'connected'){
           console.log('Logged in and authenticated');
           setElements(true);
           //window.location.replace("head-menu.html");
           //testAPI();
         } else {
           console.log('Not authenticated');
           setElements(false);
         }
       }
      function checkLoginState() {
        FB.getLoginStatus(function(response) {
          statusChangeCallback(response);
        });
      }

     

      function logout(){
        FB.logout(function(response){
         setTimeout(window.location.replace("sing-in.html"),7200);
        });
      }*/

             function statusChangeCallback(response) {  // Called with the results from FB.getLoginStatus().
    console.log('statusChangeCallback');
    console.log(response);                   // The current login status of the person.
    if (response.status === 'connected') {   // Logged into your webpage and Facebook.
      testAPI();  
      
    } else {                                 // Not logged into your webpage or we are unable to tell.
      /*document.getElementById('status').innerHTML = 'Please log ' +
        'into this webpage.';*/
    }
  }


  function checkLoginState() {               // Called when a person is finished with the Login Button.
    FB.getLoginStatus(function(response) {   // See the onlogin handler
      statusChangeCallback(response);
    });
  }


  window.fbAsyncInit = function() {
    FB.init({
      appId : '763630314064160',
      autoLogAppEvents : true,
      xfbml : true,
      version : 'v5.0'           // Use this Graph API version for this call.
    });


    FB.getLoginStatus(function(response) {   // Called after the JS SDK has been initialized.
      statusChangeCallback(response);        // Returns the login status.
    });
  };

  
  (function(d, s, id) {                      // Load the SDK asynchronously
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

 
  function testAPI() {                      // Testing Graph API after login.  See statusChangeCallback() for when this call is made.
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name);
      /*document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name + '!';*/
    });
  }

   function logout(){
        FB.logout(function(response){
         setTimeout(window.location.replace("sing-in.html"),3600);
        });
      }