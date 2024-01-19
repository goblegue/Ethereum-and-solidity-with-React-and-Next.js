import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import web3 from "./web3";
import lottery from "./lottery";

class App extends Component {
  state = {
    manager: "",
    players: [],
    contract_balance: "",
    value: "",
    message: "",
  };
  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.allPlayers().call();
    const contract_balance = await web3.eth.getBalance(lottery.options.address);
    this.setState({ manager, players, contract_balance });
  }
  onSubmit = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    this.setState({ message: "waiting on transaction success...." });
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, "ether"),
    });
    this.setState({ message: "You have been entered" });
  };
  onClick = async () => {
    const accounts = await web3.eth.getAccounts();
    this.setState({ message: "waiting on randomly picking winner...." });
    await lottery.methods.pickWinner().send({
      from: accounts[0],
    });
    this.setState({ message: "Winner has been selected" });
  };
  render() {
    return (
      <div>
        <h1>Lottery contract!</h1>

        <p>
          this is a contract managed by {this.state.manager}. <br></br> There
          are total {this.state.players.length} players competing to win{" "}
          <br></br>
          {web3.utils.fromWei(this.state.contract_balance, "ether")} ethers
        </p>

        <hr />

        <form onSubmit={this.onSubmit}>
          <h4> Want to try your luck</h4>
          <div>
            <labal>Amount of ether to enter </labal>

            <input
              value={this.state.value}
              onChange={(event) => this.setState({ value: event.target.value })}
            />
          </div>
          <button>Enter</button>
        </form>

        <hr />

        <h4> Ready to pick a winner? </h4>
        <button onClick={this.onClick}>Pick a winner!</button>

        <hr />

        <h2> {this.state.message}</h2>
      </div>
    );
  }
}

export default App;
