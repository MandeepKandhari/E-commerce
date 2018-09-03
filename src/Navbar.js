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
        ?<nav className="w-100 flex flex-wrap justify-center items-center bb b--black pa3 ph5-ns">
        <div className='w-25-l w-80 tc'>
          <img src={Logo} className="link pointer dib w4 h3 br-100 ba mid-gray link dim" 
          alt="Site Name" onClick={()=>this.props.onRouteChange('Products')}/>
        </div>
        <div className="w-75-l tr w-90 tr-l flex justify-end-l justify-center-m justify-around">
          <p onClick={()=>this.props.onRouteChange('Products')} className="link pointer dim dark-gray f6 fw6 f5-ns dib mr4-l mh3-m mr2">Home</p>
          {(this.props.items.length>0
          ? <p onClick={()=>this.props.onRouteChange('Cart')} className="link pointer dim dark-gray f6 fw6 f5-ns dib mr4-l mh3-m mr2">Cart
          <span className='white br-100 bg-dark-red ph1 mh1 f6'>{(this.props.items.length)}</span></p>
          :<p onClick={()=>this.props.onRouteChange('Cart')} className="link pointer dim dark-gray f6 fw6 f5-ns dib mr4-l mh3-m mr2">Cart</p>
          )}          
          <p onClick={()=>this.props.onRouteChange('Payment')} className="link pointer dim dark-gray f6 fw6 f5-ns dib mr4-l mh3-m mr2">Payment</p>
          <p onClick={()=>this.props.onRouteChange('Products')} className="link pointer dim dark-gray f6 fw6 f5-ns dib mr4-l mh3-m mr2">Hi! {this.props.name}</p>
          <p onClick={this.onLogOut} className="link pointer dim dark-gray f6 fw6 f5-ns dib mr4-l mh3-m mr2">Logout</p>
        </div>
      </nav>
      :<nav className="w-100 flex flex-wrap justify-center items-center bb b--black pa3 ph5-ns">
        <div className='w-25-l w-80 tc'>
        <img src={Logo} className="link pointer dib w4 h3 br-100 ba mid-gray link dim" 
        alt="Site Name" onClick={()=>this.props.onRouteChange('Products')}/>
        </div>
        <div className="w-75-l w-90 tr-l flex justify-end-l justify-center-m justify-around">
          <p onClick={()=>this.props.onRouteChange('Products')} className="link pointer dim dark-gray f6 fw6 f5-ns dib mr4-l mh3-m mr2">Home</p>
          {(this.props.items.length>0
          ? <p onClick={()=>this.props.onRouteChange('Cart')} className="link pointer dim dark-gray f6 fw6 f5-ns dib mr4-l mh3-m mr2">Cart
          <span className='white br-100 bg-dark-red ph1 mh1 f6'>{(this.props.items.length)}</span></p>
          :<p onClick={()=>this.props.onRouteChange('Cart')} className="link pointer dim dark-gray f6 fw6 f5-ns dib mr4-l mh3-m mr2">Cart</p>
          )}          
          <p onClick={()=>this.props.onRouteChange('Payment')} className="link pointer dim dark-gray f6 fw6 f5-ns dib mr4-l mh3-m mr2">Payment</p>
          <p onClick={()=>this.props.onRouteChange('Sign in')} className="link pointer dim dark-gray f6 fw6 f5-ns dib mr4-l mh3-m mr2">Signin</p>
        </div>
      </nav>
      }
      </div>
      		);
    
  }
}

export default Navbar;
