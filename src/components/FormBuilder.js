import React, { useEffect, useState } from 'react'
import renderForm from '../utils/renderForm'
import { Box, Button } from '@mui/material'
import { useFormValues } from '../context/FormContext';
import FinalJsonModal from './FinalJsonModal';

function FormBuilder({ uiSchema }) {



  return (
    <>
      <h4>Dynamic Schema Form</h4>
      <Box sx={{ backgroundColor: '#f2f2ff', p: 2 }}>
        {renderForm(uiSchema)}
        <FinalJsonModal />
      </Box>
    </>
  )
}

export default FormBuilder