import React from 'react';
import { Redirect } from 'react-router-dom'
import { getTokenClient,getTokenAuth, getFavorites } from '../index/token'
import SearchBar from '../subComponent/SearchBar';
import { TablePagination, Grid } from '@material-ui/core';
import CardList from '../subComponent/CardList';
import TitleBar from '../subComponent/TitleBar';

class FavoriteUniversityList extends React.Component {
    _isMounted = false

    state = {
        favoriteUniversityList: [],
        searchRows:'',
        page: 0,
        rowsPerPage: 12,
    };

    componentDidMount(){
        this._isMounted=true;
        this._isMounted && this.getDataFavoriteFromLocalStorage();
    }

    componentWillUnmount(){
        this._isMounted=false
    }

    getDataFavoriteFromLocalStorage = () => {
        const dataUser = getFavorites();

        if(dataUser) {
            this.setState( { favoriteUniversityList: dataUser} )
        }
    }

    handleChangeSearch = (e)=>{
        this.setState({searchRows: e.target.value});
    }
    
    handleChangePage = (event, newPage) => {
        this.setState({page: newPage});
    };

    searchUniversityName = (listUniversity, search) => {
        const newList = listUniversity && listUniversity.filter(function (university) {
        return university.name.toLowerCase().includes(search.toLowerCase())
        });
    
        return newList || [];
    }
  
    render() {

        if(getTokenClient() && getTokenAuth()){
            return (
                <div style={{padding:0}}>
                <TitleBar 
                    title="Favorite University - List"
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
                        this.state.favoriteUniversityList &&
                        this.searchUniversityName(this.state.favoriteUniversityList, this.state.searchRows)
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
                    count={this.searchUniversityName(this.state.favoriteUniversityList, this.state.searchRows).length}
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

export default (FavoriteUniversityList) ;