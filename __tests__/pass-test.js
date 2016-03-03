jest.dontMock('../app/components/App');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const AppComponent = require('../app/components/App').default;

describe('App', () => {
  it('checks if pass have 8 chars or more', () => {
      var App = TestUtils.renderIntoDocument(
        <AppComponent />
      );
      let password = App.refs.password //find our password field on App and define

      password.value = 'foo'; // set password value to something invalid
      TestUtils.Simulate.change(password); //simulate the change
      expect(App.state.password.length).toBeLessThan(8); //expect our password state length to have less than 8 chars
      expect(App.state.validPass).toBeFalsy(); expect  //expect our validPass state to be false

      password.value = '12345678'; // set password value to something valid
      TestUtils.Simulate.change(password); // simulate the change
      expect(App.state.password.length).toBeGreaterThan(7); // expect password length to have more than 7 chars
      expect(App.state.validPass).toBeTruthy(); // expect our state to be true
  });
});
