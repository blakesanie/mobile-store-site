var sortAlgos = ["name/1", "name/-1", "price/1", "price/-1"];
var sortNames = ["abc-xyz", "Popular", "$-$$$", "$$$-$"];

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
  params.sort = parseInt(params.sort) || 0;
  params.name = params.title
    .replace("/", "")
    .replace(/_/g, "")
    .toLowerCase();

  $("h5").text("Page " + params.page);
  $("h3").text(params.title.split("_").join(" "));
  if (params.page == 1) {
    $("#prev").addClass("disabled");
    $("#first").addClass("disabled");
  }
  $(document).attr("title", params.title.split("_").join(" "));

  loadProducts();
  loadSortingContainer();
});

function loadSortingContainer() {
  if (params.sort != 0) {
    var a = $("#sortingContainer li").eq(0);
    var b = $("#sortingContainer li").eq(params.sort);
    var aText = a.text();
    var bText = b.text();
    a.text(bText);
    b.text(aText);
  }
  /*var elements = [sortNames[params.sort]];
  for (var i = 0; i < 4; i++) {
    if (i != params.sort) {
      elements.push(sortNames[i]);
    }
  }
  elements = elements.map(function(item) {
    return "<li>" + item + "</li>";
  });
  var html = elements.join("") + "<li id='cancel'>Cancel</li>";
  $("#sortingContainer ul").append(html);*/
}

function loadProducts() {
  var sortAlgo = sortAlgos[params.sort];
  $("#thumbContainer").empty();
  $("#thumbContainer").append("<div class='loading'></div");
  var url =
    "https://mobile-store-blakesanie.herokuapp.com/getProductsByCat/" +
    params.name +
    "/";
  if (params.name == "gifts") {
    url = "https://mobile-store-blakesanie.herokuapp.com/getGifts/";
  }
  $.ajax({
    url: url + sortAlgo,
    success: function(result, status, error) {
      $(".loading").remove();
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

$("#sortingContainer li")
  .not(":eq(0)")
  .not("#cancel")
  .click(function() {
    var a = $("#sortingContainer li").eq(0);
    var b = $(this);
    var aText = a.text();
    var bText = b.text();
    console.log(bText);
    params.sort = sortNames.indexOf(bText);
    a.text(bText);
    b.text(aText);
    loadProducts();
    //closeSortingContainer(); might do this, not sure yet
  }); /*
$("#sortingContainer").hover(
  function() {
    openSortingContainer();
  },
  function() {
    closeSortingContainer();
  }
);*/
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
*/ $(
  "#sortingContainer"
).click(function() {
  openSortingContainer();
});

$("#thumbContainer, #header, h3").click(function() {
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
    "./index.html?" +
    "title=" +
    params.title +
    "&page=" +
    num +
    "&sort=" +
    params.sort;
}
