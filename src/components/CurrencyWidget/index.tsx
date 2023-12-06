import React, { FC, useState, useEffect, useCallback } from "react"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import FormHelperText from "@mui/material/FormHelperText"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import CurrencyTable from "../Table"

import { convert } from "../helpers"
import { Valute } from "../Main/api/getValutes"

interface Props {
  items: Valute[] | undefined
  valute: string[]
}
const CurrencyWidget: FC<Props> = ({ items, valute }) => {
  const [currency, setCurrency] = useState<Valute[] | undefined>(items) //список курса относительно рубля
  const [selectedCurrency, setSelectedCurrency] = useState("") //относительно чего считаем
  const [favorives, setFavorites] = useState<string[]>([]) //избранные валюты

  const handleChange = useCallback((event: SelectChangeEvent) => {
    setSelectedCurrency(event.target.value)
  }, [])

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorive") as string) || []
    let result =
      items &&
      convert(items as Valute[], selectedCurrency).sort((a, b) => {
        if (a.isFav && !b.isFav) {
          return -1
        } else if (!a.isFav && b.isFav) {
          return 1
        } else {
          return 0
        }
      })
    result &&
      result.forEach((item) => {
        if (favs.includes(item.Name)) {
          item.isFav = true
        }
      })
    setCurrency(result as Valute[])
  }, [selectedCurrency, favorives])

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
            {valute &&
              valute.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
          </Select>
          <FormHelperText>Выберите базовую валюту</FormHelperText>
        </FormControl>
      </div>

      <div>
        {selectedCurrency && currency && (
          <CurrencyTable
            items={currency}
            selected={selectedCurrency}
            setFavorites={setFavorites}
          ></CurrencyTable>
        )}
      </div>
    </div>
  )
}

export default CurrencyWidget
