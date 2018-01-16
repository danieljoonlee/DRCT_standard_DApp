//$ SET DEPLOY_HOSTNAME=galaxy.meteor.com
//$ meteor deploy drct.meteorapp.com --settings settings.json

import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
import './Lib/lib.js';


var fABI =[{"constant":true,"inputs":[],"name":"duration","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_new_owner","type":"address"}],"name":"setOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"token_ratio1","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"token_a","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"multiplier","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"start_date","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_long_drct","type":"address"},{"name":"_short_drct","type":"address"}],"name":"settokens","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"token_ratio2","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"contracts","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"withdrawFees","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_new_oracle_address","type":"address"}],"name":"setOracleAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"created_contracts","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_fee","type":"uint256"}],"name":"setFee","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_party","type":"address"},{"name":"_long","type":"bool"}],"name":"payToken","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"short_drct","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"deployContract","outputs":[{"name":"created","type":"address"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_supply","type":"uint256"},{"name":"_party","type":"address"},{"name":"_long","type":"bool"}],"name":"createToken","outputs":[{"name":"created","type":"address"},{"name":"token_ratio","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"oracle_address","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_start_date","type":"uint256"}],"name":"setStartDate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getVariables","outputs":[{"name":"oracle_addr","type":"address"},{"name":"operator","type":"address"},{"name":"swap_duration","type":"uint256"},{"name":"swap_multiplier","type":"uint256"},{"name":"token_a_addr","type":"address"},{"name":"token_b_addr","type":"address"},{"name":"swap_start_date","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_deployer","type":"address"}],"name":"setDeployer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_userContract","type":"address"}],"name":"setUserContract","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getCount","outputs":[{"name":"count","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getBase","outputs":[{"name":"_base1","type":"address"},{"name":"base2","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"long_drct","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"user_contract","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"fee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"token_b","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_token_a","type":"address"},{"name":"_token_b","type":"address"}],"name":"setBaseTokens","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_token_ratio1","type":"uint256"},{"name":"_token_ratio2","type":"uint256"},{"name":"_duration","type":"uint256"},{"name":"_multiplier","type":"uint256"}],"name":"setVariables","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_sender","type":"address"},{"indexed":false,"name":"_created","type":"address"}],"name":"ContractCreation","type":"event"}]
var sABI =[{"constant":true,"inputs":[],"name":"token_a_amount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_amount_a","type":"uint256"},{"name":"_amount_b","type":"uint256"},{"name":"_sender_is_long","type":"bool"},{"name":"_senderAdd","type":"address"}],"name":"EnterSwap","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"current_state","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_amount_a","type":"uint256"},{"name":"_amount_b","type":"uint256"},{"name":"_sender_is_long","type":"bool"},{"name":"_senderAdd","type":"address"}],"name":"CreateSwap","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"short_party","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_begin","type":"uint256"},{"name":"_end","type":"uint256"}],"name":"forcePay","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"showPrivateVars","outputs":[{"name":"_userContract","type":"address"},{"name":"num_DRCT_long","type":"uint256"},{"name":"numb_DRCT_short","type":"uint256"},{"name":"swap_share_long","type":"uint256"},{"name":"swap_share_short","type":"uint256"},{"name":"long_token_addr","type":"address"},{"name":"short_token_addr","type":"address"},{"name":"oracle_addr","type":"address"},{"name":"token_a_addr","type":"address"},{"name":"token_b_addr","type":"address"},{"name":"swap_multiplier","type":"uint256"},{"name":"swap_duration","type":"uint256"},{"name":"swap_start_date","type":"uint256"},{"name":"swap_end_date","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"long_party","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"createTokens","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"factory_address","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"Exit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"premium","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"token_b_amount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_factory_address","type":"address"},{"name":"_creator","type":"address"},{"name":"_userContract","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_token_a","type":"address"},{"indexed":false,"name":"_token_b","type":"address"},{"indexed":false,"name":"_start_date","type":"uint256"},{"indexed":false,"name":"_end_date","type":"uint256"},{"indexed":false,"name":"_creating_party","type":"address"}],"name":"SwapCreation","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_long_token","type":"address"},{"indexed":false,"name":"_short_token","type":"address"}],"name":"PaidOut","type":"event"}]
var oABI =[{"constant":false,"inputs":[{"name":"_new_owner","type":"address"}],"name":"setOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_date","type":"uint256"}],"name":"RetrieveData","outputs":[{"name":"data","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_key","type":"uint256"},{"name":"_value","type":"uint256"}],"name":"StoreDocument","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_key","type":"uint256"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"DocumentStored","type":"event"}]
var weABI =[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_amount","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"total_supply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"bal","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"CreateToken","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_success","type":"bool"},{"indexed":false,"name":"_message","type":"string"}],"name":"StateChanged","type":"event"}]
var userABI = [{"constant":false,"inputs":[{"name":"_swapadd","type":"address"},{"name":"_amounta","type":"uint256"},{"name":"_amountb","type":"uint256"},{"name":"_premium","type":"uint256"},{"name":"_isLong","type":"bool"}],"name":"Initiate","outputs":[{"name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_amounta","type":"uint256"},{"name":"_amountb","type":"uint256"},{"name":"_isLong","type":"bool"},{"name":"_swapadd","type":"address"}],"name":"Enter","outputs":[{"name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_factory_address","type":"address"}],"name":"setFactory","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"factory_address","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]

var factoryAddress ="0x262be937a1dc12ef881250df4794a6dc9a4229f4";

Session.set('showFactory', true); 

Template.body.helpers({
    showCashout() {
      return Session.get('showCashout');
    },
        showFactory() {
      return Session.get('showFactory');
    },
    showExit() {
      return Session.get('showExit');
    }
    ,  showBulletin() {
      return Session.get('showBulletin');
    }
    ,  showmySwaps() {
      return Session.get('showmySwaps');
    }
    ,  showOracle() {
      return Session.get('showOracle');
    }    
    ,  showEnter() {
      return Session.get('showEnter');
    }
  });


Template.radioform.events({
	   'click button.radioFactory'(event) {
	Session.set('showExit', false);
	Session.set('showBulletin', false);
	Session.set('showOracle', false);
	Session.set('showCashout', false);
	Session.set('showmySwaps', false);
	Session.set('showEnter', false);
	event.preventDefault();
      Session.set('showFactory', true);
    },
    'click button.radioEnter'(event) {
	Session.set('showExit', false);
	Session.set('showBulletin', false);
	Session.set('showOracle', false);
	Session.set('showCashout', false);
	Session.set('showmySwaps', false);
	Session.set('showFactory', false);
	event.preventDefault();
      Session.set('showEnter', true);
    },
   'click button.radioCashout'(event) {
	Session.set('showFactory', false);
	Session.set('showExit', false);
	Session.set('showBulletin', false);
	Session.set('showOracle', false);
	Session.set('showmySwaps', false);
	Session.set('showEnter', false);
	event.preventDefault();
      Session.set('showCashout', true);
    },
        'click button.radioExit'(event) {
	Session.set('showCashout', false);
	Session.set('showFactory', false);
	Session.set('showBulletin', false);
	Session.set('showOracle', false);
	Session.set('showmySwaps', false);
	Session.set('showEnter', false);
	event.preventDefault();
      Session.set('showExit', true);
    },
        'click button.radioBulletin'(event) {
	Session.set('showCashout', false);
	Session.set('showFactory', false);
	Session.set('showExit', false);
	Session.set('showOracle', false);
	Session.set('showmySwaps', false);
	Session.set('showEnter', false);
	event.preventDefault();
      Session.set('showBulletin', true);
    },
            'click button.radiomySwaps'(event) {
	Session.set('showCashout', false);
	Session.set('showFactory', false);
	Session.set('showExit', false);
	Session.set('showOracle', false);
	Session.set('showBulletin', false);
	Session.set('showEnter', false);
	event.preventDefault();
      Session.set('showmySwaps', true);
    },
            'click button.radioOracle'(event) {
	Session.set('showCashout', false);
	Session.set('showFactory', false);
	Session.set('showExit', false);
	Session.set('showmySwaps', false);
	Session.set('showBulletin', false);
	Session.set('showEnter', false);
	event.preventDefault();
      Session.set('showOracle', true);
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
	});

Template.factory.helpers({
	returnedadd(){
		return Template.instance().returnedadd.get();
	}
})

Template.factory.events({
	//get input values
	'click button.create': function (err, template) {
	var select = document.getElementById('startDate').value;
	var contract_date = (new Date(select).getTime())/1000;
	console.log(factoryAddress);
	var fContract = web3.eth.contract(fABI).at(factoryAddress);
    fContract.deployContract(contract_date,{from:web3.eth.accounts[0],value:0,gas: 4000000},function(error, result){
    if(!error) {
        console.log("#" + result + "#");
    } else {
        console.error(error);
    }
  })
},
    //now send money to the WETH
    //then create swap with details
    //send WETH to contract
	'click button.addresult'(event,instance){
	var select = document.getElementById('startDate').value;
	var contract_date = (new Date(select).getTime())/1000;
	console.log(contract_date);
	var fContract = web3.eth.contract(fABI).at(factoryAddress);
	let transferEvent = fContract.ContractCreation({}, {fromBlock: 0, toBlock: 'latest'})
	transferEvent.get((error, logs) => {
	  // we have the logs, now print them
	  logs.forEach(log => console.log(log.args['_created']))
	  console.log(logs[logs.length-1].args['_created'], logs[logs.length-1].args['_sender'])
	  for(i = logs.length-1; i >= 0; i--){
	  	if(logs[i].args['_sender'] == web3.eth.accounts[0]){
	 		 var check = logs[i].args['_created'];
	 		 i = 0;
	 	}
  	  }
  	  if(check != null){
  	  	instance.returnedadd.set(check);
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
});

Template.bulletin.events({

	'click button.bulletin': function (err, template) {
		document.getElementById("bulletinState").innerHTML ="loading...";
	   	var select = document.getElementById('startDate').value;
		var contract_date = (new Date(select).getTime())/1000;
		var fContract = web3.eth.contract(fABI).at(factoryAddress);
		var check = "<table><tr><th>State</th><th>Address</th><th>Token A Amount</th><th>Token B Amount</th><th>Premium</th><th>Long Party</th><th>ShortParty</th></tr>";
		let transferEvent = fContract.ContractCreation({}, {fromBlock: 0, toBlock: 'latest'})
		transferEvent.get((error, logs) => {
			var sDate = fContract.created_contracts(add);
			console.log(sDate);
			if (sDate ==contract_date){
				console.log('test',logs.length)
			  	for(i = logs.length-1; i >= 0; i--){
					var add = logs[i].args['_created'];
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
			document.getElementById("bulletinState").innerHTML = check;
		})
	}
});

Template.Oracle.onCreated(function factoryOC(){
	this.oraclevals = new ReactiveVar("");
	});

Template.Oracle.helpers({
	oraclevals(){
		return Template.instance().oraclevals.get();
	}
})
Template.Oracle.events({
	'click button.Oracle'(event,instance){
		var datestr = document.getElementById("odate").value;
		console.log(datestr);
		var timestamp = (new Date(datestr).getTime())/1000;
		console.log(timestamp);
		var fContract = web4.eth.contract(fABI).at(factoryAddress1);
		var oracleAddress = fContract.oracle_address.call();
		var oracleInstance = web4.eth.contract(oABI).at(oracleAddress);
		oracleInstance.RetrieveData(timestamp,function(error, result){
	    	if(!error) {
	       		instance.oraclevals.set(result/1000);
	    	} else {
	        	console.error(error);
	        	instance.oraclevals.set('undefined');
	    	}
		})
	}
});


Template.mySwaps.onCreated(function factoryOC(){
	this.startvalue = new ReactiveVar("");
	this.capmin = new ReactiveVar("");
	this.capmax = new ReactiveVar("");
	this.longbalance = new ReactiveVar("");
	this.shortbalance = new ReactiveVar("");
});

Template.mySwaps.helpers({
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
	}
})

Template.mySwaps.events({
	'click button.balances'(event,instance){
		var select = document.getElementById('startDate').value;
		var contract_date = (new Date(select).getTime())/1000;
		var fContract = web4.eth.contract(fABI).at(factoryAddress);
		var oracleAddress = fContract.oracle_address.call();
		var oracleInstance = web4.eth.contract(oABI).at(oracleAddress);
		oracleInstance.RetrieveData(contract_date,function(error, result){
	    if(!error) {
	        instance.startvalue.set(result/1000);
	        instance.capmin.set((result/1000)-.5*(result/1000));
	        instance.capmax.set((result/1000)+.5*(result/1000));
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
	    we1Instance.balanceOf(web3.eth.accounts[0],{from:web3.eth.accounts[0],value: 0,gas: 2000000},function(error, result){
	    if(!error) {
	    	if(result<1){result = 0};
	    	console.log(result);
	        instance.longbalance.set(result);
	    } else {
	        console.error(error);
	    }
	    })
	     we2Instance.balanceOf(web3.eth.accounts[0],{from:web3.eth.accounts[0],value: 0,gas: 2000000},function(error, result){
	    if(!error) {
	    	if(result<1){result = 0};
	    	console.log(result);
	        instance.shortbalance.set(result);
	    } else {
	        console.error(error);
	    }
		  	changeIt.style.visibility = 'visible';
		})
	},

	'click button.MySwaps'(event,instance){
	document.getElementById("openswaplist").innerHTML = "loading...";
	var fContract = web3.eth.contract(fABI).at(factoryAddress);
	var check = "<table><tr><th>State</th><th>Start Date</th><th>Address</th><th>Token A Amount</th><th>Token B Amount</th><th>Premium</th><th>Long Party</th><th>ShortParty</th></tr>";
	let transferEvent = fContract.ContractCreation({}, {fromBlock: 0, toBlock: 'latest'})
	transferEvent.get((error, logs) => {
		console.log('test',logs.length)
	  	for(i = logs.length-1; i >= 0; i--){
  	 	    var creator_add = logs[i].args['_sender'];
  	 	    var j = 0;
			var add = logs[i].args['_created'];
				if (creator_add == web3.eth.accounts[0]){j = 1;}
				var sInstance = web4.eth.contract(sABI).at(add);
				var long_party = sInstance.long_party.call();
				var short_party = sInstance.short_party.call();
				var sDate = fContract.created_contracts(add);
			if(j == 1 || long_party == web3.eth.accounts[0] || short_party==web3.eth.accounts[0]){
				var State= sInstance.current_state.call().toNumber();
				var token_a_amount = web3.fromWei(sInstance.token_a_amount.call().toNumber(), 'ether');
				var token_b_amount = web3.fromWei(sInstance.token_b_amount.call().toNumber(), 'ether');
					try{
						var premium = web3.fromWei(sInstance.premium.call().toNumber(), 'ether');
					}
					catch(err){
						var premium = 0;
					}
					check +='<tr><td>'+State +"</td><td>"+ sDate + "</td><td>"+ add + "</td><td>"+token_a_amount+"</td><td>"+token_b_amount+"</td><td> "+premium +"</td><td> " + long_party+"</td><td> " + short_party+"</td></tr>";
			}

		}
		check += '</table>';
		console.log(check);
		document.getElementById("openswaplist").innerHTML = check;
	})
},
});

Template.cashout.onCreated(function cashoutOC(){
	this.longbalance2= new ReactiveVar("");
	this.shortbalance2= new ReactiveVar("");
	});

Template.cashout.helpers({
	longbalance2(){
		return Template.instance().longbalance2.get();
	},
	shortbalance2(){
		return Template.instance().shortbalance2.get();
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
	    we1Instance.balanceOf(web3.eth.accounts[0],{from:web3.eth.accounts[0],value: 0,gas: 2000000},function(error, result){
	    if(!error) {
	    	if(result<1){result = 0};
	    	console.log('working',result)
	        instance.longbalance2.set(result);
	    } else {
	        console.error(error);
	    }
	    })
	     we2Instance.balanceOf(web3.eth.accounts[0],{from:web3.eth.accounts[0],value: 0,gas: 2000000},function(error, result){
	    if(!error) {
	    	if(result<1){result = 0};
	        instance.shortbalance2.set(result);
	    } else {
	        console.error(error);
	    }
	})
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
		we1Instance.withdraw(longbalance,{from:web3.eth.accounts[0],value:0,gas: 2000000},function(error, result){
	    if(error) {
	        console.log("#" + result + "#")
	    } else {
	        console.error(error);
	    }
	})
	}
	if (shortbalance> 0){
		we2Instance.withdraw(shortbalance,{from:web3.eth.accounts[0],value:0,gas: 2000000},function(error, result){
	    if(!error) {
	        console.log("#" + result + "#")
	    } else {
	        console.error(error);
	    }
	})
	}
	},
});

Template.exit.events({
	'click button.exit':function (err, template) {
		var x = document.getElementById("exit");
		var s_address = x.elements[0].value;
	console.log(s_address)
    	var sContract = web3.eth.contract(sABI).at(s_address);
	    sContract.Exit({from:web3.eth.accounts[0],value: 0,gas: 2000000},function(error, result){
	    if(!error) {
	        console.log("#" + result + "#")
	    } else {
	        console.error(error);
	    }
	})
},
});

Template.enter.events({
	'click button.enter':function (err, template) {
		var x = document.getElementById("enter");
		var amount_b =eval(web3.toWei(document.getElementById("amount_b").value, 'ether'));
		var select = document.getElementById('isLong_b');
	   	var isLong = eval(select.options[select.selectedIndex].value);
		var s_address = "" + x.elements[0].value;
		console.log(amount_b,amount_b,isLong,s_address);
		var fContract = web4.eth.contract(fABI).at(factoryAddress);
		var usercontractAddress = fContract.user_contract.call();
		console.log('UC',usercontractAddress);
		var userContract = web3.eth.contract(userABI).at(usercontractAddress);
	    userContract.Enter(amount_b,amount_b,isLong,s_address,{from:web3.eth.accounts[0],value:amount_b,gas: 4000000},function(error, result){
	    if(!error) {
	        console.log("#" + result + "#")
	    } else {
	        console.error(error);
	    }
	})
},
});

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

$("#H2_h").click(function(){
    $("#H2_b").toggle();
});
$("#Protips_h").click(function(){
    $("#Protips_b").toggle();
});
});