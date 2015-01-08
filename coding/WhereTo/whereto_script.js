$(document).ready(function(){
	//HIDE ELEMENTS
	$("#search_drop_icon").hide();
	$("#settings_blank").hide();

	$("#result-1").hide();
	$("#result-2").hide();
	$("#result-3").hide();
	$("#result-4").hide();

	$("#demo_step1").hide();
	$("#demo_step2").hide();
	$("#demo_step3").hide();
	$("#demo_step4").hide();
	$("#demo_step5").hide();

	$("#route1").hide();
	$("#route2").hide();
	$(".advance").hide();

	//FADE THE SPLASH SCREEN ON CLICK
	$("#splash_screen").click(function(){
		$(this).fadeOut(1000);
		$("#demo_step1").delay(2000).fadeIn(1000);
	})

	//AUTOFILL TEXT INPUT WITH CURRENT LOCATION
	$("#location_icon").click(function(){
		$("#start_point").val("Here");
		$("#location_icon").attr("src", "Images/location_active.svg");
		$("#demo_step1").delay(0).fadeOut();
		$("#demo_step2").delay(2000).fadeIn();
	});

	//REVEAL SEARCH RESULTS AFTER PRESSING ENTER
	var enter_counter=0
	$('#end_point').keypress(function (e) {
		if (enter_counter==0){
			if ($("#end_point").val().length >= 1){
				if (e.which == 13){
					//ANIMATE RESULTS FLY IN
					$("#result-1").delay(400).toggle('slide', {direction: "right"});
					$("#result-2").delay(500).toggle('slide', {direction: "right"});
					$("#result-3").delay(600).toggle('slide', {direction: "right"});
					$("#result-4").delay(700).toggle('slide', {direction: "right"});

					//FADE DEMO STEPS
					$("#demo_step1").delay(0).fadeOut(function(){$(this).remove()});
					$("#demo_step2").delay(0).fadeOut(function(){$(this).remove()});
					$("#demo_step3").delay(2000).fadeIn();

					enter_counter =1
		    		}
		    	}
	    	}
	}); 

	//DEFINE FUNCTION THAT ANIMATES SETTINGS FLYOUT
	function settings_up(){
		$("#search_settings").animate({
			top: "300px"
		});
		$("#search_settings_icon").fadeOut(200);
		$("#search_drop_icon").fadeIn(200);
		$("#settings_blank").fadeIn(300);

	}

	//FUNCTIONS TO DICTATE SETTINGS BEHAVIOR
	$("#search_settings p").click(function(){
		settings_up();
	});
	$("#search_settings_icon").click(function(){
		settings_up();
	});
	$("#search_drop_icon").click(function(){
		$("#search_settings").animate({
			top: "505px"
		});
		$("#search_drop_icon").fadeOut(200);
		$("#search_settings_icon").fadeIn(200);
		$("#settings_blank").fadeOut(300);
	});

	//AUTOFILL TEXT INPUT WITH HARVARD UNIVERSITY, REMOVE SEARCH RESULTS, REVEAL ROUTE CARDS, ENABLE SCROLLING WITHIN PHONE
	$("#result-3").click(function(){
		//ANIMATE RESULTS AWAY
		$("#result-4").delay(000).toggle('slide', function(){
			$(this).remove();
		});
		$("#result-3").delay(100).toggle('slide', function(){
			$(this).remove();
		});
		$("#result-2").delay(200).toggle('slide', function(){
			$(this).remove();
		});
		$("#result-1").delay(300).toggle('slide', function(){
			$(this).remove();
		});

		//ANIMATE SETTINGS HIDE
		$("#search_settings").delay(400).toggle('slide', {direction: "down"})

		//FILL TEXT BOX WITH 'HARVARD UNIVERSITY'
		$("#end_point").val($("#result-3 p:first-child").text());

		//ANIMATE FIRST ROUTECARD
		$("#route1").delay(1400).show().animate({
			left: "0px"
		}, 800);
		$("#route2").show();

		//FADE IN ADVANCE RIGHT ICON
		$("#advance_right").delay(3000).fadeIn(400);

		//ENABLE SCROLLING
		$("#screen_blank").css("overflow", "auto");
		$('#screen_blank').bind('mousewheel', function (e) {
    		$(this).scrollTop($(this).scrollTop() - e.originalEvent.wheelDeltaY);
		    return false;
		});

		//FADE DEMO STEPS
		$("#demo_step1").delay(0).fadeOut(function(){$(this).remove()});
		$("#demo_step2").delay(0).fadeOut(function(){$(this).remove()});
		$("#demo_step3").delay(0).fadeOut(function(){$(this).remove()});
		$("#demo_step4").delay(2000).fadeIn();
	});  

	//CHANGE ROUTE CARDS
	$("#advance_right").click(function(){
		$("#route1").animate({
			left: "-300px"
		}, 800)
		$("#route2").animate({
			left: "0px"
		}, 800)
		$("#advance_right").fadeOut(400);
		$("#advance_left").fadeIn(400);
		$("#demo_step4").delay(0).fadeOut(function(){$(this).remove()});
	})
	$("#advance_left").click(function(){
		$("#route2").animate({
			left: "+600px"
		}, 800)
		$("#route1").animate({
			left: "0px"
		}, 800)
		$("#advance_right").fadeIn(400);
		$("#advance_left").fadeOut(400);
	})
	//HIDE DEMO STEPS WHEN SCROLLED PAST
	$("#screen_blank").scroll(function(){
     var top = $(this).scrollTop();
     if(top > 300){
         $("#demo_step4").delay(0).fadeOut(function(){$(this).remove()});   
     }
});

	//FUNCTIONS TO DICTATE MAP ICON BEHAVIOR
	$(".maps").mouseenter(function(){
		$(this).attr("src", "Images/map_icon_hover.svg")
	});
	$(".maps").mouseleave(function(){
		$(this).attr("src", "Images/map_icon.svg")
	});	
	$(".maps").click(function(){
		$(this).effect("shake", {distance: 10})

		//HIDE DEMO STEPS AFTER MAP CLICK
		$("#demo_step1").delay(0).fadeOut(function(){$(this).remove()});
		$("#demo_step2").delay(0).fadeOut(function(){$(this).remove()});
		$("#demo_step3").delay(0).fadeOut(function(){$(this).remove()});
		$("#demo_step4").delay(0).fadeOut(function(){$(this).remove()});
		$("#demo_step5").fadeIn();
		$("#demo_step5").delay(10000).fadeOut(function(){$(this).remove()});
	})
});