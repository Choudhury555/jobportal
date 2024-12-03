import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSerachedJobText } from '@/redux/jobSlice'

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
  },
  {
    filterType: "Industry",
    array: ["Fullstack developer", "Frontend Developer", "Backend Developer"]
  },
  {
    filterType: "Salary",
    array: ["0-40k", "41k-1lakh", "1lakh-5lakh"]
  }
]

const FilterCard = () => {

  const [selectedValue,setSelectedValue] = useState("");

  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
  }

  useEffect(()=>{
    // console.log(selectedValue);
    dispatch(setSerachedJobText(selectedValue));
  },[selectedValue])

  return (
    <div className='w-full bg-white p-3 rounded-md'>
      <h1 className='font-bold text-lg'>Filter Jobs</h1>
      <hr className='mt-3' />
      <RadioGroup onValueChange={changeHandler} value={selectedValue}>
        {
          filterData.map((data,index)=>(
            <div>
              <h1 className='font-bold text-lg'>{data.filterType}</h1>
              {
                data.array.map((item,idx)=>{
                  const key_id = `id${index}-${idx}`;//here we can use any random key
                  return (
                    <div className='flex items-center space-x-2 my-2'>
                      <RadioGroupItem value={item} id={key_id}/>
                      <Label htmlFor={key_id}>{item}</Label>
                    </div>
                  )
              })
              }
            </div>
          ))
        }
      </RadioGroup>
    </div>
  )
}

export default FilterCard