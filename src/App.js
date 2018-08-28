import React, { Component } from 'react';
import recognizeMic from 'watson-speech/speech-to-text/recognize-microphone';
import './App.css';
import 'tachyons';
import Signin from './Signin';
import Register from './Register';
import Navbar from './Navbar';
import Searchbar from './Searchbar';
import Products from './Products';
import Cart from './Cart';
import Footer from './Footer';
import Payment from './Payment';
import Errorpage from './Errorpage';
import PaymentSuccess from './PaymentSuccess';

class App extends Component {
  constructor(){
    super();
    this.state={
      commodity:['search', 'add', 'delete','change','products', 'cart', 'register', 'payment', 'sign in'],
      itemsList:[],
      items:[],
      totalState:[],
      total:0,
      cart:[],
      route:'Products',
      search:'',
      add:[],
      sentenceKey:[],
      signedIn:false,
      user:{
          id:'',
          name:'',
          password: '',
          email: '',
          cardName:'',
          postalCode:''

      }
    }
  }

  loadUser=(data)=>{
    this.setState({user:{
      id:data.id,
      name:data.name,
      password: data.name,
      email: data.email,
      cardName:data.cardName,
      postalCode:data.postalCode
    }})
  }

  isSignedIn=(boolData)=>this.setState({signedIn:boolData});

  onSearch=(event)=>this.setState({search:event.target.value});

  onNameChange=(event)=>{
  this.setState(Object.assign(this.state.user, {cardName:event.target.value}));
};

  onPostalCodeChange=(event)=>{
    this.setState(Object.assign(this.state.user, {postalCode:event.target.value}));
  };
  

  onRouteChange=(route)=>this.setState({route:route});

  removeItem=(name)=>{
    const updatedCart = this.state.items.filter((num,i)=>{
      let item = num.item.toLowerCase();
      return(item != name)
      })
    console.log('updated cart', updatedCart)
    console.log(updatedCart)
    let isCart = false;
    let initailValue = 0;
    
    if(updatedCart.length === 0){
      this.setState({total:null})
    }   

    updatedCart.map((num,i)=>{
     initailValue = num.value + initailValue;
     this.setState({total:initailValue})
     return(this.state.total);  
      })
    this.setState({items:updatedCart})
    return(this.state.items);  
  };

  
  grandTotal=(name, cost,quantity,isCart)=>{
    let amt = cost*quantity;
    if(isCart){
      let total = {
      item:name,
      total:amt
      }
      this.setState({totalState:[...this.state.totalState, total]})
      this.setState({total:this.state.total+total.total})
    }
    else{
      let amount = cost*quantity;
      let totalState = this.state.totalState;
      let initailValue = 0;
      totalState.map((num,i)=>{
        if(num.item === name){
          num.total = amount;

        }
        console.log(num.total)
      })
      console.log(totalState)

      totalState.map((num,i)=>{
        initailValue = num.total + initailValue;
        return(this.setState({total:initailValue}));
      })      
      console.log('total',this.state.total)

      }
    }

  onCart=(name, price)=>{

    let isCart = true;
    let itemObj ={
      item:name,
      cost:price,
      quantity:1
    };
    itemObj.value = itemObj.cost*itemObj.quantity;
    let count = 0;
    let length = this.state.items.length;
    for(let i=0;i<length;i++){
     if(itemObj.item === this.state.items[i].item){
      count = count+1;
      }
    }
    if(count === 0){
      this.setState({items:[...this.state.items,itemObj]})
      return(this.grandTotal(itemObj.item, itemObj.cost,itemObj.quantity,isCart));
      }
    };


  
  componentDidMount(){
    fetch('https://webmppcapstone.blob.core.windows.net/data/itemsdata.json')
    .then(response=>response.json())
    .then(data=>this.setState({itemsList:data}))
    .then(this.keywordsArr)
    .then(this.onSpeech)

  }
  
  keywordsArr=()=>{
  this.state.itemsList.map((num,i)=>{
      return(num.subcategories.map((num, i)=>{
       return(num.items.map((num,i)=>{
         return(this.setState({commodity:[...this.state.commodity,num.name]})) 
          })
      )})
      )})
}

onSpeech=()=>{

  const keywords = this.state.commodity;
  console.log('commodity',this.state.commodity)
  fetch('http://localhost:3002/api/speech-to-text/token')
  .then((response)=> {
      return response.text();
  }).then((token)=> {
    var stream = recognizeMic({
        token: token,
        smart_formatting: true,
        interim_results: true,
        objectMode: true, 
        extractResults: true, 
        format: true, 
        keywords,
        keywords_threshold: keywords.length
        ? 0.04
        : undefined,
        timestamps: true,
        speaker_labels : true
    });
    stream.on('data', (data)=>
    { 
       if(data.final){
        console.log(data)
        const keywordSentence = [];
          for (let key in data.keywords_result){
            keywordSentence.push(data.keywords_result[key][0].normalized_text)
          }
       this.setState({sentenceKey:keywordSentence})
       console.log(this.state.sentenceKey)
      this.state.sentenceKey.map((num,i)=>{
      if(num === 'search'){
        this.state.sentenceKey.map((numKey,i)=>{
          if(num != numKey){
            return(this.setState({search:numKey}))
          }
          else{
          	this.onRouteChange('Errorpage');
          }
        })
      }
      console.log(this.state.search)
      if(num === 'add'){
        this.state.sentenceKey.map((numKey,i)=>{
          if(num != numKey){
            return(this.setState({add:[...this.state.add, numKey]}))
          }
        })
      }
      console.log(this.state.add)
      if(num === 'delete'){
        this.state.sentenceKey.map((numKey,i)=>{
          if(num != numKey){
            return(this.removeItem(numKey));
          }
        })
      }
      if(num === 'change'){
        this.state.sentenceKey.map((numKey,i)=>{
          if(num != numKey){
          console.log('num',num)
          console.log('numKey',numKey.replace(/^\w/, c => c.toUpperCase()))
          let value = numKey.replace(/^\w/, c => c.toUpperCase())         
          return(this.onRouteChange(value))          
           }
        })
      }

     });
        }
    });
    stream.on('error', (err)=> {
        console.log(err);
    });
    
  }).catch((error)=> {
      console.log(error);
  });
  };

onSearch=(event)=>this.setState({search:event.target.value});

  render() {
    return (
      <div className="App">
      {console.log(this.state.items)}
        {this.state.route === 'Sign in' ?<Signin onRouteChange={this.onRouteChange} isSignedIn={this.isSignedIn} loadUser={this.loadUser}/>
        :(this.state.route === 'Register' ?<Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} isSignedIn={this.isSignedIn}/>
        :(this.state.route === 'Products' ?
          <div>
          <Navbar onRouteChange={this.onRouteChange} items={this.state.items} name={this.state.user.name} isSignedIn={this.isSignedIn} signedIn={this.state.signedIn}/>
          <Searchbar search={this.state.search} onSearch={this.onSearch}/>
          <Products itemsList={this.state.itemsList} add={this.state.add}
          search={this.state.search} onRouteChange={this.onRouteChange} onCart={this.onCart}/>
          <Footer />
          </div>
        :(this.state.route === 'Cart' ?
        <div>
         <Navbar onRouteChange={this.onRouteChange} items={this.state.items} name={this.state.user.name} isSignedIn={this.isSignedIn} signedIn={this.state.signedIn}/>
         <Cart onRouteChange={this.onRouteChange} items={this.state.items} remove={this.removeItem} total={this.state.total} 
         totalState={this.state.totalState} grandTotal={this.grandTotal}/>
         <Footer />
        </div> 
        :(this.state.route === 'Payment' ?
          <div>
            <Navbar onRouteChange={this.onRouteChange} items={this.state.items} 
            name={this.state.user.name} 
            isSignedIn={this.isSignedIn} 
            signedIn={this.state.signedIn}
            />
            <Payment total={this.state.total}  userId={this.state.user.id}
              cardName={this.state.user.cardName} 
              postalCode={this.state.user.postalCode}
              onRouteChange={this.onRouteChange}
              onNameChange={this.onNameChange}
              onPostalCodeChange={this.onPostalCodeChange}

            />
            <Footer />
          </div>
          :(this.state.route === 'PaymentSuccess'
            ? <PaymentSuccess onRouteChange={this.onRouteChange}/>
            :<Errorpage onRouteChange={this.onRouteChange}/>
            ))  ))  )

        }
       
      </div>
    );
  }
}

export default App;
