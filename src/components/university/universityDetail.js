import React from 'react';
import { Redirect } from 'react-router-dom'
import {getUniversityFunction} from './saga'
import { getTokenClient,getTokenAuth } from '../index/token'
import { Grid, Typography, Button } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import TitleBar from '../subComponent/TitleBar';

class UniversityDetail extends React.Component {
  _isMounted = false

  state = {
    universityList: null,
    btnBack: false,
  };

  componentDidMount(){
    this._isMounted=true
    this._isMounted && this.getUniversityDetail()
  }

  componentWillUnmount(){
    this._isMounted=false
  }
  
  //Ambil data
  getUniversityDetail = async function(){
    const domain =  this.props.match.params.id

    if(!this.state.universityList) {
      const data = await getUniversityFunction({});

      if(data){
        if(!data.error){
            const newData = data.data || [];

            this.setState( { universityList: this.searchDetail(newData, domain) })
        }else{
            this._isMounted && this.setState({errorMessage:data.error})
        }
      }     
    }
  }

  handleChangeSearch = (e)=>{
    this.setState({searchRows: e.target.value});
  }
  
  handleChangePage = (event, newPage) => {
    this.setState({page: newPage});
  };

  searchDetail = (listUniversity, search) => {
    const newList = listUniversity && listUniversity.filter(function (university) {
      return university.domains && university.domains[0].toLowerCase() === search.toLowerCase();
    });

    return newList[0] || {};
  }

  backToList = () => {
    this.setState({ btnBack: true })
  }
  
  render() {
    if(this.state.btnBack) {
        return  <Redirect to='/universityList' />
    }
    if(getTokenClient() && getTokenAuth()){
      return (
        <div style={{padding:0}}>
            <TitleBar 
                title="University - Detail"
            />

            <Grid container style={{ marginTop: 20, paddingLeft: 20 }}>
                <Button
                    variant="text"
                    color="primary"
                    startIcon={
                        <ArrowBackIcon />
                    }
                    onClick={() => this.backToList()}
                >
                    BACK
                </Button>
            </Grid>

            {
                this.state.universityList &&
                <Grid container style={{ marginTop: 20, padding: 20 }}>
                    <Grid item xs={3} lg={3}>
                        <Typography variant="h6" style={{ fontWeight: 600 }}> University Name </Typography>
                    </Grid>
                    <Grid item xs={9} lg={9}>
                        <Typography variant="body1"> { this.state.universityList.name } </Typography>
                    </Grid>
                    <Grid item xs={3} lg={3}>
                        <Typography variant="h6" style={{ fontWeight: 600 }}> Country </Typography>
                    </Grid>
                    <Grid item xs={9} lg={9}>
                        <Typography variant="body1"> { this.state.universityList.country } </Typography>
                    </Grid>
                    <Grid item xs={3} lg={3}>
                        <Typography variant="h6" style={{ fontWeight: 600 }}> Country Code </Typography>
                    </Grid>
                    <Grid item xs={9} lg={9}>
                        <Typography variant="body1"> { this.state.universityList.alpha_two_code } </Typography>
                    </Grid>
                    <Grid item xs={3} lg={3}>
                        <Typography variant="h6" style={{ fontWeight: 600 }}> Domain </Typography>
                    </Grid>
                    <Grid item xs={9} lg={9}>
                        <Typography variant="body1"> { this.state.universityList.domains[0] } </Typography>
                    </Grid>
                    <Grid item xs={3} lg={3}>
                        <Typography variant="h6" style={{ fontWeight: 600 }}> Website </Typography>
                    </Grid>
                    <Grid item xs={9} lg={9}>
                        <Typography variant="body1"> { this.state.universityList.web_pages[0] } </Typography>
                    </Grid>
                </Grid>
            }

          {/* <SearchBar
            id="search"
            value={this.state.searchRows}
            placeholder={'Search University Name'}
            onChange={this.handleChangeSearch} 
            float={'right'}
          />

          <Grid container>
            {
              this.state.universityList &&
              this.searchUniversityName(this.state.universityList, this.state.searchRows)
              .slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
              .map((university, index) => 
                <Grid item xs={12} sm={4} lg={4} key={index} style={{ padding: 9 }}>
                  <CardList
                    data={university}
                  />
                </Grid>
              )
            }
          </Grid>

          <TablePagination
            component="div"
            count={this.searchUniversityName(this.state.universityList, this.state.searchRows).length}
            rowsPerPage={this.state.rowsPerPage}
            page={this.state.page}
            onChangePage={this.handleChangePage}
            rowsPerPageOptions={[]}
            labelDisplayedRows={
              ({ from, to, count }) => `Rows: ${from}-${to} of ${count !== -1 ? count : `more than ${to}`}`
            }
          />
         */}
        </div>
      );
    }
    else if(getTokenAuth()){
      return  <Redirect to='/login' />
    }
  }
}

export default UniversityDetail ;