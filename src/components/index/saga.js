import md5 from 'md5';
import { setProfileUser } from './token'
import { setTokenClient } from './token';

const userList = [
    {
        username: 'admin',
        password: 'fe72d42f72eb2aeeeb50287347bcf66e',
    }
]

export async function postLoginFunction (param) {
    return new Promise(async (resolve)=>{
        try {
            let flag = false;

            for (let i = 0; i < userList.length; i += 1) {
                if (
                    param.username === userList[i].username &&
                    md5(param.password) === userList[i].password
                ) {
                    flag = true;
                    break;
                }
            }

            if (flag) {
                setProfileUser(JSON.stringify(param))
                setTokenClient('xVuniversityVx', new Date().getTime() + (7 * 24 * 3600 *1000))
            } else {
                param.error = 'Username dan Password tidak sesuai'
            }
            

            resolve(param)
        } catch (err){
            const error = err.message && `Error : ${err.message.toString().toUpperCase()}`
            param.error = error;
            resolve(param);
        }
    })
    
}


