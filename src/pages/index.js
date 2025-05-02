import React, { useState } from 'react'
import Box from '@mui/material/Container';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import MenuItem from '@mui/material/MenuItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';

const IndexPage = () => {
  const [belt, setBelt] = useState("white");
  const [weight, setWeight] = useState();
  const [age, setAge] = useState();
  const [name, setName] = useState();
  const [players, setPlayers] = useState([])
  const [isFemale, setIsFemale] = useState(false);

  const beltPoints = {
    white: 0,
    blue: 20,
    purple: 40,
    brown: 60,
    black: 80
  }

  const beltColors = {
    white: '#808080',
    blue: '#87cefa',
    purple: '#8866dd',
    brown: '#a0522d',
    black: '#000000'
  }

  const addPlayer = () => {
    const player = {
      name,
      belt: beltColors[belt],
      points: Math.round((isFemale ? weight * 0.75 : weight) + beltPoints[belt] + ((-2 * age) + 160))
    }
    setPlayers((p) => {
      const updated = [...p, player]
      updated.sort((a, b) => b.points - a.points)
      return updated
    })
    setAge("")
    setName("")
    setIsFemale(false)
    setWeight("")
    setBelt('white')
  }

  const formatNumber = (num) => parseInt(num.replace(/\D*/g, ''), 10) || '';

  return (
    <>
    <Container maxWidth="sm">
      <Box sx={{p: 4}} component="form" noValidate autoComplete="off">
        <TextField label="Weight" id="weight" value={weight} onChange={(event) => {setWeight(formatNumber(event.target.value))}}/>
        <TextField label="Age" id="age" value={age} onChange={(event) => {setAge(formatNumber(event.target.value))}} />
        <Select label="Belt" id="belt" value={belt} onChange={(event) => {setBelt(event.target.value)}}>
          <MenuItem value="white">White</MenuItem>
          <MenuItem value="blue">Blue</MenuItem>
          <MenuItem value="purple">Purple</MenuItem>
          <MenuItem value="brown">Brown</MenuItem>
          <MenuItem value="black">Black</MenuItem>
        </Select>
        <Switch checked={isFemale} onChange={() => {setIsFemale((state) => !state)}} />
        <TextField label="Name" id="name" value={name} onChange={(event) => {setName(event.target.value)}} />
        <Button variant="contained" sx={{m: 1}} onClick={addPlayer}>Add</Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
          {players.map((player, idx) => (
            <TableRow key={idx}>
              <TableCell>
                {player.name}
              </TableCell>
              <TableCell>
                {player.points}
              </TableCell>
            </TableRow>
          ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
    </>
  )
}

export default IndexPage
