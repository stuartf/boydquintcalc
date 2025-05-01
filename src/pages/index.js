import React, { useState } from 'react'
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import MenuItem from '@mui/material/MenuItem';
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

  return (
    <Container maxWidth="sm">
      <TextField label="Weight" id="weight" value={weight} onChange={(event) => {setWeight(parseInt(event.target.value))}}/>
        <TextField label="Age" id="age" value={age} onChange={(event) => {setAge(parseInt(event.target.value))}} />
        <Select label="Belt" id="belt" value={belt} onChange={(event) => {setBelt(event.target.value)}}>
          <MenuItem value="white">White</MenuItem>
          <MenuItem value="blue">Blue</MenuItem>
          <MenuItem value="purple">Purple</MenuItem>
          <MenuItem value="brown">Brown</MenuItem>
          <MenuItem value="black">Black</MenuItem>
        </Select>
        <Switch checked={isFemale} onChange={() => {setIsFemale((state) => !state)}} />
        <TextField label="Name" id="name" value={name} onChange={(event) => {setName(event.target.value)}} />
        <Button onClick={addPlayer}>Add</Button>
      <ul>
        {players.map((player, idx) => (
          <li key={idx} style={{ color: player.belt }}>
            <p>
              {player.name} {player.points}
            </p>
          </li>
        ))}
      </ul>
    </Container>
  )
}

export default IndexPage
