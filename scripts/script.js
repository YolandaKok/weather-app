$(document).ready(function() {
  // so that it loads when the user visits the page
   $.ajaxSetup({ cache: false });
  // uses the ipinfo API

    $.getJSON("https://ipinfo.io", function(data) {
     var city = "<p class='city'>" + data.city + ", " + data.country +
         "</p>";
     $(".city").html(city);
     var location = data.loc;
       var url="https://api.darksky.net/forecast/2c98dedc19039f6cf6aeb64c502bd651/" + location;
     location = location.split(',');
     var lat = location[0];
     var lon = location[1];
     // ajax call to the darksky api
       $.ajax({
        url: url,
        dataType: "jsonp",
        success: function (data) {
          console.log(data);
          // weather summary
          var summary = data.currently.summary;
          $(".summary1").html("<h3>" + summary + "</h3>");
          var temperature = data.currently.temperature;
          // make them celcius
          temperature = Math.round((temperature - 32) * (5/9));
          $(".temperature").html(temperature + "&deg");
      }
    });

  });

});
