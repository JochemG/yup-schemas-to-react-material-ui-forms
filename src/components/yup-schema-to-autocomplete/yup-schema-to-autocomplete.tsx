import React from "react";
import {AnySchema} from "yup";
import {TextField} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

export function useAutocomplete<Type>(schema: AnySchema) {
    const {oneOf} = schema.describe() as {oneOf: Type[]};
    return {isAutoComplete: oneOf && !!oneOf.length, oneOf};
}

export type Props = {fullWidth: boolean, label: string|boolean, name: string, defaultValue: string, oneOf: string[]};
export function YupSchemaToAutocomplete({oneOf, ...textFieldProps}: Props) {
    return <Autocomplete {...{...textFieldProps}} options={oneOf} renderInput={
        (params) => {
            const {inputProps} = params as {inputProps: {value: string}};
            return <TextField {...{
                ...params,
                inputProps: {
                    ...inputProps,
                    value: inputProps.value
                },
                name: textFieldProps.name
            }}/>
        }
    }/>;
}