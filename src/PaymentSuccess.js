import React from 'react';
import Transaction from './Transaction.png'

const PaymentSuccess = ({ onRouteChange	})=>{
	return(
		<div>
		<div className="tc pv4 pv5-ns">
		  <img src={Transaction} className="br-100 pa1 ba b--black-10 h5 w5" alt="avatar" />
		  <h1 className="f3 f4-ns fw6 mid-gray">Transaction successful!</h1>
		  <h2 className="f6 gray fw2 ttu tracked">Thank you for Shopping</h2>
		</div>
		<section className="baskerville flex justify-center">
		  <p className="fw1 i tc f4 f3-l w-50-l w-80">Would you like to go back to the main webpage? </p>
		  <p onClick={()=>onRouteChange('Products')} className="b ph3 pv3 w-10-l w-10-m w-40 tc  ba b--black bg-transparent br3 grow pointer fw6 f5 dib">Products</p>
		</section>
	</div>


		);
}

export default PaymentSuccess;