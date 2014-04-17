$(function(){
	var vines = new Array();
	var selectedVine;
	var previousVineId;
	var vineCounter = 0;
	var page = 1;
	var videoToShowOnStart = 0;
	function showVines(vinesData, onload){
		$(vinesData.records).each(function(){
			if(this.videoId !== undefined){
		    	$('.wrapper').append('<div class="item" id="' + this.videoId + '"><div class="thumbnail" style="background: url('+ this.thumbnailUrl +')"><a href="#!/' + this._id + '"></a></div><div class="title">' + this.username + '</div><div class="time">' + timeShortener(this.created) + '</div><div class="description">' + this.description + '</div></div>');
		    	vines.push(this);
		    	if(window.location.hash) {
					var video = window.location.hash.substring(1).replace('!/','');
					if(this._id == video){
						videoToShowOnStart = this.videoId;
					}	
				}
				vineCounter++;
		    }
		});
		$('.thumbnail').click(function(){
			var videoId = $(this).parent().attr('id');
			showModal(videoId);
		});
		$('.background').click(function(){
			$('.modal').hide(250);
			$('body').css('overflow', 'visible');
			$('.modal > .content > .video').html('');
		});
		if(window.location.hash && onload){
			showModal(videoToShowOnStart);
		}
	}
	function showModal(videoId){
		$('.modal').show(250);	
			$.grep(vines, function (item) {
   				if(item.videoId == videoId){
   					vineCounter = vines.indexOf(item);
		  			changeVine(item, vineCounter);
   				}
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
		    	if(data.length > 0){
			    	showVines(data, false);
			    }
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
		window.location.hash = '#!/' + vine._id;
		$('meta[name=og\\:url]').attr('content', window.location);
		$('meta[name=og\\:title]').attr('content', vine.username);
		$('meta[name=og\\:description]').attr('content', vine.description);
		$('meta[name=og\\:image]').attr('content', vine.thumbnailUrl);
		//$('#fblike').attr('href', window.location);
		//$('.twitter > iframe').attr('src', 'http://platform.twitter.com/widgets/tweet_button.html?url=' + window.location + '&amp;title=paign&amp;text=' + vine.description + '&amp;count=horizontal');
		//$.getScript("http://platform.twitter.com/widgets.js"); 
	}
	function updateTwitterValues(share_url, title) {
		// clear out the <a> tag that's currently there...probably don't really need this since you're replacing whatever is in there already.
		  $('#twitter-share-section').html('&nbsp;'); 
		  $('#twitter-share-section').html('<a href="https://twitter.com/share?url=http://report.karbonat.com/bolmalzemos" class="twitter-share-button" data-url="' + share_url +'" data-size="large" data-text="' + title + '" data-count="none">Tweet</a>');
		twttr.widgets.load();
	}
	$.getJSON( "/videos").done(function( data ) {
    	showVines(data, true);
    });
});