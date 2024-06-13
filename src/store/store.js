import { configureStore } from '@reduxjs/toolkit';
import { uiSlice } from './ui';
import { calendarSlice } from './calendar';



export const store = configureStore({
    reducer: {
        calendar: calendarSlice.reducer,
        ui: uiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})