import React, {useState} from 'react';
import {KeyboardDatePicker} from '@material-ui/pickers';
import {FieldComponentProps} from "../../../common-types/field-component";
import {registerYupSchemaType} from "../../../yup-schema-type-mappings";

function DateField({namePath, value}: FieldComponentProps) {
    const [dateValue, setDateValue] = useState(value);
    return <div>
        <KeyboardDatePicker fullWidth={true} label={namePath[namePath.length - 1]} name={namePath.join('.')} value={dateValue} onChange={setDateValue} format={"MM/dd/yyyy"}/>
    </div>;
}

export function register() {
    registerYupSchemaType('date', {
        reactComponent: DateField,
        valueFunction: value => value
    });
}