$(function(){
	$('.thumbnail').click(function(){
		$('body').css('overflow', 'hidden');
		$('.modal').show(250);
	});
	$('.background').click(function(){
		$('.modal').hide(250);
		$('body').css('overflow', 'visible');
	});
	$(window).scroll(function() {
	   if($(window).scrollTop() + $(window).height() >= ($(document).height() - 20)) {
	       alert("bottom!");
	   }
	});
});