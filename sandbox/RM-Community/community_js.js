$(document).ready(function(){
	$('div.hamburger').click(function(){
		$('div#sidebar').toggleClass('active')
	})
	$('div.close').click(function(){
		$('div#sidebar').toggleClass('active')
	})

	$('div#sidebar li.parent').click(function(){
		$(this).toggleClass('open')
		$(this).find('i').toggleClass('ion-plus').toggleClass('ion-minus')
	})
})