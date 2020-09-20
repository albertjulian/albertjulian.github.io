const INITIAL_STATE = {
    token:'',
    cookie:false,
    name: "",
    password: "",
}

export default (state = INITIAL_STATE, action)=>{
    switch(action.type){
     
        case "LOGIN_SUCCESS":
            return{...INITIAL_STATE,
                name:action.payload.name,
                password:action.payload.password,
            }
        case "RESET_USER":
                return{...INITIAL_STATE}
        default:
            return state 
    }
}