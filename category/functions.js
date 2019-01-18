var sortFields = ["name", "name", "price", "price"];
var sortOrders = ["1", "-1", "1", "-1"];
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
    title: "Gadgets" //default
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

var productsLoaded = false;
var lastPage;
function loadProducts() {
  $("#thumbContainer").empty();
  $("#thumbContainer").append("<div class='loading'></div");
  var url =
    "https://mobile-store-blakesanie.herokuapp.com/getProductsByCat?category=" +
    params.name;
  if (params.name == "gifts") {
    url = "https://mobile-store-blakesanie.herokuapp.com/getGifts/";
  }
  url +=
    "&sortBy=" +
    sortFields[params.sort] +
    "&order=" +
    sortOrders[params.sort] +
    "&page=" +
    params.page;
  $.ajax({
    url: url,
    success: function(result, status, error) {
      var count = result.count;
      if (24 * params.page >= count) {
        $("#next").addClass("disabled");
        $("#last").addClass("disabled");
      }
      $(".loading").remove();
      for (var product of result.products) {
        showProduct(product);
      }
      lastPage = Math.ceil(result.count / 24);
      productsLoaded = true;
    },
    error: function(xhr, status, error) {
      console.log(error);
    }
  });
}

function showProduct(product) {
  var { name, price, amazonUrl, thumbUrl } = product;
  //console.log(amazonUrl);
  var refIndex = amazonUrl.lastIndexOf("/ref");
  if (refIndex != -1) {
    amazonUrl = amazonUrl.substring(0, refIndex);
  }
  amazonUrl += "?tag=bsanie00-20";
  console.log(amazonUrl);
  $("#thumbContainer").append(
    '<div class="item"><div class="thumb" style="background-image:url(' +
      thumbUrl +
      ')"></div><div class="shade"><div class="clickOff"></div><h6 class="name">' +
      name +
      '</h6><h6 class="price">$' +
      price +
      '</h6><h6 class="view" link="' +
      amazonUrl +
      '">View</h6></div></div>'
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
  goToPage(1, params.sort);
});
$("#last").click(function() {
  goToPage(lastPage, params.sort);
});
$("#prev").click(function() {
  goToPage(params.page - 1, params.sort);
});
$("#next").click(function() {
  goToPage(params.page + 1, params.sort);
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
    goToPage(1, params.sort);
    //loadProducts();
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

function goToPage(num, sort) {
  if (productsLoaded) {
    window.location.href =
      "./index.html?" +
      "title=" +
      params.title +
      "&page=" +
      num +
      "&sort=" +
      sort;
  }
}
