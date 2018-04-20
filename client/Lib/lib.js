 // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    // Use Mist/MetaMask's provider
    web3 = new Web3(web3.currentProvider);
  } else {
    //alert('No web3? You should consider trying MetaMask! - www.metamask.io')
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

web3.version.getNetwork((err, netId) => {
  switch (netId) {
    case "1":
      console.log('web3 - This is mainnet');
   
      break
    case "2":
      console.log('This is the deprecated Morden test network.');
         //alert('Please connect to the Main Ethereum network via MetaMask');
      break
    case "3":
      console.log('This is the ropsten test network.')
      break
    default:
         //alert('Please connect to the Main Ethereum network via MetaMask');
      console.log('This is an unknown network.')
  }
})
