import React from 'react';

const Errorpage=({onRouteChange})=>{
	return(
	<section className="vh-100 bg-washed-blue baskerville">
	  <header className="tc ph5 lh-copy">
	      <h1 className="f1 f-headline-l code mb3 fw9 dib tracked-tight light-purple">404</h1>
	      <h2 className="tc f1-l fw1">Sorry, we can't find the page you are looking for.</h2>
	  </header>
	  <p className="fw1 i tc mt4 mt5-l f4 f3-l">Are you looking for one of these?</p>
	  <nav className="flex justify-center">
	    <p className="f5 f4-ns link black db pv2 ph3 hover-light-purple" onClick={()=> onRouteChange('Products')}>Home</p>
	    <p className="f5 f4-ns link black db pv2 ph3 hover-light-purple" onClick={()=> onRouteChange('Cart')}>Cart</p>
	    <p className="f5 f4-ns link black db pv2 ph3 hover-light-purple" onClick={()=> onRouteChange('Cart')}>About us</p>
	    <p className="f5 f4-ns link black db pv2 ph3 hover-light-purple" onClick={()=> onRouteChange('Contactus')}>Contact us</p>
	   </nav>
	</section>);
} 
export default Errorpage; 