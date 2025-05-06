import React from "react";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SquareIcon from '@mui/icons-material/Square';
import Stack from "@mui/material/Stack";
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from "@mui/material/Typography";

const Player = ({player, onDelete}) => {
  return <TableRow>
    <TableCell>
      <Stack direction="row">
        <SquareIcon sx={{color: player.belt, mx: 1}}/>
        <Typography>{player.name}</Typography>
      </Stack>
    </TableCell>
    <TableCell align="center">
      <Typography>{player.points}</Typography>
    </TableCell>
    {onDelete ? <TableCell align="right">
      <Button onClick={onDelete}><DeleteIcon/></Button>
      </TableCell> : null}
  </TableRow>
}

export default Player;
