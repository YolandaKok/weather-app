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
          // for displaying perpose
          console.log(data);
          // weather summary
          var summary = data.currently.summary;
          $(".summary1").html("<h3>" + summary + "</h3>");
          var temperature1 = data.currently.temperature;
          // make them celcius
          temperature1 = Math.round((temperature1 - 32) * (5/9));
          $(".temperature1").html(temperature1 + "&deg");
          // icon
          var icon = data.currently.icon;
          switch (icon) {
            case "clear-day":
              $.(".weather-icon1").html("<i class='wi wi-day-sunny'></i>");
              break;
            case "clear-night":
              $.(".weather-icon1").html("<i class='wi wi-night-clear'></i>");
              break;
            case "rain":
              $.(".weather-icon1").html("<i class='wi'></i>");
              break;
            case "snow":
              $.(".weather-icon1").html("<i class='wi'></i>");
              break;
            case "sleet":
              $.(".weather-icon1").html("<i class='wi'></i>");
              break;
            case "wind":
              $.(".weather-icon1").html("<i class='wi'></i>");
              break;
            case "fog":
              $.(".weather-icon1").html("<i class='wi'></i>");
              break;
            case "cloudy":
              $.(".weather-icon1").html("<i class='wi wi-day-cloudy'></i>");
              break;
            case "partly-cloudy-day":
              $.(".weather-icon1").html("<i class='wi'></i>");
              break;
            case "partly-cloudy-night":
              $.(".weather-icon1").html("<i class='wi wi-night-cloudy'></i>");
              break;

          }
        }
    });

  });

});
