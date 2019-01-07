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
  params = {
    title: "Accessories" //default
  };
  for (var i = 0; i < segments.length; i += 2) {
    params[segments[i]] = segments[i + 1];
  }
  params.page = parseInt(params.page) || 1;
  console.log(params);

  $("h5").text("Page " + params.page);
  $("h3").text(params.title.split("_").join(" "));
  if (params.page == 1) {
    $("#prev").addClass("disabled");
    $("#first").addClass("disabled");
  }
  $(document).attr("title", params.title.split("_").join(" "));

  loadProducts();
});

function loadProducts() {
  var category = params.name;

  $.ajax({
    url:
      "https://mobile-store-blakesanie.herokuapp.com/getProductsByCat/" +
      category,
    success: function(result, status, error) {
      console.log(result);
      for (var product of result) {
        showProduct(product);
      }
    },
    error: function(xhr, status, error) {
      console.log(error);
    }
  });
}

function showProduct(product) {
  var { name, price, amazonUrl, thumbUrl } = product;
  console.log(thumbUrl);
  $("#thumbContainer").append(
    '<div class="item"><div class="thumb" style="background-image:url(' +
      thumbUrl +
      ')"></div><div class="shade"><h6 class="name">' +
      name +
      '</h6><h6 class="price">$' +
      price +
      '</h6><a href="' +
      amazonUrl +
      '" target="_blank"><h6 class="view">View</h6></a></div></div>'
  );
  /*$("#thumbContainer").waitForImages(
    function() {
      alert("All images have loaded.");
    },
    function(loaded, count, success) {
      $(this).css("opacity", "1");
    }
);
<img src="' +
  thumbUrl +
  '"/>
<div class="loading"></div>
*/
}

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
