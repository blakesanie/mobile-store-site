$(document).on("mousedown", ".clickOff", function(e) {
  fadeOut($(this));
});

$(document).on("mousedown", ".item", function(e) {
  fadeIn($(this));
});

$(document).on("touchstart", ".clickOff", function(e) {
  fadeOut($(this));
});

$(document).on("touchstart", ".item", function(e) {
  fadeIn($(this));
});

$(document).on("mousedown", "#clickAllOff", function() {
  fadeOutAllExcept(-1);
});
$(document).on("touchstart", "#clickAllOff", function() {
  fadeOutAllExcept(-1);
});

$(document).on("mouseleave", ".clickOff", function() {
  fadeOut($(this));
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
  $(".item").each(function(i) {
    if (i != index) {
      fadeOut($(this).find(".clickOff"));
    }
  });
  var opacity = element.find(".shade").css("opacity");
  if (opacity == 0) {
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
