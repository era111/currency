const url = `https://www.cbr-xml-daily.ru/daily_json.js`
export type Valute = {
  CharCode: string
  ID: string
  Name: string
  Nominal: number
  NumCode: string
  Previous: number
  Value: number
  isFav: boolean
}

export default async function getValute() {
  const promise = await fetch(url)
  const todayData = await promise.json()

  let valute = todayData.Valute
  let valuteArray = []
  for (let key in valute) {
    valuteArray.push(valute[key])
  }
  return valuteArray.map((item) => {
    item.isFav = false
    return item
  })

}

