import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit";
import { RootState } from "../..";
import axios from "axios";
import { Endpoints } from "../../../../types/endpoints";
import { globalConfig } from "../../../../initConfig";



const sliceName = "dashboard-all"

// type VideoDetail = {
//     channel: {
//         name: string
//         id: string
//     }
//     videoId: string;
//     timestamp: string;
// };

// export type FoodEstablishmentCard = {
//     business: {
//         name: string;
//         sfaLicenseNo: string;
//         location: {
//             postalCode: string
//         }
//     }
//     videos: VideoDetail[];
// };

export type FoodEstablishmentCard = {
    sfaLicenseNo: string;
    videos: VideoDetail[];
    postalCode: string;
};
type VideoDetail = {
    videoId: string;
    timestamp: string;
};

type State = {
    items: FoodEstablishmentCard[];
};

const initialState: State = {
    items: [],
};

const slice = createSlice({
    name: sliceName,
    initialState,
    reducers: {}, extraReducers: (builders) => {

        builders.addCase(getDashboardAll.fulfilled, (state, action) => {

            console.log(`getDashboardAll.fulfilled ${JSON.stringify(action)}`)
            state.items = action.payload;
        })
    }
});

export const getDashboardAll = createAsyncThunk<FoodEstablishmentCard[], void, { state: RootState }
>(
    `${sliceName}/all`,
    async (_, thunkAPI) => {

        const state = thunkAPI.getState();


        const token = state.auth.token;
        console.log("getDashboardAll::getstatetoken" + token)

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token,
            },
        };


        const resp = await axios.get<{
            data: {
                video_id: string
                sfa_license_no: string
                postal_code: string
                timestamp: string
            }[]
        }>(
            `${globalConfig.serverUrl}${Endpoints.youtubeReference.all}`,
            config,
        );


        const items = resp.data.data

        const result = new Map<string, FoodEstablishmentCard>();

        for (const item of items) {
            if (!result.has(item.sfa_license_no)) {
                result.set(item.sfa_license_no, {
                    sfaLicenseNo: item.sfa_license_no,
                    postalCode: item.postal_code,
                    videos: []
                })
            }

            result.get(item.sfa_license_no)?.videos.push({
                videoId: item.video_id,
                timestamp: item.timestamp,
            })
        }

        return Array.from(result.values())
    },
);



export default slice;
