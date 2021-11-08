
const BASE_URL = "http://numbersapi.com";
const FAV_NUMBER = 5;
let $divFacts = $('#num-facts');
// 1.Make a request to the Numbers API (http://numbersapi.com/) to get a fact about your favorite number. (Make sure you get back JSON by including the json query key, specific to this API
// json query key = ?json - http://numbersapi.com/${num}?json

async function favNumber() {
  let data = await $.getJSON(`${BASE_URL}/${FAV_NUMBER}?json`);
  console.log(data);
  $('body').append(`<p> FavNumber: ${data.text}</p>`);
}
favNumber();

// 2.Figure out how to get data on multiple numbers in a single request. Make that request and when you get the data back, put all of the number facts on the page.

const FAV_NUMBERS = [9, 21, 26];
async function favNumbers() {
  let data = await $.getJSON(`${BASE_URL}/${FAV_NUMBERS}?json`);
  console.log(data);
  $.each(data, function(k, v) {
    $('#num-facts').append(`<p>Favorite Number ${k}: ${v} </p>`);
  });  
}
favNumbers();

// 3. Use the API to get 4 facts on your favorite number. Once you have them all, put them on the page. It’s okay if some of the facts are repeats.

async function favNumberFacts() {
  let facts = await Promise.all(
    Array.from({ length: 4 }, () => $.getJSON(`${BASE_URL}/${FAV_NUMBER}?json`))
  );
  facts.forEach(data => {
    $('body').append(`<p> FavNumberFacts: ${data.text}</p>`);
  });
}
favNumberFacts();
