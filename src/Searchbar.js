import  React, { Component } from 'react';


class Searchbar extends Component{ 
render(){
	return(
			<div className='w-100 flex justify-center'>
				<div className='w-70 mv3 pa2 '>
					<input onChange={this.props.onSearch}  className='w-80 pa3 ba b--black bw1' type='search' 
    				placeholder='Search for items here...' value={this.props.search} />
				</div>
			</div>
		);
}
}
export default Searchbar;

