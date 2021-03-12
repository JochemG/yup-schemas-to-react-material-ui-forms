import {render} from 'react-dom';
import React, {useMemo} from 'react';
import {schema} from '../test-schemas/schema1';
import {FormFromSchema} from "./index";

const LOCALSTORAGE_KEY = 'mock-db-for-form-data';

function App() {
    const savedValue = useMemo(() => {
        const localStorageData = window.localStorage.getItem(LOCALSTORAGE_KEY);
        return localStorageData ? JSON.parse(localStorageData) : undefined;
    }, []);
    return <FormFromSchema schema={schema} value={savedValue} onSubmit={(value) => {
        console.log(value);
        window.localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(value));
    }}/>;
}

render(<App/>, document.getElementById('app'));