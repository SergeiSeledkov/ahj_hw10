export default class CheckValid {
  constructor(inputValue) {
    this.inputValue = inputValue.trim();
  }

  validator() {
    let symbolCount = 0;
    let symbolPosition = -1;

    for (let i = 0; i < this.inputValue.length; i += 1) {
      if (this.inputValue[i] === ',') {
        symbolCount += 1;
        symbolPosition = i;
      }
    }

    if (symbolCount === 1) {
      let firstSubstring = this.inputValue.slice(0, symbolPosition);
      let secondSubstring = this.inputValue.slice(symbolPosition += 1, this.inputValue.length);
      const firstSubstringRegexp = /^[[]?[-]?\d+[.]?\d+$/;
      const secondSubstringRegexp = /^[-]?\d+[.]?\d+[\]]?$/;

      firstSubstring = firstSubstring.trim();
      secondSubstring = secondSubstring.trim();

      if (firstSubstring.match(firstSubstringRegexp) !== null) {
        if (secondSubstring.match(secondSubstringRegexp) !== null) {
          if (firstSubstring.indexOf('[') !== -1) {
            firstSubstring = firstSubstring.slice(1, firstSubstring.length);
          }

          if (secondSubstring.indexOf(']') !== -1) {
            secondSubstring = secondSubstring.slice(0, secondSubstring.length - 1);
          }

          if (firstSubstring >= -90 && firstSubstring <= 90) {
            if (secondSubstring >= -180 && secondSubstring <= 180) {
              return { latitude: firstSubstring, longitude: secondSubstring };
            }
            return 'Долгота должна быть от -180 до 180';
          }
          return 'Широта должна быть от -90 до 90';
        }
        return 'Значение долготы указано некорректно';
      }
      return 'Значение широты указано некорректно';
    }
    return 'Широту и долготу должна разделять одна запятая';
  }
}
