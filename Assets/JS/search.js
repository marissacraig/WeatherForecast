var APIkey = "86707fd4df8f2cf8af0a8d6009a2bee9";

var cityNameEl = $('#cityName');
var searchBtnEl = $('#searchBtn');
var weatherEl = $('#weatherContainer');
var todaysWeatherEl = $('#todaysWeather');


//api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
//api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history

var formSubmitHandler = function (event) {
    event.preventDefault();
  
    var cityName = cityNameEl.value.trim();
  
    if (cityName) {
      getWeather(cityName);
  
      weatherEl.textContent = '';
      cityName.value = '';
    } else {
      alert('Please enter a City Name');
    }
  };
  
  var getCoordinates = function (cityName) {
    var apiUrl = 'api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=1&appid=' + APIkey;
    
    fetch(apiUrl)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            console.log(data)
            for (var i = 0; i < data.length; i++) {
              var lat = data[i] + '/' + repos[i].name;
            getWeather();
        }});
        } else {
          alert('Error: ' + response.statusText);
        }
      })
      .catch(function (error) {
        alert('Unable to obtain weather');
      });
  };

  var getWeather = function () {
    
    var coordinateUrl = 'api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + APIkey;
    
    fetch(coordinateUrl)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            displayWeather(data);
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
      .catch(function (error) {
        alert('Unable to obtain weather');
      });
  };
  
  var displayWeather = function (repos, searchTerm) {
    if (repos.length === 0) {
      todaysWeatherEl.textContent = 'No repositories found.';
      return;
    }
  
    repoSearchTerm.textContent = searchTerm;
  
    for (var i = 0; i < repos.length; i++) {
      var repoName = repos[i].owner.login + '/' + repos[i].name;
  
      var repoEl = document.createElement('div');
      repoEl.classList = 'list-item flex-row justify-space-between align-center';
  
      var titleEl = document.createElement('span');
      titleEl.textContent = repoName;
  
      repoEl.appendChild(titleEl);
  
      var statusEl = document.createElement('span');
      statusEl.classList = 'flex-row align-center';
  
      if (repos[i].open_issues_count > 0) {
        statusEl.innerHTML =
          "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + ' issue(s)';
      } else {
        statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
      }
  
      repoEl.appendChild(statusEl);
  
      repoContainerEl.appendChild(repoEl);
    }
  };
  
  searchBtnEl.addEventListener('submit', formSubmitHandler);
  

// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

