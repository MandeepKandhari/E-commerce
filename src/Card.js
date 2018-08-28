import React, { Component} from 'react';

class Card extends Component{
  

  render(){
        
    return(
      <article className="flex flex-column items-center pa3 br3 ma3 dib grow bw2 shadow-5 ba w-80">
      
        <img src={this.props.image} className="db w-100 br2 br--top w4 h4" 
        alt={this.props.name} />
        <div className="pa2 ph3-ns pb3-ns">
          <div className="dt w-100 mt1">
            <div className="dtc">
              <h3 className="f5 f4-ns mv0">{this.props.name}</h3>
            </div>
            <div className="dtc tr">
              <h3 className="f5 mv0">${this.props.price}</h3>
            </div>
            </div>
            <p className="f6 lh-copy measure mt2">{this.props.description}</p>
            <div className='flex justify-center'>

              <input id='addToCart' ref={this.input} type='button' onClick={()=>this.props.onCart(this.props.name, this.props.price)} 
                className="pointer f6 link dim ph3 pv2 dib white bg-black" value='Add to Cart'/>
            
            </div>
            </div>
            { this.props.add.map((num,i)=>{
              if(num == this.props.name.toLowerCase()){
              return(this.props.onCart(this.props.name, this.props.price))
          }
        })
      }
              
        </article>

      );
  }
}


export default Card;
