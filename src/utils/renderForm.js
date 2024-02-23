// utils/renderForm.js
import React, { useState } from 'react';
import RenderGroup from '../components/RenderGroup';
import RenderIgnore from '../components/RenderIgnore';
import RenderInput from '../components/RenderInput';
import RenderNumber from '../components/RenderNumber';
import RenderRadio from '../components/RenderRadio';
import RenderSelect from '../components/RenderSelect';
import RenderSwitch from '../components/RenderSwitch';

function renderForm(uiSchema) {
    
    let sortedUiSchema = uiSchema.sort((a, b) => {
        return a.sort - b.sort;
    });

    let hasOptionalFields = false;

    let formComponents = sortedUiSchema.map((item) => {
        
        // Check if the item is required, by checking if it has a validate object and if it has a required property
        const isRequired = item.validate && item.validate.required;
        // If the item is not required, set hasOptionalFields to true
        if (!isRequired) {
            hasOptionalFields = true;
        }

        switch (item.uiType) {
            case 'Input':
                return <RenderInput item={item} hasOptionalFields={hasOptionalFields} />;
            case 'Group':
                return <RenderGroup item={item} hasOptionalFields={hasOptionalFields} />;
            case 'Number':
                return <RenderNumber item={item} hasOptionalFields={hasOptionalFields} />;
            case 'Select':
                return <RenderSelect item={item} hasOptionalFields={hasOptionalFields} />;
            case 'Switch':
                return <RenderSwitch item={item} hasOptionalFields={hasOptionalFields} />;
            case 'Radio':
                return <RenderRadio item={item} hasOptionalFields={hasOptionalFields} />;
            case 'Ignore':
                return <RenderIgnore item={item} hasOptionalFields={hasOptionalFields} />;
            default:
                return null;
        }
    });
    return formComponents
}

export default renderForm;
