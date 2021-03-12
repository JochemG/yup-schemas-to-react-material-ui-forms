import React from 'react';
import {TextField} from '@material-ui/core'
import {FieldComponentProps} from "../../../common-types/field-component";
import {registerYupSchemaType} from "../../../yup-schema-type-mappings";

function StringField({namePath, value}: FieldComponentProps) {
    return <div>
        <TextField fullWidth={true} label={namePath[namePath.length - 1]} name={namePath.join('.')} defaultValue={value}/>
    </div>;
}

export function register() {
    registerYupSchemaType('string', {
        reactComponent: StringField,
        valueFunction: value => value + ''
    });
}