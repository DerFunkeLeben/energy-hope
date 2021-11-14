/* eslint-disable */

var url =
  "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
var token = "dde8a351a7c7874c95d7beab6ee8de9be7c608dc";

export async function getData(query, from_bound, to_bound, location) {
  var options = {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Token " + token,
    },
    body: JSON.stringify({
      query: query,
      from_bound: { value: from_bound },
      to_bound: { value: to_bound },
      locations: (() => {
        const res = {};
        
      if (location) {
        if (location.region.isReady)
          res["region_fias_id"] = location.region.id;
        if (location.area.isReady) res["area_fias_id"] = location.area.id;
        if (location.street.isReady)
          res["street_fias_id"] = location.street.id;
        if (location.settlement.isReady) {
          if (location.settlement.isCity)
            res["city_fias_id"] = location.settlement.id;
          else res["settlement_fias_id"] = location.settlement.id;
        }
        
      }
        if (Object.keys(res).length) return [res];
        return null;
      })(),
      restrict_value: true,
    }),
  };

  try {
    const response = await fetch(url, options);
    const responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(error);
  }
}
