import React, { useState, useEffect, useCallback } from "react"
import getValute, { Valute } from "./api/getValutes"
import { getValutesArray } from "../helpers"
import CurrencyWidget from '../CurrencyWidget'

const Main = () => {
  const [currency, setCurrency] = useState<Valute[] | undefined>([]) //список курса относительно рубля
  const [valute, setValute] = useState<string[]>([]) //список всех валют из апи

  const getResult = async () => {
    const result = await getValute()
    result && setValute(getValutesArray(result as Valute[]))
    setCurrency(result)
  }

  useEffect(() => {
    getResult()
  }, [])

  return (
    <div>
      {currency ? (
        <CurrencyWidget items={currency} valute={valute}></CurrencyWidget>
      ) : (
        <h1>ERROR</h1>
      )}
    </div>
  )
}

export default Main
