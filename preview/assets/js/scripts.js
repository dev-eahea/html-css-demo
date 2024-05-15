(function ($) {
  "use strict";

  var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(
    navigator.userAgent
  )
    ? true
    : false;
  var preloader = $("#preloader");
  var headerHeight = $(".header_area").innerHeight();

  $(window).on("load", function () {
    initPreloaderAnimation();
    initSmoothScrollInto($(".main_menu__nav ul li a[href^='#']"), headerHeight);
    initSmoothScrollInto($(".slicknav_nav li a[href^='#']"), headerHeight);
  });

  $(window).on("scroll", function () {
    initIsActiveMenuItem($(".main_menu__nav"));
  });

  function initPreloaderAnimation() {
    if (!isMobile) {
      setTimeout(function () {
        preloader.addClass("preloaded");
      }, 800);
      setTimeout(function () {
        preloader.remove();
      }, 2000);
    } else {
      preloader.remove();
    }
  }

  function initSmoothScrollInto($links, $topGap) {
    var links = $links;
    var topGap = $topGap;

    links.on("click", function () {
      if (
        location.pathname.replace(/^\//, "") ===
          this.pathname.replace(/^\//, "") &&
        location.hostname === this.hostname
      ) {
        var target = $(this.hash);
        target = target.length
          ? target
          : $("[name=" + this.hash.slice(1) + "]");
        if (target.length) {
          $("html, body").animate(
            {
              scrollTop: target.offset().top - topGap,
            },
            1000,
            "easeInOutExpo"
          );
          return false;
        }
      }
      return false;
    });
  }

  function initIsActiveMenuItem($links) {
    var top = $(window).scrollTop(),
      windowHeight = $(window).height(),
      documentHeight = $(document).height(),
      cur_pos = top + 2,
      sections = $("section"),
      nav = $links,
      nav_height = nav.outerHeight(),
      home = nav.find(" > ul > li:first");

    sections.each(function () {
      var top = $(this).offset().top - nav_height - 40,
        bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        nav.find("> ul > li > a").parent().removeClass("active");
        nav
          .find("a[href='#" + $(this).attr("id") + "']")
          .parent()
          .addClass("active");
      } else if (cur_pos === 2) {
        nav.find("> ul > li > a").parent().removeClass("active");
        home.addClass("active");
      } else if ($(window).scrollTop() + windowHeight > documentHeight - 400) {
        nav.find("> ul > li > a").parent().removeClass("active");
      }
    });
  }

  $("#container").imagesLoaded(function () {
    // filter items on button click
    $(".portfolio_categories").on("click", "button", function () {
      var filterValue = $(this).attr("data-filter");
      $grid.isotope({ filter: filterValue });
    });

    // init Isotope
    var $grid = $(".portfolio_items").isotope({
      itemSelector: ".masonary_col",
      percentPosition: true,
      masonry: {
        // use outer width of grid-sizer for columnWidth
        columnWidth: ".masonary_col",
      },
    });
  });

  $(".portfolio_categories button").on("click", function (event) {
    $(this).siblings(".active").removeClass("active");
    $(this).addClass("active");
    event.preventDefault();
  });

  $(".expand-img").magnificPopup({
    type: "image",
    gallery: {
      enabled: true,
    },
  });

  $(".expand-video").magnificPopup({
    type: "iframe",
    gallery: {
      enabled: true,
    },
  });

  $("ul#main_menu__ul").slicknav({
    prependTo: ".mobile_menu",
  });
})(jQuery);
