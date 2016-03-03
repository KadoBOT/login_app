jest.dontMock('../app/components/App');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const AppComponent = require('../app/components/App').default;

describe('App', () => {
  it('checks if email is invalid', () => {
    // create a fake element into the document
      var App = TestUtils.renderIntoDocument(
        <AppComponent />
      );

      let email = App.refs.email // find the email input and define it

      email.value = 'foo'; // set email input value to foo

      TestUtils.Simulate.change(email); // send the changes on our email input field
      expect(App.state.validEmail).toBeFalsy(); // we expect that our validEmail state returns a false value

      email.value = 'test@test.com'; // set email input value test@test.com
      TestUtils.Simulate.change(email); // send the changes again
      expect(App.state.validEmail).toBeTruthy(); // expect our state to return true
  });
});
