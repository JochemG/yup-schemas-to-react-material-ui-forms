import React from 'react';
import {FormControlLabel, Checkbox, Box} from '@material-ui/core'
import {FieldComponentProps} from "../../../common-types/field-component";
import {registerYupSchemaType} from "../../../yup-schema-type-mappings";

function BooleanField({namePath, value, schemaMetaData}: FieldComponentProps) {
    const label = schemaMetaData?.label === undefined ? namePath[namePath.length - 1] : schemaMetaData.label;
    return <Box width={"100%"}>
        <FormControlLabel label={label || false} control={<Checkbox value={true} name={namePath.join('.')} defaultChecked={!!value}/>}/>
    </Box>;
}

export function register() {
    registerYupSchemaType('boolean', {
        reactComponent: BooleanField,
        valueFunction: value => typeof value === 'string' ? value === 'true' : !!value
    });
}