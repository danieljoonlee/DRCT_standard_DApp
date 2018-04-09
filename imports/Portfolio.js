import React, { Component } from 'react'
import Factory from './contracts/Factory.json'
import Swap from './contracts/TokenToTokenSwap.json'
import UserContract from './contracts/UserContract.json'
import getWeb3 from './utils/getWeb3';

export default class Portfolio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      storageValue: "",
      web3: null,
      openswaplist: "",
      currentBlock: 0,
      contract: require('truffle-contract'),
      factory:null,
      swap:null,
      userContract:null
    }
  }

  instantiateContract() {
    this.state.web3.eth.getAccounts((error, accounts) => {
    	console.log('my address',accounts[0])
        this.setState({ storageValue: accounts[0]})
    })
    this.setState({ factory: this.state.contract(Factory)})
    this.setState({ swap:this.state.contract(Swap)})
    this.setState({ userContract: this.state.contract(UserContract)})
    
  }

  getBlock(){
    let currentComponent = this;
    this.state.web3.eth.getBlock('latest', function (e, res) {
      currentComponent.setState({ currentBlock: res.number})
  })
  }

    componentWillMount() {
    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })
      this.instantiateContract()
      this.myPortfolio()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

    myPortfolio(){
    	this.setState({ openswaplist: "loading..." })
	    let currentComponent = this;
	    var check = "<table><tr><th>Address</th></tr>";
	    this.state.factory.setProvider(this.state.web3.currentProvider)
	    this.state.factory.deployed().then((instance)=>{
	    console.log('block',this.state.currentBlock);
	    let transferEvent =instance.ContractCreation({}, {fromBlock:this.state.currentBlock, toBlock: 'latest'});
		transferEvent.get((error, logs) => {
			console.log('test',logs.length)
		  	for(i = logs.length-1; i >= 0; i--){
	  	 	    var creator_add = logs[i].args['_sender'].toUpperCase();
	  	 	    var myadd = currentComponent.state.storageValue.toUpperCase();
				var add = logs[i].args['_created'];
				if (creator_add == myadd){
					console.log('working!');
						check +="<tr><td>"+ add + "</td></tr>";
				}
			}
			check += '</table>';
			console.log(check);
			this.setState({ openswaplist: check })
			this.getBlock();
	  	})
	 })
	}

  //This code is for when a party clicks on a position, they can get the details in a popup
      getDetails(){
  }

  render() {
    return (
      <div dangerouslySetInnerHTML={{__html: this.state.openswaplist}}></div>
    );
  }
}
