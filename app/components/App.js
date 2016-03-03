import React from 'react';
import $ from 'jquery';

class App extends React.Component {

  // Make sure that our email and password fields
  // receives only string values and are required.
  // For 'static' to work, stage-0 preset is needed in babel
  static propTypes = {
    email: React.PropTypes.string.isRequired,
    password: React.PropTypes.string.isRequired
  }

  // Define default values for both email and password
  static defaultProps = {
    email: 'user@email.com',
    password: '12345678'
  }

  // Define the states our app is going to use. Since
  // our app is using ES7(stage-0) we can get rid of
  // constructor and set our app state here.
  state = {
    logged: false, // true if user enter a valid email and a valid password on the form
    email: '', // stores the input value of email field and sends to submit form
    password: '', // stores the input value of password field and sends to submit form
    emailMsg: '', // stores the invalid email warning
    passMsg: '', // stores the invalid password warning
    forbiddenPass: '', // stores the 'password' string from our fake API.
    validPass: false, // true if password have 8 chars or more
    validEmail: false, // true if email has a valid format
    username: '' // change email into username and store here
  }

  // after our component is mounted, we send a get response
  // to our fake API, receives the forbidden pass value
  // and store it on the component state
  componentDidMount = () => {
    this.serverRequest = $.get(this.props.source, (item) => {
      this.setState({forbiddenPass: item.password});
    });
  }

  // here we simulate a abort on server request if our
  // component is dismounted.
  componentWillUnmount = () => {
    this.serverRequest.abort();
  }

  // get the value being written on the email input,
  // stores the value on email state. Whenever the email
  // is valid/invalid it changes validEmail state to true/false
  emailChange = (e) => {
    // Regex to check if email format is valid
    let emailCheck = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(emailCheck.test(e.target.value)){ //test if email input value passes the regex test
      this.setState({emailMsg: '', validEmail: true}) // since email is valid, our validEmail state is set to true and we make sure there is no warning message on our state
    } else {
      this.setState({validEmail: false}); // if client turns a valid email to an invalid one, we revert the validEmail state to false
    }
    this.setState({email: e.target.value}); //stores the value being written on the input on our email state
  }

  // check if the password have 8 chars or more and
  // store its value
  passChange = (e) => {
    if(e.target.value.length >= 8){ //check if the length of the value on password field have 8 or more chars
      this.setState({passMsg: '', validPass: true}); // if valid, no warning messages and valid state equals true
    } else {
      this.setState({validPass: false}); // if a valid pass turns into invalid, turn true valid pass state to false
    }
    this.setState({password: e.target.value}); // stores what being written on the pass input field
  }

  // here our app handle the submit data and
  // decides if the user can login or not
  handleSubmit = () => {
    if(this.state.validPass & this.state.validEmail){ // check if both email and password are valid for submitting
      if( this.state.password !== this.state.forbiddenPass){ // check if our password is not 'password'
        let username = this.state.email.split('@')[0]; // create a username from our email
        return this.setState({logged: true, username: username, password: '', email: ''}); // user is logged, we set the username and remove the values from the input field
      }
      else {
        return this.setState({emailMsg: '', passMsg: 'Password incorrect!'}); // If password is 'password' we set passMsg state
      }
    }
    else if(!this.state.validEmail){ // if we receive an invalid email
      if(!this.state.validPass){ // if we also receive a password with less than 8 chars
        return this.setState({emailMsg: 'Enter a valid Email!', passMsg: 'Password should have 8 or more characters!'}); // store invalid message for both on our state
      }
      return this.setState({emailMsg: 'Enter a valid Email!', passMsg: ''}); // if pass is valid, stores only warning msg for email
    }
    else {
      return this.setState({emailMsg: '', passMsg: 'Password should have 8 or more characters!'}); // if email is valid, stores only warning msg for pass
    }
  }

  // log user out if he clicks the signout link
  // and prevent link default behaviour
  logout = (e) => {
    e.preventDefault();
    this.setState({logged: false}) // set logged out state to false after clicking the link
  }

  render() {
    // this is what will be displayed if logged state is true, displaying the username value
    // and calling the logout function when link is clicked
    let loggedIn =
      <div>
        <p style={{textAlign: 'center'}}>Hi {this.state.username}, you are logged in!</p>
      </div>

    let validEmail = this.state.validEmail ? 'valid-email' : 'invalid-email' // we create string values to change input class name based on validEmail state

    let validPass = this.state.validPass ? 'valid-pass' : 'invalid-pass' // same as above for the password

    // this is what will be displayed if logged state is false
    // and its the core of our app.
    // the email input have a onChange that sends its value to the emailChange function, and a 'ref' for referencing this input on the tests
    // the pass input have a onChange that sends its value to the passChange function, and a 'ref' for referencing this input on the tests
    // the paragraphs displays the warning messages if any
    // the button runs the handleSubmit function when it's clicked
    let doLogin =
      <span>
        <input className={validEmail} name="email" type='text' value={this.state.email} placeholder='Enter your email' ref="email" onChange={this.emailChange} /><br />
        <p className={validEmail}>{this.state.emailMsg}</p>
        <input className={validPass} type='password' value={this.state.password} placeholder='Enter your password' ref="password" onChange={this.passChange} /><br />
        <p className={validPass}>{this.state.passMsg}</p>
        <button onClick={this.handleSubmit} style={{float: 'right'}}>Login</button>
      </span>
    let uiArea = ( this.state.logged ? loggedIn : doLogin); // display the correct UI based on our logged state
    let signout = (this.state.logged ? <a href="#" onClick={this.logout}>Sign Out</a> : '')
    return (
      <div>
        {uiArea}
        {signout}
      </div>
    )
  }
}

export default App;
