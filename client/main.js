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

var factoryAddress1 ="0xfac388d2e660a54129757d9bcac69f7f00a69bc4";
var factoryAddress2 ="0xc99CC3CeD3208A5637bdb52cD2aD03550A62F71C";

Session.set('showFactory', true); 

Template.factory.events({
	//get input values
	'click button.create': function (err, template) {
	var select = document.getElementById('startDate');
   	var contract_date = select.options[select.selectedIndex].value;
	console.log(startDate);
	var factoryAddress = (contract_date == "20180119" ? factoryAddress1 : factoryAddress2);
	console.log(factoryAddress);
	var changeIt = document.getElementById('CreationResult');
	var fContract = web3.eth.contract(fABI).at(factoryAddress);
    fContract.deployContract({from:web3.eth.accounts[0],value:0,gas: 4000000},function(error, result){
    if(!error) {
        console.log("#" + result + "#");
        changeIt.style.visibility = 'visible';
    } else {
        console.error(error);
    }
  })
    //now send money to the WETH
    //then create swap with details
    //send WETH to contract
},
	'click button.addresult': function (err, template) {
	var select = document.getElementById('startDate');
   	var contract_date = select.options[select.selectedIndex].value;
	console.log(contract_date);
	var factoryAddress = (contract_date == "20180119" ? factoryAddress1 : factoryAddress2);
	var changeIt = document.getElementsByName('sendbutton')[0];
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
  	  console.log(check);
  	  if(check != null){
  	  	document.getElementById("returnedadd").innerHTML = check;
  	  	changeIt.style.visibility = 'visible';
  		}
	})
	},
	'click button.initiate': function (err, template) {
	var select1 = document.getElementById('startDate');
   	var contract_date = select1.options[select1.selectedIndex].value;
	console.log(startDate);
	var factoryAddress = (contract_date == "20180119" ? factoryAddress1 : factoryAddress2);
	var amount_a = web3.toWei(document.getElementById("amount_a").value, 'ether');
	var premium = web3.toWei(document.getElementById("premium").value, 'ether');
	var total = eval(amount_a) + eval(premium);
	var select = document.getElementById('isLong');
   	var isLong = select.options[select.selectedIndex].value;
	var swapadd = document.getElementById("returnedadd").innerHTML;
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

Template.body.onRendered({
  setInitialVars(){
    console.log('starting');
    var net = web3.version.network;
    if(net == 1){net = "This is the Ethereum Mainnet"}
    else if (net ==3){net = "This is the Ropsten Network"}
      else {net = "Unkown Network"}
    var acct = web3.eth.accounts[0];
    var funds = web3.fromWei(web4.eth.getBalance(web3.eth.accounts[0]), 'ether').toNumber();
    console.log('net',net);
    console.log('account',acct);
    console.log('funds',funds);
    document.getElementById("Network").innerHTML = net;
    document.getElementById("Address").innerHTML = acct;
    document.getElementById("Funds").innerHTML = funds;
}
})
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

Template.bulletin.events({

	'click button.bulletin': function (err, template) {
	 var select = document.getElementById('CState');
   	 var cState = select.options[select.selectedIndex].value;
   	 console.log('pars',cState);
   	 	var select = document.getElementById('startDate');
   	var contract_date = select.options[select.selectedIndex].value;
	var factoryAddress = (contract_date == "20180119" ? factoryAddress1 : factoryAddress2);
	console.log(factoryAddress);
	 var fContract = web3.eth.contract(fABI).at(factoryAddress);
	  var check = "<table><tr><th>State</th><th>Address</th><th>Token A Amount</th><th>Token B Amount</th><th>Premium</th><th>Long Party</th><th>ShortParty</th></tr>";
	let transferEvent = fContract.ContractCreation({}, {fromBlock: 0, toBlock: 'latest'})
	transferEvent.get((error, logs) => {
		console.log('test',logs.length)
	  	for(i = logs.length-1; i >= 0; i--){
			var add = logs[i].args['_created'];
  	 	    console.log(add);
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
		check += '</table>';
		console.log(check);
		document.getElementById("bulletinState").innerHTML = check;
	})
}
});


Template.Oracle.events({

	'click button.Oracle': function (err, template) {
	var datestr = document.getElementById("odate").value;
	var timestamp = (new Date(datestr.split(".").join("-")).getTime())/1000;
	console.log(timestamp);
	var fContract = web4.eth.contract(fABI).at(factoryAddress1);
	var oracleAddress = fContract.oracle_address.call();
	console.log(oracleAddress);
	var oracleInstance = web4.eth.contract(oABI).at(oracleAddress);
	oracleInstance.RetrieveData(timestamp,function(error, result){
    if(!error) {
        console.log("#" + result + "#");
        document.getElementById("oraclevals").innerHTML = result/1000;
    } else {
        console.error(error);
        document.getElementById("oraclevals").innerHTML = 'undefined';
    }
})
}
});

Template.mySwaps.onRendered({

})
Template.mySwaps.events({

		'click button.balances':function (err, template) {
		//get both balances
		var select = document.getElementById('startDate');
	   	var contract_date = select.options[select.selectedIndex].value;
		console.log(contract_date);
		var factoryAddress = (contract_date == "20180119" ? factoryAddress1 : factoryAddress2);
		var fContract = web4.eth.contract(fABI).at(factoryAddress);
		var oracleAddress = fContract.oracle_address.call();
		var sDate = fContract.start_date.call();
		console.log(sDate);
		console.log(oracleAddress);
		var oracleInstance = web4.eth.contract(oABI).at(oracleAddress);
		oracleInstance.RetrieveData(sDate,function(error, result){
	    if(!error) {
	        console.log("#" + result + "#");
	        document.getElementById("startvalue").innerHTML = (result/1000);
	        document.getElementById("capmin").innerHTML = (result/1000)-.5*(result/1000);
	        document.getElementById("capmax").innerHTML =  (result/1000)+.5*(result/1000);
	    } else {
	        console.error(error);
	        document.getElementById("capmin").innerHTML = 'undefined';
	        document.getElementById("capmax").innerHTML = 'undefined';
	    }
		})
		var fContract = web4.eth.contract(fABI).at(factoryAddress);
		var token_a =fContract.long_drct.call();
		var token_b =fContract.short_drct.call();
		console.log('toks',token_a,token_b);
		var we1Instance = web3.eth.contract(weABI).at(token_a);
		var we2Instance = web3.eth.contract(weABI).at(token_b);
		var changeIt = document.getElementById('Balances');
	    we1Instance.balanceOf(web3.eth.accounts[0],{from:web3.eth.accounts[0],value: 0,gas: 2000000},function(error, result){
	    if(!error) {
	        console.log("#" + result + "#");
	        document.getElementById("longbalance").innerHTML = result;
	    } else {
	        console.error(error);
	    }
	    })
	     we2Instance.balanceOf(web3.eth.accounts[0],{from:web3.eth.accounts[0],value: 0,gas: 2000000},function(error, result){
	    if(!error) {
	        console.log("#" + result + "#");
	        document.getElementById("shortbalance").innerHTML = result;
	    } else {
	        console.error(error);
	    }
  	  	changeIt.style.visibility = 'visible';
	})
},

	'click button.MySwaps': function (err, template) {
	var select = document.getElementById('startDate');
   	var contract_date = select.options[select.selectedIndex].value;
	console.log(contract_date);
	var factoryAddress = (contract_date == "20180119" ? factoryAddress1 : factoryAddress2);
	 var fContract = web3.eth.contract(fABI).at(factoryAddress);
	 var check = "<table><tr><th>State</th><th>Address</th><th>Token A Amount</th><th>Token B Amount</th><th>Premium</th><th>Long Party</th><th>ShortParty</th></tr>";
	let transferEvent = fContract.ContractCreation({}, {fromBlock: 0, toBlock: 'latest'})
	transferEvent.get((error, logs) => {
		console.log('test',logs.length)
	  	for(i = logs.length-1; i > 0; i--){
  	 	    var creator_add = logs[i].args['_sender'];
  	 	    var j = 0;
				var add = logs[i].args['_created'];
				if (creator_add == web3.eth.accounts[0]){j = 1;}
	  	 	    console.log(add);
				var sInstance = web4.eth.contract(sABI).at(add);
				var long_party = sInstance.long_party.call();
				var short_party = sInstance.short_party.call();
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
						check +='<tr><td>'+State +"</td><td>"+ add + "</td><td>"+token_a_amount+"</td><td>"+token_b_amount+"</td><td> "+premium +"</td><td> " + long_party+"</td><td> " + short_party+"</td></tr>";
			}

		}
		check += '</table>';
		console.log(check);
		document.getElementById("openswaplist").innerHTML = check;
	})
},
});



Template.cashout.events({
	'click button.balances':function (err, template) {
		//get both balances
		var fContract = web4.eth.contract(fABI).at(factoryAddress1);
		var token_a =fContract.token_a.call();
		var token_b =fContract.token_b.call();
		console.log('toks',token_a,token_b);
		var we1Instance = web3.eth.contract(weABI).at(token_a);
		var we2Instance = web3.eth.contract(weABI).at(token_b);
		var changeIt = document.getElementById('Balances');
	    we1Instance.balanceOf(web3.eth.accounts[0],{from:web3.eth.accounts[0],value: 0,gas: 2000000},function(error, result){
	    if(!error) {
	        console.log("#" + result + "#");
	        document.getElementById("longbalance").innerHTML = result;
	    } else {
	        console.error(error);
	    }
	    })
	     we2Instance.balanceOf(web3.eth.accounts[0],{from:web3.eth.accounts[0],value: 0,gas: 2000000},function(error, result){
	    if(!error) {
	        console.log("#" + result + "#");
	        document.getElementById("shortbalance").innerHTML = result;
	    } else {
	        console.error(error);
	    }
  	  	changeIt.style.visibility = 'visible';
	})
},
	'click button.cashout':function (err, template) {
		var fContract = web4.eth.contract(fABI).at(factoryAddress1);
		var token_a =fContract.token_a.call();
		var token_b =fContract.token_b.call();
		var we1Instance = web3.eth.contract(weABI).at(token_a);
		var we2Instance = web3.eth.contract(weABI).at(token_b);
		var longbalance = document.getElementById("longbalance").innerHTML;
		var shortbalance = document.getElementById("shortbalance").innerHTML;
	if (longbalance> 0){
		we1Instance.withdraw(longbalance,{from:web3.eth.accounts[0],value:0,gas: 2000000},function(error, result){
	    if(!error) {
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
			var select = document.getElementById('startDate');
   		var contract_date = select.options[select.selectedIndex].value;
		console.log(contract_date);
		var factoryAddress = (contract_date == "20180119" ? factoryAddress1 : factoryAddress2);
		console.log(factoryAddress);
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

$("#H2_h").click(function(){
    $("#H2_b").toggle();
});
$("#Protips_h").click(function(){
    $("#Protips_b").toggle();
});
});