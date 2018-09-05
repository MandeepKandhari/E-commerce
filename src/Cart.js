import React, { Component } from 'react';


class Cart extends Component{
  constructor(props){
    super(props);
    this.state={
      itemList:[],
      grandTotal:[]
     }

  }


onInputChange=(name)=>(event)=>{
  let value = event.target.value
  console.log(value)
  let isCart = false;
  let itemState = this.props.items;
  itemState.map((num,i)=>{

    if(num.item === name){
      num.quantity = value
      num.value = num.quantity*num.cost
     return(
      this.props.grandTotal(num.item,num.cost,num.quantity,isCart)
      )
          }
  })
  return(this.setState({items:itemState}))  
      
}

render(){
    console.log(this.props.items)
    return (
      <div className="pa4">
  <div className="overflow-auto">
    <table className="f6 w-100 mw8 center" cellSpacing="0">
      <thead>
        <tr className="stripe-dark">
          <th className="fw6 tc pa2 bg-white">Name</th>
          <th className="fw6 tc pa2 bg-white">Quantity</th>
          <th className="fw6 tc pa2 bg-white">Cost per item</th>
          <th className="fw6 tc pa2 bg-white">Total cost</th>
        </tr>
      </thead>
      <tbody className="lh-copy">
      { 
        this.props.items.map((num,i)=>{
        
        return(
          <tr className="stripe-dark" key={num.item}>
            <td className="pa2">
              <p>{num.item}</p>
              <button className='pa2 ma1 w-50 ba black b--black bw1' onClick={()=>this.props.remove(num.item.toLowerCase())}>Remove item</button>
            </td>
            <td className="pa2">
              <input type="number" name={num.item} value={num.quantity} min="1" max="10" onChange={this.onInputChange(num.item)} />
            </td>
            <td className="pa2">{num.cost}</td>
            <td className="pa2">${num.value}</td>
            
        </tr>)
      }

      )
        
      }
      <tr >
        <td></td>
        <td></td>
        <td className="fw6 tc pa3 bg-white">Total</td>
        {
          this.props.total === null | this.props.total === 0
          ?<td className="fw6 tc pa3 bg-white"></td>
          :<td className="fw6 tc pa3 bg-white">${this.props.total}</td>
        }
      </tr>
        
      </tbody>
    </table>
  </div>
</div>

    );
  }
  
  }

export default Cart;
