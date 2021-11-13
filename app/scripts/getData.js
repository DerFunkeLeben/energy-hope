/* eslint-disable */

var url =
  "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
var token = "dde8a351a7c7874c95d7beab6ee8de9be7c608dc";

export async function getData(query, from_bound, to_bound, locations) {
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
      // locations: (() => {
      //   if (locations.region != "") return [{ region: "Мурманская" }];
      //   return null;
      // })(),
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
