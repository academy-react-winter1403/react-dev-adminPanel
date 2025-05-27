import { createSlice } from "@reduxjs/toolkit";
import { Action } from "history";

const allDataAddNews = createSlice({
    name:"allDataAddNews",
    initialState:{
        Image:null,
        mainInfo:{},
        additionalInfo:{},
        allForm:{}
    },
    reducers:{
        setImage:(state,action) => {
            state.Image = action.payload
        },
        setMainInfo:(state,action) => {
            state.mainInfo = action.payload
        },
        setAdditionalInfo:(state,action) => {
            state.additionalInfo = action.payload
        },
    }
})

export const {
    setImage,setMainInfo,setAdditionalInfo
} = allDataAddNews.actions

export default allDataAddNews.reducer