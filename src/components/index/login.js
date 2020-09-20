import React from 'react'
import './../../support/css/login.css'
import Loader from 'react-loader-spinner'
import swal from 'sweetalert'
import {Redirect} from 'react-router-dom'
import { postLoginFunction } from './saga'
import { Grid, Button, TextField } from '@material-ui/core';

 
class Login extends React.Component{
    _isMounted = false;

    state={
        loading:false, 
        isLogin:false,
        username: '',
        password: '',
        error:''
    }

    componentDidMount(){
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;     
    }
  
    //LOGIN BUTTON
    btnLogin = ()=>{
        this.setState({loading:true})

        var username=this.state.username
        var password=this.state.password

        const param = {
            username,
            password
        }

        if (username==="" || password===""){
            swal("Error","Username dan Password Kosong","error")
            this.setState({loading:false})

        } else{
            this.postLogin(param)
        }
      
    } 
    
    postLogin = async function (param) {
        const data = await postLoginFunction(param)

        if(data) {
            if(!data.error) {  
                this.setState({loading:false , isLogin : true})
            } else {
                console.log(data)
                this.setState({loading:false})
                swal("Gagal Login","Cek ulang Username dan Password","info")
            }
        }
    }

    handleChangeTextField = (e) => {
        const label = e.target.id;

        this.setState({
            [label] : e.target.value,
        })
    }

    handleEnter =(e)=> {
        if (e.charCode === 13) {
            e.preventDefault();
            e.stopPropagation();
            this.btnLogin();
        }
    }

    render(){
        if(this.state.isLogin){
            return(
                <Redirect to='/' />
            )
        }
       

        return (
            <Grid container style={{ display:'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Grid item xs={4} sm={4}>
                    <Grid container className='loginContainer'>
                        <Grid item xs={12} sm={12} style={{textAlign:'center'}}>
                            <img src={require('./../../icons/university.png')} alt='' style={{width:'40%'}} />
                        </Grid>
                        <Grid item xs={12} sm={12}  className='loginBox'>
                            <Grid container>
                                <Grid item xs={12} sm={12} style={{marginTop:20}}>
                                    <h5>University Dashboard</h5> 
                                </Grid>
                                <Grid item xs={12} sm={12} style={{marginTop:20}}>
                                    <TextField
                                        id={'username'}
                                        size="small"
                                        margin="dense"
                                        variant='outlined'
                                        style={{width:"70%"}}
                                        label={'Username'}
                                        onKeyPress={this.handleEnter}
                                        value={this.state.username}
                                        onChange={this.handleChangeTextField}
                                    /> 
                                </Grid>
                                <Grid item xs={12} sm={12} style={{marginTop:10}}>
                                    <TextField
                                        id={'password'}
                                        type='password'
                                        size="small"
                                        margin="dense"
                                        variant='outlined'
                                        style={{width:"70%"}}
                                        label={'Password'}
                                        onKeyPress={this.handleEnter}
                                        value={this.state.password}
                                        onChange={this.handleChangeTextField}
                                    />  
                                    
                                </Grid>

                                <Grid item xs={12} sm={12} style={{marginTop:20, marginBottom: 20}}>
                                    {
                                        this.state.loading && 
                                        <Loader 
                                            type="Circles"
                                            color="#00BFFF"
                                            height="50"	
                                            width="50"
                                        />   
                                        
                                    }
                                    {
                                        !this.state.loading && 
                                        <Button disableElevation
                                            variant='contained'
                                            style={{backgroundColor: '#20B889', width:'70%', color:'white'}}
                                            onClick={this.btnLogin}
                                        >
                                            <b>Masuk</b>
                                        </Button>
                                    }
                                    
                                </Grid>
                            </Grid>
                            
                        </Grid>
                    </Grid>
                    
                </Grid>
            </Grid>
            
        )

    }
      
       
    
}

export default (Login);
