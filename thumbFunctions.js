var selectedIndex = -1;

$(document).on("mousedown", ".clickOff", function(e) {
  fadeOut($(this));
});

$(document).on("mousedown", ".item", function(e) {
  fadeIn($(this));
});

$(document).on("touchend", ".clickOff", function(e) {
  fadeOut($(this));
});

$(document).on("touchend", ".item", function(e) {
  fadeIn($(this));
});

$(document).on("mousedown", "#clickAllOff", function() {
  fadeOutAllExcept(-1);
});
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
  console.log("fadeout");
  element.parent().css({ opacity: 0 });
  setTimeout(function() {
    element.parent().css({ "pointer-events": "none" });
  }, 300);
}

function fadeIn(element) {
  console.log("fadein");
  var index = element.index();
  fadeOutAllExcept(index);
  element.find(".shade").css({ opacity: 1 });
  setTimeout(function() {
    element.find(".shade").css({ "pointer-events": "auto" });
  }, 50);
}

function fadeOutAllExcept(index) {
  $(".item").each(function(i) {
    if (i != index) {
      fadeOut($(this).find(".clickOff"));
    }
  });
}
