import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Icon from '@mui/material/Icon';
export default function FeatureBox(props) {
  return (
    <Paper
      sx={{
        width: 300,
        p: 2,
        boxShadow: 5,
        borderRadius: 2,
      }}
    >
      <div>{props.icon}</div>
      <Typography variant="h3" component="div" sx={{fontWeight: 700}} gutterBottom>
        {props.title}
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        {props.children}
      </Typography>
    </Paper>

  );
}
