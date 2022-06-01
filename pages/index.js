import React, { Component } from "react";
import style from "./css/index.module.css";
import { Grid, Button } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { Link } from "../routes";
//run npm run dev to start next.js
import getParam from "./functions/getParam";
import router from "next/router";

class Index extends Component {
  state = {
    id: "",
    poiName: "",
  };

  componentDidMount() {
    fetch(
      "https://qhtzkxv8aj.execute-api.eu-central-1.amazonaws.com/Live/QR/?id=" +
        getParam("id")
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({ id: getParam("id") });
        this.setState({ poiName: data["body"]["settings"]["poi"] });
        console.log("index page");
        data["body"]["settings"]["function"] == "getPoiStats"
          ? router.push(
              `/infoPages/POIinfo?id=${this.state.id}&poiName=${this.state.poiName}`,//internal html is PoiInfo?id=1&name=kiosk
              `/infoPages/POIinfo/${this.state.id}/${this.state.poiName}` //shown html is PoiInfo/1/kiosk
            )
          : router.push(
              `/infoPages/QRinfo?id=${this.state.id}`,
              `/infoPages/QRinfo/${this.state.id}`
            );
      });
  }

  render() {
    return (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <div className={style.logo}></div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <div className="ui active centered inline loader"></div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default Index;
