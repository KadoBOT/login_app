import React from 'react';
import TestUtils from 'react-addons-test-utils';

class App extends React.Component {

  static propTypes = {
    email: React.PropTypes.string.isRequired,
    password: React.PropTypes.string.isRequired
  }

  static defaultProps = {
    email: 'user@email.com',
    password: '12345678'
  }

  state = {
    logged: false,
    email: '',
    password: '',
    emailMsg: '',
    passMsg: '',
    forbiddenPass: '',
    validPass: false,
    validEmail: false
  }

  componentDidMount = () => {
    this.serverRequest = $.get(this.props.source, (item) => {
      this.setState({forbiddenPass: item.password});
    });
  }

  componentWillUnmount = () => {
    this.serverRequest.abort();
  }

  emailChange = (e) => {
    let emailCheck = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(emailCheck.test(e.target.value)){
      this.setState({emailMsg: '', validEmail: true})
    } else {
      this.setState({validEmail: false});
    }
    this.setState({email: e.target.value});
  }

  passChange = (e) => {
    if(e.target.value.length >= 8){
      this.setState({passMsg: '', validPass: true});
    } else {
      this.setState({validPass: false});
    }
    this.setState({password: e.target.value});
  }

  handleSubmit = () => {
    let emailCheck = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(emailCheck.test(this.state.email) && this.state.password.length >= 8 ){
      if( this.state.password !== this.state.forbiddenPass){
        return this.setState({logged: true, message: 'Logged!'});
      }
      else {
        return this.setState({emailMsg: '', passMsg: 'Password incorrect!'});
      }
    }
    else if(emailCheck.test(this.state.email) == false){
      if(this.state.password.length < 8 ){
        return this.setState({emailMsg: 'Enter a valid Email!', passMsg: 'Password should have 8 or more characters!'});
      }
      return this.setState({emailMsg: 'Enter a valid Email!', passMsg: ''});
    }
    else {
      return this.setState({emailMsg: '', passMsg: 'Password should have 8 or more characters!'});
    }
  }


  render() {
    let loggedIn = <p style={{textAlign: 'center'}}>You are logged in!</p>;
    let validEmail = this.state.validEmail ? 'valid-email' : 'invalid-email'
    let validPass = this.state.validPass ? 'valid-pass' : 'invalid-pass'
    let doLogin =
      <span>
        <input className={validEmail} name="email" type='text' value={this.state.email} placeholder='Enter your email' ref="email" onChange={this.emailChange} /><br />
        <p className={validEmail}>{this.state.emailMsg}</p>
        <input className={validPass} type='password' value={this.state.password} placeholder='Enter your password' ref="password" onChange={this.passChange} /><br />
        <p className={validPass}>{this.state.passMsg}</p>
        <button onClick={this.handleSubmit} style={{float: 'right'}}>Login</button>
      </span>
    let uiArea = ( this.state.logged ? loggedIn : doLogin);
    return (
      <div>
        {uiArea}
      </div>
    )
  }
}

export default App;
