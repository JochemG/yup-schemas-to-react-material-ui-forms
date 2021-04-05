import React from 'react';
import {Box, TextField} from '@material-ui/core'
import {FieldComponentProps} from "../../../common-types/field-component";
import {registerYupSchemaType} from "../../../yup-schema-type-mappings";

function NumberField({namePath, value, schemaMetaData}: FieldComponentProps) {
    const label = schemaMetaData?.label === undefined ? namePath[namePath.length - 1] : schemaMetaData.label;
    return <Box width={"100%"} >
        <TextField fullWidth={true} label={label || false} name={namePath.join('.')} defaultValue={value} type={'number'}/>
    </Box>;
}

export function register() {
    registerYupSchemaType('number', {
        reactComponent: NumberField,
        valueFunction: value => value * 1
    });
}