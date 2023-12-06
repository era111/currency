import React, { FC, useCallback, useState, useEffect } from "react"
import {
  Grid,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@mui/material"
import Row from "../TableRow"
import { Valute } from "../Main/api/getValutes"

const titles = ["Избранное", "Валюта", "Единиц", "Буквенный код", "Курс"]

interface Props {
  items: Valute[]
  selected: string
  setFavorites: (favorives: string[]) => void
}

type History = {
  date: Date
  to: string
  from: Valute[]
}

const CurrencyTable: FC<Props> = ({ items, selected, setFavorites }) => {
  const [history, setHistory] = useState<History[] | []>([])

  items.sort((a, b) => {
    if (a.isFav && !b.isFav) {
      return -1
    } else if (!a.isFav && b.isFav) {
      return 1
    } else {
      return 0
    }
  })

  const handleSave = () => {
    const items = JSON.parse(localStorage.getItem("history") as string) || []
    const newHist = items.concat(history)
    localStorage.setItem("history", JSON.stringify(newHist))
    setHistory([])
  }

  const handleClear = useCallback(() => {
    localStorage.setItem("history", JSON.stringify([]))
    setHistory([])
  }, [])

  const handleFavorite = (name: string) => {
    let favs = new Set<string>(
      JSON.parse(localStorage.getItem("favorive") as string)
    )
    if (favs.has(name)) {
      favs.delete(name)
    } else {
      favs.add(name)
    }
    setFavorites(Array.from(favs))
    localStorage.setItem("favorive", JSON.stringify(Array.from(favs)))
  }

  useEffect(() => {
    setHistory((state) => {
      let hist = {
        date: new Date(),
        to: selected,
        from: items,
      }
      return [...state, hist]
    })
  }, [selected])

  return (
    <div>
      <Button onClick={handleSave} variant="outlined">
        Сохранить историю конвертаций
      </Button>
      <Button onClick={handleClear} variant="outlined">
        Очистить историю конвертаций
      </Button>

      <Grid container spacing={2}>
        <Grid item>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {titles.map((item, index) => {
                  return index < 2 ? (
                    <TableCell key={index} align="left">
                      {item}
                    </TableCell>
                  ) : (
                    <TableCell key={index} align="right">
                      {item}
                    </TableCell>
                  )
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((row) => (
                <Row setFavorite={handleFavorite} key={row.ID} item={row}></Row>
              ))}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </div>
  )
}

export default CurrencyTable
