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
import Dropdown from 'react-dropdown'


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
      myAccount: "",
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
      tokenadds:[],
      tokenbals:[],
      myOrders:[],
      currentBlock: 0,
      contract: require('truffle-contract'),
      factory:null,
      exchange:null,
      wrapped:null,
      token:null,
      swap:null,
      userContract:null,
      selected:"",
      modalIsOpen: false,
      cModalIsOpen: false,
      startDate:0,
      price:0, //The price to sell on exchange
      amount:0,//amount to sell on exchange
      order:"", //orderId for cancelling or taking order
      tradedToken:"" //token you're placing an order for
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
        this.openCModal = this.openCModal.bind(this);
    this.afterOpenCModal = this.afterOpenCModal.bind(this);
    this.closeCModal = this.closeCModal.bind(this);
    this.getOrderbook = this.getOrderbook.bind(this);
  }

  async instantiateContract() {
    this.state.web3.eth.getAccounts((error, accounts) => {
        this.setState({ myAccount: accounts[0]})
    })
    await this.setState({ factory : this.state.contract(Factory)})
    await this.setState({ swap : this.state.contract(Swap)})
    await this.setState({ userContract : this.state.contract(UserContract)})
    await this.setState({ token : this.state.contract(Token)})
    await this.setState({ exchange : this.state.contract(Exchange)})
    await this.setState({ wrapped :this.state.contract(Wrapped)})
   await this.getOrderbook();
   await this.getDRCTpositions();
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
    var myOrders = [];;
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
                          if(res2[0] == this.state.myAccount){
                            myOrders.push(res[j])
                          }
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
                          console.log(res2[0],this.state.myAccount)
                          if(res2[0] == this.state.myAccount){
                            myOrders.push(res[j]);
                            _this.setState((prevState,props)=>({myOrders: myOrders}));
                          }
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
                  thisDates.push({value: res4.c[0] , label: res4.c[0]}); 
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
  }


  //allows a party to place an order on the exchange
  placeOrder(){
    this.state.exchange.setProvider(this.state.web3.currentProvider)
      this.state.web3.eth.getAccounts((error, accounts) => {
        this.state.exchange.deployed().then((instance) => {
        this.eventWatcherExchange("OrderPlaced")
        return instance.list(this.state.swapAdd,this.state.amount,this.state.price,{from: accounts[0],gas:4000000})
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
        return instance.list(this.state.selected,this.state.exchangeAmount,this.state.price,{from: accounts[0],gas:4000000})
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

    openCModal() {
    this.setState({cModalIsOpen: true});
  }

  afterOpenCModal() {
    // references are now sync'd and can be accessed.
    //this.subtitle.style.color = '#f00';
  }

  closeCModal() {
    this.setState({cModalIsOpen: false});
  }


  selectChange(e) {
    this.setState({selected: e.value});
  }

  handleSChange(e) {
    this.setState({swapAdd: e.value});
  }

    handleAChange(e) {
     this.setState({amount: e.target.value});
  }


  handlePChange(e) {
     this.setState({price: e.target.value});
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
    var options = this.state.mytokens;
    var options2 = this.state.myOrders;
    console.log(options2)
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

          <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Place Order"
        >

          <div>
             <Dropdown options={options} onChange={this.handleSChange.bind(this)} value={this.state.swapAdd} placeholder="Your open Positions" />
          </div>
          <h2 ref={subtitle => this.subtitle = subtitle}>Enter Order Details:</h2>
          <p>Amount:&nbsp;<input type="text" pattern="[0-9]*" onInput={this.handleAChange.bind(this)}/></p>
          <p>Price:&nbsp;<input type="text" pattern="[0-9]*" onInput={this.handlePChange.bind(this)}/></p>
          <div>
           <button onClick={this.placeOrder.bind(this)}>Place Order</button>
          </div>
           <p><button onClick={this.closeModal}>close</button></p>


        </Modal>

        <Modal
          isOpen={this.state.cModalIsOpen}
          onAfterOpen={this.afterOpenCModal}
          onRequestClose={this.closeCModal}
          style={customStyles}
          contentLabel="CancelModal"
        >
          <h2 ref={subtitle => this.subtitle = subtitle}>Cancel Order:</h2>
          <div>
             <Dropdown options={options2} onChange={this.selectChange.bind(this)} value={this.state.selected} placeholder="Your open Positions" />
          </div>

          <div>
           <button onClick={this.cancelOrder.bind(this)}>Cancel Order</button>
          </div>
           <p><button onClick={this.closeCModal}>close</button></p>


        </Modal>
      <button onClick={this.openModal}>Place Order</button>&nbsp;
      <button onClick={this.openCModal}>Cancel Order</button>&nbsp;
      <button onClick={this.withdraw.bind(this)}>Withdraw</button>&nbsp;
      <p>Longs: {rows4}</p>
  </div>
    );
  }
}
