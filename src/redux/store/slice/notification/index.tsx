import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";



export type NotificationDetail = {
    uuid: string
    text: string
    ms: number
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


const fallbackNotificationDurationMS = 3000

export const notify = createAsyncThunk("notification/notify", async (detail: Omit<NotificationDetail, "uuid">, thunkAPI) => {
    const uuid = thunkAPI.requestId;

    thunkAPI.dispatch(slice.actions.show({ uuid: uuid, text: detail.text, type: detail.type, ms: detail.ms }))

    setTimeout(() => {
        thunkAPI.dispatch(slice.actions.hide(uuid))
    }, detail.ms || fallbackNotificationDurationMS)
})

export default slice;
