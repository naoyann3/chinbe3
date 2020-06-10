'use strict'
{
  // スワイパー
  var mySwiper = new Swiper('.swiper-container', {
    loop: true,
    slidesPerView: 3,
    spaceBetween: 0,
    
    // レスポンシブブレークポイント（画面幅による設定）
    breakpoints: {
      // 画面幅が 380px までの場合（window width >= 480px）
      380: {
        slidesPerView: 1,
        spaceBetween: 10,
        centeredSlides: true
    },
    // 画面幅が 768px 以上の場合（window width >= 980px）
    768: {
      slidesPerView: 3,
      spaceBetween: 10,
      centeredSlides: true
    }
  },

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    autoplay: {
      delay: 5000,
      stopOnLastSlide: false,
      disableOnInteraction: false,
      reverseDirection: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  // アコーディオンメニュー
  $('.question-menu').on('click', (e) => {
    // hrefにページ遷移しない
    e.preventDefault();
    
    // $('.answer-menu').removeClass('active');
    $('.answer-menu').addClass('active');
    $('.answer-menu').hide();
  
    // 同じsection内のanswer-menuを選択
    const content = $(e.target)
      .closest('section')
      .find('.answer-menu');

    // .answer-menuが非表示の場合は
    if (!content.is(':visible')) {
      // 表示中のコンテンツを閉じる
      // $('.answer-menu:visible').slideUp();
  
      // クリックされたコンテンツを表示
      content.slideDown();
    }
  });

  // スムーズページ内遷移
$(function(){
  $('a[href^="#"]').click(function(){
  var headerHight = 94; //ヘッダの高さ
  var speed = 1000;
  var href= $(this).attr("href");
  var target = $(href == "#" || href == "" ? 'html' : href);
  var position = target.offset().top-headerHight;
  // var position = target.offset().top-headerHight;
  $("html, body").animate({scrollTop:position}, speed, "swing");
  return false;
  });
  });

// ハンバーガーメニュー開閉
$('#js-gnavbtn').click(function() {
  $('body').toggleClass('show');
});
$('.header-nav ul a').click(function() {
  $('body').removeClass('show');
});
$('.header-nav ul').click(function() {
  $('body').removeClass('show');
});

// googleフォーム送信完了表示
$('#form').submit(function (event) {
  var formData = $('#form').serialize();
  $.ajax({
    url: "https://docs.google.com/forms/u/0/d/e/1FAIpQLSfBy8lHO1bKjZeKAmi9L3ZhKKuT78hYCP3ae4d193L7XZSGNQ/formResponse",
    data: formData,
    type: "POST",
    dataType: "xml",
    statusCode: {
      0: function () {
        $(".end-message").slideDown();
        $(".center").fadeOut();
        //window.location.href = "thanks.html";
      },
      200: function () {
        $(".false-message").slideDown();
      }
    }
  });
  event.preventDefault();
});

// ボタンの表示／非表示を切り替える関数
const updateButton = () => {
  if ($(window).scrollTop() >= 300) {
    // 300px以上スクロールされた
    // ボタンを表示
    $('.back-to-top').fadeIn();
  } else {
    // ボタンを非表示
    $('.back-to-top').fadeOut();
  }
};

// スクロールされる度にupdateButtonを実行
$(window).on('scroll', updateButton);

// ボタンをクリックしたらページトップにスクロールする
$('.back-to-top').on('click', (e) => {
  // ボタンのhrefに遷移しない
  e.preventDefault();

  // 600ミリ秒かけてトップに戻る
  $('html, body').animate({ scrollTop: 0 }, 600);
});

// ページの途中でリロード（再読み込み）された場合でも、ボタンが表示されるようにする
updateButton();

}
