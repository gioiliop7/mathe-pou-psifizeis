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
