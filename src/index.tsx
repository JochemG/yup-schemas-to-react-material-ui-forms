import {register as registerArrayField} from "./components/form-components/array-field/array-field";
import {register as registerObjectField} from "./components/form-components/object-field/object-field";
import {register as registerBooleanField} from "./components/form-components/boolean-field/boolean-field";
import {register as registerDateField} from "./components/form-components/date-field/date-field";
import {register as registerNumberField} from "./components/form-components/number-field/number-field";
import {register as registerStringField} from "./components/form-components/string-field/string-field";

registerArrayField();
registerObjectField();
registerBooleanField();
registerDateField();
registerNumberField();
registerStringField();

export {FormFromSchema} from "./components/form-from-schema/form-from-schema";
export type {FormFromSchemaProps, OnSubmitType} from "./components/form-from-schema/form-from-schema";

// TODO: Create examples & do more testing before exposing adding custom Yup types
//export {registerYupSchemaType} from "./yup-schema-type-mappings";
//export type {MappingType, ValueFunction, MappingReactComponent, RecursiveApplySchemaFunction} from "./yup-schema-type-mappings";
//export type {FieldComponentProps} from "./common-types/field-component"