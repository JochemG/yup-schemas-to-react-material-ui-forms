import {render} from 'react-dom';
import React, {useMemo} from 'react';
import {schema as schema1} from '../test-schemas/schema1';
import {schema as schema2} from '../test-schemas/schema2';
import {FormFromSchema} from "./index";

const ACTIVE_SCHEMA = "schema1";

const SCHEMAS = {
    schema1, schema2
}
const LOCALSTORAGE_KEY = 'mock-db-for-form-data' + ACTIVE_SCHEMA;

function App() {
    const savedValue = useMemo(() => {
        const localStorageData = window.localStorage.getItem(LOCALSTORAGE_KEY);
        return localStorageData ? JSON.parse(localStorageData) : undefined;
    }, []);
    return <FormFromSchema schema={SCHEMAS[ACTIVE_SCHEMA]} value={savedValue} onSubmit={(value) => {
        console.log(value);
        window.localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(value));
    }}/>;
}

render(<App/>, document.getElementById('app'));