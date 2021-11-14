/* eslint-disable */

import { getData } from "./getData";

const btnSend = document.querySelector(".btn_send");
const fiasData = document.querySelector(".fias_data");
const summary = document.querySelector(".summary_container");
const summary_text = document.querySelector(".summary_text");
const postalCode = document.querySelector("#postal_code");


let suggestions;

btnSend.addEventListener("click", sendRequest);

async function sendRequest() {
  fiasData.classList.add("active");
  summary.classList.add("active");
  fiasData.textContent = ""
  const fields = {
    region: document.querySelector("#region").value,
    area: document.querySelector("#area").value,
    settlement: document.querySelector("#settlement").value,
    street: document.querySelector("#street").value,
    house: document.querySelector("#house").value,
    flat: document.querySelector("#flat").value,
  };
  const query = Object.values(fields).join(" ");
  const result = await getData(query, "region", "flat");
  suggestions = result.suggestions;
console.log(suggestions)
  summary_text.innerHTML = `По этому адресу найдено записей в ФИАС: ${
    suggestions.length >= 10 ? ">10" : suggestions.length
  } <br> ${
    suggestions.length !== 0 ? "Наиболее точная запись:" : ""
  }`;
  const dataStr = Object.entries(suggestions[0].data)
  dataStr.map((field)=> {
    const [key, value] = field
    if(value)
      fiasData.innerHTML += `${key}: ${value}<br>`
  })
  postalCode.value = suggestions[0].data.postal_code
}
