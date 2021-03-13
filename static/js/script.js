
$(function(){
	var setFilter = $('#filterBtn'),
	filterBtn = setFilter.find('a'),
	btnAll = $('.allItem'),
	setList = $('#filterList'),
	filterList = setList.find('li'),
	listWidth = filterList.outerWidth();

	filterBtn.click(function(){
		if(!($(this).hasClass('active'))){
			var filterClass = $(this).attr('class');

			filterList.each(function(){
				if($(this).hasClass(filterClass)){
					$(this).css({display:'block'}).stop().animate({width:listWidth},1500);
					$(this).find('*').stop().animate({opacity:'1'},1500);
				} else {
					$(this).find('*').stop().animate({opacity:'0'},1000);
					$(this).stop().animate({width:'0'},1000,function(){
						$(this).css({display:'none'});
					});
				}
			});
			filterBtn.removeClass('active');
			$(this).addClass('active');
		}
	});

	btnAll.click(function(){
		filterList.each(function(){
			$(this).css({display:'block'}).stop().animate({width:listWidth},1500);
			$(this).find('*').stop().animate({opacity:'1'},1500);
		});
	});

});
