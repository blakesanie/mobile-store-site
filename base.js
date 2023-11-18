$("#nav a:nth-of-type(2)").click(function() {
  showCategories();
});

$("body > *:not(#header)").click(function() {
  console.log("hide");
  hideCategories();
}); // does this even work?

$("#categories #cancel").click(function() {
  hideCategories();
});

$(document).click(function(e) {
  if (e.clientY > 120) {
    hideCategories();
  }
});

function showCategories() {
  $("#categories").css({
    display: "flex",
    opacity: 1
  });
  $("#header").css({
    "background-color": "rgba(255,255,255,0.7)"
  });
}

function hideCategories() {
  $("#categories").css({
    opacity: 0
  });
  $("#header").css({
    // "background-color": "transparent"
  });
  setTimeout(function() {
    $("#categories").css({
      display: "none"
    });
  }, 200);
}
