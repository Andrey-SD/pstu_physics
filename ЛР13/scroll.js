$(document).ready(function () {
  $(".site-bar").on("click", "a", function (event) {
    //отменяем стандартную обработку нажатия по ссылке
    event.preventDefault();

    //забираем идентификатор бока с атрибута href
    var id = $(this).attr('href'),

      //узнаем высоту от начала страницы до блока на который ссылается якорь
      top = $(id).offset().top;

    //анимируем переход на расстояние - top за 1500 мс
    $('body,html').animate({ scrollTop: top }, 1500);
  });
});

// $(document).ready(function () {
//   $(".button-begin").on("click", "a", function (event) {
//     //отменяем стандартную обработку нажатия по ссылке
//     // console.log();
//     if ($(this).attr('href').charAt(0) == "#") {
//       event.preventDefault();

//       //забираем идентификатор бока с атрибута href
//       var id = $(this).attr('href'),

//         //узнаем высоту от начала страницы до блока на который ссылается якорь
//         top = $(id).offset().top;

//       //анимируем переход на расстояние - top за 1500 мс
//       $('body,html').animate({ scrollTop: top }, 1500);
//     }
//   });
// });
