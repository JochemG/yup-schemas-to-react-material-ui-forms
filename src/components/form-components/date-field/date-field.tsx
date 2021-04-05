import React, {useState} from 'react';
import {KeyboardDatePicker} from '@material-ui/pickers';
import {FieldComponentProps} from "../../../common-types/field-component";
import {registerYupSchemaType} from "../../../yup-schema-type-mappings";
import {Box} from "@material-ui/core";

function DateField({namePath, value, schemaMetaData}: FieldComponentProps) {
    const [dateValue, setDateValue] = useState(value);
    const label = schemaMetaData?.label === undefined ? namePath[namePath.length - 1] : schemaMetaData.label;
    return <Box width={"100%"} >
        <KeyboardDatePicker fullWidth={true} label={label || false} name={namePath.join('.')} value={dateValue} onChange={setDateValue} format={"MM/dd/yyyy"}/>
    </Box>;
}

export function register() {
    registerYupSchemaType('date', {
        reactComponent: DateField,
        valueFunction: value => value
    });
}