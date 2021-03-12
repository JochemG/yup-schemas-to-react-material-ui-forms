import {ReactElement} from "react";
import {AnySchema} from "yup";
import {FieldComponentProps} from "./common-types/field-component";

export type RecursiveApplySchemaFunction = (schema: AnySchema, value: any) => any;
export type MappingReactComponent = ({ namePath, value }: FieldComponentProps) => ReactElement;
export type ValueFunction = (value: any, r: RecursiveApplySchemaFunction, s: AnySchema) => any;

export type MappingType = {
    reactComponent: MappingReactComponent,
    valueFunction: ValueFunction
}

export const MAP_FIELD_TYPE_TO_COMPONENT: Record<string, MappingReactComponent> = {};
export const MAP_FIELD_TYPE_TO_VALUE_FUNCTION: Record<string, ValueFunction> = {};
export function registerYupSchemaType(yupSchemaType: string, mapping: MappingType) {
    MAP_FIELD_TYPE_TO_COMPONENT[yupSchemaType] = mapping.reactComponent;
    MAP_FIELD_TYPE_TO_VALUE_FUNCTION[yupSchemaType] = mapping.valueFunction;
}