
                function loginWithFB(){
                    FB.login(function(res){
                        console.log('res :', res);
                        if (res.status === 'connected') {
                        doLaravelAuthWithFBUserData("NEW_USER",res);
                        } else {

                        // The person is not logged into your app or we are unable to tell.
                        document.getElementById('status').innerHTML = 'Please log ' +
                            'into this app.';
                        }



                    },{scope: 'public_profile,email'})
                }
                function doLaravelAuthWithFBUserData(type,FBresponse){
                    console.log('type :', type);
                    FB.api('/me?fields=id,first_name,last_name,gender,link,picture,email&type=large',function(userData){
                        switch (type) {
                            case "NEW_USER":
                                    console.log(userData);
                                    window.location = "/register/oauth/callback/"+FBresponse.authResponse.accessToken+ "/"+ userData.email+"/"+userData.firstname;
                                break;
                            case "REPEAT_USER":

                                break;
                            default:
                                break;
                        }
                    })
                }


                window.fbAsyncInit = function() {
                FB.init({
                appId      : '',
                xfbml      : true,
                version    : 'v3.0',
                oauth      : true,
                cookie     : true,
                });
                console.log(' fb loaded' );
                FB.AppEvents.logPageView();
                FB.getLoginStatus(function(response) {

                    if (response.status === 'connected') {
                        console.log('connected :',response);
                        doLaravelAuthWithFBUserData("REPEAT_USER",response);
                    } else if (response.status === 'not_authorized') {
                        // the user is logged in to Facebook,\n but has not authenticated your app
                        // Redirect to login page and login again
                        // window.location = '/login';

                    } else {
                        // the user isn't logged in to Facebook.
                        // Login first
                        // window.location = '/login';
                    }
                    });
            };

            (function(d, s, id){
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) {return;}
                js = d.createElement(s); js.id = id;
                js.src = "https://connect.facebook.net/en_US/sdk.js";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
