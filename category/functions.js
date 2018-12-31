var params;
$(document).ready(function() {
  var url = window.location.href;
  var segments = url
    .split("?")
    .join(",")
    .split("=")
    .join(",")
    .split("&")
    .join(",")
    .split(",")
    .slice(1);
  params = {};
  for (var i = 0; i < segments.length; i += 2) {
    params[segments[i]] = segments[i + 1];
  }
  params.page = parseInt(params.page);
  console.log(params);
  $("h5").text("Page " + params.page);
  $("h3").text(params.title.split("_").join(" "));
  if (params.page == 1) {
    $("#prev").addClass("disabled");
    $("#first").addClass("disabled");
  }
  $(document).attr("title", params.title.split("_").join(" "));
});

$("#first").click(function() {
  goToPage(1);
});
$("#last").click(function() {
  goToPage(1);
});
$("#prev").click(function() {
  goToPage(params.page - 1);
});
$("#next").click(function() {
  goToPage(params.page + 1);
});

function goToPage(num) {
  window.location.href =
    "./index.html?name=" +
    params.name +
    "&title=" +
    params.title +
    "&page=" +
    num;
}
