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
      <div className="flex flex-column items-center justify-center background">
        <div className='w-100'>
        	<h1 className='fw6 tc blue heading_background mv0 pv4'>Products</h1>
        </div>

        <div className='w-80 flex justify-center'>
            <select className='w-50 category-dropdown pv3 ph1 ma2 ba b--black bw1'>
                <option onClick={()=>this.onDisplay('Household and Beauty')}>Household and Beauty</option>
                <option onClick={()=>this.onDisplay('Pantry Items')}>Pantry</option>
                <option onClick={()=>this.onDisplay('Perishables')}>Perishables</option>
                <option onClick={()=>this.onDisplay('Produce')}>Produce</option>
            </select>
        </div>

        <div className='w-100 flex justify-center items-start'>
            <nav className='w-20 pv3 flex mt5 flex-column items-center category'>
        		<p onClick={()=>this.onDisplay('Household and Beauty')} 
        		className='nav-items grow f5-l f6 mv3'>Household and Beauty</p>
        		
                <p onClick={()=>this.onDisplay('Pantry Items')}
        		className='nav-items grow f5-l f6 mv3'>Pantry</p>
        		
        		<p onClick={()=>this.onDisplay('Perishables')}
        		 className='nav-items grow f5-l f6 mv3'>Perishables</p>
        		
                <p onClick={()=>this.onDisplay('Produce')}
        		className='nav-items grow f5-l f6 mv3' >Produce</p>
        	</nav>
        	

            <div className='w-80-l w-90 ba flex flex-wrap justify-between items-center'>
                {
                  this.props.itemsList.map((num,i)=>
                    {
                    
                        if(num.category === this.state.isCategory)
                            {
                                
                              return(num.subcategories.map((num,i)=>
                                {   if(num.name !== 'Health and Personal Care')
                                    {

                                    return(
                                        <div className='flex flex-wrap justify-center w-100'>
                                        <div className='w-90 bb b--black bw2 mt4 pb0'>
                                            <h2 className='tl fw6 mb0'>{num.name}</h2>
                                        </div>    
                                        {
                                            num.items.map((nums, i)=>
                                    {   return(
                                            <div className='ma2-l w-30-l w-50-m w-80 flex justify-center'>
                                                {
                                                    nums.name.toLowerCase().includes(this.props.search.toLowerCase())
                                                    ?<div className='flex justify-center w-80'>
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
                                            </div>
                                        )
                                    })
                                    }
                                    </div>
                                    )}
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
