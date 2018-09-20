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
    fetch('https://obscure-gorge-79821.herokuapp.com/signin',{
      method:'post',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        email:this.state.signInEmail,
        password:this.state.signInPassword
      })
    })
    .then(response=>response.json())
    .then(data=>{
      if(data.id){
        this.props.loadUser(data);
        this.props.isSignedIn(true);
        return this.props.onRouteChange('Products')
      }
      else {
        this.setState({error:'error logging in'})
      }
    })
  }
  render(){
      return(
    <div className='flex flex-column justify-around items-center'>   
    
    <article className="br4 mt5 shadow-5 ba bw1 dark-gray w-80 w-60-m w-50-l flex flex-column justify-center items-center">
      <main className="pa4 black-80 w-70">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
          <legend className="f2-l f4 fw6 w-100 tc center">Sign In</legend>
        <div className="mt3">
          <label className="db fw6 flex items-start f6 w-100" htmlFor="email-address">Email</label>
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
      <div className="mt3 w-80 flex justify-center">
      <input className="b ph3 w-40-l w-70-m w-80 tc pv2 input-reset ba b--black bg-transparent grow pointer fw6 f6 dib" 
      type="submit" value="Sign in" onClick={this.onSubmitSignin}/>
      </div>
      <div>
      {this.state.error === 'error logging in'? <p className='f5 fw6 red'>Either the Email or the password is incorrect</p>:null}
      </div>
      <div className="mt3 w-80">
      <p className="f5 tc fw6 link pointer dim black tc db pointer" onClick={()=>this.props.onRouteChange('Register')}>Register</p>
      </div>
  </div>
</main>
</article>
</div>
    );
  }
}
export default Signin;