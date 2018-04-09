import React, { Component } from 'react'
import Factory from './contracts/Factory.json'
import Swap from './contracts/TokenToTokenSwap.json'
import UserContract from './contracts/UserContract.json'
import Token from './contracts/DRCT_Token.json'
import Exchange from './contracts/Exchange.json'
import Wrapped from './contracts/Wrapped_Ether.json'
import getWeb3 from './utils/getWeb3';
const { DateCell, ImageCell, LinkCell, TextCell } = require('./helpers/cells');
import {Table, Column, Cell} from 'fixed-data-table-2';
import 'fixed-data-table-2/dist/fixed-data-table.css';
//import Popup from "reactjs-popup";


export default class Transactions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      storageValue: "",
      web3: null,
      openswaplist:[],
      currentBlock: 0,
      contract: require('truffle-contract'),
      factory:null,
      exchange:null,
      wrapped:null,
      token:null,
      swap:null,
      userContract:null,
      myTransactions:[],
      orderbook:["test","test","test"]
    }
  }

  instantiateContract() {
    this.state.web3.eth.getAccounts((error, accounts) => {
    	console.log('my address',accounts[0])
        this.setState({ storageValue: accounts[0]})
    })
    this.setState({ factory : this.state.contract(Factory)})
    this.setState({ swap : this.state.contract(Swap)})
    this.setState({ userContract : this.state.contract(UserContract)})
    this.setState({ token : this.state.contract(Token)})
    this.setState({ exchange : this.state.contract(Exchange)})
    this.setState({ wrapped :this.state.contract(Wrapped)})

    
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
	    var check = [];
      var tlist = [];
	    this.state.factory.setProvider(this.state.web3.currentProvider)
	    this.state.factory.deployed().then((instance)=>{
  	    let transferEvent =instance.ContractCreation({}, {fromBlock:this.state.currentBlock, toBlock: 'latest'});
  		  transferEvent.get((error, logs) => {
    		  	for(i = logs.length-1; i >= 0; i--){
    	  	 	    var creator_add = logs[i].args['_sender'].toUpperCase();
    	  	 	    var myadd = currentComponent.state.storageValue.toUpperCase();
    				if (creator_add == myadd){
    						check.push(logs[i].args['_created']);
                tlist.push(logs[i].transactionHash);
    				}
  			}
  			console.log(check);
  			this.setState({ openswaplist: check })
        this.setState({ myTransactions: tlist})
	  	})
	 })
	}

  //This gets all your interactions with the contracts:Factory,Swap Contract, DRCT Tokens
  getTransactions(){
  }

  //allows a party to create a new swap contract
  createContract(){

  }

    //allows a party to create a new swap contract
  initiateContract(){

  }

  //allows a party to place an order on the exchange
  placeOrder(){

  }

  //allows a party to place an order on the exchange
  cancelOrder(){

  }

  //allows a party to take an order on the exchange
  takeOrder(){

  }

  //allows parties to withdraw wrapped Ether
  withdraw(){

  }

  //gets details of a contract (duration, address, multiplier, reference rate, etc)
  contractDetails(){

  }


  //event watcher for factory contract
  eventWatcherFactory(){
    this.state.factory.setProvider(this.state.web3.currentProvider)
    this.state.factory.deployed().then((instance)=>{
    let events = instance.ContractCreation({}, {fromBlock:this.state.currentBlock, toBlock: 'latest'});
    events.watch((err: any, event: any) => {
        if (err) {
            console.log(err)
        }
        else {
          this.reload()
        }
    })
  })
  }


  //event watcher for DRCT token contract
  eventWatcherToken(_event){
    this.state.token.setProvider(this.state.web3.currentProvider);
    this.state.token.deployed().then((instance)=>{
      console.log(_event);
      var at = {
          Transfer: instance.Transfer({}, {fromBlock:this.state.currentBlock, toBlock: 'latest'}),
          Approval: instance.Approval({}, {fromBlock:this.state.currentBlock, toBlock: 'latest'}),
          CreateToken: instance.CreateToken({}, {fromBlock:this.state.currentBlock, toBlock: 'latest'})
      };

      let events = at[_event];
      events.watch((err: any, event: any) => {
          if (err) {
              console.log(err)
          }
          else {
            this.reload()
          }
      })
    })
  }


  //event watcher for TokentoTokenSwap contract
    eventWatcherSwap(_event){
    this.state.swap.setProvider(this.state.web3.currentProvider)
    this.state.swap.deployed().then((instance)=>{
    console.log(_event);
    var at = {
        SwapCreation: instance.SwapCreation({}, {fromBlock:this.state.currentBlock, toBlock: 'latest'}),
        PaidOut: instance.PaidOut({}, {fromBlock:this.state.currentBlock, toBlock: 'latest'})
    };

    let events = at[_event];
    events.watch((err: any, event: any) => {
        if (err) {
            console.log(err)
        }
        else {
          this.reload()
        }
    })
  })
  }

    //event watcher for the Exchange contract
    eventWatcherExchange(_event){
    this.state.exchange.setProvider(this.state.web3.currentProvider)
    this.state.exchange.deployed().then((instance)=>{
    console.log(_event);
    var at = {
        OrderPlaced: instance.OrderPlaced({}, {fromBlock:this.state.currentBlock, toBlock: 'latest'}),
        Sale: instance.Sale({}, {fromBlock:this.state.currentBlock, toBlock: 'latest'}),
        OrderRemoved: instance.OrderRemoved({}, {fromBlock:this.state.currentBlock, toBlock: 'latest'})
    
    };

    let events = at[_event];
    events.watch((err: any, event: any) => {
        if (err) {
            console.log(err)
        }
        else {
          this.reload()
        }
    })
  })
  }

//Add links for when clicked (openswaplist), you can get details
//Add links for when you click an order, it does a 'Take Order'
//Add an admin console: force pay, query oracle, etc.
  render() {
    var rows = this.state.myTransactions;
    var rows2 = this.state.openswaplist;
    console.log('2',rows2);
    var rows3 = this.state.orderbook;
    return (
      <div>
  <Table
    rowHeight={40}
    rowsCount={rows.length}
    width={600}
    height={rows.length * 40 + 42 }
    headerHeight={40}>
    <Column
      header={<Cell>Transactions</Cell>}
      cell={({rowIndex, ...props}) => (
        <Cell {...props}>
          {rows[rowIndex]}
        </Cell>
      )}
      width={600}
    />
  </Table>
    <Table
    rowHeight={40}
    rowsCount={rows2.length}
    width={600}
    height={rows2.length * 40 + 42 }
    headerHeight={40}>
    <Column
      header={<Cell>My Portfolio</Cell>}
      cell={({rowIndex, ...props}) => (
        <Cell {...props}>
          {rows2[rowIndex]}
        </Cell>
      )}
      width={600}
    />
  </Table>    
   <Table
    rowHeight={40}
    rowsCount={rows3.length}
    width={600}
    height={rows3.length * 40 + 42 }
    headerHeight={40}>
    <Column
      header={<Cell>Exchange Bulletin</Cell>}
      cell={({rowIndex, ...props}) => (
        <Cell {...props}>
          {rows3[rowIndex]}
        </Cell>
      )}
      width={600}
    />
  </Table>
      <button onClick={this.createContract.bind(this)}>Create Contract</button>
      {this.state.addressResult}
      <button onClick={this.initiateContract.bind(this)}>Initiate Contract</button>&nbsp;
      <button onClick={this.placeOrder.bind(this)}>Place Order</button>&nbsp;
      <button onClick={this.cancelOrder.bind(this)}>Cancel Order</button>&nbsp;
      <button onClick={this.withdraw.bind(this)}>Withdraw</button>&nbsp;
  </div>
    );
  }
}
  // <Popup trigger={<button> Trigger</button>} position="right center">
  //   <div>Popup content here !!</div>
  // </Popup>