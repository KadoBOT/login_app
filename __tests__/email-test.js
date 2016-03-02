jest.dontMock('../app/components/App');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const AppComponent = require('../app/components/App').default;

describe('App', () => {
  it('checks if email is invalid', () => {
      var App = TestUtils.renderIntoDocument(
        <AppComponent />
      );
      let email = App.refs.email
      email.value = 'foo';
      TestUtils.Simulate.change(email);
      expect(App.state.validEmail).toBeFalsy();
      email.value = 'test@test.com';
      TestUtils.Simulate.change(email);
      expect(App.state.validEmail).toBeTruthy();
  });
});
