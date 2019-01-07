var sortingAlgo = "name/1";

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
  params.name = params.title
    .replace("_", "")
    .replace("/", "")
    .toLowerCase();

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
  $("#thumbContainer").empty();
  $.ajax({
    url:
      "https://mobile-store-blakesanie.herokuapp.com/getProductsByCat/" +
      category +
      "/" +
      sortingAlgo,
    success: function(result, status, error) {
      for (var product of result.products) {
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
  $("#thumbContainer").append(
    '<div class="item"><div class="thumb" style="background-image:url(' +
      thumbUrl +
      ')"></div><div class="shade"><div class="clickOff"></div><h6 class="name">' +
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

var sortingAlgos = {
  "abc-xyz": "name/1",
  "$-$$$": "price/1",
  "$$$-$": "price/-1",
  Popular: "name/-1"
};

$("#sortingContainer li")
  .not(":eq(0)")
  .not("#cancel")
  .click(function() {
    var a = $("#sortingContainer li").eq(0);
    var b = $(this);
    var aText = a.text();
    var bText = b.text();
    sortingAlgo = sortingAlgos[bText];
    a.text(bText);
    b.text(aText);
    loadProducts();
    //closeSortingContainer(); might do this, not sure yet
  });
/*
$("#alphabetical").click(function() {
  console.log("alphabetical");
  sortingAlgo = "alphabetical";
  loadProducts();
});

$("#priceLowToHigh").click(function() {
  console.log("priceLowToHigh");
  sortingAlgo = "priceLowToHigh";
  loadProducts();
});

$("#priceHighToLow").click(function() {
  console.log("priceHighToLow");
  sortingAlgo = "priceHighToLow";
  loadProducts();
});
*/
$("#sortingContainer").hover(
  function() {
    openSortingContainer();
  },
  function() {
    closeSortingContainer();
  }
);

$("#sortingContainer #cancel").click(function() {
  closeSortingContainer();
});

function openSortingContainer() {
  $("li:nth-child(n+2)").css({
    "line-height": "30px",
    opacity: 1
  });
}

function closeSortingContainer() {
  console.log("close");
  $("li:nth-child(n+2)").css({
    "line-height": 0,
    opacity: 0
  });
}

function goToPage(num) {
  window.location.href =
    "./index.html?" + "title=" + params.title + "&page=" + num;
}
