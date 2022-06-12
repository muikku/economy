import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { accumulate } from '../../utils/parseNordeaTransactions';

const getMonthAndYear = (name) => {
  const split = name.split('/');
  return { month: split[0], year: split[1] };
};

const DataTable = ({ data }) => {
  const sortedData = Array.from(data).sort((a, b) => {
    const { month: monthA, year: yearA } = getMonthAndYear(a.name);
    const { month: monthB, year: yearB } = getMonthAndYear(b.name);
    if (yearA === yearB) return monthB - monthA;
    return yearB - yearA;
  });
  const totals = data?.reduce((prev, curr) => {
    const { name, spending, income, sum } = curr;
    const year = name.split('/')[1];
    const prevValues = prev[year] || { income: 0, spending: 0, sum: 0 };

    const newIncome = accumulate(prevValues.income, income);
    const newSpending = accumulate(prevValues.spending, spending);
    const newSum = accumulate(prevValues.sum, sum);
    const result = {
      ...prev,
      [year]: { income: newIncome, spending: newSpending, sum: newSum },
    };
    return result;
  }, {});

  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Month</TableCell>
            <TableCell align="right">Sum</TableCell>
            <TableCell align="right">Income</TableCell>
            <TableCell align="right">Spending</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(totals)
            .reverse()
            .map((year) => {
              const color =
                totals[year].sum >= 0 ? 'success.main' : 'error.main';
              return (
                <TableRow
                  key={year}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {`${year} total`}
                  </TableCell>
                  <TableCell sx={{ color }} align="right">
                    {totals[year]?.sum}
                  </TableCell>
                  <TableCell sx={{ color: 'primary.main' }} align="right">
                    {totals[year]?.income}
                  </TableCell>
                  <TableCell sx={{ color: 'warning.main' }} align="right">
                    {totals[year]?.spending}
                  </TableCell>
                </TableRow>
              );
            })}
          {sortedData.map(({ name, spending, sum, income }) => {
            const color = sum >= 0 ? 'success.main' : 'error.main';
            return (
              <TableRow
                key={name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {name}
                </TableCell>
                <TableCell sx={{ color }} align="right">
                  {sum}
                </TableCell>
                <TableCell sx={{ color: 'primary.main' }} align="right">
                  {income}
                </TableCell>
                <TableCell sx={{ color: 'warning.main' }} align="right">
                  {spending}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
