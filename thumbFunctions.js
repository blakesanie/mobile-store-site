$(document).on("mousedown", ".clickOff", function() {
  //clickedOff($(this), e);
  fadeOut($(this));
});

$(document).on("mousedown", ".item", function() {
  fadeIn($(this));
});

$(document).on("touchstart", ".clickOff", function() {
  //clickedOff($(this), e);
  fadeOut($(this));
});

$(document).on("touchstart", ".item", function() {
  fadeIn($(this));
});

/*$(document).on("mousedown", "#clickAllOff", function() {
  fadeOutAllExcept(-1);
});

$(document).on("touchstart", "#clickAllOff", function() {
  fadeOutAllExcept(-1);
});*/

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
  var index = element.index;
  fadeOutAllExcept(index);
  element.find(".shade").css({ opacity: 1, "pointer-events": "auto" });
}

function fadeOutAllExcept(index) {
  $(".item").each(function(i) {
    if (i != index) {
      fadeOut($(this).find(".clickOff"));
    }
  });
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
