var canPressView = true;

$(document).on("touchend", ".clickOff", function(e) {
  var element = $(this);
  fadeOut(element);
});

$(document).on("touchend", ".item", function(e) {
  canPressView = false;
  var element = $(this);
  fadeIn(element);
  setTimeout(function() {
    canPressView = true;
  }, 500);
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
  element.parent().css({ opacity: 0, "pointer-events": "none" });
}

function fadeIn(element) {
  var index = element.index();
  fadeOutAllExcept(index);
  var opacity = element.find(".shade").css("opacity");
  element.find(".shade").css({ opacity: 1, "pointer-events": "auto" });
}

function fadeOutAllExcept(index) {
  $(".item").each(function(i) {
    if (i != index) {
      fadeOut($(this).find(".clickOff"));
    }
  });
}

$(document).on("touchend mousedown", ".view", function(e) {
  var element = $(this);
  if (canPressView) {
    window.open(element.attr("link"), "_self");
  }
});

var $grid = $("#thumbContainer").masonry({
  itemSelector: ".item",
  gutter: 25,
  transitionDuration: "0.1s",
  columnWidth: ".item"
});

function setProductWidth() {
  var numCollumns = Math.ceil($("#thumbContainer").width() / 450);
  var width =
    ($("#thumbContainer").width() - (25 * (numCollumns - 1) + 50)) /
    numCollumns;
  $(".item").css("width", width + "px");
  console.log(width);
}

$(document).ready(function() {
  setProductWidth();
});

$(window).resize(function() {
  setProductWidth();
});

$grid.imagesLoaded().progress(function() {
  console.log("image loaded");
  $grid.masonry("layout");
});
