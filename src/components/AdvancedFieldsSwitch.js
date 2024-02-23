import { useState } from 'react'

function AdvancedFieldsSwitch({ hasOptionalFields, showAdvanced, setShowAdvanced }) {

    return (
        <>
            {hasOptionalFields ?          
            <button onClick={()=>{
                setShowAdvanced(!showAdvanced)
            }}>
                Toggle Advanced Fields
            </button>
            
            : null
            
            }
        </>
    )
}

export default AdvancedFieldsSwitch