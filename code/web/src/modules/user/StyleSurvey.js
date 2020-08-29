// Imports
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Helmet } from "react-helmet";

// UI Imports
import { Grid, GridCell } from "../../ui/grid";
import H3 from "../../ui/typography/H3";
import { white, grey, grey2, black } from "../../ui/common/colors";
import Button from '../../ui/button'
import Card from '../../ui/card'

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
      styleMessage: `${this.props.user.details.name},you selected ${sortedObjectByStyleInstances[0]}!`,
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

  makeImagesElems = (category, styleKey) => {

    return (
      <label htmlFor={styleKey + category}> 
        <div style={{ display: 'flex', justifyContent: 'center'}} key={category + styleKey + 'images'} >
          <Card style={{ width: '12em', height: '15em', margin: '1em', marginRight: '0em',backgroundColor: white}}>
            <img style={{ width: '12em', height: '15em'}} src={`http://localhost:8000/images/stock/${category}-${styleKey}-mens.jpg`} alt={"name"} />
          </Card>
          <Card style={{ width: '12em', height: '15em', margin: '1em', marginLeft: '0em', backgroundColor: white}}>
            <img style={{ width: '12em', height: '15em'}} src={`http://localhost:8000/images/stock/${category}-${styleKey}-womens.jpg`} alt={"name"} />
          </Card>
        </div>
      </label>
    )
  }

  makeCards = () => {
    const categories = ["Tops", "Bottoms", "Shoes", "Accessories", "Dress"];
    const styleKeys = ["edgy", "professional", "casual"]
    const allCards = categories.map((category, i) => {
      const rowOfCards = styleKeys.map(styleKey => 
        <GridCell style={{ textAlign: "center", marginBottom: "2em", backgroundColor: this.state.styleChoices[category] === styleKey ? grey2 : white }} key={styleKey + "row" + i}>
          {this.makeImagesElems(category, styleKey)}
          <input
            onChange={this.onChange}
            type="radio"
            name={category}
            value={styleKey}
            key={styleKey+category}
            id={styleKey + category}
            style={{ textAlign: "center" }}
          />
        </GridCell>);
      return (
      <div style={{ display: 'flex'}} key={category + "allCards"}> 
        <GridCell style={{ width: '5em'}}>
          <H3 font="secondary">{category}</H3>
        </GridCell>
        {rowOfCards}
      </div>
      )
    })
    return (
      <section> 
        {allCards}
      </section>
    );
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
              <p style={{ marginTop: '1em', color: grey2 }}>{`${this.props.user.details.name}`}, 
              please select one set of photos from each category which best represents your style
              preference.</p>
            </GridCell>
          </Grid>
          <Grid>
            <GridCell style={{textAlign: "center" }}>
              {this.makeCards()}
              {this.state.surveyMessage && <p style={{color:"red"}}>{this.state.surveyMessage}</p>}
              <Button 
              theme="secondary" 
              onClick={this.onSubmit}
              style={{ margin: '3em', height: '3em', width: '30em'}}
              >SUBMIT</Button>
            </GridCell>
          </Grid>
        </div>
      );
    } else {
      window.scrollTo(0, 0)

      const determinedImages = ["Tops", "Bottoms", "Shoes"].map(category => {
        return this.makeImagesElems(category, this.state.determinedStyle)
      })
      

      return (
        <>
        <H3 font="secondary" style={{ textAlign: "center", marginTop: "1em" }}>
          {this.state.styleMessage}
        </H3>
        <Grid style={{ display: "flex", justifyContent: "center" }}>
          {determinedImages}
        </Grid>
        <div style={{ textAlign: "center", display: "flex", justifyContent: "center" }}>
          <Button
            style={{ margin: '2em', height: '3em' }}
            theme="secondary"
            onClick={this.changePage}>
            Subscriptions</Button>
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
