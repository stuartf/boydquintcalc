import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Container';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
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
import Player from '../components/player.js';

const IndexPage = () => {
  const [belt, setBelt] = useState("white");
  const [weight, setWeight] = useState();
  const [age, setAge] = useState();
  const [name, setName] = useState();
  const [players, setPlayers] = useState([])
  const [isFemale, setIsFemale] = useState(false);
  const [teamSize, setTeamSize] = useState(5);
  const [suggestedMax, setSuggestedMax] = useState();
  const [teams, setTeams] = useState([]);

  const beltPoints = {
    white: 0,
    blue: 20,
    purple: 40,
    brown: 60,
    black: 80
  };

  const beltColors = {
    white: '#808080',
    blue: '#87cefa',
    purple: '#8866dd',
    brown: '#a0522d',
    black: '#000000'
  };

  const addPlayer = (player) => {
    player = player || {
      name,
      belt: beltColors[belt],
      points: Math.round((isFemale ? weight * 0.75 : weight) + beltPoints[belt] + ((-2 * age) + 160))
    }
    setPlayers((p) => {
      const updated = [...p, player];
      updated.sort((a, b) => b.points - a.points);
      return updated;
    });
    setAge("");
    setName("");
    setIsFemale(false);
    setWeight("");
    setBelt('white');
  };

  useEffect(() => {
    if (players.length > 0) {
      setSuggestedMax(Math.floor(players.reduce((acc, player) => acc + player.points, 0)/players.length * teamSize));
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

  const snakeDraftTeams = () => {
    const numTeams = Math.ceil(players.length / teamSize);
    const myTeams = Array.from({length: numTeams}, () => []);
    let pass = 0;
    for(let i=0; i < players.length; i++) {
      if (i%numTeams === 0) {
        pass++;
      }
      const turn = pass%2 === 0 ? numTeams - i%numTeams-1 : i%numTeams;
      myTeams[turn].push(players[i]);
    }
    setTeams(myTeams);
  };

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  return (
    <>
    <Container maxWidth="sm">
      <Box sx={{p: 4}} component="form" noValidate autoComplete="off">
        <Stack>
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
        <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
      >
          Import Players
        <VisuallyHiddenInput
        type="file"
        onChange={(event) => {
          const file = event.target.files[0];
          const reader = new FileReader();
          reader.onload = () => {
            reader.result.split("\n")
            .map(line => {
              if (line.length >= 3) {
                const [name, belt, points] = line.split(",");
                addPlayer({name, belt, points: formatNumber(points)});
              }
            })
          };
          reader.readAsText(file)
        }}
        accept="text/csv"
      />
    </Button>
        </Stack>
      </Box>
      <Box sx={{p: 4}}>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
            {players.map((player, idx) => <Player key={idx} player={player} onDelete={() => setPlayers(players.toSpliced(idx, 1))} />)}
            </TableBody>
          </Table>
        </TableContainer>
        {players.length > 0 ? <Button variant="contained" sx={{m: 3}} onClick={() => setPlayers([])}>Clear All</Button> : null}
      </Box>
      <TextField label="Team Size" id="teamsize" value={teamSize} margin="normal" onChange={(event) => {setTeamSize(formatNumber(event.target.value))}} />
      {suggestedMax ? <Typography>Suggested Team Maximum: {suggestedMax}</Typography> : null}
      <Button variant="contained" onClick={snakeDraftTeams}>Auto Draft Teams</Button>
      {teams.map((team, idx) => (
        <TableContainer component={Paper} key={idx} sx={{m: 4}}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell align="center">
                  <Typography>
                    {team.reduce((acc, cur) => acc + cur.points, 0)}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {team.map((player, idx) => <Player key={idx} player={player} />)}
            </TableBody>
          </Table>
        </TableContainer>
      ))}
    </Container>
    </>
  )
}

export default IndexPage;
