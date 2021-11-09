const FAV_NUMBER = 5;
const BASE_URL = "http://numbersapi.com";

// 1.
$.getJSON(`${BASE_URL}/${FAV_NUMBER}?json`).then(data => {
  console.log(data);
});

// 2.
let favNumbers = [7, 11, 22];
$.getJSON(`${BASE_URL}/${favNumbers}?json`).then(data => {
  console.log(data);
});

// 3.
Promise.all(
  Array.from({ length: 4 }, () => {
    return $.getJSON(`${BASE_URL}/${FAV_NUMBER}?json`);
  })
).then(facts => {
  facts.forEach(data => $("body").append(`<p>${data.text}</p>`));
});
