import React from 'react';
import {connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {getUniversityFunction} from './saga'
import { getTokenClient,getTokenAuth } from '../index/token'
import SearchBar from '../subComponent/SearchBar';
import { TablePagination, Grid } from '@material-ui/core';
import CardList from '../subComponent/CardList';
import TitleBar from '../subComponent/TitleBar';

class profileNasabah extends React.Component {
  _isMounted = false

  state = {
    universityList: null,
    universityListPerPage: null,
    searchRows:'',
    page: 0,
    rowsPerPage: 12,
    total_data: 0,
  };

  componentDidMount(){
    this._isMounted=true
    this._isMounted && this.getListUniversity()
  }

  componentWillUnmount(){
    this._isMounted=false
  }
  
  //Ambil data
  getListUniversity = async function(){
    if(!this.state.universityList) {
      const data = await getUniversityFunction();

      if(data){
        if(!data.error){
          this.setState( { universityList: data.data, total_data: (data.data && data.data.length) || 0 })
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
  
  render() {
    if(getTokenClient() && getTokenAuth()){
      return (
        <div style={{padding:0}}>
          <TitleBar 
            title="University - List"
          />

          <SearchBar
            id="search"
            value={this.state.searchRows}
            placeholder={'Search University Name'}
            onChange={this.handleChangeSearch} 
            float={'right'}
          />

          <Grid container>
            {
              this.state.universityList &&
              this.state.universityList
              .slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
              .map((university, index) => 
                <Grid item xs={12} sm={4} lg={4} key={index} style={{ padding: 10 }}>
                  <CardList
                    data={university}
                  />
                </Grid>
              )
            }
          </Grid>

          <TablePagination
            component="div"
            count={this.state.total_data}
            rowsPerPage={this.state.rowsPerPage}
            page={this.state.page}
            onChangePage={this.handleChangePage}
            rowsPerPageOptions={[]}
            labelDisplayedRows={
              ({ from, to, count }) => `Rows: ${from}-${to} of ${count !== -1 ? count : `more than ${to}`}`
            }
          />
        
        </div>
      );
    }
    else if(getTokenAuth()){
      return  <Redirect to='/login' />
    }
  }
}

const mapStateToProp = (state)=>{
  return{     
      id: state.user.id
  }
}
export default connect (mapStateToProp)(profileNasabah) ;