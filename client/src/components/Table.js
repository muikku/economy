import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { CardContent } from '@mui/material';

const DataTable = ({ data }) => {
  const reversed = Array.from(data).reverse();
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
          {reversed.map(({ name, spending, sum, income }) => {
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
