import {
  AppBar,
  Toolbar,
  Typography,
  useScrollTrigger,
  Slide,
} from '@mui/material';
import React from 'react';
import Options from './Options';

function HideOnScroll({ children }) {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const TopBar = ({ data, clearData }) => {
  return (
    <HideOnScroll>
      <AppBar position="sticky" color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My economy
          </Typography>
          <Options data={data} clearData={clearData} />
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
};

export default TopBar;
