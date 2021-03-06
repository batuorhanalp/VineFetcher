var vines;
$(function(){
	vines = new Array();
	savedVines = new Array();
	var selectedVine;
	var previousVineId;
	var vineCounter = 0;
	var page = 1;
	var savedPostIds;
	var baseUrl = '/bolmalzemos';
	function showSavedVines(vinesData){
		$(vinesData.records).each(function(){
			if(this.videoId !== undefined){
				var lowButton = '<input type="button" class="approve delete" value="Delete"/>';
				$('.wrapper').append('<div class="item long" id="' + this.videoId + '"><div class="thumbnail" style="background: url('+ this.thumbnailUrl +')"><a href="#"></a></div><div class="title">' + this.username + '</div><div class="time">' + timeShortener(this.created) + '</div><div class="description long">' + this.description + '</div>' + lowButton + '</div>');
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
		setAdminEvents();
	}	
	function showVines(vinesData){
		$.getJSON(baseUrl + "/admin/video/ids").done(function(data) {
    		savedPostIds = data;
			var searchedTag = $('.search > input[type=text]').val();
			$(vinesData).each(function(){
				var postId = this.postId;
		    	var newVine = {videoId:postId, thumbnailUrl: this.thumbnailUrl, permalink: this.shareUrl, username: this.username, description: this.description, created: this.created, tag:searchedTag };
				var lowButton = '<input type="button" id="' + vines.length + '" class="approve" value="Approve"/>';
				$.grep(savedPostIds, function (item) {
   					if(item == postId){
						lowButton = '<input type="button" class="approve delete" value="Delete"/>';
   					}
				});
				$('.wrapper').append('<div class="item long" id="' + postId + '"><div class="thumbnail" style="background: url('+ this.thumbnailUrl +')"><a href="#"></a></div><div class="title">' + this.username + '</div><div class="time">' + timeShortener(this.created) + '</div><div class="description long">' + this.description + '</div>' + lowButton + '</div>');

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
				$('.modal > .content > .video').html('');
			});
			setAdminEvents();
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
	    	if($('.search > input[type=text]').val() == ""){
	    			$.getJSON(baseUrl + "/videos?page=" + page, {
			    	format: "json"
			  	})
			    .done(function( data ) {
			    	if(data.records.length > 0){
			    		showSavedVines(data);
			    	}
			    })
			    .fail(function(){
			    	page--;
			    });
	    	}else {
	    		getVinesFromApp();
	    	}
	    }
	});
	function timeShortener(time){
		return moment(time.replace(/-/g,"/").replace(/[TZ]/g," ").replace('.000000', ''), "YYYY/MM/DD HH:mm:ss").fromNow().replace(' ago', '').replace('hours', 'h').replace('hour', 'h').replace('days', 'd').replace('day', 'd').replace('minutes', 'm').replace('minutes', 'm').replace('minute', 'm').replace('seconds', 's').replace('second', 's').replace('months', 'M').replace('month', 'M').replace('years', 'y').replace('year', 'y');
	}
	function changeVine(vine, vineCounter){
		var alreadySaved = $('#' + vine.videoId + ' > input[type=button]').hasClass('delete');
		if(alreadySaved){
			$('.modal > .content > .info > .share').html('<input type="button" class="approve delete" value="Delete"/>');
			$('.modal > .content > .info > .share > input[type=button]').click(function(){ deleteVineModal(vine.videoId); });
		}
		else{
			$('.modal > .content > .info > .share').html('<input type="button" class="approve" value="Approve"/>');
			$('.modal > .content > .info > .share > input[type=button]').click(function(){ approveVineModal(vine.videoId); });	
		}
   		$('.modal > .content > .video').html('<iframe class="vine-embed" src="' + vine.permalink + '/embed/simple?audio=0" width="550" height="550" frameborder="0"></iframe><script async src="https://platform.vine.co/static/scripts/embed.js" charset="utf-8"></script>');
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
	
	$('.search > input[type=button]').click(function(){
		$('.wrapper').html('<div class="header"></div>');
		vines = new Array();
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
	function approveVineModal(vineVideo){
		var selectedVine = getObjects(vines, 'videoId', vineVideo);
		var vineData = JSON.stringify(selectedVine[0]);
		if(selectedVine[0]._id != undefined){
			vineData = JSON.stringify({ videoId:selectedVine.videoId, thumbnailUrl: selectedVine.thumbnailUrl, permalink: selectedVine.shareUrl, username: selectedVine.username, description: selectedVine.description, created: selectedVine.created, tag:selectedVine.searchedTag });
		}
		$.ajax({
			url:baseUrl + '/admin/video/approve',
			type: 'POST',
			contentType: 'application/json',
			data: vineData,
			success: function(){
				$('.modal > .content > .info > .share').html('<input type="button" class="approve delete" value="Delete"/>');
				$('.modal > .content > .info > .share > input[type=button]').click(function(){ deleteVineModal(vineVideo); });
				$('#' + vineVideo + ' > input[type=button]').remove();
				$('#' + vineVideo).append('<input type="button" class="approve delete" value="Delete"/>');
				setAdminEvents();
			}
		});
	}
	function deleteVineModal(videoId){
		var selectedVine = getObjects(vines, 'videoId', videoId);
		$.ajax({
			url: baseUrl + '/admin/video/delete',
			type: 'POST',
			data: 'videoId=' + videoId,
			success: function(){
				$('.modal > .content > .info > .share').html('<input type="button" class="approve" value="Approve"/>');
				$('.modal > .content > .info > .share > input[type=button]').click(function(){ approveVineModal(videoId); });
				$('#' + videoId + ' > input[type=button]').remove();
				$('#' + videoId).append('<input type="button" id="' + vines.indexOf(selectedVine) + '" class="approve" value="Approve"/>');
				setAdminEvents();
			}
		});
	}
	function getObjects(obj, key, val) {
	    var objects = [];
	    for (var i in obj) {
	        if (!obj.hasOwnProperty(i)) continue;
	        if (typeof obj[i] == 'object') {
	            objects = objects.concat(getObjects(obj[i], key, val));
	        } else if (i == key && obj[key] == val) {
	            objects.push(obj);
	        }
	    }
	    return objects;
	}
	$.getJSON(baseUrl + "/videos").done(function(data) {
    	showSavedVines(data);
    });
    function approveVine(vineVideo, button){
		var vineData = JSON.stringify(vines[vineVideo]);
		if(vines[vineVideo]._id != undefined){
			vineData = JSON.stringify({ videoId:vines[vineVideo].videoId, thumbnailUrl: vines[vineVideo].thumbnailUrl, permalink: vines[vineVideo].shareUrl, username: vines[vineVideo].username, description: vines[vineVideo].description, created: vines[vineVideo].created, tag:vines[vineVideo].searchedTag });
		}
		$.ajax({
			url: baseUrl + '/admin/video/approve',
			type: 'POST',
			contentType: 'application/json',
			data: vineData,
			success: function(){
				var parentDiv = $(button).parent();
				$(button).remove();
				$(parentDiv).append('<input type="button" class="approve delete" value="Delete"/>');
				setAdminEvents();
			}
		});
	}
	function deleteVine(button){
		var videoId = $(button).parent().attr('id');
		$.ajax({
			url: baseUrl + '/admin/video/delete',
			type: 'POST',
			data: 'videoId=' + videoId,
			success: function(){
				$.grep(vines, function (item) {
   					if(item.videoId == videoId){
						var videoIndex = $.inArray(item, vines);
						var parentDiv = $(button).parent();
						$(button).remove();
						$(parentDiv).append('<input type="button" id="' + videoIndex + '" class="approve" value="Approve" />');
						setAdminEvents();
   					}
				});
			}
		});
	}
	function setAdminEvents(){
		$('.item > input[type=button]').each(function( index ) {
			$(this).unbind('click');
			if($(this).hasClass('delete')){
				$(this).click(function(){
					deleteVine(this);
				});
			}else{
				$(this).click(function(){
			    	var videoIndex = $(this).attr('id');
					approveVine(videoIndex, this);
				});
			}
		});
	}
});

	
