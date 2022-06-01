import React, { Component } from "react";
import { Form, Grid, Button, Icon } from "semantic-ui-react";
import style from "../css/index.module.css";

class QRpage extends Component {
  state = {
    loading: false,
    description: "",
  };

  static async getInitialProps(props) {
    try {
      let settings = {};
      await fetch(
        "https://qhtzkxv8aj.execute-api.eu-central-1.amazonaws.com/Live/QR/?id=" +
          props.query.id
      )
        .then((response) => response.json())
        .then((data) => {
          settings = data["body"]["settings"];
        });
      return {
        subjecttype: settings["subjecttype"],
        tasktype: settings["tasktype"],
        poi: settings["poi"],
        id: props.query.id
      };
    } catch (error) {
      console.log(error)
    }
  }

  submitForm = async (event) => {
    this.setState({ loading: true });
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    await fetch(
      "https://qhtzkxv8aj.execute-api.eu-central-1.amazonaws.com/Live/QR/?id=" +
        this.props.id+'&description='+this.state.description,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        if(data['statusCode'] == 201){
          this.setState({ loading: false, description:'' });
        }
      });
  };

  render() {
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <div className={style.logo}></div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column  className={style.column}>
            <div className={[style.heading, style.centre].join(" ")}>
              Je hebt een {this.props.subjecttype} met taak{" "}
              {this.props.tasktype} op de afdeling {this.props.poi} voltooid.
              Klik op onderstaande knop 'verstuur' om de taak te registreren
            </div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column  className={style.column}>
            <Form onSubmit={this.submitForm}>
              <Form.TextArea
                placeholder="Opmerkingen"
                onChange={(event) =>
                  this.setState({ description: event.target.value })
                }
              />
              <div className={style.centre}>
                <Button
                loading={this.state.loading}
                icon
                labelPosition="right"
                type="submit"
                color="twitter"
              >
                Next
                <Icon name="right arrow" />
              </Button>
              </div>
              
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default QRpage;
