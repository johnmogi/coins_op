"use strict";
const body = document.querySelector("body");
const stage = document.getElementById("stage");
const div = "<div>";
const card = "<div class='card'>";
const divEnd = "</div>";

const coinsUrl = "https://api.coingecko.com/api/v3/coins/list";
let coinChoose = "https://api.coingecko.com/api/v3/coins/";

const myRequest = new Request(coinsUrl);

const coinArr = [];
// const coinDOM = [];
const chosenCoin = [];

async function fetchCoins() {
  try {
    let res = await fetch(coinsUrl);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}
async function getCoins() {
  let coins = await fetchCoins();
  coins.forEach((element) => {
    coinArr.push(element);
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
async function draw() {
  stage.innerHTML = "";
  let box = "";
  coinArr.forEach((coin) => {
    let coinDOM = `
    <div class="card column is-3">
    ${coin.id}</br>
    ${coin.name}</br>
    ${coin.symbol}
    </div>
    `;
    box += coinDOM;

    // stage.innerHTML += div + card + coinDOM + divEnd + divEnd;
  });
  box = `<div class="columns is-multiline bulma-overlay-mixin">${box}</div>`;
  // populate the physical arr in iteretion:
  stage.innerHTML = box;
  // draw the arr on stage
}

$(async () => {
  let hold = await getCoins(); // this just postpones to the fetch big call
  await draw();
});

// search click:
// chooseCoin("01coin");
// console.log(chosenCoin);
