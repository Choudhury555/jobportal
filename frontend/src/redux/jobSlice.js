import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name:"job",
    initialState:{
        allJobs:[],
        jobById:null
    },
    reducers:{
        //actions
        setAllJobs:(state,action)=>{
            state.allJobs=action.payload;
        },
        setJobById:(state,action)=>{
            state.jobById = action.payload
        }
    }
})

export const {setAllJobs,setJobById} = jobSlice.actions;
export default jobSlice.reducer