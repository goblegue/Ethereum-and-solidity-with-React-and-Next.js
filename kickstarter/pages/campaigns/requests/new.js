import React, { Component } from "react";
import Layout from "../../../components/layout";
import {
  Button,
  Form,
  FormField,
  Input,
  Message,
  TextArea,
} from "semantic-ui-react";
import web3 from "../../../ethereum/web3";
import Campaign from "../../../ethereum/campaign";
import { Link, Router } from "../../../router";
class RequestNew extends Component {
  static async getInitialProps(props) {
    return { address: props.query.address };
  }

  state = {
    description: "",
    value: "",
    recipient: "",
    err_message: "",
    loading: false,
  };

  onSubmit = async (event) => {
    event.preventDefault();
    const campaign = Campaign(this.props.address);
    const accounts = await web3.eth.getAccounts();
    const { description, value, recipient } = this.state;
    this.setState({ loading: true, err_message: "" });
    try {
      await campaign.methods
        .createRequest(description, web3.utils.toWei(value, "ether"), recipient)
        .send({
          from: accounts[0],
        });
      Router.pushRoute(`/campaigns/${this.props.address}/requests`);
    } catch (err) {
      this.setState({ err_message: err.message });
    }
    this.setState({ loading: false });
  };
  render() {
    return (
      <Layout>
        <Link route={`/campaigns/${this.props.address}/requests`}>
          <a> Back </a>
        </Link>
        <h1>Create new Request</h1>
        <Form onSubmit={this.onSubmit} error={!!this.state.err_message}>
          <FormField rows="3">
            <label>Description</label>
            <TextArea
              placeholder=""
              value={this.state.description}
              onChange={(event) => {
                this.setState({ description: event.target.value });
              }}
            />
          </FormField>
          <FormField>
            <label>Value in Ether</label>
            <Input
              placeholder=""
              value={this.state.value}
              onChange={(event) => {
                this.setState({
                  value: event.target.value,
                });
              }}
            />
          </FormField>
          <FormField>
            <label>Recipient</label>
            <Input
              placeholder=""
              value={this.state.recipient}
              onChange={(event) => {
                this.setState({ recipient: event.target.value });
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

export default RequestNew;
