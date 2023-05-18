export function removeAccents(str) {
  const upperCaseSeriousString = str.toUpperCase();
  const greekLetters = {
    Ά: "Α",
    Έ: "Ε",
    Ή: "Η",
    Ί: "Ι",
    Ϊ: "Ι",
    Ό: "Ο",
    Ύ: "Υ",
    Ϋ: "Υ",
    Ώ: "Ω",
  };
  const regex = new RegExp("[" + Object.keys(greekLetters).join("") + "]", "g");
  return upperCaseSeriousString.replace(regex, function (match) {
    return greekLetters[match];
  });
}

export function createNavigationLink(endLat, endLng) {
  let link = "https://www.google.com/maps/dir/?api=1";
  link += "&destination=" + endLat + "," + endLng;

  return link;
}
