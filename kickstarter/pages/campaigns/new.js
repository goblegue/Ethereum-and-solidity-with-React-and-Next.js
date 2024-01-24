import React, { Component } from "react";
import Layout from "../../components/layout";
import { Button, Form, FormField, Input } from "semantic-ui-react";

class CampaignNew extends Component {
  state = {
    minimum_contribution: "",
  };
  render() {
    return (
      <Layout>
        <h1>New Campaign</h1>
        <Form>
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
          <Button primary> Create!</Button>
        </Form>
      </Layout>
    );
  }
}

export default CampaignNew;
