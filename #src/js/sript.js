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
