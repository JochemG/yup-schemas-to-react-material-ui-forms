import React from 'react';
import {List, ListSubheader} from '@material-ui/core'
import {AnySchema, ObjectSchema} from "yup";
import {RecursiveFormFromSchema} from "../../recursive-form-from-schema/recursive-form-from-schema";
import {FieldComponentProps} from "../../../common-types/field-component";
import styles from './object-field.module.css';
import {registerYupSchemaType} from "../../../yup-schema-type-mappings";

function ObjectField({namePath, schema, value}: FieldComponentProps) {
    const objectSchema = schema as ObjectSchema<any>;
    const fields = objectSchema.fields;
    return <List className={styles.fullWidth} subheader={namePath.length ?
        <ListSubheader disableSticky={true} disableGutters={true}>
            {namePath[namePath.length - 1]}
        </ListSubheader> :
        undefined
    }>
        <div className={styles.objectChildren}>
            {Object.entries(fields).map(([fieldName, field], index) =>
                <RecursiveFormFromSchema key={index} schema={field as AnySchema} namePath={[...namePath, fieldName]}
                                         value={value && value[fieldName]}/>)}
        </div>
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