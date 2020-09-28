import React from "react";
import "./App.css";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { keepLogin } from "./1.actions";

import Login from "./components/index/login";
import ScrollTop from "./components/scrollToTop";
import {
  getTokenClient,
  setTokenAuth,
  getProfileUser,
  getTokenAuth,
} from "./components/index/token";
import { Grid } from "@material-ui/core";
import Drawer from "./components/subComponent/Drawer";
import CookiesNotification from "./components/index/cookiesCard";

class App extends React.Component {
  state = { loading: true };

  componentDidMount() {
    this.getAuth();
  }

  componentDidUpdate() {
    if (!getTokenAuth()) {
      this.getAuth();
    }
  }

  getAuth = () => {
    setTokenAuth("authDriver");
    this.setState({ loading: false });
  };

  checkUbahPasswordLink = (path, token) => {
    let flag = false;

    if (path && token) {
      if (
        path.split("/")[1] &&
        path.split("/")[1] === "ubahpassword" &&
        token.split("token=")[1] &&
        token.split("token=")[1].length !== 0
      ) {
        flag = true;
      }
    }
    return flag;
  };

  render() {
    if (this.state.loading) {
      return <p> loading ....</p>;
    }

    return (
      <div>
        <ScrollTop>
          <Grid container>
            <CookiesNotification />

            {getTokenClient() && getProfileUser() ? (
              <Grid item xs={12} sm={12}>
                <Drawer />
              </Grid>
            ) : (
              <Login />
            )}
          </Grid>
        </ScrollTop>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    id: state.user.id,
  };
};

export default withRouter(connect(mapStateToProps, { keepLogin })(App));
