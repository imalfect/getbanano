import React from 'react';
import Typography from '@mui/material/Typography';
export default function Header() {
  const [name, setName] = React.useState('');
  React.useEffect(() => {
    // Get the " subdomain";
    const subdomain = window.location.host.split('.')[0];
    // FOR DEV PURPOSES
    // const subdomain = 'root';
    setName(subdomain);
  }, []);
  return (
    <Typography variant="h2" component="h2" gutterBottom>
      {capitalizeFirstLetter(name)} Banano Faucet
    </Typography>
  );
}
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
