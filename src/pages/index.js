import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Container';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import MenuItem from '@mui/material/MenuItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const IndexPage = () => {
  const [belt, setBelt] = useState("white");
  const [weight, setWeight] = useState();
  const [age, setAge] = useState();
  const [name, setName] = useState();
  const [players, setPlayers] = useState([])
  const [isFemale, setIsFemale] = useState(false);
  const [teamSize, setTeamSize] = useState(5);
  const [suggestedMax, setSuggestedMax] = useState();

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

  useEffect(() => {
    if (players.length > 0) {
      setSuggestedMax(players.reduce((acc, player) => acc + player.points, 0)/players.length * teamSize);
    }
  }, [players, teamSize]);

  useEffect(() => {
    const myPlayers = localStorage.getItem("players");
    if (myPlayers) {
      setPlayers(JSON.parse(myPlayers));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("players", JSON.stringify(players));
  }, [players]);

  const formatNumber = (num) => parseInt(num.replace(/\D*/g, ''), 10) || '';

  return (
    <>
    <Container maxWidth="sm">
      <Box sx={{p: 4}} component="form" noValidate autoComplete="off">
        <TextField label="Weight" id="weight" margin="normal" value={weight} onChange={(event) => {setWeight(formatNumber(event.target.value))}}/>
        <TextField label="Age" id="age" value={age} margin="normal" onChange={(event) => {setAge(formatNumber(event.target.value))}} />
        <Select label="Belt" id="belt" value={belt} margin="normal" onChange={(event) => {setBelt(event.target.value)}}>
          <MenuItem value="white">White</MenuItem>
          <MenuItem value="blue">Blue</MenuItem>
          <MenuItem value="purple">Purple</MenuItem>
          <MenuItem value="brown">Brown</MenuItem>
          <MenuItem value="black">Black</MenuItem>
        </Select>
        <Stack direction="row" spacing={1}>
          <Typography sx={{py: 1}}>Male</Typography>
          <Switch checked={isFemale} onChange={() => {setIsFemale((state) => !state)}} />
          <Typography sx={{py: 1}}>Female</Typography>
        </Stack>
        <TextField label="Name" id="name" margin="normal" value={name} onChange={(event) => {setName(event.target.value)}} />
        <Button variant="contained" sx={{m: 3}} onClick={addPlayer}>Add</Button>
      </Box>
      <Box sx={{p: 4}}>
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
        {players.length > 0 ? <Button variant="contained" sx={{m: 3}} onClick={() => setPlayers([])}>Clear All</Button> : null}
      </Box>
      <TextField label="Team Size" id="teamsize" value={teamSize} margin="normal" onChange={(event) => {setTeamSize(formatNumber(event.target.value))}} />
      {suggestedMax ? <Typography>Suggested Team Maximum: {suggestedMax}</Typography> : null}
    </Container>
    </>
  )
}

export default IndexPage
