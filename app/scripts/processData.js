/* eslint-disable */
import getData from "./getData";
import debounce from "./utils";
import sendAllFields from "./setFiasData";
import { FIELDS } from "./constants";

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
const location = {};
Object.values(FIELDS).map(
  (value) => (location[value] = { id: "", isReady: false })
);

$region.addEventListener("input", debounce(regionOnChange));
$area.addEventListener("input", debounce(areaOnChange));
$settlement.addEventListener("input", debounce(settlementOnChange));
$street.addEventListener("input", debounce(streetOnChange));
$house.addEventListener("input", debounce(houseOnChange));
suggestionsRegion.addEventListener("click", suggestionPicked);
suggestionsArea.addEventListener("click", suggestionPicked);
suggestionsSettlement.addEventListener("click", suggestionPicked);
suggestionsStreet.addEventListener("click", suggestionPicked);
suggestionsHouse.addEventListener("click", suggestionPicked);

async function getRegion(value) {
  const result = await getData(value, FIELDS.REGION, FIELDS.REGION);
  return result;
}

async function getArea(value) {
  const result = await getData(value, FIELDS.AREA, FIELDS.AREA, location);
  return result;
}

async function getSettlement(value) {
  const result = await getData(value, FIELDS.CITY, FIELDS.SETTLEMENT, location);
  return result;
}

async function getStreet(value) {
  const result = await getData(value, FIELDS.STREET, FIELDS.STREET, location);
  return result;
}

async function getHouse(value) {
  const result = await getData(value, FIELDS.HOUSE, FIELDS.HOUSE, location);
  return result;
}

function getField(fieldId) {
  switch (fieldId) {
    case FIELDS.REGION:
      return getRegion;
    case FIELDS.AREA:
      return getArea;
    case FIELDS.SETTLEMENT:
      return getSettlement;
    case FIELDS.STREET:
      return getStreet;
    case FIELDS.HOUSE:
      return getHouse;

    default:
      break;
  }
}

async function regionOnChange(e) {
  location[FIELDS.REGION].isReady = false;
  currInput = e.target;
  const result = await getRegion(this.value);
  selectManager(result.suggestions, suggestionsRegion);
}

async function areaOnChange(e) {
  if (!location[FIELDS.REGION].isReady) {
    const result = await getRegion($region.value);
    if (result.suggestions.length) {
      const [firstPick] = result.suggestions;
      location[FIELDS.REGION].id = firstPick.data.region_fias_id;
      location[FIELDS.REGION].isReady = true;
    }
  }
  const result = await getArea(this.value);
  location[FIELDS.AREA].isReady = false;
  currInput = e.target;
  selectManager(result.suggestions, suggestionsArea);
}

async function settlementOnChange(e) {
  if (!location[FIELDS.REGION].isReady) {
    const result = await getData(
      $region.value + $area.value,
      FIELDS.REGION,
      FIELDS.AREA
    );
    if (result.suggestions.length) {
      const [firstPick] = result.suggestions;
      location[FIELDS.REGION].id = firstPick.data.region_fias_id;
      location[FIELDS.REGION].isReady = true;
    }
  }

  const result = await getSettlement(this.value);
  location[FIELDS.SETTLEMENT].isReady = false;
  location[FIELDS.CITY].isReady = false;
  currInput = e.target;
  selectManager(removeNonCity(result.suggestions), suggestionsSettlement);
}

async function streetOnChange(e) {
  location[FIELDS.STREET].isReady = false;
  currInput = e.target;

  if (
    !location[FIELDS.REGION].isReady ||
    !(location[FIELDS.SETTLEMENT].isReady || location[FIELDS.CITY].isReady)
  )
    return;

  const result = await getStreet(this.value);
  selectManager(result.suggestions, suggestionsStreet);
}

async function houseOnChange(e) {
  if (
    !location[FIELDS.REGION].isReady ||
    !location[FIELDS.STREET].isReady ||
    !(location[FIELDS.SETTLEMENT].isReady || location[FIELDS.CITY].isReady)
  )
    return;

  const result = await getHouse(this.value);
  location[FIELDS.HOUSE].isReady = false;
  currInput = e.target;
  selectManager(result.suggestions, suggestionsHouse);
}

async function updPostalCode() {
  const suggestions = await sendAllFields();
  if (!suggestions) return;
  const postalCode = suggestions[0].data.postal_code;

  $postalCode.value = postalCode || "";
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
    if (currInput.id === FIELDS.SETTLEMENT) {
      const { city_with_type, settlement_with_type } = sug.data;
      return [city_with_type, settlement_with_type].join(" ");
    }
    if (currInput.id === FIELDS.HOUSE) return sug.value;
    return sug.data[`${currInput.id}_with_type`];
  });
  suggestionsDOM.classList.add("active");
  suggestionsOverlay.classList.add("active");

  function renderOption(content, text, index) {
    const option = document.createElement("div");
    option.classList.add("suggestion__option");

    if (currInput.id === FIELDS.SETTLEMENT) {
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

async function suggestionPicked(e) {
  if (!e.target.classList.contains("suggestion__option")) return;

  const pickedOption = e.target.textContent;
  currInput.value = pickedOption;
  location[currInput.id].isReady = true;

  const getCurrInputData = getField(currInput.id);
  const result = await getCurrInputData(pickedOption);
  try {
    const currId = result.suggestions[0].data[`${currInput.id}_fias_id`];
    location[currInput.id].id = currId;
  } catch (error) {
    location[currInput.id].id = e.target.id;
  }
  console.log(result);

  if (currInput.id === FIELDS.SETTLEMENT) {
    let [IdCity, IdSettlement] = e.target.id.split("__");

    try {
      IdSettlement = result.suggestions[0].data[`settlement_fias_id`];
      IdCity = result.suggestions[0].data[`city_fias_id`];
    } catch (error) {
      console.log(error);
    }

    location[FIELDS.CITY].id = IdCity;
    location[FIELDS.CITY].isReady = true;
    location[FIELDS.SETTLEMENT].id = IdSettlement;
    location[FIELDS.SETTLEMENT].isReady = true;

    if (IdCity === "null") {
      location[FIELDS.CITY].id = "";
      location[FIELDS.CITY].isReady = false;
    }
    if (IdSettlement === "null") {
      location[FIELDS.SETTLEMENT].id = "";
      location[FIELDS.SETTLEMENT].isReady = false;
    }
  }

  if (currInput.id === FIELDS.HOUSE) {
    updPostalCode();
  }

  hideSuggestions();
}

function hideSuggestions() {
  suggestions.map((sug) => sug.classList.remove("active"));
  suggestionsOverlay.classList.remove("active");
}

suggestionsOverlay.addEventListener("click", hideSuggestions);

inputData.map((inp) =>
  inp.addEventListener("click", (e) => {
    if (currInput && e.target.id === currInput.id) return;
    hideSuggestions();
  })
);
