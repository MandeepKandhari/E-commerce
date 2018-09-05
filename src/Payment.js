import React, { Component } from 'react';

class Payment extends Component{
	constructor(){
		super();
		this.state={
			Number:'',
			ExpiryDate:'',
			SecurityCode:'',
			error:''
		}
	}



onNumberChange=(event)=>{
    this.setState({Number:event.target.value});
  };

onExpiryDateChange=(event)=>{
    this.setState({ExpiryDate:event.target.value});
  };

onSecurityCodeChange=(event)=>{
    this.setState({SecurityCode:event.target.value});
  };



onPaymentSubmit=()=>{
	fetch(`http://localhost:3004/payment/${this.props.userId}`,{
		method:'put',
		headers:{'Content-Type':'application/json'},
		body:JSON.stringify({
			cardName:this.props.cardName,
			cardnumber:this.state.Number,
			expiryDate:this.state.ExpiryDate,
			securityCode:this.state.SecurityCode,
			postalCode:this.props.postalCode
		})
	})
	.then(response=>response.json())
	.then(data=>{
		console.log(data)
		if(data === 'success' || (data !== null && typeof data === 'object')) {
			this.props.onRouteChange('PaymentSuccess');
		}
		else if(data === 'error'){
			this.setState({error:'data'})
		}
	})
};



	render(){
		return(			
		<div className='w-100 flex flex-column items-center justify-around'>
			<article className='w-50-l w-60-m w-80 ba bw1 dark-gray br4 mv5 pa3 flex flex-column justify-center items-center'>
					<h1 className='tc fw6 mh2 mv1 pa2'>Pay Invoice</h1>
					<div className='flex flex-column justify-center items-center '>
						<h3 className='mb0 pb0'>Payment Amount</h3>
						<p className='pt0 mv0 fw6 f3 pa1'>${this.props.total}</p>
					</div>
					<div className='w-100 pa3 flex flex-column items-center'>
						<div className='w-100 flex flex-column items-center'>
							<label className='tl pl1 w-80'  htmlFor='Card-name'>Name on Card</label>
							<input className='w-80 br1 ba b--black pv2 mh1' 
							type='text' 
							name='Card-name'
							onChange={this.props.onNameChange} value={this.props.cardName}
						 />
						</div>
						<div className='w-100 flex flex-column items-center'>
							<label className='w-80 tl pl1' htmlFor='Card-number'>Card number</label>
							<input className='w-80 br1 ba b--black pv2 mh1' 
							type='text' 
							name='Card-number' 
							onChange={this.onNumberChange}
				
						/>
						</div>
						
						<div className='w-80 flex flex-wrap justify-between-l justify-start pa1'>
							<div className='w-40-l w-100 flex flex-column  items-center'>
								<label className='w-100 tl' htmlFor='Expiry-date'>Expiry date</label>
								<input className='w-100 br1 ba b--black pv2 mh1' 
								type='month' 
								name='Expiry-date'  
								placeholder='mm/yy'
								onChange={this.onExpiryDateChange}	
							/>
							</div>
							<div className='w-40-l w-100 flex flex-column items-center'>
								<label className='w-100 tl' htmlFor='Security-code'>Security code</label>
								<input className='w-100 ml2-l br1 ba b--black pv2 mh1' 
								type='password' 
								name='Security-code' 
								onChange={this.onSecurityCodeChange}
							/>
							</div>	
						</div>

						<div className='w-100 flex flex-column justify-start items-center'>
							<label className='w-80 tl pl1' htmlFor='ZIP'>Postal code</label>
							<input className='w-80 br1 ba b--black pv2 mh1' 
							type='password' 
							name='ZIP' 
							value={this.props.postalCode}
							onChange={this.props.onPostalCodeChange}
						/>
						</div>
						<div className='mt2 w-50 flex justify-center '>
							<input className='b tc bw1 ph3 w-40-l link w-70-m tc w-80 pv2 input-reset ba b--black bg-transparent grow pointer fw6 f6 dib' 
							type='submit' 		
							value='Submit'
							onClick={this.onPaymentSubmit}
						 />
						</div>
						<div>
							{this.state.error === 'error'
							?<p className='f5 fw6 red'>error please check your card details!</p>
							:null}
						</div>
					</div>	
			
			</article>
		</div>
		);													
	}
	}
export default Payment;