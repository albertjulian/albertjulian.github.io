import React from "react";
import { Redirect } from "react-router-dom";
import { getDriverFunction } from "./saga";
import { getTokenClient, getTokenAuth } from "../index/token";
import { Grid, Typography, Button } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import TitleBar from "../subComponent/TitleBar";

class DriverDetail extends React.Component {
  _isMounted = false;

  state = {
    driverList: null,
    btnBack: false,
  };

  componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.getDriverDetail();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  //Ambil data
  getDriverDetail = async function () {
    const id = this.props.match.params.id;

    if (!this.state.driverList) {
      const data = await getDriverFunction({});

      if (data) {
        if (!data.error) {
          const newData = (data.data && data.data.results) || [];

          this.setState({ driverList: this.searchDetail(newData, id) });
        } else {
          this._isMounted && this.setState({ errorMessage: data.error });
        }
      }
    }
  };

  handleChangeSearch = (e) => {
    this.setState({ searchRows: e.target.value });
  };

  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage });
  };

  searchDetail = (listDriver, id) => {
    const newList =
      listDriver &&
      listDriver.filter(function (driver) {
        return (
          driver.email.toString().toLowerCase() === id.toString().toLowerCase()
        );
      });
    return newList[0] || {};
  };

  backToList = () => {
    this.setState({ btnBack: true });
  };

  render() {
    if (this.state.btnBack) {
      return <Redirect to="/driverList" />;
    }
    if (getTokenClient() && getTokenAuth()) {
      return (
        <div style={{ padding: 0 }}>
          <TitleBar title="Driver - Detail" />

          <Grid container style={{ marginTop: 20, paddingLeft: 20 }}>
            <Button
              variant="text"
              color="primary"
              startIcon={<ArrowBackIcon />}
              onClick={() => this.backToList()}
            >
              BACK
            </Button>
          </Grid>

          {this.state.driverList && (
            <Grid container style={{ marginTop: 20, padding: 20 }}>
              <Grid item xs={3} lg={3}>
                <Typography variant="h6" style={{ fontWeight: 600 }}>
                  Driver ID
                </Typography>
              </Grid>
              <Grid item xs={9} lg={9}>
                <Typography variant="body1">
                  {this.state.driverList.id &&
                    this.state.driverList.id.name &&
                    this.state.driverList.id.value &&
                    `${this.state.driverList.id.name}-${this.state.driverList.id.value}`}
                </Typography>
              </Grid>
              <Grid item xs={3} lg={3}>
                <Typography variant="h6" style={{ fontWeight: 600 }}>
                  Driver Name
                </Typography>
              </Grid>
              <Grid item xs={9} lg={9}>
                <Typography variant="body1">
                  {this.state.driverList.name &&
                    `${this.state.driverList.name.title}. ${this.state.driverList.name.first} ${this.state.driverList.name.last}`}
                </Typography>
              </Grid>
              <Grid item xs={3} lg={3}>
                <Typography variant="h6" style={{ fontWeight: 600 }}>
                  Gender
                </Typography>
              </Grid>
              <Grid item xs={9} lg={9}>
                <Typography variant="body1">
                  {this.state.driverList.gender}
                </Typography>
              </Grid>
              <Grid item xs={3} lg={3}>
                <Typography variant="h6" style={{ fontWeight: 600 }}>
                  Country Code
                </Typography>
              </Grid>
              <Grid item xs={9} lg={9}>
                <Typography variant="body1">
                  {this.state.driverList.nat}
                </Typography>
              </Grid>
              <Grid item xs={3} lg={3}>
                <Typography variant="h6" style={{ fontWeight: 600 }}>
                  Email
                </Typography>
              </Grid>
              <Grid item xs={9} lg={9}>
                <Typography variant="body1">
                  {this.state.driverList.email}
                </Typography>
              </Grid>
            </Grid>
          )}
        </div>
      );
    } else if (getTokenAuth()) {
      return <Redirect to="/login" />;
    }
  }
}

export default DriverDetail;
