const assert = require('assert');
const ganache = require('ganache');
const { Web3 } = require('web3');
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require("../compile");

let accounts;
let lottery;

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();
  lottery= await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
    })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("Lottery", () => {
  it("deploys a contract", () => {
    assert.ok(lottery.options.address);
  });
  it("has a manager",async () => {
    const manager = await lottery.methods.manager().call();
    assert.equal(manager , accounts[0]);
  } );
  it('one player can enter ',async ()=>{
    await lottery.methods.enter().send({ 
      from : accounts[0],
      value : web3.utils.toWei("0.02","ether")
    });
    const players= await lottery.methods.allPlayers().call();

    assert.equal(accounts[0], players[0]);
    assert.equal(1,players.length);
  })
});
