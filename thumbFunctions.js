/*$(document).on("mousedown", ".clickOff", function(e) {
  fadeOut($(this));
});

$(document).on("mousedown", ".item", function(e) {
  fadeIn($(this));
});*/

$(document).ready(function() {});

$(document).on("touchend", ".clickOff", function(e) {
  var element = $(this);
  fadeOut(element);
  element
    .parent()
    .find(".amazonUrl")
    .css({
      "pointer-events": "none"
    });
});

$(document).on("touchend", ".item", function(e) {
  var element = $(this);
  element
    .parent()
    .find(".amazonUrl")
    .css({
      "pointer-events": "none"
    });
  fadeIn(element);
  setTimeout(function() {
    element.find(".amazonUrl").css({
      "pointer-events": "auto"
    });
  }, 500);
});

/*$(document).on("mousedown", "#clickAllOff", function() {
  fadeOutAllExcept(-1);
});*/
$(document).on("touchend", "#clickAllOff", function() {
  fadeOutAllExcept(-1);
});

$(document).on("mouseleave", ".shade", function() {
  fadeOut($(this).find(".clickOff"));
});
$(document).on("mouseenter", ".item", function() {
  fadeIn($(this));
});

function fadeOut(element) {
  element.parent().css({ opacity: 0, "pointer-events": "none" });
}

function fadeIn(element) {
  var index = element.index();
  fadeOutAllExcept(index);
  var opacity = element.find(".shade").css("opacity");
  if (opacity < 1) {
    element.find(".shade").css({ opacity: 1, "pointer-events": "auto" });
  }
}

function fadeOutAllExcept(index) {
  $(".item").each(function(i) {
    if (i != index) {
      fadeOut($(this).find(".clickOff"));
    }
  });
}
