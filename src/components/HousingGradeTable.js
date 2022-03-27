import React, { Component } from 'react'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function BasicTable(props) {
  console.log(props);
  
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 300}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Grade 1</TableCell>
            <TableCell align="right">Grade 2</TableCell>
            <TableCell align="right">Grade 3</TableCell>
            <TableCell align="right">Grade 4</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow
            key={props.grade1}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell>{props.grade1}</TableCell>
            <TableCell align="right">{props.grade2}</TableCell>
            <TableCell align="right">{props.grade3}</TableCell>
            <TableCell align="right">{props.grade4}</TableCell>
          </TableRow>

        </TableBody>
      </Table>
    </TableContainer>
  );
}