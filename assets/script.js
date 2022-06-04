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




