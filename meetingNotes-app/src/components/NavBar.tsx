import { useState } from "react";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { ThemeProvider, createTheme } from '@mui/material/styles';


type Props = {
  setVisibility: () => void | any;
}

export default function NavBar({ setVisibility }: Props) {

  function appBarLabel(label: string) {
    return (
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          {label}
        </Typography>
        <IconButton edge="end" color="inherit" aria-label="explore notes" sx={{ mr: 2 }}>
          <Typography variant="button" sx={{ fontSize: '0.875rem' }}>Explore Notes</Typography>
        </IconButton>
        <IconButton edge="end" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={setVisibility}>
          <MenuIcon />
        </IconButton>
      </Toolbar>
    );
  }

  const blueTheme = createTheme({
    palette: {
      primary: {
        main: '#2196f3', // Blue shade
      },
    },
    typography: {
      fontFamily: 'Arial, sans-serif', // Change font to Arial
    },
  });

  return (
    <Stack spacing={2} sx={{ flexGrow: 1 }}>
      <ThemeProvider theme={blueTheme}>
        <AppBar position="static">
          {appBarLabel('MY ORGANIZED NOTES')}
        </AppBar>
      </ThemeProvider>
    </Stack>
  );
}
