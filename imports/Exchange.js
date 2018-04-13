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

export default class Transactions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      storageValue: "",
      web3: null,
      oracle_address:"",
      duration:0,
      multiplier:0,
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
    this.getOrderbook = this.getOrderbook.bind(this);
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
   await this.getOrderbook();
   this.getBlock();
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
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

    //This gets all your interactions with the contracts:Factory,Swap Contract, DRCT Tokens
  getOrderbook(){
    var _this = this;
    var o_adds = [];
    var o_bals = [];
    var o_longs = [];
    var o_starts = [];
    var o_prices = [];
    var openDates = [];
    var date;
    this.state.factory.setProvider(this.state.web3.currentProvider);
    this.state.exchange.setProvider(this.state.web3.currentProvider);
    this.state.exchange.deployed().then((instance2) =>{
      this.state.factory.deployed().then((instance) => {
        instance.getDateCount().then((result) =>{
          for(i=0;i<result;i++){
              instance.startDates.call(i).then((res4)=>{
                  date = res4.c[0];
                  openDates.push(res4.c[0]);      
                  instance.getTokens(date).then((token_addresses)=>{
                  instance2.getOrders(token_addresses[0]).then((res)=>{
                    if(res.length>0){
                      for(j=0;j<res.length;j++){
                        instance2.getOrder(res[j]).then((res2)=>{
                          o_adds.push(token_addresses[0]);
                          o_longs.push("Long");
                          o_starts.push(date );
                          o_bals.push(res2[2].c[0]);
                          o_prices.push(res2[1].c[0]);
                        })
                      }
                }
              }).then(()=>{
                  instance2.getOrders(token_addresses[1]).then((res)=>{
                    if(res.length>0){
                      for(j=0;j<res.length;j++){
                        instance2.getOrder(res[j]).then((res2)=>{
                          o_adds.push(token_addresses[1]);
                          o_longs.push("Short");
                          o_starts.push(date );
                          o_bals.push(res2[2].c[0]);
                          o_prices.push(res2[1].c[0]);
                              _this.setState((prevState,props)=>({openDates: openDates}));
                              _this.setState((prevState,props)=>({orderadds: o_adds}));
                              _this.setState((prevState,props)=>({orderIsLong: o_longs}));
                              _this.setState((prevState,props)=>({orderBalance: o_bals}));
                              _this.setState((prevState,props)=>({orderStartDate: o_starts}));
                              _this.setState((prevState,props)=>({orderPrices: o_prices}));
                        })
                      }
                }
              })

              })

            })
         })
       }
          })
      })
  })
  }

  //allows a party to place an order on the exchange
  placeOrder(){
    this.state.exchange.setProvider(this.state.web3.currentProvider)
      this.state.web3.eth.getAccounts((error, accounts) => {
        this.state.exchange.deployed().then((instance) => {
        this.eventWatcherExchange()
        console.log(this.state.amount)
        return instance.list(this.state.swapAdd,this.state.exchangeAmount,this.state.price,{from: accounts[0],gas:4000000})
        })
      })
  }

  //allows a party to place an order on the exchange
  cancelOrder(){
    this.state.exchange.setProvider(this.state.web3.currentProvider)
      this.state.web3.eth.getAccounts((error, accounts) => {
        this.state.exchange.deployed().then((instance) => {
        this.eventWatcherExchange()
        console.log(this.state.amount)
        return instance.list(this.state.swapAdd,this.state.exchangeAmount,this.state.price,{from: accounts[0],gas:4000000})
        })
      })
  }

  //allows a party to take an order on the exchange
  takeOrder(){
    this.state.exchange.setProvider(this.state.web3.currentProvider)
      this.state.web3.eth.getAccounts((error, accounts) => {
        this.state.exchange.deployed().then((instance) => {
        this.eventWatcherExchange()
        instance.getOrder(this.state.Order).then((result) => {
          return instance.buy(this.state.order,{from: accounts[0],value:result[1]*1e18,gas:2000000})
        })
        
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
              this.setState({duration: result[1]})
              this.setState({multiplier:result[2]})
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

//Add links for when clicked (openswaplist), you can get details
//Add links for when you click an order, it does a 'Take Order'
//Add an admin console: force pay, query oracle, etc.
  render() {
    var rows3 = this.state.orderadds;
    var rows4 = this.state.orderIsLong;
    var rows5 = this.state.orderBalance;
    var rows6 = this.state.orderStartDate;
    var rows7 = this.state.orderPrices;
    return (
      <div id="react_div">
    <Table
    rowHeight={40}
    rowsCount={rows4.length}
    width={600}
    height={rows4.length *40 +45}
    headerHeight={40}>
    <Column
      header={<Cell>Longs</Cell>}
      cell={({rowIndex, ...props}) => (
        <Cell {...props}>
          {rows4[rowIndex]}
        </Cell>
      )}
      width={200}
    />
        <Column
      header={<Cell>Address</Cell>}
      cell={({rowIndex, ...props}) => (
        <Cell {...props}>
          {rows3[rowIndex]}
        </Cell>
      )}
      width={200}
    />
            <Column
      header={<Cell>Start Date</Cell>}
      cell={({rowIndex, ...props}) => (
        <Cell {...props}>
          {rows6[rowIndex]}
        </Cell>
      )}
      width={200}
    />
                <Column
      header={<Cell>Amount</Cell>}
      cell={({rowIndex, ...props}) => (
        <Cell {...props}>
          {rows5[rowIndex]}
        </Cell>
      )}
      width={200}
    />
                    <Column
      header={<Cell>Price</Cell>}
      cell={({rowIndex, ...props}) => (
        <Cell {...props}>
          {rows7[rowIndex]}
        </Cell>
      )}
      width={200}
    />
  </Table>
      <button onClick={this.placeOrder.bind(this)}>Place Order</button>&nbsp;
      <button onClick={this.cancelOrder.bind(this)}>Cancel Order</button>&nbsp;
      <button onClick={this.getOrderbook.bind(this)}>Withdraw</button>&nbsp;
      <p>Longs: {rows4}</p>
  </div>
    );
  }
}
