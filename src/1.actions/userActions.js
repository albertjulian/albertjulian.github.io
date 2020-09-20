import { getProfileUser } from '../components/index/token'

export const keepLogin = ()=>{
  return (dispatch)=>{
    dispatch({
      type:'LOGIN_SUCCESS',
      payload : getProfileUser(),
    });
  }
}


export const resetUser = ()=>{
  return {
    type: 'RESET_USER'
  }
}