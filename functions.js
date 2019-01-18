$(document).scroll(function() {
  var y = $(document).scrollTop();
  var height = $(window).height();
  if (y > 60) {
    $("#cover").css({
      height: Math.max(height - y, 0) + "px",
      "margin-top": Math.min(y - 60, height) + "px"
    });
    $("h3").css({
      opacity: 1 - (y / height) * 1.2
    });
  } else {
    $("#cover").css({
      height: height - 60 + "px",
      "margin-top": 0
    });
    $("h3").css({
      opacity: 1
    });
  }
});
