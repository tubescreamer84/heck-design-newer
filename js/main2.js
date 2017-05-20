var scrolled;
var winScroll = 0;
var locked = false
  ,timeout;
window.addEventListener('wheel', MouseWheelEvent);


$(document).ready(function(){

$('.owl-carousel').owlCarousel({
    items:1,
});

    if(! $('html').hasClass('cssvwunit')){
        headerHeight();
    }
    $('.scroll-down').click(function(){
        $('html, body').animate({
            scrollTop: $("#about").offset().top - $('header').outerHeight()
        }, 1000);
    });

    //SCROLL FUNCTION
$('.menu  li').click(function(e){
	e.preventDefault();
	// console.log('click');
	//console.log($(this).attr('data-section'));
	// $('.overlay').addClass('hide');

	// $('.overlay.show').addClass('previous');
	// $('.previous').addClass('show2');
	var data = e.target.getAttribute('data-section');
     if($(this).attr('data-section') == 'home'){
       $('.menu li').removeClass('active');
       $(this).addClass('active');
     	$('.overlay').removeClass('show');
     	// history.pushState(data,null,'/heck-design3');
     	$('.menu').removeClass('background');
	 }else{
		  $('.overlay').removeClass('show');
      $('.menu li').removeClass('active');
      $(this).addClass('active');
    //   console.log($(this).children('a').attr('data-section'));
     	$('.overlay.'+$(this).children('a').attr('data-section')).addClass('show');
     	// history.pushState(data,null,data);
     	$('.menu').addClass('background');
     }
	 
 


	// $('.overlay').removeClass('show2');
	// $('.overlay').removeClass('previous');
  
});


    //On Arrow press
  $('html').keydown(function(e){
    //console.log(e);

    if(e.key == 'ArrowDown' /*|| e.keyCode == '39'*/){
    //  console.log('Arrow Down');
      scrollMe('down');
    }else if(e.key == 'ArrowUp' /*|| e.keyCode == '37'*/){
     // console.log('Arrow Up');
      scrollMe('up');
    }

  });

    /*

    $('.menu a').click(function(e){
         e.preventDefault();
       
        if($(this).attr('data-section') == 'home'){
            scrollMe('home');
              $('li.active').removeClass('active');
            $('.home').parent('li').addClass('active');
        }else{
            $('li.active').removeClass('active');
        $(this).parent('li').addClass('active');
        scrollMe($(this).attr('data-section')); 
        }
    });

    */

    $('a.details').click(function(e){
        // console.log('click');
        e.preventDefault();
        $(this).siblings('.more-info').slideToggle();
    });

    $('.mobile-button').click(function(){
        $('header').toggleClass('show');

    });

    $('.over').addClass('fade');

});

/*

$('html').bind('mousewheel DOMMouseScroll', function (e) {
    var delta = (e.originalEvent.wheelDelta || -e.originalEvent.detail);
    var distance = e.originalEvent.wheelDeltaX;
    var timer = 250;
    // console.log('Distance: '+distance)
    // console.log(delta);

    if(locked === true){
    //   return false;
    }

    // locked = true;

    if (delta < -30) {
         //console.log('You scrolled down');
        //  scrollMe('down');
        
      //   $('.overlay').removeClass('show');
     	// $('.about').addClass('show');
     	// history.pushState('about',null,'about');
     	// $('.menu').addClass('background');
     	// $('a.about').addClass('active');
         
    } else if (delta > 10) {
        // scrollMe('up');
        // console.log('You scrolled up');
   //      $('a.about').removeClass('active');
			// $('.overlay').removeClass('show');
   //   	history.pushState('',null,'/heck-design3');
   //   	$('.menu').removeClass('background');
        timer = 750;
    }

    clearTimeout(timeout)
    timeout = setTimeout(function(){
      //unlock
    //   locked = false;
    },timer)
    // console.log(timer);
});

*/

    //END SCROLL FUNCTION



/*
$(window).scroll(function(){
    scrolled = jQuery(window).scrollTop();
   if($(window).scrollTop() > 0){
       $('body').addClass('scrolling');
   }else{
       $('body').removeClass('scrolling');
   }

   parallax();

   $('menu')
   .on("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd",
   function(e){

    });

});

*/

function MouseWheelEvent(e){
    console.log('Delta: '+e.deltaY);
    var yDir = e.deltaY;
    var xDir = e.deltaX;
    // console.log('Movement: '+e.movementY);
    var timer = 1000;
    if(locked === true){
        return false;
        console.log('locked');
    }

    locked = true;

    if(yDir > 0){
        scrollMe('down');
        console.log('not locked');
    }else if(yDir <= -1){
        scrollMe('up');
        // timer = 750;
    }

    clearTimeout(timeout);
    timeout = setTimeout(function(){
        locked=false;
    },timer);
    


}

$(window).resize(function(){
    if(! $('html').hasClass('cssvwunit')){
        headerHeight();
    }
});

$(window).load(function(){
      if(! $('html').hasClass('cssvwunit')){
        headerHeight();
    }
});

/*
function scrollMe(element){
    if(element == 'home'){
        $('html, body').animate({
            scrollTop: 0
        }, 700);
        $('header').removeClass('show');
    }else{
        $('html, body').animate({
            scrollTop: $('#'+ element).offset().top - $('header').outerHeight()
        }, 700);
        $('header').removeClass('show');
    }
}
*/

/*
function parallax(element){
 if(jQuery(window).width() > 768){
		window.requestAnimationFrame(function() {
			var scrolled2 = .75-(scrolled/500);
			var parH = scrolled/3;
			parH = parH.toFixed();
			jQuery('.jumbotron').css('transform', 'translate3d(0, ' + parH +'px, 0)').addClass('parallax');
			
		});
	}
}
*/
function headerHeight(){
    $('.jumbotron').height($(window).height());
}


function scrollMe(direction){
  var active = $('.active');
  // console.log(active);
  if (direction == 'down'){
    if($(active).next('li').length){
      $('.overlay').removeClass('show');
      $('.'+$(active).next().children('a').attr('data-section')).addClass('show');
    //   history.pushState($(active).next().attr('data-section'),null,$(active).next().attr('data-section'));
      $(active).removeClass('active');
      $(active).next().addClass('active');
      $('.menu').addClass('background');
    }
   

  }else if(direction == 'home'){
    //  history.pushState('',null,'/~Josh/heck-design3/');
     $('.menu').removeClass('background');
  }
  else{
     if($(active).prev('li').length){
       $('.overlay').removeClass('show');
       $('.'+$(active).prev().children('a').attr('data-section')).addClass('show');
       if($(active).prev().children('a').attr('data-section') == 'home'){
            // history.pushState('',null,'/~Josh/heck-design3/');
              $('.menu').removeClass('background');
       }else{
        // history.pushState($(active).prev().children('a').attr('data-section'),null,$(active).prev().attr('data-section'));
       }
       
       $(active).removeClass('active')
       $(active).prev().addClass('active');
     }


  }
    if($('.overlay').hasClass('show')){
    // console.log('josh');
    $('body').removeClass('front-page');
  }else{
    $('body').addClass('front-page');
  }


}
