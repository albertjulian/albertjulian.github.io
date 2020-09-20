import React from 'react'
import './../../support/css/profilenasabahdetail.css'
import Loading from '../subComponent/Loading';
import { Redirect } from 'react-router-dom'
import {connect} from 'react-redux'
import { getProfileNasabahDetailFunction, deleteProfileNasabahFunction } from './saga';
import { getProfileUser,getTokenClient,getTokenAuth } from '../index/token'
import TitleBar from '../subComponent/TitleBar';
import { Grid } from '@material-ui/core';
import swal from 'sweetalert';

class profileNasabahDetail extends React.Component{
    _isMounted = false
    state={
        bankName:'',
        title:'',
        message:'',
        diKlik:false,
        rows:[],
        modalKTP:false,
        modalNPWP:false,
        npwp:null,
        ktp:null,
        gambarKTP:null,
        gambarNPWP:null,
        loading: true,
    }
    
    componentDidMount(){
        this._isMounted=true
        this._isMounted && this.getDataDetail()  
        if(getProfileUser()) {
            const bank = JSON.parse(getProfileUser()) ;
            this._isMounted && this.setState({bankName: bank.name})
        }
        console.log('hit')
    }
    componentWillUnmount(){
        this._isMounted=false
    }

    getDataDetail = async function (){
         const param = {id:this.props.match.params.id}
         const data = await getProfileNasabahDetailFunction(param)
         
         if(data){
             if(!data.error){   
                let flag = false

                this._isMounted && this.setState({rows:data.detailProfileNasabah,diKlik:flag, loading:false})

             }else{
                this._isMounted && this.setState({errorMessage:data.error, loading:false})
             }
         }  
    }

    handleDialog = (e) => {
        let label = e.target.value
        let title = '';
        let message='';
  
        if(label.toLowerCase().includes('ktp')) {
          title = 'KTP'
          message = this.state.rows && this.state.rows.idcard_image
  
        } else if(label.toLowerCase().includes('npwp')) {
          title = 'NPWP'
          message = this.state.rows && this.state.rows.taxid_image
  
        }
        else if(label.toLowerCase().includes('nasabah')) {
          title = 'Foto Nasabah'
          message = this.state.rows && this.state.rows.image_profile
        }
  
        this.setState({
          dialog: true,
          message,
          title,
        })
    }

    handleClose = () => {
        this.setState({dialog: false})
    }

    btnCancel = ()=>{
        this.setState({diKlik:true})
    }

    permissionApprove = () => {
        if(this.state.rows && this.state.rows.status && this.state.rows.status === 'deleted') {
            return true;
        }
        return false;
    }

    btnApproveReject = async function(e, status) {
        this.setState({loading: true});
        let param = {
            id:this.props.match.params.id,
            status 
        };
        const response = await deleteProfileNasabahFunction(param);

        if(response && !response.error) {
            swal("Success",`Data Nasabah dengan id ${this.props.match.params.id} Berhasil Dihapus`,"success")
            this.setState({diKlik: true, loading: false})
        } else {
            this._isMounted && this.setState({errorMessage:response.error, loading:false})
        }
    }
  
    render(){
        if(this.state.diKlik){
            if(this.permissionApprove()) {
                return(
                    <Redirect to='/profileDeleteNasabah'/>
                )
            }
            return(
                <Redirect to='/profileNasabah'/>
            )
        } else if (this.state.loading){
            return(
                <Loading
                  title={'Nasabah - Detail'}
                />
            )
        }else if(getTokenAuth() && getTokenClient()){
            return(
                <Grid container className="containerDetail">
                    <Grid item sm={12} xs={12} style={{maxHeight:50}}>
                        <TitleBar
                            title={'University - Detail'}
                        />

                    </Grid>
    
                    <Grid
                        item
                        sm={12} xs={12}
                        style={{padding:10, marginBottom:20, boxShadow:'0px -3px 25px rgba(99,167,181,0.24)', WebkitBoxShadow:'0px -3px 25px rgba(99,167,181,0.24)', borderRadius:'15px'}}                  
                    >
                        <Grid container>
                            <Grid item sm={12} xs={12} style={{color:'red'}}>
                                {this.state.errorMessage}
                            </Grid>

                            <Grid item sm={12} xs={12} style={{marginBottom:"10px"}}>
                                <Grid container spacing={2}>
                                    <Grid item sm={2} xs={12} style={{marginBottom:'10px'}}>
                                        <input className='buttonCustomUniversity' type="button" style={{width:"100%"}} value="Foto KTP" onClick={this.handleDialog}></input>                               
                                    </Grid>
                                    <Grid item sm={2} xs={12} style={{marginBottom:'10px'}}>
                                        <input className='buttonCustomUniversity' type="button" style={{width:"100%"}} value="Foto NPWP" onClick={this.handleDialog}></input>
                                    </Grid>
                                    <Grid item sm={2} xs={12} >
                                        <input className='buttonCustomUniversity' type="button" style={{width:"100%"}} value="Foto Nasabah" onClick={this.handleDialog}></input>
                                    </Grid>
                                   
                                </Grid> 
                                              
                            </Grid>

                        </Grid>
                        
                    </Grid>                                      
                    
                </Grid>
            )
        
        } else if(getTokenAuth()){
            return (
                <Redirect to='/login' />
            )    
        }
        
    }
}
const mapStateToProp = (state)=>{
    return{
        name:state.user.name
        
    }
    
}
export default connect(mapStateToProp) (profileNasabahDetail);