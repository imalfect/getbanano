import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {convertMinutesToDHM} from '../../functions/convertMinutesToDHM.js';
import Button from '@mui/material/Button';
import {sendFaucetForCreation} from '../../functions/sendFaucetForCreation.js';
const captchaDifficultyMarks = [
  {
    value: 1,
    label: 'Robot like',
  },
  {
    value: 2,
    label: 'Slighly less easier',
  },
  {
    value: 3,
    label: 'Casual',
  },
  {
    value: 4,
    label: 'Questionable',
  },
  {
    value: 5,
    label: 'Banana',
  },
  {
    value: 6,
    label: 'Nerd',
  },
  {
    value: 7,
    label: 'Jungle Master',
  },
];
function createData(parameter, setting) {
  return {parameter, setting};
}
// interval, proxyCheck, design, captchaDifficulty, name, reward
export default function ReviewAndCreateStep(props) {
  const makeCreationRequest = async () => {
    const request = await sendFaucetForCreation(props.data);
    props.setPaymentInfo(request);
    props.continueToPayment();
  };
  const rows = [
    createData('Faucet name', props.data.name),
    createData('Reward', props.data.reward),
    createData('Description', props.data.description),
    createData('Interval', convertMinutesToDHM(props.data.interval)),
    createData(
        'Captcha difficulty',
        `${props.data.captchaDifficulty} 
        (${captchaDifficultyMarks[props.data.captchaDifficulty - 1].label})`,
    ),
    createData(
        'Proxy check',
        `${props.data.proxyCheck ? 'Enabled' : 'Disabled'}`,
    ),
    createData(
        'Theme',
        `Mode: ${props.data.theme.theme}, 
         Icon: added`,
    ),
  ];
  return (
    <Container sx={{mt: 2}}>
      <Typography
        variant="h4"
        component="h4" g
        gutterBottom
        sx={{fontWeight: 700}}>
        Review and send for creation
      </Typography>
      <Typography
        variant="body1"
        component="p"
        gutterBottom
        sx={{fontWeight: 400}}>
        Please review your faucet settings below.
        If they&apos;re correct, proceed further.
        Otherwise, go back and change them.
        All parameters (<b>excluding the name</b>) can be changed at a later
        date using the admin panel (<b>work in progress!</b>).
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{minWidth: 350}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Parameter</TableCell>
              <TableCell align="right">Setting</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{'&:last-child td, &:last-child th': {border: 0}}}
              >
                <TableCell align="left">{row.parameter}</TableCell>
                <TableCell align="right">{row.setting}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" sx={{mt: 2}} onClick={() => {
        makeCreationRequest();
      }}>
        Confirm and send to server
      </Button>
    </Container>
  );
}
