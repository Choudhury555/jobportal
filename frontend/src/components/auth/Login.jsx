import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const inputChangeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(input);
  }

  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center max-w-7xl mx-auto'>
        <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded p-4 my-10' >
          <h1 className='font-bold text-xl mb-5'>Login</h1>
          <div className='my-2'>
            <Label>Email</Label>
            <Input type="Email" value={input.email} name="email" onChange={inputChangeHandler} placeholder="Enter Your Email" />
          </div>
          <div className='my-2'>
            <Label>Password</Label>
            <Input type="password" value={input.password} name="password" onChange={inputChangeHandler} placeholder="Enter Your Password" />
          </div>
          <div className='flex items-center justify-between'>
            <RadioGroup className='flex items-center gap-4 my-5'>
              <div className="flex items-center space-x-2">
                <Input type="radio" name="role" value="student" checked={input.role === 'student'} onChange={inputChangeHandler} className="cursor-pointer" />
                <Label>Student</Label>
              </div>
              <div className="flex items-center space-x-2">
              <Input type="radio" name="role" value="recruiter" checked={input.role==='recruiter'} onChange={inputChangeHandler} className="cursor-pointer" />
                <Label>Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          <Button type="submit" className="w-full my-4">Login</Button>
          <span className='text-sm'>Don't have an account.<Link to={"/signup"} className="text-blue-600">Signup</Link></span>
        </form>
      </div>
    </div>
  )
}

export default Login