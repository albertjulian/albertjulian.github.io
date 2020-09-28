import React from "react";
import { Redirect } from "react-router-dom";
import { getDriverFunction } from "./saga";
import {
  getTokenClient,
  getTokenAuth,
  getFavorites,
  setFavorites,
} from "../index/token";
import SearchBar from "../subComponent/SearchBar";
import { TablePagination, Grid } from "@material-ui/core";
import CardList from "../subComponent/CardList";
import TitleBar from "../subComponent/TitleBar";

class DriverList extends React.Component {
  _isMounted = false;

  state = {
    driverList: null,
    favoriteDriverList: [],
    profileUser: {},
    searchRows: "",
    page: 0,
    rowsPerPage: 5,
  };

  componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.getListDriver();
    this._isMounted && this.getDataFavoriteFromLocalStorage();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  //Ambil data
  getListDriver = async function () {
    if (!this.state.driverList) {
      const data = await getDriverFunction({});

      if (data) {
        if (!data.error) {
          this.setState({ driverList: data.data && data.data.results });
        } else {
          this._isMounted && this.setState({ errorMessage: data.error });
        }
      }
    }
  };

  getDataFavoriteFromLocalStorage = () => {
    const dataUser = getFavorites() || [];

    for (let i = 0; i < dataUser.length; i += 1)
      if (dataUser) {
        this.setState({ favoriteDriverList: dataUser });
      }
  };

  handleChangeSearch = (e) => {
    this.setState({ searchRows: e.target.value });
  };

  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage });
  };

  handleFavorite = (e, driverChoosen, action) => {
    e.stopPropagation();

    let newArray = [];

    if (action === "add") {
      newArray = this.state.favoriteDriverList;
      newArray.push(driverChoosen);
    } else {
      newArray =
        this.state.favoriteDriverList &&
        this.state.favoriteDriverList.filter(function (driver) {
          return (
            driver.name &&
            driver.name.first &&
            driverChoosen.name &&
            driverChoosen.name.first &&
            `${driver.name.first} ${driver.name.last}` !==
              `${driverChoosen.name.first} ${driverChoosen.name.last}`
          );
        });
    }

    setFavorites(newArray);
    this.setState({ favoriteDriverList: newArray });
  };

  searchDriverName = (listDriver, search) => {
    const newList =
      listDriver &&
      listDriver.filter(function (driver) {
        return (
          driver.name &&
          (driver.name.first.toLowerCase().includes(search.toLowerCase()) ||
            driver.name.last.toLowerCase().includes(search.toLowerCase()) ||
            `${driver.name.first.toLowerCase()} ${driver.name.last.toLowerCase()}`.includes(
              search.toLowerCase()
            ))
        );
      });

    return newList || [];
  };

  render() {
    if (getTokenClient() && getTokenAuth()) {
      return (
        <div style={{ padding: 0 }}>
          <TitleBar title="Driver Management" />

          <SearchBar
            id="search"
            value={this.state.searchRows}
            placeholder={"Search Driver Name"}
            onChange={this.handleChangeSearch}
            float={"right"}
          />

          <Grid container>
            {this.state.driverList &&
              this.searchDriverName(
                this.state.driverList,
                this.state.searchRows
              )
                .slice(
                  this.state.page * this.state.rowsPerPage,
                  this.state.page * this.state.rowsPerPage +
                    this.state.rowsPerPage
                )
                .map((driver, index) => (
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    lg={4}
                    key={index}
                    style={{ padding: 10 }}
                  >
                    <CardList
                      data={driver}
                      favorite={this.state.favoriteDriverList}
                      handleFavorite={this.handleFavorite}
                    />
                  </Grid>
                ))}
          </Grid>

          <TablePagination
            component="div"
            count={
              this.searchDriverName(
                this.state.driverList,
                this.state.searchRows
              ).length
            }
            rowsPerPage={this.state.rowsPerPage}
            page={this.state.page}
            onChangePage={this.handleChangePage}
            rowsPerPageOptions={[]}
            labelDisplayedRows={({ from, to, count }) =>
              `Rows: ${from}-${to} of ${
                count !== -1 ? count : `more than ${to}`
              }`
            }
          />
        </div>
      );
    } else if (getTokenAuth()) {
      return <Redirect to="/login" />;
    }
  }
}

export default DriverList;
