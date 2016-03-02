jest.dontMock('../app/components/App');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const App = require('../app/components/App')

describe('emailChange', () => {
 it('checks validation of email', () => {
   var email = this.refs.input;
   email.value = 'test';
   TestUtils.Simulate.change(email);
   expect(email.toBeFalsy())
 });
});
