import { createSlice } from "@reduxjs/toolkit";

const NewDetailSlice = createSlice({
  name: "NewDetailSlice",
  initialState:{
    dataNewsDetails:null,
    titleDetails:null,
    avatarImg:null,
    Switch:null, 
    filedPreview:[],
    filedDetails:[],
    listComments:[],
    Category:null,
  },
  reducers:{
    setDataNewsDetails:(state,action) => {
        state.dataNewsDetails = action.payload;
    },
    setTitleDetails:(state,action) => {
        state.titleDetails = action.payload;
    },
    setAvatarImg:(state,action) => {
        state.avatarImg = action.payload;
    },
    setSwitch:(state,action) => {
        state.Switch = action.payload;
    },
    setFiledPreview:(state,action) => {
        state.filedPreview = action.payload;
    },
    setFiledDetails:(state,action) => {
        state.filedDetails = action.payload;
    },
    setListComments:(state,action) => {
        state.listComments = action.payload;
    },
    setCategory:(state,action) => {
        state.Category = action.payload;
    }
  }
});

export const {
  setDataNewsDetails,
  setTitleDetails,
  setAvatarImg,
  setSwitch,
  setFiledPreview,
  setFiledDetails,
  setListComments,
  setCategory
} = NewDetailSlice.actions;

export default NewDetailSlice.reducer;