var scrolled;
var winScroll = 0;
var locked = false
  ,timeout;
// window.addEventListener('wheel', MouseWheelEvent);


$(document).ready(function(){
    headingColor();
    // sizeBody();
    /*
    $(window).on('swipedown',function(){
        console.log('swipe down');
        scrollMe('up');
    });

    $(window).on('swipeup',function(){
        console.log('swipe up');
        scrollMe('down');
    });

    $(window).on('swipeleft',function(){
        console.log('swipe left');
    });

    $(window).on('swiperight',function(){
        console.log('swipe right');
    });
*/

    $('.scroll-down').addClass('show');

    $('.owl-carousel').owlCarousel({
        items:1,
        dots:true,
        nav:true,
        loop: true,
        navText: false,
        smartSpeed:750,
        navClass: ['owl-prev icon-arrow-left','owl-next icon-arrow-right']
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

           
        $('html, body').animate({
            scrollTop: $('.'+data).offset().top
        }, 750);
        // if($(this).attr('data-section') == 'home'){
        // $('.menu li').removeClass('active');
        // $(this).addClass('active');
        //     $('.overlay').removeClass('show');
        //  history.pushState(data,null,'/heck-design3');
        //     $('.menu').removeClass('background');
        // }else{
        //     $('.overlay').removeClass('show');
        // $('.menu li').removeClass('active');
        // $(this).addClass('active');
        // //   console.log($(this).children('a').attr('data-section'));
        //     $('.overlay.'+$(this).children('a').attr('data-section')).addClass('show');
        //     history.pushState(data,null,data);
        //     $('.menu').addClass('background');
        // }
    });


    //On Arrow press
  $('html').keydown(function(e){
  
    //console.log(e);

    if(e.key == 'ArrowDown' /*|| e.keyCode == '39'*/){
            e.preventDefault
    //  console.log('Arrow Down');
      scrollMe('down');
    }else if(e.key == 'ArrowUp' /*|| e.keyCode == '37'*/){
        e.preventDefault
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
        // if( !$(this).siblings('.more-info').is(':visible')){
        //      $(this).siblings('.more-info').blur();
        // }
       
         if($(window).height() > 425){
              $(this).siblings('.more-info').slideToggle();
         }else{
             $(this).parents().siblings('.more-info.mobile').fadeToggle();
         }
        
        
    });

    $('.close').click(function(e){
        $(this).parents('.more-info').fadeToggle();
    });

    $('a.details').mouseup(function(){
        $(this).blur();
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

/*
function MouseWheelEvent(e){
    e.preventDefault();

    var yDir = e.deltaY;
    var xDir = e.deltaX;
  
    var timer = 1200;
    if(locked === true){
        return false;
        console.log('locked');
    }

    locked = true;

    if(yDir > 0){
        scrollMe('down');
    
    }else if(yDir <= -1){
        scrollMe('up');
      
    }

    clearTimeout(timeout);
    timeout = setTimeout(function(){
        locked=false;
    },timer);
    


}
*/

$(window).scroll(function(e){
    parallax();
    var wintop = $(window).scrollTop();
    var winbottom = wintop + $(window).outerHeight();
    var header = $('header').outerHeight();
    // console.log(header);
    // console.log('our work: ' + $('.our-work').offset().top);
    console.log('win-top' +  wintop);
    console.log('win-bottom' +  winbottom);
    console.log($('.our-work').offset().top);
    
    // console.log('minus header: ' + ($('.our-work').offset().top - header));
    if (wintop >= $('.about').offset().top - header && wintop < $('.our-work').offset().top - header){
        console.log('about');
        $('header').css('background-color','#a23f61');
           $('.active > a').css('color','#670124');
    }
    else if(wintop >= $('.our-work').offset().top - header && wintop < $('.contact').offset().top - header){
         $('header').css('background-color','#e4912a');
         $('.active > a').css('color','#9a5602');
       
       
    } else if(wintop >= $('.contact').offset().top - header){
         $('header').css('background-color','#C63C0D');
         $('.active > a').css('color','#8a2300');
       
       
    }else{
        $('header').css('background-color','#1DA664');
          $('.active > a').css('color','#006D39');
    }

    if (winbottom > $('.our-work').offset().top){
        // parallaxdown();
        // $('.our-work').addClass('parallaxmedown');
    }
    headingColor();
});

$(window).resize(function(){
    // if(! $('html').hasClass('cssvwunit')){
        headerHeight();
        //  sizeBody();
    // }
});

$(window).load(function(){
    //   if(! $('html').hasClass('cssvwunit')){
        headerHeight();
        //  sizeBody();
    // }
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
    // $('.jumbo-inner').height($(window).height());
    //   $('.overlay').height($(window).height());
}

// function sizeBody(){
//     $('body').height($(window).height());
// }


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


function parallax() {
    if (jQuery(window).width() > 768) {
        window.requestAnimationFrame(function() {
            var scrolled = jQuery(window).scrollTop();
            var parH = scrolled / 3;
            parH = parH.toFixed();
            jQuery('.parallaxme').css('transform', 'translate3d(0, ' + parH + 'px, 0)');
        });
    }
}

function parallaxdown() {
    // var wintop = $(window).scrollTop();
    var winbottom = wintop + $(window).outerHeight();
    if (jQuery(window).width() > 768) {
        window.requestAnimationFrame(function() {
            var scrolled = jQuery(window).scrollTop();
            var parH = scrolled / 3;
            parH = parH.toFixed();
            jQuery('.parallaxmedown').css('transform', 'translate3d(0, ' + -parH + 'px, 0)');
        });
    }
}

function headingColor(){
    var wintop = $(window).scrollTop();
    var headerHeight = $('header').outerHeight();
    console.log('abouttop ' + $('.about').offset().top);
    
    if(wintop <= headerHeight){
        $('header').addClass('transparent');
    }else if(wintop >= $('.about').offset().top - headerHeight && wintop <= $('.about').offset().top + headerHeight){
        console.log('equal');
        $('header').addClass('transparent');
    }else if(wintop >= $('.our-work').offset().top - headerHeight && wintop <= $('.our-work').offset().top + headerHeight){
        $('header').addClass('transparent');
    }else if(wintop >= $('.contact').offset().top - headerHeight  && wintop <= $('.contact').offset().top + headerHeight){
        $('header').addClass('transparent');
    }
    else{
        $('header').removeClass('transparent');
    }
}