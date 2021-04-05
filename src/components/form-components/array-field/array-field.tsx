import React, {useState} from 'react';
import {
    Divider,
    IconButton,
    List,
    ListItem,
    ListSubheader, Typography, Box, Grid
} from '@material-ui/core'
import {AnySchema, ArraySchema} from "yup";
import {RecursiveFormFromSchema} from "../../recursive-form-from-schema/recursive-form-from-schema";
import {FieldComponentProps} from "../../../common-types/field-component";
import {Container, Draggable} from "react-smooth-dnd";
import arrayMove from "array-move";
import {DragHandle, Delete, Add} from "@material-ui/icons";
import styles from './array-field.module.css';
import {registerYupSchemaType} from "../../../yup-schema-type-mappings";

type OnDropFn = (params: any) => void;
type ArrayItem = { id: number, value: any };
type OnDeleteFn = (item: ArrayItem) => void;
type OnAddFn = () => void;

function initialItems(value: any[]) {
    return (value || [])
        .map((v: any, i: number) => ({id: i, value: v}));
}

function useArrayField({namePath, schema, value, schemaMetaData}: FieldComponentProps) {
    const valueArray = initialItems(value);
    const [id, setId] = useState<number>(valueArray.length);
    const [items, setItems] = useState<ArrayItem[]>(valueArray);
    const onDrop: OnDropFn = ({removedIndex, addedIndex}) => {
        setItems((prevState) => arrayMove<ArrayItem>(prevState, removedIndex, addedIndex));
    };
    const onDelete: OnDeleteFn = (item) => {
        setItems((items) => items.filter(i => i.id !== item.id));
    };
    const onAdd: OnAddFn = () => {
        setItems((items) => [...items, {id, value: undefined}]);
        setId((id) => id + 1);
    };
    const typedSchema = schema as ArraySchema<any>;
    const childSchema = typedSchema.innerType as AnySchema;
    const extendNamePath = (index: number) => [...namePath, index + ""];
    const name = schemaMetaData?.label === undefined ? namePath[namePath.length - 1] : schemaMetaData.label;
    return {onAdd, onDrop, onDelete, items, childSchema, extendNamePath, name};
}

function ArrayField(props: FieldComponentProps) {
    const {onAdd, onDrop, onDelete, items, childSchema, name, extendNamePath} = useArrayField(props);
    return <List dense={true} disablePadding={true} className={styles.fullWidth} subheader={<>
        <ListSubheader disableSticky={true} disableGutters={true}>
            <Grid container justify={"space-between"} alignItems={"center"}>
                <Grid>
                    <Typography>{name}</Typography>
                </Grid>
                <Grid>
                    <Box paddingLeft={1}>
                        <IconButton onClick={() => onAdd()} className={styles.addListItem}>
                            <Add/>
                        </IconButton>
                    </Box>
                </Grid>
            </Grid>
        </ListSubheader>
    </>}>
        {!!items?.length && <Container dragHandleSelector=".drag-handle" lockAxis="y" onDrop={(event) => onDrop(event)}>
            {items.map((childValue: ArrayItem, index) =>
                <Draggable key={childValue.id}>
                    {!!index && <Divider/>}
                    <ListItem disableGutters={true} dense={true}>
                        <IconButton className={`drag-handle`}>
                            <DragHandle/>
                        </IconButton>
                        <RecursiveFormFromSchema schema={childSchema} namePath={extendNamePath(index)}
                                                 value={childValue.value} schemaMetaData={{label: false}}/>
                        <IconButton className={styles.deleteListItem} onClick={() => onDelete(childValue)}>
                            <Delete/>
                        </IconButton>
                    </ListItem>
                </Draggable>
            )}
        </Container>}
    </List>;
}

export function register() {
    registerYupSchemaType('array', {
        reactComponent: ArrayField,
        valueFunction: (value, recursiveApplySchema, schema) => {
            const output = [];
            const typedSchema = schema as ArraySchema<any>;
            const childSchema = typedSchema.innerType as AnySchema;
            if (value && typeof value === "object") {
                for (let i = 0; i < Object.keys(value).length; i++) {
                    const item = value[i + ""];
                    const childOutput = recursiveApplySchema(childSchema, item);
                    output.push(childOutput);
                }
            }
            return output;
        }
    })
}