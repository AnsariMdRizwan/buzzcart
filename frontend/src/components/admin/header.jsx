import { AlignJustify, LogOut } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import { useDispatch } from 'react-redux'
import { logOutUser } from '@/store/auth-slice'
import toast from 'react-hot-toast'

const Adminheader = ({ setOpen }) => {

  const dispatch= useDispatch();

  const handleLogOut=()=>{

    dispatch(logOutUser());
    toast.success("LogOut Successfully")
  }

  return (
    <header className='flex items-center justify-between px-4 py-3 border-b'>
      <Button onClick={()=>setOpen(true)} className='lg:hidden sm:block'>
      <AlignJustify />
      <span className='sr-only'>Toggle Menu</span>
      </Button>
      <div className='flex flex-1 justify-end'>
        <Button onClick={handleLogOut}  className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow bg-slate-300">
          <LogOut/>
          Logout
        </Button>
      </div>
    </header>
  )  
}

export default Adminheader