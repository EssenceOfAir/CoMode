// burger

$(document).ready(function () {
  $('.header__burger').click(function (event) {
    $('.header__burger,.nav__wrapper').toggleClass('active');
    $('body').toggleClass('lock');
    $('.content').toggleClass('blur');
    $('.burger__layer').toggleClass('burger__layer-active');
  });
});
$(document).ready(function () {
  $('.burger__layer').click(function (event) {
    $('.header__burger,.nav__wrapper').toggleClass('active');
    $('body').toggleClass('lock');
    $('.content').toggleClass('blur');
    $('.burger__layer').toggleClass('burger__layer-active');
  });
});

// main-slider

$(document).ready(function () {
  $('.main-slider').slick({
    arrows: false,
    autoplay: true
  });
});

// collection-slider

$(document).ready(function () {
  $('.collection__slider').slick({
    arrows: false,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 4,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });
});


// popular-slider

$(document).ready(function () {
  $('.popular__slider').slick({
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 4,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          autoplaySpeed: 5000,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          autoplaySpeed: 5000,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          autoplaySpeed: 5000,
          slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });
});

// da

"use strict";

(function () {
  let originalPositions = [];
  let daElements = document.querySelectorAll('[data-da]');
  let daElementsArray = [];
  let daMatchMedia = [];
  //Заполняем массивы
  if (daElements.length > 0) {
    let number = 0;
    for (let index = 0; index < daElements.length; index++) {
      const daElement = daElements[index];
      const daMove = daElement.getAttribute('data-da');
      if (daMove != '') {
        const daArray = daMove.split(',');
        const daPlace = daArray[1] ? daArray[1].trim() : 'last';
        const daBreakpoint = daArray[2] ? daArray[2].trim() : '767';
        const daDestination = document.querySelector('.' + daArray[0].trim())
        if (daArray.length > 0 && daDestination) {
          daElement.setAttribute('data-da-index', number);
          //Заполняем массив первоначальных позиций
          originalPositions[number] = {
            "parent": daElement.parentNode,
            "index": indexInParent(daElement)
          };
          //Заполняем массив элементов 
          daElementsArray[number] = {
            "element": daElement,
            "destination": document.querySelector('.' + daArray[0].trim()),
            "place": daPlace,
            "breakpoint": daBreakpoint
          }
          number++;
        }
      }
    }
    dynamicAdaptSort(daElementsArray);

    //Создаем события в точке брейкпоинта
    for (let index = 0; index < daElementsArray.length; index++) {
      const el = daElementsArray[index];
      const daBreakpoint = el.breakpoint;
      const daType = "max"; //Для MobileFirst поменять на min

      daMatchMedia.push(window.matchMedia("(" + daType + "-width: " + daBreakpoint + "px)"));
      daMatchMedia[index].addListener(dynamicAdapt);
    }
  }
  //Основная функция
  function dynamicAdapt(e) {
    for (let index = 0; index < daElementsArray.length; index++) {
      const el = daElementsArray[index];
      const daElement = el.element;
      const daDestination = el.destination;
      const daPlace = el.place;
      const daBreakpoint = el.breakpoint;
      const daClassname = "_dynamic_adapt_" + daBreakpoint;

      if (daMatchMedia[index].matches) {
        //Перебрасываем элементы
        if (!daElement.classList.contains(daClassname)) {
          let actualIndex = indexOfElements(daDestination)[daPlace];
          if (daPlace === 'first') {
            actualIndex = indexOfElements(daDestination)[0];
          } else if (daPlace === 'last') {
            actualIndex = indexOfElements(daDestination)[indexOfElements(daDestination).length];
          }
          daDestination.insertBefore(daElement, daDestination.children[actualIndex]);
          daElement.classList.add(daClassname);
        }
      } else {
        //Возвращаем на место
        if (daElement.classList.contains(daClassname)) {
          dynamicAdaptBack(daElement);
          daElement.classList.remove(daClassname);
        }
      }
    }
    customAdapt();
  }

  //Вызов основной функции
  dynamicAdapt();

  //Функция возврата на место
  function dynamicAdaptBack(el) {
    const daIndex = el.getAttribute('data-da-index');
    const originalPlace = originalPositions[daIndex];
    const parentPlace = originalPlace['parent'];
    const indexPlace = originalPlace['index'];
    const actualIndex = indexOfElements(parentPlace, true)[indexPlace];
    parentPlace.insertBefore(el, parentPlace.children[actualIndex]);
  }
  //Функция получения индекса внутри родителя
  function indexInParent(el) {
    var children = Array.prototype.slice.call(el.parentNode.children);
    return children.indexOf(el);
  }
  //Функция получения массива индексов элементов внутри родителя 
  function indexOfElements(parent, back) {
    const children = parent.children;
    const childrenArray = [];
    for (let i = 0; i < children.length; i++) {
      const childrenElement = children[i];
      if (back) {
        childrenArray.push(i);
      } else {
        //Исключая перенесенный элемент
        if (childrenElement.getAttribute('data-da') == null) {
          childrenArray.push(i);
        }
      }
    }
    return childrenArray;
  }
  //Сортировка объекта
  function dynamicAdaptSort(arr) {
    arr.sort(function (a, b) {
      if (a.breakpoint > b.breakpoint) { return -1 } else { return 1 } //Для MobileFirst поменять
    });
    arr.sort(function (a, b) {
      if (a.place > b.place) { return 1 } else { return -1 }
    });
  }
  //Дополнительные сценарии адаптации
  function customAdapt() {
    const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  }
}());
$(function () {
  //Keep track of how many swipes
  var count = 0;
  //Enable swiping...
  $("#swipe,.burger__layer,.header").swipe({
    //Single swipe handler for left swipes
    swipeRight: function (event, direction, distance, duration, fingerCount) {
      $('.header__burger,.nav__wrapper').removeClass('active');
      $('body').removeClass('lock');
      $('.content').removeClass('blur');
      $('.burger__layer').removeClass('burger__layer-active');
    },
    //Default is 75px, set to 0 for demo so any distance triggers swipe
    threshold: 50
  });
});
$(function () {
  //Keep track of how many swipes
  var count = 0;
  //Enable swiping...
  $("#swipe,.header").swipe({
    //Single swipe handler for left swipes
    swipeLeft: function (event, direction, distance, duration, fingerCount) {
      $('.header__burger,.nav__wrapper').addClass('active');
      $('body').addClass('lock');
      $('.content').addClass('blur');
      $('.burger__layer').addClass('burger__layer-active');
    },
    //Default is 75px, set to 0 for demo so any distance triggers swipe
    threshold: 50
  });
});