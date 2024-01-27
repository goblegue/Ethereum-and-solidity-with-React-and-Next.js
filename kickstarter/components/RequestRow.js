import React, { Component } from "react";
import { Table, Button, Message } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import { Router } from "../router";

class RequestRow extends Component {
  state = {
    // err_message: "",
    approve_loading: false,
    finalize_loading: false,
  };
  onApprove = async () => {
    this.setState({ approve_loading: true });
    const accounts = await web3.eth.getAccounts();
    try {
      await this.props.campaign.methods.approveRequest(this.props.id).send({
        from: this.props.accounts[0],
      });
      Router.replaceRoute(`/campaigns/${this.props.address}/requests`);
    } catch (err) {}
    this.setState({ approve_loading: false });
  };
  onFinalize = async () => {
    this.setState({ finalize_loading: true });
    try {
      await this.props.campaign.methods.finalizeRequest(this.props.id).send({
        from: this.props.accounts[0],
      });
      Router.replaceRoute(`/campaigns/${this.props.address}/requests`);
    } catch (err) {}
    this.setState({ finalize_loading: false });
  };

  render() {
    const { Row, Cell } = Table;
    const { id, request, approversCount } = this.props;
    const readyToFinalize =
      request.approvalCount > parseInt(approversCount) / 2;
    return (
      <Row
        disabled={request.complete}
        positive={readyToFinalize && !request.complete}
      >
        <Cell>{id}</Cell>
        <Cell>{request.description}</Cell>
        <Cell>{web3.utils.fromWei(request.value, "ether")}</Cell>
        <Cell>{request.recipient}</Cell>
        <Cell>
          {parseInt(request.approvalCount)} /{parseInt(approversCount)}
        </Cell>
        <Cell>
          {request.complete ? null : (
            <Button
              color="green"
              basic
              onClick={this.onApprove}
              loading={this.state.approve_loading}
            >
              Approve
            </Button>
          )}
          {/*<Message error header="Opps!" />*/}
        </Cell>
        <Cell>
          {this.props.isManager && !request.complete ? (
            <Button
              color="red"
              basic
              onClick={this.onFinalize}
              loading={this.state.finalize_loading}
            >
              Finalize
            </Button>
          ) : null}
          {/*<Message error header="Opps!" />*/}
        </Cell>
      </Row>
    );
  }
}
export default RequestRow;
