import { createSlice } from "@reduxjs/toolkit";

export const mentorSliceData = createSlice({
    name: "mentorSliceData",

    initialState: {
        mentorListData: null,
        mentorSingelData: null,

        PageNumber: 0,
        RowsOfPage: 10,
    },

    reducers: {
        addDataToMentorList: (state, action) => {
            state.mentorListData = action.payload
        },
        addDataToMentorSingel: (state, action) => {
            state.mentorSingelData = action.payload
        },
        changeMentorDataPageNumber: (state, action) => {
            state.PageNumber = action.payload
        },
        changeMentorDataRowsOfPage: (state, action) => {
            state.RowsOfPage = action.payload
        }
    }

})

export default mentorSliceData.reducer