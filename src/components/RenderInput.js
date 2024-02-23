import { Box, Stack, TextField } from "@mui/material"
import { useState } from "react"
import MyTooltip from "./Tooltip";
import { useFormValues } from "../context/FormContext";

const RenderInput = ({ item }) => {
    
    const { formValues, handleChange } = useFormValues()
    const { label, description, validate, jsonKey, placeholder, disable } = item;
    const { required, immutable, pattern } = validate;
    
    let isDescriptionEmpty = description.length === 0 ? true : false
    // return null if the component is disabled
    if(disable === true) return null
    return (  
        <>

        <Box key={jsonKey}>
            <Stack direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={2}>
                <label>{label}:</label>
                {!isDescriptionEmpty && <MyTooltip text={description} />}
                <TextField
                    value={formValues[jsonKey]}
                    onChange={(event) => { handleChange(jsonKey, event.target.value, 'mount') }}
                    placeholder={placeholder}
                    required
                    readOnly={immutable}
                    pattern={pattern}
                />
            </Stack>
        </Box>
        
        </>
    )
}

export default RenderInput