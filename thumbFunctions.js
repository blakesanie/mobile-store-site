$(".shade")
  .not(".view")
  .click(function() {
    $(this).css({ opacity: 0, "pointer-events": "none" });
  });

$(".item").click(function() {
  var opacity = $(this)
    .find(".shade")
    .css("opacity");
  if (opacity == 0) {
    $(this)
      .find(".shade")
      .css({ opacity: 1, "pointer-events": "auto" });
  }
});

$(".item").hover(
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
