/*BOTON*/

$(document).ready(function () {
  $(".button").click(function () {
    $("body, html").animate(
      {
        scrollTop: "0px",
      },
      300
    );
  });
  $(window).scroll(function () {
    if ($(this).scrollTop() > 0) {
      $(".button").slideDown(300);
    } else {
      $(".button").slideUp(300);
    }
  });
});

/*GALERIA*/

const main_img = document.querySelector(".main_img");
const thumbnails = document.querySelectorAll(".thumbnail");

thumbnails.forEach((thumb) => {
  thumb.addEventListener("click", function () {
    const active = document.querySelector(".active");
    active.classList.remove("active");
    this.classList.add("active");
    main_img.src = this.src;
  });
});

/*2da muestra*/

$(".images img").click(function () {
  $(this).addClass("zoom");
});

$(".images img").mouseleave(function () {
  $(this).removeClass("zoom");
});

/* zoom titulo  */

$(document).ready(function () {
  var $main = $(".content__main"),
    $mainImg = $main.find("#img_cover"),
    $bool = false,
    $win = $(window),
    $widthImg = $mainImg.width(),
    $heightImg = $mainImg.height(),
    positionFunc = function (e) {
      return (
        (x = e.pageX - $main.offset().left), (y = e.pageY - $main.offset().top)
      );
    },
    zoomIn = function (e) {
      positionFunc(e);
      $mainImg
        .animate(
          {
            left: -x,
            top: -y,
            width: $widthImg * 2.01,
            height: $heightImg * 2.01,
          },
          200,
          function () {
            $main.bind("mousemove", function (e) {
              positionFunc(e);
              $mainImg.css({
                left: -x,
                top: -y,
              });
            });
          }
        )
        .css({
          cursor: "zoom-out",
        });
      $bool = true;
    },
    zoomOut = function () {
      $mainImg
        .animate(
          {
            left: 0,
            top: 0,
            width: $widthImg,
            height: $heightImg,
          },
          100
        )
        .css({
          cursor: "",
        });
      $main.unbind("mousemove");
      $bool = false;
    };

  $main
    .bind("mousedown", function (e) {
      if ($bool !== true) {
        zoomIn(e);
        $main.css({
          height: $heightImg,
        });
      } else {
        zoomOut();
        $main.css({
          height: $(this).height(),
        });
      }
    })
    .bind("mouseout", function () {
      zoomOut();
    });

  $win.scroll(function () {
    if ($bool) {
      zoomOut();
    }
  });
});
