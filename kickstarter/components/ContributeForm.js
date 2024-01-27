import React, { Component } from "react";
import { Button, Form, FormField, Input, Message } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import Campaign from "../ethereum/campaign";
import { Router } from "../router";
class ContributeForm extends Component {
  state = {
    contribution: "",
    err_message: "",
    loading: false,
  };
  onSubmit = async (event) => {
    event.preventDefault();
    const campaign = Campaign(this.props.address);
    /*    const in_ether = web3.utils.fromWei(this.state.contribution, "ether");
    this.setState({ contribution: in_ether });*/

    this.setState({ loading: true, err_message: "" });
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.contribution, "ether"),
      });
      Router.replaceRoute(`/campaigns/${this.props.address}`);
    } catch (err) {
      this.setState({ err_message: err.message });
    }
    this.setState({ loading: false });
  };
  render() {
    return (
      <Form onSubmit={this.onSubmit} error={!!this.state.err_message}>
        <FormField>
          <label>Contribute to this campaign!</label>
          <Input
            label="Ether"
            labelPosition="right"
            placeholder=""
            value={this.state.contribution}
            onChange={(event) => {
              this.setState({
                contribution: event.target.value,
              });
            }}
          />
        </FormField>
        <Message error header="Opps!" content={this.state.err_message} />
        <Button primary loading={this.state.loading}>
          Contribute!
        </Button>
      </Form>
    );
  }
}

export default ContributeForm;
