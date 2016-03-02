import React from 'react';

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
    invalidEmail: '',
    invalidPass: '',
    validPass: false,
    validEmail: false
  }

  emailChange = (e) => {
    let emailCheck = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(emailCheck.test(e.target.value)){
      this.setState({validEmail: true, invalidEmail: false})
    } else {
      this.setState({validEmail: false, invalidEmail: true});
    }
    this.setState({email: e.target.value});
  }

  passChange = (e) => {
    if(e.target.value.length >= 8){
      this.setState({validPass: true, invalidPass: false});
    } else {
      this.setState({validPass: false, invalidPass: true});
    }
    this.setState({password: e.target.value});
  }

  handleSubmit = () => {
    let emailCheck = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(emailCheck.test(this.state.email) && this.state.password.length >= 8 ){
      if( this.state.password !== 'password'){
        return this.setState({logged: true, message: 'Logged!'});
      }
      else if ( this.state.password.length < 8 ){
        return this.setState({invalidPass: 'Password should have 8 or more characters!'});
      }
      else {
        return this.setState({invalidPass: 'Password incorrect!'});
      }
    }
    else if(emailCheck.test(this.state.email) == false){
      if(this.state.password.length < 8 ){
        return this.setState({invalidEmail: 'Enter a valid Email!', invalidPass: 'Password should have 8 or more characters!'});
      }
      return this.setState({invalidEmail: 'Enter a valid Email!'});
    }
  }


  render() {
    let loggedIn = <p style={{textAlign: 'center'}}>You are logged in!</p>;
    let validEmail = this.state.validEmail ? 'valid-email' : 'invalid-email'
    let validPass = this.state.validPass ? 'valid-pass' : 'invalid-pass'
    let doLogin =
      <span>
        <input className={validEmail} type='text' value={this.state.email} placeholder='Enter your email' ref="input" onChange={this.emailChange} /><br />
        <p className={validEmail}>{this.state.invalidEmail}</p>
        <input className={validPass} type='password' value={this.state.password} placeholder='Enter your password' ref="password" onChange={this.passChange} /><br />
        <p className={validPass}>{this.state.invalidPass}</p>
        <button onClick={this.handleSubmit} style={{float: 'right'}}>Login</button>
      </span>
    let uiArea = ( this.state.logged ? loggedIn : doLogin)
    return (
      <div>
        {uiArea}
        {this.state.logged ? this.props.isLogged : this.props.notLogged}
      </div>
    )
  }
}

export default App;
