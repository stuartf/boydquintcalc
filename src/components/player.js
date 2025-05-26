import React from "react";
import Button from '@mui/material/Button';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import SquareIcon from '@mui/icons-material/Square';
import Stack from "@mui/material/Stack";
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from "@mui/material/Typography";

const Player = ({player, onDelete}) => {
  return <TableRow>
    <TableCell sx={{minWidth: 250}}>
      <Stack direction="row">
        <SquareIcon sx={{color: player.belt, mx: 1}}/>
        <Typography>{player.name}</Typography>
      </Stack>
    </TableCell>
    <TableCell align="center">
      <Typography>{player.points}</Typography>
    </TableCell>
    {onDelete ? <>
        <TableCell align="center" size="small" padding="none">
          <Button onClick={() => navigator.clipboard.writeText(`${player.name},${player.belt},${player.points}`)}><ContentCopyIcon/></Button>
        </TableCell>
        <TableCell align="right" size="small" padding="none">
          <Button onClick={onDelete}><DeleteIcon/></Button>
        </TableCell>
      </> : null}
  </TableRow>
}

export default Player;
