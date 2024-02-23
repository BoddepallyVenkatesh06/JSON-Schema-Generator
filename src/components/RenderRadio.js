import { Box, Tab, Tabs } from "@mui/material";
import { useFormValues } from "../context/FormContext";
import { useEffect, useState } from "react";
import AdvancedFieldsSwitch from "./AdvancedFieldsSwitch";
import MyTooltip from "./Tooltip";

function RenderRadio({ item, hasOptionalFields }) {
  // local state to toggle advanced fields
  const [showAdvanced, setShowAdvanced] = useState(hasOptionalFields ? false : true);
  // get context values
  const { formValues, handleChange } = useFormValues()
  // destructuring the item object
  const {
    description,
    validate,
    jsonKey,
  } = item;
  const { options, required, immutable, pattern, defaultValue } = validate;

  let isDescriptionEmpty = description.length === 0 ? true : false
  let isPatternEmpty = (pattern) ? true : false
  let isEditable = !immutable
  // default value of the options
  const currentFormValue = formValues[jsonKey] || defaultValue;
  // Adding the default value to the formValue state upon component mount
  useEffect(() => {
    // console.log('Mounting Radio', 'jsonKey', jsonKey, 'formValues[jsonKey]', formValues[jsonKey])
    handleChange(jsonKey, currentFormValue, 'mount')
  }, [])
  // Extract label and values from the options object
  const optionValues = options.map(({ label, value }) => {
    return { label, value }
  })

  // update the formValues state upon input change
  function handleTabChange(event, newValue) {
    // console.log('Handling Tab Change with ', 'newValue', newValue, 'formValues', formValues)
    handleChange(jsonKey, newValue, 'mount')
  }

  return (
    <>
      {
        showAdvanced &&
        <Box key={jsonKey}>
          {!isDescriptionEmpty && <MyTooltip text={description} />}
          <Tabs
            indicatorColor="primary"
            value={currentFormValue}
            onChange={handleTabChange}
            textColor="primary"
          >
            {optionValues.map((option) =>
              <Tab key={option.value} value={option.value} label={option.label} />
            )}
          </Tabs>
        </Box>
      }

      <AdvancedFieldsSwitch
        hasOptionalFields={hasOptionalFields}
        showAdvanced={showAdvanced}
        setShowAdvanced={setShowAdvanced} />
    </>


  )
}

export default RenderRadio