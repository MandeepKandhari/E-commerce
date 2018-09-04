import React, { Component} from 'react';

class Card extends Component{
  

  render(){
        
    return(
      <article className="flex flex-column justify-center items-center pa2 br3 ma2 grow bw2 shadow-5 ba">
        <img src={this.props.image} className="w-80 br2 br--top" 
        alt={this.props.name} width={100} height={100}/>
        <div className="pa2 ph1-ns pb2-ns">
          <div className="w-100 flex flex-wrap items-center justify-center mt1">
             <div className="w-60 mr1 tl">
                <h3 className="f5 mv0">{this.props.name}</h3>
            </div>
            <div className="w-30 ml1 tr">
                <h3 className="f5 mv0">${this.props.price}</h3>
            </div>
            <p className="w-90 f6 tj mt2">{this.props.description}</p>
          </div>
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
