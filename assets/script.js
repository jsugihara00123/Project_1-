const modal = document.querySelector('#modal');
const zen = document.querySelector('.zen');
const advice = document.querySelector('.advice');

openModal();

function openModal() {
  modal.showModal();
}

zen.addEventListener('click', () => {
  modal.close();

  zenQuotes();
})
advice.addEventListener('click', () => {
  modal.close();
  
  InspirationalQuotes();
})

function zenQuotes(){
  var api_url ="https://type.fit/api/quotes";

  $.ajax({
    url: api_url,
    method: "GET"
  })
  .then(function(response){
  
    function getRandomNum (max){
      return Math.floor(Math.random() * max);
    }
    const quoteArray = JSON.parse(response);

    const randomNum = getRandomNum(1643);
    const quote = quoteArray[randomNum].text;
    const author = quoteArray[randomNum].author;
    
    $('#apiQuote').text('"' + quote + '"');
    $('#by').text("By: " + author);

    //console.log(quote);
    //console.log(author);
    //console.log(quoteArray);
  })
}

function InspirationalQuotes(){
  var api_url ="https://api.adviceslip.com/advice";

  $.ajax({
    url: api_url,
    method: "GET"
  })
  .then(function(response){
    const quoteArray = JSON.parse(response);
    const quote = quoteArray.slip.advice;
    
    $('#apiQuote').text('"' + quote + '"');
    $('#by').text("By: Unkown");

    //console.log(quote);
    //console.log(author);
    //console.log(quoteArray);
  })
}

//Background image change

//Unsplash api key and url
let unsplashApi = "BUUoDXpj5-KaqP2VUAJ4m4YodxFp8UAfbYfnAEgNjl8";
let unsplashUrl = `https://api.unsplash.com/photos/random?query=wallpaper&client_id=${unsplashApi}`;
const imageDiv = document.getElementById("unsplashImage");
//the fucntion to retrieve the data from the unsplash api using fetch
function backgroundImage() {
    fetch(unsplashUrl)
        .then(function (response) {
            return response.json();
    })
        .then(function (jsonData) {
            console.log(jsonData);
            let imageElement = document.createElement('img');
            imageElement.src = jsonData.urls.regular;
            imageDiv.append(imageElement);
            console.log(imageElement.src);
            //using jquery to set the background image
            $('#unsplashImage').css('background-image', 'url(' + imageElement.src + ')');
            $('img').css('display', 'none');
    })
}
backgroundImage();


var tableBody = document.getElementById('hourly-table');
function getCurrentWeatherApi(position) {
    var requestUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=f3c7f6f0c1bd55045c6c4f5cb473b0de&units=imperial`;
    // console.log(position)
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var currentTemp = (data.main.temp)
            var currenthWeatherHeader = document.getElementById('currentWeather');
            currenthWeatherHeader.innerHTML = `Currently ${Math.round(currentTemp)}° F`
        });
}
function getHourlyWeatherApi(position) {
    var requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lon=${position.coords.longitude}&appid=f3c7f6f0c1bd55045c6c4f5cb473b0de&units=imperial&lat=${position.coords.latitude}&exclude=minutely`;
    // console.log(requestUrl)
    fetch(requestUrl)
    .then(function (response) {
    console.log(requestUrl)
        return response.json();
    })
    .then(function (response) {
        // console.log(response)
    for (let i = 0; i <= 5; i++) {
        var currentForcastItem = response.hourly[i];
        console.log(currentForcastItem);
        var createTableRow = document.createElement('tr')
        var createTableData = document.createElement('td')
        var createTableDataTemp = document.createElement('td')
        var createTableDataWindSpeed = document.createElement('td')
        var timeText = document.createElement('p')
        var tempText = document.createElement('p')
        var windSpeed = document.createElement('p')
        let unix_timestamp = currentForcastItem.dt
        timeStamp = new Date(unix_timestamp * 1000)
        var hours = timeStamp.getHours()
        var minutes = "0" + timeStamp.getMinutes()
        var AmOrPm = hours >= 12 ? 'pm' : 'am';
        hours = (hours % 12) || 12;
        var formattedTime = hours + ':' + minutes.substr(-2) + " " + AmOrPm
        // console.log(formattedTime)
        timeText.innerHTML = formattedTime
        tempText.innerHTML = `${Math.round(currentForcastItem.temp)}° F `
        windSpeed.innerHTML = `${(currentForcastItem.wind_speed)} MPH`
        createTableData.appendChild(timeText)
        createTableDataTemp.appendChild(tempText)
        createTableDataWindSpeed.appendChild(windSpeed)
        createTableRow.appendChild(createTableData)
        createTableRow.appendChild(createTableDataTemp)
        createTableRow.appendChild(createTableDataWindSpeed)
        tableBody.appendChild(createTableRow)
    }
    })
}
function callCurrentAndHourlyWeather(position){
    getCurrentWeatherApi(position)
    getHourlyWeatherApi(position)
}
$(document).ready(function () {
    navigator.geolocation.getCurrentPosition(callCurrentAndHourlyWeather)
});

