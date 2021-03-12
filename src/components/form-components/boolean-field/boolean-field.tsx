import React from 'react';
import {FormControlLabel, Checkbox} from '@material-ui/core'
import {FieldComponentProps} from "../../../common-types/field-component";
import {registerYupSchemaType} from "../../../yup-schema-type-mappings";

function BooleanField({namePath, value}: FieldComponentProps) {
    return <>
        <FormControlLabel label={namePath[namePath.length - 1]} control={<Checkbox value={true} name={namePath.join('.')} defaultChecked={!!value}/>}/>
    </>;
}

export function register() {
    registerYupSchemaType('boolean', {
        reactComponent: BooleanField,
        valueFunction: value => typeof value === 'string' ? value === 'true' : !!value
    });
}