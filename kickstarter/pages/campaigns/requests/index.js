import React, { Component } from "react";
import Layout from "../../../components/layout";
import { Link } from "../../../router";
import { Button } from "semantic-ui-react";

class RequestIndex extends Component {
  static async getIntialProps(props) {
    return { address: props.query.address };
  }
  render() {
    return (
      <Layout>
        <h2>Requests</h2>
        <Link route={`/campaigns/${this.props.a}/requests/new`}>
          <Button> click me </Button>
        </Link>
      </Layout>
    );
  }
}
export default RequestIndex;
