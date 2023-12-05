import React, { useState, useEffect, useCallback } from "react"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import FormHelperText from "@mui/material/FormHelperText"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import CurrencyTable from "../Table"

import getValute, { Valute } from "./api/getValutes"
import { getValutesArray } from "../helpers"

const Main = () => {
  const [currency, setCurrency] = useState<Valute[]>([]) //список курса относительно рубля
  const [selectedCurrency, setSelectedCurrency] = useState("") //относительно чего считаем
  const [valute, setValute] = useState<string[]>([]) //список всех валют из апи

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedCurrency(event.target.value)
  }

  const getResult = async () => {
    const result: Valute[] = await getValute()
    const favs = JSON.parse(localStorage.getItem("favorive") as string)
    result.forEach((item) => {
      if (favs.includes(item.Name)) {
        item.isFav = true 
      }
    })
    setCurrency(result)
    setValute(getValutesArray(result))
  }

  useEffect(() => {
    getResult()
  }, [])

  return (
    <div>
      <div>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="select">Базовая валюта</InputLabel>
          <Select
            labelId="select"
            id="simple"
            value={selectedCurrency}
            onChange={handleChange}
            label="Валюта"
          >
            {valute.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>Выберите базовую валюту</FormHelperText>
        </FormControl>
      </div>
      <div>
        {selectedCurrency && (
          <CurrencyTable
            items={currency}
            selected={selectedCurrency}
          ></CurrencyTable>
        )}
      </div>
    </div>
  )
}

export default Main
