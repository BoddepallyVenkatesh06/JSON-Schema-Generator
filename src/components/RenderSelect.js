import React, { useEffect, useState } from 'react'
import { useFormValues } from '../context/FormContext';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import AdvancedFieldsSwitch from './AdvancedFieldsSwitch';
import MyTooltip from './Tooltip';

function RenderSelect({ item, hasOptionalFields }) {
  // local state to toggle advanced fields
  const [showAdvanced, setShowAdvanced] = useState(hasOptionalFields ? false : true);
  // get context values
  const { formValues, handleChange } = useFormValues()
  // destructuring the item object
  const { jsonKey, label, validate, description } = item;
  const { options, defaultValue } = validate;
  let isDescriptionEmpty = description.length === 0 ? true : false
  const currentFormValue = formValues[jsonKey] || defaultValue;
  // Adding the default value to the formValue state upon component mount
  useEffect(() => {
    // console.log('Mounting Select', 'jsonKey', jsonKey, 'currentFormValue', currentFormValue)
    handleChange(jsonKey, currentFormValue, 'mount')
  }, [])
  // Extract label and values from the options object
  const optionValues = options.map(({ label, value }) => {
    return { label, value }
  })

  const handleSelectChange = (event) => {
    // console.log('Handling Select Change')
    handleChange(jsonKey, event.target.value, 'mount')
  }
  // console.log(jsonKey ,'hasOptionalFields', hasOptionalFields, showAdvanced)
  return (
    <>{
      showAdvanced &&
      <Box sx={{ bgcolor: '#f2f2ff'}}>
      <FormControl sx={{ marginTop: 2 }} key={jsonKey} fullWidth>
      <InputLabel>{label}</InputLabel>
      {!isDescriptionEmpty && <MyTooltip text={description} />}
      <Select
        value={currentFormValue}
        onChange={handleSelectChange}
        label={label}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    </Box>
    }

      <AdvancedFieldsSwitch
        hasOptionalFields={hasOptionalFields}
        showAdvanced={showAdvanced}
        setShowAdvanced={setShowAdvanced} />

    </>
  )
}

export default RenderSelect