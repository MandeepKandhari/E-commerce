const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');


const app = express();

app.use(bodyParser.json());
app.use(cors());

/* 
Signin --> POST --> success/failure
Register --> POST --> success/failure
Payment --> POST --> success/failure 
*/

let database = [];

fs.readFile('database.json', (err, data)=>{
	if(err){
		console.log(err)
	}
	
	database = (JSON.parse(data));
	console.log('database', database)
})



app.get('/', (req,res)=>{
	res.json(database)
})


app.post('/signin', (req,res)=>{
	console.log(req.body);
	const { email, password } = req.body;

	let userValid = false;
	let userInfo = {};
	database.map((num, i)=>{
		
		if(email === num.email && password === num.password){
			userValid = true;
			userInfo = num
			return userValid
			} 
		});
	if(userValid){
		return(res.json(userInfo));
	}
	else{
		return (res.status(404).json("error logging in"));	
	}
	
	
})

app.post('/register', (req,res)=>{
	const { email, password, name } = req.body;
	let user = {
		id:"",
		name:name,
		password: password,
		email: email,
		joined: new Date(),
		cardName:'',
	  	cardNumber:'',
	  	expiryDate:'',
	  	securityCode:'',
	  	postalCode:''

	}
	if(user.name && user.password && user.email){
		let emailNotFound = true;
		database.map((num,i)=>{
			
			if(num.email === user.email){
				emailNotFound = false;
				return	res.status(400).json('error ')
			}
			
		});

		if(emailNotFound){
			lastUserId = database[database.length-1].id
			user.id = parseInt(lastUserId) + 1;
			database[database.length] = user;	
			let userData =  JSON.stringify(database, null, 2);
			fs.writeFile('database.json', userData, (err) =>{
				if(err){
					console.log(err)
				}
				console.log('data is written in the text')
				res.json(user);
			});
		}
		
		
	}
})

app.put('/payment/:id', (req,res)=>{
	const { id } = req.params;
	const { cardName, cardNumber, expiryDate, securityCode, postalCode } = req.body;
	let found = false;
	
	database.forEach((user, i) => {
		
		if(id == user.id){
			found = true;
		if(cardName === user.cardName && cardNumber === user.cardNumber && expiryDate === user.expiryDate && securityCode === user.securityCode && postalCode === user.postalCode){
			return (res.json("success"))
		}
		else{
			console.log(user)
			user.cardNumber = cardNumber;
			user.cardName = cardName;
			user.securityCode = securityCode;
			user.expiryDate = expiryDate;
			user.postalCode = postalCode; 
			}
			database[i] = user
			let userCard =  JSON.stringify(database, null, 2);
			fs.writeFile('database.json', userCard, (err) =>{
				if(err){
					console.log(err)
				}
				console.log('data is written in the text')
				res.json(user);
				});
		console.log(user)
	}
	})
	console.log('found',found)
		
	if(!found){
		return res.status(400).json("error please check your card details!")
	}
	
})



app.listen(3004);