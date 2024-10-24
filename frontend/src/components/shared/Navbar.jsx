import React from 'react'
import { Link } from 'react-router-dom'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { LogOut, User2 } from 'lucide-react'

const Navbar = () => {

  const userLoggedIn = false;

  return (
    <div className='bg-white'>
      <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
        <div>
          <h1 className='text-2xl font-bold'>Job<span className='text-[blue]'>Portal</span></h1>
        </div>
        <div className='flex items-center gap-12'>
          <ul className='flex font-medium gap-5'>
            <li><Link to={"/"}>Home</Link></li>
            <li><Link to={"/jobs"}>Jobs</Link></li>
            <li><Link to={"/browse"}>Browse</Link></li>
          </ul>
          {
            !userLoggedIn ? (
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
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </PopoverTrigger>
                  <PopoverContent className='w-80'>
                    <div>
                      <div className='flex gap-4 space-y-2'>
                        <Avatar>
                          <AvatarImage src="https://github.com/shadcn.png" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className='font-medium'>Hello</h4>
                          <p className='text-sm text-muted-foreground'>Some bio</p>
                        </div>
                      </div>
                      <div className='flex flex-col my-2 text-gray-600'>
                        <div className='flex w-fit items-center gap-2'>
                          <User2 />
                          <Button variant="link">View Profile</Button>
                        </div>
                        <div className='flex w-fit items-center gap-2'>
                          <LogOut />
                          <Button variant="link">Logout</Button>
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