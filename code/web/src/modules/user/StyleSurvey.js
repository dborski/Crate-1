// Imports
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Helmet } from "react-helmet";

// UI Imports
import { Grid, GridCell } from "../../ui/grid";
import Button from "../../ui/button";
import ImageTile from "../../ui/image/Tile";
import Input from "../../ui/input/Input";
import H3 from "../../ui/typography/H3";
import H4 from "../../ui/typography/H4";
import Icon from "../../ui/icon";
import { level1 } from "../../ui/common/shadows";
import { white, grey } from "../../ui/common/colors";

// App Imports
import { APP_URL } from "../../setup/config/env";
import userRoutes from "../../setup/routes/user";
import { messageShow, messageHide } from "../common/api/actions";
import { register } from "./api/actions";
import AuthCheck from "../auth/AuthCheck";

// Component
class StyleSurvey extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: "",
      isLoading: false,
      styleChoices: {},
    };
  }

  onChange = (event) => {
    let styleChoices = this.state.styleChoices;
    styleChoices[event.target.name] = event.target.value;

    this.setState({ styleChoices });
  };

  onSubmit = (event) => {
    event.preventDefault();

    this.setState({
      isLoading: true,
    });
  };

  makeRadioBtns = () => {
    const categories = ["Tops", "Bottoms", "Shoes", "Accessories", "Dress"];
    return categories.map((category) => {
      return (
        <section>
          {category}
          <input
            onChange={this.onChange}
            type="radio"
            name={category}
            value="edgy"
          />{" "}
          Edgy
          <input
            onChange={this.onChange}
            type="radio"
            name={category}
            value="professional"
          />{" "}
          Professional
          <input
            onChange={this.onChange}
            type="radio"
            name={category}
            value="casual"
          />{" "}
          Casual
        </section>
      );
    });
  };

  render() {
    return (
      <div>
        <Helmet>
          <title>My Style Survey </title>
        </Helmet>
        {/* Top title bar */}
        <Grid style={{ backgroundColor: grey }}>
          <GridCell style={{ padding: "2em", textAlign: "center" }}>
            <H3 font="secondary">My Style Survey</H3>
          </GridCell>
        </Grid>
        <Grid>
          <GridCell style={{ padding: "2em", textAlign: "center" }}>
            <H4 style={{ marginBottom: "0.5em" }}>
              NAME, you don't have a style preference yet.
              <br /> Please fill out this survey to determine your style
              preference.
            </H4>
            {this.makeRadioBtns()}
          </GridCell>
        </Grid>
      </div>
    );
  }
}

// Component Properties
StyleSurvey.propTypes = {};

export default connect(null, { register, messageShow, messageHide })(
  withRouter(StyleSurvey)
);
