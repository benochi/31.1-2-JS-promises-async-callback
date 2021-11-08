$(function() {
  const BASE_URL = 'https://deckofcardsapi.com/api/deck';

  // 1. Make a request to the Deck of Cards API to request a single card from a newly shuffled deck. Once you have the card, console.log the value and the suit (e.g. “5 of spades”, “queen of diamonds”).

  async function draw() {
    let data = await $.getJSON(`${BASE_URL}/new/draw/`); //gets card
    let { suit, value } = data.cards[0]; //pulls first card suit and value from response
    console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`); 
  }
  draw();
  /* 2. Make a request to the deck of cards API to request a single card from a newly shuffled deck. Once you have the card, make a request to the same API to get one more card from the same deck.
    Once you have both cards, console.log the values and suits of both cards. */

  async function oneDeck() {
    let cardData = await $.getJSON(`${BASE_URL}/new/draw/`);
    let deckId = cardData.deck_id;
    let secondCardData = await $.getJSON(`${BASE_URL}/${deckId}/draw/`);
    [cardData, secondCardData].forEach(card => {  
      let { suit, value } = card.cards[0];
      console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
    });
  }
  oneDeck();
  /* 3. Build an HTML page that lets you draw cards from a deck. When the page loads, go to the Deck of Cards API to create a new deck, and show a button on the page that will let you draw a card. 
  Every time you click the button, display a new card, until there are no cards left in the deck. */

  async function newDeck() {
    let $btn = $('button');
    let $cardArea = $('#card-area');

    let deckData = await $.getJSON(`${BASE_URL}/new/shuffle/`); //get new deck
    console.log(deckData);
    $btn.show().on('click', async function() {
      let cardData = await $.getJSON(`${BASE_URL}/${deckData.deck_id}/draw/`);
      let cardImg = cardData.cards[0].image;
      let angle = Math.random() * 90 - 45;
      let randomX = Math.random() * 40 - 20;
      let randomY = Math.random() * 40 - 20;
      $cardArea.append( //add card image to page, add tranform value to rotate cards. 
        $('<img>', {
          src: cardImg,
          css: {
            transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
          }
        })
      );
      if (cardData.remaining === 0) $btn.remove();
    });
  }
  newDeck();
});
