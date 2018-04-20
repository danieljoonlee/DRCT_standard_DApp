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
import Exchange from '../imports/Exchange.js';
import Portfolio from '../imports/Portfolio.js';
import Navbar from '../imports/Navbar.js';
import footer from '../imports/footer.html';
import dashboard from '../imports/dashboard.html';

Meteor.startup(() => {
  render(<Navbar/>,document.getElementById('navbar'));
  render(<Portfolio/>,document.getElementById('myportfolio'));
  render(<Transactions/>,document.getElementById('transactionlist'));
  render(<Exchange/>,document.getElementById('exchange'));
});

Session.set('showPortfolio', true);  

Template.body.helpers({
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
	},
	//footer
	'showFooter' : function() {
        return '<div class="container-fluid footer"><div class="row"><div class="col-md-3 copyright">Copyright @2018</div><div class="col-md-offset-6 col-md-3"><i class="fa fa-facebook-square"></i><i class="fa fa-twitter-square"></i><i class="fa fa-linkedin"></i></div></div></div>';
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


