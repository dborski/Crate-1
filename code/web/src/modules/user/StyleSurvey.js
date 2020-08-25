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
import Icon from "../../ui/icon";
import { level1 } from "../../ui/common/shadows";
import { white } from "../../ui/common/colors";

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
      user: {
        name: "",
        email: "",
        password: "",
      },
    };
  }

  onChange = (event) => {
    let user = this.state.user;
    user[event.target.name] = event.target.value;

    this.setState({
      user,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();

    this.setState({
      isLoading: true,
    });

    // this.props.messageShow("Signing you up, please wait...");

    // this.props
    //   .register(this.state.user)
    //   .then((response) => {
    //     this.setState({
    //       isLoading: false,
    //     });

    //     if (response.data.errors && response.data.errors.length > 0) {
    //       this.props.messageShow(response.data.errors[0].message);
    //     } else {
    //       this.props.messageShow("Signed up successfully.");

    //       this.props.history.push(userRoutes.login.path);
    //     }
    //   })
    //   .catch((error) => {
    //     this.props.messageShow(
    //       "There was some error signing you up. Please try again."
    //     );

    //     this.setState({
    //       isLoading: false,
    //       error: "Error signing up.",
    //     });
    //   })
    //   .then(() => {
    //     window.setTimeout(() => {
    //       this.props.messageHide();
    //     }, 5000);
    //   });
  };

  render() {
    return <title>Testing</title>;
  }
}

// Component Properties
StyleSurvey.propTypes = {};

export default connect(null, { register, messageShow, messageHide })(
  withRouter(StyleSurvey)
);
