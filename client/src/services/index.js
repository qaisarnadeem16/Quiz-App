import Axios from 'axios'
import { server } from '../server'



const axios = Axios.create({
    baseURL: server,
    withCredentials: true,
})


export default axios;

