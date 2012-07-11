
(function($) {
	Drupal.ggp_board = {};


	Drupal.behaviors.ggp_board = {
		attach: function() {
			var settings = Drupal.settings.ggp_board;
			var fids = (settings.ids != 0) ? '&forumids='+settings.ids : '';
			if($("#latestposts").data('run') != true) {
				$.ajax({
					type: "GET",
					url: document.location.protocol+'//'+settings.board_url+'/external.php?type=js'+fids,
					dataType: "script",
					scriptCharset: 'ISO-8859-1',
					success: function(s) {
						$(threads).each(function(i, e) { 
							if (i <= settings.maxposts) {
								var latestpost = $('<a>').addClass('latestposts').attr('href', document.location.protocol+'//'+settings.board_url+'/showthread.php?t=' + e.threadid ).attr('target', '_blank');
								var wrapper = $('<span>').addClass('latestposts-wrapper'); 
								var title1 = new String();
								title1 = e.title;
								if (title1.length > 41){
										title1 = title1.slice(0,40) + "...";
								} 
								var title	 	= $('<span>')addClass('title').text(title1);	
								var date 		= $('<span>').addClass('desc').text(e.threaddate + ' um ' + e.threaddate + ' Uhr, von ' + e.poster);
								wrapper.append(title);	
								wrapper.append(date); 
								latestpost.append(wrapper);
								$("#latestposts").append(latestpost);
							}
						});
						$("#latestposts").data('run', true);
						$("#latestposts").append($('<span>').html('<a href="'+document.location.protocol+'//'+settings.board_url+'/forumdisplay.php?'+settings.more+'">Mehr...</a>')));
					}
				});
			}
		}
	}
		

})(jQuery);