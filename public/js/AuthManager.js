


function onLogOutHandler(){
    console.log("logout request came");
    FB.getLoginStatus(function(response) {

        if (response.status === 'connected' && window.isAuthWithLaravel == 1) {
            console.log('the user is loggedIn with FB and requesting logou ');
            FB.logout(function(response) {
                console.table("Logout with FB done \n do laravel logout");
                logoutAction();
                });
        }
    });
    gapi.auth2.getAuthInstance().then((auth2instanceresponse) => {
        if(auth2instanceresponse.isSignedIn.Ab &&  window.isAuthWithLaravel == 1){
            console.log('the user is loggedIn with Google and requesting logou ');
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
                console.log('User signed out. \n do laravel logout');
                logoutAction();
            });
        }
    })



}
window.addEventListener('load',function(){
    isLoggedInInstance();
})




function isLoggedInInstance(){
    if(window.isAuthWithLaravel == 1){
        console.log("loggedIn with laravel auth so laravel will take care and no action  ");

    }


    if( gapi.auth2 && gapi.auth2.getAuthInstance().isSignedIn.Ab){
        // console.log("loggedIn with google so !! do laravel auth ",gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token);

    }

}
function logoutAction(){
     window.location="/logout";
}