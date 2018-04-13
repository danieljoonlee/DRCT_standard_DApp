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
import Modal from 'react-modal';


const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

export default class Portfolio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      storageValue: "",
      web3: null,
      oracle_address:"",
      duration:0,
      multiplier:0,
      openswaplist:[],
      mytokens:[],//list of mytokens (drct addresses with positive balances)
      tokenbalances:[],//balances of the mytokens array
      orderadds:[],//address of an order on an exchange
      orderIsLong:[],//long or short designation of order on an exchange
      orderBalance:[],//balance of an order on an exchange
      orderStartDate:[],//start date of an order on an exchange
      orderPrices:[],
      openDates:[],
      currentBlock: 0,
      contract: require('truffle-contract'),
      factory:null,
      exchange:null,
      wrapped:null,
      token:null,
      swap:null,
      userContract:null,
      selected:"",
      detailModalIsOpen:false,
      modalIsOpen: false,
      amount:0,
      startDate:0,
      swapAdd:"",//address of recently created Swap
      price:0, //The price to sell on exchange
      exchangeAmount:0,//amount to sell on exchange
      order:"", //orderId for cancelling or taking order
      tradedToken:"" //token you're placing an order for
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
        this.openDetailModal = this.openDetailModal.bind(this);
    this.afterOpenModal = this.afterOpenDetailModal.bind(this);
    this.closeDetailModal = this.closeDetailModal.bind(this);
  }

  async instantiateContract() {
    this.state.web3.eth.getAccounts((error, accounts) => {
        this.setState({ storageValue: accounts[0]})
    })
    await this.setState({ factory : this.state.contract(Factory)})
    await this.setState({ swap : this.state.contract(Swap)})
    await this.setState({ userContract : this.state.contract(UserContract)})
    await this.setState({ token : this.state.contract(Token)})
    await this.setState({ exchange : this.state.contract(Exchange)})
    await this.setState({ wrapped :this.state.contract(Wrapped)})
   this.getDRCTpositions();
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
      Modal.setAppElement('body');
      this.instantiateContract();
      this.contractDetails();
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
      var dates = [];
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
  getDRCTpositions(){
    var tokenadds = [];
    var tokenbals = [];
    var thisDates = [];
    this.state.factory.setProvider(this.state.web3.currentProvider)
    this.state.token.setProvider(this.state.web3.currentProvider)
    this.state.web3.eth.getAccounts((error, accounts) => {
      this.state.factory.deployed().then((instance) => {
        instance.getDateCount().then((result) =>{
          for(i=0;i<result;i++){
              instance.startDates.call(i).then((res4)=>{
                  date = res4.c[0];
                  thisDates.push(res4.c[0]); 
                  this.setState({openDates: thisDates})     
                  instance.getTokens(date).then((token_addresses)=>{
                  this.state.token.at(token_addresses[0]).then((instance2)=>{
                    instance2.balanceOf(accounts[0]).then((result)=>{
                      if(result.c[0]>0){
                        tokenadds.push(token_addresses[0]);
                        tokenbals.push(result.c[0]);
                        this.setState({mytokens: tokenadds})
                        this.setState({tokenbalances: tokenbals})
                      }
                    })
                  }).then(()=>{
                    this.state.token.at(token_addresses[1]).then((instance2)=>{
                      instance2.balanceOf(accounts[0]).then((result)=>{
                        console.log('result',result)
                        if(result.c[0]>0){
                          tokenadds.push(token_addresses[1]);
                          tokenbals.push(result.c[0]);
                          this.setState({mytokens: tokenadds})
                          this.setState({tokenbalances: tokenbals})
                        }
                      })
                    })
                  })
            })
         })
       }
          })
      })  
    })

    //loop through open tokens
    //create list of open contracts for createContract choices
    //get balances
  }
  //allows a party to create a new swap contract
  createContract(){
    this.state.factory.setProvider(this.state.web3.currentProvider)
    this.state.web3.eth.getAccounts((error, accounts) => {
      this.state.factory.deployed().then((instance) => {
      this.eventWatcherFactory()
      console.log(this.state.startDate)
      return instance.deployContract(this.state.startDate,{from: accounts[0],gas:4000000})
      })
    })
  }

    //allows a party to create a new swap contract
  initiateContract(){
    this.state.userContract.setProvider(this.state.web3.currentProvider)
      this.state.web3.eth.getAccounts((error, accounts) => {
        this.state.userContract.deployed().then((instance) => {
        this.eventWatcherSwapToken()
        console.log(this.state.amount)
        return instance.Initiate(this.state.swapAdd,this.state.amount,{from: accounts[0],value:this.state.amount*2*1e18,gas:4000000})
        })
      })
  }

  //allows parties to withdraw wrapped Ether
  withdraw(){
    this.state.wrapped.setProvider(this.state.web3.currentProvider)
      this.state.web3.eth.getAccounts((error, accounts) => {
        this.state.wrapped.deployed().then((instance) => {
          instance.balanceOf(accounts[0]).then((result) =>{
            return wrapped.withdraw(result,{from: accounts[0],gas:2000000})
          })
        })
      })
  }

  //gets details of a contract (duration, address, multiplier, reference rate, etc)
  contractDetails(){
    this.state.factory.setProvider(this.state.web3.currentProvider)
        this.state.web3.eth.getAccounts((error, accounts) => {
          this.state.factory.deployed().then((instance) => {
          instance.getVariables({from: accounts[0]}).then((result)=>{
              this.setState({oracle_address: result[0]})
              this.setState({duration: result[1].c[0]})
              this.setState({multiplier:result[2].c[0]})
          })
          })
        })
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

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }


  openDetailModal() {
    this.setState({detailModalIsOpen: true});
  }

  afterOpenDetailModal() {
    // references are now sync'd and can be accessed.
    //this.subtitle.style.color = '#f00';
  }

  closeDetailModal() {
    this.setState({detailModalIsOpen: false});
  }

      handleChange(e) {
        this.setState({selected: e.target.value});
    }



//Add links for when clicked (openswaplist), you can get details
//Add links for when you click an order, it does a 'Take Order'
//Add an admin console: force pay, query oracle, etc.
  render() {
    var rows = this.state.tokenbalances;
    var rows2 = this.state.mytokens;
    var selected = this.state.selected;
    var oracle_address =this.state.oracle_address;
    var duration = this.state.duration;
    var multiplier = this.state.multiplier;
    console.log(oracle_address);
    console.log(duration);
    console.log(multiplier);

    return (
      <div id="react_div">
    <Table
    rowHeight={40}
    rowsCount={rows2.length}
    width={600}
    height={rows2.length * 40 + 42 }
    headerHeight={40}>
    <Column
      header={<Cell>My Tokens</Cell>}
      cell={({rowIndex, ...props}) => (
        <Cell {...props}>
          <button id="link" value={rows2[rowIndex]} onMouseOver={this.handleChange.bind(this)} onClick={this.openDetailModal}>{rows2[rowIndex]}</button>
        </Cell>
      )}
      width={400}
    />
    <Column
      header={<Cell>Balance</Cell>}
      cell={({rowIndex, ...props}) => (
        <Cell {...props}>
          {rows[rowIndex]}
        </Cell>
      )}
      width={200}
    />
  </Table>    
  <button onClick={this.openModal}>createContract</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

          <h2 ref={subtitle => this.subtitle = subtitle}>Hello</h2>
          <div>I am a modal</div>
          <p>Start Date:&nbsp;<input type="text" name="startDate" pattern="[0-9]*" onInput={this.handleChange}/></p>
          <p>Amount:&nbsp;<input type="text" name="amount" pattern="[0-9]*" onInput={this.handleChange}/></p>
           <button onClick={this.createContract.bind(this)}>Create Contract</button>
           {this.state.addressResult}
           <p><button onClick={this.initiateContract.bind(this)}>Initiate Contract</button>&nbsp;</p>
           <p><button onClick={this.closeModal}>close</button></p>

        </Modal>

        <Modal
          isOpen={this.state.detailModalIsOpen}
          onAfterOpen={this.afterOpenDetailModal}
          onRequestClose={this.closeDetailModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h3>Details of {selected}</h3>
          <p>Oracle Address: {oracle_address}</p>
          <p>Duration: {duration}</p>
          <p>Multiplier: {multiplier}</p>
           <p><button onClick={this.closeDetailModal}>close</button></p>

        </Modal>
      <button onClick={this.withdraw.bind(this)}>Withdraw</button>&nbsp;
  </div>
    );
  }
}
