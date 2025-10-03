//psuedo code
//User enters Stock symbol fetch stock quote

// Main DOM Elements
const API_KEY = 'd3g0lihr01qqbh54ls30d3g0lihr01qqbh54ls3g';
const button = document.getElementById('search-button');
const userSearch = document.getElementById('api-search');
const currentPrice = document.getElementById('current-price');
const percentChange= document.getElementById('percent-change');
const highPrice= document.getElementById('high-price');
const lowPrice = document.getElementById('low-price');
const openPrice = document.getElementById('open-price');
const previousClose = document.getElementById('previous-close');

button.addEventListener('click', fetchQuote);

function fetchQuote() {
  const symbolInput = userSearch.value.trim().toUpperCase();

  if (!symbolInput) {
    alert('Please enter a stock symbol.');
    return;
  }

  const url = `https://finnhub.io/api/v1/quote?symbol=${symbolInput}&token=${API_KEY}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data);

      if (!data.c || data.c === 0 || data.c === null) {
        alert('Invalid or unavailable stock symbol.');
        return;
      }
    currentPrice.innerText = `Current Price: $${data.c.toFixed(2)}`;
    percentChange.innerText = `Change: ${data.dp.toFixed(2)}%`
    highPrice.innerText = `High Price of the day: $${data.h.toFixed(2)}`
    lowPrice.innerText = `Low Price of the day: $${data.l.toFixed(2)}`
    openPrice.innerText = `Open Price of the day: $${data.o.toFixed(2)}`
    previousClose.innerText = `Previous close price: $${data.pc.toFixed(2)}`
    })

    .catch(err => {
      console.log(`Error: ${err}`);
      alert('Failed to load data. Try entering a valid stock symbol.');
    });

  const logoUrl = `https://img.logokit.com/ticker/${symbolInput}?token=pk_frd846182a3e8c4a07b70c`;

  const logoImg = document.getElementById("stock-logo");

  logoImg.src = logoUrl;

  logoImg.onerror = function () { //Error fallback. Looked up on stack overflow and Google AI overview.
    alert("Logo not found for this symbol.");
    logoImg.src = "img/stock-icon.png"; // fallback or default image
};

}


// Citation:
// Stack overflow - https://stackoverflow.com/questions/34097560/react-js-replace-img-src-onerror 
// Referenced from Tutorial - https://www.youtube.com/watch?v=b5rjEW-_6po 

