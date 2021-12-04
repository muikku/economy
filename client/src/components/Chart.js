import { CardContent, Container, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import { Navigate } from 'react-router';
import {
  CartesianGrid,
  Legend,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  AreaChart,
  ResponsiveContainer,
} from 'recharts';
import { paths } from '../../misc';
import DataTable from './Table';

const keys = {
  SPENDING: { key: 'spending', color: 'error' },
  INCOME: { key: 'income', color: 'success' },
  SUM: { key: 'sum', color: 'primary' },
};
const keysArray = Object.values(keys);

const OverviewChart = ({ data }) => {
  const { palette, breakpoints } = useTheme();
  const sm = useMediaQuery(breakpoints.down('sm'));
  const md = useMediaQuery(breakpoints.down('md'));

  const getColor = (color) => palette[color].main;

  if (!data) return <Navigate to={paths.FRONT.path} />;

  return (
    <Container disableGutters={sm}>
      <ResponsiveContainer width="100%" height={md ? 300 : 500}>
        <AreaChart data={data}>
          <defs>
            {keysArray.map(({ key, color }) => {
              const stroke = getColor(color);
              const id = `color-${key}`;
              return (
                <linearGradient key={id} id={id} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={stroke} stopOpacity={0.9} />
                  <stop offset="95%" stopColor={stroke} stopOpacity={0.1} />
                </linearGradient>
              );
            })}
          </defs>
          <XAxis dataKey="name" />
          <CartesianGrid strokeDasharray="3 3" />
          {!md && <YAxis />}
          <Tooltip />
          <Legend />
          {keysArray.map(({ key, color }) => {
            const stroke = getColor(color);
            const fill = `url(#color-${key})`;
            return (
              <Area
                key={key}
                type="monotone"
                dataKey={key}
                stroke={stroke}
                fillOpacity={1}
                fill={fill}
              />
            );
          })}
        </AreaChart>
      </ResponsiveContainer>
      <DataTable data={data} />
    </Container>
  );
};

export default OverviewChart;
