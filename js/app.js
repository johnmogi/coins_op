"use strict";
const body = document.querySelector("body");
const stage = document.getElementById("stage");

const coinsUrl = "https://api.coingecko.com/api/v3/coins/list";
let coinChoose = "https://api.coingecko.com/api/v3/coins/";

// https://api.coingecko.com/api/v3/coins/

const myRequest = new Request(coinsUrl);
const fiftyCoinArr = [];
const thousandCoinArr = [];
const coinStorage = [];
const chosenCoin = [];

async function fetchCoins(url) {
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

async function getCoins(url, arr) {
  let coins = await fetchCoins(url);
  coins.forEach((element) => {
    arr.push(element);
  });
}

async function chooseCoin(id) {
  coinChoose = `${coinChoose}/${id}`;
  try {
    let res = await fetch(coinChoose);

    return chosenCoin.push(await res.json());
  } catch (error) {
    console.log(error);
  }
}

async function draw(arr) {
  stage.innerHTML = "";
  let box = "";
  arr.forEach((coin) => {
    let coinDOM = `
    <div class="card column is-3" id="coin-${coin.id}">
    <header class="card-header">
    <p class="card-header-title">
    ${coin.name}
    </p>
    <button class="card-header-icon" aria-label="more options">
      <span class="icon">
        <i class="fas fa-angle-down" aria-hidden="true"></i>
      </span>
    </button>
  </header>
    <div class="card-image container">
    <figure class="image">
      <img src="${coin.image.large}" alt="${coin.name}">
    </figure>
    </div>
 
    </div>
    `;
    box += coinDOM;
  });
  box = `<div class="columns is-1 is-multiline bulma-overlay-mixin">${box}</div>`;
  // populate the physical arr in iteretion:
  stage.innerHTML = box;
  // draw the arr on stage
}
async function buildBigStorage() {
  console.log(chosenCoin);
  //   thousandCoinArr.forEach((coin) => {
  //     chooseCoin(coin.id);
  //     coinStorage.push(coin);
  //     // console.log(chooseCoin(coin.id));
  //   });
}

$(async () => {
  let fifty = await getCoins(coinChoose, fiftyCoinArr);

  //   console.log(chosenCoin);
  await draw(fiftyCoinArr);

  let hold = await getCoins(coinsUrl, thousandCoinArr); // this just postpones to the fetch big call
  await buildBigStorage();
});

// search click:
