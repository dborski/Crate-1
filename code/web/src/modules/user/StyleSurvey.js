// Imports
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Helmet } from "react-helmet";

// UI Imports
import { Grid, GridCell } from "../../ui/grid";
import H3 from "../../ui/typography/H3";
import H4 from "../../ui/typography/H4";
import { white, grey, grey2 } from "../../ui/common/colors";
import Button from '../../ui/button'

// App Imports
import { messageShow, messageHide } from "../common/api/actions";
import { setUserStylePreference } from "./api/actions";
import userRoutes from "../../setup/routes/user";
// Component
class StyleSurvey extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: "",
      isLoading: false,
      styleChoices: {},
      styleMessage: "",
      surveyMessage: "",
      determinedStyle: "",
    };
  }

  onChange = (event) => {
    let styleChoices = this.state.styleChoices;
    styleChoices[event.target.name] = event.target.value;

    this.setState({ styleChoices });
  };

  findRecurringStyles = (array) => {
    let styleCounts = array.reduce((acc, style) => {
      !acc[style] ? (acc[style] = 1) : acc[style]++;

      return acc;
    }, {});

    let sortedObjectByStyleInstances = Object.keys(styleCounts).sort(function (
      a,
      b
    ) {
      return styleCounts[b] - styleCounts[a];
    });

    this.setState({
      determinedStyle: sortedObjectByStyleInstances[0],
    });
    this.setState({
      styleMessage: `${this.props.user.details.name}, your style preference has been set to ${sortedObjectByStyleInstances[0]}! Damn you look good.`,
    });
    return sortedObjectByStyleInstances[0];
  };

  onSubmit = async (event) => {
    event.preventDefault();
    const stylePreferencesList = Object.values(this.state.styleChoices)

    if (stylePreferencesList.length === 5) {
      const style = this.findRecurringStyles(stylePreferencesList);
      await this.props.setUserStylePreference({
        id: this.props.user.details.id,
        stylePreference: style
      });

      const user = this.props.user.details;
      window.localStorage.setItem("user", JSON.stringify(user));
      
      this.setState({
        isLoading: true,
      });
    } else {
      this.setState({surveyMessage: "Please fill out entire survey"})
    }
  };

  changePage = () => {
    this.props.history.push(userRoutes.subscriptions.path)
  }

  makeRadioBtns = () => {
    const categories = ["Tops", "Bottoms", "Shoes", "Accessories", "Dress"];
    return categories.map((category, i) => {
      return (
        <section key={category + "section"}>
          {category}
          <input
            onChange={this.onChange}
            type="radio"
            name={category}
            value="edgy"
            key={i + "edgy" + category}
          />{" "}
          Edgy
          <input
            onChange={this.onChange}
            type="radio"
            name={category}
            value="professional"
            key={i + "professional" + category}
          />{" "}
          Professional
          <input
            onChange={this.onChange}
            type="radio"
            name={category}
            value="casual"
            key={i + "casual" + category}
          />{" "}
          Casual
        </section>
      );
    });
  };

  render() {
    if (this.state.styleMessage === "") {
      return (
        <div>
          <Helmet>
            <title>My Style Survey </title>
          </Helmet>
          {/* Top title bar */}
          <Grid style={{ backgroundColor: grey }}>
            <GridCell style={{ padding: "2em", textAlign: "center" }}>
              <H3 font="secondary">My Style Survey</H3>
              <p style={{ marginTop: '1em', color: grey2 }}>{`${this.props.user.details.name}`}, you don't have a style preference yet.
                <br /> Please fill out this survey to determine your style
                preference.</p>
            </GridCell>
          </Grid>
          <Grid>
            <GridCell style={{textAlign: "center" }}>
              {this.makeRadioBtns()}
              <button onClick={this.onSubmit}>SUBMIT</button>
              {this.state.surveyMessage && <p style={{color:"red"}}>{this.state.surveyMessage}</p>}
            </GridCell>
          </Grid>
        </div>
      );
    } else {
      return (
        <>
          <H3 font="secondary" style={{ textAlign: "center", marginTop: "7em" }}>
          {this.state.styleMessage}
        </H3>
        <div style={{textAlign: "center" }}>
          <Button theme="secondary" onClick={this.changePage}>Subscriptions</Button>
        </div>
        </>
      );
    }
  }
}

function profileState(state) {
  return {
    user: state.user,
  };
}

// Component Properties
StyleSurvey.propTypes = {};

export default connect(profileState, {
  setUserStylePreference,
  messageShow,
  messageHide,
})(withRouter(StyleSurvey));
