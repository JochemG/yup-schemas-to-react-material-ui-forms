import {AnySchema} from "yup";

export type FieldComponentProps = {
    namePath: string[],
    value: any,
    schema: AnySchema
}