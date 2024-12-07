import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { LogOut, User2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const Navbar = () => {

  const {user} = useSelector(store=>store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async ()=>{
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`,{
        withCredentials:true
      });

      if(res.data.success){
        dispatch(setUser(null));
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }

  return (
    <div className='bg-white'>
      <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
        <div>
          <h1 className='text-2xl font-bold'>Job<span className='text-[blue]'>Portal</span></h1>
        </div>
        <div className='flex items-center gap-12'>
          <ul className='flex font-medium gap-5'>
            {
              user && user.role === 'recruiter' ? 
              (
                <>
                  <li><Link to={"/admin/companies"}>Companies</Link></li>
                  <li><Link to={"/admin/jobs"}>Jobs</Link></li></>
              )
              :
              (
                <>
                  <li><Link to={"/"}>{user ? "Home" : ""}</Link></li>
                  <li><Link to={"/jobs"}>{user ? "Jobs" : ""}</Link></li>
                  <li><Link to={"/browse"}>{user ? "Browse" : ""}</Link></li>
                </>
              )  
            }
          </ul>
          {
            !user ? (
              <div className='flex items-center gap-2'>
                <Link to={"/login"}><Button variant="outline">Login</Button></Link>
                <Link to={"/signup"}><Button className="bg-[#8a3b8a] hover:bg-[purple]">Signup</Button></Link>
              </div>
            )
              :
              (
                /* These you can refer to shadcn/ui "https://ui.shadcn.com/docs/installation/vite" */
                <Popover>
                  <PopoverTrigger>
                    <Avatar>
                      <AvatarImage src={user?.profile?.profilePhoto} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </PopoverTrigger>
                  <PopoverContent className='w-80'>
                    <div>
                      <div className='flex gap-4 space-y-2'>
                        <Avatar>
                          <AvatarImage src={user?.profile?.profilePhoto} />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className='font-medium'>{user?.fullname}</h4>
                          <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                        </div>
                      </div>
                      <div className='flex flex-col my-2 text-gray-600'>
                        {
                          user && user.role === 'student' && (
                                <div className='flex w-fit items-center gap-2'>
                                  <User2 />
                                  <Button variant="link"><Link to={"/profile"}>View Profile</Link></Button>
                                </div>
                          )
                        }
                        <div className='flex w-fit items-center gap-2'>
                          <LogOut />
                          <Button variant="link" onClick={logoutHandler}>Logout</Button>
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              )
          }
        </div>
      </div>
    </div>
  )
}

export default Navbar