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
      let password = App.refs.password
      password.value = 'foo';
      TestUtils.Simulate.change(password);
      expect(App.state.password.length).toBeLessThan(8);
      expect(App.state.validPass).toBeFalsy();
      password.value = '12345678';
      TestUtils.Simulate.change(password);
      expect(App.state.password.length).toBeGreaterThan(7);
      expect(App.state.validPass).toBeTruthy();
  });
});
