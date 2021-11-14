/* eslint-disable */
import { getData } from "./getData";

const suggestionsOverlay = document.querySelector(".suggestions__overlay");
const $region = document.querySelector("#region");
const $area = document.querySelector("#area");
const $settlement = document.querySelector("#settlement");
const $street = document.querySelector("#street");
const $house = document.querySelector("#house");
const $postalCode = document.querySelector("#postal_code");

const [...suggestions] = document.querySelectorAll(".suggestions");
const [...inputData] = document.querySelectorAll(".input__data");
const suggestionsRegion = document.querySelector(".suggestions-region");
const suggestionsArea = document.querySelector(".suggestions-area");
const suggestionsSettlement = document.querySelector(".suggestions-settlement");
const suggestionsStreet = document.querySelector(".suggestions-street");
const suggestionsHouse = document.querySelector(".suggestions-house");

let currInput;
const location = {
  region: {
    id: "",
    isReady: false,
  },
  area: {
    id: "",
    isReady: false,
  },
  city: {
    id: "",
  },
  settlement: {
    id: "",
    isReady: false,
  },
  street: {
    id: "",
    isReady: false,
  },
  house: {
    id: "",
    isReady: false,
  },
};

$region.addEventListener("input", regionOnChange);
$area.addEventListener("input", areaOnChange);
$settlement.addEventListener("input", settlementOnChange);
$street.addEventListener("input", streetOnChange);
$house.addEventListener("input", houseOnChange);
suggestionsRegion.addEventListener("click", suggestionPicked);
suggestionsArea.addEventListener("click", suggestionPicked);
suggestionsSettlement.addEventListener("click", suggestionPicked);
suggestionsStreet.addEventListener("click", suggestionPicked);
suggestionsHouse.addEventListener("click", suggestionPicked);

async function regionOnChange(e) {
  const result = await getData(this.value, "region", "region");
  location.region.isReady = false;
  currInput = e.target;
  selectManager(result.suggestions, suggestionsRegion);
}

async function areaOnChange(e) {
  if (!location.region.isReady) {
    const result = await getData($region.value, "region", "region");
    if (result.suggestions.length) {
      const [firstPick] = result.suggestions;
      location.region.id = firstPick.data.region_fias_id;
      location.region.isReady = true;
      
    }
  }
  const result = await getData(this.value, "area", "area", location);
  location.area.isReady = false;
  currInput = e.target;
  selectManager(result.suggestions, suggestionsArea);
}

async function settlementOnChange(e) {
  if (!location.region.isReady || !location.area.isReady) {
    const result = await getData($region.value + $area.value, "region", "area");
    if (result.suggestions.length) {
      const [firstPick] = result.suggestions;
      location.region.id = firstPick.data.region_fias_id;
      location.area.id = firstPick.data.area_fias_id;
      location.region.isReady = true;
      location.area.isReady = true;
    }
  }
  const result = await getData(this.value, "city", "settlement", location);
  location.settlement.isReady = false;
  currInput = e.target;
  selectManager(removeNonCity(result.suggestions), suggestionsSettlement);
}

async function streetOnChange(e) {
  if (
    !location.region.isReady ||
    !location.area.isReady ||
    !location.settlement.isReady
  )
    return;

  const result = await getData(this.value, "street", "street", location);
  location.street.isReady = false;
  currInput = e.target;
  selectManager(result.suggestions, suggestionsStreet);
}

async function houseOnChange(e) {
  if (
    !location.region.isReady ||
    !location.area.isReady ||
    !location.settlement.isReady
  )
    return;
  if (location.settlement.isCity && !location.street.isReady) return;

  const result = await getData(this.value, "house", "house", location);
  location.house.isReady = false;
  currInput = e.target;
  selectManager(result.suggestions, suggestionsHouse);
}

function removeNonCity(suggestions) {
  return suggestions.filter(function (suggestion) {
    return (
      suggestion.data.fias_level !== "5" && suggestion.data.fias_level !== "65"
    );
  });
}

function selectManager(suggestions, suggestionsDOM) {

  const selectOptions = suggestions.map((sug) => {
    if (currInput.id === "settlement") {
      console.log(sug)
      if (!sug.data[`settlement_with_type`]) return sug.data[`city_with_type`];
      return sug.data[`settlement_with_type`];
    }
    if (currInput.id === "house") return sug.value;
    return sug.data[`${currInput.id}_with_type`];
  });
  suggestionsDOM.classList.add("active");
  suggestionsOverlay.classList.add("active");

  function renderOption(content, text, index) {
    const option = document.createElement("div");
    option.classList.add("suggestion__option");

    //
    const currId = suggestions[index].data[`${currInput.id}_fias_id`];

    if (currInput.id === "settlement" && !currId)
      option.id = suggestions[index].data[`city_fias_id`];
    else option.id = currId;

    option.textContent = text;
    content.append(option);
  }

  (function insertSelectOptions() {
    suggestionsDOM.innerHTML = "";
    selectOptions.map((option, index) =>
      renderOption(suggestionsDOM, option, index)
    );
  })();
}

function suggestionPicked(e) {
  if (e.target.classList.contains("suggestion__option")) {
    const pickedOption = e.target.textContent;
    currInput.value = pickedOption;
    //
    location[currInput.id].id = e.target.id;
    location[currInput.id].isReady = true;

    this.classList.remove("active");
    suggestionsOverlay.classList.remove("active");
  }
}

suggestionsOverlay.addEventListener("click", () => {
  suggestions.map((sug) => sug.classList.remove("active"));
  suggestionsOverlay.classList.remove("active");
});

inputData.map((inp) =>
  inp.addEventListener("click", (e) => {
    if (currInput && e.target.id === currInput.id) return;
    suggestions.map((sug) => sug.classList.remove("active"));
    suggestionsOverlay.classList.remove("active");
  })
);
