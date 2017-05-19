var winScroll = 0;
var locked = false
  ,timeout;
$(document).ready(function(){



$('.menu  li').click(function(e){
	e.preventDefault();
	console.log('click');
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
      console.log($(this).attr('data-section'));
     	$('.overlay.'+$(this).attr('data-section')).addClass('show');
     	// history.pushState(data,null,data);
     	$('.menu').addClass('background');
     }
	 


	// $('.overlay').removeClass('show2');
	// $('.overlay').removeClass('previous');
  
});
$('.over').addClass('fade');
  $('.scroll-down').click(function(){
    scrollMe('down');
    //console.log('click');
  });

  $('.scroll-up').click(function(){
    scrollMe('up');
    //console.log('click');
  });

  $('.logo a').click(function(){
    scrollMe('home');
  });

  //On Arrow press
  $('html').keydown(function(e){
    //console.log(e);

    if(e.key == 'ArrowDown' || e.keyCode == '39'){
     // console.log('Arrow Down');
      scrollMe('down');
    }else if(e.key == 'ArrowUp' || e.keyCode == '37'){
     // console.log('Arrow Up');
      scrollMe('up');
    }

  });


 jQuery('.details').click(function(e){
  		e.preventDefault();
  		jQuery(this).siblings('.more-info').slideToggle();
  });

$(window).onpopstate = function(event) {
	//console.log('pop2');
  //console.log("location: " + document.location + ", state: " + JSON.stringify(event.state));
};

window.addEventListener('popstate', function(e) {
  // e.state is equal to the data-attribute of the last image we clicked
 // console.log('pop');
});


$(".overlay")
.on("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd",
 function(e){
 	//console.log(e);

 	// $('overlay').each
 	if(!$('.overlay').hasClass('show')){
		// $(this).addClass('hidden');
	}
    // do something here
    ///$('.overlay.hidden').hide();
   // $(this).off(e);
 });



});

// $('html').on ('mousewheel', function (e) {
//     var delta = e.originalEvent.wheelDelta;

//     if (delta < 0) {
//         console.log('You scrolled down');
//         $('.overlay').removeClass('show');
//      	$('.about').addClass('show');
//      	history.pushState('about',null,'about');
//      	$('.menu').addClass('background');
//      	$('a.about').addClass('active');
//     } else if (delta > 0) {
//         console.log('You scrolled up');
//         $('a.about').removeClass('active');
// 			$('.overlay').removeClass('show');
//      	history.pushState('',null,'/heck-design3');
//      	$('.menu').removeClass('background');
//     }
// });



$('html').bind('mousewheel DOMMouseScroll', function (e) {
    var delta = (e.originalEvent.wheelDelta || -e.originalEvent.detail);
    console.log(delta);

    if(locked === true){
      return false;
    }

    locked = true;

    if (delta < 0) {
         //console.log('You scrolled down');
         scrollMe('down');
        
      //   $('.overlay').removeClass('show');
     	// $('.about').addClass('show');
     	// history.pushState('about',null,'about');
     	// $('.menu').addClass('background');
     	// $('a.about').addClass('active');
    } else if (delta > 0) {
        scrollMe('up');
        // console.log('You scrolled up');
   //      $('a.about').removeClass('active');
			// $('.overlay').removeClass('show');
   //   	history.pushState('',null,'/heck-design3');
   //   	$('.menu').removeClass('background');
    }

    clearTimeout(timeout)
    timeout = setTimeout(function(){
      //unlock
      locked = false;
    },1200)
});


function scrollMe(direction){
  var active = $('.active');
  // console.log(active);
  if (direction == 'down'){
    if($(active).next('li').length){
      $('.overlay').removeClass('show');
      $('.'+$(active).next().attr('data-section')).addClass('show');
      // history.pushState($(active).next().attr('data-section'),null,$(active).next().attr('data-section'));
      $(active).removeClass('active');
      $(active).next().addClass('active');
      $('.menu').addClass('background');
    }
   

  }else if(direction == 'home'){
     history.pushState('',null,'/~Josh/heck-design3/');
     $('.menu').removeClass('background');
  }
  else{
     if($(active).prev('li').length){
       $('.overlay').removeClass('show');
       $('.'+$(active).prev().attr('data-section')).addClass('show');
       if($(active).prev().attr('data-section') == 'home'){
            // history.pushState('',null,'/~Josh/heck-design3/');
              $('.menu').removeClass('background');
       }else{
        // history.pushState($(active).prev().attr('data-section'),null,$(active).prev().attr('data-section'));
       }
       
       $(active).removeClass('active')
       $(active).prev().addClass('active');
     }


  }
    if($('.overlay').hasClass('show')){
    console.log('josh');
    $('body').removeClass('front-page');
  }else{
    $('body').addClass('front-page');
  }


}




$(window).load(function(){
	// $('.overlay.show').addClass('previous');
});

$(window).scroll(function(e){
	// var ts = $(this).scrollTop();
	// if(ts > winScroll){
	// 	console.log('down scroll');
	// 	$('.overlay').removeClass('show');
 //     	$('.about').addClass('show');
 //     	history.pushState('about',null,'about');
 //     	$('.menu').addClass('background');

	// }else{
	// 	console.log('up scroll');
	// 		$('.overlay').removeClass('show');
 //     	history.pushState('',null,'/heck-design3');
 //     	$('.menu').removeClass('background');
	// }
	// winScroll = ts;
});