import React from 'react';


const Footer=()=>{
    return (
    	<footer className=' flex justify-center items-center white bg-black'>
		  <div className='w-30'>
		  	<p className="f6 db b ttu lh-solid">© 2018 COMPANY Inc.</p>
		  </div>
		  <div className='w-70 flex justify-end'>
		    <p className='f5 fw6 pa2 mh3 link pointer'>About us</p>
		    <p className='f5 fw6 pa2 mh3 link pointer'>Contact us</p>
		    <p className='f5 fw6 pa2 mh3 link pointer'>Privacy</p>
		  </div>
		</footer>

      	
			);
  
}

export default Footer;
