import React from 'react';
import ListItem from '@mui/material/ListItem';
import {Avatar, ListItemAvatar} from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';

export default function CreditsList() {
  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 500,
        bgcolor: 'background.paper',
        ml: 'auto',
        mr: 'auto',
        borderRadius: 4,
        boxShadow: 5,
      }}>
      <ListItem>
        <ListItemAvatar>
          <Avatar
            alt="iMalFect"
            src="https://media.discordapp.net/attachments/1144734123202711643/1144734252357918750/com_mikolll_a_1.png"/>
        </ListItemAvatar>
        <ListItemText
          primary="iMalFect"
          secondary="Frontend, Backend, Design"
          sx={{color: 'secondary.main'}}
        />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar
            alt="ChaosTheory2810"
            src="https://media.discordapp.net/attachments/1144734123202711643/1145828644632154182/SteamboatMonkey.png"/>
        </ListItemAvatar>
        <ListItemText
          primary="ChaosTheory2810"
          secondary="Graphics"
          sx={{color: 'secondary.main'}}
        />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <Avatar
              alt="Phorcys"
              src="https://media.discordapp.net/attachments/1144734123202711643/1144735494266175569/37bb1ced65f90186af019435bac7c18b.png"/>
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="Phorcys"
          secondary="Bug testing"
          sx={{color: 'secondary.main'}}
        />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <Avatar
              alt="Banano Community"
              src="https://media.discordapp.net/attachments/1144734123202711643/1144735985234628659/banano-icon.png"/>
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="Banano Community"
          secondary="Testing & Feedback"
          sx={{color: 'primary.main'}}
        />
      </ListItem>
    </List>
  );
}
