import React, {FormEvent, useCallback} from 'react';
import {AnySchema} from "yup";
import {RecursiveFormFromSchema} from "../recursive-form-from-schema/recursive-form-from-schema";
import {Button} from "@material-ui/core"
import {set} from 'lodash-es';
import {MuiPickersUtilsProvider} from '@material-ui/pickers'
import DateFnsUtils from "@date-io/date-fns";
import {RecursiveApplySchemaFunction, MAP_FIELD_TYPE_TO_VALUE_FUNCTION} from "../../yup-schema-type-mappings";

export type OnSubmitType<ValueType> = (value: ValueType, event: FormEvent<HTMLFormElement>) => void;
export type FormFromSchemaProps<ValueType> = { schema: AnySchema, value?: ValueType, onSubmit?: OnSubmitType<ValueType> };

function recursiveApplySchema(schema: AnySchema, value: any): RecursiveApplySchemaFunction {
    const schemaType = schema.type;
    const valueFunction = MAP_FIELD_TYPE_TO_VALUE_FUNCTION[schemaType];
    return valueFunction && valueFunction(value, recursiveApplySchema, schema);
}

function schemaToValue(schema: AnySchema, formData: FormData): any {
    const object = {root: undefined};
    formData.forEach((value, path) => {
        const setPath = 'root.' + path;
        set(object, setPath, value);
    });
    return recursiveApplySchema(schema, object.root);
}

function useOnSubmit<ValueType>(schema: AnySchema, onSubmit: OnSubmitType<ValueType>) {
    return useCallback((event: FormEvent<HTMLFormElement>) => {
        event.stopPropagation();
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const outputValue = schemaToValue(schema, formData) as ValueType;
        onSubmit && onSubmit(outputValue, event);

        return false;
    }, [schema, onSubmit]);
}

export function FormFromSchema<ValueType>({schema, value, onSubmit}: FormFromSchemaProps<ValueType>) {
    const onSubmitHandler = useOnSubmit(schema, onSubmit);
    const children =
        <form onSubmit={onSubmitHandler}>
            <RecursiveFormFromSchema schema={schema} value={value} namePath={[]}/>
            <Button type={"submit"}>Save</Button>
        </form>;
    return <MuiPickersUtilsProvider utils={DateFnsUtils} children={children}/>;
}