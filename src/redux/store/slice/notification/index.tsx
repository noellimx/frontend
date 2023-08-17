import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";



export type NotificationDetail = {
    uuid: string
    text: string
    type: "Error" | "Info"
}

export type InitialStateNotifications = {
    items: NotificationDetail[]
}

const initialState: InitialStateNotifications = {
    items: []
}
const slice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        show: (state, action: PayloadAction<NotificationDetail>) => {
            state.items.push(action.payload)
        },
        hide: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(({ uuid }) => uuid !== action.payload);
        },
    },
});


export const notify = createAsyncThunk("notification/notify", async (detail: Omit<NotificationDetail, "uuid">, thunkAPI) => {
    const uuid = thunkAPI.requestId;

    thunkAPI.dispatch(slice.actions.show({ uuid: uuid, text: detail.text, type: detail.type }))

    setTimeout(() => {
        thunkAPI.dispatch(slice.actions.hide(uuid))
    }, 3000)
})

export default slice;
