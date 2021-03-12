import {object, string, number, date, array, bool} from 'yup';

export const schema = object().shape({
    user: object({
        firstName: string().required(),
        age: number().required(),
        dob: date().required(),
        animal: array().of(object().shape({
            name: string().required(),
            legs: number().required()
        })),
        hasGlasses: bool().required()
    })
})