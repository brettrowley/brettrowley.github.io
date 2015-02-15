//define the variables to be used
var x = document.getElementById("espresso");
var lat_coor;
var long_coor;
var map;
var infowindow;
var store;
var rating;
var address;
var city;
var results_counter = 0;
var results_list =[]
var winners_id = []

//define function to get current location
function getLocation() {
	if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}
//run this function on page load
$(document).ready(getLocation)

//define function to print current position (for debugging)
function showPosition(position) {
    lat_coor = 	position.coords.latitude;
    long_coor = position.coords.longitude;
    console.log(lat_coor, long_coor)
}


$(document).ready(function(){
//hide results page by default
$('#results-page').hide()
	
//define function to create google maps ap
function initialize() {	
  // var nearby = new google.maps.LatLng(42.373616 , -71.109734); //FOR LOCAL SERVER TESTS
  var nearby = new google.maps.LatLng(lat_coor, long_coor);
  
  	//generates a map (required for api to function)
    map = new google.maps.Map(document.getElementById('map-canvas'));
  
    //specify options in request for cafes with the keyword 'coffee' in their description,
    //ideally within 500 meters of the current location
    var request = {
      location: nearby,
      radius: 500,
      keyword: "coffee",
      types:['cafe'],
      openNow: true
    };
    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
  }
  
  function callback(results, status) {
    //creates a list of all results returned by api
    results_list = results
    // console.log("Got " + results_list.length + " results!") //log how many results were returned

  	var ratings_array=[]
  	var ratings=[]
  
  	//convert results without ratings to 'rating = 0'
  	for (var i=0; i < results.length; i++) {
  		if (typeof results[i].rating == "undefined"){
  			results[i].rating = 0;
  		}
  	}
  	//create an array with the index value of the result and the result's rating
  	for (var i=0; i<results.length; i++) {
  		var temp = {id: i, rating: results[i].rating}
  		ratings_array.push(temp)
  		ratings.push(results[i].rating)
  	}
    //sort the index+rating array by rating
  	var pool = ratings.sort()

    //set the number of results to display back to the user
    var display_num = 6;

    //set the maximum number equal to the number of results if the results list is "small"
    if (display_num > pool.length){
      display_num = pool.length
    }

  	var min_rating = pool[pool.length - display_num]
  
  	for (var i=0; i < ratings_array.length; i++){
  		if (ratings_array[i].rating >= min_rating){ //IF A RESULT HAS A RATING HIGHER THAN THE THRESHOLD, APPEND IT TO THE ARRAY
  			winners_id.push(ratings_array[i].id)
  		}
  	}
  	var pool_size = winners_id.length //HOW MANY RESULTS FILTERED THROUGH

    if (status == google.maps.places.PlacesServiceStatus.OK) { //IF GOOGLE MAPS IS WORKING, SHOW THE 'RANDOM' RESULT
    	$("#refresh_info").fadeIn()
    	store = results[winners_id[results_counter]].name
    	rating = results[winners_id[results_counter]].rating
    	address = results[winners_id[results_counter]].vicinity
    	city = address.split(",")
    } else{
    	$("#error").fadeIn()
    	console.log("Google Maps did not respond")
    	return;

    }
    $("#name").html(store)
    $("#address").html(city[0])
    $("#directions").attr("href", "http://www.maps.google.com/?q=" + store + " " + address)
    $("#yelp").attr("href", "http://www.yelp.com/search?find_desc=" + store + "&find_loc=" + city[1])
	  $("#results-page").fadeIn();

    $("#city").html("'" + city[1].replace(" ","") + "'");
  }
  ////////////////////////////////////
  $("#espresso").click(function(){ //DEFINES WHAT HAPPENS WHEN THE INITIAL ESPRESSO BUTTON IS PRESSED
  	getLocation //CALL GEOLOCATION
  	if (String(lat_coor)  == 'undefined'){ //SHOW ERROR MESSAGE IF LOCATION CANNOT BE FETCHED
  		$("#error").fadeIn()
  		console.log("Could not get current location")
  		return;
  	}
    $("#error").fadeOut() //FADE OUT THE ERROR, IF APPLICABLE
    $('#front-page').fadeOut()
  	setTimeout(initialize, 800) //CALL GOOGLE MAPS AFTER 800 MS
  })
////////////////////////////////////

  $("#refresh").click(function(){
  	$("#result").fadeOut(500)

    results_counter += 1;
    if (results_counter > winners_id.length-1){
      results_counter = 0
    }

    setTimeout(function(){
      store = results_list[winners_id[results_counter]].name
      rating = results_list[winners_id[results_counter]].rating
      address = results_list[winners_id[results_counter]].vicinity
      city = address.split(",")

      $("#name").html(store)
      $("#address").html(city[0])
      $("#directions").attr("href", "http://www.maps.google.com/?q=" + store + " " + address)
      $("#yelp").attr("href", "http://www.yelp.com/search?find_desc=" + store + "&find_loc=" + city[1])
      $("#result").fadeIn();
    }, 500)
  })
});