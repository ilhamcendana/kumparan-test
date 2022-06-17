import { configureStore } from '@reduxjs/toolkit'
import reducerUsers from './reducers/reducerUsers'

export default configureStore({
    reducer: {
        users: reducerUsers
    },
})

// NO USE OF REDUX BUT AT LEAST I CAN SHOW YOU HOW I SET IT UP