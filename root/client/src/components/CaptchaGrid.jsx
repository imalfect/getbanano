import React from 'react';
import Grid from '@mui/material/Grid';
import MonKey from './MonKey.jsx';
import config from '../config.json';
import {emitter} from '../main.jsx';
export default function CaptchaGrid() {
  const [monkeys, setMonkeys] = React.useState([]);
  const [timeoutId, setTimeoutId] = React.useState(0);
  const [selectedMonkey, setSelectedMonkey] = React.useState(null);
  const getCaptcha = async () => {
    const instanceName = window.location.host.split('.')[0];
    // const instanceName = 'root';
    const captcha = await fetch(`${config.rootApi}/captcha/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        instance: instanceName
      })
    }).then((res) => res.json());
    // Set monkeys
    const monKeys = [
      captcha.monkeys['1'],
      captcha.monkeys['2'],
      captcha.monkeys['3'],
      captcha.monkeys['4'],
      captcha.monkeys['5'],
      captcha.monkeys['6']
    ];
    setMonkeys(monKeys);
    emitter.emit('captchaGenerated', captcha);
    setTimeoutId(setTimeout(getCaptcha, captcha.expiresAt));
  };
  React.useEffect(() => {
    emitter.on('monkeySelected', (id) => {
      setSelectedMonkey(id);
    });
    emitter.on('claimFailed', () => {
      clearTimeout(timeoutId);
      getCaptcha();
    });
    getCaptcha();
  }, []);
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={3}
      columns={{xs: 2, sm: 4, md: 6, lg: 8, xl: 12}}
      sx={{mt: 1}}>
      <Grid item xs={2}>
        <MonKey src={monkeys[0]} selected={selectedMonkey === 0} id={0} />
      </Grid>
      <Grid item xs={2}>
        <MonKey src={monkeys[1]} selected={selectedMonkey === 1} id={1} />
      </Grid>
      <Grid item xs={2}>
        <MonKey src={monkeys[2]} selected={selectedMonkey === 2} id={2} />
      </Grid>
      <Grid item xs={2}>
        <MonKey src={monkeys[3]} selected={selectedMonkey === 3} id={3} />
      </Grid>
      <Grid item xs={2}>
        <MonKey src={monkeys[4]} selected={selectedMonkey === 4} id={4} />
      </Grid>
      <Grid item xs={2}>
        <MonKey src={monkeys[5]} selected={selectedMonkey === 5} id={5} />
      </Grid>
    </Grid>
  );
}
