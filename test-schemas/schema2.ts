import {object, string, number, date, array, bool} from 'yup';

export const schema = object().shape({
    arrayOfObjects: array().of(object({something: string(), somethingElse: string()})),
    arrayOfString: array().of(string()),
    arrayOfBooleans: array().of(bool()),
    arrayOfNumber: array().of(number()),
    arrayOfDate: array().of(date()),
    arrayOfArrayOfString: array().of(array().of(string())),
})