import React, { Component } from 'react';
import './Products.css';
import Card from './Card';


class Products extends Component {
	constructor(props){
		super(props);
		this.state={
			isCategory:'Household and Beauty',
			cart:[],
        
		}
	}  



onDisplay=(category)=>this.setState({isCategory:category});



  render() {
    return (
      <div className="flex flex-column flex-wrap justify-center background">
        <div className='w-100'>
        	<h1 className='fw6 tc blue heading_background mv0 pv4'>Products</h1>
        </div>
        <div className='w-100 flex flex-column justify-center items-center'>
            <nav className='w-100 pv3 ba flex justify-around'>
        		<p onClick={()=>this.onDisplay('Household and Beauty')} 
        		className='nav-items grow'>Household and Beauty</p>
        		
        		<p onClick={()=>this.onDisplay('Pantry Items')}
        		 className='nav-items grow'>Pantry</p>
        		
        		<p onClick={()=>this.onDisplay('Perishables')}
        		 className='nav-items grow'>Perishables</p>
        		<p onClick={()=>this.onDisplay('Produce')}
        		className='nav-items grow' >Produce</p>
        	</nav>
        	

            <div className='w-100 flex flex-wrap justify-center'>
                {
                  this.props.itemsList.map((num,i)=>
                    {
                    
                        if(num.category === this.state.isCategory)
                            {
                                
                              return(num.subcategories.map((num,i)=>
                                {   if(num.name !== 'Health and Personal Care')
                                    {

                                    return(
                                        <div className='flex flex-wrap justify-center w-80-l'>
                                        <div className='w-80 bb b--black bw2 mt4 pb0'>
                                            <h2 className='tl fw6 mb0'>{num.name}</h2>
                                        </div>    
                                        {
                                            num.items.map((nums, i)=>
                                    {   return(
                                            <div className='w-25-l ma2 w-100 flex justify-center'>
                                                {
                                                    nums.name.toLowerCase().includes(this.props.search.toLowerCase())
                                                    ?<div className='flex justify-center'>
                                                        <Card name={nums.name} description={nums.description} 
                                                        price={nums.price} image={nums.imagelink} 
                                                        onCart={this.props.onCart} add={this.props.add}/>
                                                            {
                                                            /*<p key={i}>{nums.name}</p>
                                                            <p key={i}>{nums.description}</p>
                                                            <p key={i}>{nums.price}</p>
                                                            <p key={i}>{nums.imagelink}</p>
                                                            <p key={i}>{nums.rating}</p>
                                                            <p key={i}>{nums.stock}</p>
                                                            <p key={i}>{nums.category}</p>
                                                            <p key={i}>{nums.subcategory}</p>
                                                            */
                                                          }
                                                     </div>     
                                                    :<div></div>
                                                }          
                                            </div>)
                                    })
                                    }
                                    
                                    </div>
                                        
                                        )
                                    }


                                }))  
                            }
                        
                    })
                }
            </div>
        </div>	
      </div>
    );
  }
}

export default Products;
