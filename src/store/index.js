import { configureStore } from '@reduxjs/toolkit'
import reducerUsers from './reducers/reducerUsers'

export default configureStore({
    reducer: {
        users: reducerUsers
    },
})