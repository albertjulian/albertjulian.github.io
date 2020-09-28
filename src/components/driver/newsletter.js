import React from "react";
import { Redirect } from "react-router-dom";
import { getTokenClient, getTokenAuth, getFavorites } from "../index/token";
import { Grid, Button } from "@material-ui/core";
import TitleBar from "../subComponent/TitleBar";
import GetAppIcon from "@material-ui/icons/GetApp";
import { getDriverFunction } from "./saga";

class NewsletterDriverList extends React.Component {
  _isMounted = false;

  state = {
    allDriverList: [],
    favoriteDriverList: [],
  };

  componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.getListDriver();
    this._isMounted && this.getDataFavoriteFromLocalStorage();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getListDriver = async function () {
    if (!this.state.driverList) {
      const data = await getDriverFunction({});

      if (data) {
        if (!data.error) {
          this.setState({ driverList: data.data });
        } else {
          this._isMounted && this.setState({ errorMessage: data.error });
        }
      }
    }
  };

  getDataFavoriteFromLocalStorage = () => {
    const dataUser = getFavorites();

    if (dataUser) {
      this.setState({ favoriteDriverList: dataUser });
    }
  };

  saveData = (data, fileName) => {
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    const json = JSON.stringify(data);
    const blob = new Blob([json], { type: "octet/stream" });
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  downloadFileJSON = (dataParam) => {
    const dataJson = dataParam,
      fileName = "users.json";

    this.saveData(dataJson, fileName);
  };

  render() {
    if (getTokenClient() && getTokenAuth()) {
      return (
        <div style={{ padding: 0 }}>
          <TitleBar title="Newsletter Driver - List" />
          <Grid container>
            <Grid item xs={3} lg={3}>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<GetAppIcon />}
                onClick={() => this.downloadFileJSON(this.state.allDriverList)}
              >
                Download all driver
              </Button>
            </Grid>
            <Grid item xs={3} lg={3} />
            <Grid item xs={3} lg={3}>
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<GetAppIcon />}
                onClick={() =>
                  this.downloadFileJSON(this.state.favoriteDriverList)
                }
              >
                Download my favorite driver
              </Button>
            </Grid>
          </Grid>
        </div>
      );
    } else if (getTokenAuth()) {
      return <Redirect to="/login" />;
    }
  }
}

export default NewsletterDriverList;
