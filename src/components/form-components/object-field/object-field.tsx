import React from 'react';
import {List, ListSubheader, Box} from '@material-ui/core'
import {AnySchema, ObjectSchema} from "yup";
import {RecursiveFormFromSchema} from "../../recursive-form-from-schema/recursive-form-from-schema";
import {FieldComponentProps} from "../../../common-types/field-component";
import styles from './object-field.module.css';
import {registerYupSchemaType} from "../../../yup-schema-type-mappings";

function ObjectField({namePath, schema, value, schemaMetaData}: FieldComponentProps) {
    const objectSchema = schema as ObjectSchema<any>;
    const fields = objectSchema.fields;
    const label = schemaMetaData?.label === undefined ? namePath[namePath.length - 1] : schemaMetaData.label;
    const SubHeader = label ?
        <ListSubheader disableSticky={true} disableGutters={true}>{label}</ListSubheader> :
        undefined;
    return <List className={styles.fullWidth} subheader={SubHeader} disablePadding={true}>
        <Box px={namePath.length ? 1 : 0}>
            {Object.entries(fields).map(([fieldName, field], index) =>
                <Box py={.5} key={index}>
                    <RecursiveFormFromSchema schema={field as AnySchema} namePath={[...namePath, fieldName]}
                                             value={value && value[fieldName]}/>
                </Box>
            )}
        </Box>
    </List>;
}

export function register() {
    registerYupSchemaType('object', {
        reactComponent: ObjectField,
        valueFunction: (value, recursiveApplySchema, schema) => {
            const output: Record<string, any> = {};
            const objectSchema = schema as ObjectSchema<any>;
            Object.entries(objectSchema.fields).map(([fieldName, field]) => {
                output[fieldName] = recursiveApplySchema(field as AnySchema, value[fieldName]);
            });
            return output;
        }
    });
}