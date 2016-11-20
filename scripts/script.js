$(document).ready(function() {
  $.ajaxSetup({ cache: false });
  // get exact coords using javascript navigator
  // so that it loads when the user visits the page
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    var url = "https://api.darksky.net/forecast/2c98dedc19039f6cf6aeb64c502bd651/" + lat + "," + lon;
    // call to the google api to find the exact city
    var url_city = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lon + "&key=AIzaSyCs290tz0-h_Q36IDAH2kuWfKeQnQIKH6c";
    $.getJSON(url_city, function(response) {
        console.log(response);
        var city = response.results[1].formatted_address;
        $(".city").html("<h5>" + city + "</h5>");
    });
    // ajax call to the darksky api
      $.ajax({
       url: url,
       dataType: "jsonp",
       success: function (response) {
         // for displaying purpose
         console.log(response);
         // weather summary
         var summary1 = response.currently.summary;
         $(".summary1").html("<h3>" + summary1 + "</h3>");
         var temperature1 = response.currently.temperature;
         // var humidity
         var humidity1 = response.currently.humidity * 100;
         $(".humidity1").html("<p>" + humidity1 + "</p>");
         // make them celcius
         temperature1 = Math.round((temperature1 - 32) * (5/9));
         $(".temperature1").html(temperature1 + "&deg");
         // icon
         var icon1 = response.currently.icon;
         chooseIcon(icon1, temperature1, 5);
         // array to save the days
         var week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
         var day = new Date();
         for (var i = 0; i < 3; i++) {
           // summary
           // weather icon
           var icon = response.daily.data[i].icon;
           // temperature
           var temperature = response.daily.data[i].temperatureMax;
           temperature = Math.round((temperature - 32) * (5/9));
           // date
           chooseIcon(icon, temperature, i);
         }

       }
   });
});

}
  // choose icon function according the weather
  function chooseIcon(icon,temperature, num) {
      if(num == 0) {
        var selector = ".weather-icon2";
        var selector1 = ".summary2";
        $(".temperature2").html(temperature + "&deg");
      }
      else if(num == 1) {
        var selector = ".weather-icon3";
        var selector1 = ".summary3";
        $(".temperature3").html(temperature + "&deg");
      }
      else if(num == 2){
        var selector = ".weather-icon4";
        var selector1 = ".summary4";
        $(".temperature4").html(temperature + "&deg");
      }
      else {
        var selector = ".weather-icon1";
      }

      switch (icon) {
        case "clear-day":
          $(selector).html("<i class='wi wi-day-sunny'></i>");
          $(selector1).html("<h3>Sunny</h3>");
          break;
        case "clear-night":
          $(selector).html("<i class='wi wi-night-clear'></i>");
          $(selector1).html("<h3>Clear</h3>");
          break;
        case "rain":
          $(selector).html("<i class='wi wi-day-rain'></i>");
          $(selector1).html("<h3>Rainy</h3>");
          break;
        case "snow":
          $(selector).html("<i class='wi wi-day-snow'></i>");
          $(selector1).html("<h3>Snowy</h3>");
          break;
        case "sleet":
          $(selector).html("<i class='wi wi-day-sleet-storm'></i>");
          $(selector1).html("<h3>Sleet</h3>");
          break;
        case "wind":
          $(selector).html("<i class='wi wi-day-windy'></i>");
          $(selector1).html("<h3>Windy</h3>");
          break;
        case "fog":
          $(selector).html("<i class='wi wi-day-fog'></i>");
          $(selector1).html("<h3>Fog</h3>");
          break;
        case "cloudy":
          $(selector).html("<i class='wi wi-day-cloudy'></i>");
          $(selector1).html("<h3>Cloudy</h3>");
          break;
        case "partly-cloudy-day":
          $(selector).html("<i class='wi wi-day-cloudy'></i>");
          $(selector1).html("<h3>Partly Cloudy</h3>");
          break;
        case "partly-cloudy-night":
          $(selector).html("<i class='wi wi-night-cloudy'></i>");
          $(selector1).html("<h3>Partly Cloudy</h3>");
          break;
      }
  }
  // end of chooseIcon function
});
