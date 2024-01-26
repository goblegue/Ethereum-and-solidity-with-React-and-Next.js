import React, { Component } from "react";
import Layout from "../../../components/layout";
import { Link } from "../../../router";
import {
  Button,
  Table,
  TableRow,
  TableHeader,
  TableHeaderCell,
} from "semantic-ui-react";
import Campaign from "../../../ethereum/campaign";

class RequestIndex extends Component {
  static async getInitialProps(props) {
    const campaign = Campaign(props.query.address);
    const requestCount = await campaign.methods.getRequestsCount().call();

    const requests = await Promise.all(
      Array(parseInt(requestCount))
        .fill()
        .map((element, index) => {
          return campaign.methods.requests(index).call();
        }),
    );

    return {
      address: props.query.address,
      requests: requests,
      requestCount: requestCount,
    };
  }
  render() {
    return (
      <Layout>
        <h2>Requests</h2>
        <Link route={`/campaigns/${this.props.address}/requests/new`}>
          <Button primary> New Request </Button>
        </Link>
        <Table celled>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>ID</TableHeaderCell>
              <TableHeaderCell>Description</TableHeaderCell>
              <TableHeaderCell>Amount</TableHeaderCell>
              <TableHeaderCell>Recipient</TableHeaderCell>
              <TableHeaderCell>Approval Count</TableHeaderCell>
              <TableHeaderCell>Approve</TableHeaderCell>
              <TableHeaderCell>Finalize</TableHeaderCell>
            </TableRow>
          </TableHeader>
        </Table>
      </Layout>
    );
  }
}
export default RequestIndex;
