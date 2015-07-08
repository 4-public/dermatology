  /* === Navigation === */

$(document).ready(function(){
  $(document).scroll(function(){
    if($(window).width() < 640) return;
    if($(window).scrollTop() != 0){
      if($(window).width() > 768){
        $('.header').css("height", "58px");
        $('.nav-item').css("line-height", "58px");
      }
      else{
        $('.header').css("height", "43px");
        $('.nav-item').css("line-height", "43px");
      }
    }
    else{
      if($(window).width() > 768){
        $('.header').css("height", "68px");
        $('.nav-item').css("line-height", "68px");
      }
      else{
        $('.header').css("height", "50px");
        $('.nav-item').css("line-height", "50px");
      }
    }
  });

  $('.nav-btn').click(function(){
    $('.nav-menu').toggle();
   });
  $('.nav-menu').mouseleave(function(){
    if($(window).width() > 640) return;
    $(this).css('display', 'none');
  });
  $('body').click(function (e) {
    if($(window).width() > 640) return;
    var target = e.target;
    while (target != this){
      if($(target).hasClass('header')) return;
      else {
        target = target.parentNode;
        if ($(target).hasClass('header')) {
          return;
        };
      };
    };
    if($('.nav-menu').css('display') != 'none')
      $('.nav-menu').css('display', 'none');
  });
});


  /* === Feedback === */

$(document).ready(function(){
  $('.feedback-open a').click(function(e){
    e.preventDefault();
    $('.feedback-container').css("display", "block");
  });
  $('.feedback-close').click(function(){
    $('.feedback-container').css("display", "none");
  });
});

$(document).ready(function () {
  $('#form').validationEngine({
    // binded:false,
  });
});

$(document).ready(function () {
  $('#form').validationEngine();
  $('#phone').mask('+380(ii99)iii-ii-ii9',
  {
    translation: {
      '9': {pattern: /[0-9]/, optional: true},
      'i': {pattern: /[0-9]/}
    }
  });
      // Sending Feedback
  $('.send').on("click", function(e){
    e.preventDefault();
    var name = $('#name').val();
    var email = $('#email').val();
    var phone = $('#phone').val();
    var message = $('#message').val();
    var dataString = 'name=' + name + '&email=' + email + '&phone=' + phone + '&message=' + message;
    $.ajax({
      type: "POST",
      url: "app/check.php",
      data: dataString,
      success: function (response) {
        $('#feedback').html(response + "<i class='feedback-close'></i>");
      }
    });
  });
});

  /* === Lightbox === */

$(document).ready(function(){
  $('.gallery-item').click(function () {
    var src = $(this).find('img').attr("src");
    $('#light-image').html("<img src='" + src + "'/>");
    $('#lightbox').css("display", "block");
    $('#lightbox').fadeIn();

    $('#next').click(function(){
      var images = document.getElementById('photoGallery').getElementsByTagName('img');
      var i;

      for (i = 0; i < images.length-1; i++) {
        if(src === $(images[i]).attr("src")){
          if(i == images.length-1) i = -1;
          src = $(images[i + 1]).attr("src");
          break;
        }
        else{
          continue;
        }
      };
      $('#light-image').fadeOut(0);
      $('#light-image').html("<img src='" + src + "'/>");
      $('#light-image').fadeIn(500);
    });

    $('#prev').click(function(){
      var images = document.getElementById('photoGallery').getElementsByTagName('img');
      var i;

      for (i = 0; i < images.length-1; i++) {
        if(src === $(images[i]).attr("src")){
          if(i == 0) i = images.length;
          src = $(images[i - 1]).attr("src");
          break;
        }
        else{
          continue;
        }
      };
      $('#light-image').fadeOut(0);
      $('#light-image').html("<img src='" + src + "'/>");
      $('#light-image').fadeIn(500);
    });

    $('#close').click(function(){
      $('#lightbox').fadeOut(0);
    });
  });
});