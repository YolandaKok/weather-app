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
     // city
     var city = data.city;
     var country = data.country;
     $(".city").html("<h5>" + city + ", " + country + "</h5>");
     // ajax call to the darksky api
       $.ajax({
        url: url,
        dataType: "jsonp",
        success: function (response) {
          // for displaying purpose
          console.log(response);
          // weather summary
          var summary = response.currently.summary;
          $(".summary1").html("<h3>" + summary + "</h3>");
          var temperature1 = response.currently.temperature;
          // make them celcius
          temperature1 = Math.round((temperature1 - 32) * (5/9));
          $(".temperature1").html(temperature1 + "&deg");
          // icon
          var icon1 = response.currently.icon;
          chooseIcon(icon1, 5);
          // second day
          for (var i = 0; i < 3; i++) {
            var icon = response.daily.data[i].icon;
            chooseIcon(icon, i);
          }

        }
    });

  });
  // choose icon function according the weather
  function chooseIcon(icon, num) {
      if(num == 0) {
        var selector = ".weather-icon2";
      }
      else if(num == 1) {
        var selector = ".weather-icon3";
      }
      else if(num == 2){
        var selector = ".weather-icon4";  
      }
      else {
        var selector = ".weather-icon1";
      }

      switch (icon) {
        case "clear-day":
          $(selector).html("<i class='wi wi-day-sunny'></i>");
          break;
        case "clear-night":
          $(selector).html("<i class='wi wi-night-clear'></i>");
          break;
        case "rain":
          $(selector).html("<i class='wi'></i>");
          break;
        case "snow":
          $(selector).html("<i class='wi'></i>");
          break;
        case "sleet":
          $(selector).html("<i class='wi'></i>");
          break;
        case "wind":
          $(selector).html("<i class='wi'></i>");
          break;
        case "fog":
          $(selector).html("<i class='wi'></i>");
          break;
        case "cloudy":
          $(selector).html("<i class='wi wi-day-cloudy'></i>");
          break;
        case "partly-cloudy-day":
          $(selector).html("<i class='wi'></i>");
          break;
        case "partly-cloudy-night":
          $(selector).html("<i class='wi wi-night-cloudy'></i>");
          break;
      }
  }
  // end of chooseIcon function
});
