export function removePolishCharacters(input) {
  const polishCharacters = /[ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/g;
  const polishMap = {
    ą: "a",
    ć: "c",
    ę: "e",
    ł: "l",
    ń: "n",
    ó: "o",
    ś: "s",
    ź: "z",
    ż: "z",
    Ą: "A",
    Ć: "C",
    Ę: "E",
    Ł: "L",
    Ń: "N",
    Ó: "O",
    Ś: "S",
    Ź: "Z",
    Ż: "Z",
  };
  return input.replace(polishCharacters, function (match) {
    return polishMap[match];
  });
}
