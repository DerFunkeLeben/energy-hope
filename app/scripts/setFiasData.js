/* eslint-disable */

import getData from "./getData.js";
import { FIELDS } from "./constants";

const btnSend = document.querySelector(".btn_send");
btnSend.addEventListener("click", sendRequest);

async function sendRequest() {
  const suggestions = await sendAllFields();
  showSummary(suggestions);
}

async function sendAllFields() {
  const fields = {
    [FIELDS.REGION]: document.querySelector("#region").value,
    [FIELDS.AREA]: document.querySelector("#area").value,
    [FIELDS.SETTLEMENT]: document.querySelector("#settlement").value,
    [FIELDS.STREET]: document.querySelector("#street").value,
    [FIELDS.HOUSE]: document.querySelector("#house").value,
  };
  const query = Object.values(fields).join(" ");
  const result = await getData(query, FIELDS.REGION, FIELDS.HOUSE);
  const { suggestions } = result;

  return suggestions;
}

function showSummary(suggestions) {
  const fiasData = document.querySelector(".fias_data");
  const summary = document.querySelector(".summary_container");
  const summary_text = document.querySelector(".summary_text");

  fiasData.classList.add("active");
  summary.classList.add("active");
  fiasData.textContent = "";

  summary_text.innerHTML = `По этому адресу найдено записей в ФИАС: ${
    suggestions.length >= 10 ? ">10" : suggestions.length
  } <br> ${suggestions.length !== 0 ? "Наиболее точная запись:" : ""}`;
  const dataStr = Object.entries(suggestions[0].data);
  dataStr.map((field) => {
    const [key, value] = field;
    if (value) fiasData.innerHTML += `${key}: ${value}<br>`;
  });
}

export default sendAllFields;
