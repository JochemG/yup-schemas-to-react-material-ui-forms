import React from 'react';
import {TextField} from '@material-ui/core'
import {FieldComponentProps} from "../../../common-types/field-component";
import {registerYupSchemaType} from "../../../yup-schema-type-mappings";

function NumberField({namePath, value}: FieldComponentProps) {
    return <div>
        <TextField fullWidth={true} label={namePath[namePath.length - 1]} name={namePath.join('.')} defaultValue={value} type={'number'}/>
    </div>;
}

export function register() {
    registerYupSchemaType('number', {
        reactComponent: NumberField,
        valueFunction: value => value * 1
    });
}