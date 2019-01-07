$(document).on("mousedown", ".clickOff", function(e) {
  //clickedOff($(this), e);
  fadeOut($(this));
});

$(document).on("mousedown", ".item", function(e) {
  fadeIn($(this));
});

$(document).on("touchstart", ".clickOff", function(e) {
  //clickedOff($(this), e);
  fadeOut($(this));
});

$(document).on("touchstart", ".item", function(e) {
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

function fadeOut(element /*, e*/) {
  element.parent().css({ opacity: 0, "pointer-events": "none" });
}

function fadeIn(element) {
  var opacity = element.find(".shade").css("opacity");
  if (opacity == 0) {
    element.find(".shade").css({ opacity: 1, "pointer-events": "auto" });
  }
}
/*
function clickedOff(element, e) {
  console.log(viewClicked(element, e));
  if (!viewClicked(element, e)) {
    fadeOut(element);
  }
}

function viewClicked(element, e) {
  var view = element.find(".view");
  var x = e.pageX;
  var y = e.pageY;
  var rect = view[0].getBoundingClientRect();
  console.log(rect);
  var X1 = rect.left;
  var Y1 = rect.top;
  var X2 = rect.right;
  var Y2 = rect.bottom;
  console.log(X1, x, X2, Y1, y, Y2);
  return x >= X1 && x <= X2 && y >= Y1 && y <= Y2;
}*/
