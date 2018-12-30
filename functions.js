$("h2:nth-of-type(1)").click(function() {
  showCategories();
});

$("#cover, #cancel").click(function() {
  hideCategories();
});

function showCategories() {
  $("#categories").css({
    display: "flex"
  });
  $("#categories").css({
    opacity: 1
  });
}

function hideCategories() {
  $("#categories").css({
    opacity: 0
  });
  setTimeout(function() {
    $("#categories").css({
      display: "none"
    });
  }, 200);
}

$(document).scroll(function() {
  var y = $(document).scrollTop();
  //$("h3").css("margin-top", -1 * y);
  /*if (y > 60) {
    $("#cover").css("transform", "translateY(" + (y - 60) / 2 + "px)");
    $("h3").css("margin-top", -1 * (y - 60));
}*/
});

$(".shade").click(function() {
  $(this).css({ opacity: 0, "pointer-events": "none" });
});

$(".cat").click(function() {
  var opacity = $(this)
    .find(".shade")
    .css("opacity");
  if (opacity == 0) {
    $(this)
      .find(".shade")
      .css({ opacity: 1, "pointer-events": "auto" });
  }
});

$(".cat").hover(
  function() {
    $(this)
      .find(".shade")
      .css({
        opacity: 1,
        "pointer-events": "auto"
      });
  },
  function() {
    $(this)
      .find(".shade")
      .css({
        opacity: 0,
        "pointer-events": "none"
      });
  }
);
