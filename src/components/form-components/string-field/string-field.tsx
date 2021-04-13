import React from 'react';
import {Box, TextField} from '@material-ui/core'
import {FieldComponentProps} from "../../../common-types/field-component";
import {registerYupSchemaType} from "../../../yup-schema-type-mappings";
import {YupSchemaToAutocomplete, useAutocomplete} from "../../yup-schema-to-autocomplete/yup-schema-to-autocomplete";

function StringField({namePath, value, schemaMetaData, schema}: FieldComponentProps) {
    const label = schemaMetaData?.label === undefined ? namePath[namePath.length - 1] : schemaMetaData.label;
    const textFieldProps = {fullWidth: true, label: label || false, name: namePath.join('.'), defaultValue: value};
    const {isAutoComplete, oneOf} = useAutocomplete<string>(schema);
    return <Box width={"100%"}>
        {
            isAutoComplete ?
                <YupSchemaToAutocomplete {...textFieldProps} oneOf={oneOf}/> :
                <TextField {...textFieldProps}/>
        }
    </Box>;
}

export function register() {
    registerYupSchemaType('string', {
        reactComponent: StringField,
        valueFunction: value => value + ''
    });
}