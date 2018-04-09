// //$ SET DEPLOY_HOSTNAME=galaxy.meteor.com
// //$ meteor deploy drct.meteorapp.com --settings settings.json



// /*For future
// Pull ABI from contract (deployed link?)
// Save state and block number from last time queried for each user in database (just pull logs from here)
// Have events work on contract creation?
// */
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './main.html';
//import './Lib/lib.js';
import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import Transactions from '../imports/Transactions.js';

Meteor.startup(() => {
  render(<Transactions/>,document.getElementById('transactionlist'));
});

Session.set('showPortfolio', true);  

Template.body.helpers({
        showFactory() {
      return Session.get('showFactory');
    },
    showAbout() {
      return Session.get('showAbout');
    }
    ,  showExchange() {
      return Session.get('showExchange');
    }
    ,  showPortfolio() {
      return Session.get('showPortfolio');
    }
  });


Template.radioform.events({
	   'click button.radioFactory'(event) {
	Session.set('showExchange', false);
	Session.set('showPortfolio', false);
  session.set('showAbout',false);
	event.preventDefault();
      Session.set('showFactory', true);
    },
    'click button.radioAbout'(event) {
	Session.set('showExchange', false);
	Session.set('showPortfolio', false);
	Session.set('showFactory', false);
	event.preventDefault();
      Session.set('showAbout', true);
    },

        'click button.radioExchange'(event) {
	Session.set('showAbout', false);
	Session.set('showFactory', false);
	Session.set('showPortfolio', false);
	event.preventDefault();
      Session.set('showExchange', true);
    },
            'click button.radioPortfolio'(event) {
	Session.set('showAbout', false);
	Session.set('showFactory', false);
	Session.set('showExchange', false);
	event.preventDefault();
      Session.set('showPortfolio', true);
    }

});


Template.connection.onCreated(function connectionOC(){
	this.net = new ReactiveVar("");
	this.acct = new ReactiveVar("");
	this.funds = new ReactiveVar(0);
	});

Template.connection.helpers({
	net(){
		return Template.instance().net.get();
	},
	acct(){
		return Template.instance().acct.get();
	},
	funds(){
		return Template.instance().funds.get();
	}
})

Template.connection.events({
'click #connection_h'(event,instance){
    console.log('starting');
    var net1 = web3.version.network;
    if(net1 == 1){network_res = "This is the Ethereum Mainnet"}
    	else if (net1 ==3){network_res = "This is the Ropsten Network"}
    	else {network_res = "Not connected or Unkown Network"}
	  instance.net.set(network_res);
    instance.acct.set(web3.eth.accounts[0]);
    instance.funds.set(web3.fromWei(web4.eth.getBalance(web3.eth.accounts[0]), 'ether').toNumber());
},
})


Template.factory.onCreated(function factoryOC(){
	this.returnedadd = new ReactiveVar("");
  this.howto = new ReactiveVar(false);

	});

Template.factory.helpers({
	returnedadd(){
		return Template.instance().returnedadd.get();
	},
  howto:function(){
    return Template.instance().howto.get();
  }
})

Template.factory.events({
	//get input values
	'click button.create': function (err, template) {
	var select = document.getElementById('startDate').value;
	var contract_date = (new Date(select).getTime())/1000;
  console.log(contract_date,(Date.now()/1000 - 6*86400));
  if(contract_date < (Date.now()/1000 - 6*86400) || isNaN(contract_date)){
    console.log(contract_date,(Date.now()/1000 - 6*86400));
    alert('Date must be within the past 7 days or in the future');
  }
  else{
  	console.log(factoryAddress);
  	var fContract = web3.eth.contract(fABI).at(factoryAddress);
    fContract.deployContract(contract_date,{from:web3.eth.accounts[0],value:0,gas: 4000000},function(error, result){
      if(!error) {
          console.log("#" + result + "#");
      } else {
          console.error(error);
      }
    })
  }
  },
  'click .H2_h': function(event,template) {
    var holder = template.howto.get();
    template.howto.set(!holder);
  },
    //now send money to the WETH
    //then create swap with details
    //send WETH to contract
	'click button.addresult'(event,instance){
	instance.returnedadd.set('loading...');
	var fContract = web3.eth.contract(fABI).at(factoryAddress);
	let transferEvent = fContract.ContractCreation({}, {fromBlock: 4953776, toBlock: 'latest'})
	transferEvent.get((error, logs) => {
	  console.log(logs[logs.length-1].args['_created'], logs[logs.length-1].args['_sender'])
	  for(i = [logs.length-1]; i >= 0; i--){
	  	if(logs[i].args['_sender'] == web3.eth.accounts[0]){
	 		 var check = logs[i].args['_created'];
	 		 i = 0;
	 	   }
  	  }
  	  if(check != null){
  	  	instance.returnedadd.set(check);
  		}
      else{
        instance.returnedadd.set('No contract found, check Metamask');
      }
	})
	},
	'click button.initiate'(event,instance){
	var amount_a = web3.toWei(document.getElementById("amount_a").value, 'ether');
	var premium = web3.toWei(document.getElementById("premium").value, 'ether');
	var total = eval(amount_a) + eval(premium);
	var select = document.getElementById('isLong');
   	var isLong = select.options[select.selectedIndex].value;
	var swapadd = instance.returnedadd.curValue;
	console.log(swapadd);
  if(swapadd.length < 42 || amount_a < .1 || premium < 0){
    alert('Contract Address must be a valid address and the amount Ether must be >= .1')
  }
  else{
  	console.log('initvars:',swapadd,amount_a,amount_a,premium,isLong);
  	console.log('test');
  	var fContract = web4.eth.contract(fABI).at(factoryAddress);
  	var usercontractAddress = fContract.user_contract.call();
  	console.log('UC',usercontractAddress);
  	var userContract = web3.eth.contract(userABI).at(usercontractAddress);
      userContract.Initiate(swapadd,amount_a,amount_a,premium,isLong,{from:web3.eth.accounts[0],value:total,gas: 4000000},function(error, result){
      if(!error) {
          console.log("#" + result + "#");
      } else {
          console.error(error);
      }
    })
  }
}
});


Template.exchange.onCreated(function factoryOC(){
  this.howto = new ReactiveVar(false);
  });

Template.exchange.helpers({
  howto:function(){
    return Template.instance().howto.get();
  }
})

Template.exchange.events({

	'click button.exchange': function (err, template) {
	 var select = document.getElementById('startDate').value;
		var contract_date = (new Date(select).getTime())/1000;
    if(isNaN(contract_date)){
    alert('Enter a valid date');
    }
  else{
    document.getElementById("exchangeState").innerHTML ="loading...";
		var cState = document.getElementById('CState').value; 
		var fContract = web3.eth.contract(fABI).at(factoryAddress);
		var check = "<table><tr><th>State</th><th>Address</th><th>Token A Amount</th><th>Token B Amount</th><th>Premium</th><th>Long Party</th><th>ShortParty</th></tr>";
		let transferEvent = fContract.ContractCreation({}, {fromBlock: 0, toBlock: 'latest'})
		transferEvent.get((error, logs) => {
			console.log('test',logs.length)
			for(i = logs.length-1; i >= 0; i--){
				var add = logs[i].args['_created'];
				var f2 = web4.eth.contract(fABI).at(factoryAddress);
				var sDate = f2.created_contracts(add);
				console.log(sDate);
				if (sDate ==contract_date){
				var sInstance = web4.eth.contract(sABI).at(add);
				var State= sInstance.current_state.call().toNumber();
				if(State == cState){
					var long_party = sInstance.long_party.call();
					var short_party = sInstance.short_party.call();
					var token_a_amount = web3.fromWei(sInstance.token_a_amount.call().toNumber(), 'ether');
					var token_b_amount = web3.fromWei(sInstance.token_b_amount.call().toNumber(), 'ether');

							try{
								var premium = web3.fromWei(sInstance.premium.call().toNumber(), 'ether');
							}
							catch(err){
								var premium = 0;
							}
							check +='<tr><td>'+State +"</td><td>"+ add + "</td><td>"+token_a_amount+"</td><td>"+token_b_amount+"</td><td> "+premium +"</td><td> " + long_party+"</td><td> " + short_party+"</td></tr>";
					}
				}
			}
			check += '</table>';
			document.getElementById("exchangeState").innerHTML = check;
		  })
    }
	},
  'click .H2_h': function(event,template) {
    var holder = template.howto.get();
    template.howto.set(!holder);
  },
  'click button.openDates': async function (err, template) {
    document.getElementById("openDateList").innerHTML ="loading...";

    var fContract = web4.eth.contract(fABI).at(factoryAddress);
    var starting_contracts = {};
    var newcheck = [];
    var j = -1;
    var check = "<table><tr><th>Start Date</th><th>Contracts</th></tr>";
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    //How do we make the 1000 a variable number?
    //this is also really slow..
    for(i = 0; i < 1000; i++){
      var add =fContract.contracts(i);
      console.log(add);
      if(add != '0x'){
        var sdate = fContract.created_contracts(add);
        console.log(sdate);
        sdate = parseInt(sdate);
        if(sdate > (Date.now()/1000 - 16*86400)){
            var stringDate = new Date(sdate * 1000);
            if (isNaN(starting_contracts[sdate.toString()])){
              starting_contracts[sdate.toString()] = 1;
              j +=1;
              newcheck.push('<tr><td>'+months[stringDate.getUTCMonth()] + ' ' + stringDate.getUTCDate() + ' ' + stringDate.getUTCFullYear() +"</td><td>"+ starting_contracts[sdate.toString()] + "</td></tr>");
            }
            else{
                starting_contracts[sdate.toString()] +=  1;
                newcheck[j] ='<tr><td>'+months[stringDate.getUTCMonth()] + ' ' + stringDate.getUTCDate() + ' ' + stringDate.getUTCFullYear() +"</td><td>"+ starting_contracts[sdate.toString()] + "</td></tr>";
            }
}
        }
        else{
          i = 1000;
        }
      }
      for(i = 0; i <= j; i++){
        check += newcheck[i];
      }
      check += '</table>';
      document.getElementById("openDateList").innerHTML = check;
  }
});



Template.portfolio.onCreated(function factoryOC(){
	this.startvalue = new ReactiveVar("");
	this.capmin = new ReactiveVar("");
	this.capmax = new ReactiveVar("");
	this.longbalance = new ReactiveVar("");
	this.shortbalance = new ReactiveVar("");
  this.howto = new ReactiveVar(false);
});

Template.portfolio.helpers({
	startvalue(){
		return Template.instance().startvalue.get();
	},
	capmin(){
		return Template.instance().capmin.get();
	},
	capmax(){
		return Template.instance().capmax.get();
	},
	longbalance(){
		return Template.instance().longbalance.get();
	},
	shortbalance(){
		return Template.instance().shortbalance.get();
	},
  howto:function(){
    return Template.instance().howto.get();
  }
})

Template.portfolio.events({
	'click button.balances'(event,instance){
		var select = document.getElementById('startDate').value;
		var contract_date = (new Date(select).getTime())/1000;
    if(isNaN(contract_date)){
      alert('Enter a valid date');
    }
    else{
  		var fContract = web4.eth.contract(fABI).at(factoryAddress);
  		var oracleAddress = fContract.oracle_address.call();
  		var oracleInstance = web4.eth.contract(oABI).at(oracleAddress);
  		oracleInstance.RetrieveData(contract_date,function(error, result){
  	    if(!error) {
  	        instance.startvalue.set(result/1000);
  	        instance.capmin.set(0);
  	        instance.capmax.set((result/1000)+(result/1000));
  	    } else {
  	        console.error(error);
  	        instance.capmin.set('undefined');
  	        instance.capmax.set('undefined')
  	    }
  		})
  		var fContract = web4.eth.contract(fABI).at(factoryAddress);
  		var token_a =fContract.long_tokens(contract_date);
  		var token_b =fContract.short_tokens(contract_date);
  		var we1Instance = web3.eth.contract(weABI).at(token_a);
  		var we2Instance = web3.eth.contract(weABI).at(token_b);
  		var changeIt = document.getElementById('Balances');
  	    we1Instance.balanceOf(web3.eth.accounts[0],{from:web3.eth.accounts[0],value: 0},function(error, result){
  	    if(!error) {
  	    	if(result<1){result = 0};
  	    	console.log(result);
  	        instance.longbalance.set(result);
  	    } else {
  	        console.error(error);
  	    }
  	    })
  	     we2Instance.balanceOf(web3.eth.accounts[0],{from:web3.eth.accounts[0],value: 0},function(error, result){
  	    if(!error) {
  	    	if(result<1){result = 0};
  	    	console.log(result);
  	        instance.shortbalance.set(result);
  	    } else {
  	        console.error(error);
  	    }
  		  	changeIt.style.visibility = 'visible';
  		})
       }
	},
  'click .H2_h': function(event,template) {
    var holder = template.howto.get();
    template.howto.set(!holder);
  },

  'click button.sendToken'(event,instance){
    var select = document.getElementById('isLong');
    var isLong = select.options[select.selectedIndex].value;
    var toAdd =document.getElementById("receiver").value ;
    var amount = document.getElementById("amount_send").value;
      var select2 = document.getElementById('startDate').value;
    var contract_date = (new Date(select2).getTime())/1000;
    if(isNaN(contract_date) || amount < 1){
      alert('Sending a token requires a valid date and amount');
    }
    else{
      console.log(isLong,toAdd, amount);
      var fContract = web4.eth.contract(fABI).at(factoryAddress);
      var token;
      var token_instance;
      if(isLong){
        token = fContract.long_tokens(contract_date);
        token_instance = web3.eth.contract(weABI).at(token);
      }
      else{
        token = fContract.long_tokens(contract_date);
        token_instance = web3.eth.contract(weABI).at(token);
      }
      token_instance.transfer(toAdd,amount,{from:web3.eth.accounts[0],value: 0},function(error, result){
        if (error){
          console.log(error); 
        }
      })
    }
  },
});
/*
Template.cashout.onCreated(function cashoutOC(){
	this.longbalance2= new ReactiveVar("");
	this.shortbalance2= new ReactiveVar("");
  this.howto = new ReactiveVar(false);
	});

Template.cashout.helpers({
	longbalance2(){
		return Template.instance().longbalance2.get();
	},
	shortbalance2(){
		return Template.instance().shortbalance2.get();
	},
  howto:function(){
    return Template.instance().howto.get();
  }
})


Template.cashout.events({
	'click button.balances'(event,instance){
		//get both balances
		var fContract = web4.eth.contract(fABI).at(factoryAddress);
		var token_a =fContract.token_a.call();
		var token_b =fContract.token_b.call();
		var we1Instance = web3.eth.contract(weABI).at(token_a);
		var we2Instance = web3.eth.contract(weABI).at(token_b);
		var changeIt = document.getElementById('Balances');
		changeIt.style.visibility = 'visible';
	    we1Instance.balanceOf(web3.eth.accounts[0],{from:web3.eth.accounts[0],value: 0},function(error, result){
	    if(!error) {
	    	if(result<1){result = 0};
	    	console.log('working',result)
	        instance.longbalance2.set(result);
	    } else {
	        console.error(error);
	    }
	    })
	     we2Instance.balanceOf(web3.eth.accounts[0],{from:web3.eth.accounts[0],value: 0},function(error, result){
	    if(!error) {
	    	if(result<1){result = 0};
	        instance.shortbalance2.set(result);
	    } else {
	        console.error(error);
	    }
	})
},
  'click .H2_h': function(event,template) {
    var holder = template.howto.get();
    template.howto.set(!holder);
  },
	'click button.cashout'(event,instance){
		var fContract = web4.eth.contract(fABI).at(factoryAddress);
		var token_a =fContract.token_a.call();
		var token_b =fContract.token_b.call();
		var we1Instance = web3.eth.contract(weABI).at(token_a);
		var we2Instance = web3.eth.contract(weABI).at(token_b);
		var longbalance = instance.longbalance2.curValue;
		var shortbalance = instance.shortbalance2.curValue;
	if (longbalance> 0){
		we1Instance.withdraw(longbalance,{from:web3.eth.accounts[0],value:0},function(error, result){
	    if(error) {
	        console.log("#" + result + "#")
	    } else {
	        console.error(error);
	    }
	})
	}
	if (shortbalance> 0){
		we2Instance.withdraw(shortbalance,{from:web3.eth.accounts[0],value:0},function(error, result){
	    if(!error) {
	        console.log("#" + result + "#")
	    } else {
	        console.error(error);
	    }
	})
	}
	},
});
*/
$(document).ready(function(){
$("#cdetails_h").click(function(){
    $("#cdetails_b").toggle();
});

$("#connection_h").click(function(){
    $("#connection_b").toggle();
});

$("#disclaimer_h").click(function(){
    $("#disclaimer_b").toggle();
});
$("#Protips_h").click(function(){
    $("#Protips_b").toggle();
});
});