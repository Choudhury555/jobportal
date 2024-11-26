import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
    name:"application",
    initialState:{
        allApplicants:[]
    },
    reducers:{
        //actions
        setAllApplicants:(state,action)=>{
            state.allApplicants = action.payload
        }
    }
})

export const {setAllApplicants} = applicationSlice.actions;
export default applicationSlice.reducer;