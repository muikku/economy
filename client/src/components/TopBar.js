import { AppBar, Toolbar, Typography } from '@mui/material';
import React from 'react';
import Options from './Options';

const TopBar = ({ data, clearData }) => {
  return (
    <>
      <AppBar color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My economy
          </Typography>
          <Options data={data} clearData={clearData} />
        </Toolbar>
      </AppBar>
      <div style={{ marginTop: '76px' }} />
    </>
  );
};

export default TopBar;
