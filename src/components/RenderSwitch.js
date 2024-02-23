import { useEffect, useState } from "react";
import { useFormValues } from '../context/FormContext'
import { FormControlLabel, Switch } from '@mui/material';
import AdvancedFieldsSwitch from "./AdvancedFieldsSwitch";
function RenderSwitch({ item, hasOptionalFields }) {
  // local state to toggle advanced fields
  const [showAdvanced, setShowAdvanced] = useState(hasOptionalFields ? false : true);
  // get context values
  const { formValues, setFormValues } = useFormValues()
  // destructuring the item object
  const {
    label,
    description,
    validate,
    jsonKey,
  } = item;
  // destructuring validate object 
  const {
    required,
    immutable,
    defaultValue } = validate;

  if (formValues[jsonKey] === undefined) {
    formValues[jsonKey] = defaultValue;
  }
  // handle change of input
  function handleChange(event) {
    console.log('Handling Switch Change')
    setFormValues({
      ...formValues,
      [jsonKey]: event.target.checked
    })
  }
  // Adding the default value to the formValue state upon component mount
  useEffect(() => {
    // console.log('Mounting Switch', 'jsonKey', jsonKey, 'formValues[jsonKey]', formValues[jsonKey])
    setFormValues((prevValues) => ({
      ...prevValues,
      [jsonKey]: formValues[jsonKey]
    }))
  }, [])

  return (
    <>
      {
        showAdvanced &&
        <FormControlLabel
          control={
            <Switch
              checked={formValues[jsonKey]}
              onChange={handleChange}
              name={jsonKey}
            />
          }
          label={label}
        />
      }

      <AdvancedFieldsSwitch
        hasOptionalFields={hasOptionalFields}
        showAdvanced={showAdvanced}
        setShowAdvanced={setShowAdvanced} />
    </>
  )
}

export default RenderSwitch