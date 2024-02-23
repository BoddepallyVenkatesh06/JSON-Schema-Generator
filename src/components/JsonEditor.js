import { Box, TextField } from '@mui/material';
import React from 'react'

function JsonEditor({ uiSchema, setUiSchema }) {

    const handleEditorChange = (event) => {
        try {
            console.log('handleEditorChange')
            const json = JSON.parse(event.target.value)
            setUiSchema(json)
        } catch (error) {
            console.log('Invalid JSON format')
        }
    }

    return (
        <>   <Box >
            <h4>Paste your JSON Schema below</h4>
            <p>Sample JSON schema pre-loaded</p>
            <p>Note: You can only paste a valid Json, invalid JSON will thorw an error.</p>
            <p>Edit values inside the inverted commas only, for boolean value directly overwrite/paste the value.</p>
            <TextField
                fullWidth
                multiline
                rows={25}
                variant="outlined"
                placeholder="Paste your UI Schema here"
                value={JSON.stringify(uiSchema, null, 2)}
                onChange={handleEditorChange}
            />
        </Box></>
    )
}

export default JsonEditor