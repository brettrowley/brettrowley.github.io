$(document).ready(function(){
	$('div.hamburger').click(function(){
		$('div#sidebar').toggleClass('active')
	})
	$('div.close').click(function(){
		$('div#sidebar').toggleClass('active')
	})
})