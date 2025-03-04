import { configureStore } from '@reduxjs/toolkit';
import UserReducer from '../redux/UserReducer';


const store = configureStore({
    reducer:{
    
      users:UserReducer
    }
  })

  export default store