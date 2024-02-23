import React, { useEffect } from 'react'
import renderForm from '../utils/renderForm'
import { Box, FormGroup, FormLabel } from '@mui/material';
import { useFormValues } from '../context/FormContext';

function RenderIgnore({ item }) {
  // get context values
  const { formValues, handleChange, disabledValues, setDisabledValues } = useFormValues()
  // destructuring the item object
  const { label, jsonKey, subParameters, conditions } = item;
  // Since elements with uiType Ignore have subParams, 
  // run the renderForm() on those subComponents
  const SubComponents = renderForm(subParameters)
  // Check if the condtions are true in order to hide/display the elements
  // note conditions is an array of objects
  // There will be an additional field called “conditions” which will decide when to enable/disable this field. 
  // As you can see in the code snippet above. If “pizza_type.type(jsonKey)” is “==(op)” to “naples(value)” then 
  // you will have to show all the fields which are inside the “subParameters” like slices.
  let shouldDisplay = conditions.every((condition) => {
    // destructure condition
    const { jsonKey, op, value } = condition;
    // for every condition check if true or false
    const fieldValue = formValues.type;
    switch (op) {
      case '==': return fieldValue == value
      case '!=': return fieldValue != value
      default:
        return false
    }
  })
  // return jsonKeys of only the subParameters that are not disabled
  let keysOfSubParams = subParameters.filter((param) => {
    return (!param.disable)
  }).map((param)=>{
    return param.jsonKey
  })

  // Add or remove the jsonKey from the disabledValues array
  useEffect(() => {
    // console.log('mounting RenderIgnore', jsonKey)
    // console.log('keysOfSubParams', keysOfSubParams)
    // console.log('shouldDisplay', shouldDisplay, 'jsonKey', jsonKey)
    if (shouldDisplay) {
      // Remove all matching keys of the keysOfSubParams array from the disabledValues array when the component is displayed
      // console.log('DisabledValues before removing keys', disabledValues)
      setDisabledValues((prevDisabledValues)=>{

        return prevDisabledValues.filter((item) => {
          return !keysOfSubParams.includes(item)
        })
      })
      // console.log('newDisabledValues after removing keys', disabledValues)
 
    }
    if (shouldDisplay === false) {
      // console.log('DisabledValues before adding keys', disabledValues)
      // Add all the keys from the keysOfSubParams array to the disabledValues array when the component is hidden
      setDisabledValues((prevDisabledValues)=>{
        return [...prevDisabledValues, ...keysOfSubParams]
      })
      // console.log('newDisabledValues after adding keys', disabledValues)
    }

    return (() => {
      // console.log('unmounting RenderIgnore', jsonKey)
    })
  }, [shouldDisplay]);

  // console.log('Final DisabledValues', disabledValues)
  return (
    <>
      {shouldDisplay &&
        <Box>
          <FormGroup key={jsonKey} >
            <FormLabel>{label}:</FormLabel>
            {SubComponents}
          </FormGroup>
        </Box>

      }    </>
  )
}

export default RenderIgnore