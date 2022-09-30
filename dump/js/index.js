"use strict";

$(document).ready(function () {
  if (!$.cookie('disclaimer') || $.cookie('disclaimer') !== '1') {
    window.location = "/disclaimer.html";
    return false;
  } else if (!$.cookie('terms') || $.cookie('terms') !== '1') {
    window.location = "/terms.html";
    return false;
  }

  var rm = {
    1: {
      'x': '21',
      'y': '15'
    },
    '2': {
      'x': '40',
      'y': '28'
    },
    '3': {
      'x': '65',
      'y': '40'
    },
    '4': {
      'x': '85',
      'y': '60'
    }
  };

  function roadMapGo(_elm) {
    var _map = $('#map'),
        _go = _elm.attr('go'),
        _to = parseInt(_elm.attr('to')),
        _x,
        _y,
        _max,
        _toChangedNext,
        _current,
        _toChangedPrev;

    _max = Object.keys(rm).length; // console.log(_max);

    if (_go == 1) {
      $('.js-roadmap-prev').removeClass('disabled');
      _current = _to + 1;

      if (_current >= 4) {
        _current = 4;
        $('.js-roadmap-next').addClass('disabled');
      } else {
        $('.js-roadmap-next').removeClass('disabled');
      }

      $('.js-roadmap-next, .js-roadmap-prev').attr('to', _current);
    } else {
      $('.js-roadmap-next').removeClass('disabled');
      _current = _to - 1;

      if (_current <= 1) {
        _current = 1;
        $('.js-roadmap-prev').addClass('disabled');
      } else {
        $('.js-roadmap-prev').removeClass('disabled');
      }

      $('.js-roadmap-next, .js-roadmap-prev').attr('to', _current);
    }

    console.log(_current);

    if ($('.js-rdp-box-' + _current).is(":hidden")) {
      _x = rm[_current].x, _y = rm[_current].y, $('.js-rdp-box').hide();
      $('.js-rdp-box-' + _current).stop(50, 50).fadeIn(150);
      $('#map').css('transform', 'translate(-' + _x + '%, ' + _y + '%) scale(0.85)');
    }
  }

  $('.js-checkbox').styler();
  $('.js-roadmap-next, .js-roadmap-prev').click(function (e) {
    e.preventDefault();
    roadMapGo($(this));
  });
  $('.js-hb-btn').click(function (e) {
    e.preventDefault();

    var _parent = $(this).closest('.js-hb');

    if (_parent.hasClass('active')) {
      _parent.removeClass('active');

      _parent.find('.js-hb-desc').slideUp();
    } else {
      _parent.addClass('active');

      _parent.find('.js-hb-desc').slideDown();
    }
  });
  $('.js-fix-r').matchHeight();
  $('.js-toggler-music').click(function (e) {
    e.preventDefault();

    if ($(this).hasClass('active')) {
      $('#soundMain').trigger('pause');
      $('#soundMain').prop('muted', true);
      $(this).removeClass('active');
    } else {
      $('#soundMain').trigger('play');
      $('#soundMain').prop('muted', false);
      $(this).addClass('active');
    }
  }); // .box transitions

  var elem = $('.section'),
      //    Контейнер, в котором будем проводить анимацию
  pos = elem.offset(),
      //    Позиция элемента
  elem_left = pos.left,
      //    Слева
  elem_top = pos.top,
      //    Сверху
  elem_width = elem.width(),
      //    Ширина элемента
  elem_height = elem.height(),
      //    Высота элемента
  x_center,
      //    Координаты центра по оси X
  y_center; //    Координаты центра по оси Y
  // https://codepen.io/yazykovdmitry/pen/dLOBrK
  // Обрабатываем событие перемещения курсора мыши

  $('.section').mousemove(function (e) {
    // Определяем центр элемента (формула легко гуглится)
    x_center = elem_width / 2 - (e.pageX - elem_left);
    y_center = elem_height / 2 - (e.pageY - elem_top); // Проходим по всем блокам с изображениями)

    $('.box').each(function () {
      var speed = $(this).attr('data-speed'),
          //    Определяем скорость 
      xPos = Math.round(-1 * x_center / 20 * speed),
          //    Высчитываем позицию по оси X, движения будут инвертированы (-1). Формула подбиралась на глаз
      yPos = Math.round(y_center / 20 * speed); //    Высчитываем позицию по оси Y
      // Перемещение по оси Y делаем до определенной точки, потом перемещение останавливаем

      if (yPos < 0) yPos = -2 * speed; // Непосредственно перенос      

      $(this).css('transform', 'translate3d(' + xPos / 3 + 'px, ' + yPos / 3 + 'px, 0px)');
    });
  }); // waves

  var wave1 = $('#feel-the-wave-1').wavify({
    height: 30,
    bones: 12,
    amplitude: 40,
    color: '#FF2772',
    speed: .15
  });
  var wave2 = $('#feel-the-wave-2').wavify({
    height: 30,
    bones: 12,
    amplitude: 40,
    color: '#9C42F5',
    speed: .15
  });
  var wave3 = $('#feel-the-wave-3').wavify({
    height: 30,
    bones: 12,
    amplitude: 40,
    color: '#5D2DE1',
    speed: .15
  });
  $(document).on('load scroll', function () {
    var containerOffset = $('#liqs').offset().top;
    var containerHeight = $('#liqs').outerHeight();
    var containerBottom = containerOffset + containerHeight;
    var scrollPosition = $(document).scrollTop();

    if (scrollPosition >= containerOffset - 300) {
      $('.js-wave-3, .js-wave-1, .js-wave-2').animate({
        top: '40%'
      }, 2000);
    }
  }); //waves 

  function FooterMenu() {
    var _menu = $('.js-footer-menu'),
        _parent = _menu.closest('.fmenu'),
        _width = document.body.clientWidth;

    if (_width < 992) {
      console.log(_width);
      $('.js-footer-menu').click(function (e) {
        e.preventDefault();

        var _menu = $(this);

        if (_menu.hasClass('active')) {
          _menu.removeClass('active');

          _menu.closest('.fmenu').find('ul').stop().slideUp();
        } else {
          // $('.fmenu ul').not(_menu.closest('.fmenu').find('ul')).hide();
          _menu.closest('.fmenu').find('ul').stop().slideDown();

          _menu.removeClass('active');

          _menu.stop().addClass('active');
        }
      });
    } else {
      $('.js-footer-menu').click(function (e) {
        e.preventDefault();
      });

      _parent.find('ul').removeAttr('style');

      $('.js-footer-menu').removeClass('active');
    }
  }

  $(window).on('load resize', function () {
    setTimeout(function () {
      FooterMenu();
    }, 100);
  }); // $('.js-burger').click(function(e){
  //   e.preventDefault();
  //   $('.js-lang-mobile').removeClass('active').closest('.langs').find('.langs__list').slideUp();
  //   if ($(this).hasClass('active')) {
  //     $('.js-langs-drop').hide()
  //     // $('.js-user-drop').hide()
  //     $('.js-mobile-drop, .js-user-drop, .js-inner-menu').hide()
  //     $(this).removeClass('active')
  //     $(this).find('.fa').addClass('fa-burger').removeClass('fa-close')
  //     $('body').removeAttr('style')
  //   } else {
  //     $('.js-mobile-drop').fadeIn()
  //     $(this).addClass('active')
  //     $(this).find('.fa').removeClass('fa-burger').addClass('fa-close')
  //     $('body').css('overflow', 'hidden')
  //   }
  // })

  $(".js-menu").click(function (e) {
    e.preventDefault();
    var link = $(this).attr('href');
    $.scrollTo(link, 300);
  });
  $(".js-mobile-scroll").click(function (e) {
    e.preventDefault();
    var link = $(this).attr('href');
    $('body').removeAttr('style');
    $('.js-mobile-drop, .js-user-drop, .js-inner-menu').hide();
    $('.js-burger').removeClass('active').find('.fa').addClass('fa-burger').removeClass('fa-close');
    $.scrollTo(link, 300);
  });
});