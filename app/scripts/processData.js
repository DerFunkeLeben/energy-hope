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
    isReady: false,
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
  location.region.isReady = false;
  currInput = e.target;
  const result = await getData(this.value, "region", "region");
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
  if (!location.region.isReady) {
    const result = await getData($region.value + $area.value, "region", "area");
    if (result.suggestions.length) {
      const [firstPick] = result.suggestions;
      location.region.id = firstPick.data.region_fias_id;
      location.region.isReady = true;
    }
  }
  const result = await getData(this.value, "city", "settlement", location);
  location.settlement.isReady = false;
  location.city.isReady = false;
  currInput = e.target;
  selectManager(removeNonCity(result.suggestions), suggestionsSettlement);
}

async function streetOnChange(e) {
  location.street.isReady = false;
  currInput = e.target;

  if (
    !location.region.isReady ||
    !(location.settlement.isReady || location.city.isReady)
  )
    return;

  const result = await getData(this.value, "street", "street", location);
  selectManager(result.suggestions, suggestionsStreet);
}

async function houseOnChange(e) {
  if (
    !location.region.isReady ||
    !location.street.isReady ||
    !(location.settlement.isReady || location.city.isReady)
  )
    return;

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
      const { city_with_type, settlement_with_type } = sug.data;
      return [city_with_type, settlement_with_type].join(" ");
    }
    if (currInput.id === "house") return sug.value;
    return sug.data[`${currInput.id}_with_type`];
  });
  suggestionsDOM.classList.add("active");
  suggestionsOverlay.classList.add("active");

  function renderOption(content, text, index) {
    const option = document.createElement("div");
    option.classList.add("suggestion__option");

    if (currInput.id === "settlement") {
      const currIdCity = suggestions[index].data[`city_fias_id`];
      const currIdSettlement = suggestions[index].data[`settlement_fias_id`];
      const IdCityToRender = currIdCity ? currIdCity : "null";
      const IdSettlementToRender = currIdSettlement ? currIdSettlement : "null";
      option.id = [IdCityToRender, IdSettlementToRender].join("__");
    } else {
      const currId = suggestions[index].data[`${currInput.id}_fias_id`];
      option.id = currId;
    }
    if (option.id === "null") return;

    option.textContent = text;
    content.append(option);
  }

  (function insertSelectOptions() {
    suggestionsDOM.innerHTML = "";
    const options = [...new Set(selectOptions)];
    options.map((option, index) => renderOption(suggestionsDOM, option, index));
  })();
}

function suggestionPicked(e) {
  if (e.target.classList.contains("suggestion__option")) {
    const pickedOption = e.target.textContent;
    currInput.value = pickedOption;
    location[currInput.id].isReady = true;
    location[currInput.id].id = e.target.id;

    if (currInput.id === "settlement") {
      const [IdCity, IdSettlement] = e.target.id.split("__");

      location.city.id = IdCity;
      location.city.isReady = true;
      location.settlement.id = IdSettlement;
      location.settlement.isReady = true;

      if (IdCity === "null") {
        location.city.id = "";
        location.city.isReady = false;
      }
      if (IdSettlement === "null") {
        location.settlement.id = "";
        location.settlement.isReady = false;
      }
    }

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
