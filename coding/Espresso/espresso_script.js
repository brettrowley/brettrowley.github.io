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

function getLocation() {
	if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}
function showPosition(position) {
    lat_coor = 	position.coords.latitude;
    long_coor = position.coords.longitude;
    console.log(lat_coor, long_coor)
}

$(document).ready(getLocation)

$(document).ready(function(){
	var viewportWidth = $(window).width();
	var viewportHeight = $(window).height();
  //SCALABILITY FOR MOBILE VS DESKTOP
	if (viewportWidth < 700){
		$("h1").css("font-size", "2.5em")
		$("h1").html("Espresso <br /> Patronum!")
		$(".action").css("margin", '10px 5px')
		$("#header_box").css("padding", "5px")
	} else {
		$("h1").css("font-size", "4em")
		$(".action").css("margin", "10px 20px")
		$("#header_box").css("padding", "15px")
	}
//SCALABILITY ON RESIZE
$(window).resize(function(){
	var viewportWidth = $(window).width();
	var viewportHeight = $(window).height();

	if (viewportWidth < 700){
		$("h1").css("font-size", "2.5em")
		$("h1").html("Espresso <br /> Patronum!")
		$(".action").css("margin", "10px 5px")
		$("#header_box").css("padding", "5px")
	} else {
		$("h1").css("font-size", "4em")
		$("h1").html("Espresso Patronum!")
		$(".action").css("margin", "10px 20px")
		$("#header_box").css("padding", "15px")
	}
})

$("#refresh_info").hide()
$("#result").hide()
$("#error").hide()
$("#searching").hide()
	
function initialize() {
	//ASSIGNS LAT/LONG COORDINATES TO A VARIABLE
	
  // var nearby = new google.maps.LatLng(42.373616 , -71.109734); //FOR LOCAL TESTS
  var nearby = new google.maps.LatLng(lat_coor, long_coor);
  
  	//GENERATES DETAILS FOR THE MAP CANVAS
    map = new google.maps.Map(document.getElementById('map-canvas'), {
      center: nearby,
      zoom: 15
    });
  
    //REQUEST OBJECT WITH ITEMS
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
    results_list = results
    console.log("Got " + results_list.length + " results!")

  	var ratings_array=[]
  	var ratings=[]
  
  	//CONVERTS NON-EXISTENT RATINGS TO '0'
  	for (var i=0; i < results.length; i++) {
  		if (typeof results[i].rating == "undefined"){
  			results[i].rating = 0;
  		}
  	}
  	//CREATES ARRAY WITH RESULTS INDEIX AND RATING
  	for (var i=0; i<results.length; i++) {
  		var temp = {id: i, rating: results[i].rating}
  		ratings_array.push(temp)
  		ratings.push(results[i].rating)
  	}
  
  	var pool = ratings.sort() //SORTS ALL RESULTS BY RATING

    var display_num = 6;

    if (display_num > pool.length){
      display_num = pool.length
    }

  	var min_rating = pool[pool.length - display_num] //DEFINES THE THRESHOLD FOR RESULT RATINGS
  
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
    $("#directions").html("<a target='_blank' href='http://www.maps.google.com/?q=" + store + " " + address + "'><img id='map_icon' src='Images/directions.svg' /></a>")
    $("#yelp").html("<a target='_blank' href='http://www.yelp.com/search?find_desc=" + store + "&find_loc=" + city[1] + "'><img id='yelp_icon' src='Images/yelp.svg' /></a>")
	  $("#result").fadeIn();

    $("#city").html("<u>" + city[1] + "</u>");
    $("#searching").fadeIn();
  }
  ////////////////////////////////////
  $("#espresso").click(function(){ //DEFINES WHAT HAPPENS WHEN THE INITIAL ESPRESSO BUTTON IS PRESSED
    $(".help_text").fadeOut(600) //FADE THE INFO ICON
  	getLocation //CALL GEOLOCATION
  	if (String(lat_coor)  == 'undefined'){ //SHOW ERROR MESSAGE IF LOCATION CANNOT BE FETCHED
  		$("#error").fadeIn()
  		console.log("Could not get current location")
  		return;
  	}
  	$(this).css("transition", "none").fadeOut(600) //FADE OUT THE BUTTON
    $("#error").fadeOut() //FADE OUT THE ERROR, IF APPLICABLE
  	setTimeout(initialize, 800) //CALL GOOGLE MAPS AFTER 800 MS
  })
////////////////////////////////////
  $("#city").click(function(){
    $("#result").fadeOut(500)
    results_counter = 0;
    initialize()
  })

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
      $("#directions").html("<a target='_blank' href='http://www.maps.google.com/?q=" + store + " " + address + "'><img id='map_icon' src='Images/directions.svg' /></a>")
      $("#yelp").html("<a target='_blank' href='http://www.yelp.com/search?find_desc=" + store + "&find_loc=" + city[1] + "'><img id='yelp_icon' src='Images/yelp.svg' /></a>")
      $("#result").fadeIn();
    }, 500)
  })
});