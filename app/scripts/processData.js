/* eslint-disable */
import { getData } from "./getData";

const suggestionsOverlay = document.querySelector(".suggestions__overlay");
const $region = document.querySelector("#region");
const $area = document.querySelector("#area");

const [...suggestions] = document.querySelectorAll(".suggestions");
const suggestionsRegion = document.querySelector(".suggestions-region");
const suggestionsArea = document.querySelector(".suggestions-area");

const location = {
  region: {
    str: "",
    id: "",
    isReady: false
  },
  area: "",
};

$region.addEventListener("input", regionChange);
$area.addEventListener("input", areaChange);

$region.addEventListener("focusout", regionStopChanging);

async function regionChange() {
  const result = await getData(this.value, "region", "region", location);
  selectManager($region, result.suggestions, suggestionsRegion);
}

async function regionStopChanging() {
  const result = await getData(location.region.str, "region", "region", location);
  if(result.suggestions) {
    console.log(result.suggestions[0])
    console.log('here')
  }
  
}

async function areaChange() {
  const result = await getData(this.value, "area", "area", location);
  selectManager($area, result.suggestions, suggestionsArea);
}

function selectManager(currInput, suggestions, suggestionsDOM) {
  const selectOptions = suggestions.map((sug) => sug.value);
  suggestionsDOM.classList.add("active");
  suggestionsOverlay.classList.add("active");

  function renderOption(content, text) {
    const option = document.createElement("div");
    option.classList.add("suggestion__option");
    option.textContent = text;
    content.append(option);
  }

  (function insertSelectOptions() {
    suggestionsDOM.innerHTML = "";
    selectOptions.map((option) => renderOption(suggestionsDOM, option));
  })();

  suggestionsDOM.addEventListener("click", (e) => {
    if (e.target.classList.contains("suggestion__option")) {
      const pickedOption = e.target.textContent;
      currInput.value = pickedOption;
      location[currInput.id].str = pickedOption;
      suggestionsDOM.classList.remove("active");
      suggestionsOverlay.classList.remove("active");
    }
  });
}

suggestionsOverlay.addEventListener("click", () => {
  suggestions.map((sug) => sug.classList.remove("active"));
  suggestionsOverlay.classList.remove("active");
});
