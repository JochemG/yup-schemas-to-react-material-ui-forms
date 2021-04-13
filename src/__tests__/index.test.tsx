import React from "react";
import {AnySchema, BaseSchema} from "yup"
import {FormFromSchema} from '../index'
import {schema as schema1} from '../../test-schemas/schema1';
import {render, act as reactAct, fireEvent, getByText} from '@testing-library/react';
// @ts-ignore
import {testOnDrops} from "react-smooth-dnd";
jest
    .useFakeTimers('modern')
    .setSystemTime(new Date('2020-01-01').getTime());

describe('FormFromSchema', () => {
    beforeEach(() => {
        testOnDrops.splice(0);
    })
    type ActProperties = {
        schema: AnySchema,
        value: any,
        actions?: ({container: HTMLElement}) => void
    }
    function act({schema, value, actions}: ActProperties) {
        const onSubmit = jest.fn();
        const rendered = render(<FormFromSchema schema={schema} value={value} onSubmit={onSubmit}/>)
        const {asFragment, container} = rendered;
        actions && actions({container});
        fireEvent.click(getByText(container,"Save"))
        return {
            toAssert: () => ({
                asFragment: asFragment(),
                onSubmitCalls: onSubmit.mock.calls.map(call => [call[0], call[1].nativeEvent.toString(), call.length])
            })
        }
    }

    describe('schema1', () => {
        test(`Render with values`, () => {
            expect.assertions(1);
            const actions = ({container}: {container: HTMLElement}) => {
                // Add cat with 4 legs to end of animals list
                fireEvent.click(container.getElementsByClassName("addListItem")[0]);
                fireEvent.change(container.querySelector('input[name="user.animal.2.name"]'), { target: { value: 'Kitty cat' } });
                fireEvent.change(container.querySelector('input[name="user.animal.2.legs"]'), { target: { value: '4' } });
                // Delete the dog (first item)
                fireEvent.click(container.getElementsByClassName("deleteListItem")[0]);
                // Swap cat & bird
                reactAct(() => {testOnDrops[0]({removedIndex: 1, addedIndex: 0})});
            };
            const {toAssert} = act({
                schema: schema1,
                value: {
                    user: {
                        firstName: 'John',
                        age: 28,
                        dob: new Date(0),
                        animal: [{
                            name: 'Jack doggo',
                            legs: 4
                        }, {
                            name: 'Coco birdie',
                            legs: 2
                        }],
                        hasGlasses: true,
                        country: "Belgium"
                    }
                },
                actions
            });

            expect(toAssert()).toMatchSnapshot();
        });
        test(`Render without values`, () => {
            expect.assertions(1);
            const {toAssert} = act({
                schema: schema1,
                value: undefined
            });

            expect(toAssert()).toMatchSnapshot();
        });
        test(`Render with user == null`, () => {
            expect.assertions(1);
            const {toAssert} = act({
                schema: schema1,
                value: {user: null}
            });

            expect(toAssert()).toMatchSnapshot();
        });
    })

    describe('invalid schema item', () => {
        class SomeNewYupType extends BaseSchema {
            constructor() {
                super({type: "someNewYupType"});
            }
        }
        function someNewYupType() {
            return new SomeNewYupType();
        }
        test('Render', () => {
            expect.assertions(1);

            const {toAssert} = act({
                schema: someNewYupType(),
                value: undefined
            });

            expect(toAssert()).toMatchSnapshot();
        });
    });
})
export {};