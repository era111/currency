import { Valute } from "./Main/api/getValutes"

export const getValutesArray = (list: Valute[]) => {
  const valutes = list.map((obj) => obj.Name)
  return valutes
}

const changeNominal = (number: number) => {
  let integerPart = Math.floor(number)
  let scale = 1

  if (integerPart) {
    while (String(integerPart).length > 2) {
      scale *= 10
      integerPart = Math.floor((integerPart /= 10))
    }
  } else {
    let floorNum = number
    while (floorNum < 0.01) {
      scale /= 10
      floorNum *= 10
    }
  }

  return {
    newValue: (number / scale).toFixed(4),
    newNominal: scale,
  }
}

export const convert = (items: Valute[], selected: string) => {
  let result
  const selectedValue = items.find((item) => item.Name === selected)

  if (selectedValue) {
    result = items
      .map((item) => {
        let rawValue =
          (item.Nominal * selectedValue.Value) /
          item.Value /
          selectedValue.Nominal

        let { newValue, newNominal } = changeNominal(rawValue)

        return {
          ...item,
          Value: newValue,
          Nominal: newNominal,
        }
      })
  } else {
    result = items
  }

  return result
}
