import React, { Component } from 'react'
import Web3 from 'web3'
import './App.css'
import voting from './voting.json'
import Registervoter from './registervoter'

class App extends Component {
 
  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadBlockchainData(){
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    const networkId = await web3.eth.net.getId()
    const votingAppData = voting.networks[networkId]
    if(votingAppData){
      const votingApp = new web3.eth.Contract(voting.abi,votingAppData.address)
      this.setState({ votingApp })
    
    }else{
      window.alert('no contract deployed')
    }
    this.setState({ loading: false })
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

   getVoter=(event)=>{
    this.state.votingApp.methods.getvotermapping(this.state.account).call(function(err,res){
      console.log(res)
      this.setState({id:res[0],
      voterc:res[1]
     })
    }.bind(this));
    event.preventDefault();
  }



  handleSubmit=(event)=> {
    
    console.log(this.state.votingApp)
    this.setState({ loading: true })
    this.state.votingApp.methods.addVoter().send({ from: this.state.account }).on('receipt', (receipt) => {
      this.setState({ loading: false })
      console.log(receipt)  
    })
    
   
    //alert('Successfully Registered');
    event.preventDefault();
  }

  handleVote=(event)=> {
    console.log(event.target[0].value)
    // console.log(this.state.votingApp)
    this.setState({ loading: true })
    this.state.votingApp.methods.vote(event.target[0].value).send({ from: this.state.account }).on('receipt', (receipt) => {
     this.setState({ loading: false })
      console.log(receipt) 
     })
    
   
    alert('Vote Casted Successfully for : ' + event.target[0].value );
    event.preventDefault();
  }




  constructor(props) {
    super(props)
    this.state = { account: '',
    votingApp: {},
    loading: true,
    id:'',
    voterc:'',
    candidate:''
     }
  }

  render() {

    let content;
    if(this.state.loading) {
      content = <p id="loader" className="text-center">Loading...</p>
    }else{


    //   content =       <div   style={{
        
    //   }}>
    //   <h1>Voting Page</h1>
    //   <p>Your account: {this.state.account}</p>
    // <form onSubmit={this.handleSubmit}>
    // Create Voter:
    // <input type="submit" value="Submit" />
    // </form>

    // <form onSubmit={this.getVoter}>
    // Get Voter Details:
    // <input type="submit" value="Submit" />
    // </form>
    // </div>

    content =  <Registervoter id={this.state.id}
    voterc ={this.state.voterc}>
      </Registervoter>

    }    
    return (    
  //     <div>
  //     <div>

  //     <form onSubmit={this.handleSubmit}>
  //   Create Voter:
  //    <input type="submit" value="Submit" />
  //    </form>

  //    <form onSubmit={this.getVoter}>
  //    Get Voter Details:
  //    <input type="submit" value="Submit" />
  //    </form>   
  //     {content}
  //     </div>
  //     <div>
  //  <p>Your account: {this.state.account}</p>

  //     </div>      
  //     </div>

<div class="wrapper fadeInDown">
  <div id="formContent">
    <h2 class="active">Voter Register </h2>
    <div class="fadeIn first">
    </div>
  <form onSubmit={this.handleSubmit}>
      <input type="submit" class="fadeIn fourth" value="Register!"/>
    </form>
    <p>Your account: {this.state.account}</p>
    <h2 class="active"> Get Voter Status </h2> 
    <form onSubmit={this.getVoter}>
      <input type="submit" class="fadeIn fourth" value="Get Voter Info!"/>
    </form>
    {content}

    <h2 class="active"> Vote cast </h2> 
    <form onSubmit={this.handleVote}>
      <label for="cars">Choose a candidate:</label>
        <select id="candidates" name="candidates">
            <option value="Trump">Trump</option>
            <option value="Biden">Biden</option>
        </select> 
      <input type="submit" class="fadeIn fourth" value="Vote now!"/>
    </form>
  </div>


</div>



    );
  }
}

export default App;
