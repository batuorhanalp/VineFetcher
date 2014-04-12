$(function(){
	var vines = new Array();
	var selectedVine;
	var previousVineId;
	var vineCounter = 0;

	$('.background').click(function(){
		$('.modal').hide(250);
		$('body').css('overflow', 'visible');
	});
	$('.modal > .content > .previous').click(function(){
		vineCounter--;
		changeVine(vines[vineCounter], vineCounter);
	});
	$('.modal > .content > .next').click(function(){
		vineCounter++;
	 	changeVine(vines[vineCounter], vineCounter);
	});
	$(window).scroll(function() {
		var loading = false;
	    if(!loading && ($(window).scrollTop() + $(window).height() >= ($(document).height() - 20))) {
	    	loading = true;
		    var firstVideos = {records: [{videoId:123124124, thumbnailUrl: "http://v.cdn.vine.co/r/thumbs/09A3C5DE421066696727559610368_2030826c6d4.0.1.15422060476568592004.mp4.jpg?versionId=e7wmTWh4iN.bX10bSFL6xbbODgEYhOSZ", permalink: "https://vine.co/v/MJzdUBr03mb", username: "Funny Guyz 0", description: "Punjabi will understand.. *...* #funny #rasmalai", created: "2014-04-12T09:22:43.000000", tag:"funny"},
		    	{videoId:123124125, thumbnailUrl: "http://v.cdn.vine.co/r/thumbs/09A3C5DE421066696727559610368_2030826c6d4.0.1.15422060476568592004.mp4.jpg?versionId=e7wmTWh4iN.bX10bSFL6xbbODgEYhOSZ", permalink: "https://vine.co/v/MJzdUBr03mb", username: "Funny Guyz 1", description: "Punjabi will understand.. *...* #funny #rasmalai", created: "2014-04-12T09:22:43.000000", tag:"funny"},
		    	{videoId:123124126, thumbnailUrl: "http://v.cdn.vine.co/r/thumbs/09A3C5DE421066696727559610368_2030826c6d4.0.1.15422060476568592004.mp4.jpg?versionId=e7wmTWh4iN.bX10bSFL6xbbODgEYhOSZ", permalink: "https://vine.co/v/MJzdUBr03mb", username: "Funny Guyz 2", description: "Punjabi will understand.. *...* #funny #rasmalai", created: "2014-04-12T09:22:43.000000", tag:"funny"},
		    	{videoId:123124127, thumbnailUrl: "http://v.cdn.vine.co/r/thumbs/09A3C5DE421066696727559610368_2030826c6d4.0.1.15422060476568592004.mp4.jpg?versionId=e7wmTWh4iN.bX10bSFL6xbbODgEYhOSZ", permalink: "https://vine.co/v/MJzdUBr03mb", username: "Funny Guyz 3", description: "Punjabi will understand.. *...* #funny #rasmalai", created: "2014-04-12T09:22:43.000000", tag:"funny"},
		    	{videoId:123124128, thumbnailUrl: "http://v.cdn.vine.co/r/thumbs/09A3C5DE421066696727559610368_2030826c6d4.0.1.15422060476568592004.mp4.jpg?versionId=e7wmTWh4iN.bX10bSFL6xbbODgEYhOSZ", permalink: "https://vine.co/v/MJzdUBr03mb", username: "Funny Guyz 4", description: "Punjabi will understand.. *...* #funny #rasmalai", created: "2014-04-12T09:22:43.000000", tag:"funny"},
		    	{videoId:123124129, thumbnailUrl: "http://v.cdn.vine.co/r/thumbs/09A3C5DE421066696727559610368_2030826c6d4.0.1.15422060476568592004.mp4.jpg?versionId=e7wmTWh4iN.bX10bSFL6xbbODgEYhOSZ", permalink: "https://vine.co/v/MJzdUBr03mb", username: "Funny Guyz 5", description: "Punjabi will understand.. *...* #funny #rasmalai", created: "2014-04-12T09:22:43.000000", tag:"funny"},
		    	{videoId:1231241210, thumbnailUrl: "http://v.cdn.vine.co/r/thumbs/09A3C5DE421066696727559610368_2030826c6d4.0.1.15422060476568592004.mp4.jpg?versionId=e7wmTWh4iN.bX10bSFL6xbbODgEYhOSZ", permalink: "https://vine.co/v/MJzdUBr03mb", username: "Funny Guyz 6", description: "Punjabi will understand.. *...* #funny #rasmalai", created: "2014-04-12T09:22:43.000000", tag:"funny"},
		    	{videoId:12312412412, thumbnailUrl: "http://v.cdn.vine.co/r/thumbs/09A3C5DE421066696727559610368_2030826c6d4.0.1.15422060476568592004.mp4.jpg?versionId=e7wmTWh4iN.bX10bSFL6xbbODgEYhOSZ", permalink: "https://vine.co/v/MJzdUBr03mb", username: "Funny Guyz 7", description: "Punjabi will understand.. *...* #funny #rasmalai", created: "2014-04-12T09:22:43.000000", tag:"funny"},
		    	{videoId:123124124435, thumbnailUrl: "http://v.cdn.vine.co/r/thumbs/09A3C5DE421066696727559610368_2030826c6d4.0.1.15422060476568592004.mp4.jpg?versionId=e7wmTWh4iN.bX10bSFL6xbbODgEYhOSZ", permalink: "https://vine.co/v/MJzdUBr03mb", username: "Funny Guyz 8", description: "Punjabi will understand.. *...* #funny #rasmalai", created: "2014-04-12T09:22:43.000000", tag:"funny"},
		    	{videoId:123124124456, thumbnailUrl: "http://v.cdn.vine.co/r/thumbs/09A3C5DE421066696727559610368_2030826c6d4.0.1.15422060476568592004.mp4.jpg?versionId=e7wmTWh4iN.bX10bSFL6xbbODgEYhOSZ", permalink: "https://vine.co/v/MJzdUBr03mb", username: "Funny Guyz 10", description: "Punjabi will understand.. *...* #funny #rasmalai", created: "2014-04-12T09:22:43.000000", tag:"funny"}]};
		    $(firstVideos.records).each(function(){
		    	$('.wrapper').append('<div class="item" id="' + this.videoId + '"><div class="thumbnail" style="background: url('+ this.thumbnailUrl +')"><a href="#"></a></div><div class="title">' + this.username + '</div><div class="time">' + timeShortener(this.created) + '</div><div class="description">' + this.description + '</div></div>');
		    	vines.push(this);
		    });
		    $('.thumbnail').click(function(){
		 		$('.modal').show(250);	
		 		var videoId = $(this).parent().attr('id');
		 		$.grep(vines, function (item) {
   					if(item.videoId == videoId){
   						vineCounter = vines.indexOf(item);
		    			changeVine(item, vineCounter);
   					}
				});	 		
		 	});
		 	$('.background').click(function(){
		 		$('.modal').hide(250);
		 		$('body').css('overflow', 'visible');
		 	});
	    }
	});
	function timeShortener(time){
		return moment(time.replace(/-/g,"/").replace(/[TZ]/g," ").replace('.000000', ''), "YYYY/MM/DD HH:mm:ss").fromNow().replace(' ago', '').replace('hours', 'h').replace('hour', 'h').replace('days', 'd').replace('day', 'd').replace('minutes', 'm').replace('minutes', 'm').replace('minute', 'm').replace('seconds', 's').replace('second', 's');
	}
	function changeVine(vine, vineCounter){
   		$('.modal > .content > .video').html('<iframe class="vine-embed" src="' + vine.permalink + '/embed/simple?audio=1" width="550" height="550" frameborder="0"></iframe><script async src="https://platform.vine.co/static/scripts/embed.js" charset="utf-8"></script>');
		$('.modal > .content > .info > .title').html(vine.username);
		$('.modal > .content > .info > .description').html(vine.description);
		$('.modal > .content > .info > .time').html(timeShortener(vine.created));
		$('.modal > .content > .info > .share > .permalink').attr("href", (vine.permalink));
		$('body').css('overflow', 'hidden');
		if(vineCounter <= 0){
			$('.modal > .content > .previous').hide(0);
		}
		else {
			$('.modal > .content > .previous').show(0);
		}
		if(vineCounter == (vines.length - 1)){
			$('.modal > .content > .next').hide(0);
		}
		else{
			$('.modal > .content > .next').show(0);
		}
	}
});