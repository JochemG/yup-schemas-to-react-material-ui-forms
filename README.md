A library that converts Yup schemas to a React form build with MaterialUI.
# Example
```
import {FormFromSchema} from "yup-schemas-to-react-material-ui-forms";
import {object, string, number, date, array, bool} from 'yup';

const schema = object().shape({
    user: object({
        firstName: string().required(),
        dob: date().required(),
        vehicles: array().of(object().shape({
            brand: string().required(),
            mileage: number().required(),
            isElectic: boolean().required()
        }))
    })
})

const initialFormValue = {
    user: {
        firstName: "test first name",
        dob: "01/31/1992",
        vehicles:[
            {brand:"Toyota",mileage:45834, isElectric: false},
            {brand:"Tesla",mileage:12493, isElectric: true},
        ]
    }
}

function renderForm({initialFormValue, saveNewValue}) {
    return <FormFromSchema
        schema={schema}
        value={initialFormValue}
        onSubmit={(value) => {
           saveNewValue(value);
        }
    }/>;
}
```

# Try it yourself
1) Clone the repository (you can find the URL in the package.json and on npmjs.com)
1) ```npm install```
1) ```npm start```. This can take a minute to compile & open a browser window that shows the example.
1) Optional: modify the ```/src/local-dev-index.tsx``` and try out your own yup schemas :)