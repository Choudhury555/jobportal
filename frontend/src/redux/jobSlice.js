import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name:"job",
    initialState:{
        allJobs:[],
        jobById:null,
        allAdminJobs:[],
        searchAdminJobByText:"",
        allAppliedJobs:[],
        serachedJobText:""
    },
    reducers:{
        //actions
        setAllJobs:(state,action)=>{
            state.allJobs=action.payload;
        },
        setJobById:(state,action)=>{
            state.jobById = action.payload
        },
        setAllAdminJobs:(state,action)=>{
            state.allAdminJobs=action.payload
        },
        setSearchAdminJobByText:(state,action)=>{
            state.searchAdminJobByText=action.payload
        },
        setAllAppliedJobs:(state,action)=>{
            state.allAppliedJobs=action.payload
        },
        setSerachedJobText:(state,action)=>{
            state.serachedJobText=action.payload
        }
    }
})

export const {setAllJobs,setJobById,setAllAdminJobs,setSearchAdminJobByText,setAllAppliedJobs,setSerachedJobText} = jobSlice.actions;
export default jobSlice.reducer