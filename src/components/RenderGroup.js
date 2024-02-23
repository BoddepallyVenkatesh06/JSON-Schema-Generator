import { Box, FormGroup, FormLabel, Typography } from '@mui/material'
import { useFormValues } from '../context/FormContext';
import renderForm from '../utils/renderForm'
import { useState } from 'react';
import AdvancedFieldsSwitch from './AdvancedFieldsSwitch';
function RenderGroup({ item, hasOptionalFields }) {
  // local state to toggle advanced fields
  const [showAdvanced, setShowAdvanced] = useState(hasOptionalFields ? false : true);
  // get context values from FormContext
  const { formValues, handleChange } = useFormValues()
  // destructuring the item object
  const { label, description, validate, jsonKey, placeholder, subParameters } = item;
  const { required, immutable, pattern } = validate;

  let isDescriptionEmpty = description.length === 0 ? true : false
  let isPatternEmpty = (pattern) ? true : false
  let isEditable = !immutable

  const SubComponents = renderForm(subParameters)
  return (
    <>
{
      showAdvanced &&
      <Box sx={{ p: 2 }}>
        <FormGroup key={jsonKey} >
          <FormLabel>{label}:</FormLabel>
          {SubComponents}
        </FormGroup>
      </Box>
}
      <AdvancedFieldsSwitch
        hasOptionalFields={hasOptionalFields}
        showAdvanced={showAdvanced}
        setShowAdvanced={setShowAdvanced} />
    </>
  )
}

export default RenderGroup