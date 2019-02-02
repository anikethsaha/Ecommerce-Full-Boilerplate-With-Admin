
    function init() {
        var auth2 = gapi.load('auth2', function() {
            gapi.auth2.init({
                client_id: '',
                scope: 'https://www.googleapis.com/auth/userinfo.password https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/plus.me',
                cookiepolicy: 'single_host_origin'
            })
         });

        console.log('auth2 :', auth2);
         auth2.isSignedIn.listen(signinChanged);
         auth2.currentUser.listen(userChanged);

      }




      function signinChanged(user){
        //   console.log(' signinChanges \n :', user);
        //   console.log(gapi.auth2.getAuthInstance().isSignedIn.Ab);

      }
      function userChanged(user){
        console.log('user change userChanged \n :', user);

    }
    function onSuccessInit(response){
        console.log('response from onSuccessInit:', response);


    }
    function onErr(err){
        console.log('err from onErr:', err);
    }
      function onSignIn(googleUser) {
        var profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
        // do laravel auth
        doLaravelAuthWithGoogleoauthUserData()

     }




