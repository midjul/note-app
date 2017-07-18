import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import { Login } from './Login';

if (Meteor.isClient) {

    describe('Login', function () {
        it('should show error messages', function () {
            const error = "This is not working";
            const wrapper = mount(<Login loginWithPassword={() => { }} />)
            wrapper.setState({ error })
            const text = wrapper.find('p').text();
            expect(text).toBe(error);

            wrapper.setState({ error: '' });
            const p = wrapper.find('p').length;
            expect(p).toBe(0);

        });

        it ('should call loginWithPassword with the form data', function () {
            const email = "djulovic@test.com";
            const password = 'password123';
            const spy= expect.createSpy();
            const wrapper=mount(<Login loginWithPassword={spy} />);
             wrapper.ref('email').node.value=email;
             wrapper.ref('password').node.value=password;

             wrapper.find('form').simulate('submit');
             expect(spy.calls[0].arguments[0]).toEqual({email});
             expect(spy.calls[0].arguments[1]).toBe(password);
            
        });

        it('should set loginWIthPassword callback with errors', function () {
           const spy=expect.createSpy();
           const wrapper=mount(<Login loginWithPassword={spy} />);

           wrapper.find('form').simulate('submit');
           spy.calls[0].arguments[2]({});
           expect(wrapper.state('error')).toNotBe('');

           spy.calls[0].arguments[2]();
           expect(wrapper.state('error')).toBe('');
        });
    });

}