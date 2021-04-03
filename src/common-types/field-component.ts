import {AnySchema} from "yup";

export type SchemaMetaData = {
    label?: string|false
}

export type FieldComponentProps = {
    namePath: string[],
    value: any,
    schema: AnySchema
    schemaMetaData?: SchemaMetaData
}