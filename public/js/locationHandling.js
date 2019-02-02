window.addEventListener('load',function(){

    if(localStorage.getItem('UserAddress') &&
    localStorage.getItem('userCity') &&
    localStorage.getItem('userState') &&
    localStorage.getItem('userArea'))
    {
        
       
    }
})


function activatePlacesSearch(){
    // var options = {
    //   types: ['(cities)'],
    //   componentRestrictions: {country: "IN"}
    // };
    var input = document.getElementById('placeAutocompleteTag');
    var autocomplete = new google.maps.places.Autocomplete(input);
    google.maps.event.addListener(autocomplete, 'place_changed', function () {
        var place = autocomplete.getPlace();
        var addressObject = place.address_components;
        const addressArray = place.formatted_address.split(',');
        var state = addressArray[addressArray.length - 1];
        var city  = addressArray[addressArray.length - 2];
        var area = addressArray[addressArray.length - 3];
        if(typeof area == 'undefined'){
             area = addressArray[addressArray.length - 2];
        }
        console.log('wokring',state,city,area);
        localStorage.setItem("userCity",city);
        localStorage.setItem("userState",state);
        localStorage.setItem("userArea",area);
        document.getElementById('placeAutocompleteTag').value = place.name;
        ChosseOption();
    });
  }


  $('#detectme').on('click',function(e){
    var value  = e.target.value;
    // method 1 :
    $(this).html('Loading....');
    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        e.innerHTML = "Geolocation is not supported by this browser.";
    }
    //  OR
    // method 2 :getPlaceName();


})
function showPosition(res){
    var latitute = res.coords.latitude;
    var longitute = res.coords.longitude;
    $.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+latitute+','+ longitute+'&country=IN&key=AIzaSyD8BrmWjoDYxC5k6PTRe4hPB4LyiFu6pq8',function(response){

        const userLocation = response.results;
        const fullAddress = userLocation[0].formatted_address;
        const addressArray =fullAddress.split(',');
        const state = addressArray[addressArray.length - 2];
        const city  = addressArray[addressArray.length - 3];
        const area = addressArray[addressArray.length - 4];
        localStorage.setItem("UserAddress",fullAddress);
        localStorage.setItem("userCity",city);
        localStorage.setItem("userState",state);
        localStorage.setItem("userArea",area);
        // document.getElementById('placeAutocompleteTag').value = fullAddress;
        $('#detectme').html('Go ahead !');
        document.location.reload();
        // $('#detectme').disable();
        // ChosseOption();

    })
}

// change to this function if the above google map api is not accurate
// function getPlaceName(){
    //    $.get("http://ipinfo.io", function(responsePlace) {
    //     console.log(responsePlace.city, responsePlace.country,responsePlace);
    // }, "jsonp");
// }


function redirectTotiffin(){
    if(localStorage.getItem('UserAddress') &&
       localStorage.getItem('userCity') &&
       localStorage.getItem('userState') &&
       localStorage.getItem('userArea'))
       {
           window.location = '/tiffin/'+ localStorage.getItem('userCity') + '/' + localStorage.getItem('userState');
       }else{
        console.log('Error Bro');
       }
}
function redirectTofood(){
    if(localStorage.getItem('UserAddress') &&
    localStorage.getItem('userCity') &&
    localStorage.getItem('userState') &&
    localStorage.getItem('userArea'))
    {
        window.location = '/food/'+ localStorage.getItem('userCity') + '/' + localStorage.getItem('userState');
    }else{
     console.log('Error Bro');
    }
}
function ChosseOption(){
    $('.forwarding-option').append(`
    <p class='g'>You Can Proceed Now</p>`);
}