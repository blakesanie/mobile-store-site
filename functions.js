$("h2:nth-of-type(1)").click(function() {
  showCategories();
});

$("#cover")
  .not("h2:nth-of-type(1)")
  .click(function() {
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
