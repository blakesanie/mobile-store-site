/*$(document).on("mousedown", ".clickOff", function(e) {
  fadeOut($(this));
});

$(document).on("mousedown", ".item", function(e) {
  fadeIn($(this));
});*/

$(document).ready(function() {});

$(document).on("touchend", ".clickOff", function(e) {
  var element = $(this);
  fadeOut(element, true);
});

$(document).on("touchend", ".item", function(e) {
  var element = $(this);
  fadeIn(element, true);
});

/*$(document).on("mousedown", "#clickAllOff", function() {
  fadeOutAllExcept(-1);
});*/
$(document).on("touchend", "#clickAllOff", function() {
  fadeOutAllExcept(-1);
});

$(document).on("mouseleave", ".shade", function() {
  fadeOut($(this).find(".clickOff"), false);
});
$(document).on("mouseenter", ".item", function() {
  fadeIn($(this), false);
});

function fadeOut(element, mobile) {
  element.parent().css({ opacity: 0, "pointer-events": "none" });
}

function fadeIn(element, mobile) {
  var index = element.index();
  fadeOutAllExcept(index);
  var opacity = element.find(".shade").css("opacity");
  if (opacity < 1) {
    element.find(".shade").css({ opacity: 1 });
    setTimeout(function() {
      element.find(".shade").css({ "pointer-events": "auto" });
    }, mobile ? 301 : 0); //ios waits 300ms to see if double tap
  }
}

function fadeOutAllExcept(index) {
  $(".item").each(function(i) {
    if (i != index) {
      fadeOut($(this).find(".clickOff"));
    }
  });
}
