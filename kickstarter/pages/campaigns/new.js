import React, { Component } from "react";
import Layout from "../../components/layout";
import { Button, Form, FormField, Input, Message } from "semantic-ui-react";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { Router } from "../../router";

class CampaignNew extends Component {
  state = {
    minimum_contribution: "",
    err_message: "",
    loading: false,
  };
  onSubmit = async (event) => {
    event.preventDefault();
    this.setState({ loading: true, err_message: "" });
    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createCampaign(this.state.minimum_contribution)
        .send({
          from: accounts[0],
        });
      Router.pushRoute("/");
    } catch (err) {
      this.setState({ err_message: err.message });
    }
    this.setState({ loading: false });
  };
  render() {
    return (
      <Layout>
        <h1>New Campaign</h1>
        <Form onSubmit={this.onSubmit} error={!!this.state.err_message}>
          <FormField>
            <label>Minimum contribution</label>
            <Input
              label="Wei"
              labelPosition="right"
              placeholder=""
              value={this.state.minimum_contribution}
              onChange={(event) => {
                this.setState({ minimum_contribution: event.target.value });
              }}
            />
          </FormField>
          <Message error header="Opps!" content={this.state.err_message} />
          <Button primary loading={this.state.loading}>
            Create!
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default CampaignNew;
