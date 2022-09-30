"use strict";

$(document).ready(function () {

  // if (!$.cookie('disclaimer') || $.cookie('disclaimer') !== '1') {
  //   window.location = "/disclaimer.html";
  //   return false;
  // } else if (!$.cookie('terms') || $.cookie('terms') !== '1') {
  //   window.location = "/terms.html";
  //   return false;
  // }

  var myLazyLoad = new LazyLoad({
    elements_selector: ".lazy",
    load_delay: 300
  });

  $(window).scroll(function () {
    if ($(this).scrollTop() > 30) {
      $('.mobile__menu').addClass('scroll');
      $('.js-menu-top').addClass('scroll');
    } else {
      $('.mobile__menu').removeClass('scroll');
      $('.js-menu-top ').removeClass('scroll');
    }
  });
  
  var sectionIds = $('.js-menu');

  $(document).on('load scroll', function(){
      sectionIds.each(function(){

          var container = $(this).attr('href');
          var containerOffset = $(container).offset().top;
          var containerHeight = $(container).outerHeight();
          var containerBottom = containerOffset + containerHeight;
          var scrollPosition = $(document).scrollTop();
  
          if(scrollPosition < containerBottom - 20 && scrollPosition >= containerOffset - 20){
              $(this).addClass('active');
          } else{
              $(this).removeClass('active');
          }
  
  
      });
  });


  $('.js-checkbox').styler();
  
  $('.js-burger').click(function(e){
    e.preventDefault();
    $('.js-lang-mobile').removeClass('active').closest('.langs').find('.langs__list').slideUp();
    if ($(this).hasClass('active')) {
      $('.js-langs-drop').hide()
      // $('.js-user-drop').hide()
      $('.js-mobile-drop, .js-user-drop, .js-inner-menu').hide()
      $(this).removeClass('active')
      $(this).find('.fa').addClass('fa-burger').removeClass('fa-close')
      $('body').removeAttr('style')
    } else {
      $('.js-mobile-drop').fadeIn()
      $(this).addClass('active')
      $(this).find('.fa').removeClass('fa-burger').addClass('fa-close')
      $('body').css('overflow', 'hidden')
    }
  })
  

});

