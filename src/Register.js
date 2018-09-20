import React, { Component } from 'react';

class Register extends Component{
	constructor(){
    super();
    this.state={
      registerName:'',
      registerEmail:'',
      registerPassword:'',
      error:''
    }
  }

  onEmailChange=(event)=>{
    this.setState({registerEmail:event.target.value});
  };
  
  onPasswordChange=(event)=>{
    this.setState({registerPassword:event.target.value});
  };

  onNameChange=(event)=>{
    this.setState({registerName:event.target.value});
  };

  onRegisterSubmit=()=>{
    fetch('https://obscure-gorge-79821.herokuapp.com/register',{
      method:'post',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        email:this.state.registerEmail,
        name:this.state.registerName,
        password:this.state.registerPassword
      })
    })
    .then(response=>response.json())
    .then(user=>{
      if(user.id){
        this.props.loadUser(user);
        this.props.isSignedIn(true);
        this.props.onRouteChange('Products');
      }
      else{
        this.setState({error:'the user already exist!!!'})
      }
    })
  };

render(){
  return(
  <div>
    <article className="br4 shadow-5 ba bw1 mh5 flex flex-column items-center justify-center mv5 w-80 w-60-m w-50-l center">
      <main className="pa4 black-80 w-70 cen">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f2 fw6 ph0 w-100 tc center">Register</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy flex items-start f6 w-100" htmlFor="name">Name</label>
              <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                type="text" 
                name="name"  
                id="name"
                onChange={this.onNameChange} 
                />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6 flex items-start" htmlFor="email">Email</label>
              <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" 
                name="email"  
                id="email"
                onChange={this.onEmailChange}
                />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6 flex items-start" htmlFor="userpassword">Password</label>
              <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                type="password" 
                name="userpassword"  
                id="userpassword" 
                onChange={this.onPasswordChange}
              />
            </div>
        </fieldset>
          <div className="center flex justify-center">
            <input className="b ph3 w-40-l link w-60-m tc w-80 pv2 input-reset ba b--black bg-transparent grow pointer fw6 f6 dib"
            type="submit" value="Submit" onClick={this.onRegisterSubmit}/>
          </div>
          <div>
            {this.state.error === 'the user already exist!!!'? <p className='f5 fw6 red'>The user already exist!!!</p>:null}
          </div>
        </div>
      </main>
    </article>
  </div>
  );
}


  
}
export default Register;