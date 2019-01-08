$("#nav a:nth-of-type(2)").click(function() {
  showCategories();
});

$("body > *:not(#header)").click(function() {
  console.log("hide");
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
