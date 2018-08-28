import React, { Component } from 'react';
import Logo from './Logo.png';

class Navbar extends Component {

  onLogOut=()=>{
    this.props.isSignedIn(false);
    this.props.onRouteChange('Products')
  }

    render() {
    return (
      <div>
      {this.props.signedIn === true
        ?<nav className="dt w-100 border-box bb b--black pa3 ph5-ns">
        <img src={Logo} className="link pointer dib w4 h3 br-100 ba dtc v-mid mid-gray link dim w-25-l w-30" 
        alt="Site Name" onClick={()=>this.props.onRouteChange('Products')}/>
        <div className="dtc v-mid w-75 tr">
          <p onClick={()=>this.props.onRouteChange('Products')} className="link pointer dim dark-gray f2 fw6 f5-ns dib mr3 mr4-ns">Home</p>
          {(this.props.items.length>0
          ? <p onClick={()=>this.props.onRouteChange('Cart')} className="link pointer dim dark-gray f2 fw6 f5-ns dib mr3 mr4-ns">Cart
          <span className='white br-100 bg-dark-red ph1 mh1 f6'>{(this.props.items.length)}</span></p>
          :<p onClick={()=>this.props.onRouteChange('Cart')} className="link pointer dim dark-gray f2 fw6 f5-ns dib mr3 mr4-ns">Cart</p>
          )}          
          <p onClick={()=>this.props.onRouteChange('Payment')} className="link pointer dim dark-gray f2 fw6 f5-ns dib mr3 mr4-ns">Payment</p>
          <p onClick={()=>this.props.onRouteChange('Products')} className="link pointer dim dark-gray f2 fw6 f5-ns dib mr3 mr4-ns">Hi! {this.props.name}</p>
          <p onClick={this.onLogOut} className="link pointer dim dark-gray f2 fw6 f5-ns dib mr3 mr4-ns">Logout</p>
        </div>
      </nav>
      :<nav className="dt w-100 border-box bb b--black pa3 ph5-ns">
        <img src={Logo} className="link pointer dib w4 h3 br-100 ba dtc v-mid mid-gray link dim w-25" 
        alt="Site Name" onClick={()=>this.props.onRouteChange('Products')}/>
        <div className="dtc v-mid w-75 tr">
          <p onClick={()=>this.props.onRouteChange('Products')} className="link pointer dim dark-gray f2 fw6 f5-ns dib mr3 mr4-ns">Home</p>
          {(this.props.items.length>0
          ? <p onClick={()=>this.props.onRouteChange('Cart')} className="link pointer dim dark-gray f2 fw6 f5-ns dib mr3 mr4-ns">Cart
          <span className='white br-100 bg-dark-red ph1 mh1 f6'>{(this.props.items.length)}</span></p>
          :<p onClick={()=>this.props.onRouteChange('Cart')} className="link pointer dim dark-gray f2 fw6 f5-ns dib mr3 mr4-ns">Cart</p>
          )}          
          <p onClick={()=>this.props.onRouteChange('Payment')} className="link pointer dim dark-gray f2 fw6 f5-ns dib mr3 mr4-ns">Payment</p>
          <p onClick={()=>this.props.onRouteChange('Sign in')} className="link pointer dim dark-gray f2 fw6 f5-ns dib mr3 mr4-ns">Signin</p>
        </div>
      </nav>
      }
      </div>
      		);
    
  }
}

export default Navbar;
