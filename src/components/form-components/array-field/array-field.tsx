import React, {useState} from 'react';
import {
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListSubheader, Typography, Toolbar, Box
} from '@material-ui/core'
import {AnySchema, ArraySchema} from "yup";
import {RecursiveFormFromSchema} from "../../recursive-form-from-schema/recursive-form-from-schema";
import {FieldComponentProps} from "../../../common-types/field-component";
import {Container, Draggable} from "react-smooth-dnd";
import arrayMove from "array-move";
import {DragHandle, Delete, Add, ListAlt} from "@material-ui/icons";
import styles from './array-field.module.css';
import {last} from 'lodash-es';
import {registerYupSchemaType} from "../../../yup-schema-type-mappings";

type OnDropFn = (params: any) => void;
type ArrayItem = { id: number, value: any };
type OnDeleteFn = (item: ArrayItem) => void;
type OnAddFn = () => void;

function initialItems(value: any[]) {
    return (value || [])
        .map((v: any, i: number) => ({id: i, value: v}));
}

function useArrayField({namePath, schema, value}: FieldComponentProps) {
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
    const name = last(namePath);
    return {onAdd, onDrop, onDelete, items, childSchema, extendNamePath, name};
}

function ArrayField(props: FieldComponentProps) {
    const {onAdd, onDrop, onDelete, items, childSchema, name, extendNamePath} = useArrayField(props);
    return <List disablePadding={true} className={styles.fullWidth} subheader={<>
        <ListSubheader disableSticky={true} disableGutters={true}>
            <Toolbar disableGutters={true} variant={"dense"}>
                <Typography>{name}</Typography>
                <Box paddingLeft={1}>
                    <IconButton onClick={() => onAdd()} className={styles.addListItem}>
                        <Add/>
                    </IconButton>
                </Box>
            </Toolbar>
        </ListSubheader>
    </>}>
        {!!items?.length && <Container dragHandleSelector=".drag-handle" lockAxis="y" onDrop={(event) => onDrop(event)}>
            {items.map((childValue: ArrayItem, index) =>
                <Draggable key={childValue.id}>
                    {!!index && <Divider/>}
                    <ListItem disableGutters={true} dense={true}>
                        <ListItemIcon className={`drag-handle ${styles.noIconSpacing}`}>
                            <DragHandle/>
                        </ListItemIcon>

                        <RecursiveFormFromSchema schema={childSchema} namePath={extendNamePath(index)}
                                                 value={childValue.value} schemaMetaData={{label: false}}/>

                        <ListItemSecondaryAction>
                            <ListItemIcon className={styles.noIconSpacing}>
                                <Delete onClick={() => onDelete(childValue)} className={styles.deleteListItem}/>
                            </ListItemIcon>
                        </ListItemSecondaryAction>
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