/* eslint-disable */

import { getData } from "./getData";

const btnSend = document.querySelector(".btn_send");
const fiasData = document.querySelector(".fias_data");

btnSend.addEventListener("click", sendRequest);

async function sendRequest() {
  const fields = {
    region: document.querySelector("#region").value,
    area: document.querySelector("#area").value,
    settlement: document.querySelector("#settlement").value,
    street: document.querySelector("#street").value,
    house: document.querySelector("#house").value,
  };
  const query = Object.values(fields).join(" ");
  const result = await getData(query, "region", "house");
  fiasData.textContent = JSON.stringify(result.suggestions);
}
