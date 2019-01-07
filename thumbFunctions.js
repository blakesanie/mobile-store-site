$(document).on("mousedown", ".shade:not(.view)", function() {
  fadeOut($(this));
});

$(document).on("mousedown", ".item", function() {
  fadeIn($(this));
});

$(document).on("touchstart", ".shade:not(.view)", function() {
  fadeOut($(this));
});

$(document).on("touchstart", ".item", function() {
  fadeIn($(this));
});

//touchstart

//$(".item").hover(function() {}, function() {});
/*
$(document).on("mouseleave", ".shade:not(.view)", function() {
  fadeOut($(this));
});

$(document).on("mouseenter", ".item", function() {
  fadeIn($(this));
});
*/

function fadeOut(element) {
  element.css({ opacity: 0, "pointer-events": "none" });
}

function fadeIn(element) {
  var opacity = element.find(".shade").css("opacity");
  if (opacity == 0) {
    element.find(".shade").css({ opacity: 1, "pointer-events": "auto" });
  }
}
