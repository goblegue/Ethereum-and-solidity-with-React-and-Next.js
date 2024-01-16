const HDWalletProvider = require('@truffle/hdwallet-provider');
const { Web3 } = require('web3');

const { abi, evm } = require('./compile');

const provider = new HDWalletProvider(
    'rare march blossom reason inner say erode switch pitch verb staff twist',
    'https://sepolia.infura.io/v3/489c3524252b4ab29c099aab72e8323e'
);
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
  
    console.log('Attempting to deploy from account', accounts[0]);
  
    const result = await new web3.eth.Contract(abi)
      .deploy({ data: evm.bytecode.object, arguments: ['Hi there!'] })
      .send({ gas: '1000000', from: accounts[0] });
  
    console.log('Contract deployed to', result.options.address);
    provider.engine.stop();
  };
  
deploy();