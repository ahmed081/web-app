import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface QRState {
    linkedData: string | null;
}

const initialState: QRState = {
    linkedData: null,
};

const qrSlice = createSlice({
    name: 'qr',
    initialState,
    reducers: {
        setLinkedData(state, action: PayloadAction<string>) {
            state.linkedData = action.payload;
        },
    },
});

export const { setLinkedData } = qrSlice.actions;

export default qrSlice.reducer;
