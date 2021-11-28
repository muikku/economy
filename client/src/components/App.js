import { Container } from '@mui/material';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { paths } from '../../misc';

import Front from './Front';
import TopBar from './TopBar';
import Chart from './Chart';
import useAppLogic from '../hooks/logic';
import RawData from './RawData';

const App = () => {
  const { clearData, data, getAndSetData } = useAppLogic();
  return (
    <Container>
      <TopBar data={data} clearData={clearData} />
      <Routes>
        <Route
          path={paths.FRONT.path}
          element={<Front getAndSetData={getAndSetData} />}
        />
        <Route path={paths.MY_ECONOMY.path} element={<Chart data={data} />} />
        <Route path={paths.RAW_DATA.path} element={<RawData data={data} />} />
      </Routes>
    </Container>
  );
};

export default App;
