import React from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';

const MyTooltip = ({ text }) => {
  return (
    <Tooltip title={text}>
      <IconButton>
        <InfoIcon fontSize="small"/>
      </IconButton>
    </Tooltip>
  );
}

export default MyTooltip;