jest.dontMock('../app/components/App');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const AppComponent = require('../app/components/App').default;

describe('App', () => {
  it('checks if submit form data is valid', () => {
      var App = TestUtils.renderIntoDocument(
        <AppComponent />
      );
      let password = App.refs.password
      let email = App.refs.email

      let testInvalidPass = ['123', '1234567', 'password'];
      let testInvalidEmail = ['foo', 'foo@barcom', 'foo@.com', 'bar@com.a']

      for(let i = 0; i <= testInvalidPass.length; i++){
        password.value = testInvalidPass[i];
        TestUtils.Simulate.change(password);
        for(let z = 0; z <= testInvalidEmail.length; z++){
          email.value = testInvalidEmail[z];
          TestUtils.Simulate.change(email);
          App.handleSubmit();
          expect(App.state.logged).toBeFalsy();
        }
      }

      let testValidPass = ['12345678', 'FooBarLorem', 'NoTpaSSword'];
      let testValidEmail = ['foo@bar.com', 'nar@foo.com.br', 'foo@bar.tv', 'foo.bar@bar.ar']

      for(let i = 0; i <= testValidPass.length; i++){
        password.value = testValidPass[i];
        TestUtils.Simulate.change(password);
        for(let z = 0; z <= testValidEmail.length; z++){
          email.value = testValidEmail[z];
          TestUtils.Simulate.change(email);
          App.handleSubmit();
          expect(App.state.logged).toBeTruthy();
        }
      }
  });
});
