$(function(){
	var vines = new Array();
	var selectedVine;
	var previousVineId;
	var vineCounter = 0;
	var page = 1;
	function showVines(vinesData){
		$(vinesData.records).each(function(){
			if(this.videoId !== undefined){
		    	$('.wrapper').append('<div class="item" id="' + this.videoId + '"><div class="thumbnail" style="background: url('+ this.thumbnailUrl +')"><a href="#"></a></div><div class="title">' + this.username + '</div><div class="time">' + timeShortener(this.created) + '</div><div class="description">' + this.description + '</div></div>');
		    	vines.push(this);
		    }
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
			$('.modal > .content > .video').html('');
		});
	}		    	
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
	    if($(window).scrollTop() + $(window).height() >= ($(document).height() - 20)) {
	    	page++;
	    	$.getJSON( "/videos?page=" + page, {
		    	format: "json"
		  	})
		    .done(function( data ) {
		    	showVines(data);
		    })
		    .fail(function(){
		    	page--;
		    });
	    }
	});
	function timeShortener(time){
		return moment(time.replace(/-/g,"/").replace(/[TZ]/g," ").replace('.000000', ''), "YYYY/MM/DD HH:mm:ss").fromNow().replace(' ago', '').replace('hours', 'h').replace('hour', 'h').replace('days', 'd').replace('day', 'd').replace('minutes', 'm').replace('minutes', 'm').replace('minute', 'm').replace('seconds', 's').replace('second', 's').replace('months', 'M').replace('month', 'M').replace('years', 'y').replace('year', 'y');
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
	$.getJSON( "/videos").done(function( data ) {
    	showVines(data);
    });
});