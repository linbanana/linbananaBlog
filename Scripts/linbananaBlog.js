/* footer */
var d = new Date();
document.getElementById("footer").innerText = d.getFullYear();
/* footer */

/* filterBtn */
$(function(){
  var setFilter = $('#filterBtn'),
  filterBtn = setFilter.find('a'),
  btnAll = $('.allItem'),
  setList = $('#filterList'),
  filterList = setList.find('li'),
  listWidth = filterList.outerWidth('100%');

  filterBtn.click(function(){
    if(!($(this).hasClass('active'))){
      var filterClass = $(this).attr('class');

      filterList.each(function(){
        if($(this).hasClass(filterClass)){
          $(this).css({display:'block'}).stop().animate({width:listWidth},1500);
          $(this).find('*').stop().animate({opacity:'1'},1500);
        } else {
          $(this).find('*').stop().animate({opacity:'0'},1000);
          $(this).stop().animate({width:'100%'},1000,function(){
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
/* filterBtn */

/*facebook*/
(function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) return;
	js = d.createElement(s); js.id = id;
	js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.0";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
/*facebook*/

/* navbar scroll functions */
$(window).scroll(function(e) {

    // add/remove class to navbar when scrolling to hide/show
    var scroll = $(window).scrollTop();
    if (scroll >= 100) {
        $('.navbar').addClass("navbar-hide");
    } else {
        $('.navbar').removeClass("navbar-hide");
    }

});
/* navbar scroll functions */

/*click navbar-toggler then .dropdown-content hide*/
$('.navbar-toggler').on('click', function(){
    $('.dropdown-content').collapse('hide');
});
/*click navbar-toggler then .dropdown-content hide*/

/* search */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

function searchFunction() {
    var input, filter, cards, cardContainer, h2, title, ul, li, a, i;
    input = document.getElementById("key-in");
    filter = input.value.toUpperCase();
    cardContainer = document.getElementById("article");
    cards = cardContainer.getElementsByClassName("card");
    for (i = 0; i < cards.length; i++) {
        title = cards[i].querySelector(".card-body h2.card-title");
        if (title.innerText.toUpperCase().indexOf(filter) > -1) {
            cards[i].style.display = "";
        } else {
            cards[i].style.display = "none";
        }
    }
  div = document.getElementById("myDropdown");
  a = div.getElementsByTagName("a");
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}
/* search */

/* Follow */
function Followfunction() {
  var x = document.getElementById('follow');
  if (x.style.display === 'none') {
    x.style.display = 'block';
  } else {
    x.style.display = 'none';
  }
}
/* Follow */


