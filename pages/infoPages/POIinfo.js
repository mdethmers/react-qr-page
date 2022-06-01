import React, { Component, Modal } from "react";
import { Card, Grid } from "semantic-ui-react";
import style from "../css/index.module.css";
import ErrorModal from '../components/ErrorModal'


class POIpage extends Component {

  static async getInitialProps(props) {
    try {
      let poiData = [];
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      };
      await fetch(
        "https://qhtzkxv8aj.execute-api.eu-central-1.amazonaws.com/Live/QR/?id=" +
          props.query.id,
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          poiData = data["body"];
        });
      return {
        poiData: poiData,
        id: props.query.id,
        poiName: props.query.poiName,
      };
    } catch (error) {
    }
  }

  renderPoiList(param) {
    try {
      var items = this.props.poiData.map((entry) => {
        return {
          header: this.props.poiName,
          description:
            "Laatst gewijzigd: " +
            entry["statusLastModified"] +
            " - Objecttype: " +
            entry["subjectTypeId"] +
            " - Taaktype: " +
            entry["typeId"],
        };
      });
      return (
        <Card.Group
          items={items}
          className={style.centre}
          centered
        ></Card.Group>
      );
    } catch (error) {

    }
  }

  render() {
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <div className={style.logo}></div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <div className={[style.heading, style.centre].join(" ")}>
              {" "}
              {this.props.poiName} Informatie pagina
            </div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row centered>
          {this.renderPoiList()}
        </Grid.Row>
        
        
      </Grid>
    );
  }
}

export default POIpage;
