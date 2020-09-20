import axios from 'axios'
import {serverUrl} from '../url'

export async function getUniversityFunction (param){
    return new Promise(async (resolve)=>{
        const url = `${serverUrl}Hipo/university-domains-list/master/world_universities_and_domains.json`;
        
        axios.get(url).then((res)=>{
            resolve(res)
        })
        .catch((err)=>{
            const error = err.toString();
            param.error = error;
            resolve(param);
        })
    })
}