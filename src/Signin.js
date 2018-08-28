import React, { Component } from 'react';

class Signin extends Component {
  constructor(props){
    super(props);
    this.state={
      signInEmail:'',
      signInPassword:'',
      error:''
    }
  }

  onEmailChange=(event)=>{
    this.setState({signInEmail:event.target.value});
  };

  onPasswordChange=(event)=>{
    this.setState({signInPassword:event.target.value});
  };

  onSubmitSignin=()=>{
    fetch('http://localhost:3004/signin',{
      method:'post',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        email:this.state.signInEmail,
        password:this.state.signInPassword
      })
    })
    .then(response=>response.json())
    .then(data=>{
      if(data !== 'error logging in'){
        this.props.loadUser(data);
        this.props.isSignedIn(true);
        return this.props.onRouteChange('Products')
      }
      else if(data === 'error logging in'){
        this.setState({error:data})
      }
    })
  }
  render(){
      return(
    <div>   
    <nav>
      <div className="pr1 tr">
          <p onClick={()=>this.props.onRouteChange('Products')} className="link pointer dim dark-gray f2 fw6 f5-ns dib mr3 mr4-ns">Back to Home Page</p>
      </div>
    </nav> 
    <article className="br4 shadow-5 ba mh5 dark-gray mv5 w-80 w-50-m w-60-l flex justify-center center">
      <main className="pa4 black-80 w-70">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
          <legend className="f2-l f4 fw6 w-100 tc center">Sign In</legend>
          <div className="mt3">
          <label className="db fw6 lh-copy flex items-start f6 w-100" htmlFor="email-address">Email</label>
          <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
            type="email" 
            name="email-address"
            id="email-address"
            onChange={this.onEmailChange} 
          />
        </div>
      <div className="mv3">
        <label className="db fw6 lh-copy f6 flex items-start" htmlFor="password">Password</label>
        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
        type="password" 
        name="password"
        id="password" 
        onChange={this.onPasswordChange}
        />
      </div>
      
      </fieldset>
      <div className="lh-copy mt3 flex justify-center">
      <input className="b ph3 w-40-l w-40-m w-100 tc pv2 input-reset ba b--black bg-transparent grow pointer fw6 f6 dib" 
      type="submit" value="Sign in" onClick={this.onSubmitSignin}/>
      </div>
      <div>
      {this.state.error === 'error logging in'? <p className='f5 fw6 red'>Either the Email or the password is incorrect</p>:null}
      </div>
      <div className="lh-copy mt3">
      <p className="f5 fw6 link pointer dim black tc db pointer" onClick={()=>this.props.onRouteChange('Register')}>Register</p>
      </div>
  </div>
</main>
</article>
</div>
    );
  }
}
export default Signin;