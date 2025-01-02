import { configureStore } from '@reduxjs/toolkit';
import qrReducer from './qrSlice'; // Import your qrSlice

const store = configureStore({
    reducer: {
        qr: qrReducer, // Use your QR slice here
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
