$(function(){
	var vines = new Array();
	var selectedVine;
	var previousVineId;
	var vineCounter = 0;
	var page = 1;
	var savedPostIds =[1062850493732347900];
	function showVines(vinesData){
		var searchedTag = $('.search > input[type=text]').val();
		$(vinesData).each(function(){
			var postId = this.postId;
		    var newVine = {videoId:postId, thumbnailUrl: this.thumbnailUrl, permalink: this.shareUrl, username: this.username, description: this.description, created: this.created, tag:searchedTag };
			var lowButton = '<input type="button" class="approve" value="Approve" onclick="approveVine(' + newVine + ')"/>';
			$.grep(savedPostIds, function (item) {
   				if(item == postId){
					lowButton = '<input type="button" class="approve delete" value="Delete" onclick="deleteVine(' + postId + '"/>';
   				}
			});
			$('.wrapper').append('<div class="item long" id="' + postId + '"><div class="thumbnail" style="background: url('+ this.thumbnailUrl +')"><a href="#"></a></div><div class="title">' + this.username + '</div><div class="time">' + timeShortener(this.created) + '</div><div class="description">' + this.description + '</div>' + lowButton + '</div>');

		    vines.push(newVine);
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
	    	getVinesFromApp();
	    }
	});
	function timeShortener(time){
		return moment(time.replace(/-/g,"/").replace(/[TZ]/g," ").replace('.000000', ''), "YYYY/MM/DD HH:mm:ss").fromNow().replace(' ago', '').replace('hours', 'h').replace('hour', 'h').replace('days', 'd').replace('day', 'd').replace('minutes', 'm').replace('minutes', 'm').replace('minute', 'm').replace('seconds', 's').replace('second', 's').replace('months', 'M').replace('month', 'M').replace('years', 'y').replace('year', 'y');
	}
	function changeVine(vine, vineCounter){
		$('.modal > .content > .info > .share').html('<input type="button" class="approve" value="Approve"/>');
		$('.modal > .content > .info > .share').click(function(){ approveVine(vine.videoId); });
		$.grep(savedPostIds, function (item) {
   			if(item == vine.videoId){
				$('.modal > .content > .info > .share').html('<input type="button" class="approve delete" value="Delete"/>');
				$('.modal > .content > .info > .share').click(function(){ deleteVine(vine.videoId); });
   			}
		});

   		$('.modal > .content > .video').html('<iframe class="vine-embed" src="' + vine.permalink + '/embed/simple?audio=1" width="550" height="550" frameborder="0"></iframe><script async src="https://platform.vine.co/static/scripts/embed.js" charset="utf-8"></script>');
		$('.modal > .content > .info > .title').html(vine.username);
		$('.modal > .content > .info > .description').html(vine.description);
		$('.modal > .content > .info > .time').html(timeShortener(vine.created));
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
	//$.getJSON( "/videos", {
    //	tags: "mount rainier",
    //	tagmode: "any",
    //	format: "json"
  	//})
    //.done(function( data ) {
    //	showVines(data);
    //});
	$('.search > input[type=button]').click(function(){
		$('.wrapper').html('<div class="header"></div>');
		page = 1;
		getVinesFromApp();
	});
	function getVinesFromApp(){
		var searchTag = $('.search > input[type=text]').val();
		$.ajax({
		   url: 'https://community-vineapp.p.mashape.com/timelines/tags/' + searchTag + '?page=' + page,
		   beforeSend: function(xhr){xhr.setRequestHeader('X-Mashape-Authorization', 'RWTkHFiTusi8nR4U7GunkwSm1IzBbxAe');},
		   success: function(data){
  				showVines(data.data.records);
		   }
		});
	}
	function approveVine(vineVideo){
		$.ajax({
			url:'/admin/videos/approve',
			type: POST,
			contentType: 'application/json',
			data: vineVideo,
			success: function(){

			}
		});
	}
	function deleteVine(videoId){
		$.ajax({
			url:'/admin/videos/delete',
			type: POST,
			data: 'videoId=' + videoId,
			success: function(){

			}
		});
	}
});