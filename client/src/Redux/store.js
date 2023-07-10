import {configureStore} from '@reduxjs/toolkit'
import { userReducer } from './Reducer/user'



const Store= configureStore({
    reducer:{
        user: userReducer
    }
})

export default Store