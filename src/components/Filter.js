import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect(props) {
  const [selection, setSelection] = React.useState('');

  const handleChange = (event) => {
    setSelection(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120, display: 'inline' }}>
      <FormControl sx={{width: '15%'}}>
        <InputLabel id="demo-simple-select-label">{props.title}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selection}
          label="Age"
          onChange={handleChange}
        >{props.values.map(item => (<MenuItem value={item}>{item}</MenuItem>))}
        </Select>
      </FormControl>
    </Box>
  );
}