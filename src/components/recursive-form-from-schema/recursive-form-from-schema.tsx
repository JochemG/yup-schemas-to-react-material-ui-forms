import React from 'react';
import {FieldComponentProps} from "../../common-types/field-component";
import {MAP_FIELD_TYPE_TO_COMPONENT} from "../../yup-schema-type-mappings";

export function RecursiveFormFromSchema({namePath, schema, value}: FieldComponentProps) {
    const Component = MAP_FIELD_TYPE_TO_COMPONENT[schema.type];
    return <>
        {Component ?
            <Component schema={schema} namePath={namePath} value={value}/>:
            <div>{`Type not supported. name: ${namePath.join('.')}, schema.type: ${schema.type}`}</div>}
    </>;
}