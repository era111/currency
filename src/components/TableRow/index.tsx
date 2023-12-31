import React, { FC } from "react"
import { TableCell, TableRow } from "@mui/material"
import StarIcon from "@mui/icons-material/Star"
import StarBorderIcon from "@mui/icons-material/StarBorder"
import { Valute } from '../Main/api/getValutes'

interface PropsType {
  item: Valute
  setFavorite: (favorite: string) => void
}

const Row: FC<PropsType> = ({ setFavorite, item }) => {
  return (
    <TableRow>
      <TableCell onClick={() => setFavorite(item.Name)} align="center">
        {item.isFav ? <StarIcon></StarIcon> : <StarBorderIcon></StarBorderIcon>}
      </TableCell>
      <TableCell align="left">{item.Name}</TableCell>
      <TableCell align="right">{item.Nominal}</TableCell>
      <TableCell align="right">{item.CharCode}</TableCell>
      <TableCell align="right">{item.Value}</TableCell>
    </TableRow>
  )
}

export default Row
