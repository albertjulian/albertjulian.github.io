import axios from 'axios'
import {serverUrl} from '../url'
import { getTokenClient } from '../index/token'

export async function getUniversityFunction (param, next){
    return new Promise(async (resolve)=>{
        const url = `${serverUrl}Hipo/university-domains-list/master/world_universities_and_domains.json`;
        
        axios.get(url).then((res)=>{
            resolve(res)
        })
        .catch((err)=>{
            const error = err.response && err.response.data && err.response.data.message && `Error : ${err.response.data.message.toString().toUpperCase()}`
            param.error = error;
            resolve(param);
        })
    })
}

export async function getProfileNasabahDetailFunction (param,next){
    return new Promise(async (resolve)=>{
        const config = {
            headers: {'Authorization': "Bearer " + getTokenClient()}
          };
          axios.get(serverUrl+`lender/borrower_list/${param.id}/detail`,config)
          .then((res)=>{
              param.detailProfileNasabah = res.data
              param.configUrl = res.data.config.url
              if(next){
                  resolve(next(param))
              }else{
                  resolve(param)
              }
          })
          .catch((err)=>{
            const error = err.response && err.response.data && err.response.data.message && `Error : ${err.response.data.message.toString().toUpperCase()}`
            param.error = error;
            resolve(param);
        })
    })
}

export async function deleteProfileNasabahFunction (param,next){
    return new Promise(async (resolve)=>{
        const config = {
            headers: {'Authorization': "Bearer " + getTokenClient()}
          };
          axios.patch(serverUrl+`lender/borrower_list/${param.id}/detail/${param.status}`,config)
          .then((res)=>{
              param.detailProfileNasabah = res.data;
              param.configUrl = res.data.config.url
              if(next){
                  resolve(next(param))
              }else{
                  resolve(param)
              }
          })
          .catch((err)=>{
            const error = err.response && err.response.data && err.response.data.message && `Error : ${err.response.data.message.toString().toUpperCase()}`
            param.error = error;
            resolve(param);
        })
    })
}